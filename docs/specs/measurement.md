# Vendor-neutral conversion measurement contract

Baseline: application commit `a57b2ca`, September 2, 2026. Specification proposal; no implementation authorized until this set is approved. Sources: [PRD](../PRD.md) and [Engineering Document](../engineering/engineering-doc.md). Their draft/awaiting-approval labels predate the owner's explicit approvals; unresolved values remain unresolved. Paths below are repository-relative. [Implementation map](implementation-map.md) records dependencies, decision gates, and full coverage.

Acuity remains the approved current booking provider; Square is deferred by the approved sources. Do not replace links, embed a new scheduler, or create booking infrastructure. Acceptance outcomes are PASS, FAIL, or NOT VERIFIED with evidence; never treat a blocked test as PASS.

Status: BLOCKED for instrumentation by D5; event definitions ready for review, no vendor selected.

## 1. Objective

Make the PRD's proposed booking/contact/gallery metrics measurable without confusing a click with a customer, collecting inquiry PII, or blocking navigation.

## 2. Source Requirements

PRD §4 recommended North Star/supporting metrics and §§8–9 conversion/privacy; Engineering §§7–8, 13, 16–19: provider/privacy selection gated, no current SDK, optional analytics must not block booking. FR-01/06/04 behavior must be preserved, not expanded.

## 3. Current State

No analytics SDK, tag manager, CTA hooks, session attribution or provider-completion callback exists in current authored pages/header. Booking anchors are real as.me links; Gallery inline open handler and Contact submit logic are event sites. No vendor account/session consent policy or measured baseline exists. Fonts/maps/CDNs are not conversion measurement.

## 4. Target State

After D5 approval, collect only approved events with bounded non-PII properties. Metrics distinguish attempt, accepted request, delivered inquiry and provider-confirmed booking. Client events do not fabricate North Star completion.

## 5. Delta to Implement

Do not install a vendor or add dispatch code until D5 selects provider, privacy/consent/session rules and collection location. Preserve native anchor default action. Implement selected vendor's minimal adapter in approved existing code area or amend this spec with approved actual new module path; no fictional file asserted now. Attach each semantic handler exactly once, including header Shadow DOM. Avoid counting both direct handler and composed-path delegate for one activation.

Event contract below is ready to bind after D5. Provider reports, not a browser click, supply confirmed bookings. No automatic cross-domain identifiers, query decoration, cookie store or FAQ tracking is authorized. Session/page exposure support is necessary to calculate the recommended rates, not a new product feature; vendor-defined semantics must be recorded before implementation.

## 6. User Behavior / Flow

Visitor views approved page → optionally activates booking/contact or opens Gallery → nonblocking eligible event → original interaction proceeds. Contact outcome event follows approved form result, not submit alert. Provider reporting may later support qualified bookings separately.

## 7. Functional Requirements

Required common properties for collected events: normalized `page_path` from the seven known routes (no query/fragment), fixed `placement` enum where relevant, approved provider's automatic timestamp; device/session dimensions only under D5 policy. No names, email, phone input, vehicle detail, message, free text, full referrer/query, persistent customer ID or raw external URL.

| ID / event | Meaning and exact trigger | Additional required properties |
| --- | --- | --- |
| MEA-FR-01 / `page_view` | Once per actual document navigation under approved consent; not again when menu/FAQ/dialog opens. Vendor auto-pageview or explicit handler, never both | `page_path`; device/session denominator supplied only by approved vendor rules |
| MEA-FR-02 / `book_now_click` | One real activation of existing Book Now/Book online/Book This Package anchor, by pointer or keyboard; before native navigation without await/preventDefault | `placement` = header, fallback, hero, process, package, final, sticky, footer; `booking_provider` = acuity now; fixed package key only on package anchor |
| MEA-FR-03 / `contact_click` | One real tel/mailto anchor activation; not a completed call/email | `method` = phone or email; fixed placement |
| MEA-FR-04 / `contact_submit_attempt` | One valid user submission accepted into local pending state, not invalid HTML submit or duplicate pending click | `page_path` contact; no form values |
| MEA-FR-05 / `contact_submit_result` | One settled outcome for that local attempt using contact-delivery's approved result mapping | `result` = delivered, error, unknown; acceptance-only mapping must be decided under D1, never imply delivered |
| MEA-FR-06 / `gallery_image_open` | After native dialog successfully opens for user action; count a later deliberate reopen separately, not hover/load/close | fixed `image_key` derived from existing gallery1…gallery7 filename, not caption text |

