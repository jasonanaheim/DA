# Double A Detailing — Engineering Document / High-Level Design

Status: proposed engineering baseline, awaiting owner approval.  
Product authority: [approved PRD](../PRD.md), approved by the owner in the request commissioning this document. Its on-disk “Draft” label predates that approval; this task leaves the PRD unchanged.  
Source baseline: application commit `a57b2ca`, September 2, 2026.  
Engineering authority: this document, once approved; [AGENTS.md](../../AGENTS.md) remains the development guardrail. Page [specs](../../specs/README.md) provide detailed source observations.

**CURRENT** denotes repository evidence, not a production test or confirmed business fact. **TARGET** denotes recommended technical behavior implementing the PRD, not authorization to code. **TBD** denotes an unresolved decision. No application changes, external submissions, deployment, or provider configuration are authorized by this document.

**Provider precedence:** the approved PRD explicitly retains Acuity until Square is ready. References to Square in the engineering brief describe the future handoff. Preserve `https://DoubleADetailing.as.me/` and the legacy Acuity embed now; switching requires a confirmed Square URL, owner readiness, and migration approval.

## 1. Executive Summary

The business goal is to turn qualified visitors into customers through external appointment booking. Target visitors include local home/work customers, maintenance and deeper-cleaning customers, and specialty/fleet prospects evidenced in site content.

The technical objective is to preserve a lightweight static marketing website while making navigation, service evaluation, contact, and the booking handoff dependable across mobile, desktop, and keyboard use. Keep existing HTML/CSS/vanilla JavaScript and the reusable header; no framework rewrite or booking platform is justified.

Success criteria:

- **P0 FR-01:** every booking CTA reaches the approved business/provider destination, with no local appointment creation or false confirmation.
- **P0 FR-02:** shared navigation and page links work; the mobile menu supports touch, keyboard, focus, and correct scroll restoration.
- **P0 FR-06:** approved phone/email destinations work; inquiries expose no credential, preserve failed submissions, and report only confirmed outcomes.
- P1 package information, gallery, FAQs, business facts, and specialty contact journeys remain usable and consistent.
- The PRD's proposed booking North Star remains distinct from outbound clicks. Definition, attribution feasibility, reporting period, and numerical targets remain TBD; PRD approval supplies none of those missing values.

Current code does not fully satisfy these criteria. Section 17 records coverage and blockers; document creation is not a test pass or remediation.

## 2. Product Scope

**In scope:** all seven existing HTML pages, shared header, page/footer navigation, service information, pricing, gallery dialog, FAQ disclosures, contact options/form, responsive presentation, metadata, and external booking links.

**Out of scope:** redesign, unapproved copy or price changes, custom booking/availability/payment infrastructure, accounts, authentication, admin systems, databases, AI, native applications, or an automatic platform migration. No new backend is specified merely to populate this design.

**Future considerations, gated:** secure inquiry delivery selection; approved Square handoff; legacy booking route disposition; metadata/indexing improvements; privacy-aware measurement; targeted asset/dependency cleanup. These need scoped implementation approval. This document describes responsibilities and acceptance behavior, not a release schedule.

## 3. Current Architecture

### Stack, rendering, and routes

No application framework or runtime version is declared. The website is static HTML served directly, with CSS and browser JavaScript. There is no build/package manifest, router, template compiler, server rendering process, API layer, database, or automated test suite in source. Navigation loads separate documents. Main content is authored HTML; the shared header is inserted client-side into Shadow DOM.

| Route/source | Rendering and responsibilities | Page styles / behavior |
| --- | --- | --- |
| `/`, `index.html` | Hero, process, packages, add-on names, coverage/map, photos, reviews, short FAQ, CTAs | `css/styleindex.css`; inline sticky CTA logic and checkbox disclosures |
| `html/pricing.html` | Four package cards, vehicle prices/times, 13 add-ons, specialty quote path | `css/stylepricing.css`; static content, no current selector |
| `html/gallery.html` | Seven image buttons, enlarged-image dialog, closing CTA | `css/stylegallery.css`; inline native dialog logic |
| `html/aboutus.html` | Story, values, coverage/cities/map, call/booking CTA | `css/styleabout.css`; no dedicated page script |
| `html/contact.html` | Required inquiry fields and public contact details | `css/stylecontact.css`, `javascript/app.js`, SMTPJS |
| `html/faq.html` | 20 checkbox disclosures in two categories | `css/stylefaq.css` |
| `html/booknow.html` | Directly addressable legacy Acuity iframe, old contact/footer content | `css/stylebooknow.css`; authored reference has wrong case |

These are file routes, not confirmed production rewrites. Logo returns to Home; header links Pricing, Gallery, About, Contact, FAQ, and external Book Now. Normal Book Now links do not lead to the legacy local booking page.

