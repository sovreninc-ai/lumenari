# Django vs FastAPI, async patterns, and ORM idioms

The three things to get right on a Python backend in 2025: pick the right framework for the job, never block the async event loop, and never ship a list view with N+1 queries.

## When to use which framework

| Situation | Use | Why |
| --- | --- | --- |
| Pure JSON API, OpenAPI spec for free, async-friendly | **FastAPI** | Pydantic v2 schemas double as docs; async-native |
| Admin UI, ORM-heavy CRUD, batteries-included | **Django + DRF** | Admin, migrations, auth, sessions, security headers out of the box |
| Real-time / WebSockets / SSE | **FastAPI** (or Django Channels) | FastAPI is async-native; Channels adds ASGI to Django |
| ML inference behind an API | **FastAPI** + dedicated GPU worker | Slim, async, easy to spike |
| Existing Django app, new API surface | **Django + DRF** | Don't fork the stack |
| Cron-heavy data jobs with a UI | **Django** | Admin + management commands + Celery beat play well |

Don't mix them in one process. If you really need both, run them as separate services.

## FastAPI: the canonical async endpoint

```python
# app/main.py
from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.db.session import engine
from app.routers import users, orders

@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup
    yield
    # shutdown — dispose the engine so connections close cleanly
    await engine.dispose()

app = FastAPI(lifespan=lifespan, title="My API")
app.include_router(users.router)
app.include_router(orders.router)
```

```python
# app/db/session.py
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from app.config import settings

engine = create_async_engine(
    settings.DATABASE_URL,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,
)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

async def get_session() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session
```

```python
# app/routers/orders.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.db.session import get_session
from app.deps import current_user
from app.models import Order, User
from app.schemas.orders import OrderCreate, OrderOut
from app.services import orders as orders_service
from app.tasks.email import send_order_confirmation

router = APIRouter(prefix="/orders", tags=["orders"])

@router.post("", response_model=OrderOut, status_code=201)
async def create_order(
    payload: OrderCreate,
    session: AsyncSession = Depends(get_session),
    me: User = Depends(current_user),
):
    order = await orders_service.create_order(session, user=me, payload=payload)

    # eager-load related rows for the response
    result = await session.execute(
        select(Order)
          .options(selectinload(Order.line_items))
          .where(Order.id == order.id)
    )
    order = result.scalar_one()

    # background email — durable, retryable
    send_order_confirmation.delay(order_id=order.id)

    return order
```

```python
# app/schemas/orders.py
from datetime import datetime
from pydantic import BaseModel, ConfigDict

class LineItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    sku: str
    quantity: int
    unit_price_cents: int

class OrderOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    user_id: int
    total_cents: int
    currency: str
    created_at: datetime
    line_items: list[LineItemOut]

class OrderCreate(BaseModel):
    line_items: list[LineItemCreate]
    currency: str = "CAD"

class LineItemCreate(BaseModel):
    sku: str
    quantity: int
```

Pydantic v2 differences from v1 to remember:

- `model_config = ConfigDict(...)` (not `class Config:`)
- `from_attributes=True` (not `orm_mode = True`)
- `.model_dump()` (not `.dict()`)
- `.model_validate(obj)` (not `parse_obj`)
- `@field_validator` (not `@validator`)

## Django: the canonical DRF ViewSet

```python
# apps/orders/models.py
from django.db import models
from django.conf import settings

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name="orders")
    total_cents = models.PositiveIntegerField()
    currency = models.CharField(max_length=3, default="CAD")
    created_at = models.DateTimeField(auto_now_add=True)

class LineItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="line_items")
    sku = models.CharField(max_length=64)
    quantity = models.PositiveIntegerField()
    unit_price_cents = models.PositiveIntegerField()
```

```python
# apps/orders/serializers.py
from rest_framework import serializers
from .models import Order, LineItem

class LineItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = LineItem
        fields = ["id", "sku", "quantity", "unit_price_cents"]

class OrderSerializer(serializers.ModelSerializer):
    line_items = LineItemSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = ["id", "user", "total_cents", "currency", "created_at", "line_items"]
        read_only_fields = ["id", "user", "total_cents", "created_at"]
```

