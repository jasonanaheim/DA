# Business facts and package consistency

Baseline: application commit `a57b2ca`, September 2, 2026. Specification proposal; no implementation authorized until this set is approved. Sources: [PRD](../PRD.md) and [Engineering Document](../engineering/engineering-doc.md). Their draft/awaiting-approval labels predate the owner's explicit approvals; unresolved values remain unresolved. Paths below are repository-relative. [Implementation map](implementation-map.md) records dependencies, decision gates, and full coverage.

Acuity remains the approved current booking provider; Square is deferred by the approved sources. Do not replace links, embed a new scheduler, or create booking infrastructure. Acceptance outcomes are PASS, FAIL, or NOT VERIFIED with evidence; never treat a blocked test as PASS.

Status: BLOCKED for factual copy deltas by D2; existing price/route preservation is verification-only.

## 1. Objective

Remove contradictory decision-making information only using owner-authoritative facts, while preserving existing packages, proof and layouts.

## 2. Source Requirements

PRD FR-03/P1, FR-07/P1, FR-08/P1 and FR-06/P0 contact consistency. Engineering §§4, 8–9, 16–19: authored content retained, consistency checks, no invented facts or CMS.

## 3. Current State

`index.html` and `html/pricing.html` package amounts/times match; vehicle categories include motorcycle except Standard Interior. “Starts at” uses sedan values even when motorcycle is lower; inclusion wording differs. Specialty CTA already points to Contact. Home radius is approximate 25 miles from unspecified hub; About lists Orange County cities and adjacent counties by request. FAQ hours and old footers differ; legacy booking has old phone/address values and malformed contact anchors. Three Home testimonials/owner experience claims have no provenance record. Some Home photo alt text appears inconsistent with source image. About headline remains unchanged.

## 4. Target State

One approved interpretation of facts across existing pages, without changing service offering, inventing claims, or centralizing content into new infrastructure. Preserve already matching prices and specialty link.

## 5. Delta to Implement

Do not rewrite unresolved statements. D2 must supply a per-fact approved value and affected occurrences before each content patch: coverage/hub/exceptions; hours/holidays; public contact/address; package starting-price meaning/motorcycle scope/condition/time/inclusions; policy wording and photo/review permissions. Use that recorded answer to edit only corresponding literal HTML text/hrefs. Keep published values until owner approves any correction. Preserve matching numerical pricing; no price delta currently authorized. Verify actual local photos before altering inaccurate alt text; no assumed vehicle/service caption. Legacy booking text and route changes also require D4. About stylistic headline replacement is not required for this delta and remains out of scope.

## 6. User Behavior / Flow

Customer compares Home/Pricing or reads About/FAQ → same approved information → can choose service or contact without resolving contradictions themselves → external booking.

## 7. Functional Requirements

- CNT-FR-01: duplicated package amounts/categories/times stay equal unless owner explicitly approves a value change (FR-03).
- CNT-FR-02: factual patches link to an owner-approved value/interpretation and update all in-scope occurrences, not unrelated copy (FR-07/06).
- CNT-FR-03: preserve specialty list/custom-quote Contact href; no fixed specialty prices invented (FR-08).
- CNT-FR-04: review/photo/owner claims are retained without embellishment; meaningful alt corrections use inspected media evidence (FR-07).

## 8. UI / Component Requirements

Keep literal HTML and existing cards, pricing definition lists, story, maps, reviews and FAQ components. No shared JSON/CMS, redesign or content migration. FAQ semantics owned by faq-disclosures; this spec edits words only after factual approval.

## 9. Responsive Requirements

No layout change; approved factual text must wrap without clipping at current breakpoints and 200% zoom. Validate pricing row alignment and longer coverage text at 320/390/768/1280. Do not reduce legibility to fit new text.

## 10. Accessibility Requirements

Retain heading hierarchy and descriptive link labels. Alt text describes actual photo rather than unverified service results. Do not change testimonial quotations for style. Main landmarks/FAQ semantics belong to other specs.

## 11. SEO Requirements

Owner-confirmed public facts become the input to seo spec; no schema address/hours/reviews derived from conflicting legacy content. Keep route/title metadata unchanged here.

## 12. Integration Requirements

Preserve existing booking/Yelp/Maps destinations unless owner approves corresponding business correction. Map query changes require confirmed coverage and scope; no new map/key/account. Contact recipient selection remains D1, not equivalent to public email.

## 13. Error / Failure Behavior

If approved fact is missing or conflicts with another approval, leave that occurrence unchanged and mark criterion NOT VERIFIED. Do not resolve radius/address/hours from screenshots, legacy comments, or external guesses.

## 14. Files Expected to Change

EXPECTED TO CHANGE: none until D2 records exact replacements.

POSSIBLY CHANGED: `index.html`, `html/pricing.html`, `html/aboutus.html`, `html/contact.html`, `html/faq.html`, `html/booknow.html` (D4), `javascript/site-header.js` only for approved shared contact fact change.

SHOULD NOT CHANGE: CSS/layouts, image binaries, booking provider, existing matching prices absent explicit approval, testimonial quotation wording, frameworks/data storage.

## 15. Dependencies

D2 gates factual edits; D4 additionally gates legacy booking route/contact disposition. Provide approved facts to seo. Existing matching values/quote href require verification, not waiting or rewrites.

## 16. Out of Scope

New service areas, policies, guarantees, testimonials, pricing strategy, About headline style change, CMS/refactor, review scraping, provider migration.

## 17. Acceptance Criteria

- CNT-AC-01: all four Home/Pricing package amounts and durations match pre-change baseline unless explicit approval records a replacement; Standard Interior still omits motorcycle.
- CNT-AC-02: every changed business statement/href has an approved fact record and consistent in-scope occurrences; unresolved facts remain flagged, not invented.
- CNT-AC-03: six specialty categories and quote Contact path remain unchanged; no unapproved price appears.
- CNT-AC-04: changed image alt matches visual evidence; reviews/experience claims are not embellished.
- CNT-AC-05: completed factual reconciliation has no contradictions within the approved scope; no horizontal overflow or changed component hierarchy.

## 18. Verification Plan

Capture actual source price/inclusion/fact occurrence lists before editing; compare all affected occurrences afterward. Preserve comments separately from rendered facts. Reviewer checks each replacement against D2 answer record, not model judgment. Inspect photos locally before alt change and compare 320/390/768/1280 layouts. Validate Contact and booking hrefs without submissions; report unresolved scope separately from passed numeric-preservation checks.