### Components, styling, and assets

`javascript/site-header.js` defines `<site-header>` using an open Shadow DOM. Attributes are `base-path`, `active`, and `solid`. It owns logo, contact bar, nav links, active state, scroll styling, mobile menu, and body scroll lock. Header requires JavaScript; no static fallback exists. Footers, CTA styling, facts, and price values are duplicated rather than shared data/components.

Page styles combine newer custom CSS with older legacy rules. Preserve the established logo, blue/navy/cyan palette, white/neutral surfaces, typography, and layouts in [BRAND_GUIDE.md](../../BRAND_GUIDE.md). Header styles are isolated in Shadow DOM; page CSS cannot directly repair them. Tokens are duplicated across stylesheets, not a centralized design-system package.

There are 144 tracked media assets, approximately 307 MiB, including unused videos. This inventory is not the active page payload. Gallery uses local JPGs with natural ratios and mostly lazy loading. Many images lack responsive variants or intrinsic dimensions. No current HTML video element establishes use of the stored videos.

### Dependencies observed in source

| Dependency | Observed version/configuration | Use |
| --- | --- | --- |
| Bootstrap | 4.0.0 CDN URLs | Contact, FAQ, legacy booking |
| jQuery | 3.2.1 slim CDN; legacy booking also loads 3.5.1 twice | Legacy page behavior/dependency chain |
| Popper | 1.12.9 CDN | Legacy Bootstrap dependency |
| AOS | `unpkg.com/aos@next`, not pinned to a precise release; initialization duration 2000ms | Legacy page animation |
| Font Awesome | 3.2.1 and 5.14.0 styles on legacy pages; an unversioned kit on Contact; other icon CSS | Icons; duplicate/placeholder references exist |
| Google Fonts / Material Icons | Remote font URLs, no fixed library version | Open Sans, Nunito Sans, Montserrat, legacy icons |
| SMTPJS | `/v3/smtp.js`, exact served release unverified | Contact email submission |
| Acuity embed | Unversioned external embed script | Legacy booking iframe |
| Local jQuery / lightSlider | jQuery header identifies 3.3.1; slider files retained | Not imported by current HTML; exact deployed slider version is not relied upon |

Do not infer dependency safety or compatibility from these versions. No dependency upgrade is implemented here. `script.js` is an unused slider initializer; `showhide.js` is an unused transport demo.

### Forms, integrations, SEO, and deployment

Contact's form has no configured action endpoint. Browser code intercepts submission, clears fields before sending, and calls SMTPJS with hard-coded SMTP settings including a credential. Any resolved response triggers a success alert; rejection and explicit delivery status are not handled. Actual receipt is unverified.

Main booking links use as.me; legacy booking embeds Acuity owner `21786409`. No Square configuration, analytics SDK, event tracking, or completion callback exists. Maps appear on Home/About; Yelp is an outbound link.

All HTML pages include basic title/description, viewport, charset, and language. Six marketing pages have an H1; legacy booking does not. Canonical/social metadata, structured data, sitemap, and robots file are absent from source.

README mentions synchronization with Netlify output. No hosting project, deploy configuration, redirect rules, headers policy, custom 404, or CI workflow establishes actual production behavior. Local HTTP serving requires no build; production domain, HTTPS/caching settings, and deployment ownership are TBD.

## 4. Target Architecture

**TARGET:** retain static multi-page rendering and small progressive enhancements. Hosting serves HTML/CSS/images/scripts; the browser handles local UI state; the external provider owns appointments. Main content, navigation targets, and Book Now should remain ordinary links/content, not depend on an analytics SDK or app-wide store.

| Recommended decision | Change from current state | Rationale / approval boundary |
| --- | --- | --- |
| Keep current stack and routes | No framework/router/build migration | Meets marketing needs with minimal runtime and maintenance overhead |
| Retain `<site-header>` as navigation owner | Correct accessibility/lifecycle defects within the component; recommend static fallback navigation/booking content if header enhancement fails | Satisfies FR-02 without separate per-page mobile-menu implementations; fallback markup contract needs approval |
| Preserve native page content and links | No runtime fetch for prices or booking URLs | Core evaluation and outbound booking should not fail because optional script/config fetch fails |
| Use native FAQ disclosures | Recommend `details`/`summary` with existing presentation, preserving independent multiple-open behavior | Replaces hidden-checkbox keyboard barrier with native operability; visual preservation and content unchanged |
| Retain native gallery dialog | Strengthen focus and failure behavior, not a new gallery library | Existing functionality meets FR-04; no carousel/filter requirement |
| Replace unsafe inquiry transport only after selection | Define secure delivery boundary and result states; provider/transport TBD | FR-06 cannot be satisfied by a browser-visible SMTP password; no backend is chosen by this HLD |
| Keep facts/prices in authored HTML for now | Add consistency verification rather than runtime content services | Avoids CMS/build complexity; consolidation can be separately approved if maintenance warrants it |
| Preserve current booking; gate migration | Test one approved expected destination against all authored CTAs, including Shadow DOM | Prevents partial provider switches without imposing a runtime booking abstraction |
| Repair local references and reduce proven waste | Scoped path corrections and dependency/media cleanup after verification | Reliability and performance without redesign or indiscriminate file deletion |

