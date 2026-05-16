# Memory — GraphQL API Design Pack

## Domain context

A developer is designing or refactoring a GraphQL API. The server is one of: Apollo Server (Node), GraphQL Yoga, Hasura (auto-generated from Postgres), Postgraphile (same idea), or a framework-native layer like graphql-ruby in Rails, Graphene in Django, or gqlgen in Go. The clients are usually a mix: a web app with Apollo Client or Relay or urql, and a mobile app with Apollo iOS / Apollo Kotlin. Sometimes a third-party developer is consuming the API too (Shopify, GitHub, Stripe all ship public GraphQL).

The job is split between schema design (what types, what fields, what nullability, what arguments) and resolver implementation (how to fetch the data without N+1ing). The hard parts are: keeping the schema evolvable (deprecate, never break), preventing the API from being a thin shell over the database (clients want denormalized views, not joins), and stopping `n` rows × `m` related fields from becoming `n × m + 1` database queries via DataLoader batching.

The expensive lessons: marking a field non-null is permanent, because removing the `!` is a breaking change even if the underlying logic supports null. Exposing internal IDs ties the public API to the DB primary key forever. Skipping pagination on a list lets one bad query DoS the server. Writing one fat `updateOrder` mutation that takes 12 optional fields produces ambiguous semantics that mobile clients have to defend against forever. The team has at least one war story about a `Float` field becoming `Int` and breaking iOS until a TestFlight emergency.

## Vocabulary the AI should know

- SDL: Schema Definition Language — the GraphQL type system in text form. `type Order { id: ID! }`
- Resolver: the function that returns a field's value. One per field, by default. Many at scale
- Scalar: leaf type — `String`, `Int`, `Float`, `Boolean`, `ID`, plus custom (`DateTime`, `URL`, `EmailAddress`)
- Non-null: `String!` — the type system promises this field is never null. Removing `!` is a breaking change
- DataLoader: a batching + caching layer for the lifetime of one request. `userLoader.load(id)` batches into one DB query
- N+1: the default failure mode of nested GraphQL resolvers — one query for the list, then one query per item for the related field
- Relay: Facebook's GraphQL client + its conventions (global IDs, connections, refetch, fragments). Many APIs follow Relay conventions even without using the client
- Connection: Relay's pagination shape — `{ edges: [{ node, cursor }], pageInfo: { hasNextPage, endCursor } }`
- Cursor: an opaque token identifying a position in a list. Base64-encoded, server-generated, client-opaque
- Global ID: an opaque, type-aware ID — typically `base64(<TypeName>:<dbid>)`. Lets `node(id:)` resolve any entity
- Fragment: a reusable piece of a query — `fragment UserFields on User { name email }`. Composes into queries and mutations
- Subscription: real-time channel — server pushes updates to clients over WebSocket
- Federation: Apollo's multi-service schema composition — each service owns a subgraph, a router stitches them
- Persisted query: a query identified by a hash; the client sends only the hash. Reduces bandwidth, prevents arbitrary queries from clients
- Query complexity: a numeric cost assigned per field; the server caps the total. Defense against malicious deep queries
- Query depth limit: server-enforced cap on how deep a query can nest. 7-10 is typical
- Schema directive: `@deprecated`, `@auth`, `@cost` — annotation on schema elements that resolvers + tools can read
- @deprecated: SDL directive marking a field as soon-to-be-removed. Clients keep working; the deprecation reason guides migration
- @defer / @stream: experimental directives that let large responses stream incrementally
- Codegen: tooling that generates typed client code (TypeScript types, Swift/Kotlin types) from the schema + queries
- Apollo Studio / Hive / Mercurius: schema registries that check proposed changes against recent traffic
- Introspection: the GraphQL feature that lets clients query the schema itself. Disabled in production for many public APIs

## Common workflows

