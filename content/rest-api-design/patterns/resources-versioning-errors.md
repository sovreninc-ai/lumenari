# Patterns — Resources, Versioning, Errors

The canonical reference for the three things that decide whether a REST API ages well.

---

## Resource design recipes

### Recipe 1: Plain CRUD resource

The simplest case. One entity, five operations.

```
POST   /v1/invoices              → 201 Created, Location: /v1/invoices/{id}
GET    /v1/invoices              → 200 OK, paginated list
GET    /v1/invoices/{id}         → 200 OK | 404 Not Found
PATCH  /v1/invoices/{id}         → 200 OK | 404 | 422
DELETE /v1/invoices/{id}         → 204 No Content | 404
```

Don't add a `PUT` unless a real consumer needs full-replacement semantics. PATCH covers 95% of update needs.

### Recipe 2: State transition as sub-resource

When the operation isn't really an "update" — it's an event with its own audit trail.

```
POST /v1/invoices/{id}/payments        → records a payment
POST /v1/subscriptions/{id}/cancellations → records a cancellation
POST /v1/orders/{id}/refunds           → records a refund
```

The sub-resource has its own ID, its own GET endpoint, and shows up in audit logs naturally. The parent resource's status field becomes a denormalized projection of the sub-resource events.

### Recipe 3: Bulk operations

Two acceptable shapes:

**Shape A: bulk endpoint with array body**
```
POST /v1/invoices/bulk
{
  "items": [ { ... }, { ... } ],
  "atomic": true
}
```
Returns 200 with per-item results. `atomic: true` means all-or-nothing; `false` means partial success allowed.

**Shape B: async job**
```
POST /v1/jobs/invoice-imports
→ 202 Accepted, Location: /v1/jobs/{id}
GET /v1/jobs/{id} → status polling
```

Use B for anything that might take more than a few seconds. Use A for small bounded batches.

### Recipe 4: Search vs filter

`GET /v1/invoices?status=paid&customer_id=cus_123` is filtering. Predictable, indexable, OK.

`POST /v1/invoices/search` with a JSON body is a search query. Use when the filter complexity exceeds what fits in a query string (faceted search, full-text, complex boolean trees). POST is correct here even though it's a read — the body is too large for a GET.

---

## Versioning ladder

### Level 1: Additive change (no version bump)

- Add a new optional field to a response
- Add a new endpoint
- Add a new optional query parameter
- Loosen a validation rule (accept more inputs)
- Add a new enum value (with caveats — see below)

### Level 2: Soft-breaking (no version bump, but communicate)

- Add a new enum value to a response field. Document it. Clients should handle unknown enum values gracefully — if they don't, that's a client bug, but you should still announce.
- Add a new required field to a webhook payload. Webhook consumers parse loosely; safe in most cases. Announce.

### Level 3: Hard-breaking (new major version)

- Remove a field from a response
- Rename a field
- Change a field's type (`string` → `number`, nullable → non-nullable)
- Change a default value
- Make an optional request field required
- Change the semantics of an existing value
- Change the URL structure of an existing endpoint

### Deprecation timeline

```
T+0       Ship /v2/foo alongside /v1/foo. Both work identically except for the change.
T+0       Mark /v1/foo deprecated: true in the OpenAPI spec.
T+0       /v1/foo responses include:
          Deprecation: true
          Sunset: <RFC 1123 date>
          Link: </v2/foo>; rel="successor-version"
T+0       Email partners. Free-tier users get a banner in the dashboard.
T+3mo     Reminder email. List of partners still calling /v1/foo and how often.
T+5mo     Final reminder. Personal outreach to top callers.
T+6mo     /v1/foo returns 410 Gone with the migration link in the body.
T+6mo+1w  /v1/foo removed entirely.
```

6 months is the minimum for paid partners. 90 days is the minimum for free-tier or internal-only.

---

## Error envelope — the catalog

Every error response in the API uses RFC 7807 Problem Details. The catalog below is the starter set every API needs.

```yaml
# components/schemas/Problem in OpenAPI
Problem:
  type: object
  required: [type, title, status, code]
  properties:
    type:
      type: string
      format: uri
      description: A URI identifier for the error type
    title:
      type: string
      description: Short human-readable summary
    status:
      type: integer
      description: HTTP status code
    detail:
      type: string
      description: Specific message about this occurrence
    instance:
      type: string
      description: URI of the specific occurrence
    code:
      type: string
      description: Machine-readable error code
    trace_id:
      type: string
      description: Correlation ID for support and logs
    violations:
      type: array
      description: Field-level violations (for validation errors)
      items:
        type: object
        required: [field, code, message]
        properties:
          field: { type: string }
          code: { type: string }
          message: { type: string }
```

### Starter code catalog

| Status | Code | When |
| --- | --- | --- |
| 400 | `MALFORMED_REQUEST` | Invalid JSON, missing required header |
| 401 | `UNAUTHENTICATED` | No token, expired token, invalid token |
| 403 | `FORBIDDEN` | Authenticated but lacks the scope |
| 403 | `INSUFFICIENT_SCOPE` | Token valid but doesn't include the required scope |
| 404 | `RESOURCE_NOT_FOUND` | Resource never existed or was hard-deleted |
| 409 | `CONFLICT` | Optimistic concurrency failure (ETag mismatch) |
| 409 | `STATE_CONFLICT` | Operation not allowed in current resource state |
| 410 | `GONE` | Resource was soft-deleted or version sunset |
| 422 | `VALIDATION_FAILED` | Field-level validation; populate `violations` |
| 422 | `IDEMPOTENCY_KEY_REUSED` | Same key, different body |
| 429 | `RATE_LIMITED` | Include `Retry-After` header |
| 500 | `INTERNAL_ERROR` | Server bug; trace_id critical |
| 503 | `DOWNSTREAM_UNAVAILABLE` | Dependency (DB, third party) failed |

Add domain-specific codes per resource: `INVOICE_NOT_FOUND`, `SUBSCRIPTION_ALREADY_CANCELLED`, etc. These extend, not replace, the generic codes.

### What goes where

- **`title` is for humans.** "Invoice not found." Short. Stable across occurrences.
- **`detail` is for this occurrence.** "No invoice with id inv_01H8X exists in account acc_42."
- **`code` is for machines.** SDKs `switch(error.code)`. Keep it stable; treat it like an API contract.
- **`trace_id` is for support.** When a user opens a ticket, this is what they paste. The server logs the same value.

---

## Partner-facing breaking change checklist

Before announcing a breaking change to paid partners:

1. The replacement endpoint exists, is documented, and has SDK support
2. The migration guide is written and linked from the deprecation notice
3. A spike-test environment is available so partners can validate against the new version
4. Internal services calling the old endpoint have already migrated
5. Telemetry shows how many calls/day each partner makes to the deprecated endpoint
6. Top callers (by volume and by contract value) have been notified individually
7. The sunset date is in the contract terms (most enterprise contracts mandate 6-12 months)
8. Customer success has a script for the inbound questions
9. The 410 Gone response body contains a clear migration link, not just an error code
10. Post-sunset, you can demonstrate the old endpoint genuinely returns 410 for at least one full cycle before code removal

If any of these is "we'll do it later," you're not ready to announce.
