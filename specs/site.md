# Site-wide product requirements

Baseline: 2026-09-02. Read [README.md](README.md) for status semantics, gaps, and approval workflow.

## Purpose, target customer, and business goal

Double A Detailing markets mobile car washing and auto detailing to Southern California customers, primarily Orange County. Existing content addresses home/workplace customers with cars, SUVs/trucks, motorcycles, and specialty/fleet vehicles. Do not infer demographic segments or new coverage.

Primary goal: convert qualified visitors into bookings. Secondary goal: help uncertain visitors contact the business. Acuity is the approved current booking provider, confirmed by the owner on September 2, 2026. Square migration is deferred until the owner confirms it is ready. See [book-now.md](book-now.md).

## Customer journey and conversion principles

1. Discover mobile service and location relevance on Home or a direct-entry page.
2. Understand packages, vehicle-specific prices, and service coverage.
3. Build confidence through existing work photos, company information, reviews, and FAQs.
4. Activate Book Now and finish booking externally; use phone/inquiry when clarification is needed.

Book Now is the primary CTA; Book This Package and Book online are existing variants of the same generic external link, not package-specific preselection. Secondary CTAs: Call, View Pricing, View Full Gallery, View Full FAQ, Yelp reviews, Request a Custom Quote, and Send on Contact. Preserve clear hierarchy without fake scarcity, fabricated ratings, unsupported guarantees, or forced inquiry before booking. No new persistent mobile CTA is mandated by this baseline.

## Current architecture and routes

Static multipage HTML/CSS/vanilla-JavaScript site; no React/Vue/Next framework, router, compiler, package manifest, backend, database, auth, custom booking engine, CI, or automated tests found. Serve the root directly with `python3 -m http.server 8000`.

| Entry | Source / stylesheet | Current role |
| --- | --- | --- |
| / and /index.html | index.html / css/styleindex.css | Main conversion page |
| /html/pricing.html | html/pricing.html / css/stylepricing.css | Packages, add-ons, specialty quote path |
| /html/gallery.html | html/gallery.html / css/stylegallery.css | White masonry gallery and native-dialog viewer |
| /html/aboutus.html | html/aboutus.html / css/styleabout.css | Story, values, service area |
| /html/contact.html | html/contact.html / css/stylecontact.css | Browser-submitted SMTP inquiry form |
| /html/faq.html | html/faq.html / css/stylefaq.css | 20 checkbox-based FAQs |
| /html/booknow.html | html/booknow.html / css/stylebooknow.css | Legacy Acuity embed; not the primary Book Now destination |

These are file paths, not evidence of production clean URLs or redirects. Production domain/configuration: TBD. README describes Netlify synchronization; exact deployment behavior is unverified.

## Shared components, navigation, and dependencies

- All pages instantiate `javascript/site-header.js`'s `<site-header>` custom element in Shadow DOM. Attributes: `base-path`, `active`, `solid`. Home uses defaults; secondary pages use `../` and solid styling; legacy booking has no active key.
- Logo goes Home. Navigation: Pricing, Gallery, About, Contact, FAQ, Book Now. Home is not a separate header text link. Preserve Pricing even though the owner's initial page list omitted it.
- Fixed header is 30px contact bar plus 100px nav on desktop; at <=720px it becomes a 60px white header with a menu button and full-screen links below it. Menu changes ARIA label/expanded state, closes on link or Escape, and locks body scrolling. Escape restores button focus; no explicit trap/inert implementation.
- Header requires JavaScript; no static nav fallback is provided.
- Footer is copied markup, not a component. Newer pages have similar navy footers; Contact/FAQ/legacy booking retain older links/hours/social placeholders.
- Google Fonts provide Open Sans, Nunito Sans, and sometimes Montserrat. Home uses Font Awesome; legacy pages load Bootstrap 4, jQuery, Popper, AOS, and multiple icon styles. Contact additionally loads SMTPJS.
- Local jQuery/lightSlider assets and `script.js` initialization are not imported by current pages; `showhide.js` is an unused transport-list demo.
- Home has inline sticky-CTA code and unused feature-toggle logic; Gallery has inline native-dialog logic. No common content store or pricing model exists.

