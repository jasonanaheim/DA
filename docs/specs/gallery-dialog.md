# Gallery dialog focus and failure handling

Baseline: application commit `a57b2ca`, September 2, 2026. Specification proposal; no implementation authorized until this set is approved. Sources: [PRD](../PRD.md) and [Engineering Document](../engineering/engineering-doc.md). Their draft/awaiting-approval labels predate the owner's explicit approvals; unresolved values remain unresolved. Paths below are repository-relative. [Implementation map](implementation-map.md) records dependencies, decision gates, and full coverage.

Acuity remains the approved current booking provider; Square is deferred by the approved sources. Do not replace links, embed a new scheduler, or create booking infrastructure. Acceptance outcomes are PASS, FAIL, or NOT VERIFIED with evidence; never treat a blocked test as PASS.

Status: READY FOR SPEC REVIEW; no new gallery features.

## 1. Objective

Preserve the existing work showcase while making image enlargement reliable and escapable when loading fails.

## 2. Source Requirements

PRD FR-04/P1; mobile/accessibility/reliability §9. Engineering §§4–6, 11–12, 16: retain native dialog, strengthen focus and image-failure behavior.

## 3. Current State

`html/gallery.html` contains seven `.gallery-item` buttons and one `.lightbox` dialog. Inline script copies data-image/caption and thumbnail alt then calls `showModal()`. Close button/backdrop click/native Escape exist; focus return relies on native behavior. Dialog img starts with empty src; no failed-image state. CSS preserves white three-column natural-ratio grid, two <=850px and one <=600px; dialog image can be up to 82vh.

## 4. Target State

Same seven photos/order/captions, native dialog and existing CTA; explicit accessible loading/error handling and predictable focus restoration without stale image events.

## 5. Delta to Implement

Keep inline page script. Store invoker for each open, clear previous image/error state, register current image load/error handlers before setting src, avoid empty initial src request. Guard against stale events after reopening another photo using current source/open request identity. Expose a page-local pending/error status within existing figure, not a new page. On successful load show corresponding image; on failure show short factual unavailable notice without substituted image. Close/Escape/backdrop cleanup ends pending state and restores connected invoking button. Verify native behavior first; add only missing focus handling. Keep close reachable when failed image collapses its box; constrain dialog/figure overflow if needed.

## 6. User Behavior / Flow

Activate thumbnail → dialog opens with corresponding caption and loading state → image or unavailable notice → close/Escape/backdrop → focus returns to that thumbnail → optional View Pricing/Book Now.

## 7. Functional Requirements

- GAL-FR-01: each button displays its own image, alt and caption, never stale prior content (FR-04).
- GAL-FR-02: failed image displays an accessible unavailable status and leaves close functional (FR-04/reliability).
- GAL-FR-03: all close paths restore focus to connected invoking button; keyboard remains in native dialog while open (FR-04).
- GAL-FR-04: preserve image count/order, natural ratio columns and booking hrefs (FR-04/FR-01 preservation).

## 8. UI / Component Requirements

Reuse `.lightbox`, figure/img/figcaption, `.lightbox__close`, native `showModal/close`. Use a local status element with `role=status`/polite announcement and non-marketing factual state text; no alert claiming a business result. Existing buttons remain buttons. No global state, carousel, filter, deep-linking or alternate gallery component.

## 9. Responsive Requirements

Keep existing 850/600px layout boundaries; at 320/390px and short landscape dialog close/caption/error remain reachable without page horizontal scrolling. Preserve square-free natural photo ratios and current desktop grid. Test 600/601/850/851 and 200% zoom.

## 10. Accessibility Requirements

Visible focus for image buttons, close and existing CTA controls; meaningful unchanged image alternatives unless actual image inspection proves incorrect (content-consistency owns corrections). Native modal Tab behavior and Escape verified in supported browsers. On disconnected invoker, focus a connected gallery control/heading rather than body loss.

## 11. SEO Requirements

Preserve title, description, H1 and photos in original HTML; no schema or new gallery URL. Dimension/asset optimization is handled by performance-resilience.

## 12. Integration Requirements

Only local images and existing booking/pricing anchors; no image service or new package. Acuity remains current provider.

## 13. Error / Failure Behavior

Block an individual image, reopen rapidly with another image, close while pending, and block optional fonts. No stale failure may overwrite newer successful image. Missing optional dialog node must not crash unrelated navigation; grid content stays visible. Native dialog compatibility outside agreed browser set is NOT VERIFIED, not solved with automatic polyfill.

## 14. Files Expected to Change

EXPECTED TO CHANGE: `html/gallery.html`, `css/stylegallery.css`.

POSSIBLY CHANGED: none; image dimension improvements are separately owned by performance-resilience.

SHOULD NOT CHANGE: image binaries/order/captions, other page layouts, booking destination, shared header, dependencies.

## 15. Dependencies

Existing native dialog and local scripts only. Coordinate Gallery edits with navigation, measurement (later) and performance. Browser certification uses D6; do not install polyfills before support decision.

## 16. Out of Scope

Gallery redesign, generated photos, next/previous navigation, uploads, caption rewrites, filters, new modal library.

## 17. Acceptance Criteria

- GAL-AC-01: each of seven buttons opens matching image/alt/caption and clears previous status.
- GAL-AC-02: blocked image shows unavailable state, not previous image; close/Escape/backdrop still work and restore invoker focus.
- GAL-AC-03: rapid open/close/open does not let late events alter active image status.
- GAL-AC-04: keyboard remains in dialog, visible close/focus works at mobile/desktop/zoom/short heights; existing photo layout and CTAs remain intact.

## 18. Verification Plan

Use HTTP local page and browser request blocking for one data-image target; no real external mutation. Test all seven photos by keyboard/touch, each close path, rapid changes, cached load and blocked load. Compare grid screenshots before/after at breakpoints and test zoom. Inspect console for uncaught errors and new empty-src requests; validate markup and inline JS syntax. Record browser version and per-AC results; no automatic full-browser claim.
