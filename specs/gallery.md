# Gallery

Baseline: 2026-09-02; source `html/gallery.html`, `css/stylegallery.css`, inline dialog script, shared header.

## Purpose

Provide visual evidence of existing vehicle work.

## User goal

Inspect photos and decide whether to book.

## Business goal

Build confidence and send visitors to booking or pricing.

## Current implementation

White background, centered Gallery H1 and description; no photo hero. CSS multi-column masonry with natural image proportions, square corners, no tile captions/overlays. Seven image buttons in DOM order: gallery2.jpg (yellow Porsche), gallery3.jpg (red Lexus), gallery1.jpg (white Rolls-Royce), gallery5.jpg (grey Lamborghini), gallery4.jpg (black Rolls-Royce), gallery6.jpg (two driveway vehicles), gallery7.jpg (shuttle fleet). Column balancing affects visual order.

Clicking a button populates a native dialog with its image, alt and data-caption and calls showModal(). Close button closes it; clicks whose target is the dialog itself also close it. Native Escape behavior applies. No carousel, filters, uploads, before/after slider, or CMS exists.

## Required content/sections

Preserve white intro, seven photos, natural image proportions, dialog caption, booking/pricing CTA, and footer. Existing captions describe services; provenance and permission/accuracy are TBD, not independently verified. First tile is eager, six are lazy-loaded; dialog image is initially empty until selected.

## Primary CTA

Book Now in shared header and bottom CTA. Secondary: View Pricing; photo enlargement is exploratory, not conversion completion. Approved external destination and deferred migration: [book-now.md](book-now.md).

## Functional requirements

Each photo opens the corresponding full image and caption. Preserve original assets and closing behavior. No change to external links or image content without approval.

## Mobile requirements

Three columns by default, two at <=850px, one centered column at <=600px. Gaps/margins reduce from 24px to 16px. Native proportions must not be replaced with fixed-height cropping. Dialog must fit the screen with a reachable close control.

## Accessibility requirements

Buttons derive accessible names from image alt text; dialog has an accessible label and named close button. Verify keyboard activation, Escape, focus containment/restoration, reading order through CSS columns, and visible focus. No compliance audit has certified these behaviors.

## SEO requirements

Existing title “Gallery | Double A Detailing,” local-service description, one H1, and image alt text. No canonical/social/schema metadata. Do not invent photo locations, dates, customers, or results.

## Acceptance criteria

- Seven current image targets and captions remain correctly paired.
- White background/no photo hero and 3/2/1 natural-ratio layout remain unless explicitly changed.
- Each image can be opened and dismissed by appropriate pointer and keyboard controls; verify focus return.
- Booking and Pricing remain reachable; no image or page overflow at tested sizes.
- Record known caption/provenance TBDs rather than treating them as verified evidence.

## Out of scope

New images, rebranding, gallery filters/carousels, image editing, backend uploads, new testimonials, and booking-system changes.
