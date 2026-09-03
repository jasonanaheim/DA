# Repository Guidelines

## Project Structure & Module Organization

This repository contains the static Double A Detailing website. `index.html` is the homepage; secondary pages live in `html/` (for example, `html/pricing.html`). Page-specific styles are in `css/style<page>.css`, while `css/lightslider.css` supports the image slider. Browser scripts live in `javascript/`; `site-header.js` defines the shared `<site-header>` web component. Store production images, icons, and videos in `images/`. `BRAND_GUIDE.md` documents the visual direction. Treat `output/` as generated local artifacts, not site source.

## Build, Test, and Development Commands

The site has no package manager or compilation step. Serve it from the repository root so relative asset paths behave like production:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. Use `git status --short` before committing to catch generated files such as screenshots or `.DS_Store`. `README.md` describes Netlify synchronization; production settings and deployment automation are not defined in this repository and must be confirmed before deployment work.

## Coding Style & Naming Conventions

Use two-space indentation in HTML, CSS, and JavaScript. Prefer semantic HTML, descriptive `alt` text, and kebab-case CSS classes such as `.gallery-item` or `.footer-bottom`. Follow the existing BEM-like `block__element` and `block--modifier` patterns where useful. Keep page-specific rules in the matching stylesheet and reusable navigation behavior in `site-header.js`. Use `const`/`let`, single quotes in JavaScript, and trailing commas in multiline arrays or objects. Preserve filenames referenced by markup; several asset names contain spaces and are case-sensitive on deployment.

## Testing Guidelines

There is currently no automated test suite or coverage threshold. Manually verify every changed page in a local server at desktop and mobile widths. Check navigation, the mobile menu, booking/contact links, forms, gallery or slider interactions, keyboard focus, and browser-console errors. Confirm that all images and scripts load without 404 responses.

## Commit & Pull Request Guidelines

Recent history uses concise, imperative, sentence-case subjects, such as `Redesign pricing page and mobile layout` and `Add reusable responsive site header`. Keep each commit focused on one user-visible change. Pull requests should summarize the change, list pages and viewport sizes tested, and link any relevant issue. Include before/after screenshots for layout or styling work, and call out new or unusually large media assets.

## Product Purpose and Boundaries

- This is a marketing website for Double A Detailing, a mobile car wash and auto detailing business. Its primary goal is to convert visitors into bookings, not to manage appointments.
- Book Now is the primary CTA. Calls, pricing, gallery exploration, FAQ answers, and inquiries support that journey; do not let them inadvertently replace the booking path.
- Acuity is the owner-approved external booking provider for now (confirmed September 2, 2026). Square is a future migration only, once the owner confirms it is ready. Do not build a custom calendar, availability engine, booking form, checkout, account system, or payment flow.
- **Approved current implementation:** current CTAs link to `https://DoubleADetailing.as.me/`; `html/booknow.html` embeds Acuity. No Square URL/configuration is present. See `specs/book-now.md`. Do not invent a Square link, relabel Acuity as Square, migrate providers, or change/remove the legacy embed without explicit approval and a confirmed destination.
- Never invent prices, service coverage, contact details, reviews, credentials, hours, policies, guarantees, or photo provenance. Record uncertainty as TBD and ask the owner when it affects implementation.

## Lightweight Spec-Driven Workflow

1. Read `specs/README.md`, `specs/site.md`, and affected page specs before changes. Read `BRAND_GUIDE.md` for visual work.
2. Inspect the current code and working tree. Specs describe a dated baseline, not a replacement for checking source.
3. For requested changes, first capture purpose, scope, affected files, acceptance checks, and exclusions in the affected spec (or a short linked change note). Separate proposed changes from current behavior. Resolve material TBDs with the owner.
4. Implement only the approved request. The audit backlog and acceptance criteria do not authorize unrelated fixes. Documentation-only tasks must not alter application code, copy, integrations, or dependencies.
5. Verify the affected flow, report failures and limitations honestly, and update the spec to reflect the completed change. Do not mark tests passed without running them.
6. Commit/push/deploy only when requested. Keep unrelated local files and existing user changes out of commits. No new tooling or workflow platform is required.

## Brand, Components, and Scope

- Preserve the existing Double A logo, blue/navy/cyan palette, typography, photography, and page-specific approved layouts unless an approved spec explicitly changes them. Keep copy practical and friendly; do not add dramatic claims.
- Reuse `<site-header>` and its `base-path`, `active`, and `solid` attributes. Do not reimplement navigation per page. Test all pages after shared-header edits.
- Footers, CTA styles, and pricing data are currently duplicated, not shared components or a CMS. Reuse existing patterns; any consolidation needs its own approved scope.
- Prefer plain semantic HTML, CSS, and small vanilla JavaScript. Do not introduce a framework, package manager, plugin, backend, or dependency for convenience alone.
- Respect source filename case and relative paths. Local macOS resolution can hide broken asset references on case-sensitive hosting.

## Mobile, Accessibility, and Performance

- Design and verify mobile-first, including narrow screens, touch input, readable text, natural photo proportions, and no horizontal page scrolling. Preserve desktop usability and test breakpoint boundaries; do not solve overflow by merely hiding content.
- Ensure Book Now remains discoverable and operable. Fixed headers, mobile menus, and sticky CTAs must not cover focused controls, content, or one another.
- Use semantic headings/landmarks, meaningful link text, explicit form labels, accurate alt text, keyboard-operable controls, visible focus, appropriate expanded/error state, and reduced-motion support. Use WCAG 2.2 AA as the future acceptance target, not a claim of existing compliance.
- Verify dialog focus/close behavior and mobile-menu keyboard behavior. Existing checkbox accordions hide their inputs and are a known accessibility gap, not a pattern to copy.
- Protect load speed: reuse appropriately sized media, avoid unnecessary third-party scripts, reserve image space where practical, and lazy-load appropriate below-fold media. Do not lazy-load the primary visible image blindly. Measure affected-page performance before/after larger changes; numeric budgets are TBD.

## Security and Verification Guardrails

- Do not copy secrets into specs, logs, examples, or client code. The former SMTP credential was removed from `javascript/app.js` during the owner-approved Netlify Forms migration; it may remain in Git history and the old deployment. Owner-side revocation is still required. Do not test old credentials or send real inquiries without explicit authorization. See `docs/specs/netlify-contact-rollout.md`; run `node tests/contact-form.cjs` for isolated local form tests.
- Preserve the existing external booking links during documentation work. Never create test appointments, submit payments, send email, or modify external account settings as an incidental test.
- For implementation work, serve from the root over HTTP, run `git diff --check`, validate local links/assets with case sensitivity, and check the console. Suggested viewport matrix: 320/390px phones, 768px tablet, 1280px desktop, plus affected breakpoint edges and 200% text zoom.
- Verify navigation, external booking hrefs, phone/email links, gallery dialog, FAQ keyboard access, and affected form states. For form changes, use approved mocks/test destinations; do not clear data or claim successful delivery before confirmed success.
- Record existing failures separately from regressions. Security, accessibility, SEO, analytics, and conversion findings in `specs/README.md` are pending approval, not a license to fix everything.
