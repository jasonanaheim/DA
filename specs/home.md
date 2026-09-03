# Home

Baseline: 2026-09-02; source `index.html`, `css/styleindex.css`, shared header. See [site.md](site.md) and [README.md](README.md).

## Purpose

Introduce mobile car wash/detailing and provide a direct path from browsing to external booking.

## User goal

Understand what is offered, where the team travels, what it costs, and whether the business is trustworthy.

## Business goal

Generate qualified external booking handoffs and supporting calls.

## Current implementation

Logo repair: owner reported a stretched desktop footer logo. Set `.footer-logo` to 220px width, max-width 100%, and automatic height (source image 1600×500), matching the newer footer pattern. Verify desktop/mobile aspect ratio; do not modify image artwork or other layout.

Verification: browser at 1440px and 390px reports logo 220×68.75px, correct 3.2:1 ratio; `git diff --check` passed. Viewport restored; no deployment.

September 2 update: [Homepage FAQ alignment](../docs/specs/home-faq-alignment.md) replaces the legacy FAQ styling noted below. The five native disclosures use the same shared styling as the full FAQ page; existing preview answers and all other homepage sections remain intact.

Static HTML with Google Fonts, Font Awesome, and shared header. Main heading: “Mobile Car Wash & Auto Detailing.” Hero background is `images/anaheim hero 4.png`; it is not a video player.

Sections in order: hero; How It Works (three steps); four package rows; interior/exterior add-on names; service-area map; three-image gallery preview; three reviews with Yelp link; five CSS-checkbox FAQs; final Book Now/View Pricing CTA; mobile-only sticky CTA; footer.

Inline sticky logic toggles visibility when packages enter view until the final CTA approaches. CSS shows it only at <=768px and suppresses it while the menu is open at <=720px. Feature-toggle code exists but current markup has no matching controls.

## Required content/sections

Preserve the above sections and existing copy until an approved change. Hero states 100% hand wash and travel to home/business. How It Works describes online/phone booking, supplied water/power/products, and on-site service.

Four package amounts and times match [pricing.md](pricing.md); add-ons here have names only. Service area names Irvine, Costa Mesa, Anaheim, Newport Beach, Tustin and surrounding areas; an approximate 25-mile radius is stated but hub/limits are TBD. Existing testimonials are Steve F, Sean M, Jeff S with five-star displays; do not invent or rewrite reviews. Five FAQ topics: process, coverage, stains, customer presence, wash vs detail.

## Primary CTA

Book Now; Book online and Book This Package share `https://DoubleADetailing.as.me/`. Secondary: phone, pricing, gallery, FAQ, Yelp. Acuity is approved for now; Square migration is deferred: [book-now.md](book-now.md).

## Functional requirements

Preserve external href behavior, direct telephone links, gallery/FAQ/pricing navigation, and current sticky visibility rules unless scoped otherwise. Package buttons currently do not pass a selected package. Home FAQ is checkbox/CSS driven, not a JS accordion. Maps key remains embedded; restrictions unverified.

## Mobile requirements

At <=900px package media/info stack; gallery becomes one centered column at <=720px with images up to 360px wide. Hero has side-by-side booking/call buttons. Check sticky controls and fixed menu do not collide, including the 721–768px breakpoint mismatch. No new mobile UI is authorized.

## Accessibility requirements

Future changes must retain H1, section headings, descriptive links and alt text; address keyboard disclosure semantics only in approved scope. Current FAQ checkboxes are hidden with display:none and labels are not keyboard controls. The map has no title. Gallery preview alt descriptions do not accurately identify all visible subjects. Review stars/focus/contrast require testing.

## SEO requirements

Existing title names Double A, mobile detailing, and Orange County; description covers mobile service, home/office, pricing, and booking. No canonical/social/structured data. Preserve metadata and visible local context; do not treat review text as verified aggregate-rating data.

## Acceptance criteria

- All existing sections and three reviews remain; no new claims or fabricated proof.
- Four package price/time rows stay consistent with Pricing; Standard Interior has no motorcycle option.
- Booking/telephone/internal links retain their intended behavior.
- Sticky/menu overlap, mobile centering, keyboard access and image loading are verified for approved changes; known issues are reported.
- Do not describe a handoff click as a completed booking.

## Out of scope

Hero/copy redesign, review replacement, pricing changes, analytics installation, Maps-key changes, custom booking, or automatic repair of the documented accessibility gaps.
