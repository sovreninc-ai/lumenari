# Patterns — Playwright/Cypress + Flake Reduction

Long-form reference: Page Object Model done right, the flake triage runbook, CI parallelization + sharding strategy.

---

## Part 1 — Page Object Model done right

### When to use POM

A flow appears in **three or more tests**. Login. Checkout. Search-and-filter. Settings save. New-user onboarding.

### When NOT to use POM

A page that one test touches. Premature abstraction. You will end up with a class whose only consumer is the test you wrote it for, and the class will rot.

### Shape: methods describe user intent

```typescript
// pages/LoginPage.ts
import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
    await expect(this.page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
  }

  async loginAs(email: string, password: string) {
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    // Wait for the post-login state, not on a timer
    await expect(this.page).toHaveURL(/\/dashboard/);
  }

  async expectErrorMessage(expected: string | RegExp) {
    await expect(this.page.getByRole('alert')).toContainText(expected);
  }
}
```

Notice what's there:
- Methods named `loginAs`, `expectErrorMessage` — verbs from the user's perspective.
- Locators inline inside methods, not as class properties — easier to grep, harder to misuse from outside.
- Each method ends with an assertion that proves the state, so callers don't need their own wait.

Notice what's NOT there:
- No `getEmailInput()`, `getPasswordInput()`, `clickSubmitButton()`. Those are DOM-mechanics methods, not user-intent methods. They leak abstraction.

### Cypress variant

```javascript
// pages/LoginPage.js
export class LoginPage {
  visit() {
    cy.visit('/login');
    cy.findByRole('heading', { name: 'Sign in' }).should('be.visible');
    return this;
  }

  loginAs(email, password) {
    cy.findByLabelText('Email').type(email);
    cy.findByLabelText('Password').type(password);
    cy.findByRole('button', { name: 'Sign in' }).click();
    cy.url().should('match', /\/dashboard/);
    return this;
  }

  expectErrorMessage(expected) {
    cy.findByRole('alert').should('contain', expected);
    return this;
  }
}
```

Same shape, same discipline. `cy.findByRole` etc come from `@testing-library/cypress` — that library is non-negotiable; it's the closest you get to Playwright's role-based locator in Cypress.

### Where the POM lives

```
tests/
  pages/                  # POMs
    LoginPage.ts
    DashboardPage.ts
    CheckoutPage.ts
  fixtures/               # Test data factories
    users.ts
    products.ts
  helpers/                # Cross-cutting utilities
    auth.ts               # storageState seeding
    seed.ts               # Test DB seeding
  e2e/                    # Test specs
    login.spec.ts
    checkout.spec.ts
```

POMs in their own folder. Specs reference POMs by import, never duplicate locators.

---

## Part 2 — The flake triage runbook

When a test goes red intermittently, work it like an incident.

### Step 1: Reproduce locally

```bash
# Playwright
npx playwright test login.spec.ts --repeat-each=20

# Cypress
npx cypress run --spec cypress/e2e/login.cy.ts --env REPEAT=20
```

If it doesn't flake locally after 20 runs, the cause is likely environmental (CI runner specs, locale, network). If it does flake locally, you have a reproducer.

### Step 2: Walk the matrix

| Symptom | Likely cause | Verify | Fix |
|---|---|---|---|
| "Element not found" but appears in trace seconds later | Race against async render | Trace viewer shows element appearing after action | Wait on the assertion (`toBeVisible`) not a `sleep` |
| Passes locally, fails CI | Environment differs | Diff env: timezone, locale, viewport, network speed | Pin all in test setup |
| 5% of runs, always a different test | Test data not isolated | Tests use shared user, shared DB record | Fresh data per test via factory |
| 5% of runs, always same test | Genuine race in product | Trace shows the product racing | File a product bug, quarantine the test |
| Fails after deploy with no test change | Product changed under the test | Trace shows different DOM than expected | Update test or revert product |
| Fails Monday morning only | DB state accumulated over weekend | Test DB has 100x normal row count | Reset DB between CI runs |
| Suite-wide timeouts | Slow runner or external dep | Trace shows all tests slow | Raise global timeout, monitor dep |
| Fails only in headless | Animation or CSS difference | Headed run passes | Disable animations in test mode |
| Fails only in CI parallel | Tests step on shared resource | Cross-test contention on port, file, DB row | Isolate per-worker |

### Step 3: Investigate, don't retry

The right response to a confirmed flake:

