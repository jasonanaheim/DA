# Implementation map — approved target versus existing website

## Latest execution status (supersedes historical baseline below)

- Phase 5 analytics slice: owner selected GA4 (`G-9N49QPVB24`) and approved prior consent with no advertising features. [GA4 analytics](ga4-analytics.md) defines the six-page implementation, bounded events and remaining live verification. Legacy Book Now and completed-booking attribution remain excluded.

- Phase 5 image slice: [image optimization](image-optimization.md) records 12 local WebP derivatives from six unchanged originals, responsive selection and below-fold lazy loading. No analytics, host changes or new deployment included. File-size savings verified; real-user timing remains unmeasured.

- Shared navigation, native FAQs, gallery dialog resilience and contact changes were implemented in checkpoint `439ae89`; prior execution notes retain per-check limitations, including latest menu-position visual QA.
- That checkpoint was pushed to GitHub main and Netlify linked to main; deployment and contact-form detection were verified during setup. Owner subsequently reported the form/email test worked. This is owner-reported receipt, not a new automated delivery test. Credential revocation and privacy/retention decisions remain open.
- Phase 4: owner confirmed Orange County service area, existing public phone/email, current hours and private street address. [SEO preparation](seo-preparation.md) owns the current narrow slice; [domain activation](seo-domain-activation.md) stages canonical/social URLs and crawler files. Domain transfer is still pending; final canonical host and live verification remain gated. Legacy address removal is authorized, not broader legacy retirement or booking migration.
- Analytics remains unselected; no instrumentation or Square migration is included. Baseline tables below are historical traceability, not current completion claims.

Status: owner authorized core fixes on September 2, 2026; those local changes and verification are recorded in [core-fixes-execution.md](core-fixes-execution.md). **Overall readiness: BLOCKED for complete target-state implementation**, not for every individual slice. External-provider and business-dependent slices remain gated; this authorization is not approval to deploy or implement all unresolved work. The table below retains the original baseline traceability.

Sources: [PRD](../PRD.md), [Engineering Document](../engineering/engineering-doc.md), actual repository at application commit `a57b2ca`, inspected September 2, 2026. Both source documents are approved by conversation; their on-disk draft/awaiting-approval labels are stale. They remain unchanged. Approval does not supply missing provider URLs, operational facts or account settings.

## Authority and scope

September 2 provider/domain update: owner confirmed `doubleadetailing.com`, existing host `doubleadetailing.netlify.app`, and Netlify Forms/test recipient. See [Netlify contact rollout](netlify-contact-rollout.md) for the local implementation and remaining release gates. D1 provider selection is resolved, not its live verification/privacy/retention gates; D3 domain naming is resolved, not DNS/hosting/SEO deployment. Analytics remains unselected.

Product intent → approved engineering design → these implementation delta specs → this map's execution/verification traceability → later code → recorded verification.

The existing root `specs/` directory documents the earlier page baseline. The new `docs/specs/` files are implementation deltas derived from the approved PRD/engineering design, not a replacement architecture or a second set of page redesigns. If sources conflict, stop that slice and record the conflict rather than inventing a fix.

**Booking:** the approved sources explicitly retain Acuity for now. Current primary anchors use `https://DoubleADetailing.as.me/`; legacy booking embeds Acuity. Square owns the future external booking experience, but no Square destination exists. Preserve the no-custom-booking boundary throughout. Current Acuity use is not an implementation defect. D4 gates migration only; core work need not wait for Square.

No SQL, `.env.example`, backend, authentication, storage, API, package manifest, CI, or infrastructure files are generated: none is required by the selected current architecture. No new framework, runtime URL fetch, central store, CMS or visual redesign is specified.

## Derived specification set

Eight concern specs plus this map are sufficient. There is no standalone Home/About/Pricing rebuild spec: those layouts already exist. Accessibility, mobile behavior, failures and tests are owned by the component concern that changes them rather than duplicated into competing cross-cutting specs.