No SSR service, client-side router, state framework, database, or application API is recommended. Shared-footer/token extraction is optional future maintenance, not a prerequisite or an automatic redesign.

## 5. User Flows

| Flow | CURRENT sequence | TARGET behavior / boundary |
| --- | --- | --- |
| Primary booking | Visitor → static page → evaluate service → Book Now anchor → as.me/Acuity | Same approved flow now. After approved migration: Visitor → Website → Evaluate Service → Book Now → confirmed Square URL. Provider handles scheduling; site asserts no completed booking |
| Navigation | Header script initializes → selects base path/active state → anchors load HTML; mobile toggle updates open state and body overflow | Keyboard/touch traversal, Escape/close, focus restoration, correct URLs, and recovery on breakpoint change; enhancement failure must leave a useful route to content/booking |
| Gallery | Image button → copy data URL/alt/caption into dialog → `showModal()` → close button/backdrop/native Escape | Keep matching image/caption; predictable focus return and accessible error text if image cannot load |
| FAQ | Hidden checkbox changes CSS visibility | Native disclosure opens associated answer by touch/keyboard, exposes state, remains readable without page JS |
| Contact | Browser validation → intercept → capture fields → reset → SMTPJS → unconditional resolved-success alert | Validate → submitting → confirmed outcome or failure/unknown; preserve values except after confirmed success; selected delivery system owns secure transport |
| Specialty inquiry | Pricing custom quote link → Contact → same inquiry flow | No invented quote/eligibility guarantee; inherits contact reliability |

Opening phone/email links invokes the user's platform handler, not a website-managed call or email completion. Provider redirects, scheduling availability, and booking completion cannot be asserted from an outbound anchor alone.

## 6. Frontend Architecture

### Page hierarchy and layout

Keep Home at the root, secondary HTML under `html/`, and relative links compatible with root HTTP serving. Each marketing page contains shared header, its existing primary content, and footer. Do not add an SPA catch-all. Preserve direct entry and refresh of all existing pages and in-page anchors such as Pricing `#packages`.

Maintain distinct existing layouts: Home conversion sections; compact Pricing cards; white natural-ratio Gallery columns; About story/values/coverage; existing Contact and FAQ presentation pending scoped corrections. Legacy booking treatment requires a separate route decision.

### Component contracts

- **Header:** owns navigation URLs, active-page semantics, mobile open/closed state, scroll styling, focus behavior, and reversible scroll lock. Base path is authored trusted configuration, not user/query-string input. Retain listener cleanup. TARGET: close/reconcile an open mobile menu when crossing to desktop, restore prior overflow reliably, and keep background controls out of the interaction path while the full-screen menu is open.
- **Booking anchors:** real `href` destinations; no required click handler or tracking success dependency. Existing generic package links do not encode package state.
- **Gallery:** page-local selected image/caption and dialog state. No persistent selection, URL-based viewer, or global store is needed. TARGET: failed image notice, explicit close, Escape, and focus return to invoking image.
- **FAQ:** local disclosure state, independently openable items; no persistent accordion preferences.
- **Contact:** existing fields and page-local `idle`, `submitting`, `success`, `error/unknown` status. No localStorage draft/customer records. TARGET: visible pending state, prevent accidental parallel submits, preserve input on failure, accessible status message, and safe retry by the user—not automatic duplicate sends.
- **Home sticky CTA:** preserve existing conditional visibility based on package/final-section scroll position; coordinate with header open state so controls do not overlap.

A central state manager is not needed. Page scripts should be scoped to their DOM and handle missing optional elements without breaking unrelated navigation.

### Responsive and accessibility approach

CURRENT breakpoints vary: header 720px; Pricing 900/720px; Gallery 850/600px; About 900/600px; legacy layouts around 991/990/768/580px. Gallery uses three/two/one columns; Pricing stacks and compacts cards; mobile header is 60px high versus a 30px contact bar plus 100px desktop nav.