1. **Tag and quarantine.** Add a `flaky` tag, exclude from blocking CI, file a ticket.
2. **Capture the trace.** Playwright's trace viewer is invaluable — every step, every network req, every DOM state.
3. **Reproduce locally.** Tighten the loop.
4. **Find root cause.** From the matrix above.
5. **Fix root cause.** Wait on assertion, isolate data, pin environment.
6. **Verify with `--repeat-each=20`.** If green 20 times, un-quarantine.
7. **Document.** Add a comment in the test linking to the ticket; future archaeologists will thank you.

### Step 4: When the bug is in the product

A test that flakes because the product has a race condition is a test doing its job. The fix is in the product, not the test. The test stays quarantined until the product fix ships. Don't normalize "flaky tests" as a thing the team lives with.

### The retry trap

```typescript
// playwright.config.ts
export default defineConfig({
  retries: 0,           // Local: catch every flake
  // retries: 1,        // CI: let one retry mask real flakes — DON'T
});
```

`retries: 1` in CI lets every flake quietly retry-pass and never surface for investigation. The flakes accumulate. One day they all fire on the same PR and nobody knows where to start.

Better: keep retries at 0 in CI for the always-on suite. Use quarantine + dedicated investigation for confirmed flakes. The pain forces the fix.

---

## Part 3 — CI parallelization + sharding

### The pyramid budgets

| Layer | % of total tests | Total runtime | Trigger |
|---|---|---|---|
| Unit | 70% | < 5min | Every commit |
| Integration | 25% | < 10min | Every PR |
| E2E (smoke) | 3% | < 5min | Every PR |
| E2E (full) | 2% | < 15min via shards | Pre-merge + nightly |
| Visual regression | — | < 10min | Nightly |
| Cross-browser | — | < 30min | Nightly |

### Smoke vs full E2E split

The "smoke" suite is the 5–10 critical journeys that must work for the product to function: sign-in, create-thing, view-thing, delete-thing, pay-thing. Tag them `@smoke`. Run on every PR. If smoke is red, the PR doesn't merge.

The "full" suite is everything else. Runs pre-merge and nightly. Catches subtle regressions without blocking every PR.

```typescript
// playwright.config.ts
export default defineConfig({
  projects: [
    {
      name: 'smoke',
      grep: /@smoke/,
      testMatch: '**/*.spec.ts',
    },
    {
      name: 'full',
      grep: /^(?!.*@nightly-only)/,
      testMatch: '**/*.spec.ts',
    },
    {
      name: 'nightly',
      testMatch: '**/*.spec.ts',
    },
  ],
});
```

### Sharding the full suite

Playwright's `--shard=X/N` divides tests across runners deterministically:

```yaml
# .github/workflows/ci.yml
jobs:
  e2e:
    name: E2E (shard ${{ matrix.shard }})
    strategy:
      fail-fast: false
      matrix:
        shard: ['1/4', '2/4', '3/4', '4/4']
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --shard=${{ matrix.shard }}
        env:
          BASE_URL: ${{ secrets.STAGING_URL }}
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report-shard-${{ strategy.job-index }}
          path: playwright-report/
```

**Shard count = roughly sqrt(test count)** is a reasonable starting point. 100 tests → 10 shards. 400 tests → 20 shards. The goal is each shard running 3–5 minutes — short enough for fast feedback, long enough that runner startup isn't a tax.

### Per-worker isolation

Sharded tests step on each other if they share state. Each worker gets:

- Its own test DB schema (or its own DB), seeded fresh
- Its own filesystem temp dir
- Its own port range if the test spins up servers
- Its own auth state file (`storageState`)

```typescript
// playwright.config.ts
export default defineConfig({
  workers: process.env.CI ? 4 : '50%',
  use: {
    storageState: ({}, use) => use(`./auth/worker-${process.env.TEST_PARALLEL_INDEX}.json`),
  },
});
```

### Cypress equivalent

Cypress uses Cypress Cloud's parallelization (paid) or third-party orchestration. The principles are the same — split spec files across runners, isolate per-worker, separate smoke from full.

### What runs when

```
On every commit (push to feature branch):
  ✓ unit
  ✓ linter
  ✓ typecheck

On every PR:
  ✓ unit
  ✓ integration
  ✓ smoke E2E (5-10 critical journeys, single shard)

Pre-merge (PR to main):
  ✓ full E2E (sharded)
  ✓ visual regression on critical pages

Nightly:
  ✓ full E2E across browser matrix (Chromium, Firefox, WebKit)
  ✓ visual regression (full)
  ✓ perf baseline
  ✓ accessibility audit via axe-core
```

This shape gets fast feedback on every PR (5–10min total CI time), comprehensive coverage on merge, and full health check overnight. The team merges PRs in minutes; regressions surface within hours.
