# Quick Start — GraphQL API Design Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan). In the project's "Custom instructions" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `patterns/schema-and-resolvers.md` into the project knowledge. Start a new conversation. First message: tell Claude your setup — "Apollo Server 4 on Node, Apollo Client on web, Apollo iOS + Apollo Kotlin on mobile, Postgres behind the scenes, public-facing API" — then describe the feature or refactor.

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `patterns/schema-and-resolvers.md`. Save the GPT (private to you is fine). Open it and start with: "Apollo Server 4, Apollo Client web + iOS, Postgres. Design a schema for a customer-orders feature."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. It'll work — you just lose the persistent GPT and the file uploads.

## Gemini, Cursor, Codex, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me for server library, client(s), public vs internal, and what I'm designing." Once it does, you're set.

For Cursor specifically: drop `SKILL.md` at the root of your project. Cursor's `.cursorrules` or project rules will pick it up automatically.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. Apollo Server 4 on Node, Postgres backend, Apollo Client (web) + Apollo iOS + Apollo Kotlin. Public-facing API. Design the schema and resolvers for: a Customer can view their Orders, each Order has many LineItems and a ShippingStatus. The mobile app needs to paginate orders by recent. The web app also needs a "cancel order" action. Include nullability rationale, DataLoaders, pagination shape, and the deprecation strategy if I'm later renaming `Order.cost` to `Order.totalCents`.
```

If you get back: a schema with `Customer`, `Order`, `LineItem`, `ShippingStatus` types each implementing `Node`; `Customer.orders` as an `OrderConnection` with `first/after/last/before`; a `cancelOrder` mutation with `Input` + `Payload` + `errors: [UserError!]!`; a per-request DataLoader for `Order.lineItems` and `Order.shippingStatus`; `Order.cost` deprecated via `@deprecated(reason: "Use totalCents. Money values are now integer cents.")` alongside the new field; opaque global IDs (not raw DB integers); plus nullability rationale per field — the kit is loaded right.

If you get back a schema with `id: Int!`, `lineItems: [LineItem!]!` (no pagination), `updateOrder(status: String)` instead of a named mutation, or a resolver that runs a DB query without DataLoader, the system prompt didn't load — paste it again.
