# Asset, dependency and resource resilience

Baseline: application commit `a57b2ca`, September 2, 2026. Specification proposal; no implementation authorized until this set is approved. Sources: [PRD](../PRD.md) and [Engineering Document](../engineering/engineering-doc.md). Their draft/awaiting-approval labels predate the owner's explicit approvals; unresolved values remain unresolved. Paths below are repository-relative. [Implementation map](implementation-map.md) records dependencies, decision gates, and full coverage.

Acuity remains the approved current booking provider; Square is deferred by the approved sources. Do not replace links, embed a new scheduler, or create booking infrastructure. Acceptance outcomes are PASS, FAIL, or NOT VERIFIED with evidence; never treat a blocked test as PASS.

Status: READY FOR SPEC REVIEW for confirmed path/dimension/content-fallback changes; measured optimization and host policy gated by D3/D7.

## 1. Objective

Keep existing service pages readable and responsive when optional resources fail, remove confirmed broken requests, and improve active-page loading without rebuilding or deleting the media archive.

## 2. Source Requirements

PRD FR-02/P0 resource reliability; FR-04/P1 images; NFR performance/accessibility/reliability/privacy and brand (§9). Engineering §§3–4, 6–7, 10–13, 16–19: exact-case repairs, image sizing, optional scripts, measured waste reduction, host caching/security review.

## 3. Current State

Static page CSS/JS and 144 local media assets; no bundles/build. Many HTML images lack intrinsic dimensions/srcset. Gallery uses existing eager-first/lazy-rest photos; Home hero uses image/CSS. Contact/FAQ reference `../images/UPDATE - White Double A Detailing Logo.png` while tracked asset is `images/update - white double a detailing logo.png`; placeholder icon CSS is `path/to/font-awesome/css/font-awesome.min.css`. Legacy booking uses `../css/styleBooknow.css` instead of tracked lowercase, loads `../javascript/` as script and duplicate jQuery. Local slider/demo files are unreferenced. Remote AOS can leave content visually hidden; scripts/fonts/maps failures are not tested. Hosting/cache/CSP/HTTPS and Maps key restrictions are not configured in source.

## 4. Target State

Correct active local resources; existing content/anchors readable if optional fonts/icons/maps/animation fail; stable image sizing without altered layout/crops. Optimize only proven active-page waste. No new framework, bundler, image service or indiscriminate dependency removal.

## 5. Delta to Implement

Concrete core delta: correct Contact/FAQ white-logo case to existing tracked lowercase path; remove nonexistent placeholder icon stylesheet links (retain working icon sources). Add accurate width/height from actual intrinsic image metadata to visible `<img>` elements lacking them, preserving responsive CSS width/height and existing crop intent; Gallery dialog constraints remain gallery-dialog's responsibility. Keep initial visible imagery eager and existing below-fold lazy choices; add lazy only to clearly below-fold static images after viewport verification. Do not add attributes to CSS background images as if they were img elements.

For legacy booking, record stylesheet-case/directory-script/duplicate-library defects but gate edits under D4 disposition. Do not redirect or delete it.

Optional-resource delta: ensure legacy AOS-targeted content remains visible without AOS and under reduced motion; apply narrowly scoped visible fallback in existing CSS, enable animation only after successful initialization if retained. Preserve readable font fallback stacks; add missing iframe title to Home map using existing map purpose, not a new business claim.

Measured delta: inventory rendered requests before/after on identical test profile; remove only dependencies with confirmed no consumers or exact redundant loads and no regression. Freeze exact removal/variant manifest under D7 before editing media binaries or upgrading/pinning resources. No arbitrary version upgrade. Host cache/compression/CSP/HTTPS or Maps-key restrictions require D3 owner/config access and reviewed policy; record status, do not invent files/headers.

## 6. User Behavior / Flow

Visitor loads page → core text/booking links available independent of optional resources → images occupy stable space and load → user evaluates and books. Blocked font/map/animation does not hide core content.

## 7. Functional Requirements

- RES-FR-01: in-scope resource references resolve with exact tracked case; known legacy exceptions remain gated, not silently ignored (FR-02).
- RES-FR-02: image space matches measured intrinsic ratio while current responsive display/crop stays intact (FR-04/performance).
- RES-FR-03: core content and links remain visible/operable when fonts/icons/maps/AOS fail or reduced motion is enabled (reliability/accessibility).
- RES-FR-04: optimization changes follow measured active requests and approved exact manifest; preserve unreferenced archive and current stack (performance/constraints).
- RES-FR-05: host/key security/cache settings are reviewed only with actual configuration and approval; no guessed production policy (privacy/reliability).