These IDs map to PRD §4 metrics; FR-01/04/06 are preservation dependencies. No `booking_complete`, `faq_expand`, scroll/heatmap, ad pixels or user-profile event is specified.

## 8. UI / Component Requirements

Reuse existing real links, header component, Gallery open callback and approved Contact state transition. No new visible widget/cookie UI specified before D5. Adapter errors must be caught locally; DOM controls keep native behavior. Do not fetch booking URL from analytics config.

## 9. Responsive Requirements

Same semantics for mobile/desktop and header/fallback/sticky variants. Device classification comes from approved reporting rules, not new viewport breakpoint for layout or invented demographics. Responsive UI unchanged.

## 10. Accessibility Requirements

Pointer/keyboard activation emits once using the same semantic action, not parallel keydown and click handlers. No focus/announcement changes from collection. Consent UI, if required, needs selected design/scope; do not invent it.

## 11. SEO Requirements

Do not mutate canonical URLs or append tracking parameters to navigation without approval. Organic/local search reporting uses approved source data, never raw query/user location inference. Robots/SEO untouched.

## 12. Integration Requirements

D5 supplies vendor/account public configuration, privacy/consent and session eligibility, reporting period, dedup rules, provider reporting access and collection approval. No secret in client. Future Square provider value only after D4 migration. D1 determines what delivered means; without evidence no delivered event. No callback/API/db is created to manufacture booking completion.

## 13. Error / Failure Behavior

Blocked/rejected analytics request or thrown adapter function leaves navigation/dialog/form result intact, no retries blocking UI. No event collection before consent where required. If page unload loses a click, record measurement limitation; do not stall navigation to guarantee receipt. Session restoration/consent timing semantics must be tested against selected vendor.

## 14. Files Expected to Change

EXPECTED TO CHANGE: none until D5.

POSSIBLY CHANGED: `javascript/site-header.js`, `index.html`, `html/pricing.html`, `html/gallery.html`, `html/aboutus.html`, `html/contact.html`, `html/faq.html`, `html/booknow.html` only if D4 permits; `javascript/app.js` after D1. Shared adapter location/public configuration must be added to this spec after vendor selection; no currently nonexistent runtime path is assumed.

SHOULD NOT CHANGE: booking URLs/default navigation, form fields, page layouts, image list, dependencies prior to D5, provider account configuration without approval.

## 15. Dependencies

D5 blocks instrumentation entirely; D1 blocks contact result mapping; D4 gates Square/legacy reporting. Navigation and Gallery handlers settle before attaching collection, reducing duplicate listeners. No package/env currently required; vendor choice may require revised specification.

## 16. Out of Scope

Vendor selection by agent, invented metrics/targets, tracking PII, custom booking API, cross-domain user IDs, heatmaps/ads/FAQ tracking, analytics-driven UI redesign, automatic environment files.

## 17. Acceptance Criteria

- MEA-AC-01: approved collection produces exactly one eligible pageview/action/result per defined trigger; Shadow DOM/fallback and keyboard clicks are counted once.
- MEA-AC-02: payload includes only bounded approved properties; inspect actual requests for no PII/query/fragment/free text.
- MEA-AC-03: click is never reported as confirmed booking; delivered inquiry only follows D1-approved evidence.
- MEA-AC-04: blocked vendor/exception/consent denial does not delay or break native booking/navigation/gallery/contact behavior.
- MEA-AC-05: reported rate denominators/session rules and baseline/target remain explicitly documented; no fabricated North Star value.

## 18. Verification Plan

After D5 use approved vendor debug/test mode or mocked sink, never live PII. Verify all placement types, keyboard/pointer and repeated header initialization; inspect payload and exact event counts. Test disabled/blocked vendor and consent eligibility transitions. Contact tests use D1 mocks, including acceptance-only/unknown. Reconcile outbound event with browser destination without booking. Provider-completed/qualified attribution remains NOT VERIFIED until real authorized reporting demonstrates it. Do not install SDK or create account during spec generation.
