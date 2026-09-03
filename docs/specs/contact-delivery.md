# Safe inquiry delivery and contact actions

Baseline: application commit `a57b2ca`, September 2, 2026. Specification proposal; no implementation authorized until this set is approved. Sources: [PRD](../PRD.md) and [Engineering Document](../engineering/engineering-doc.md). Their draft/awaiting-approval labels predate the owner's explicit approvals; unresolved values remain unresolved. Paths below are repository-relative. [Implementation map](implementation-map.md) records dependencies, decision gates, and full coverage.

Acuity remains the approved current booking provider; Square is deferred by the approved sources. Do not replace links, embed a new scheduler, or create booking infrastructure. Acceptance outcomes are PASS, FAIL, or NOT VERIFIED with evidence; never treat a blocked test as PASS.

Status update September 2, 2026: owner approved Netlify Forms, site and test recipient. [Netlify contact rollout](netlify-contact-rollout.md) records the implemented local delta, acknowledgment semantics and verification, superseding the provider-selection gate below. Production delivery is still blocked on dashboard configuration, deployment approval and live verification. Remaining sections preserve the original baseline requirements.

## 1. Objective

Let customers ask questions or request specialty quotes without losing their message, exposing credentials, or receiving false delivery confirmation.

## 2. Source Requirements

PRD FR-06/P0, FR-08/P1 (inherited contact flow), privacy/reliability/accessibility §9. Engineering §§4, 6–8, 11–13, 16–19 specify secure transport boundary and local form states but intentionally select no vendor/backend.

## 3. Current State

`html/contact.html` `.contact-form` has required `#name`, `#email`, `#number`, `#carDetails`, `#message`, optional `#hearAbout`; email/phone are text inputs. `javascript/app.js` intercepts submit, reads values, resets before `Email.send`, exposes SMTP credential/settings, inserts input into HTML email, and alerts success on any resolved promise without rejection handling. Form has no action endpoint/Netlify config. `css/stylecontact.css` removes outlines and stacks form/info at <=991px, adjusts at <=580px. Public phone/email shown in text; footer email uses `#`; shared header actions work. Actual recipient differs from public email. No safe provider or .env configuration exists.

## 4. Target State

Same fields, content/layout and direct contact options; credential-free client, accurate validation, pending state and confirmed success versus error/unknown. Delivery remains externally managed with no custom backend chosen. No inquiry is an appointment.

## 5. Delta to Implement

Unblocked design slice: change email to type=email and phone to type=tel; retain flexible phone values (no arbitrary digit-only rule), required/optional flags and IDs; use name/email/tel autocomplete on corresponding fields. Restore visible focus and associate errors/status. Wrap existing public phone/email text in matching tel/mailto anchors and repair Contact footer email href; do not replace values or alter legacy facts.

D1-gated transport slice: remove browser credential and unsafe SMTP transport only with an approved replacement or explicit owner-approved temporary form-disabling plan. Do not deploy a client-only mock or leave a native POST with no valid action. Configure sender/recipient at chosen secure service; use existing fields, input validation and safe encoding at trusted boundary. Remove early reset and unconditional alert. No new endpoint/service path is prescribed until D1 supplies actual architecture/configuration. Owner must revoke/rotate exposed credential separately; removal alone is insufficient.

Use local states idle→invalid or submitting→confirmed/error/unknown. Prevent simultaneous requests; preserve all fields until confirmed success. On timeout/unverifiable acknowledgment show unknown status and do not auto-retry. D1 must define timeout/result contract and exact truthful status text before shipping.

## 6. User Behavior / Flow

Customer enters existing fields → validation (no request if invalid) → pending state → confirmed delivery clears fields, or failure/unknown retains them → customer can retry deliberately or call/email. Specialty quote uses this same flow, not another form.

## 7. Functional Requirements

- CON-FR-01: existing fields and required flags persist; email validation and usable phone input operate without new data collection (FR-06/08).
- CON-FR-02: no credentials in browser assets or test output; trusted delivery validates and encodes user input (FR-06).
- CON-FR-03: success requires approved delivery evidence; acceptance-only response is not silently relabeled delivered (FR-06).
- CON-FR-04: invalid/rejected/offline/timed-out/blocked-resource outcomes retain input; no parallel/automatic retry (FR-06).
- CON-FR-05: direct contact anchors match existing public details and remain available during form failure (FR-06/08).