## Existing content and trust signals

Public contact consistently used by the shared header: 714-478-0556 and doubleadetailing@gmail.com. Contact says Anaheim, California. Conflicting legacy contact values must not be promoted as authoritative.

Home contains three attributed five-star testimonials (Steve F, Sean M, Jeff S) and a Yelp link; authenticity/usage permissions remain unverified. About states Robert Almaraz, 20+ years, 100% mobile service, and OC focus. Gallery uses seven existing project images. No new claims are authorized.

Existing coverage, prices, policies, and exact copy are in page sources and linked specs. Source presence does not certify business accuracy. Resolve contradictions with the owner rather than silently choosing a value.

## Brand and responsive requirements

Mobile-menu positioning update: owner requested the link/booking group slightly higher and horizontally centered. Increase only the mobile panel's bottom breathing room (responsive 32–160px), retaining auto margins, scroll overflow for short screens, focus behavior and unchanged desktop navigation. See `javascript/site-header.js`.

Follow [../BRAND_GUIDE.md](../BRAND_GUIDE.md). Preserve full-color/white logos, brand blue #25A3ED, deep blue #0D537C, navy #011C39, blue/cyan CTA gradients, charcoal text, white backgrounds, and existing gold/red accents. Fonts: Nunito Sans/Montserrat headings, Open Sans body. Token values are duplicated and vary slightly by page; no centralized design-system package exists.

Preserve approved layouts: Home conversion sections, compact Pricing mobile cards, white natural-ratio Gallery masonry, About story/values/coverage. Legacy Contact/FAQ differences are known, not authorization to redesign them.

Mobile-first future changes must work with touch and keyboard, 320px widths, zoom, readable copy, and fixed-header clearance. Breakpoints vary: header 720; Pricing 900/720; Gallery 850/600; About 900/600; legacy pages around 991/990/768/580. Test both sides of affected breakpoints.

## Accessibility, performance, and local SEO

Future target: WCAG 2.2 AA, semantic headings/landmarks, accurate alt text, visible focus, labeled fields, keyboard-operable disclosures/dialogs, reduced motion, and unobscured controls. Current compliance is not established; [README.md](README.md) lists source-visible gaps.

Keep architecture lightweight. Prefer existing components and avoid new dependencies. Measure active page transfer and rendering; repository media size alone is not a speed metric. Use appropriately sized images, suitable lazy loading, layout-space reservation, and minimal blocking scripts when approved. Numeric performance budgets: TBD.

Preserve readable HTML business/location content and current metadata. Canonical domain, public address, structured data fields, sitemap policy, and production indexability need confirmation. See [seo.md](seo.md).

## Analytics and success measurement

No analytics SDK, tag manager, custom CTA events, attribution storage, or booking-completion callbacks found in authored code. Netlify/account-level analytics may exist externally: TBD. Desired business outcome is completed external bookings; outbound clicks are only a proxy. Measurement and privacy/consent decisions require approval before instrumentation; never send contact-form content or personal information into analytics.

## Acceptance criteria

- Every future change maps to an approved spec/request; existing routes and unmodified business facts are preserved.
- Book Now remains primary and external; no custom booking system or unapproved provider change.
- Affected pages/navigation work over local HTTP with correct case-sensitive paths; known failures are logged separately.
- Mobile/desktop, keyboard, zoom, and applicable interaction tests are documented, with no invented passes.
- New business facts, policies, analytics, integrations, redesigns, and dependencies require explicit scope.
- Documentation updates alone change no runtime source, copy, assets, or external accounts.

## Out of scope

Implementing the audit backlog; redesigning pages; changing copy/prices; migrating to Square; building booking/payment/account features; adding analytics/SEO features; deployment or automatic commits.
