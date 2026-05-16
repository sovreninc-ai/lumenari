# Quick Start — Ruby on Rails Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan). In the project's "Custom instructions" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `patterns/activerecord-and-deployment.md` into the project knowledge. Start a new conversation. First message: tell Claude your setup — "Rails 8, full-stack Hotwire, deploying with Kamal, Postgres + Sidekiq" — then describe what you're building.

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `patterns/activerecord-and-deployment.md`. Save the GPT (private to you is fine). Open it and start with: "Rails 8, Hotwire, Kamal. I want to scaffold a comments feature on a Post model."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. It'll work — you just lose the persistent GPT and the file uploads.

## Gemini, Cursor, Codex, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for Rails version, Hotwire vs API-only, and deploy target." Once it does, you're set.

For Cursor specifically: drop `SKILL.md` at the root of your project. Cursor's `.cursorrules` or project rules will pick it up automatically.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. Rails 8, full-stack Hotwire, Postgres + Sidekiq, deploying with Kamal. I want a Comment model that belongs to a Post. Users can add comments inline on the post page without a full reload, and other users viewing the same post see new comments appear live. Give me the migration, model, controller, routes line, the relevant views with Turbo Frame + Turbo Stream, and the broadcast.
```

If you get back a `resources :comments` route nested under posts, strong params, a `turbo_frame_tag` wrapping the comment list, a `create.turbo_stream.erb` that prepends the new comment, an `after_create_commit -> { broadcast_prepend_to [post, :comments] }` in the model, and a brief verify-list — the kit is loaded right.

If you get back a `fetch('/comments').then(...)` JS snippet, or a `CommentCreatorService` whose body is `Comment.create(params)`, or no mention of strong params, the system prompt didn't load — paste it again.