## 8. UI / Component Requirements

Reuse form, `.inputBox`, labels and current CSS. Add local status/error markup and JS state only; use `aria-busy`, disabled submit while pending, accessible status/error associations. Return submit usability after failure. Keep existing hero, contact panel and external booking CTA. No success page, account, localStorage draft, queue, or new component architecture.

## 9. Responsive Requirements

Retain existing 991/580px breakpoints and layouts; errors/status expand naturally, wrap and remain visible at 320/390px, 768/1280px, and zoom. Error messages cannot overlay next field; focus must clear fixed header.

## 10. Accessibility Requirements

Explicit labels remain; use native validation plus inline explainable service errors. Focus first invalid field for validation, announce pending/outcome via live status without unexpectedly relocating focus. Preserve visible focus on inputs and submit. No transient alert-only confirmation. Confirmation wording must match approved guarantee.

## 11. SEO Requirements

No new metadata or inquiry-confirmation route. Keep Contact title/description until seo spec approval. Do not expose submitted data in URL query/fragment, metadata or logs.

## 12. Integration Requirements

D1 required: chosen secure delivery capability, trusted configuration location, actual recipient/sender, response meanings, no-JS/blocked-JS behavior, timeouts, retry/abuse/privacy/retention policy and safe test destination. No SMTP credentials in .env.example for a browser-only site. If chosen capability needs variables/new infrastructure, return for approved design/spec update rather than invent them. Acuity/Square remain independent.

## 13. Error / Failure Behavior

Mock invalid input, rejection, network loss, timeout, malformed response and acceptance-only response. Treat ambiguous response as unknown, preserve input, never claim inbox delivery. Script-disabled behavior must not submit to the current page accidentally: exact fallback depends on D1, so do not ship until it is specified. Link-handler failure does not justify claiming call/email completion.

## 14. Files Expected to Change

EXPECTED TO CHANGE after relevant gate: `html/contact.html`, `javascript/app.js`, `css/stylecontact.css`.

POSSIBLY CHANGED: no additional concrete file approved; provider/hosting configuration depends on D1 and must be listed in a revised spec before coding it.

SHOULD NOT CHANGE: field set, public contact values, booking URLs, pricing/specialty list, other routes, dependencies without approval. No server/SQL/.env files are currently required.

## 15. Dependencies

D1 blocks transport integration and production-ready FR-06/08; vendor choice cannot be inferred from Netlify mention. Navigation owns header/fallback changes. Content-consistency owns legacy contact facts. No package additions selected.

## 16. Out of Scope

Contact redesign, appointment form, new marketing copy/response promises, custom backend, live test messages without authorization, credential rotation through an account by this task, history rewriting, customer storage.

## 17. Acceptance Criteria

- CON-AC-01: five required fields plus optional referral remain, email validates and phone accepts non-digit formatting; direct contact hrefs use existing public values.
- CON-AC-02: approved scan of public assets finds no SMTP credential; owner confirms revocation separately without copying secret. Until evidence exists this is NOT VERIFIED/FAIL as applicable.
- CON-AC-03: invalid input sends no request; one pending submission prevents a second; all failure/unknown mocks preserve exact entered values.
- CON-AC-04: only approved confirmed-delivery result clears fields and reports success. Acceptance-only result never passes as delivered.
- CON-AC-05: keyboard, screen-reader status, field focus, narrow/zoom layout and chosen no-JS fallback pass.
- CON-AC-06: external booking and specialty contact route remain unchanged; no new PII persistence/analytics exists.

## 18. Verification Plan

Do not execute current live Email.send. Run static field/credential-presence checks without printing values. After D1, test through approved mocks/test destination only: invalid, confirmed, rejected, unknown, timeout, duplicate click, blocked library and no-JS. Inspect outbound payload for exactly approved fields, no query-string PII; inspect DOM status/focus and browser storage. Verify trusted validation/encoding through chosen provider's safe test capability. Provider receipt evidence requires authorization; if not available mark delivery NOT VERIFIED, not PASS. Run Contact and Pricing→Contact→Book Now smoke, no appointments.
