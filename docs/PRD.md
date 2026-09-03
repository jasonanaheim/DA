# Double A Detailing — Product Requirements Document

Status: Draft for product-owner review.  
Baseline: repository commit `a57b2ca`, inspected September 2, 2026.  
Purpose: canonical product context for this existing marketing website.

**Booking decision:** The owner explicitly approved keeping Acuity until Square is ready. This PRD therefore distinguishes approved current Acuity use from the future Square destination described in the brief. No migration is authorized; the exact Square URL and readiness remain TBD.

**Reading this document:** “Current” means observed in repository source, not independently verified business operations or production behavior. Requirements describe desired outcomes, not completed tests or authorization to implement. Recommended metrics and priorities require owner review. Unknown facts are TBD. [AGENTS.md](../AGENTS.md) governs project work; [page specs](../specs/README.md) provide supporting detail. This revision changes only this document.

## 1. Problem

Potential customers need their vehicles cleaned and cared for without the inconvenience of visiting a detail shop. Before committing, they need to know whether the business serves their location, which service fits their vehicle, what it costs, and whether they can trust the result.

The website must reduce this uncertainty and give ready visitors a clear path to becoming customers. It supports evaluation and external booking; it does not manage appointments.

These customer problems are inferred from existing service, pricing, coverage, review, and FAQ content—not from customer research.

## 2. Customer

Existing content supports the following segments. Their relative commercial importance is TBD.

| Customer intent / evidence | What they need | Why mobile service matters | Possible barrier — hypothesis |
| --- | --- | --- | --- |
| Local vehicle owners at home or work; Home/About explicitly address both | Convenient cleaning where their vehicle is located | Avoid a separate trip to a shop | Unclear coverage or access requirements |
| Owners seeking upkeep; Standard Full Detail, Wash & Wax, maintenance FAQs, repeat-customer testimonial | Understand an appropriate maintenance service | Convenient recurring care | Package differences, cost, or frequency uncertainty |
| Owners seeking deeper cleaning; Premium, Interior, stain/odor/pet-hair add-ons | Match treatment to the vehicle's condition | More involved care without a shop visit | Uncertain outcomes or additional charges |
| Specialty/fleet customers; Pricing names boats, limos, RVs, shuttle buses, semi-trucks, golf carts | Confirm suitability and request a quote | On-location service for different vehicle needs | No standard published price or clear eligibility |

Sedan/coupe, SUV/truck, and motorcycle pricing establishes advertised vehicle categories, not customer demographics. No audience size, income, age, acquisition profile, or validated persona is available.

**Qualified visitor:** proposed working definition—a visitor whose location, vehicle, service needs, and expectations fit the business. Exact qualification rules need owner approval.

## 3. Value Proposition

**Primary:** Mobile car wash and auto detailing at the customer's home or business, combining convenience with vehicle care.

Existing supporting claims and proof:

- Home advertises a 100% hand wash and Orange County service.
- Site content says the team brings tools, water, power, and products.
- Packages cover different service depths, with add-ons and specialty quotes.
- About introduces Robert Almaraz and states more than 20 years of experience.
- About emphasizes quality, reliability, convenience, and fair pricing.
- Home displays three attributed testimonials with five-star presentations and a Yelp link.
- Gallery presents seven work photographs.

These are existing site representations, not independently verified facts. Testimonial permissions/provenance, photograph permissions, and current accuracy of business claims are TBD. Do not infer an aggregate rating, guarantee, certification, insurance status, or market superiority.

## 4. Goals & Metrics

### Goals

| Priority | Goal | Desired outcome |
| --- | --- | --- |
| P0 | Turn qualified visitors into customers through external booking | Visitors reach the approved provider and complete a suitable appointment booking there |
| P1 | Explain service and cost | Visitors can determine package, vehicle, and coverage suitability |
| P1 | Establish trust | Work examples, owner information, and approved proof support an informed decision |
| P1 | Resolve objections and enable contact | Customers can find practical answers or reach the business |
| P1 | Support mobile customers | Evaluation and booking navigation remain usable on phones |