TARGET: retain these designs while checking boundary transitions, narrow/short landscape screens, zoom, dynamic viewport height, safe areas, and fixed-header clearance. Do not “fix” overflow by hiding useful content. Ensure menu content can scroll in short viewports. In Shadow DOM, focus styling and inert/focus behavior need component-aware verification, not page-level assumptions.

## 7. Integrations

| Integration | Purpose / location / configuration | CURRENT failure behavior | TARGET security/privacy and reliability boundary |
| --- | --- | --- | --- |
| Acuity/as.me | All principal booking anchors use `https://DoubleADetailing.as.me/`; legacy iframe uses `https://app.acuityscheduling.com/schedule.php?owner=21786409` plus `embed.acuityscheduling.com/js/embed.js` | Browser/provider handles failed navigation; no local provider-health check or booking-result callback | Preserve now. Verify business identity and destination without appointments. External scheduling handles customer data; do not mirror it locally |
| Square — FUTURE ONLY | No code/configuration exists; exact owner-approved external URL TBD | No Square flow can be tested until destination is supplied | Use an ordinary external anchor after explicit approval; no SDK, API credentials, embed, webhooks, checkout, or tracking assumption is required |
| SMTPJS / SMTP | Contact loads `smtpjs.com/v3/smtp.js`; `app.js` supplies credentials and sender/recipient settings | Resets before send; success alert on any resolved response; no rejection handler | Current implementation fails FR-06. Owner revocation/rotation urgent. Choose approved secure delivery; never put SMTP secrets in browser code, HTML, or docs |
| Google Maps | Home keyed embed for Orange County; About keyless query embed | Iframe may be blank/blocked; text coverage remains | Key restrictions/billing ownership TBD. Browser-visible map key is not equivalent to an SMTP secret. Review restrictions; retain textual location guidance; maps must not block booking |
| Google Fonts / icons | Remote styles/font resources across pages; family choices in brand guide | Fallback fonts or missing icons; legacy layouts may shift | Preserve readable fallback stacks and text labels; requests disclose standard network/referrer information; consent policy TBD |
| Third-party UI/CDNs | Bootstrap/jQuery/Popper/AOS/Font Awesome, versions in section 3 | Styling/animation/behavior can fail when resources are blocked; AOS can affect content visibility | Pin/reduce only with approved compatibility checks. Keep content accessible when optional animation fails; integrity/CSP changes need dependency testing |
| Yelp | Home outbound link to existing business reviews | External navigation error handled outside site | Do not scrape/import reviews or fabricate ratings; existing link/proof retained |
| Analytics — NOT PRESENT | Provider, IDs, event collection, and reporting TBD | No repository measurement | Only after selection/approval; never block booking navigation or send inquiry PII. Account-level reporting may exist but is unverified |

No external account configuration, credentials, redirects, or availability were tested during this documentation task. Actual data handling by third parties requires owner review, not assumptions in this design.

## 8. Backend / Data Architecture

**CURRENT:** no owned backend, application API, persistent database, customer account store, or appointment store. Public business facts, prices, FAQs, reviews, and image captions are literal HTML. UI state lives in the DOM/JavaScript. Contact values are read in the browser and submitted through third-party email code; mailbox receipt/retention is external and unverified.

**TARGET:** keep this no-owned-backend architecture unless a separately approved delivery decision requires otherwise. FR-06 requires a secure inquiry outcome, not a particular server, database, or email vendor. Evaluate an owner-approved managed form capability before considering custom infrastructure; hosting capability and delivery evidence must be verified. This is an option to decide, not a configured integration.

Required delivery contract, regardless of chosen transport:

- Accept only the existing fields; validate required values and email format with the chosen trusted delivery service as well as browser checks.
- Keep credentials out of public assets. Configure authorized recipient/sender at the secure service boundary.
- Escape or safely encode submitted content before composing HTML email; do not trust browser input as markup.
- Distinguish invalid input, pending, confirmed success, and failed/unknown outcomes. A generic HTTP/promise resolution is not proof of inbox delivery.
- Define whether provider evidence confirms message delivery or merely submission acceptance. If only acceptance is observable, FR-06's “confirmed delivery” remains unresolved until the owner approves the guarantee and corresponding wording; do not silently weaken it.
- Decide abuse controls, retention, privacy disclosure, and retry/duplicate handling before enabling production submission. No automatic retry or local persistence is mandated.

No endpoint path, request schema implementation, storage table, function, or account has been invented. The concrete delivery choice is the principal open architecture decision.

## 9. SEO Architecture

