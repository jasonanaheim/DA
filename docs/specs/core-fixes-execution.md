# Core fixes — approved execution scope

September 2, 2026: owner authorized core fixes, requested test inquiry recipient `jason.almaraz808@gmail.com`, confirmed the older site is on Netlify and the current work is pre-release, and requested SEO/analytics. Public street address remains undecided.

Implement navigation-and-booking core repairs/fallback/skip/focus, native FAQ disclosures, Gallery focus/error states, confirmed resource paths/image dimensions, and safe Contact input/link improvements. Preserve layout, prices, answers, Acuity links, and legacy route lifecycle. Prepare page-specific Contact/FAQ descriptions based only on existing page content. No canonical host, address schema, analytics vendor, delivery service, deployment, or outbound email is inferred.

The test recipient is now known; delivery mechanism remains gated until approved. Do not reuse exposed SMTP credentials. Netlify Forms and analytics account/domain questions were raised while independent core work proceeds. Any provider choice/contract change must be recorded here before implementation.

Verification: static text/price/link preservation, HTML/JS syntax, local exact-case assets, real-browser desktop/mobile menu/FAQ/gallery tests, focused lifecycle/error tests with mocks only. Do not send messages or create appointments. Test notes will record actual results and limitations.

## Implemented locally

- Shared header: opaque mobile panel, short-height scrolling, focus containment/Escape/restore, background inertness and scroll-state restoration, desktop resize cleanup, abortable lifecycle listeners, reconnect support and adjacent static navigation fallback.
- Six marketing pages: skip links/main targets and visible focus. All seven routes have fallback navigation; legacy booking otherwise retains its existing integration and known defects.
- Home/FAQ: 5/20 native details/summary disclosures; original answers preserved and FAQ category heading corrected.
- Gallery: loading/failure feedback, isolated image requests and explicit focus restoration; existing grid/captions/photos retained.
- Contact: email/tel input types, autocomplete and direct phone/email links; transport unchanged and unsafe for release pending replacement.
- Contact/FAQ: exact-case footer asset/Home link repairs, removed nonexistent icon stylesheet, visible content when AOS is unavailable, page-specific descriptions.
- Image dimensions from local asset metadata with responsive aspect-ratio preservation; Home map title.

No public address was added, no analytics provider was selected, no prices/booking destinations were changed, and no dependency, media binary or hosting change was made. The test recipient is recorded above but **not yet configured for delivery**.

## Verification evidence — September 2, 2026

PASS:

- `node --check javascript/site-header.js`; inline application scripts on all seven HTML pages parsed with Node `vm.Script`; `git diff --check`.
- Node assertions against `git show HEAD:<page>`: all dollar-price tokens and existing Acuity URL counts preserved (one intentional additional fallback link per page); Home/FAQ answer markup identical with 5/20 native disclosures.
- Exact-case local href/src scan: all six marketing pages pass. Legacy booking exceptions remain `css/styleBooknow.css`, placeholder icon CSS, directory script reference and malformed mailto link; these were not repaired under this scope.
- In-app browser HTTP preview: all six marketing pages have document width equal to viewport width at 320px; no completed broken images reported on Pricing, Contact, About, FAQ or Gallery during smoke check (not a full lazy-image load audit).
- Menu at 390px: first link receives focus; Tab/Shift+Tab wrap inside header; Escape restores toggle focus, background inertness and prior scrolling state. Resizing open menu to 1280px closes it and unlocks content after resize event.
- FAQ: Enter/Space open two independent answers at once.
- Gallery at 390px: loaded image fits the dialog, Escape closes it and restores the exact thumbnail. Node in-memory DOM/Image mocks pass loading, failure, stale-response isolation, successful load, button/backdrop close and focus restoration. No real request was intentionally failed in the browser.
- Browser viewport override reset after verification. Local server left running for review.

NOT VERIFIED / pending:

- Contact transport/delivery, credential revocation, live hosting, canonical domain, local structured data and analytics; no email submissions or bookings performed.
- Full screen-reader/200% zoom audit; blocked-resource/no-JS browser tests; header reconnect/failure-path automated tests; complete viewport matrix and before/after performance measurements. No WCAG compliance or performance-score claim.

## Remaining decisions

Later update: production domain and Netlify Forms/site/test recipient have now been confirmed. [Netlify contact rollout](netlify-contact-rollout.md) records the local replacement of SMTPJS and remaining dashboard/release verification. The list below is the earlier checkpoint; analytics, public-address policy and production configuration are still unresolved.

1. Approve Netlify Forms (or name another secure provider), then configure notification recipient `jason.almaraz808@gmail.com` in its trusted dashboard. Localhost alone does not deliver submissions. Revoke the exposed legacy SMTP credential before release.
2. Provide the live production domain for canonical URLs, sitemap and production SEO verification.
3. Choose/approve an analytics provider and supply its public site/property identifier plus applicable privacy/consent requirements. No vendor, visitor data collection or conversion baseline was invented.
4. Confirm public service-area business details and treatment of the existing legacy street-address content. No new street address will be published or guessed in metadata.
