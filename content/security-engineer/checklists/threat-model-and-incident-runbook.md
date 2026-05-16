# Checklists — Threat Model + Security Review + Incident Runbook

The canonical references. Use them as the spine of any session.

---

## Part 1 — STRIDE threat model template

For every new feature, service, or significant change, walk the six categories. Fill the table:

| Threat | Concrete scenario | Existing control | Residual risk | Action |
|---|---|---|---|---|
| **Spoofing** — impersonating a user, service, or system | e.g., stolen session token used to upload to victim profile | Bearer JWT + 1h expiry + refresh token rotation | Medium | Add device-binding to refresh tokens; alert on geolocation jumps |
| **Tampering** — modifying data in transit or at rest | e.g., uploaded image content swapped post-upload | TLS in transit; S3 object-lock for compliance | Low | Add SHA-256 manifest stored alongside object; verify on read |
| **Repudiation** — actions without an audit trail | e.g., admin deletes a record, denies it | Immutable audit log table; admin actions signed by Cognito role | Low | Periodic offsite log shipping for tamper resistance |
| **Information disclosure** — leaking data to unauthorized parties | e.g., direct S3 URL leaks via referer logs | All S3 access via presigned URL with 15min TTL | Low | Strip Referer header at app boundary; deny public bucket policies via SCP |
| **Denial of service** — exhausting resources | e.g., 10GB upload exhausts disk on application server | Stream-to-S3 (no app-server buffering); 100MB per-file cap; per-account quota | Medium | Add per-IP rate limit at CDN; expensive query timeout 5s |
| **Elevation of privilege** — low-privilege actor becomes high-privilege | e.g., parameter tampering on `tenant_id` accesses another tenant's data | Per-request authz check; Postgres RLS on every multi-tenant table | Low | Add penetration test for tenant isolation each major release |

End with an **action list prioritized by residual risk**: address all High first, then Medium, then Low. Each action has an owner and a due date.

---

## Part 2 — Security review checklist (OWASP ASVS-aligned)

Walk every section. Each finding gets severity + CWE + concrete fix.

### Auth (CWE-287, CWE-306)

- [ ] Is identity established before any privileged action?
- [ ] Are passwords stored with a current memory-hard hash (Argon2id, scrypt, bcrypt)?
- [ ] Is the session token bound to the user-agent and IP class (with reasonable tolerance)?
- [ ] Is MFA required for high-risk actions (admin login, payment method changes, password reset)?
- [ ] Are the recovery flows as hardened as the login flow? (This is where most ATOs happen.)
- [ ] Is the JWT `alg` pinned server-side? (No `alg: none`, no `RS256` → `HS256` confusion.)
- [ ] Is token expiry enforced AND short (15m–1h for access tokens)?
- [ ] Do refresh tokens rotate on use and invalidate on theft signals?

### Authz (CWE-285, CWE-639)

- [ ] Is authorization checked **per resource**, server-side, every time?
- [ ] No IDOR: fetching `/v1/invoices/123` verifies the caller owns or has access to invoice 123, not just "is authenticated"?
- [ ] Are role/permission checks centralized (middleware, RLS) rather than scattered?
- [ ] In multi-tenant: is `tenant_id` enforced at the database layer (RLS) AND application layer?
- [ ] Are admin and service-role privileges separated? Service role never reachable from a customer-facing endpoint?

### Input (CWE-20, CWE-89, CWE-78, CWE-94)

- [ ] Every input has a typed schema (Zod, JSON Schema, Pydantic, Joi, protobuf)?
- [ ] Length limits on every string field?
- [ ] Character class allowlist per field (not a blocklist)?
- [ ] SQL via parameterized queries / prepared statements / ORM — never string concatenation?
- [ ] Shell commands avoided; if unavoidable, args passed as an array, never via shell interpolation?
- [ ] URL fetches block RFC 1918, link-local, and metadata endpoints (`169.254.169.254`)?

### Output (CWE-79, CWE-116)

- [ ] HTML output is context-encoded via a templating engine that escapes by default (React, Jinja autoescape on, Handlebars)?
- [ ] Log output strips passwords, tokens, PII at the logging boundary?
- [ ] JSON output uses a serializer that handles untrusted strings safely?
- [ ] Content-Type headers are correct? `X-Content-Type-Options: nosniff` set?
- [ ] CSP header is non-trivial (no `unsafe-inline`, no `unsafe-eval`)?

### Secrets (CWE-798, CWE-522)