P0 denotes the primary outcome or a critical journey/safety requirement; P1 supports conversion; P2 is secondary optimization. Priorities in this draft are proposed product priorities, not a release plan.

### Currently measured

**None confirmed in the repository.** No analytics SDK, tag manager, custom conversion events, or booking-completion reporting integration was found. External hosting/search/provider reports may exist; account state is TBD. Font, map, and CDN requests are not conversion measurement.

### Recommended North Star — owner approval required

**Confirmed qualified bookings attributable to the website per agreed reporting period.**

Count unique provider-confirmed appointment bookings attributable to the website that satisfy an owner-approved qualification definition. Attribution, reporting period, duplicate/reschedule treatment, cancellation handling, and provider reporting feasibility are TBD. This measures bookings—not fulfilled services or revenue. Baseline and target: **TBD**.

If completion attribution is unavailable, report outbound booking engagement as a clearly labeled leading indicator, not as completed bookings.

### Recommended supporting metrics — not implemented

| Metric | Definition / interpretation | Baseline / target |
| --- | --- | --- |
| Booking CTA click-through rate | Sessions with at least one booking CTA click / eligible website sessions; session and eligibility rules TBD | TBD / TBD |
| External booking clicks | Clicks to approved Acuity destination now; Square only after approved migration | TBD / TBD |
| Booking engagement by page and device | Booking-click rate segmented by entry/CTA page and mobile/desktop, with denominators defined | TBD / TBD |
| Contact engagement | Phone/email link activations, separately from form attempts and confirmed delivered inquiries | TBD / TBD |
| Gallery engagement | Image-open interactions; supporting interest, not a customer conversion | TBD / TBD |
| Organic/local-search acquisition | Search-derived visits and associated booking engagement; source and local-intent classification TBD | TBD / TBD |

Analytics choice, consent/privacy requirements, attribution rules, reporting ownership, and cadence need approval. Do not include customer inquiry content in analytics.

## 5. User Journeys

**Primary:** Arrive on any relevant page → understand mobile service → evaluate work/trust → review package, coverage, or FAQs → select Book Now → schedule externally.

- Approved current destination: Acuity through `https://DoubleADetailing.as.me/`.
- Future destination: Square, only after readiness confirmation and explicit approval.
- Current package CTAs use the same generic URL; no package selection is passed.
- No website booking confirmation or completion signal exists.

**Supporting journeys:**

- **Gallery:** inspect photographs → optionally enlarge one → View Pricing or Book Now.
- **About:** evaluate owner story, values, and coverage → call or Book Now.
- **FAQ:** find and reveal an answer → proceed to booking or contact.
- **Contact:** call/email or send an inquiry → business follow-up, process TBD → proceed when uncertainty is resolved.
- **Specialty quote:** identify relevant vehicle category → Contact → obtain suitability/pricing guidance externally.

Current form feedback cannot establish successful delivery. Current FAQ keyboard barriers can interrupt the journey. Provider operation and live booking completion were not tested.

## 6. Information Architecture

| Page | Source route | Product responsibility |
| --- | --- | --- |
| Home | `/`, `index.html` | Introduce service, summarize packages, establish trust, answer initial questions, invite booking |
| Pricing | `html/pricing.html` | Compare inclusions, vehicle prices, estimated durations, add-ons, and specialty quote options |
| Gallery | `html/gallery.html` | Demonstrate previous work through photographs and enlargement |
| About | `html/aboutus.html` | Explain the business, owner, values, and coverage |
| Contact | `html/contact.html` | Support inquiries and direct contact, not appointment scheduling |
| FAQ | `html/faq.html` | Address service and appointment-related questions |
| Legacy Book Now | `html/booknow.html` | Directly accessible Acuity embed; not the normal header CTA destination |

