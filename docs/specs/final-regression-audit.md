# Cross-page regression and accessibility audit — September 3, 2026

## Scope

Audited the six active marketing pages on the current static implementation: Home, Pricing, Gallery, About, Contact and FAQ. The legacy `html/booknow.html` route and a future Square migration remain outside this release slice. Tests used the localhost HTTP preview and Chromium 152. No appointment, phone call, email or new form submission was created.

## Environment and methods

- Real-browser viewports: 320×568, 390×844, 768×1024 and 1280×800; an additional 640 CSS-pixel reflow check and 667×375 short-landscape menu check.
- Keyboard interaction: skip link, mobile-menu focus/Tab/Escape/resize, native FAQ disclosure activation and Gallery dialog Escape/focus restoration.
- Resilience: blocked shared-header script, blocked Gallery image and reduced-motion emulation.
- Static/runtime checks: all active routes, exact local `href`/`src` targets, Acuity landing response, headings/landmarks, labels/names, duplicate IDs, image alternatives, console errors, failed requests and current automated suites.

## Results

### PASS

- All six active routes and the approved Acuity landing returned HTTP 200. Every active local `href`/`src` target exists.
- `tests/analytics.cjs`, `tests/contact-form.cjs`, `tests/seo.cjs`, authored JavaScript syntax checks and `git diff --check` passed.
- Across all 24 page/viewport combinations there was no horizontal overflow, broken active image, missing main landmark, missing skip link or incorrect H1 count.
- At 640 CSS pixels the Home page reflowed without horizontal overflow. This is useful reflow evidence, not a native-browser 200% zoom certification.
- Mobile menu: opening focuses Pricing, Tab advances to Gallery, Escape closes and restores toggle focus, background inertness and body overflow are restored, and resizing open navigation to desktop closes it and focuses the logo.
- At 667×375 the menu remains scrollable and the Acuity Book Now link retains a 52px control height.
- The skip link is the first keyboard target and moves focus to `#main-content`.
- FAQ: Enter and Space opened two independent native disclosures simultaneously; all 20 FAQ-page questions remain present.
- Gallery: opening focuses the close control, loads the expected caption/image, Escape closes and restores the exact tile. A blocked image produces the live failure message and still restores focus after close.
- Contact: the empty required form is invalid, visible controls are labelled, phone/email use the correct input types and autocomplete values, the status element is a polite atomic status region, and direct phone/email links remain correct. Delivery behavior is covered by the mocked suite; the owner previously confirmed hosted notification receipt.
- With the shared-header script blocked, the static fallback navigation and approved Acuity Book Now link remain visible.
- Reduced-motion emulation reduces header transition duration and removes consent-control transitions.
- Fresh navigation through all six pages produced no console errors, page errors or failed requests. The favicon request succeeds.
- No duplicate IDs, unnamed active links/buttons, missing image `alt` attributes or unlabelled user-entry controls were detected. The Home footer heading-level gap found during the audit was corrected from H4 to H3 and rechecked.

## Change made during audit

- `index.html`: Home footer Contact and Explore headings changed from H4 to H3.
- `css/styleindex.css`: the existing footer heading style now targets H3 and explicitly retains the prior H4 size and spacing.

## NOT VERIFIED

- Physical-device Safari/Firefox behavior and an assistive-technology screen-reader session.
- Native browser 200% zoom certification and a dedicated automated color-contrast computation. Reflow, visible-focus and semantic checks passed, but they do not replace those tests.
- A new production contact submission or completed booking. The audit intentionally did not send a message or create an appointment.
- Provider-confirmed completed-booking attribution, GA4 dashboard reporting configuration, legal/privacy review and analytics behavior under every blocker/CSP configuration.
- Final-domain indexing, Search Console, canonical/sitemap/robots activation and production-domain redirects while `doubleadetailing.com` transfer remains pending.
- Future Square handoff, which remains deliberately deferred until an approved Square URL and migration decision exist.

## Outcome

**PASS for the current core six-page regression scope.** No release-blocking defect was observed in that scope. Remaining items are explicitly external, deferred or require specialized/manual certification and must remain NOT VERIFIED until completed.