## 8. UI / Component Requirements

Use existing page HTML, page-specific CSS, inline legacy AOS initialization and current fonts/imagery. Header belongs to navigation; Gallery status to gallery-dialog; Contact transport to contact-delivery. No shared asset loader or skeleton UI required. Plain iframe title and readable fallback text already around map suffice.

## 9. Responsive Requirements

Retain all existing breakpoints and image proportions; measure 320/390/768/1280 plus involved 600/720/850/900 boundaries. No offscreen content hidden to manufacture speed improvement. Confirm Home/Price initially visible imagery and menu/CTA clearance after dimension changes.

## 10. Accessibility Requirements

Decorative vs meaningful alt preserved, actual alt corrections owned by content-consistency. Map iframe has title; text coverage remains available without it. Reduced motion must leave visible content. Font/icon failure cannot remove action names or focus cues.

## 11. SEO Requirements

Dimensions/lazy loading do not replace alt/crawlable content. Correct broken local resources; no metadata business changes. Hosting robots/canonical policy owned by seo.

## 12. Integration Requirements

Inventory remote Google Fonts/icons, Bootstrap 4.0.0, jQuery 3.2.1 slim (legacy booking also3.5.1), Popper1.12.9, unpinned AOS, Maps, and SMTPJS. Do not remove SMTPJS independently of D1-approved safe form rollout. Do not change Acuity embed/library without D4. No analytics resource yet. CDN integrity/pinning may require exact version/hash validation after D7.

## 13. Error / Failure Behavior

With fonts/icons/map/AOS blocked, readable content/links survive. Broken image leaves meaningful alt/space; Gallery uses its own error notice. Missing-route status and cache/header failures are reported against actual host, not papered over with SPA catch-all. No false speed/uptime claim.

## 14. Files Expected to Change

EXPECTED TO CHANGE: `html/contact.html`, `html/faq.html`, `index.html`; `css/stylecontact.css`, `css/stylefaq.css` for scoped animation fallback; existing HTML image attributes where actually missing.

POSSIBLY CHANGED: `html/pricing.html`, `html/gallery.html`, `html/aboutus.html`, their existing `css/stylepricing.css`, `css/stylegallery.css`, `css/styleabout.css`, `css/styleindex.css`; `html/booknow.html`/`css/stylebooknow.css` only after D4. Actual existing image paths to be listed in approved D7 manifest before binary changes. Host settings have no verified repository path; D3 must identify it before any config edit.

SHOULD NOT CHANGE: `javascript/app.js` outside contact spec; `javascript/site-header.js` outside navigation; prices/content/routes, unused media/vendor archive, booking URLs.

## 15. Dependencies

Path/dimension work independent of D1; animation fallback must be tested against legacy CSS. Navigation/gallery/FAQ changes should settle before final comparative measurements. D7 gates specific optimization manifest; D3 gates host/security/key policies; D4 gates legacy modifications. No new package or .env requirement.

## 16. Out of Scope

Global CSS cleanup, wholesale legacy framework removal, new image pipeline/CDN, archive deletion, speculative numeric performance budget, deploy/host/account changes without approval, API-health proxy or custom404 page.

## 17. Acceptance Criteria

- RES-AC-01: corrected active logo/icon references load without path/case errors; separate legacy blocked list remains explicit.
- RES-AC-02: added dimensions match actual asset ratio; screenshots preserve image crop/proportion and no new overflow at test sizes.
- RES-AC-03: blocking fonts/icons/Maps/AOS and enabling reduced motion leaves text/booking links visible, focusable and usable.
- RES-AC-04: before/after request and rendering evidence uses same profile, with no unexplained new requests or broken consumer; no improvement claim from repository size alone.
- RES-AC-05: every binary/dependency/host change, if any, matches approved D7/D3/D4 scope; no unused archive removal or booking behavior change.

## 18. Verification Plan

Serve HTTP root; exact-case scan href/src/CSS URL against existing filenames, including referenced rather than commented code. Read actual image dimensions before attributes; inspect network and layout at agreed profile and record measured transfer/render/layout-shift results with tool/browser/version. Block one resource family at a time, then combinations; inspect legacy content and all booking anchors. Compare visual crop/layout and reduced-motion state. Host HTTPS/headers/404/cache/key restriction checks need authorized read-only access; mark NOT VERIFIED when unavailable. No Lighthouse target number or package installation is assumed.