Pricing is included because it is implemented and prominently linked, despite omission from the brief's page list. Routes above are source paths, not proof of deployed URL rewriting.

Shared navigation: logo to Home; Pricing, Gallery, About, Contact, FAQ, external Book Now. Secondary pages expose an active state.

Home and Pricing duplicate prices; Home and FAQ duplicate answers; coverage and contact information appear on several pages. Duplication supports discovery but creates maintenance risk. The legacy booking page has an unclear ongoing role and different contact details. These observations do not authorize consolidation or retirement.

## 7. User Stories & Functional Requirements

Acceptance criteria define expected customer behavior; they are not claims of completed verification. “Gap” identifies an existing shortfall, not permission to fix it.

| ID / priority | User story and requirement | Acceptance criteria | Current status |
| --- | --- | --- | --- |
| FR-01 / P0 | As a ready customer, I want an obvious Book Now action so I can reach external scheduling | Booking actions lead to the approved business destination; scheduling remains external; no local confirmation is implied | Acuity links exist and are approved; live destination unverified. Square deferred |
| FR-02 / P0 | As a visitor, I want dependable navigation so I can find relevant information | Header logo and links reach intended pages; mobile menu opens/closes by touch and keyboard; focus and scrolling remain usable | Shared header exists; legacy footer path defects; full keyboard verification outstanding |
| FR-03 / P1 | As a customer comparing services, I want clear inclusions, prices, vehicle categories, and time estimates | Published facts agree across Home/Pricing; exclusions and condition qualifications are visible; no unapproved prices or outcomes | Matching package price values; “starts at” and motorcycle-scope questions remain |
| FR-04 / P1 | As a cautious customer, I want examples of work so I can assess suitability | Each Gallery image opens the corresponding larger image; close/Escape work; meaningful alternatives and usable focus are available | Seven images and native dialog implemented; full accessibility testing outstanding |
| FR-05 / P1 | As a customer with questions, I want accessible answers before committing | Questions reveal associated answers using touch and keyboard, with visible focus and understandable expanded state | Home/FAQ disclosures exist; hidden checkbox controls are a keyboard gap |
| FR-06 / P0 | As a customer needing clarification, I want accurate contact options and truthful inquiry feedback | Phone/email destinations match approved details; required fields are clear; failed inquiries preserve entered data; success means confirmed delivery; no browser-exposed credential | Direct contact exists; form credential exposure and delivery/error handling are critical gaps |
| FR-07 / P1 | As a local customer, I want trustworthy business and coverage information so I can judge fit | Published operating facts agree across pages; proof is owner-approved; unsupported claims are not introduced | Story, coverage, reviews, and maps exist; factual reconciliation/provenance TBD |
| FR-08 / P1 | As a specialty customer, I want a way to ask about a quote so I can confirm suitability | Listed specialty services lead to Contact without implying fixed prices or guaranteed eligibility | Custom Quote links to Contact; delivery reliability inherits FR-06 |

Existing inquiry fields: required name, email, phone, vehicle year/make/model/color, and message; optional referral source. No additional data collection is required by this PRD.

## 8. Conversion Requirements

- **Primary action:** Book Now. Existing variants Book This Package and Book online serve the same external handoff.
- **Secondary actions:** call, email/inquiry, View Pricing, Explore Packages, Gallery/FAQ exploration, Yelp, and Request a Custom Quote.
- **Discoverability:** every marketing page must offer a clear booking path. Preserve direct booking without forcing an inquiry first.
- **Decision support:** keep service scope, advertised prices, coverage, practical answers, and existing proof available before commitment.
- **Honesty:** CTA labels must not promise package preselection, guaranteed outcomes, or confirmation that does not occur.
- **Mobile continuity:** menus, fixed headers, and sticky actions must not obscure content or prevent booking navigation.
- **External boundary:** preserve Acuity now; do not present it as Square. Square migration requires explicit approval.
- **Outcome quality:** optimize for suitable confirmed bookings, not outbound click volume alone.