| Spec | Smallest concern | Requirements | Slice readiness after spec approval |
| --- | --- | --- | --- |
| [navigation-and-booking.md](navigation-and-booking.md) | Header focus/lifecycle/fallback, broken Home links, skip/focus treatment; preserve outbound booking | FR-01 P0, FR-02 P0; mobile/accessibility/reliability | Core ready; Square/legacy disposition D4 |
| [faq-disclosures.md](faq-disclosures.md) | Convert existing checkbox FAQs to native details/summary without answer changes | FR-05 P1; accessibility | Ready; factual rewrites not included |
| [gallery-dialog.md](gallery-dialog.md) | Preserve photo grid/native dialog; correct focus/failure state | FR-04 P1; accessibility/reliability | Ready |
| [contact-delivery.md](contact-delivery.md) | Existing input/contact-action repairs; secure delivery outcome contract | FR-06 P0, FR-08 P1 | UI slice concrete; production delivery blocked D1 |
| [content-consistency.md](content-consistency.md) | Preserve matching values; reconcile only owner-approved inconsistent facts | FR-03/07/08 P1; FR-06 contact facts | Preservation checks ready; fact changes blocked D2, legacy D4 |
| [seo.md](seo.md) | Static global/page/local metadata, confirmed canonical/indexing/schema | FR-07 P1; SEO NFR | Public metadata/policy blocked D2/D3; legacy D4 |
| [performance-resilience.md](performance-resilience.md) | Broken asset refs, image dimensions, optional-resource fallback, measured cleanup | FR-02 P0, FR-04 P1; performance/privacy/reliability | Confirmed path/dimension/fallback slice ready; host D3, legacy D4, optimization manifest D7 |
| [measurement.md](measurement.md) | Bounded events for approved proposed metrics; vendor-neutral definitions | PRD §4 metrics; FR-01/04/06 preservation | Instrumentation blocked D5; contact results D1 |

All concern specs have 18 sections, current/target/delta, implementation IDs, acceptance IDs, expected files, and verification plans. “Ready” does not assert executed tests or authorize code now. Blocked specs intentionally do not invent transport endpoints, unresolved replacement copy, production domains, vendors, new host-file paths, or environment variables.

## PRD → Engineering → Spec → Code → Verification

