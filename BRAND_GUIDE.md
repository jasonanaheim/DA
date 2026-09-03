# Double A Detailing — Brand and UI Style Guide

Maintained reference, updated September 2, 2026. Follow this guide for new work; do not automatically restyle unaffected pages. Current visual references are About and Gallery. Contact/FAQ now share their matching foundation in `css/support-pages.css`; other page styles remain independent.

## Brand Summary
- **Brand**: Double A Detailing
- **Positioning**: Mobile car wash & auto detailing with a quality‑first, convenient service promise.
- **Voice**: Confident, service‑oriented, practical, and friendly.

## Logo
Primary logo assets are in `images/`.
- **Primary (full color)**: `images/update - double a detailing logo.png`
- **Dark mark**: `images/update - double a dark logo.png`
- **White mark** (for dark backgrounds): `images/update - white double a detailing logo.png`
- **Compact**: `images/small double a logo.png`

**Usage**
- Use the **full color** logo on light backgrounds.
- Use the **white** logo on dark/photographic backgrounds.
- Maintain clear space around the logo (at least the height of the “A” in the mark).
- Don’t add drop shadows, outlines, or recolor the logo outside the palette below.
- Footer logo: use `width: 220px; max-width: 100%; height: auto`. The current white asset is 1600×500 (3.2:1). Never combine a fixed height with an independently stretching width.

## Color Palette
Extracted from the live site styles.

**Primary**
- **Brand Blue**: `#25A3ED`
- **Deep Blue**: `#0D537C`

**Secondary / Accent**
- **CTA Blue**: `#2260FF`
- **CTA Cyan**: `#00B6F0`
- **Alert / Emphasis Red**: `#DB2B39`
- **Gold Accent**: `#FFB34B`

**Neutrals**
- **Charcoal**: `#3D4246`
- **Mid Gray**: `#999999`
- **Light Gray**: `#F5F5F5`
- **White**: `#FFFFFF`
- **Black**: `#000000`

**Gradients**
- **Primary CTA Gradient**: `linear-gradient(135deg, #2260FF, #00B6F0)`

## Typography
Primary fonts pulled from the site.

**Preferred Stack**
- Headings: `Montserrat` or `Nunito Sans`
- Body: `Open Sans`
- UI / Small labels: `Nunito Sans`

**Fallbacks**
- `Helvetica, sans-serif`

## UI Style
- **Layout**: clean, spacious, service‑first, with strong hero sections and clear CTAs.
- **Buttons**: bold, filled CTAs; blue gradient for primary actions.
- **Cards**: pricing cards with clear hierarchy and high contrast.
- **Icons**: simple flat icons; automotive and service themed.

## Imagery & Photography
- **Subjects**: clean vehicles, wash process, service detail shots, and team photos.
- **Tone**: bright, crisp, and professional; high clarity with vibrant highlights.

## Usage Examples
- **Primary CTA**: “Book Now” in gradient blue.
- **Secondary CTA**: white or light gray background with blue text.
- **Section Titles**: bold, title‑case with Montserrat/Nunito Sans.

## File Pointers (Source of Truth)
- Homepage: `index.html`
- CSS: `css/styleindex.css`, `css/stylepricing.css`, `css/styleabout.css`
- Images: `images/`

## Shared Page Patterns

### Header and navigation

- Reuse `<site-header base-path="../" active="contact" solid>` (or `active="faq"`) on secondary pages. Never recreate its internal navigation in page markup.
- Header source: `javascript/site-header.js`. White full-color-logo navigation, desktop contact strip, existing blue booking button; mobile menu breakpoint 720px.
- Allow 130px desktop / 60px mobile header clearance. Contact/FAQ introduction padding is 200px top / 66px bottom desktop, 108px / 42px mobile, including header clearance.
- Keep the adjacent static `.site-nav-fallback` for enhancement failure, the Skip to content link and a focusable `#main-content` target.
- Mobile menu links/booking button form one horizontally centered group slightly above the panel midpoint. Keep short-screen scrolling; use responsive bottom padding rather than negative positioning that can clip links.