| Concern | CURRENT | TARGET, subject to approved facts/domain |
| --- | --- | --- |
| Titles/descriptions | Page titles present; tailored newer descriptions, generic repeated descriptions on Contact/FAQ/legacy booking | Unique relevant metadata per indexable page; owner approval before copy changes |
| HTML semantics | Content authored in HTML; six marketing H1s; legacy booking missing H1/main | Preserve crawlable content/links and coherent heading/landmark structure |
| Canonical URLs | None in source; production domain unconfirmed | Absolute canonical URLs after approved host/path policy; resolve root versus `index.html` deliberately |
| Sitemap | None | Small static sitemap for approved indexable routes, not a generator dependency; legacy booking inclusion TBD |
| Robots | No file in source; live headers unknown | Explicit policy only after production/staging and legacy-route decisions; avoid accidental production blocking |
| Open Graph/social metadata | None | Approved page title/description, absolute URL, appropriate existing image once public domain/assets are confirmed |
| Structured data | None | Consider appropriate local-business/service markup using only verified public facts; type and fields require validation. No invented address, hours, rating, service area, or guarantees |
| Local consistency | Phone/email mostly agree; coverage/hours/legacy contact conflict | Owner-authoritative facts aligned across visible content and any future schema |

Do not publish the legacy street address as a storefront by inference. Social/profile ownership, Google Business Profile, indexing/search accounts, and existing production headers are TBD. Metadata is static; no SEO service or client-only injection is recommended.

## 10. Performance

**CURRENT:** no build bundles, measured budgets, field data, or Lighthouse baseline. HTML/CSS/images load directly; shared header is deferred. Legacy pages load duplicated libraries and remote fonts/icons; many local assets are unused. Gallery mostly lazy-loads below-fold images, but responsive sources and image space reservation are limited.

**TARGET:** preserve static rendering and remove only measured or proven waste under approval.

- Measure each active page's transferred bytes, image dimensions, render timing, and layout shift on an agreed mobile profile; repository size is not a runtime metric.
- Serve appropriately sized image variants where useful; preserve image quality/crop intent, accurate alternatives, and natural Gallery proportions. Reserve dimensions/aspect ratio to reduce shifts. Keep initially important imagery available promptly; lazy-load appropriate below-fold content only.
- Retain fallback fonts and only needed families/weights. Self-hosting or format conversion is optional and requires its own tradeoff/permission review.
- No bundler is required. Small page scripts and the existing shared component suffice. Remove unused/duplicate dependencies only after checking consumers and behavior; do not delete the media archive merely because files are unreferenced.
- Confirm production compression/cache headers with the host. Do not assume existing query-string versions provide a cache policy. Long-lived caching needs reliable invalidation; HTML should not strand stale booking links. Exact cache durations are TBD.
- Keep animation optional and honor reduced motion. Blocking a font, map, icon, or future analytics request must not disable the booking anchor or hide core content.

Numerical speed budgets and pass thresholds remain TBD rather than fabricated targets.

## 11. Accessibility

Target is the PRD/project's WCAG 2.2 AA expectation, not present certification.

- Use header/nav/main/footer landmarks and logical headings; preserve meaningful link/button labels. Add a keyboard route past repeated navigation when scoped for approval.
- Replace hidden-checkbox FAQs with semantic disclosure controls, keeping answers and multiple-open behavior. State must be exposed without relying solely on color.
- Header links and toggle need visible focus at every breakpoint. Current mobile styles remove the nav focus border; shadow-root focus must be checked directly. Coordinate background inertness/focus containment with the full-screen menu, Escape close, toggle close, and restored focus/scroll state.
- Keep native dialog; verify Tab containment, close/Escape, descriptive image/caption, and focus return. Cross-browser behavior is to be tested, not assumed from `showModal()`.
- Correct inaccurate image alternatives only using actual image content. Decorative images use empty alt; meaningful actions must retain accessible names if icons/images fail.
- Keep explicit form labels, suitable input types/autocomplete, understandable validation and live status feedback. Restore visible focus. Pending/error behavior must not discard user data or depend on a transient alert alone.
- Test zoom, text enlargement, contrast, reduced motion, short screens, and narrow viewports. Fixed headers/sticky CTAs must not cover focused elements; columns must follow a logical DOM reading order.

External provider accessibility is outside local control. Retain approved assistance contact options; don't assert provider compliance without testing.

## 12. Reliability / Error Handling