| PRD requirement | Priority | Engineering decision | Implementation spec | Expected code area | Verification / status |
| --- | --- | --- | --- | --- | --- |
| FR-01 external booking anchors | P0 | §§4–7 real anchors; approved Acuity now, Square gated | [Navigation](navigation-and-booking.md) NAV-FR-05 | `javascript/site-header.js`, `index.html`, primary page HTML | NAV-AC-05; current destination already correct in source; live landing NOT VERIFIED |
| FR-01 booking access on script failure and mobile | P0 | §§4/6/12 progressive fallback, visible native links | [Navigation](navigation-and-booking.md) NAV-FR-03/04/06 | Shared header, adjacent fallback in existing HTML, page CSS, existing Home sticky CTA | NAV-AC-03/04/06; blocked-script/short-screen/zoom tests |
| FR-02 correct routes | P0 | §§4/6/16 keep file routing, repair exact paths | [Navigation](navigation-and-booking.md) NAV-FR-01; [Resources](performance-resilience.md) RES-FR-01 | Contact/FAQ footer hrefs, exact-case logo resources; existing header base-path | NAV-AC-01, RES-AC-01; all seven route and exact-case scans |
| FR-02 menu state/focus | P0 | §§6/11 reversible overflow/inert, keyboard/resize/disconnect | [Navigation](navigation-and-booking.md) NAV-FR-02/03 | `javascript/site-header.js` and its Shadow DOM styles | NAV-AC-02/03/06; repeated state, resize, keyboard, reconnect tests |
| FR-03 package facts | P1 | §§4/8/16 keep authored prices, verify duplicates | [Content](content-consistency.md) CNT-FR-01/02 | `index.html`, `html/pricing.html`; no price model | CNT-AC-01/02; numeric parity already present, scope wording changes gated D2 |
| FR-04 image showcase | P1 | §§4/6 native dialog, local state/failure handling | [Gallery](gallery-dialog.md) GAL-FR-01–04; [Resources](performance-resilience.md) RES-FR-02 | `html/gallery.html`, `css/stylegallery.css`, image dimension attributes | GAL-AC-01–04, RES-AC-02; seven-image/source, close/focus, failed-image tests |
| FR-05 questions | P1 | §§4/6/11 native disclosure, multiple open, preserved text | [FAQ](faq-disclosures.md) FAQ-FR-01–04 | `index.html`, `html/faq.html`, corresponding CSS | FAQ-AC-01–05; 25 question pairs, keyboard/no-JS, heading outline |
| FR-06 direct contact | P0 | §§6/8/16 real approved contact actions | [Contact](contact-delivery.md) CON-FR-01/05; [Content](content-consistency.md) CNT-FR-02 | `html/contact.html`, legacy text only after D2/D4 | CON-AC-01/06, CNT-AC-02; tel/mailto equality; no calls/messages sent |
| FR-06 secure truthful delivery | P0 | §§6–8/12–13 secure transport boundary and local state | [Contact](contact-delivery.md) CON-FR-02–04 | `javascript/app.js`, form HTML/CSS; provider configuration unspecified until D1 | CON-AC-02–05; no secret, mock invalid/pending/result tests, confirmed-delivery evidence; BLOCKED D1 |
| FR-07 truthful local/trust facts | P1 | §§8–9/16–19 owner facts before propagation | [Content](content-consistency.md) CNT-FR-02/04; [SEO](seo.md) SEO-FR-03 | Existing Home/About/FAQ/Contact/Pricing content and HTML heads | CNT-AC-02/04/05, SEO-AC-04; source-to-approved-fact comparison; BLOCKED D2 |
| FR-08 specialty quote | P1 | §§5/17 reuse Contact, no price/eligibility invention | [Content](content-consistency.md) CNT-FR-03; [Contact](contact-delivery.md) CON-FR-01/05 | `html/pricing.html` existing link; Contact same delivery flow | CNT-AC-03 and CON-AC-06; quote link already satisfied, reliable inquiry inherits D1 |
| Mobile/accessibility | PRD §9; supports P0/P1 | §§6/11/16 existing breakpoints, focus, semantics | Navigation, FAQ, Gallery, Contact, Resources | Existing page CSS/DOM and header | Concern ACs; 320/390/768/1280, breakpoint edges, short landscape, zoom, keyboard/screen reader; exact support certification D6 |
| Performance and optional resource resilience | PRD §9; no numeric priority assigned | §§7/10/12 measured active requests, stable dimensions, optional animation | [Resources](performance-resilience.md) RES-FR-01–04 | Current HTML/CSS/scripts/media only by approved manifest | RES-AC-01–04; exact-case, dimensions, resource blocking, same-profile measurements; broader optimization D7 |
| SEO/local discovery | PRD §9; supports FR-07 | §9 static metadata, confirmed host/facts | [SEO](seo.md) SEO-FR-01–04 | Existing page heads; eventual sitemap/robots artifact locations await D3 | SEO-AC-01–05; parse metadata/JSON, canonical/link/host policy verification |
| Privacy/host reliability | PRD §9; FR-06 P0 subset | §§12–13 no client secret/PII, actual host policy | Contact, Resources, Measurement | Existing form scripts; chosen host/vendor settings only after decisions | CON-AC-02/04, RES-AC-05, MEA-AC-02–04; host/key policy requires D3 |
| North Star and supporting metrics | PRD §4 recommendation; no P-level assigned | §§7/13/17 external reporting; clicks not bookings | [Measurement](measurement.md) MEA-FR-01–06 | Existing action handlers/head integration sites, no new module path until D5 | MEA-AC-01–05; exact event triggers/payload/dedup/nonblocking test; completion reporting D5 |
| Brand/simple architecture/no custom booking | PRD §§9–11 | §§4/14–15 keep stack/components/routes | All specs preservation clauses | Current HTML/CSS/JS | Diff scope review plus screenshots; no SQL/env/backend/framework/package changes |

**P0 audit:** FR-01, FR-02 and FR-06 are represented, including the primary booking outcome. FR-06 full completion is blocked by D1; FR-01 future Square completion by D4. Current href correctness is not live-provider validation. **P1:** FR-03, FR-04, FR-05, FR-07 and FR-08 mapped. **P2:** no P2 requirement is assigned in the approved PRD; none has been invented.

## Already satisfied — preserve, do not rebuild

Use the exact status **ALREADY SATISFIED — NO IMPLEMENTATION REQUIRED** only for the identified source-level subrequirement, not the full untested journey.