- [ ] No secrets in code? (Scan with `gitleaks` or `trufflehog` in CI.)
- [ ] No secrets in the deploy artifact (Docker image, bundle)?
- [ ] No secrets in CI logs? (Use the CI provider's masking.)
- [ ] Rotation policy defined for every secret type?
- [ ] Secrets scoped to least privilege? (One secret per service, not a god-secret.)
- [ ] KMS used for at-rest encryption with documented algorithm + rotation?

### Logs (CWE-117, CWE-532)

- [ ] Security-relevant events logged: auth success/fail, authz fail, privilege change, secret access, admin actions?
- [ ] Logs are tamper-evident or shipped offsite within minutes?
- [ ] Logs do NOT contain passwords, tokens, full credit card numbers, full SSNs, raw PII?
- [ ] Log retention defined and enforced?

### Dependencies (CWE-1104, CWE-829)

- [ ] Lockfile in version control (`package-lock.json`, `poetry.lock`, `Cargo.lock`, `go.sum`)?
- [ ] Scanner running on every PR (Dependabot, Snyk, GitHub Advisory)?
- [ ] Process for triaging Critical/High findings within SLA?
- [ ] Upgrade reviews include a quick look at the diff — is the maintainer the one you trust?
- [ ] No `*` or `latest` version ranges in production manifests?

### Network (CWE-918, CWE-352)

- [ ] No public databases? (RDS/Postgres on private subnet, accessed through bastion or VPN.)
- [ ] Egress restricted to known destinations (security groups, NACLs, egress proxy)?
- [ ] mTLS or signed requests between internal services?
- [ ] CORS configured restrictively (specific origins, not `*` with credentials)?
- [ ] SameSite cookie attribute set; CSRF tokens for state-changing requests on cookie auth?

---

## Part 3 — Incident response runbook

### Severity definitions

- **Sev-1**: active exploitation, data exfiltration, customer impact, or production down. War room. 15-min updates. Exec notified within 30min. CEO + Legal notified within 1h if customer data potentially breached.
- **Sev-2**: degraded service, contained compromise, no customer data impact confirmed. Hourly updates. Sec lead + Eng lead on-call.
- **Sev-3**: anomaly without confirmed impact. Daily standup. Owner assigned.

### Phase 1 — Detect

1. Confirm the alert is real (not a false positive from a known-noisy rule).
2. Time-stamp the detection. This is hour zero in the post-mortem timeline.
3. Open the incident channel (Slack channel, PagerDuty incident, whatever the team uses).
4. Page the right humans: on-call engineer first, security lead second, eng manager third.
5. Assign an Incident Commander (IC). All decisions route through the IC.
6. Start the timeline document — everything that happens gets a timestamp + actor + action.

### Phase 2 — Contain

Stop the bleeding. Concrete actions, by category:

- **Compromised credential**: revoke immediately. Rotate the secret. If it's a long-lived API key, invalidate all sessions associated.
- **Account takeover**: force re-authentication for the affected user(s). Invalidate refresh tokens. Notify the user out-of-band.
- **Vulnerable endpoint actively exploited**: take it offline at the load balancer or WAF. Do not patch in panic — patch in calm after containment.
- **Compromised host**: isolate at the network layer (security group, VPC). Do NOT delete the instance — preserve for forensics.
- **Malicious dependency**: pin the previous known-good version. Force a rebuild and redeploy.

**Critical rule: disable, don't delete.** Preserve evidence. Forensics needs the artifact.

### Phase 3 — Eradicate

- Identify the root cause. Not "what was exploited" — *why* the vuln existed and *why* it wasn't caught.
- Patch the vulnerability. Verify the patch in a staging environment that mirrors production.
- Revoke ALL credentials reachable from the compromised path. Assume lateral movement happened until proven otherwise.
- Rebuild compromised hosts from clean images. Do not patch in place — adversaries leave persistence.
- Audit dependencies pulled during the compromise window for tampering.

### Phase 4 — Recover

- Restore service with heightened monitoring tuned for re-occurrence.
- Validate from outside the perimeter (external scanner, synthetic monitor, customer-style test).
- Watch for the second wave — adversaries who got in once often have a backup path.
- Communicate restoration to customers, internal stakeholders, and (if required) regulators.

### Phase 5 — Lessons

Within 7 days of incident close:

- **Blameless post-mortem.** No "John should have known better." The system allowed it; the system needs to change.
- **Timeline** reconstructed from logs, the incident channel, and the timeline document.
- **Contributing factors** enumerated: technical, process, human, organizational.
- **Action items** with named owners and concrete due dates. Track them to completion in the same place you track engineering work.
- **What worked** documented alongside what didn't. The detection that fired in 4 minutes deserves a callout as much as the gap that took 4 hours to close.

### Communication templates (skeletons)

**Sev-1 internal update (15min cadence)**

```
T+<minutes>: Status: [Investigating | Contained | Eradicating | Recovering | Recovered]
Impact: [systems / customers affected]
Latest: [most recent action]
Next: [next action and ETA]
IC: [name]
```

**Customer notification (after containment, before recovery)**

```
What happened: [brief, factual]
When: [time window in customer's timezone]
Impact on you: [specific actions the customer should take]
What we're doing: [containment + recovery in plain language]
What's next: [post-mortem timeline]
Contact: [security@ address]
```

Do not over-promise on "no data was accessed" until forensics confirms it.

---

## Part 4 — The "we're shipping this Friday" reality check

If the team is about to ship something security-relevant under time pressure:

1. What's the single thing that, if it goes wrong, ends the company? (Auth bypass, data exfil, payment compromise.) Verify *that one thing*.
2. Is the new code behind a feature flag we can flip off in < 1 minute?
3. Is there a monitoring rule that would alert us within 5 minutes if the bad thing happened?
4. Who's on-call this weekend? Do they have access to the kill switch?
5. Has anyone outside the author looked at the auth/authz changes?

If any answer is "no," that's the conversation, not the ship date.
