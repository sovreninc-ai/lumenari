# Quick Start — Python Backend Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan needed for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `patterns/django-vs-fastapi-and-async.md` into the project knowledge so Claude has them as reference. Start a new conversation. First message: tell Claude your setup — "FastAPI, Python 3.12, async SQLAlchemy 2.0 on Postgres, Celery + Redis, deploying to Render" — then describe what you're building.

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `patterns/django-vs-fastapi-and-async.md`. Save the GPT (private to you is fine). Open it and start with: "FastAPI, Python 3.12, async SQLAlchemy 2.0, Celery, Render. I want a new endpoint."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. It'll work — you just lose the persistent GPT and the file uploads.

## Gemini, Cursor, Codex, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me about my framework, async-ness, ORM, queue, and deploy target." Once it does, you're set.

For Cursor specifically: drop `SKILL.md` at the root of your project. Cursor's project rules pick it up.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. FastAPI, Python 3.12, async SQLAlchemy 2.0 with asyncpg on Postgres, Pydantic v2, Celery + Redis, deploying to Render as a container. Build me POST /orders that creates an order for the authenticated user, fires a background email task, and returns the order with its line items eagerly loaded. Show me the Pydantic schemas, the async route, the SQLAlchemy models, the Celery task, and the gunicorn-uvicorn Dockerfile.
```

If you get back: Pydantic v2 models with `model_config = ConfigDict(from_attributes=True)` (not `Config: orm_mode = True`), an `async def` route handler using `Depends(get_session)` and `Depends(current_user)`, a `select(Order).options(selectinload(Order.line_items))` query, a `@shared_task` Celery task with `bind=True` and retry config, `task.delay(...)` from the route, and a multi-stage Dockerfile running `gunicorn` with `-k uvicorn.workers.UvicornWorker` as non-root with `STOPSIGNAL SIGTERM` — the kit is loaded right.

If you get back `session.query(...)` inside `async def`, Pydantic v1 syntax, `requests.post(...)` for the email send, or a single-stage Dockerfile running as root, the system prompt didn't load — paste it again.