| Subrequirement | Existing implementation | Status / preservation check |
| --- | --- | --- |
| Booking is an external anchor, not an owned scheduler | All primary as.me anchors and shared header; legacy iframe | ALREADY SATISFIED — NO IMPLEMENTATION REQUIRED. Preserve href/native action; live provider remains NOT VERIFIED |
| Working seven-file route structure/shared header API | `index.html`, six files under `html/`, `base-path`/`active`/`solid` | ALREADY SATISFIED — NO IMPLEMENTATION REQUIRED for topology/API; known footer defects still require delta |
| Four package numerical price/time parity, motorcycle Interior exclusion | Home and Pricing literal HTML | ALREADY SATISFIED — NO IMPLEMENTATION REQUIRED. Compare against existing values; owner truth and scope wording are separate |
| Photo grid and native dialog architecture | Seven Gallery buttons/native dialog, natural-ratio columns | ALREADY SATISFIED — NO IMPLEMENTATION REQUIRED for layout and chosen mechanism; focus/failure delta remains |
| Specialty CTA and category list | Pricing custom-quote Contact href and six categories | ALREADY SATISFIED — NO IMPLEMENTATION REQUIRED for link/list; Contact reliability remains blocked |
| Existing hero/story/values/reviews/page layout | Home/About/Pricing/Gallery authored sections and CSS | ALREADY SATISFIED — NO IMPLEMENTATION REQUIRED for presence/design. No extra page spec or copy refresh |
| Basic language/charset/viewport/titles/descriptions | All seven HTML heads | ALREADY SATISFIED — NO IMPLEMENTATION REQUIRED for presence; unique approved copy/canonical gaps remain |
| No owned backend/db/accounts/build framework | Current repository inventory | ALREADY SATISFIED — NO IMPLEMENTATION REQUIRED. Do not add infrastructure to satisfy a template |

## Engineering target coverage and ownership

| Engineering decision / section | Owning delta or explicit disposition |
| --- | --- |
| §4 retain stack/routes/header and static facts | Preservation above; Navigation repairs only; Content parity checks; no JSON/config-fetch migration |
| §§4/6 header fallback, menu focus/background lifecycle, skip/focus access | Navigation supplies concrete adjacent-static-fallback contract for spec approval and idempotent lifecycle behavior; no duplicate interactive menu |
| §§4/6 native FAQ, independent state | FAQ spec; no wording changes |
| §§4/6 dialog state/error/focus | Gallery spec; no new gallery library |
| §§4/6/8 secure form and trusted outcome boundary | Contact D1; no invented server/API/endpoint |
| §§4/7 booking boundary and deferred migration | Navigation preservation plus D4; no code delta for current correct href |
| §§9/11 metadata, canonical, sitemap, robots, social, local/schema and landmarks | SEO D2/D3/D4; FAQ category heading in FAQ; existing marketing main reused by Navigation |
| §§10/12 image dimensions/lazy choices, optional animation/font failure, measured dependency cleanup | Resources core slice + D7 manifest; Gallery error handled separately |
| §§12–13 host HTTPS/404/cache/compression/headers, Maps key restrictions | Resources D3 read-only review and approved configuration only; no guessed host file. Branded 404, provider-health proxy and monitoring service remain explicitly not required |
| §13 credential rotation/data validation/encoding/PII | Contact D1; owner-side rotation urgent and not executed. Measurement privacy gated D5. History rewrite not authorized |
| §§7/13/17 analytics | Measurement definitions limited to PRD supporting metrics; no FAQ/heatmap/ads tracking or vendor choice |
| §§14–16 folder/naming/test conventions | Existing structure preserved; all specs carry verification plans; common verification below supplies cross-spec gate |
| Optional footer/token extraction, self-host fonts, image service, custom 404, new support polyfills | No mandatory delta in engineering; excluded rather than turned into speculative specs |

## Unresolved Implementation Decisions

Approval of the Engineering Document resolves its architectural recommendations (retain stack/native dialog/native FAQs, etc.). It does not fill the explicitly unknown operational inputs below. No repeated question is needed for Acuity's current approval or existing styling.

