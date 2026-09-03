# Navigation and external booking continuity

Baseline: application commit `a57b2ca`, September 2, 2026. Specification proposal; no implementation authorized until this set is approved. Sources: [PRD](../PRD.md) and [Engineering Document](../engineering/engineering-doc.md). Their draft/awaiting-approval labels predate the owner's explicit approvals; unresolved values remain unresolved. Paths below are repository-relative. [Implementation map](implementation-map.md) records dependencies, decision gates, and full coverage.

Acuity remains the approved current booking provider; Square is deferred by the approved sources. Do not replace links, embed a new scheduler, or create booking infrastructure. Acceptance outcomes are PASS, FAIL, or NOT VERIFIED with evidence; never treat a blocked test as PASS.

Status: READY FOR SPEC REVIEW: core repairs/fallback; DEFERRED: Square migration and legacy route disposition.

## 1. Objective

Keep the shortest existing path from any page to useful information and external booking available to touch, keyboard, and script-failure users.

## 2. Source Requirements

PRD FR-01/P0 and FR-02/P0; conversion and mobile/accessibility/reliability requirements (§§8–9). Engineering §§4–7, 11–12, 16–17: reuse header, real anchors, reversible menu state, fallback navigation, repair paths, preserve Acuity.

## 3. Current State

`javascript/site-header.js` owns `<site-header>` Shadow DOM; `base-path`, `active`, `solid` determine routes/state. Desktop header is 30px contact bar plus 100px nav; <=720px is a 60px header with full-screen menu. Open state changes ARIA and body overflow; Escape/link closes. No trap/background inertness, desktop-resize reconciliation, or script-failure fallback exists. Mobile CSS removes the nav focus border. Repeated `closeMenu()`/disconnect may restore overflow even when this instance did not lock it.

Home uses `index.html`; other sources are `html/pricing.html`, `html/gallery.html`, `html/aboutus.html`, `html/contact.html`, `html/faq.html`, `html/booknow.html`. Contact/FAQ footer Home links incorrectly resolve under `html/`. Primary booking anchors already use `https://DoubleADetailing.as.me/`. Home sticky CTA is conditional and hidden while mobile nav is open. Legacy booking embeds Acuity and is not the primary CTA target.

## 4. Target State

Preserve routes, active states, current header visual design, CTA labels/placement, and Acuity destination. Make the existing overlay keyboard-safe, scrollable on short screens, and reversible. Static navigation must remain usable if enhancement cannot initialize. No booking runtime/config fetch.

## 5. Delta to Implement

1. Modify only the shared header's focus/state lifecycle and mobile overflow rules; preserve its API and breakpoint.
2. Record prior overflow/background interaction state only on closed→open. Make close idempotent; restore only state owned by this instance. On >720px resize close/unlock; remove all added listeners on disconnect and support reconnect without stale handlers.
3. On open move focus to the first menu link; cycle Tab/Shift+Tab through logo, menu links, booking, and close toggle. Prevent background interaction while open, preserving pre-existing inert values; exclude the header and noninteractive resource elements. Restore on all close paths. If focus is on a link hidden by toggle close, return it to toggle; on desktop transition use a visible header control, not hidden toggle.
4. Add a simple static, noninteractive-as-a-widget fallback nav adjacent to each header with the existing Home/Pricing/Gallery/About/Contact/FAQ/Book Now anchors. It has no second hamburger or scripts. Header enhancement hides it only after successful initialization; on failure leave fallback usable and prevent partial enhanced header obstructing it. Synchronize fallback routes via verification rather than a new generator. This concrete fallback contract is submitted for spec approval.
5. Correct Contact/FAQ footer Home links to `../index.html`. Resource path defects belong to performance-resilience. Legacy content/redirect decisions remain gated.
6. Add a keyboard skip-to-content route on six marketing pages, reusing their existing main landmark and a stable target ID. Apply focus/scroll clearance locally; do not restructure legacy booking before D4.
7. Preserve all existing booking hrefs. Square change is blocked by D4 in the map, not a current repair.
8. Add visible `:focus-visible` treatment to existing page navigation/CTA anchors and buttons where current rules remove outlines without a distinct focus indicator. Keep this scoped to focus presentation in existing page CSS, not a theme refresh. Form/disclosure/dialog-specific focus changes remain owned by their concern specs.

## 6. User Behavior / Flow

Visitor opens a page → fallback anchors available → successful shared-header enhancement takes over → menu/normal anchor → chosen page or approved Acuity destination. Optional script/analytics failure does not cancel anchor navigation.

## 7. Functional Requirements

- NAV-FR-01: all header/fallback routes resolve correctly from root and every secondary directory (FR-02).
- NAV-FR-02: menu open/close, Escape, resize, disconnect/reconnect restore owned scroll/inert state; no background keyboard escape while open (FR-02).
- NAV-FR-03: visible keyboard focus and scroll reachability cover every mobile menu action (FR-02).
- NAV-FR-04: working static navigation remains with header script blocked or initialization failed; successful enhancement exposes exactly one primary navigation to users (FR-02).
- NAV-FR-05: every Book Now variant retains approved Acuity href and same-tab native navigation; no package preselection claim or completion event (FR-01).
- NAV-FR-06: existing desktop navigation, page styling and Home sticky-CTA conditions remain unchanged except necessary focus/clearance repair (FR-01/02).

