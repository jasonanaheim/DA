# Book Now / external booking handoff

Baseline: 2026-09-02. Sources: `javascript/site-header.js`, all page HTML, `html/booknow.html`, `css/stylebooknow.css`.

## Purpose

Send a ready customer to the external provider that owns booking.

## User goal

Choose service and schedule with the business through the authorized external booking experience.

## Business goal

Convert interest into completed external bookings without duplicating provider functionality.

## Current implementation

**Conflict to resolve, not a migration instruction:**

- Owner decision (September 2, 2026): keep Acuity for now. Move to Square only once the owner confirms it is ready and approves the destination and migration scope.
- Observed source: main CTAs use `https://DoubleADetailing.as.me/`. No Square link, SDK, API key, webhook, or configuration is present.
- Actual redirect target/provider account status cannot be established from repository source.
- `html/booknow.html` embeds `https://app.acuityscheduling.com/schedule.php?owner=21786409`, plus Acuity's embed script, in a 100%-wide, 800px-high iframe.
- Current primary navigation does not route to this local page; it is a legacy directly addressable file. No repository redirect or noindex rule exists.
- Book This Package links are generic: no service/vehicle/date information is passed.
- No local scheduler, checkout, availability logic, confirmation page, callback, completed-booking tracking or customer account exists.

## Required content/sections

Preserve current handoff links and legacy page unchanged during documentation work. Site CTA wording: Book Now; existing Book online and Book This Package are variants. Do not imply confirmation on this site.

Legacy content includes an address, conflicting old phone numbers, hours, placeholder navigation, and malformed mailto/phone links. These are unresolved source artifacts, not approved public contact facts.

## Primary CTA

Book Now. Approved current destination: `https://DoubleADetailing.as.me/` (Acuity). Keep existing links and the legacy embed unchanged. Future Square destination: **TBD — exact owner-supplied URL and explicit migration approval required**.

## Functional requirements

The external booking provider owns scheduling and booking; do not implement those capabilities locally. Acuity remains approved now; Square is deferred. Actual provider payment and confirmation settings are unverified. No custom booking system. Any provider migration or legacy-page redirect/removal requires its own approved spec, confirmed URL, package-link behavior and test plan.

Do not book test appointments, submit payments, alter an external account, or change the integration to validate this baseline.

## Mobile requirements

Shared menu must provide a clear, reachable external handoff. Legacy iframe dimensions are observed only; nested-scroll and provider mobile behavior need live verification if this route is retained. Do not implement a mobile booking UI here.

## Accessibility requirements

Use meaningful link labels and visible focus. Existing iframe has title “Schedule Appointment”; legacy page lacks H1/main landmark. External provider accessibility is outside local control; verification and alternative assistance are TBD. Same-tab links are the current main behavior.

## SEO requirements

Legacy page has a Book Now title and generic description, no H1, no canonical/noindex. Whether this route should be indexed, redirected or retained is TBD. Do not add it to a future sitemap by assumption.

## Acceptance criteria

- Docs identify Acuity as the approved current provider and Square as a deferred migration, not a current implementation defect.
- No booking destination or embed changes in this documentation task.
- Future handoff work uses the exact approved URL, preserves business identity and tests navigation without creating real bookings.
- No custom availability, checkout, authentication or confirmation storage appears in the application.
- Do not equate outbound clicks with completed bookings; provider-side reporting is TBD.
- Before touching the legacy route, decide its lifecycle and any redirect/indexing implications.

## Out of scope

Square migration/setup now; provider account management; scheduling/payment APIs; custom booking forms; account systems; deleting the legacy page; unapproved redirect or analytics behavior.