| Failure | CURRENT | TARGET expectation |
| --- | --- | --- |
| Broken booking URL/provider unavailable | No local detection/recovery logic | Correct anchor and approved contact alternatives; manual/provider landing verification. Browser cannot inspect cross-origin provider failure reliably; no health-check proxy or false success |
| Future Square failure | No Square implementation | Do not switch without verified destination. Any rollback to an older provider requires approved migration policy; never silently reroute bookings |
| Missing Gallery image | No custom loading/error state | Preserve layout/alt, show understandable unavailable state within viewer, keep close/focus working; no automatic photo substitution |
| Inquiry invalid/rejected/offline/timed out | No robust outcomes; data clears early | Keep values, report actionable failure/unknown, allow explicit retry, prevent parallel sends; no success until approved evidence is available |
| SMTPJS or delivery resource blocked | Current script can fail after input reset | Future transport failure must preserve input and contact alternatives; chosen no-JS/blocked-script fallback behavior is an approval decision |
| Header JS blocked | Shared header disappears | Recommend useful static fallback navigation/booking links; other authored content/CTAs remain available |
| Internal page missing | No authored 404 or routing rules found | Confirm host's real 404 behavior; do not serve a misleading SPA index response. Branded recovery page is optional future scope |
| CDN/font/map/animation unavailable | Browser fallback varies; legacy content may depend on scripts | Text/content/navigation remain readable; optional integrations do not gate conversion |

Do not introduce a notification/monitoring service or automated external submissions without approval. Error messages and recovery paths must accurately describe what is known, especially delivery uncertainty.

## 13. Security / Privacy

- **Urgent observed exposure:** `javascript/app.js` contains an SMTP credential. Owner-side revoke/rotate is required; removal alone cannot make a previously published credential safe. Do not reproduce it, exercise it, or transmit it to external scanners. Repository-history handling and external-account action require explicit scope.
- Contact collects name, email, phone, vehicle details, referral source, and free text. Keep this field set; avoid analytics/logging of submitted content or persistent browser drafts. Recipient, retention, disclosure, and abuse controls require decisions.
- The current form interpolates user input into HTML email; the approved delivery boundary must safely encode content and validate input. Do not claim a demonstrated browser XSS exploit from this source observation alone.
- Browser-visible Maps key restrictions are unknown. Review allowed origins/APIs and account ownership with approval; do not treat its presence as equivalent to the SMTP secret.
- Verify production HTTPS and appropriate hosting security headers; they are not discoverable here. CSP must account for current inline scripts/styles, Shadow DOM component styles, fonts, maps, and booking embed. Do not prescribe a blanket policy that breaks the site without testing.
- Pin/integrity-check third-party resources where suitable after compatibility review. No specific vulnerability claim is made solely from an old version number.
- Keep same-tab external-link behavior unless explicitly changed. Any future new-tab action should use safe opener handling and an understandable label.
- No authentication, account, payment, or appointment data belongs in this application. Future analytics consent and cross-domain attribution need privacy review; no cookie banner/provider is assumed necessary or already present.

## 14. Folder Structure

| Existing path | Responsibility |
| --- | --- |
| `index.html` | Home |
| `html/` | Six secondary documents, including legacy booking |
| `css/style*.css` | Page styles; `lightslider.css` is retained unused slider styling |
| `javascript/site-header.js` | Shared header component |
| `javascript/app.js` | Current unsafe contact delivery behavior |
| `javascript/script.js`, `showhide.js`, local jQuery/lightSlider | Retained legacy/unreferenced behavior and vendor files |
| `images/` | Existing production and unused image/video assets |
| `BRAND_GUIDE.md`, `README.md`, `AGENTS.md` | Brand, repository overview, development rules |
| `specs/` | Detailed page/product baseline and acceptance context |
| `docs/PRD.md` | Product source of truth |
| `docs/engineering/engineering-doc.md` | This engineering design |
| `output/`, `.DS_Store` | Local generated/OS artifacts, not application source |

No source relocation is recommended. A small `tests/` directory is reasonable only when approved checks are introduced; no framework/package scaffolding is necessary for this documentation task. Preserve unrelated untracked files, including the existing `front-end-skill.md`.

## 15. Naming / Engineering Conventions

- Follow AGENTS.md: two-space indentation, semantic HTML, descriptive alt text, kebab-case classes, existing BEM-like patterns, page-specific CSS, scoped vanilla JS.
- Keep existing route and asset filename case exact; validate on case-sensitive paths even when local macOS resolves mismatches.
- Use existing custom-element attributes and page keys; do not duplicate the mobile header in page markup. Static fallback, if approved, must not become a second independently evolving interactive menu.
- Retain real anchors for navigation/booking and buttons for local actions. Avoid user-controlled URL/template interpolation and global state.
- Preserve content values and brand styling unless the approved change explicitly covers them. Use TBD for unresolved facts, never plausible substitutes.
- Map changes and checks to PRD IDs FR-01–FR-08. Current defects, proposed target design, implemented behavior, and test results must be distinguished in documentation.
- No new dependencies, commits, pushes, or deployments without appropriate task authorization. Do not include generated screenshots, secrets, or unrelated edits in commits.

## 16. Testing Strategy

