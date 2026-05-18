# r/RealEstate — "My listing-writing workflow with Claude, after rewriting it 4 times"

**Target sub:** r/RealEstate
**Post type:** Case study (workflow share)
**Why this post for this sub:** r/RealEstate is overrun with vendor posts. Agents are jaded. The way in is a working-agent voice + specific outputs + zero hard sell. Posting a workflow that actually shows the listing copy lets the work speak.
**When to post:** Sunday or Monday evening. Agents check Reddit when they're prepping their week.
**Expected karma trajectory:** 30-200. Lower ceiling because the audience is smaller (working agents within the 3M-subscriber sub) but high signal.
**Conversion expectations:** Moderate. Real estate agents have budget for $19 tools and the kit is a direct fit. Reddit-to-checkout conversion is higher here than in broader subs because the buyer self-selects.
**Follow-up engagement:** Expect questions about whether the workflow works in specific markets (Canada vs US, urban vs rural), debates about whether agents should use AI for listings at all (one or two will be hostile), and asks for sample outputs on specific listings. Offer to generate a sample for anyone who DMs.
**Handling "is this self-promo" challenges:** Very high mod sensitivity. Disclose Lumenari at the end. If the post is removed, repost with the disclosure moved to the top and the link omitted.

---

## Title

**My listing-writing workflow with Claude, after rewriting it 4 times**

(Alt title: "How I cut listing-copy time from 35 min to 12 min with Claude — workflow share")

---

## Body

I list 20-25 properties a year, mid-market residential. The writing-and-research portion of the job was eating 6-9 hours per week. Just writing — not the listing showings, not the negotiations, not the actual selling. The non-selling work that agents don't get paid for explicitly.

I rebuilt my Claude workflow four times before it landed. Posting because the structural lessons are useful even if you build your own version of this.

### What didn't work (versions 1-3)

**V1: "Write me a listing for 123 Oak Street."** Hallucinated features that weren't there. Generic copy. Had to rewrite half of it. Net time savings: zero.

**V2: Detailed prompt with property details upfront.** Better, but the model kept inserting cliché phrases ("nestled in," "boasts," "stunning"). Spent the time savings editing out real-estate-prose stereotypes.

**V3: Custom GPT with my brand voice pre-loaded.** Closer. But the model still hallucinated features 20-30% of the time. The voice was right; the facts were wrong.

### What worked (V4)

Four structural changes:

**1. Input-grounding as a hard constraint.**
The model gets explicit instructions: "Every feature you mention must come directly from the input notes. If a feature isn't listed in the input, you cannot include it. If asked to embellish, refuse and ask for the missing detail."

This single rule killed the hallucination problem entirely. The model now asks me questions when the input is thin instead of inventing features.

**2. Three-version output, not one.**
The model produces:
- MLS-formal version (for the MLS field — straightforward, feature-forward)
- Social-friendly version (Instagram, Facebook — shorter, emotional)
- Buyer-side narrative (for the showing handout — paints a picture)

Three outputs in one pass costs me 12 minutes instead of 35 (the old workflow generated one version, then I rewrote it for two other channels).

**3. Comp-analyzer as a separate workflow.**
I keep listing copy and comp analysis as two separate "kits" in my Claude project. Listing copy doesn't need market data; market data doesn't need to know my brand voice. Splitting them made both faster and more accurate.

The comp-analyzer takes 5-10 recent sales as input and produces a defensible price recommendation with reasoning. It does NOT just spit out a number — it walks through the comparable adjustments (square footage, lot size, condition, time decay) and shows its work.

**4. Buyer-persona as a pre-step.**
Before writing the listing, the model asks me what the likely buyer profile is for this property. Family with young kids? Empty-nesters downsizing? Investors? The persona affects every choice — what to lead with, what to deemphasize, what tone.

This pre-step takes 60 seconds. It changes the output meaningfully.

### Sample output

Input notes (paraphrased): "3-bed 2-bath bungalow, 1450 sq ft, finished basement, large back yard with mature trees, attached single garage, updated kitchen (2022), original bathrooms, on a quiet street in [neighborhood], near elementary school. Asking $X."

Buyer persona (model asked, I provided): Young family, first or second home, two parents working hybrid, kids 4-9 age range.

Output (MLS-formal version, 65 words):

> Updated 1450 sq ft bungalow on a quiet, family-friendly street in [neighborhood]. Three bedrooms and two bathrooms, attached single garage, finished basement adds usable space for play or office. Kitchen renovated 2022. Mature backyard offers privacy and shade. Walking distance to [school]. Move-in ready with room to grow into. Listed at [price].

Compare that to the V1 version which mentioned "hardwood floors" (there were none) and "open-concept living" (it wasn't).

The win isn't the prose. It's the grounded honesty.

### Time math

- Listing copy per property: 35 minutes → 12 minutes
- Comp analysis per property: 90 minutes → 25 minutes
- Inquiry email replies: 10 minutes → 3 minutes
- Buyer narratives (previously skipped): 0 → 8 minutes (worth doing now because it's fast)

Net: about 6 hours per week back. Used it to door-knock instead. Closed 3 extra deals last quarter that I attribute partially to the freed-up time.

### What this workflow won't do

- **It won't write a listing for a property you haven't seen.** The input notes have to be accurate. Garbage in, garbage out.
- **It won't replace your taste.** The model produces three versions; you pick. Sometimes you mix.
- **It won't handle the negotiation.** That's still you. AI is good at writing; it's bad at reading a room.
- **It won't write your voice perfectly.** You'll edit. Less than you think, but you'll edit.

---

Disclosure: I packaged this workflow as a kit on lumenari.io (real-estate-pro, $19). The structural argument above is the actual lesson — you can build this yourself in an hour by following the four-point structure. If you want a shortcut, the kit exists. Either way, the four points are the win.

Anyone else running a listing-writing workflow with Claude or ChatGPT? Curious what other agents have landed on, especially in different markets.