## 8. UI / Component Requirements

Reuse `SiteHeader`, `pageLinks`, `openMenu`, `closeMenu`, `disconnectedCallback`, and existing style variables. No new JS module or CTA component required. Fallback uses existing anchors and logo naming, scoped minimal fallback styles in existing page CSS. Hide fallback with `hidden` only after successful setup, not merely `:defined` or JavaScript-enabled detection. If fallback is visible, do not leave inaccessible overlapping enhanced controls.

## 9. Responsive Requirements

Use existing 720px boundary; test 720/721, 320/390 phones, 768 tablet, 1280 desktop, short landscape and 200% zoom. Mobile panel uses available viewport below header with vertical scrolling/safe-area padding. Do not clip Book Now on short screens. Preserve Home's separate 768px sticky threshold; test 720/721/768/769 interactions rather than unifying thresholds blindly.

## 10. Accessibility Requirements

Keep nav landmark, correct `aria-current`, toggle name/expanded/controls, real links and visible focus in Shadow DOM. Fallback does not expose duplicate landmarks after enhancement. Skip link focuses the existing main target and clears fixed header. Focus restoration must respect user navigation and removed invoking elements; use an existing visible header control as fallback.

## 11. SEO Requirements

Real links remain crawlable, including fallback. Correct internal hrefs; preserve all titles, canonicals (currently absent), content, and URLs. Legacy redirect/noindex is blocked, not silently added.

## 12. Integration Requirements

Current source of approved URL: PRD §§5/8 and Engineering §§5/7. Current as.me URL and legacy iframe `https://app.acuityscheduling.com/schedule.php?owner=21786409` remain exact. Square URL: not supplied; D4 blocks migration. Once approved, scope a link-only change plus explicit legacy decision; no SDK/API/payment/account integration.

## 13. Error / Failure Behavior

Blocked header script or initialization failure leaves static nav. Cross-origin booking outage cannot be reliably inspected by this site; preserve existing call/email assistance. Never auto-reroute to another provider or report success. Null/missing optional main/CTA elements must not crash other header functions.

## 14. Files Expected to Change

EXPECTED TO CHANGE: `javascript/site-header.js`, `index.html`, `html/pricing.html`, `html/gallery.html`, `html/aboutus.html`, `html/contact.html`, `html/faq.html`, `html/booknow.html` (fallback only), and their existing `css/styleindex.css`, `css/stylepricing.css`, `css/stylegallery.css`, `css/styleabout.css`, `css/stylecontact.css`, `css/stylefaq.css`, `css/stylebooknow.css` as needed for fallback/skip/focus styles.

POSSIBLY CHANGED: Home sticky-CTA inline code only if verification exposes a regression caused by the header repair.

SHOULD NOT CHANGE: booking destinations/embed, marketing copy, package values, route names, unrelated layouts, dependencies.

## 15. Dependencies

No new packages. Existing web component and page CSS. Can implement after spec approval without contact/SEO decisions. Coordinate shared file edits with FAQ/gallery/performance specs. D4 gates only migration/legacy disposition; D6 is browser certification, not core code design.

## 16. Out of Scope

Navigation redesign, global state/framework, custom booking, new CTA placements, automatic health checks, new provider, legacy redirect/removal, footer component refactor.

## 17. Acceptance Criteria

- NAV-AC-01: at all sampled routes, logo/header/fallback/footer Home anchors resolve to existing correct files; no duplicate active-page state.
- NAV-AC-02: three open/close cycles, Escape, link activation, >720px resize and disconnect restore pre-existing overflow/inert values; keyboard cannot focus background while open.
- NAV-AC-03: all menu links and Book Now remain reachable at 320px and short landscape; no horizontal scroll or fixed-element occlusion at 200% zoom.
- NAV-AC-04: blocked header request and forced initialization failure each leave usable static Home/page/booking anchors; successful initialization hides fallback.
- NAV-AC-05: all light/Shadow DOM booking anchors retain exact approved as.me destination; Square verification is NOT VERIFIED until D4 resolves.
- NAV-AC-06: skip links reach existing marketing main content; header and page navigation/CTA controls have visible keyboard focus at all test widths; current content/layout and desktop nav are preserved.

## 18. Verification Plan

Serve root over HTTP; run `git diff --check`, authored JS syntax and case-sensitive route checks. Enumerate every actual booking anchor from page DOM and header Shadow DOM; exclude commented markup. Manually exercise keyboard, resize, reconnect, preserved nonempty overflow/inert values, failed script/init, and sticky CTA at breakpoint edges. Check desktop/mobile screenshots and screen-reader state. Open approved booking landing only to verify business identity; no appointment, email, payment, account operation. Record per-criterion PASS/FAIL/NOT VERIFIED; a correct href is not proof of successful scheduling.