Current placement includes the shared header; Home hero, packages, final section, and conditional mobile sticky CTA; Pricing packages/final CTA; About/Gallery closing CTAs; and Contact/FAQ header/footer links. Placement effectiveness is unmeasured. No new CTA placement or redesign is mandated here.

## 9. Non-Functional Requirements

| Area | Product requirement | Acceptance expectation / unknown |
| --- | --- | --- |
| Mobile | Visitors can evaluate and proceed on phones without losing information | No horizontal page overflow or obscured controls; readable content and touch/keyboard operation at narrow widths and zoom |
| Accessibility | Navigation, images, forms, and disclosures are usable without a mouse | Meaningful structure/alternatives, labels, visible focus, understandable errors/state, operable dialogs and menus; WCAG 2.2 AA is the existing project target, not certified compliance |
| Performance | Useful content and photographs load promptly on mobile connections | Avoid unnecessary payload and unstable layout; measured baseline and numerical budgets TBD |
| Local SEO | Visitors can discover accurate, relevant business/service information | Descriptive titles/headings, crawlable working links, consistent approved location/contact facts; production domain/indexing policy TBD |
| Reliability and privacy | Customers reach correct destinations and receive truthful feedback without exposed credentials | Confirmed contact outcomes, no credential disclosure, accurate external links; retention/consent and operational policies TBD |
| Browser support | Core journeys work in modern phone and desktop browsers | Exact supported browser/version matrix TBD; no cross-browser pass claimed |
| Brand consistency | Pages remain recognizably Double A Detailing | Preserve approved identity, practical tone, photography, and established patterns unless explicitly changed |

These requirements are customer-facing quality expectations, not an engineering implementation plan. Performance, usability, and compliance have not been quantitatively established.

## 10. Constraints

- Existing small-business marketing website, not a new SaaS or AI product.
- Preserve current content and brand unless an approved request explicitly changes them.
- Booking stays external: approved Acuity now, Square when ready and approved.
- Maintain a lightweight, understandable product and reuse existing components.
- Business facts, pricing, coverage, policies, proof, and contact details require owner authority.
- Missing analytics or provider access limits what can be claimed about results.
- Production domain, deployment settings, and external account configuration are not established by repository source.

## 11. Scope / Out of Scope

**Product scope:** existing pages, navigation, service and pricing information, work imagery, trust content, FAQs, contact experience, mobile usability, discoverability, and external booking handoff.

**This task:** documentation only—revise the canonical PRD for review. Requirements and identified gaps authorize no application changes.

**Out of scope:** redesign, copy changes, new features, custom booking/scheduling, customer accounts, payment processing, admin booking tools, native apps, provider migration/setup, analytics implementation, or deployment. No new backend or other platform architecture is proposed. External-provider account settings and appointment operations remain outside this website.

## 12. Current State

### Product and delivery model

The repository contains seven standalone HTML pages, page-specific CSS, and vanilla JavaScript. A reusable header supplies navigation; footers and prices are duplicated. There is no application build step, automated test suite, or custom booking system. Older Contact, FAQ, and booking pages retain legacy third-party styling/scripts; newer pages use custom styling. Local slider/vendor/demo files remain but are not used by current primary page interactions.

README mentions Netlify synchronization; production deployment and domain are unverified. Media includes images and unused videos; repository asset size is not a measurement of page download size.

### Existing experience

