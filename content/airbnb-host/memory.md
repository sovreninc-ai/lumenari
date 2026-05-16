# Memory — Airbnb / Short-Term Rental Host Pack

## Domain context

A short-term rental host owns or manages 1-5 properties listed on Airbnb, VRBO, Booking.com, or some combination. The business is part hospitality, part operations, part copywriting. A single property in a decent market grosses $25K-$120K per year before expenses (cleaning, supplies, platform fees, mortgage or rent, maintenance, taxes, insurance). Net margin varies wildly — vacation markets with high seasonality can run 40-50% net in a great year and break even in a bad one. Urban year-round markets are flatter but more competitive.

The rhythm of the work is bookings, turnovers, and guest communication. Mornings are messaging — confirming check-ins, answering inquiries, fielding a problem from someone who can't find the WiFi. Mid-day is turnovers (or coordinating with a cleaner). Evenings are pricing review, calendar management, and the writing the host has been putting off — review responses, house manual updates, listing tweaks. Most hosts also have a day job and are doing all of this in 30-90 minute windows.

Reviews are the entire game. Airbnb's algorithm rewards 4.9+ averages with better search placement. A single 3-star review can take a host two months of perfect stays to claw back. Hosts who learn to head off bad reviews with proactive guest communication (the day-after check-in, the mid-stay touch, the honest tradeoffs disclosed in the listing) earn more.

Success looks like: a 4.9 rating across enough reviews that the property ranks in the first page of search, a calendar that fills 60-80% in season without discounting, repeat guests who book direct (where the platform allows it), and a cleaner who shows up. Failure looks like: a 4.6 rating that's stuck, a guest who left a 2-star over something the host could have prevented with one extra sentence in the manual, and a cleaning fee complaint that the host knew was coming.

## Vocabulary the AI should know

- STR: short-term rental — anything under 30 days, generally
- LTR: long-term rental — 30+ days, often a different regulatory regime
- ADR: average daily rate
- RevPAR: revenue per available room (or unit)
- Occupancy: % of nights booked
- Lead time: average number of days between booking and check-in
- Turn / turnover: cleaning + reset between guests
- Cleaning fee: separate charge from nightly rate, set by host, designed to cover the cleaner + supplies
- Platform fee / service fee: what Airbnb (or VRBO) takes from the host (typically 3%) and from the guest (typically 14-16%)
- Smart pricing / dynamic pricing: algorithmic price changes (Airbnb's own, or third party like PriceLabs, Wheelhouse, Beyond)
- Instant Book: bookings that don't require host approval — required for Superhost status
- Superhost: Airbnb performance tier — requires 4.8+ rating, 90%+ response rate, <1% cancellation, 10+ stays/year
- ARI: average review index — the rolling rating
- 5-star vs 4-star: the gap between a 5 and a 4 on Airbnb is massive. Hosts chase 5s, not "good reviews"
- Listing impressions: how often your listing appears in search results
- Conversion: % of listing views that result in a booking
- Off-platform: any communication or booking that happens outside Airbnb's system — restricted by ToS in many cases
- Co-host: someone (often a friend, family, or paid service) who helps manage messages and turns
- House manual: the document or section in the app explaining the property to the guest
- House rules: posted rules a guest must agree to (no smoking, no parties, pet policy, quiet hours, max occupancy)
- Damage claim / Aircover: Airbnb's host protection program for property damage
- Review window: 14 days from check-out to leave a review; both parties review blind until both submit or the window closes
- Day-after check-in: the proactive message a host sends ~24 hours after guest arrival
- COVID-era / post-pandemic shift: longer stays became more common, cleaning standards visibly increased, work-from-anywhere stays grew
- Regulation: many cities now require STR registration, occupancy limits, lodging tax collection — varies hugely by jurisdiction
- AHJ for STRs: the city or county licensing office, or the platform's compliance team

## Common workflows

- Inquiry → booking: a potential guest sends an inquiry or hits Book Now. Host reviews (or relies on Airbnb's verification), responds within minutes ideally, confirms or declines. From inquiry to confirmed booking is usually under 4 hours.
- Pre-arrival sequence: 48 hours before check-in, host sends the address, the door code, parking instructions, what to do on arrival. Morning of check-in, host sends a final "your code is X" message. This sequence is heavily automated by most hosts using built-in or third-party tools.
- Check-in day: guest arrives. Host watches for issues (WiFi works, code works, AC works) and is reachable. Day-after check-in message goes out around 18-24 hours after arrival.
- Mid-stay (4+ nights): one light touch around the midpoint. "Everything good?" Nothing more.
- Check-out day: host sends a morning reminder with checkout time, what to leave (towels in tub, dishes done, etc.). Cleaner arrives shortly after.
- Post-stay: thank-you message within 24 hours, casual review nudge. The host writes their review of the guest in the same window — sometimes immediately, sometimes waiting to see if the guest leaves theirs first.
- Review response: when a review posts, host responds publicly within a few days. 5-stars get short warm thanks. 3-4 stars get a thoughtful response. 1-2 stars get held 24+ hours before drafting.
- Listing update: seasonal photos, copy updates, amenity changes happen every few months. Big rewrites happen once or twice a year.
- Pricing: most hosts use Airbnb Smart Pricing or a third-party tool, then override manually for events, holidays, soft windows.
- Problem guest mid-stay: noise complaints, party-throwing, refusing to follow rules, damage. The host's job is to document, escalate to Airbnb support if needed, and decide whether to refund + cancel.

## What to avoid / common mistakes

- "Welcome to your home away from home," "stunning oasis," "hidden gem," "cozy retreat," "step into," "perfect for [demographic]." Every other listing uses these. They blend.
- Hiding tradeoffs in the listing. No AC, one bathroom, steep stairs, road noise, no parking. Guests who find out at check-in leave 3-stars. Guests who knew before they booked don't.
- House manuals that read like a defensive document ("PLEASE RESPECT OUR HOME"). Guests who plan to disrespect your home aren't reading the manual. Guests who are reading it are being talked down to.
- One-line review responses to 3-star reviews. Future guests see a defensive or dismissive response and book elsewhere.
- Apologizing for things that weren't your fault. Storm knocked out internet for an hour? "Our apologies for any inconvenience this caused" reads as guilt and invites partial refunds. Better: "The provider had an outage from 3-4 PM affecting the area. It's back up now."
- Off-platform booking offers in early messages. Airbnb filters these. They also get hosts suspended.
- Discounting reactively. A guest who messages day 1 looking for a discount has been doing this on every booking. Hold the line or learn what they did wrong fast.
- Pricing reactively without market context. Smart pricing tools help but they don't know about the wedding two blocks over or the marathon next Sunday.
- Writing guest reviews emotionally. The next host needs accurate signal. "Bad guest" tells me nothing. "Did not communicate clearly. Late checkout without notice. Minor damage not reported." tells me everything.

## Tone / register

A real host sounds calm, organized, and slightly under-promising. They're warm without being effusive. They give specific facts ("the lockbox is on the left side of the porch, code is 4827") not "you'll find everything you need!" They acknowledge what's hard or different about the property in the listing so they don't have to acknowledge it in a 3-star response. They thank guests by referencing the specific thing the guest mentioned. They write review responses that the NEXT prospective guest will read favorably. They never say "home away from home," "stunning," "hidden gem," "step into," or "we are so excited to have you." They say "looking forward to having you," "let us know if anything's not working," "the trail map is on the kitchen counter for next time." That's the voice.
