# Memory — Ruby on Rails Pack

## Domain context

A Rails developer runs a monolith — usually a Rails 7 or 8 app with Postgres, Redis, and Sidekiq, deployed via Kamal to a VPS, or via Heroku or Render. They've watched the JS-framework hype cycle, opted out of most of it, and ship features faster than the team that rewrote everything in microservices last year. The UI layer is Hotwire: Turbo Drive for nav, Turbo Frames for partial swaps, Turbo Streams for server-pushed updates, Stimulus for sprinkles of client behavior. React shows up only when there's a genuinely interactive surface (a calendar, a builder) that Hotwire can't model cleanly.

The rhythm is `rails s` in one tab, `bin/jobs` (or a Sidekiq web UI) in another, the test suite in a third. Migrations are checked in, never run in the dashboard. The schema is the source of truth. Strong migrations gem flags anything that could lock a hot table. Every Sidekiq job retries, has an idempotency check, and assumes it'll run at least twice. Webhooks store the event ID and bail if seen before.

The expensive lessons in this domain: never let a controller grow past ~15 lines, never trust `params` without `permit`, never run a `CREATE INDEX` on a hot table without `CONCURRENTLY`, and never reach for a service object when the logic belongs on the model. Skinny-model code rots — the logic ends up scattered across services, none of which know about each other.

## Vocabulary the AI should know

- Hotwire: Rails' default UI stack — Turbo Drive + Turbo Frames + Turbo Streams + Stimulus. Server-rendered HTML with surgical updates
- Turbo Frame: a `<turbo-frame id="x">` that scopes navigation — links and forms inside swap only the frame, not the page
- Turbo Stream: a server-pushed update — `append`, `prepend`, `replace`, `update`, `remove` targeting a DOM id over WebSocket or as a form response
- Stimulus: the JS framework that pairs with Turbo — `data-controller="x"` attaches behavior, no virtual DOM
- Sidekiq: Redis-backed background job processor. `perform_later` from the model/controller, the worker runs out-of-band
- ActiveRecord: Rails' ORM. `User.where(...).includes(:posts).order(:name)`. Lazy until you call something that materializes
- Strong Params: `params.require(:order).permit(:customer_id, :notes)` — explicit whitelist, mandatory for mass assignment
- Concern: a mixin module under `app/models/concerns/` or `app/controllers/concerns/`. Use for shared behavior; not a dumping ground
- Service object: a class with a single public method (`call`) that orchestrates a multi-model workflow. NOT for single-model CRUD
- Counter cache: `belongs_to :post, counter_cache: true` + a `comments_count` column on Post. Avoids `Post.comments.count` queries
- N+1: querying once per row instead of joining. The classic Rails performance bug. Fix with `includes(:assoc)` or `preload`
- Eager load: `eager_load(:assoc)` — forces a single LEFT OUTER JOIN. Use when you want to filter by the association
- Preload: `preload(:assoc)` — runs a second query with `IN (...)`. Default behavior of `includes` when no WHERE references the assoc
- Kamal: Basecamp's deploy tool — zero-downtime Docker deploys to your own servers via SSH. Replaces Capistrano
- Action Cable: Rails' WebSocket framework. Turbo Streams ride on it for broadcasts
- Active Job: the queueing abstraction. Sidekiq, Resque, GoodJob plug in underneath
- Idempotency key: a unique string sent with a request so retries are safe — Stripe uses this, Sidekiq jobs should mirror it

## Common workflows

- Scaffolded resource with Hotwire: user wants a new CRUD resource. Trigger → `rails g scaffold Comment post:references body:text`, run migration, edit `_form.html.erb` and wrap the index list in a `turbo_frame_tag`, change `create` action to `respond_to { |format| format.turbo_stream; format.html }`, add `create.turbo_stream.erb` that prepends the new row → smoke test in a browser with JS disabled to confirm degradation.
- ActiveRecord query refactor: user has a slow page or N+1. Trigger → run `bullet` or enable `ActiveRecord::Base.logger` in dev, identify the offending `each`, add `includes(:assoc)` or `eager_load(:assoc)` if you need to filter on it, use `pluck(:id, :name)` instead of `.map(&:id)` when you only need columns, consider `counter_cache` for repeated `.count` calls → benchmark before/after with `Benchmark.measure` or `rack-mini-profiler`.
- Sidekiq job with retries + idempotency: user is calling an external API from a controller. Trigger → create `app/jobs/charge_customer_job.rb`, set `sidekiq_options retry: 5, queue: :payments`, accept an idempotency key as an argument, check the DB or a Redis SET to skip if already processed, call the API with that same key, update the DB inside a transaction → write a test that runs `perform_now` twice and asserts one charge.
- Kamal deployment with healthcheck: user is shipping to a VPS. Trigger → `kamal init`, configure `config/deploy.yml` (servers, image, registry, env), add a `/up` healthcheck endpoint in `ApplicationController` that returns 200 if DB + Redis respond, set `healthcheck: { path: "/up", port: 3000 }` in deploy.yml, run `kamal setup` then `kamal deploy`, watch for "Promoted new container" and verify the old container drains before kill → set up `kamal accessory` for Postgres and Redis if not external, configure SSL via Traefik labels.

## What to avoid / common mistakes

- Skinny model anti-pattern: extracting `User.create(params)` into `UserCreator.call(params)` adds indirection with no benefit. Service objects exist for workflows spanning models, not for single-model CRUD.
- Fat controllers: 40-line `create` actions with conditional branches, ActiveRecord queries, and external API calls inline. Move the logic to the model, a concern, or a service object — and the API call to a job.
- N+1 in partials: `<% @posts.each do |post| %> <%= post.author.name %>` without `@posts = Post.includes(:author)` in the controller. Bullet gem catches this in development.
- Migrations without `strong_migrations`: adding a NOT NULL column with a default on a 10M-row table will lock writes. Use `add_column` without default, `change_column_default`, then backfill in batches.
- Sidekiq job with no idempotency: a retry after a 502 from Stripe charges the customer twice. Always check "did this already happen?" at the start of perform.
- Bypassing strong params with `params.permit!`: it's a footgun. Whitelist explicitly, even for admin actions.

## Tone / register

A real Rails dev sounds like they've shipped, on call, and survived. They mention specific gems by name (`bullet`, `strong_migrations`, `sidekiq-cron`, `dry-validation`, `pundit`), have opinions about which ones earn their keep, and warn when a gem is over-prescribed (`Trailblazer`, `Interactor`, every service-object gem). They use lowercase for everything in prose except class names, gem names, and Ruby keywords. They drop into `pry` or `rails console` to demonstrate something rather than guess. They quote DHH lightly but don't worship — they know when to leave the rails (rare, but it happens).
