# Pricing

Baseline: 2026-09-02; source `html/pricing.html`, `css/stylepricing.css`, duplicated package summary in `index.html`.

## Purpose

Explain current packages, inclusions, price by vehicle and optional add-ons.

## User goal

Select a suitable service and understand the displayed cost before booking.

## Business goal

Send informed visitors to external booking; route specialty/fleet questions to Contact.

## Current implementation

Photo hero with Explore Packages anchor; four static package cards; price definition lists; inclusion lists and estimated times; condition/size disclaimer; 13 priced add-ons; specialty/fleet section; booking/call CTA and footer. No selector or price-switching script remains, although unused selector CSS does.

## Required content/sections

Existing amounts, not newly verified quotes:

| Package | Sedan/Coupe | SUV/Truck | Motorcycle | Estimated time |
| --- | --- | --- | --- | --- |
| Premium Full Detail | $209 | $249 | $120 | 60–75 min |
| Standard Full Detail | $159 | $179 | $50 | 40–60 min |
| Standard Interior | $129 | $149 | Not listed | 40–60 min |
| Wash & Wax Detail | $79 | $89 | $120 | 30–40 min |

Premium has Most Popular badge. Preserve service descriptions/inclusions as implemented; do not infer that generic interior inclusions apply to motorcycles. The source disclaimer says final pricing may vary with size/condition and adjustments are confirmed before service.

| Add-on | Price | Time |
| --- | --- | --- |
| Pet Hair Removal | $50 | 30 mins |
| Headliner Cleaning | $60 | 30 mins |
| Odor Removal (Smoke) | $80 | 30 mins |
| Seat Stain Extraction | $100 | 45 mins |
| Full Carpet Extraction | $120 | 45 mins |
| Full Carpet & Seat Extraction | $200 | 1 hr 30 mins |
| Spray Sealant (3 month) | $30 | 15 mins |
| Graphene Ceramic Spray (1 Yr) | $120 | 30 mins |
| Upgrade to Ceramic (3–5 Yrs) | $250 | 1 hr |
| Wheel Face Ceramic (4 wheels) | $160 | 15 mins |
| Glass Ceramic Coating | $100 | 30 mins |
| Engine Bay Detail | $60 | 30 mins |
| Headlight Restoration | $80 | 30 mins |

Specialty labels: Boats, Limos, RVs, Shuttle Buses, Semi-Trucks, Golf Carts. Custom quote depends on size, quantity and condition; no fixed specialty prices.

## Primary CTA

Book This Package and Book Now use the same generic external destination; no package selection is passed. Secondary: Call, Explore Packages, Request a Custom Quote to Contact. See [book-now.md](book-now.md).

## Functional requirements

Keep prices visible without selecting a vehicle. Keep Home/Pricing amounts and times consistent. Do not reintroduce motorcycle Standard Interior or infer new categories. Home starts-at labels exclude lower motorcycle rates for some packages; intended wording and motorcycle-specific inclusions are TBD.

## Mobile requirements

Two package columns become one at <=900px. At <=720px: compact hero min-height 420px, image height 165px, 30px tile gap, smaller typography and two-column feature lists. Preserve legibility at zoom rather than relying on the current small font sizes as a universal standard. Add-ons stack; all prices stay visible.

## Accessibility requirements

Preserve heading hierarchy, price label/value associations, readable feature lists, decorative icons and meaningful CTA text. Test repeated package links in context, focus, contrast, and small-screen text. Fixed header must not cover the packages anchor.

## SEO requirements

Existing Pricing title, tailored local-service description, one H1. No product/offer schema. Exact prices and qualifications must be owner-confirmed before any structured-data addition.

## Acceptance criteria

- Four package price/time rows match Home; Standard Interior has only sedan/coupe and SUV/truck.
- All 13 add-ons retain current amount/time pairs and specialty quote remains reachable.
- No dynamic selector, package-specific booking preselection, or custom checkout is implied.
- Mobile cards, prices and CTA remain readable and functional; known issues/TBDs are not represented as resolved.
- Changes to prices or business claims require explicit approval.

## Out of scope

Price changes, new packages, guarantees, dynamic quoting, external booking migration, checkout, or redesign.