**CURRENT:** no automated test suite or build command. This task performs source/document validation only. **TARGET:** a small verification layer proportionate to the static site, plus real-browser checks for interactive and responsive behavior. Tool/dependency additions require approval.

### Static/build and lint validation

- Serve repository root over HTTP, e.g. `python3 -m http.server 8000`; do not substitute file-URL behavior for deployed routing.
- Run `git diff --check`; validate HTML structure, duplicate IDs, labels/headings, exact-case local href/src/CSS URLs, and syntax of authored JavaScript including inline scripts. No invented `npm build` step.
- Scan all authored HTML and the header's template for expected booking destination. Exclude commented-out markup from runtime assertions and classify legacy embed separately.
- Compare Home/Pricing amounts and existing required fields against approved source facts. Any fixture must come from approved content, not this test author's assumptions.
- Lint tools are optional scoped tooling, not a requirement to introduce a package manager. Exclude vendor/generated files from style rewrites.

### Focused unit/component tests, where useful

- Header: base-path resolution from root and secondary pages; active `aria-current`; repeated open/close; Escape; previous overflow restoration; disconnect cleanup; mobile-to-desktop transition.
- Gallery: corresponding image/caption, open/close and failure state. Validate native focus behavior in a real browser rather than DOM-only mocks.
- Future contact: validation, duplicate-submit prevention, pending/confirmed/error/unknown outcomes, input retention, and safe content handling against approved mocks. Never call the live SMTP transport in a test.

### Responsive/accessibility checks

Use the project's suggested 320/390px phone, 768px tablet, and 1280px desktop samples, plus both sides of affected breakpoints, short landscape, and 200% text zoom. These are test samples, not new product numerical SLAs. Include agreed modern mobile Safari and Chrome and desktop browser coverage; exact versions TBD. Check keyboard-only and representative screen-reader operation, visible focus, contrast, reduced motion, menu/dialog behavior, and content/CTA overlap. Automated accessibility scans supplement—not replace—manual checks.

### Critical smoke/E2E cases

| Test | Expected result | PRD mapping |
| --- | --- | --- |
| Direct-load all seven routes; follow header/logo/footer/local anchors | Intended pages/assets load without erroneous paths; known legacy failures recorded until repaired | FR-02 |
| Activate Book Now/Book This Package from every placement, including Shadow DOM and mobile sticky CTA | Actual anchor targets exact approved `https://DoubleADetailing.as.me/`; approved landing check verifies business identity without creating appointment | FR-01 |
| Future Square handoff, only after confirmed URL and approval | Website → Book Now → exact approved Square URL and correct business landing; old links reconciled under approved scope; no fabricated test destination | FR-01 |
| Navigate mobile menu with keyboard/touch; close with toggle/Escape/link; resize | Focus, expanded state, scroll position/overflow, and page content remain usable | FR-02 |
| Open each Gallery image, close/Escape, simulate failed image | Correct content, error fallback and focus return | FR-04 |
| Expand/collapse Home and FAQ questions with keyboard | Correct answer and exposed state; independent-open behavior retained | FR-05 |
| Validate phone/email targets; exercise form through approved mocks only | Accurate destinations, no credential, correct required fields, honest outcomes and preserved failed input | FR-06, FR-08 |
| Compare package values and confirmed coverage/contact facts | No unapproved divergence or invented claims | FR-03, FR-07 |

A live external landing check establishes only handoff, not successful scheduling, payment, or completed booking. Booking completion reporting requires provider data/access; no test appointment/payment is authorized. Record browser/viewport, tested state, result, known failure, and limitation for each case. Shared-header changes require all-page regression checks.

## 17. PRD → Architecture Mapping

