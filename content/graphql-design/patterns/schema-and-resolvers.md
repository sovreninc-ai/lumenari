# Schema and resolvers — the four shapes you'll write daily

## 1. Schema from a use case — Customer + Orders example

Use case: a Customer views their Orders, each Order has LineItems and a ShippingStatus. The mobile app paginates orders by recent. The web app needs `cancelOrder`.

### SDL

```graphql
"""An entity uniquely addressable by id."""
interface Node {
  id: ID!
}

type Customer implements Node {
  id: ID!
  email: String!
  displayName: String

  """Paginated, most-recent-first by default."""
  orders(
    first: Int = 20
    after: String
    last: Int
    before: String
    filter: OrderFilter
  ): OrderConnection!
}

type Order implements Node {
  id: ID!
  number: String!
  placedAt: DateTime!

  """Status before this gets shipped — null while in carrier handoff."""
  shippingStatus: ShippingStatus

  """Line items. Always at least one in a valid order."""
  lineItems: [LineItem!]!

  """Sum of all line items in cents. Currency is on the Order."""
  totalCents: Int!
  currency: Currency!

  """DEPRECATED. Same value as totalCents, kept for legacy mobile builds."""
  cost: Int @deprecated(reason: "Use totalCents. Money values are now integer cents.")
}

type LineItem implements Node {
  id: ID!
  product: Product!
  quantity: Int!
  unitPriceCents: Int!
}

type ShippingStatus {
  carrier: String!
  trackingNumber: String
  estimatedDeliveryAt: DateTime
  lastEventAt: DateTime!
  lastEventDescription: String
}

input OrderFilter {
  status: OrderStatus
  placedAfter: DateTime
  placedBefore: DateTime
}

enum OrderStatus {
  PENDING
  PAID
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}

enum Currency { CAD USD EUR GBP }

scalar DateTime

# --- Connection types ---

type OrderConnection {
  edges: [OrderEdge!]!
  pageInfo: PageInfo!
  totalCount: Int
}

type OrderEdge {
  node: Order!
  cursor: String!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

# --- Mutations ---

input CancelOrderInput {
  orderId: ID!
  reason: String
  clientMutationId: String
}

type CancelOrderPayload implements MutationPayload {
  order: Order
  errors: [UserError!]!
  clientMutationId: String
}

interface MutationPayload {
  clientMutationId: String
  errors: [UserError!]!
}

type UserError {
  field: [String!]
  message: String!
  code: ErrorCode!
}

enum ErrorCode {
  VALIDATION_FAILED
  NOT_FOUND
  UNAUTHORIZED
  FORBIDDEN
  CONFLICT
  RATE_LIMITED
}

type Query {
  viewer: Customer
  node(id: ID!): Node
}

type Mutation {
  cancelOrder(input: CancelOrderInput!): CancelOrderPayload!
}
```

### Nullability rationale (the part designers skip)

- `Customer.email: String!` — every customer has an email, enforced in the auth flow.
- `Customer.displayName: String` — optional; many users haven't set one.
- `Order.shippingStatus: ShippingStatus` — null while in carrier handoff. Forever-guaranteeing this would force fake data on `PENDING` orders.
- `Order.lineItems: [LineItem!]!` — a valid order has at least one line item. If you might have orders without any line items (drafts), this should be `[LineItem!]` (nullable list) or `[LineItem!]!` with empty array.
- `Order.totalCents: Int!` — always computed from line items.
- `Order.cost: Int` (nullable AND deprecated) — kept for legacy mobile clients reading the old field.

---

## 2. DataLoader — the resolver pattern that prevents N+1

### Per-request context

```ts
// src/graphql/context.ts
import DataLoader from 'dataloader';
import type { Request } from 'express';
import { db } from '../db';

export interface Loaders {
  ordersByCustomerId: DataLoader<string, Order[]>;
  lineItemsByOrderId: DataLoader<string, LineItem[]>;
  shippingStatusByOrderId: DataLoader<string, ShippingStatus | null>;
}

export interface Context {
  user: AuthenticatedUser | null;
  loaders: Loaders;
}

export async function createContext(req: Request): Promise<Context> {
  const user = await authenticate(req);

  // IMPORTANT: loaders are PER-REQUEST. Never module-level.
  const loaders: Loaders = {
    ordersByCustomerId: new DataLoader(async (customerIds) => {
      const rows = await db('orders')
        .whereIn('customer_id', customerIds as string[])
        .orderBy('placed_at', 'desc');
      const byCustomer = new Map<string, Order[]>();
      for (const row of rows) {
        const existing = byCustomer.get(row.customer_id) ?? [];
        existing.push(row);
        byCustomer.set(row.customer_id, existing);
      }
      return customerIds.map((id) => byCustomer.get(id) ?? []);
    }),

    lineItemsByOrderId: new DataLoader(async (orderIds) => {
      const rows = await db('line_items').whereIn('order_id', orderIds as string[]);
      const byOrder = new Map<string, LineItem[]>();
      for (const row of rows) {
        const existing = byOrder.get(row.order_id) ?? [];
        existing.push(row);
        byOrder.set(row.order_id, existing);
      }
      return orderIds.map((id) => byOrder.get(id) ?? []);
    }),

    shippingStatusByOrderId: new DataLoader(async (orderIds) => {
      const rows = await db('shipping_statuses').whereIn('order_id', orderIds as string[]);
      const byOrder = new Map<string, ShippingStatus>();
      for (const row of rows) byOrder.set(row.order_id, row);
      return orderIds.map((id) => byOrder.get(id) ?? null);
    }),
  };

  return { user, loaders };
}
```