- Schema design from a use case: user describes a feature ("show a customer's orders with line items and shipping status"). Trigger → identify the types involved (Customer, Order, LineItem, ShippingStatus); decide which fields belong on which type (orders on Customer, lineItems on Order); design the queries (`viewer.orders(first:, after:)` as a Connection); design the mutations (`cancelOrder(input: CancelOrderInput!): CancelOrderPayload!`); decide nullability per field — non-null only when guaranteed; sketch the SDL → review for over-fetching, leak of DB structure, and missing pagination.
- Resolver structure with DataLoader: user has a `User.posts` resolver that runs a DB query per user. Trigger → create a `postsByUserIdLoader` in the per-request context using `new DataLoader(async (userIds) => batchLoadPostsByUserIds(userIds))`; the loader function does ONE `SELECT * FROM posts WHERE user_id IN (...)`; in the resolver, `return ctx.loaders.postsByUserId.load(parent.id)`; assert in tests that loading 100 users + their posts = 2 DB queries, not 101 → repeat for every cross-entity resolver.
- Pagination — Relay-style connections: user is adding a list endpoint. Trigger → define `OrderConnection { edges: [OrderEdge!]!, pageInfo: PageInfo!, totalCount: Int }`, `OrderEdge { node: Order!, cursor: String! }`, `PageInfo { hasNextPage: Boolean!, hasPreviousPage: Boolean!, startCursor: String, endCursor: String }`; the field args are `first: Int, after: String, last: Int, before: String, filter: OrderFilter, orderBy: OrderSort`; cursor encodes the sort key + the row's stable ID (e.g., `base64(created_at|id)`); resolver uses `WHERE (created_at, id) < (cursor.created_at, cursor.id) ORDER BY created_at DESC, id DESC LIMIT first+1`; the +1 lets you compute `hasNextPage`.
- Schema versioning + deprecation: user wants to rename `Order.cost` to `Order.totalCents`. Trigger → add the new field; resolve it from the same source as the old; mark old `@deprecated(reason: "Use totalCents — money values are now integer cents")`; track usage of the deprecated field via Apollo Studio / Hive (or query logging); only after 0 production reads for N weeks, remove it; communicate via the deprecation list in the schema registry and changelog → never bump a "v2" — the schema evolves additively in place.

## What to avoid / common mistakes

- Non-null where you can't guarantee: marking `User.name: String!` when name can be deleted, race-conditioned on delete cascades, or empty for a partially-created account. You can never go back to nullable without breaking clients.
- N+1 in nested resolvers: `User.posts` resolver runs one query per User. With 100 users in a list, that's 100 queries. DataLoader batches them into 1.
- DB tables as GraphQL types 1:1: exposes junction tables, snake_case columns, internal flags. The schema should reflect the domain, not the storage.
- Lists without pagination: `posts: [Post!]!` with no args lets a client request 10M posts. Use a Connection with required `first` (or a sensible default like 20).
- Internal IDs as global IDs: `id: ID!` returning `42` ties you to the auto-increment column forever. Use opaque global IDs (`base64('User:42')`).
- Big-blob mutation inputs: `updateOrder(input: { id, status, customerId, lineItems, shippingAddress, billingAddress, discountCode, notes, metadata })` — six semantic operations in one fuzzy verb. Split into focused mutations or sequence calls.

## Tone / register

A real GraphQL designer sounds like they've shipped a public API and felt the pain of a deprecation. They mention specific server libraries (Apollo Server 4, Yoga, gqlgen, graphql-ruby), specific client tooling (Relay's compiler, Apollo Codegen, urql Graphcache), and specific failure modes (the "Apollo cache normalization broke after I renamed `id` to `nodeId`"). They use lowercase prose, PascalCase for type names, camelCase for fields and arguments. They will reject non-null on values that aren't guaranteed forever, will reject resolvers that hit the DB without a DataLoader, and will reject lists without pagination. They cite the Relay Cursor Connections spec, the GraphQL spec section on `@deprecated`, and the Apollo docs on caching.
