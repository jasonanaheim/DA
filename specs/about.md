# About

Baseline: 2026-09-02; source `html/aboutus.html`, `css/styleabout.css`, shared header.

## Purpose

Explain the company, values, experience and mobile coverage.

## User goal

Know who will care for the vehicle and whether the team serves their location.

## Business goal

Reduce uncertainty and encourage booking or a coverage-confirmation call.

## Current implementation

Photo hero with “Care you can see. Quality you can trust.” and no Our Story button. Split story image/copy (`images/kanye.png`); experience figures; three values; map and communities; booking/call CTA; navy footer. Static HTML with no page-specific script. Keyless Google Maps iframe queries Orange County, California and has a title/lazy loading.

## Required content/sections

Retain story and values (Quality First, Reliable, Convenient), the existing owner reference Robert Almaraz, 20+ years, 100% mobile service, OC focus, and professional tools/supplies positioning. These are source claims, not independent verification.

Primary coverage is Orange County; Los Angeles, San Bernardino, and San Diego counties are by-request possibilities. Preserve all 31 current cities:

Aliso Viejo; Anaheim; Brea; Buena Park; Cypress; Dana Point; Fountain Valley; Fullerton; Garden Grove; Huntington Beach; Irvine; La Habra; La Palma; Laguna Beach; Laguna Hills; Laguna Niguel; Laguna Woods; Lake Forest; Los Alamitos; Mission Viejo; Newport Beach; Orange; Placentia; Rancho Santa Margarita; San Clemente; Santa Ana; Seal Beach; Stanton; Villa Park; Westminster; Yorba Linda.

Owner previously requested a less dramatic headline; replacement is TBD. Do not silently resolve that copy decision.

## Primary CTA

Book Now in header/bottom; Call 714-478-0556 as supporting action. See [book-now.md](book-now.md) for approved current Acuity destination and deferred Square migration.

## Functional requirements

Retain readable story/coverage even if the third-party map fails. Preserve titled map, contact href, booking link, shared navigation and existing source facts. No founder biography or timeline beyond current text is authorized.

## Mobile requirements

Story, values, and service-area layouts stack at <=900px; typography/images/padding tighten at <=600px. Location list remains two columns; check long city names at narrow widths and zoom. Hero text must clear the 60px fixed header; CTA controls stack on phones.

## Accessibility requirements

Maintain main/heading hierarchy, meaningful story-image alt, decorative value icons, titled map, visible focus, readable text/contrast, and usable city lists. Verify focus and map interaction without trapping page navigation.

## SEO requirements

Existing About title, local-service description and one H1. Preserve visible coverage text; canonical domain/business facts and structured data remain TBD per [seo.md](seo.md).

## Acceptance criteria

- No Our Story button is reintroduced without approval.
- Existing owner/experience/value content and all 31 cities remain; factual changes require owner confirmation.
- No forced dependency on Maps for coverage information.
- Mobile layout, readable list, image loading, and both bottom CTAs are verified after changes.
- Headline proposal remains separate from approved copy until selected.

## Out of scope

Unapproved headline edits, expanded service area, new staff claims, new founder photos, rebranding, Maps-account changes, or booking integration changes.