- **Home:** mobile detailing hero, three-step process, four packages, add-on names, coverage/map, three-photo preview, three testimonials, five FAQs, booking CTAs.
- **Pricing:** four packages, vehicle-specific prices, estimates, 13 priced add-ons, size/condition qualification, six specialty vehicle categories and quote link.
- **Gallery:** white introduction, seven natural-proportion photos in responsive columns, enlarged-image dialog; no filters/upload or next/previous navigation.
- **About:** Robert Almaraz story, experience claim, quality/reliability/convenience values, coverage/city list, map, call/booking actions.
- **Contact:** public contact information and browser-submitted inquiry form using SMTPJS.
- **FAQ:** 20 disclosures across General and Detail, including process, coverage, hours, payment, access, rescheduling, cleaning, and maintenance.
- **Legacy Book Now:** directly accessible Acuity embed; primary Book Now links bypass this local page.

### Advertised pricing

These source values match between Home and Pricing; provider prices and operational accuracy were not independently verified.

| Package | Sedan/coupe | SUV/truck | Motorcycle | Estimated time |
| --- | --- | --- | --- | --- |
| Premium Full Detail | $209 | $249 | $120 | 60–75 min |
| Standard Full Detail | $159 | $179 | $50 | 40–60 min |
| Standard Interior | $129 | $149 | Not listed | 40–60 min |
| Wash & Wax Detail | $79 | $89 | $120 | 30–40 min |

Premium is marked Most Popular. Detailed add-on prices/durations and inclusions remain in [Pricing](../html/pricing.html) and its [spec](../specs/pricing.md); this PRD does not redefine them. Existing “starts at” headlines use sedan prices even where motorcycle prices are lower. Motorcycle-specific scope is not separately explained. Pricing says size/condition may affect price and adjustments are confirmed before service.

### Business information and trust

Main pages/header use **714-478-0556** and **doubleadetailing@gmail.com**; Contact identifies Anaheim, California. Home describes Orange County plus an approximate 25-mile radius from an unspecified hub. About lists Orange County cities and Los Angeles, San Bernardino, and San Diego counties by request.

Home testimonials are attributed to Steve F., Sean M., and Jeff S., with five-star presentations and a Yelp link. Review permissions, freshness, and provenance are not recorded in source. About's current headline remains “Care you can see. Quality you can trust.” Its replacement remains undecided; no copy is changed here.

### Observed inconsistencies and gaps

- **Contact:** browser JavaScript exposes an SMTP credential; the form clears before delivery and lacks dependable success/error handling. Configured recipient differs from the public email. Email/phone use text inputs; live delivery is unverified. The secret is not reproduced or tested.
- **Operating facts:** FAQ says sunup-to-sundown seven days except major holidays; footers say 6am–6pm daily. Coverage descriptions need reconciliation. Legacy booking has different phone values, a malformed email link, and an unconfirmed public street address.
- **Booking:** Acuity is intentionally retained, not a defect. Package CTAs do not pass selected packages. Legacy route purpose remains unclear.
- **Navigation/assets:** Contact/FAQ footer Home paths resolve to missing `html/index.html`; some logo references have mismatched case and an icon stylesheet uses a placeholder path. Legacy booking has a stylesheet case mismatch.
- **Mobile/accessibility:** responsive layouts exist; header switches to a full-screen mobile menu, Pricing stacks/compacts cards, Gallery becomes one column, and Home has a conditional sticky CTA. Hidden FAQ checkbox inputs prevent normal keyboard focus; form focus styles are deficient; menu focus containment is not explicit.
- **SEO:** all pages have title/description and basic viewport/language metadata; older pages repeat generic descriptions. Six marketing pages have H1s; legacy booking lacks one. No repository canonical/social metadata, structured data, sitemap, or robots file was found.
- **Measurement:** no repository analytics or booking-completion measurement exists. No performance baseline or new browser-compliance audit was conducted.

### Evidence and audit boundaries

Source: [Home](../index.html), [Pricing](../html/pricing.html), [Gallery](../html/gallery.html), [About](../html/aboutus.html), [Contact](../html/contact.html), [FAQ](../html/faq.html), [legacy booking](../html/booknow.html), [shared header](../javascript/site-header.js), page styles, contact delivery logic, media/dependency inventory, [brand guide](../BRAND_GUIDE.md), and [README](../README.md). Detailed supporting observations are in [specs](../specs/README.md).

