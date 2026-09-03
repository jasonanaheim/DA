# Specs and development workflow

Baseline: 2026-09-02, application commit `a57b2ca`. Status: documentation baseline; recommendations await owner approval.

## How to use these specs

Read [site.md](site.md), the relevant page spec, and [../AGENTS.md](../AGENTS.md). Before a future change, add a short proposal with scope, affected files, acceptance checks, and out-of-scope items. Obtain approval for product decisions or expanded scope, implement only that change, verify it, and update the baseline notes. A dated paragraph in the relevant spec is enough; no ticketing system, generator, new dependency, or test framework is required.

Terminology:

- **Current implementation / baseline:** observed in source, not proof of live production behavior or current business truth.
- **Required / acceptance criteria:** preservation and quality expectations for future authorized work. Known failures below are not certified passes.
- **TBD:** owner confirmation or external verification required. Never fill with invented facts.
- **Proposed improvement:** not implemented and not authorized by this document.

## Index

- [Site-wide requirements and architecture](site.md)
- [Home](home.md)
- [Pricing](pricing.md) — included because it is implemented and prominent in navigation.
- [Gallery](gallery.md)
- [About](about.md)
- [Contact](contact.md)
- [FAQ](faq.md)
- [Book Now / external handoff](book-now.md)
- [SEO](seo.md)

## Audit scope and evidence

Read-only source audit of all seven HTML documents, the shared header, authored scripts, page CSS, brand guide, README, and existing untracked AGENTS instructions; inventoried local vendor assets and all 144 tracked image/video assets. Checked static local link/asset references against tracked filenames, including case, and searched for SEO/analytics/integration hooks. Vendor jQuery 3.3.1 and lightSlider 1.1.3 are repository artifacts; no current HTML page imports those local slider files.

No production crawl, live Square/account inspection, email submission, credential test, Lighthouse run, analytics-account audit, or new interactive browser compliance test was performed for this documentation task. Source-derived responsive behavior is not a new visual QA certification. README mentions Netlify, but hosting/dashboard configuration is not present here.

## Findings requiring attention

| ID | Finding and evidence | Status / next decision |
| --- | --- | --- |
| B1 — resolved for current scope | Owner confirmed September 2, 2026: retain Acuity for now. Primary CTAs use `DoubleADetailing.as.me`; legacy booking embeds Acuity. | Keep links/embed unchanged. Square migration awaits readiness, confirmed URL, and explicit approval. |
| C1 | `javascript/app.js` contains a browser-visible SMTP credential and a hard-coded recipient different from the public business email. | Urgent owner-side revocation/rotation; approve safe delivery design. Secret value intentionally omitted. |
| C2 | Contact script resets the form before delivery, alerts success for any resolved response, and lacks rejection handling. Form has no action endpoint or Netlify form configuration. | Delivery reliability unverified; approved safe test/remediation needed. |
| A1 | FAQ and Home FAQ inputs have `display:none`; labels are not keyboard buttons and expose no expanded state. Contact inputs suppress outlines. Header does not implement a focus trap or background inertness for its mobile overlay. | Accessibility audit/remediation pending; no compliance claim. |
| N1 | Contact/FAQ footer Home links resolve to nonexistent `html/index.html`; logo filename capitalization differs from tracked asset; placeholder icon CSS path absent. | Approved navigation/dependency cleanup needed. |
| N2 | Legacy booking page references `styleBooknow.css`, but tracked file is `stylebooknow.css`; loads a directory as a script, multiple jQuery copies, placeholder links, and malformed mailto/phone targets. It has no H1/main landmark. | Decide whether to retire/redirect/retain the page before repair. |
| F1 | Legacy booking page has different phone numbers and a street address; FAQ says sunup–sundown except major holidays, while old footers say 6am–6pm daily. | Confirm public contact/address/hours/policies. |
| F2 | Home describes an approximate 25-mile hub radius; About lists 31 cities and adjacent counties by request. Hub/radius basis is unspecified. | Confirm coverage boundaries and exceptions. |
| F3 | Home “Starts at” labels for full details use sedan prices even though motorcycle prices are lower. Home/Prices amounts and times match, but inclusion text is not identical. FAQ references obsolete “menu items 4–5.” | Confirm package scope, starting-price meaning, times, and policy text. |
| S1 | Titles/descriptions exist; no canonical, structured data, Open Graph/Twitter metadata, sitemap, or robots.txt found. | Confirm public domain and business facts before SEO work. |
| T1 | No first-party analytics/event hooks, conversion reporting, or consent implementation found. Third-party maps/scheduling/email/CDN requests are not evidence of business conversion tracking. | Confirm measurement platform, privacy approach, and booking-completion visibility. |
| P1 | 144 tracked media assets total about 307 MiB, including large unused videos. Total repository media size is not page transfer size. Images lack responsive variants/intrinsic dimensions in many places; legacy pages load duplicate libraries. | Measure active-page payload before optimization; no automatic asset deletion. |
| M1 | Footer markup and CSS tokens are duplicated. Several CSS files retain superseded rules. Local slider scripts/styles and transport-list demo script are unused by current pages. | Consolidation/cleanup only under scoped approval. |
| F4 | Testimonials, photo captions, 20+ years, owner name, and service claims exist in code but have not been independently verified. About headline was previously flagged by owner; no replacement selected. | Confirm accuracy/permissions and headline direction. |

Home also retains a browser-visible Maps embed key; restrictions are unknown. An embed key is not automatically a secret, but its restrictions should be reviewed. About uses a keyless embed.

## Ranked future improvements — proposals only

Ranked by expected booking-conversion impact based on source findings, not measured uplift:

1. Verify the approved Acuity handoff without creating appointments. Square migration is deferred until the owner confirms readiness; retaining Acuity is not a defect.
2. Secure and repair inquiry delivery so uncertain customers are not lost to failed or misleading submissions. Credential rotation is urgent regardless of ranking.
3. Remove booking-path friction on mobile and keyboard: accessible FAQs/menu/form focus, fixed-header clearance, and broken internal/contact links.
4. Reconcile prices/inclusions, coverage, hours, policies, and authentic trust evidence so customers can decide confidently without calling to resolve contradictions.
5. Improve active-page mobile load performance: right-size served images, reserve layout space, and remove approved unused/duplicate dependencies.

Before evaluating uplift, approve privacy-aware outbound-CTA measurement. A booking-link click is a handoff proxy, not a completed booking. Local SEO is a separate high-value acquisition opportunity after canonical domain/business facts are confirmed.

## Owner TBDs

- Deferred migration: Acuity is intentionally retained. Once Square is ready, confirm its exact destination and the legacy booking route's disposition.
- Inquiry destination, delivery provider, owner handling credentials, retention/privacy/spam requirements, and any response-time promise?
- Public domain, actual Netlify project/deployment process, canonical host, and Google Business Profile?
- Correct phone/email/address visibility, hours/holiday rules, payment/cancellation policies, travel coverage, and hub?
- Approved package/add-on values, inclusions, duration estimates, motorcycle differences, and “Starts at” wording?
- Permission/provenance for photos and testimonials; current owner/experience claims; plainer About headline?
- Existing analytics outside this repository, desired consent approach, and access to completed-booking reporting from Acuity now and Square after migration?

No recommendation is implemented by establishing these specs.
