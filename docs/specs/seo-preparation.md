# SEO preparation — domain pending

Owner approved preparing SEO now, without publishing domain-dependent URLs until the domain is connected. This note supersedes the earlier blanket D2/D3 block for this narrow slice (PRD FR-07, SEO-FR-01–04).

## Scope and decisions

- Preserve six marketing pages, their descriptions, layouts, prices, navigation and Acuity links. Standardize Contact/FAQ titles to the existing brand pattern.
- Add static social title/description/type/site-name metadata to those six HTML heads. Full social image/URL metadata remains staged in the activation document.
- Add homepage Organization JSON-LD with confirmed name, mobile detailing description, Orange County, California coverage, phone and public email. No street address, geo coordinates, ratings, price offers, unverified profiles, or fixed hours. This is descriptive markup, not a claim of Google LocalBusiness rich-result eligibility.
- Owner says current hours are good; preserve FAQ's sunup–sundown/holiday wording. Do not infer numeric times from it or propagate conflicting legacy 6am–6pm hours.
- Remove the two street-address displays from the legacy booking page, replacing them with the confirmed service area. This privacy-only exception does not decide legacy route lifecycle, indexing or provider migration.
- Prepare canonicals, full social tags, sitemap.xml and robots.txt as fenced, inactive content in `docs/specs/seo-domain-activation.md`. Do not create active root crawler files or active canonical/og:url/image references to the pending domain yet. Proposed final host is HTTPS non-www with `/` as Home; confirm actual host policy before activation.

## Expected files

Six marketing HTML heads; homepage JSON-LD; `html/booknow.html` address text only; SEO specs/map; new activation document; isolated `tests/seo.cjs` source validation. No CSS, image binaries, dependencies, analytics, deployment settings, or booking changes.

## Acceptance and verification

- PREP-01: six unique titles/descriptions; social text matches each page's metadata; each page retains one H1.
- PREP-02: homepage JSON-LD parses and contains only the approved facts above, no address or invented hours.
- PREP-03: no active canonical, og:url or pending-domain media URL; sitemap/robots drafts cover only the six real marketing routes, excluding legacy booking and duplicate index.html.
- PREP-04: body content unchanged except the two legacy privacy replacements; all booking links/embed remain byte-for-byte unchanged.
- PREP-05: run source tests, contact regression tests, `git diff --check`, and local HTTP checks. No visual redesign; do not claim a new browser audit. Live canonical/redirect/HTTPS/social-preview/Search Console verification is NOT VERIFIED until activation and authorized deployment.

## Remaining content observations

Home retains an approximate 25-mile hub radius, whereas About describes Orange County and by-request adjacent counties. Only Orange County is promoted into new structured data. Legacy booking still has obsolete phone/email/hour content and asset defects; broader repair is outside this privacy exception. No new factual claims or silent policy reconciliation.

## References

- [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google LocalBusiness requirements](https://developers.google.com/search/docs/appearance/structured-data/local-business): an address is required for that Google feature; do not fabricate one for a mobile business.
- [Schema.org Organization](https://schema.org/Organization): descriptive organization and service-area properties.

## Results

PASS: `node tests/seo.cjs` (six unique metadata sets, social parity, parsed approved JSON-LD, privacy removal and inactive domain artifacts); `node tests/contact-form.cjs`; `git diff --check`. All seven local pages return HTTP 200. Compared all seven pages' href/src values against HEAD: unchanged; all six marketing body elements are unchanged. An initial comparison included trailing whitespace after Contact's closing HTML and failed; the corrected body-element comparison passed (only trailing blank lines differed).

NOT VERIFIED: new browser visual audit, domain readiness/HTTPS/redirect policy, deployed SEO, external social previews, search indexing and Search Console. Metadata-only marketing changes do not constitute performance or accessibility certification. No commit, push, deployment, DNS change, or Search Console submission was performed.