```python
# apps/orders/views.py
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Order
from .serializers import OrderSerializer
from .services import create_order_for_user
from .tasks import send_order_confirmation

class OrderViewSet(ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # N+1 killer: prefetch line_items, scope to the caller
        return (
            Order.objects
                 .filter(user=self.request.user)
                 .prefetch_related("line_items")
                 .order_by("-created_at")
        )

    def perform_create(self, serializer):
        order = create_order_for_user(
            user=self.request.user,
            line_items=self.request.data.get("line_items", []),
        )
        send_order_confirmation.delay(order.id)
        serializer.instance = order
```

```python
# apps/orders/urls.py
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet

router = DefaultRouter()
router.register(r"orders", OrderViewSet, basename="order")
urlpatterns = router.urls
```

Two anti-patterns to refuse:

- Function-based DRF views for CRUD — ViewSets give you free routing, pagination, permissions
- `Order.objects.all()` in a list view without `select_related` / `prefetch_related`

## Celery + Redis background task

```python
# config/celery.py
import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.production")
app = Celery("myapp")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
```

```python
# settings/base.py (Django) or app/config.py (FastAPI)
CELERY_BROKER_URL = env("REDIS_URL")
CELERY_RESULT_BACKEND = None  # don't store results unless you need them
CELERY_TASK_ACKS_LATE = True   # ack only after successful processing
CELERY_TASK_REJECT_ON_WORKER_LOST = True
CELERY_TASK_DEFAULT_RETRY_DELAY = 30
CELERY_TASK_MAX_RETRIES = 5
CELERY_TASK_SOFT_TIME_LIMIT = 60
CELERY_TASK_TIME_LIMIT = 90
```

```python
# apps/orders/tasks.py
from celery import shared_task
from celery.utils.log import get_task_logger
from .models import Order

logger = get_task_logger(__name__)

@shared_task(
    bind=True,
    autoretry_for=(ConnectionError, TimeoutError),
    retry_backoff=True,
    retry_backoff_max=600,
    retry_jitter=True,
    max_retries=5,
)
def send_order_confirmation(self, order_id: int) -> None:
    try:
        order = Order.objects.select_related("user").get(id=order_id)
    except Order.DoesNotExist:
        logger.warning("order_missing", extra={"order_id": order_id})
        return  # don't retry — order is gone

    # idempotency: check a flag, dedupe key, or unique constraint before sending
    if order.confirmation_sent_at:
        return

    # send via Resend / SendGrid / Postmark
    send_email(to=order.user.email, template="order_confirmation", context={"order": order})
    Order.objects.filter(id=order.id).update(confirmation_sent_at=timezone.now())
```

Run the worker as a separate container with the same image:

```bash
celery -A config worker -l info --concurrency=4
```

## Dockerfile: FastAPI with gunicorn + uvicorn worker

```dockerfile
# syntax=docker/dockerfile:1.7
FROM python:3.12-slim AS builder

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ---

FROM python:3.12-slim AS runtime

RUN groupadd --system app && useradd --system --gid app --create-home app

ENV PATH="/opt/venv/bin:$PATH" \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

COPY --from=builder /opt/venv /opt/venv
WORKDIR /app
COPY --chown=app:app . .

USER app
EXPOSE 8000
STOPSIGNAL SIGTERM

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD python -c "import urllib.request,sys; sys.exit(0 if urllib.request.urlopen('http://127.0.0.1:8000/healthz').status==200 else 1)"

CMD ["gunicorn", "app.main:app", \
     "-k", "uvicorn.workers.UvicornWorker", \
     "-b", "0.0.0.0:8000", \
     "--workers", "${WEB_CONCURRENCY:-2}", \
     "--graceful-timeout", "30", \
     "--timeout", "60"]
```

For sync Django, drop the `-k uvicorn.workers.UvicornWorker` flag and use gunicorn's default sync workers.

The healthcheck calls the app's `/healthz`, which should be a route that returns `{"ok": true}` without touching the DB. `/readyz` is the readiness probe that does check upstreams — used by your orchestrator, not the Docker `HEALTHCHECK`.
