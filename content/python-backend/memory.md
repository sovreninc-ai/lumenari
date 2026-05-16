# Memory — Python Backend Pack

## Domain context

A Python backend engineer in 2025 ships one of two stacks: FastAPI for typed JSON APIs or Django for full-stack apps with an admin and a heavy ORM. The Python version is 3.12+ (3.13 is fine; type-checker and library coverage are now the only constraints on going newer). The database is Postgres almost always — Render PG, Fly Postgres, AWS RDS, Supabase, Neon, Railway. Redis is the standard sidecar for queues, caches, and rate limiting.

The deployment unit is a Docker container. The web process runs `uvicorn` (single-process dev), `gunicorn` with `uvicorn.workers.UvicornWorker` (FastAPI in prod), or `gunicorn` with sync workers (Django without async views). Background work runs in a separate worker container — `celery worker`, `arq worker`, or `rq worker` — reading the same Redis the web tier writes to.

The expensive lessons in this domain: async correctness is non-negotiable in FastAPI (one sync call blocks the entire event loop in that worker); N+1 queries silently turn a 100ms endpoint into 3 seconds at production scale; Pydantic v1 and v2 have meaningful API differences and AIs love to mix them; Django's ORM is sync-first and using it inside `async def` raises `SynchronousOnlyOperation`; and the line between "fits in a request" and "needs a background worker" is roughly 1-2 seconds, not 10.

## Vocabulary the AI should know

- ASGI: Asynchronous Server Gateway Interface — the async-native successor to WSGI. FastAPI, Django Channels, and Starlette speak ASGI
- WSGI: the older sync server interface that Django still defaults to without Channels
- uvicorn: the standard ASGI server, built on uvloop + httptools, very fast for async Python
- gunicorn: the production process manager, multi-worker, paired with `UvicornWorker` for ASGI or sync workers for Django
- daphne: alternative ASGI server, used historically with Django Channels
- Pydantic v2: the dominant data validation library; v2 rewrote internals in Rust, has `model_dump()`, `model_config`, and `field_validator` — different API from v1
- pydantic-settings: the v2 settings package; replaces `BaseSettings` from v1
- SQLAlchemy 2.0: the modern ORM/Core API with `select()`, `Mapped[]`, async support via `create_async_engine`
- asyncpg: the fastest Postgres async driver; pair with SQLAlchemy async or use directly
- psycopg / psycopg3: the modern Postgres driver (the one that replaced psycopg2); supports both sync and async
- N+1 query: a list query followed by per-row lazy loads — the most common ORM performance bug
- select_related / prefetch_related: Django's anti-N+1 tools — JOIN for FK forward, separate query for reverse/M2M
- joinedload / selectinload: SQLAlchemy's anti-N+1 tools — joinedload for one-to-one and small one-to-many, selectinload for large one-to-many
- Alembic: SQLAlchemy's migration tool; revision-based, autogenerate + manual review
- Django migrations: the built-in migration system; `makemigrations` + `migrate`
- Celery: the standard distributed task queue, broker is usually Redis or RabbitMQ
- arq: async-native task queue, Redis-backed, smaller than Celery, designed for asyncio
- RQ: Redis Queue — simpler than Celery, sync-only, lighter
- DRF: Django REST Framework, the de facto REST library for Django, ViewSets + Serializers + Routers
- mypy / pyright: type checkers. pyright is faster and stricter by default; mypy is the standard
- ruff: the modern Python linter + formatter, replaces flake8 + black + isort, written in Rust
- Background event loop: the thing FastAPI runs on. Block it with a sync call and every concurrent request waits

## Common workflows

- FastAPI endpoint with Pydantic v2 + async SQLAlchemy: user wants a new typed endpoint. Trigger → define a Pydantic `BaseModel` for request and another for response → write the async route handler in a `routers/<resource>.py` APIRouter → inject the async DB session via `Depends(get_session)` → call into a service function (framework-agnostic) → service does the query with `selectinload`/`joinedload` to kill N+1 → returns ORM models converted via Pydantic's `from_attributes = True` → integration test with `httpx.AsyncClient` and a fixture-rolled DB.
- Django app scaffold with class-based views + DRF: user wants a new app. Trigger → `python manage.py startapp <name>` → register in `INSTALLED_APPS` → define models in `apps/<name>/models.py` (split into a `models/` package if more than ~5) → run `makemigrations` → write DRF serializers in `serializers.py`, ViewSets in `views.py`, register routes in `urls.py` → wire `select_related`/`prefetch_related` on the queryset reflexively → write tests with `APIClient` and `pytest-django`.
- Background job scaffold (Celery + Redis): user has work that's too slow for a request. Trigger → set up `celery.py` next to settings, configure Redis broker URL from env, wire `beat_schedule` if cron-like → write the task as `@shared_task(bind=True, autoretry_for=(SomeError,), retry_backoff=True)` → make it idempotent (check a dedup key or unique DB constraint before doing the side effect) → fire from the view via `task.delay(args)` or `.apply_async()` → run `celery -A config worker -l info` in a separate container/process → monitor with Flower or a log aggregator.
- Dockerized deployment with gunicorn/uvicorn + healthcheck: user is shipping. Trigger → multi-stage Dockerfile (builder: `pip install` into a venv; runtime: copy venv + app, run as non-root) → entrypoint runs `gunicorn config.wsgi:application -k uvicorn.workers.UvicornWorker` (FastAPI/async Django) or `gunicorn config.wsgi:application` (sync Django) → `HEALTHCHECK` against `/healthz` → `STOPSIGNAL SIGTERM` so gunicorn drains properly → workers count = `2 * CPU + 1` for CPU-bound, lower for I/O-bound with async → separate worker container for Celery, sharing the same image.

## What to avoid / common mistakes

- Sync ORM calls inside `async def`: in FastAPI it silently blocks the event loop; in Django it raises `SynchronousOnlyOperation`. Either go full async (asyncpg + SQLAlchemy 2.0 async) or keep the route sync.
- Lazy-loading inside templates or serializers without prefetch: a Django page that renders a list with `{{ user.profile.name }}` runs one extra query per row. Same trap in FastAPI when you serialize a list of ORM rows that have relationships.
- Mixing Pydantic v1 patterns into a v2 codebase: `.dict()` → `.model_dump()`; `Config` inner class → `model_config = ConfigDict(...)`; `@validator` → `@field_validator`; `orm_mode = True` → `from_attributes = True`.
- Using `BackgroundTasks` for real work: FastAPI's `BackgroundTasks` runs after the response in the same process. Fine for "send a non-critical email"; wrong for anything past a few seconds, anything that needs retry, or anything that shouldn't die when the web process restarts.
- Catching bare `Exception` without re-raising or logging context: silent swallow. Catch specific exceptions, log with structured context, re-raise unless you can recover meaningfully.
- `requests` inside `async def`: it's a sync HTTP library and it blocks the event loop. Use `httpx.AsyncClient` (with proper lifespan management) or `aiohttp`.

## Tone / register

A senior Python backend engineer talks in concrete versions: Python 3.12, FastAPI 0.110+, SQLAlchemy 2.0, Pydantic v2, Django 5. They mention the GIL when it matters and ignore it when it doesn't. They know when to reach for async (high-concurrency I/O, WebSockets, fan-out HTTP) and when not to (CPU-bound work, simple CRUD where sync gunicorn workers are fine). They write type hints reflexively. They use `ruff` and `pyright`/`mypy` from day one and treat warnings as bugs. They don't say "the ORM is slow" — they say "this view does seven queries; let's prefetch and get it to two." They acknowledge Flask exists without recommending it for greenfield work.