### Typography and surfaces

For Contact/FAQ and future matching support pages, use Nunito Sans 800–900 for headings and Open Sans 400–700 for body/actions. Do not add another font. Reference tokens are defined once for these pages in `css/support-pages.css`.

| Role | Value / rule |
| --- | --- |
| Main text | `--ink: #30383f` |
| Secondary text | `--muted: #68727c` |
| Dark title / hero | `--navy: #011c39` |
| Link / focus | `--deep: #0d537c` |
| Supporting surface | `--mist: #f3f7fa` |
| Divider | `--border: #dce6ec` |
| Main shell | `min(1160px, 92vw)`, centered |
| Reading column | FAQ `min(860px, 92vw)` |
| Page title | 900 weight, fluid 2.75–4.5rem, 1.05 line height |
| Section title | 900 weight, 2rem desktop / 1.75rem phone |
| Body | 1rem, 1.65 line height; form controls never below 1rem |

Use white content areas and restrained dividers, not a card for every section. The compact photographic introduction reuses `images/img-2.jpg` with a navy overlay for readable white text. Gallery intentionally retains its existing white introduction; consistency does not require identical hero layouts everywhere.

### Actions and form fields

- Primary: existing blue-to-cyan gradient, white text, 999px pill radius, 50px minimum height. Book Now remains primary and external.
- Secondary on dark surfaces: white outline. Text links in body copy are underlined with a 4px offset.
- Inputs: visible associated labels, 50px minimum height, 1rem text, 10px radius, 1px #b4c5d0 border. Textareas resize vertically.
- Contact is a two-column form/info layout above 900px and stacked below. Name/email stack below 600px.
- Status feedback stays in normal document flow and wraps; disabled submission has a visible pending state. Preserve Netlify field names and transport behavior.

### FAQ disclosures

Home and FAQ now load `css/faq-disclosures.css` as their shared visual source. Edit this file for row typography, borders, chevrons, focus and open/closed styling. Keep page section widths/headings in `styleindex.css` / `stylefaq.css`; do not duplicate the disclosure rules there. Home intentionally remains a five-question preview, with its existing answers and View Full FAQ link.

- Use native `details > summary + .accordion__content`, not hidden checkboxes or click-only divs.
- Questions use Nunito Sans 800; full row is clickable with generous vertical padding and a right-aligned chevron. Chevron rotates when open.
- Closed answers must be hidden; open answers have natural height with no clipping. Multiple answers may remain open.
- Enter and Space toggle the focused question. Keep visible focus, original answers and ordinary anchor links. No JavaScript or animation library is required.

### Footer

Use the newer navy footer pattern, not the old social-icon/hour columns:

1. White logo and existing Orange County description.
2. Contact phone and email links.
3. Explore page links and the existing external booking link.

Contact/FAQ use `.site-footer > .shell.footer-grid` and `.footer-bottom` in `css/support-pages.css`. Footer background #071b2f, 58px top padding, 220px logo, 50px desktop column gap. Layout: three columns desktop; brand row plus two columns below 900px; one column below 600px. Copyright is separated by a subtle top border. Do not add placeholder social links, unconfirmed hours or a street address.

Footer HTML remains static on both routes, so it works without JavaScript. Update both copies together; the visual CSS is shared. About/Gallery retain their existing independent versions; no claim of site-wide footer component centralization.

### Responsive, accessibility and motion checks

- Verify 320/390/768/1280px and both sides of 600/720/900px when those rules change.
- No horizontal overflow, cropped answers or hidden focused controls. Do not fix overflow by hiding the page edges.
- Visible 3px focus outline with a white separation ring; FAQ uses an inset outline. Native controls retain their semantics.
- Motion is limited to existing menu behavior, button hover lift and the disclosure indicator. Disable transitions and smooth scrolling for reduced motion; never hide content awaiting animation.
- Recheck all 20 FAQ open/close actions and run `node tests/contact-form.cjs` after changes.
- Do not import Bootstrap, jQuery, AOS or icon kits into Contact/FAQ. Their current implementation does not need them.
