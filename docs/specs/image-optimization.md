# Approved image optimization

Scope: owner approved optimizing existing photos, preserving originals and design. Implements the measured image slice of RES-FR-02/04; no booking, copy, analytics, host, or dependency changes.

## Manifest and approach

Create WebP derivatives in `images/optimized/` from these existing originals:

| Source | Output stem | Small / large widths |
| --- | --- | --- |
| images/anaheim hero 4.png | home-hero | 960 / 1536 |
| images/anaheim wash hero.png | pricing-hero | 960 / 1536 |
| images/about-hero-cars.jpg | about-hero | 960 / 1920 |
| images/img-2.jpg | wash-detail | 960 / 1600 |
| images/img-3.jpg | full-detail | 800 / 1200 |
| images/kanye.png | about-story | 800 / 1290 |

Use quality 82 WebP, auto-orient, preserve full aspect ratio and no enlargement; strip source metadata from derivatives. Existing source files remain untouched. Bundled Sharp is a one-time asset tool, not a project dependency or runtime requirement.

CSS backgrounds retain existing crops/overlays; switch small/large sources at each page's existing mobile breakpoint (Home/Pricing/support 720px, About 600px). Hero backgrounds remain eager, not lazy. About story uses picture/srcset with original fallback and accurate dimensions. Native lazy loading applies only to Home gallery/review/footer photos and About story/footer; no gallery-dialog source changes, no blanket lazy-loading of hero/header.

Expected changes: four existing CSS files, five marketing HTML files for cache keys and affected image markup, derivative assets and this execution note. No new CSS architecture, libraries, image service or original deletion. Gallery page itself is unchanged.

## Verification

Check all outputs' dimensions and bytes; compare original hashes; verify CSS source selection and crops in mobile/desktop local browser; compare new images visually; verify referenced local assets return 200; run existing SEO/contact tests and diff checks. File savings are not Lighthouse/real-user speed measurements. No commit/push/deploy until requested.

## Results

| Asset | Original bytes | Small WebP bytes | Large WebP bytes |
| --- | ---: | ---: | ---: |
| Home hero | 2,481,773 | 83,828 | 175,196 |
| Pricing hero | 2,516,580 | 78,822 | 172,328 |
| About hero | 4,921,229 | 172,640 | 593,386 |
| Shared wash photo | 2,398,432 | 111,620 | 255,138 |
| Shared full-detail photo | 2,098,087 | 75,238 | 141,660 |
| About story | 1,637,810 | 42,012 | 74,162 |

PASS: all 12 output dimensions checked, all 12 local HTTP responses 200, all six original files byte-identical to HEAD, SEO/contact tests and diff checks. Initial binary comparison exceeded the Node output buffer; rerunning with a sufficient buffer passed. Browser computed-style checks at 390px and 1280px selected the expected small/large background on Home, Pricing, About, Contact and FAQ. About hero visually inspected in both viewports, plus full desktop derivative image. Temporary viewport override reset. Photo identity, overlays and focal positions retained; no page redesign.

NOT VERIFIED: throttled Lighthouse/Core Web Vitals, live deployment behavior, exhaustive high-DPR/ultrawide visual checks, or actual initial-page transfer totals. Totals in this table describe individual file sizes, not guaranteed load-time improvement. Original About source remains in the repository but is no longer the active hero URL. No commit, push or deployment performed.
