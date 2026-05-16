# Funnel A/B test — chip funnel vs open-textarea wizard

Wave 3 deliverable #7 ships a new chip-driven onboarding funnel and parks
the original open-textarea wizard at `/wizard` for parallel running. This
doc captures the test design, the metrics that matter, and the call we'll
make based on results.

## What changed

| Surface                | Before                            | After                                         |
|------------------------|-----------------------------------|-----------------------------------------------|
| Homepage (`/`)         | `<Wizard>` — single free-text box | `<OnboardingFunnel>` — 3-step chip flow       |
| `/wizard`              | Did not exist                     | The original `<Wizard>` (open textarea)       |
| `/api/recommend`       | Same                              | Same — both UIs post the same shape           |

Both surfaces hit the same recommender endpoint, so the only variable is
the interaction model.

## Hypothesis

The chip funnel raises step-1 → step-3 completion rate by replacing the
blank-textarea blocker. Users who don't know what to type pick a role.
Users who do know what to type can still use the optional free-text field
in step 2.

## Metrics (Plausible / PostHog)

Track on both surfaces:

- `funnel_view` — landed on the homepage / on `/wizard`.
- `funnel_step_advanced` — moved past step 1.
- `funnel_step_advanced_2` — moved past step 2.
- `funnel_recs_rendered` — recommendations rendered after the final step.
- `recs_kit_click` — clicked through to a kit detail page from the recs.
- `recs_kit_purchased` — completed a Stripe checkout within 24h of `recs_kit_click`.

Primary metric: `recs_kit_purchased / funnel_view` per surface.
Guardrail metric: `funnel_recs_rendered / funnel_view` (don't let the new
funnel reduce raw recommendation throughput).

## Sample / horizon

Run for 4 weeks at minimum, or until 1,000 `funnel_view` events per surface
(whichever comes first). Stop early only if the loser is 25%+ behind on
purchase conversion with p < 0.05.

## How to switch on / off

The chip funnel is the default homepage component. To roll back, swap the
`<OnboardingFunnel>` import in `src/app/page.tsx` back to `<Wizard>` and
deploy. The wizard at `/wizard` becomes redundant in that case; remove the
route file.

## A/B-test toggle (future work)

If we want to ramp traffic gradually rather than pick one and ship it, the
right pattern is a PostHog feature flag (`onboarding_funnel_variant`) read
from the layout. Out of scope for Wave 3 — manual roll-out is fine for the
launch cohort.

## Open questions to revisit after week 2

- Are users completing step 2 with chip selections only, or are they typing
  in the optional free-text field? If the free-text field is rarely used,
  remove it.
- Does the funnel ever surface a recommendation the recommender API can't
  serve well? (We're passing a structured useCase string built from chip
  labels — if the recommender does worse on those vs free-text prompts, we
  need to enrich the `recommendPrefix` in `ROLES`.)
- Are recruiters/realtors/founders showing up disproportionately in role
  selection? If yes, that's the catalog the catalog page should foreground.