The repository audit includes authored pages/styles/scripts, shared behavior, legacy dependencies, assets, and project documentation/configuration. It does not establish production availability, external redirects/account settings, successful email delivery, completed bookings, review authenticity, search rankings, or measured conversion performance.

## 13. Risks

| Risk | Evidence | Potential customer/business impact |
| --- | --- | --- |
| Inquiry failure or credential abuse | Observed exposed credential and unreliable form feedback | Lost prospects, false reassurance, or account misuse; owner-side credential revocation/rotation is urgent |
| Incorrect expectations | Observed coverage, hours, legacy contact, and “starts at” ambiguities | Unsuitable bookings, customer confusion, or reduced trust |
| Evaluation blocked | Observed keyboard barriers and broken legacy paths | Some visitors cannot access answers or relevant pages |
| External booking interruption | Acuity is approved; live operation unverified; Square migration is future | Provider outages or an unverified future switch could interrupt bookings |
| Weak discoverability or slow pages | SEO gaps, substantial media inventory, older dependencies; performance unmeasured | Potential acquisition loss or abandonment, not a proven current outcome |
| Unverified/stale proof | Claims and testimonials exist without provenance records | Potential trust concerns; no claim that existing proof is false |
| Optimizing the wrong outcome | No attribution or conversion measurement in source | Decisions may favor clicks rather than qualified customers |

These are observed conditions and explicitly labeled potential consequences, not quantified losses.

## 14. Open Product Questions

### Five most important decisions

1. **Contact ownership and safety:** Which inbox should receive inquiries, who responds, and what response/data-handling expectations should customers have? Should the form remain the preferred inquiry channel? The exposed credential requires owner action independently of this documentation review.
2. **Authoritative operating facts:** What are the actual coverage boundary/radius origin, by-request areas, hours/holiday schedule, and public contact/location details?
3. **Service qualification and pricing:** Are existing prices/inclusions/estimates current? How should motorcycle scope and “starts at” pricing be understood, and what makes a visitor/service request qualified?
4. **Measurement:** Do you approve the proposed North Star? What reporting period, attribution, cancellation treatment, analytics/privacy approach, and provider data are available? Baselines and targets remain TBD.
5. **Customer and positioning priority:** Which evidenced segment should the site prioritize, and which existing, verifiable benefit most strongly differentiates the business?

### Deferred or supporting questions

- Once Square is ready, what exact destination and migration scope are approved? Acuity remains approved until then; no immediate provider decision is needed.
- What is the intended long-term role of the legacy booking route?
- Which reviews/photos are approved, current, and supported by usage permission?
- What production domain, deployment source, and search/analytics accounts are authoritative?
- What browser support and measured performance expectations should be adopted?
- Are current payment/rescheduling statements operationally accurate? Do not invent additional policies.
- What less-dramatic About headline, if any, should replace the existing one?

## 15. Assumptions

- The explicit decision to retain Acuity still applies; the new brief's Square wording describes the future destination, not authorization to migrate now.
- Published source content is a preservation baseline, not independent validation of business facts or claims.
- Customer segments, likely barriers, and the qualification definition are evidence-informed hypotheses, not validated research.
- Pricing is part of the product because it exists and is prominently navigable.
- External booking clicks and form alerts are not completed bookings or confirmed delivery.
- Unconfigured repository analytics does not prove that no external reports exist.
- Proposed priorities, North Star, and quality criteria require review; no numerical baselines, targets, or conversion impact are assumed.
- Retaining the legacy page in this audit does not imply approval to promote, remove, or redirect it.
- Source-visible responsive behavior is not a passed usability, accessibility, performance, or browser test.
- No gap, requirement, or risk listed here authorizes implementation. Stop for product-owner review.