### Resolvers consume loaders, not the DB

```ts
// src/graphql/resolvers/Order.ts
export const OrderResolvers = {
  Order: {
    lineItems: (parent, _args, ctx) => ctx.loaders.lineItemsByOrderId.load(parent.id),
    shippingStatus: (parent, _args, ctx) => ctx.loaders.shippingStatusByOrderId.load(parent.id),

    // DEPRECATED — same value, different name
    cost: (parent) => parent.totalCents,
  },
};
```

### The test that proves no N+1

```ts
it('loads 50 orders + their line items in 2 queries', async () => {
  db.queryCount = 0;
  await execute(/* GraphQL */ `
    query {
      viewer {
        orders(first: 50) {
          edges {
            node {
              id
              lineItems { id quantity }
            }
          }
        }
      }
    }
  `);
  expect(db.queryCount).toBeLessThanOrEqual(3);  // 1 customer, 1 orders, 1 line items
});
```

---

## 3. Relay Cursor Connection — the resolver

```ts
// src/graphql/resolvers/Customer.ts
import { encodeCursor, decodeCursor } from '../cursors';

export const CustomerResolvers = {
  Customer: {
    orders: async (parent, args, ctx) => {
      const first = args.first ?? 20;
      const after = args.after ? decodeCursor(args.after) : null;

      // Fetch first + 1 to detect hasNextPage
      const limit = first + 1;
      const rows = await ctx.db('orders')
        .where('customer_id', parent.id)
        .modify((q) => {
          if (after) {
            // Cursor encodes (placed_at, id) — use a tuple comparison
            q.whereRaw('(placed_at, id) < (?, ?)', [after.placed_at, after.id]);
          }
          if (args.filter?.status) q.where('status', args.filter.status);
          if (args.filter?.placedAfter) q.where('placed_at', '>=', args.filter.placedAfter);
          if (args.filter?.placedBefore) q.where('placed_at', '<', args.filter.placedBefore);
        })
        .orderBy('placed_at', 'desc')
        .orderBy('id', 'desc')   // stable tiebreaker
        .limit(limit);

      const hasNextPage = rows.length > first;
      const nodes = hasNextPage ? rows.slice(0, first) : rows;

      const edges = nodes.map((node) => ({
        node,
        cursor: encodeCursor({ placed_at: node.placed_at, id: node.id }),
      }));

      return {
        edges,
        pageInfo: {
          hasNextPage,
          hasPreviousPage: !!after,
          startCursor: edges[0]?.cursor ?? null,
          endCursor: edges[edges.length - 1]?.cursor ?? null,
        },
        // totalCount is intentionally NOT computed here — it would require a second COUNT(*).
        // Implement it as a separate field resolver that clients opt into.
      };
    },
  },
};
```

### Cursor helpers

```ts
// src/graphql/cursors.ts
export function encodeCursor(payload: object): string {
  return Buffer.from(JSON.stringify(payload)).toString('base64url');
}

export function decodeCursor<T>(cursor: string): T {
  return JSON.parse(Buffer.from(cursor, 'base64url').toString('utf8'));
}
```

Cursors are opaque to clients. Format can change later without breaking anyone, as long as the schema stays the same.

---

## 4. Deprecation — renaming a field safely

### Step 1: add the new field, deprecate the old one

```graphql
type Order {
  cost: Int @deprecated(reason: "Use `totalCents`. Money values are now integer cents.")
  totalCents: Int!
}
```

Both resolve from the same source — they're aliases at the resolver level.

### Step 2: track usage

If you're on Apollo Studio:
- Studio shows deprecated-field usage per client + version
- Set a threshold alert when usage drops below ~0.1% over a 14-day window

If you're not on a registry, instrument it manually:

```ts
// src/graphql/plugin-deprecation-usage.ts
export const deprecationUsagePlugin = {
  requestDidStart() {
    return {
      didResolveOperation({ document, request }) {
        // Walk the document AST for fields marked @deprecated in the schema.
        // Log the field path + client identifier (User-Agent or a header).
      },
    };
  },
};
```

Pipe to your observability layer (Datadog, Sentry, OpenTelemetry).

### Step 3: remove

Once the deprecated field has had zero reads from production clients for the agreed window (typically 4-8 weeks for mobile, 1-2 weeks for web):

```graphql
type Order {
  # `cost` removed in <ISO date>. Use `totalCents`.
  totalCents: Int!
}
```

Note the removal in the changelog. The schema registry pipeline catches any internal services still consuming the field.

### What never happens

- No `/v2/graphql` endpoint
- No `OrderV2` type
- No flag like `useNewSchema: true` in the request

The schema is one. It evolves additively. Removals are deliberate, scheduled events, not breaking versions.