| ID | Required decision / evidence | Work blocked | Work not blocked |
| --- | --- | --- | --- |
| D1 | Secure delivery capability/provider; trusted recipient/sender; observable delivery versus acceptance contract; safe test destination; timeout/retry/abuse controls, privacy/retention/status wording and no-JS fallback. Owner handles credential revoke/rotate | Contact production rollout, verified FR-06, inherited FR-08 inquiry, delivered-result analytics | Field types/focus/direct-link spec slice; navigation/FAQ/gallery |
| D2 | Authoritative coverage/hub/adjacent areas, hours/holidays, public contact/address, package scope/starting-price interpretation, policy wording, proof permissions; record exact replacements | Content fact changes, local SEO/schema; legacy facts additionally D4 | Price parity checks, existing layout preservation, semantic FAQ repair |
| D3 | Actual production host/domain/HTTPS/canonical path and indexing policy; supported host config mechanism; cache/header/compression/404 settings; Maps-key owner/restrictions; approved metadata/social values/images | Publishable canonical/robots/sitemap/social output, hosting/security configuration and proof of production behavior | Local exact-case repairs, native UI changes, dimension attributes |
| D4 | Square readiness/exact owner URL, explicit migration scope, legacy booking route lifecycle and rollback policy | Square switch and test; legacy route retirement/redirect/contact/stylesheet remediation | Approved current Acuity anchors and all nonmigration work; legacy header fallback only |
| D5 | Analytics vendor/account/public config and consent/session/attribution/reporting rules; qualification and provider-confirmed data access | Any instrumentation, session denominators, credible completed-booking North Star | Vendor-neutral event contract, all real user actions and local tests |
| D6 | Supported browser versions/certification matrix and optional test/lint tooling if needed | Final complete browser-support certification or new tooling installation | Manual tests in available browsers and core implementation using native APIs |
| D7 | Reproducible active-page measurement profile/baseline and exact approved asset/dependency optimization manifest; budgets if desired | Specific binary variants/dependency upgrades/removals/caching optimization promises not proven by source | Confirmed path corrections, accurate image dimensions, resource-failure checks |

After a gate resolves, update the affected spec with actual values, paths and acceptance evidence before implementation of that slice. Never substitute `TBD`, a guessed Square URL, an invented endpoint, or imaginary test result into code. D1 is the primary blocker to complete P0 fulfillment. D2/D3/D5 block completeness of supporting target work. D4 is a deliberately deferred future change, not a defect that must delay current website repairs.

## Repository observations versus approved sources

- Runtime fingerprint still matches the audited `a57b2ca` baseline; no framework, environment files, build/tests or hosting configuration were added. There are 167 tracked files, including 144 media assets.
- Docs still label themselves draft/awaiting approval despite explicit conversational approvals; this map records approval without modifying the sources.
- Engineering target features (native FAQs, resilient focus/form handling, fallback) are not yet implemented. Their absence is the defined delta, not a reason to rebuild working pages.
- The request's generic Square language differs from the approved documents and real Acuity links; the documents explicitly say Acuity now. No Square URL can be inferred.
- Existing root `specs/book-now.md` still contains a stale “Conflict to resolve” heading despite describing Acuity as approved. The approved PRD/engineering decision takes precedence; no runtime change follows that stale heading.
- No substantial runtime drift was found against source descriptions. Known unsafe Contact, old links/contact facts, metadata gaps and legacy dependencies remain present. No live email/provider/performance/browser compliance validation has been claimed.

## Common verification and final gate

Every implementation execution records spec/requirement ID, acceptance ID, browser/version, viewport/state, test method, observed result and evidence. Allowed results: PASS, FAIL, NOT VERIFIED. Gate-blocked assertions are NOT VERIFIED; an observed defect is FAIL. Do not mark the whole project complete because core changes pass.

1. Capture source/diff baseline and affected-page screenshots before each approved slice. Preserve working behavior and unrelated changes.
2. Serve root via `python3 -m http.server 8000`; no `npm build` exists. Run `git diff --check`, authored JS/inline-script syntax, relevant HTML/ID/label checks and exact-case href/src/CSS URL verification. Exclude commented legacy markup from live anchor counts but retain it as audit context.
3. Follow all actual routes, header/fallback/footer links and Pricing `#packages`. Check Home/Pricing values and existing Contact field list. No route migration/CMS needed.
4. Test mobile/desktop/keyboard/zoom/short-screen/reduced-motion at the source matrix and both sides of affected breakpoints. Header changes trigger all-seven-page regression, including Shadow DOM focus and reconnect. Available tooling may assist; new packages require approval.
5. Execute FAQ, Gallery and Contact mock cases from their specs; block scripts/images/fonts/maps individually and in combinations. Do not call current live SMTP or create real bookings/payments.
6. Critical handoff: Website → Book Now → exact approved Acuity destination now; actual business landing read-only verification, without appointment creation. Future Square test remains NOT VERIFIED until D4; after approval verify exact supplied URL and business landing, not a made-up fixture. Never infer booking completion from a click.
7. For measurements, canonical/robots/schema/host settings, require the relevant D1–D7 evidence. Local tests do not establish production delivery, indexing, HTTPS, caching or attribution.
8. Compare diff against each spec's expected/possible/protected areas. No SQL, environment, backend, provider integration, package, deployment or unrelated visual/content changes may appear without revised approval.

