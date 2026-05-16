# ActiveRecord, Sidekiq, and Kamal — the three shapes you'll write daily

## 1. ActiveRecord — query refactor template

Bullet flagged an N+1 on the dashboard. Here's the before/after.

### Before — N+1, one query per post

```ruby
# app/controllers/posts_controller.rb
def index
  @posts = Post.published.order(created_at: :desc).limit(20)
end
```

```erb
<%# app/views/posts/index.html.erb %>
<% @posts.each do |post| %>
  <%= post.author.name %>           <%# 1 query per row %>
  <%= post.comments.count %>        <%# 1 query per row %>
<% end %>
```

That's 1 + 20 + 20 = 41 queries.

### After — 3 queries, regardless of row count

```ruby
def index
  @posts = Post.published
                .includes(:author)        # eager-load author
                .order(created_at: :desc)
                .limit(20)
end
```

```ruby
# app/models/post.rb
class Post < ApplicationRecord
  belongs_to :author, class_name: "User", counter_cache: false
  has_many :comments, dependent: :destroy, counter_cache: true   # adds comments_count column
end
```

```erb
<% @posts.each do |post| %>
  <%= post.author.name %>           <%# preloaded %>
  <%= post.comments_count %>        <%# counter cache, no query %>
<% end %>
```

3 queries total — posts, authors via `IN`, plus the schema-time counter increment.

### When to use each AR loading strategy

| Method | What it does | When |
| --- | --- | --- |
| `includes(:x)` | Smart — preload by default, eager_load if WHERE references `x` | Default. Use this. |
| `preload(:x)` | Forces a separate `IN` query | When you need a second query and never want a JOIN |
| `eager_load(:x)` | Forces a LEFT OUTER JOIN | When filtering by the association: `where('comments.body LIKE ?', ...)` |
| `joins(:x)` | INNER JOIN, doesn't load `x` | When you only need to filter, never to read |

---

## 2. Sidekiq — job with retries + idempotency

The job retries on transient failures (network blips, 502s). It must not double-charge a customer if it retries after a partial success.

```ruby
# app/jobs/charge_customer_job.rb
class ChargeCustomerJob
  include Sidekiq::Job
  sidekiq_options retry: 5, queue: :payments, backtrace: true

  class AlreadyCharged < StandardError; end

  def perform(order_id, idempotency_key)
    order = Order.find(order_id)

    # Idempotency guard #1 — DB state
    return if order.charged?

    # Idempotency guard #2 — Stripe's own idempotency key (covers the case
    # where we crashed AFTER Stripe charged but BEFORE we updated the order).
    charge = Stripe::Charge.create(
      {
        amount: order.total_cents,
        currency: order.currency,
        customer: order.stripe_customer_id,
        description: "Order ##{order.id}"
      },
      { idempotency_key: idempotency_key }
    )

    Order.transaction do
      order.update!(
        charged: true,
        charged_at: Time.current,
        stripe_charge_id: charge.id
      )
    end

    OrderMailer.charged(order).deliver_later
  rescue Stripe::IdempotencyError => e
    # Stripe saw this key before — already charged. Update DB to reflect.
    order.update!(charged: true) unless order.charged?
    Rails.logger.warn("Idempotency hit for order #{order.id}: #{e.message}")
  end
end
```

### Test that proves it's safe to retry

```ruby
# spec/jobs/charge_customer_job_spec.rb
RSpec.describe ChargeCustomerJob do
  it "charges exactly once when run twice" do
    order = create(:order, charged: false)
    key = SecureRandom.uuid

    expect {
      described_class.perform_now(order.id, key)
      described_class.perform_now(order.id, key)  # retry simulation
    }.to change { Stripe::Charge.list.data.size }.by(1)

    expect(order.reload).to be_charged
  end
end
```

---

## 3. Kamal — deploy.yml + healthcheck

### `config/deploy.yml`

```yaml
service: myapp

image: myorg/myapp

servers:
  web:
    hosts:
      - 203.0.113.10
      - 203.0.113.11
    labels:
      traefik.http.routers.web.rule: Host(`myapp.com`)
      traefik.http.routers.web.tls: true
      traefik.http.routers.web.tls.certresolver: letsencrypt
  worker:
    hosts:
      - 203.0.113.12
    cmd: bundle exec sidekiq

registry:
  server: registry.digitalocean.com
  username: myapp
  password:
    - KAMAL_REGISTRY_PASSWORD

env:
  clear:
    RAILS_ENV: production
    RAILS_LOG_TO_STDOUT: "true"
    RAILS_SERVE_STATIC_FILES: "true"
  secret:
    - RAILS_MASTER_KEY
    - DATABASE_URL
    - REDIS_URL
    - STRIPE_SECRET_KEY

healthcheck:
  path: /up
  port: 3000
  max_attempts: 10
  interval: 5s

accessories:
  postgres:
    image: postgres:16
    host: 203.0.113.20
    env:
      secret:
        - POSTGRES_PASSWORD
    directories:
      - data:/var/lib/postgresql/data
  redis:
    image: redis:7
    host: 203.0.113.20
    directories:
      - data:/data
```

### `/up` endpoint

```ruby
# app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  # ...

  # GET /up
  # Returns 200 if app, DB, and Redis are healthy. 503 otherwise.
  # Kamal hits this between container start and traffic cutover.
  def up
    ActiveRecord::Base.connection.execute("SELECT 1")
    Sidekiq.redis { |c| c.ping }
    head :ok
  rescue => e
    Rails.logger.error("Healthcheck failed: #{e.message}")
    head :service_unavailable
  end
end
```

```ruby
# config/routes.rb
get "up" => "application#up"
```

### Deploy commands

```bash
# First time
kamal setup        # provisions servers, registry, accessories, deploys first version

# Subsequent deploys
kamal deploy       # builds + pushes + rolls out

# Rollback to previous
kamal rollback

# Tail logs
kamal app logs -f

# Shell into a container
kamal app exec --interactive --reuse "bin/rails console"
```

Watch for `Promoted new container` in the deploy output — that's when the new container takes traffic and the old one drains. If healthcheck fails 10x in a row, Kamal aborts and the old container keeps serving.
