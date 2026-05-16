# Quick Start — Go Backend Pack

You should be running in under 60 seconds. Pick your tool.

## Claude users

Open Claude. Create a new Project (Pro or Team plan needed for projects, but the prompt works in a regular chat too). In the project's "Custom instructions" field, paste the entire contents of `optimization-pack.md`. Upload `memory.md` and `patterns/idiomatic-go-and-grpc.md` into the project knowledge so Claude has them as reference. Start a new conversation. First message: tell Claude your setup — "Go 1.22, stdlib net/http with chi for middleware, pgx/v5 on Postgres, gRPC for internal service, deploying to Fly as distroless" — then describe what you're building.

## ChatGPT users

Open ChatGPT. Click "Explore GPTs" → "Create a GPT" (Plus plan required). In the "Instructions" field, paste the entire contents of `custom-gpt-instructions.md`. In "Conversation starters," use the five listed at the bottom of that file. In "Knowledge," upload `memory.md` and `patterns/idiomatic-go-and-grpc.md`. Save the GPT (private to you is fine). Open it and start with: "Go 1.22, stdlib net/http + chi, pgx/v5, gRPC internal, Fly distroless. I want to scaffold a handler."

If you don't have ChatGPT Plus, paste `optimization-pack.md` at the top of a regular chat. It'll work — you just lose the persistent GPT and the file uploads.

## Gemini, Cursor, Codex, or any other AI tool

Open the tool. Start a new conversation. Paste the entire contents of `optimization-pack.md` as your first message. Add: "Acknowledge you've loaded this and ask me about HTTP/gRPC, router, DB layer, and deploy target." Once it does, you're set.

For Cursor specifically: drop `SKILL.md` at the root of your project. Cursor's project rules pick it up.

---

## Test it works

Once you've loaded the system prompt, paste this in:

```
Test run. Go 1.22, stdlib net/http with chi for middleware, pgx/v5 on Postgres, log/slog + OTel, deploying as distroless to Fly. Build me a GET /users/{id} handler: validate the path param, call a UserService.Get(ctx, id), map ErrNotFound to 404 and ValidationError to 400, return a typed JSON response. Then give me the main.go with graceful shutdown via signal.NotifyContext and errgroup.
```

If you get back: a handler that pulls `ctx := r.Context()`, uses `r.PathValue("id")` (Go 1.22 stdlib), calls into a `UserService` with `ctx` as the first arg, errors wrapped with `fmt.Errorf("...: %w", err)`, a `writeError` helper using `errors.Is` / `errors.As` to map to status codes, a `main` that wires the chi router into `*http.Server`, `signal.NotifyContext(ctx, syscall.SIGINT, syscall.SIGTERM)`, an `errgroup.WithContext(ctx)` running ListenAndServe and Shutdown as siblings, and a distroless multi-stage Dockerfile with `STOPSIGNAL SIGTERM` — the kit is loaded right.

If you get back `panic` for not-found, `init()` opening the DB pool, `interface{}` in the service signature, `return err` without wrapping, or `log.Fatal` outside main, the system prompt didn't load — paste it again.