Persistent automated tests are useful but the Engineering Document did not choose tools or test files. No fake existing `tests/` files are listed. D6 can approve a small verification harness and exact new paths later; manual/static verification remains executable now. A lint/test framework is not silently installed to satisfy a template.

## Recommended implementation order

Each phase requires approval of its specs first. Shared-file changes must be coordinated sequentially; do not run competing edits to the same HTML/CSS/header simultaneously. Decision work can proceed alongside independent implementation, but blocked slices must not ship partially wired integrations.

| Phase | Specs / scope | Dependency | Why this order | Expected implementation area |
| --- | --- | --- | --- | --- |
| 0 — decisions and urgent safety | Resolve D1 promptly; owner credential revoke/rotate; gather D2/D3/D5/D6/D7, defer D4 until ready | Owner/service access; no external action authorized by docs alone | Current credential exposure is urgent; secure transport cannot be guessed. Gather facts while core repairs proceed | Decision records; external credential action only with authorization; no application edits by this phase automatically |
| 1 — shared conversion foundation | Navigation core and confirmed Resources path repairs | Spec approval; no provider migration dependency | Every page and later test relies on usable navigation/CTAs; fix deterministic broken references early | Shared header, fallback/skip/focus markup/styles, Contact/FAQ footer/logo/icon paths |
| 2 — secure contact rollout when unblocked | Contact including chosen delivery transport; eligible direct-link/input slice may be reviewed separately | D1 resolved for deployment; coordinate header styles from phase 1 | Highest unresolved P0 and specialty-quote dependency; do not postpone behind cosmetic work or fake transport completion | Contact HTML/CSS, `javascript/app.js`, approved actual provider config only after spec amendment |
| 3 — independent evaluation interactions | FAQ and Gallery | Phase 1 shared behavior stable; not dependent on D1 if still blocked | Native disclosures and dialog failures are narrow independent improvements; can proceed while contact decisions remain unresolved | Home/FAQ accordion markup/CSS; Gallery dialog script/CSS |
| 4 — factual consistency, then SEO | Content then SEO | D2 exact facts; D3 host/metadata policy; D4 only for legacy inclusion | Avoid propagating contradictory business facts into canonicals/schema or revising content twice | Existing text/links/head metadata; new sitemap/robots paths only once explicitly approved |
| 5 — cross-cutting performance and measurement | Resources remaining measured optimization; Measurement instrumentation | Stable affected page markup/handlers; D7/D3 for optimization; D5 and D1 results contract for measurement | Measurements reflect the resulting pages; stable handlers prevent duplicate event attachment and wasted optimization | Existing media/HTML/CSS/CDN references by approved manifest; approved event integration sites |
| 6 — final verification | All concern verification plans and map common gate | Each included slice complete; unresolved slices explicitly excluded/blocked with owner agreement | Validate full conversion/evaluation flow, document remaining gaps honestly | Read-only/static/browser checks; approved mocks/reports, no unrequested deploy |
| Deferred — Square/legacy | Navigation handoff gate and legacy SEO/Resources/Content slices | D4 explicit readiness/URL/lifecycle approval; rerun final gate afterward | Current Acuity use is approved; migration is not a prerequisite for current fixes | Existing booking anchors/legacy file only within approved migration delta |

Overall set remains **BLOCKED** for complete target delivery by the unresolved decisions above. Concrete core specs are ready for review and scoped implementation authorization; approval of this specification set alone does not fill missing facts or authorize external account operations. Stop here for owner review—no code has been changed.
