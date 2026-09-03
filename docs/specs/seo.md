# Static metadata and local discoverability

Baseline: application commit `a57b2ca`, September 2, 2026. Specification proposal; no implementation authorized until this set is approved. Sources: [PRD](../PRD.md) and [Engineering Document](../engineering/engineering-doc.md). Their draft/awaiting-approval labels predate the owner's explicit approvals; unresolved values remain unresolved. Paths below are repository-relative. [Implementation map](implementation-map.md) records dependencies, decision gates, and full coverage.

Acuity remains the approved current booking provider; Square is deferred by the approved sources. Do not replace links, embed a new scheduler, or create booking infrastructure. Acceptance outcomes are PASS, FAIL, or NOT VERIFIED with evidence; never treat a blocked test as PASS.

Status: BLOCKED for publishable metadata/policy by D2/D3; existing metadata preserved.

## 1. Objective

Make existing pages discoverable under the confirmed production domain with accurate metadata and owner-approved local facts, without new landing pages or runtime SEO services.

## 2. Source Requirements

PRD FR-07/P1 and local SEO §9; Engineering §§9, 12–13, 16, 19: static metadata, canonical policy, sitemap/robots, social metadata and verified structured data.

## 3. Current State

All seven HTML pages have language/charset/viewport/title/description. Newer Home/Pricing/Gallery/About descriptions are tailored; Contact/FAQ/legacy booking reuse generic description. Six marketing pages have H1; legacy booking lacks H1/main. No canonical/social/schema/robots/sitemap files or deployment policy exists. Production domain, root/index canonical selection, legacy route indexability and public address/hours are unresolved.

## 4. Target State

Static per-page SEO under approved domain/path/indexing policy; local facts consistent with visible approved content. Keep existing route structure and descriptive metadata that already meets intent. No client-only metadata injection.

## 5. Delta to Implement

After D3 supplies canonical host, HTTPS/path policy and indexable routes, add exactly one absolute canonical per indexable document; decide `/` versus `/index.html` explicitly. Add per-page Open Graph/social metadata with approved text and existing appropriate image; image choice/absolute asset URL require approval. Contact/FAQ descriptions get only owner-approved page-specific text; preserve existing newer titles/descriptions unless approved otherwise. Define sitemap entries from approved indexable routes and robots policy for real production/staging environment. These two files do not currently exist: their exact new paths/hosting mechanism must be approved under D3 before creation; no assumed Netlify config.

Structured data is conditional: D2/D3 must confirm business type, public facts, and eligible fields. Add only approved static markup matching visible content; if prerequisites are missing omit structured data rather than output placeholders. Legacy metadata/landmarks/indexability await D4. No new SEO pages or fabricated review aggregates.

## 6. User Behavior / Flow

Search/crawler reads HTML → correct page metadata/canonical → visitor reaches existing service page → approved local facts and Book Now. Social share uses approved title/image, not invented business proof.

## 7. Functional Requirements

- SEO-FR-01: metadata stays in authored HTML and agrees with approved page/domain policy (SEO NFR).
- SEO-FR-02: canonicals and sitemap use only approved live absolute URLs, no local/file/staging placeholders (SEO NFR).
- SEO-FR-03: structured data contains only verified approved visible facts; no inferred storefront/review aggregate (FR-07).
- SEO-FR-04: existing page routes/content/booking remain unchanged; legacy indexing waits for D4 (FR-02 preservation).

## 8. UI / Component Requirements

Reuse each HTML head and existing content. No template engine, React/Next metadata API, SEO vendor or new component. Heading/landmark changes only where known missing and approved; FAQ category heading already owned by faq-disclosures.

## 9. Responsive Requirements

No visual layout delta expected from head changes. If landmark adjustment approved on legacy route, compare existing desktop/mobile flow and iframe dimensions rather than redesign.

## 10. Accessibility Requirements

Maintain `lang=en`, descriptive titles and correct page heading outline. Metadata does not substitute for visible labels/alt. Do not add hidden keyword content or accessibility-breaking heading changes.

## 11. SEO Requirements

Global: canonical host/robots/sitemap policy. Page: existing titles/descriptions plus approved changes. Local: confirmed contact/coverage/hours. Social: Open Graph and optional platform-specific equivalents under approved image/text policy. Structured data: conditional vetted fields only; no FAQ/review rich-result eligibility promises.

## 12. Integration Requirements

No SEO integration currently exists. Hosting/search-console accounts are not accessed or modified by this spec. Maps query/key remains unchanged. Booking anchors remain Acuity, not converted to Square by metadata updates.

## 13. Error / Failure Behavior

Unknown canonical host or structured-data field blocks that output. Do not publish `TBD`, localhost, private address, or robots blanket disallow into production. Confirm host response/headers so canonical content does not mask missing pages/soft 404.

## 14. Files Expected to Change

EXPECTED TO CHANGE after decisions: affected heads in `index.html`, `html/pricing.html`, `html/gallery.html`, `html/aboutus.html`, `html/contact.html`, `html/faq.html`.

POSSIBLY CHANGED: `html/booknow.html` after D4. Sitemap/robots are required target artifacts but have no current repository paths; D3 must approve actual locations/hosting delivery and amend this list before implementation.

SHOULD NOT CHANGE: website layouts, booking URLs, service copy without D2, JavaScript architecture, unapproved hosting configuration.

## 15. Dependencies

D3 blocks public domain/indexing/metadata deployment; D2 blocks local facts/schema; D4 blocks legacy route. Navigation repairs precede final crawl. No new dependencies or environment variables are required by static head markup.

## 16. Out of Scope

New locality pages, copywriting campaign, keyword stuffing, SEO service, review scraping, new redirects, deployment/account changes, unverified schema.

## 17. Acceptance Criteria

- SEO-AC-01: every in-scope head has exactly one correct approved title/description/canonical; no localhost/file/private/unresolved value.
- SEO-AC-02: approved sitemap lists only existing canonical indexable routes and robots policy matches approved environment; unresolved D3 means NOT VERIFIED, not omission disguised as completion.
- SEO-AC-03: social image URLs load and match approved image/text; markup parses without conflicting duplicate tags.
- SEO-AC-04: any structured data parses and every business field matches approved visible facts; no fabricated address, hours, price, rating or review.
- SEO-AC-05: routes, page appearance, H1/landmarks and booking anchors remain correct; legacy handling matches D4 if included.

## 18. Verification Plan

Validate source heads and parsed metadata, schema JSON syntax and fact mapping. Check all canonical/sitemap/social URLs against approved production host using read-only requests; local preview alone cannot prove deployed headers/indexability. Compare source HTML without JS to rendered page. Inspect robots response and actual missing-route status after separately authorized deployment; until access available mark production checks NOT VERIFIED. No account changes, submission to search providers, or deployment in this task.
