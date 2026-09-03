# FAQ

Baseline: 2026-09-02; source `html/faq.html`, `css/stylefaq.css`, shared header and legacy CDN dependencies.

## Purpose

Answer common practical questions that prevent confident booking.

## User goal

Understand service logistics, preparation, timing, payment and care.

## Business goal

Reduce uncertainty and direct customers to existing pricing and external booking.

## Current implementation

Visual/interaction update September 2, 2026: [Contact/FAQ alignment](../docs/specs/contact-faq-design.md) supersedes the legacy description below. All 20 FAQs use native details/summary with independent expansion and a visible indicator; shared support-page styles and the newer footer replace legacy CSS/CDN dependencies. Answers remain unchanged. See [brand/UI guide](../BRAND_GUIDE.md).

Photo hero and 20 independent checkbox/CSS disclosures, grouped as General FAQ (10) and Detailing Services FAQ (10). Multiple answers can be open simultaneously. Labels toggle hidden checkboxes; no page-specific JS accordion. AOS initializes with 2000ms duration. Old call banner/footer remain.

General topics: why Double A; availability; services; process; hours; customer requirements; payment; arrival timing; cancellation/rescheduling; tipping.

Detailing topics: duration; cleaning frequency; wash vs detail; stains; first-time service; clay bar; tire dressing/interior conditioning; pet hair; drying; wax/polish indicators.

## Required content/sections

Retain the 20 topics and existing answers until approved editorial/policy review. Existing policy statements include: sunup–sundown seven days except major holidays; cash/major cards/checks/Venmo; contact as soon as possible to cancel/reschedule; keys/access for interior cleaning; team supplies power/water; monthly detailing and biweekly follow-up washes. These are current copy, not newly validated business policies.

Known conflicts: footer says 6am–6pm daily; wash/detail answer references “menu items 4–5,” no longer matching the current packages. Cancellation fees/deadlines, external-provider payment handling and holiday hours are TBD. Do not invent precise policies.

## Primary CTA

Book Now in shared header/footer. Pricing links inside service/time answers and phone number are supporting paths.

## Functional requirements

Preserve existing question/answer pairing and pricing links. Disclosures must not alter booking state or submit data. Future accessible disclosure changes should keep answers readable and support independent expansion, unless a spec deliberately changes behavior.

## Mobile requirements

Current CSS uses legacy 768/990px rules and the shared header's 720px breakpoint. Check long labels and expanded answers at phone widths and zoom; no fixed-height clipping or obscured content.

## Accessibility requirements

Current checkboxes have display:none and labels are not keyboard-focusable toggle buttons. No expanded state is exposed. “Detailing Services FAQ” is a styled div, not a heading. These are known gaps. Future authorized changes should use semantic keyboard-accessible disclosures, visible focus and accurate state; keep answers available to assistive technology.

## SEO requirements

Existing FAQ title, generic duplicate description and H1; no FAQ schema/canonical/social metadata. Do not add FAQ structured data, change policies for search, or promise search enhancements without approved SEO scope and factual review.

## Acceptance criteria

- All 20 topics remain available and link to current Pricing correctly.
- Answers retain current facts unless the owner approves corrections.
- Approved disclosure work is tested with pointer and keyboard, multiple expanded items, long text, and zoom.
- Existing footer path/case issues and inaccessible toggles are recorded, not treated as passing.
- Booking remains external.

## Out of scope

New policies, guarantees, medical/chemical advice, auto-generated FAQ facts, schema implementation, redesign, booking logic, or blanket copy changes.
