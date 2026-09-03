# Native, accessible FAQ disclosures

Baseline: application commit `a57b2ca`, September 2, 2026. Specification proposal; no implementation authorized until this set is approved. Sources: [PRD](../PRD.md) and [Engineering Document](../engineering/engineering-doc.md). Their draft/awaiting-approval labels predate the owner's explicit approvals; unresolved values remain unresolved. Paths below are repository-relative. [Implementation map](implementation-map.md) records dependencies, decision gates, and full coverage.

Acuity remains the approved current booking provider; Square is deferred by the approved sources. Do not replace links, embed a new scheduler, or create booking infrastructure. Acceptance outcomes are PASS, FAIL, or NOT VERIFIED with evidence; never treat a blocked test as PASS.

Status: READY FOR SPEC REVIEW; answer/copy reconciliation remains separately gated.

## 1. Objective

Allow customers to resolve existing service questions using touch, keyboard, and assistive technology without changing answers or page presentation.

## 2. Source Requirements

PRD FR-05/P1 and accessibility/mobile §§8–9. Engineering §§4–6, 11, 16: native details/summary, independent open state and preserved copy.

## 3. Current State

`index.html` has five `.accordion` items; `html/faq.html` has twenty. Hidden `.accordion__input` checkboxes drive `.accordion__content` visibility and `.accordion__label` arrows in `css/styleindex.css` and `css/stylefaq.css`. Inputs use `display:none`; labels are not keyboard buttons. Multiple answers may remain open. FAQ uses legacy AOS; second category label is a div rather than a heading.

## 4. Target State

Native disclosure semantics with unchanged questions/answers/order, independent multiple-open behavior, existing backgrounds/type/spacing and no new dependency.

## 5. Delta to Implement

Replace each checkbox/label wrapper with a `details` item and first-child `summary` using existing accordion/label/content classes. Preserve existing item IDs on the disclosure where meaningful; remove checkbox/for wiring. Replace checked sibling selectors with `details[open]` selectors and remove unconditional content `display:none` overriding native open state. Rotate existing arrow only for open; suppress duplicate native marker if retaining arrow. Add visible summary focus. Promote the existing Detail FAQ category text to same heading level as General FAQ without rewriting text.

## 6. User Behavior / Flow

Visitor tabs to question → Enter/Space toggles answer → Tab proceeds through any answer links → another answer can open independently → Book Now remains available.

## 7. Functional Requirements

- FAQ-FR-01: all 25 original question/answer pairs and their order survive conversion (FR-05).
- FAQ-FR-02: each native summary toggles only its own answer with keyboard/touch, independently (FR-05).
- FAQ-FR-03: state and focus are perceivable; disclosure works without JavaScript (FR-05).
- FAQ-FR-04: preserve internal links and booking navigation (FR-02 preservation).

## 8. UI / Component Requirements

Reuse existing `.accordion`, `.accordion__label`, `.accordion__content` styling; native `details` state replaces checkbox state, not JS accordion. No forced single-open grouping, animation library or persistent state. Native semantics need no redundant manually synchronized aria-expanded.

## 9. Responsive Requirements

Retain existing Home/FAQ breakpoints. Summary text wraps and arrow does not cover it at 320/390px; no fixed answer height/truncation; expanded links remain visible at 200% zoom and 768/1280 widths.

## 10. Accessibility Requirements

Logical category headings, keyboard-operable native summaries, visible focus, native expanded/collapsed announcement, decorative arrows hidden from assistive semantics, reduced-motion handling inherited/retained. No hidden active links in closed answers.

## 11. SEO Requirements

Keep all answer text in HTML; preserve current metadata and existing identifiers/links. Do not add FAQ structured data or rewrite claims/policies here.

## 12. Integration Requirements

No FAQ provider or new integration. Existing booking remains Acuity. AOS/CDN content-failure handling belongs to performance-resilience; native disclosure itself must not require AOS.

## 13. Error / Failure Behavior

With JavaScript disabled each summary still opens. If CSS fails, native details remains readable/operable; no custom fallback API. Content policy contradictions are documented in content-consistency, not silently corrected.

## 14. Files Expected to Change

EXPECTED TO CHANGE: `index.html`, `html/faq.html`, `css/styleindex.css`, `css/stylefaq.css`.

POSSIBLY CHANGED: none outside these files.

SHOULD NOT CHANGE: existing FAQ wording, service claims, booking links, other page layouts, `javascript/site-header.js`, dependencies.

## 15. Dependencies

Native browser details support; existing CSS only. Independent of contact/provider decisions. Coordinate shared Home/FAQ files with navigation and performance. Content changes require content-consistency gate.

## 16. Out of Scope

New questions, search/filter controls, exclusive accordion behavior, answer rewrites, FAQ schema, new animation or state library.

## 17. Acceptance Criteria

- FAQ-AC-01: DOM/text comparison confirms original five Home and twenty FAQ question/answer pairs, order and hrefs.
- FAQ-AC-02: Enter/Space/touch toggles correct answer; two answers remain open together.
- FAQ-AC-03: screen reader announces disclosure state, summary has visible focus, closed answers contain no tabbable exposed controls.
- FAQ-AC-04: with JavaScript disabled all disclosures work; desktop/mobile style comparison shows no unintended redesign, overlap or clipping.
- FAQ-AC-05: both FAQ category labels participate in heading outline at the same level; no new product copy.

## 18. Verification Plan

HTTP preview; inspect all details/summary pairs and count/text/href snapshots. Keyboard traverse all 25; test answer links and multiple-open state. Disable JS, inspect 320/390/768/1280 and zoom/reduced motion; compare closed/open screenshots against baseline. Run available HTML/a11y checks without installing tooling automatically. Repeat navigation→FAQ→Book Now smoke with no scheduling.