| Requirement | Responsible architecture | Acceptance evidence | Current satisfaction / blocker |
| --- | --- | --- | --- |
| **FR-01 / P0** external booking | Header and authored page anchors; external Acuity, future Square | Exact href inventory plus real-browser approved landing checks | Authored Acuity targets present/approved; live verification outstanding. Square not testable without URL/readiness |
| **FR-02 / P0** dependable navigation | Shared header, local links, responsive page layout, static host | All-route/path checks; menu keyboard/touch/focus/scroll tests | Partial: legacy paths and menu focus/lifecycle gaps prevent a full pass |
| FR-03 / P1 package clarity | Home/Pricing authored content and consistency checks | Matching prices/categories/times plus owner-approved scope wording | Values match; “starts at”/motorcycle interpretation and operational correctness require owner decisions |
| FR-04 / P1 work gallery | Image buttons, native dialog, local media | Correct image, close/Escape/focus, error and alt checks | Present; accessibility/error verification outstanding |
| FR-05 / P1 accessible answers | Home/FAQ disclosures; recommended native semantics | Keyboard/touch state/answer tests | Current hidden-checkbox approach fails ordinary keyboard focus |
| **FR-06 / P0** safe reliable contact | Phone/email anchors, form UI, approved secure delivery boundary | No public secret; mock outcome tests; provider evidence meeting approved delivery guarantee | Not satisfied: credential exposure, early reset, unreliable success/error behavior. Transport/recipient/guarantee unresolved |
| FR-07 / P1 trustworthy facts | Authored story/coverage/reviews/contact and future static metadata | Cross-page comparison against owner-approved facts | Architecture mapped; factual conflicts/provenance need owner input |
| FR-08 / P1 specialty inquiry | Pricing custom quote anchor and Contact | Route works and inquiry meets FR-06 | Quote path exists; contact failure inherited |
| PRD primary outcome / proposed North Star | External provider plus potential approved measurement | Provider-confirmed qualified bookings attributable to website | Not measurable from current source; qualification/attribution/provider reporting TBD |
| PRD mobile/accessibility/performance/SEO/privacy | Existing static pages/component, focused quality changes, host/integration policies | Section 16 checks; measured budgets and approved facts/policies | Partially implemented; no current conformance/performance certification |

**P0 coverage review:** all three P0 functional requirements and the primary conversion outcome have named owners, target behavior, and verification paths. None is unmapped. FR-06 cannot be completed with the current transport; FR-01's future Square path and the North Star remain externally dependent. Mapping is not a claim of implementation completeness.

## 18. Technical Risks

| Classification | Risk / evidence | Consequence or design response |
| --- | --- | --- |
| OBSERVED | Browser-visible SMTP credential and unsafe inquiry outcome logic | Owner revocation/rotation urgent; secure transport and honest result contract required |
| OBSERVED | Case-sensitive path defects and directory script URL on legacy pages | Missing resources/navigation; exact-case static checks and host verification |
| OBSERVED | Hidden FAQ inputs, weak mobile focus styles, no explicit menu focus containment/breakpoint reconciliation | Keyboard/short-screen journeys may fail; native semantics and component-level verification |
| OBSERVED | Duplicate legacy dependencies and unpinned external resources | Extra requests and reproducibility risk; no vulnerability conclusion without evidence |
| OBSERVED | No runtime analytics/completion signal or production config in repository | Cannot certify attribution, deployment policy, HTTPS/cache behavior, or completed bookings |
| OBSERVED | Duplicated price/contact/coverage markup with actual inconsistencies | Drift and customer confusion; approved facts plus consistency checks |
| POTENTIAL | Provider outages or unverified future Square migration | Broken handoff; gated destination verification, retain contact assistance |
| POTENTIAL | Header/CDN failure removes important navigation or hides legacy animated content | Progressive fallback and blocked-resource smoke testing |
| POTENTIAL | Large active images or fonts produce mobile delay/layout shift | Measure active requests and optimize scoped assets; repository size alone proves no speed defect |
| POTENTIAL | New delivery vendor only acknowledges receipt while UI promises delivery | P0 contract remains unmet; define observable guarantee before selecting transport/copy |
| POTENTIAL | Overly broad security headers, dependency removal, or route changes regress functioning pages | Host/dependency inventory, scoped approval, and all-page smoke tests |

## 19. Open Engineering Decisions

1. **Secure inquiry delivery:** approve managed delivery option/provider, verified recipient, sender configuration, observable delivery guarantee, failure/unknown behavior, abuse controls, and no-JS fallback. No custom backend or vendor is selected. Decide how/when owner handles exposed credential revocation; do not test it.
2. **Hosting authority:** confirm actual deployment project/pipeline, canonical domain, HTTPS, case sensitivity, redirects/404, cache and security-header controls. README alone cannot settle these.
3. **Verification tooling/support:** agree browser/version matrix and lightweight test/lint tooling; choose measured performance baselines/budgets without a framework rewrite.
4. **Progressive navigation/accessibility design:** approve fallback header contract and focus/background behavior; approve native FAQ semantics while preserving design and content. These address existing PRD requirements, not new marketing features.
5. **Measurement:** choose provider/privacy approach only if instrumentation is approved; confirm whether attributable provider-confirmed bookings are observable. Do not equate a click or accepted inquiry with the North Star or delivered email.
6. **Deferred Square migration:** owner supplies readiness, exact approved URL, legacy-route disposition, verification and any rollback policy. Acuity remains approved until then.
7. **Business-dependent metadata/content:** canonical/indexing policy, public address/hours/coverage, pricing interpretations, and proof permissions require owner answers before technical propagation.

No application implementation is authorized by completion of this document. The engineering design awaits owner review; the approved PRD remains the product authority.
