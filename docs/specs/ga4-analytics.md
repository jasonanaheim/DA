# GA4 analytics implementation

Owner approved Google Analytics 4 and a privacy-first consent experience on September 3, 2026. This resolves D5 for the six current marketing pages using Measurement ID `G-9N49QPVB24`. The ID is public client configuration, not a secret.

## Scope

- Add one lightweight shared `javascript/analytics.js` and `css/analytics.css` to Home, Pricing, Gallery, About, Contact and FAQ. Legacy `booknow.html` remains excluded pending its D4 lifecycle decision.
- Before a choice, show a compact accessible notice with **Accept analytics** and **Decline**. Do not load Google or transmit analytics before acceptance. Store only `accepted` or `declined` locally under a versioned key. Always provide a small **Privacy choices** button so the decision can be reviewed or changed.
- On acceptance, load `gtag.js` once, configure GA4 once, and allow only bounded events from the approved measurement contract. On decline/revocation, do not load Google in a fresh visit and send a consent update if it was already loaded; Google cookies previously written may remain until browser expiry/removal.
- Do not enable advertising/remarketing, cross-domain decoration, User-ID, signals, form values, raw URLs/referrers/query strings, or custom demographics. A click is not a completed booking; a Netlify HTTP 200 is `unknown`, not delivered.

## Events

- Automatic GA4 page view after accepted configuration; normalized six-route `page_path` only.
- `book_now_click`: one native anchor click, fixed placement and `booking_provider: acuity`; fixed package key where applicable.
- `contact_click`: tel/mailto, fixed method and placement.
- `contact_submit_attempt`: after valid, hosted, non-bot form enters pending.
- `contact_submit_result`: `unknown` for HTTP 200 acceptance, `error` otherwise.
- `gallery_image_open`: immediately after the native dialog opens, fixed filename key.

Analytics calls must be nonblocking and exception-safe. Existing anchors, form delivery and dialog behavior remain unchanged when consent is declined, Google is blocked or analytics throws.

## Acceptance and verification

- No request/script injection/event before acceptance; declined/reloaded state remains off.
- Accept loads exactly one Google script/config/page view; eligible semantic action emits once with no PII.
- Consent controls are keyboard usable, visibly focused, readable at 320px, and do not obscure the mobile menu. Preference can be reopened and changed.
- Existing SEO/contact/gallery/navigation tests pass. Use a mocked sink for event-count/payload checks; do not generate real production analytics during local automated tests.
- After an approved deploy, owner may use GA4 Realtime/DebugView and Google’s Test installation. Production data, retention configuration, legal compliance, reporting baseline and Acuity completed-booking attribution remain NOT VERIFIED.

## Dashboard follow-up

In the GA4 web stream's Enhanced Measurement settings, keep Page views enabled but disable Scrolls, Outbound clicks, Site search, Video engagement, File downloads and Form interactions. The authored integration owns the approved action events, and disabling these automatic extras keeps collection aligned with this bounded contract. Do not enable Google Signals, advertising personalization or a Google Ads link under this approval.

No analytics target or historical baseline is invented. No commit, push, deploy or Google-account mutation is included automatically.

## Local results

PASS: `node tests/analytics.cjs` verifies no script/data layer before consent, saved decline remains off, saved/active acceptance loads one GA4 script, exact public ID/config sequence, reopen control, header booking event count and bounded payload. `node tests/contact-form.cjs` verifies hosted accepted submissions emit one attempt and one `unknown` result while all existing transport/error/input-preservation cases pass. SEO tests, JavaScript syntax and `git diff --check` pass. Static scan confirms the shared assets appear on exactly six marketing pages and not legacy Book Now.

PASS: real-browser QA at 390×844 and 1280×800. The consent panel and persistent Privacy choices control render without horizontal overflow; decline persists; reopening the panel moves focus to the appropriate choice; acceptance persists and closes the panel. Localhost correctly makes no Google request. The only observed console error was the pre-existing missing `/favicon.ico`, which is unrelated to analytics. Live Google requests, GA4 Realtime/Test installation, consent persistence on production, Enhanced Measurement dashboard settings, CSP/ad-blocker behavior and reporting remain NOT VERIFIED until an approved deployment. No real form, phone, email or booking action was created during tests.
