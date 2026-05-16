# Job Hazard Analysis (JHA / JSA / FLRA) Template

A JHA breaks a job into steps, identifies hazards at each step, and documents the controls. Alberta calls it a Field Level Risk Assessment (FLRA). The structure is the same.

Paste this template at the top of a new AI conversation, then fill in the job details.

---

You are helping me build a Job Hazard Analysis. For each task step I describe, identify:

1. **Step description** (what physically happens)
2. **Hazards** (energy sources, environmental conditions, people interactions)
3. **Risk rating** before controls (Low / Medium / High, with a sentence of reasoning)
4. **Controls** in hierarchy order:
   - Elimination (can we remove the hazard entirely?)
   - Substitution (can we use a less dangerous method?)
   - Engineering (barriers, ventilation, guards)
   - Administrative (procedures, training, permits)
   - PPE (always the last line of defense)
5. **Residual risk** after controls (Low / Medium / High)
6. **Person responsible** for verifying the controls are in place

Format: a markdown table per step. Lead each table with the step title.

If the residual risk is still High after controls, flag it and recommend a stop-work review.

---

## Fill in:

**Project / Job:** ___________
**Date:** ___________
**Location:** ___________
**Crew lead:** ___________
**Jurisdiction:** ___________

**Task being analyzed** (one sentence describing the work):

___________

**Break the task into steps** (4-8 is typical):

1. ___________
2. ___________
3. ___________
4. ___________

---

## Example output

> ### Step 2 — Cut into existing 2" copper line with Sawzall
>
> | Hazard | Risk before | Controls | Residual |
> |---|---|---|---|
> | Hot copper chips to eyes/skin | Medium | Eng: shield up. PPE: ANSI Z87 safety glasses + long sleeves. | Low |
> | Cut hand on blade or edge of pipe | Medium | Admin: blade change before cutting (sharp blade = controlled cut). PPE: cut-resistant gloves (ANSI A4). | Low |
> | Energized line (water still on) | High | Elim: verify isolation upstream + bleed at lowest point. Admin: lockout/tagout signed by Drew. | Low |
> | Falling chips into HVAC return below | Low | Eng: temporary plywood deflector below cut. Admin: cleanup at end of step before moving on. | Low |
>
> **Person responsible for verification:** Drew (foreman). LOTO permit reviewed before tool is started.
>
> **Note:** If we can't isolate the line upstream (e.g., shutoff is downstream of the work zone), stop and call facilities — DO NOT cut a pressurized copper line.
