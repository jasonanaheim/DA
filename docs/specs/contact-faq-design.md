# Contact and FAQ visual alignment

Owner authorization: align Contact/FAQ with the newer site design, document reusable style guidance and verify FAQ open/close behavior.

Visual thesis: clean white content, compact navy photographic introductions, established blue actions and the newer navy footer. Reuse existing photography and the existing Shadow DOM header; do not redesign other pages.

Content plan: short page introduction → existing inquiry form/contact information or two FAQ categories → existing phone CTA → matching footer. Keep all 20 FAQ question/answer pairs and all six Netlify customer fields. Correct only the obvious “Enrquiry” heading typo. Replace legacy footer (including placeholder social links and conflicting old hours) with the existing modern footer pattern; do not invent replacement business facts.

Interaction thesis: retain the shared menu transition, subtle button hover feedback and a rotating disclosure indicator; reduced motion removes transitions. Native details/summary must open AND close via mouse, Enter and Space, with multiple answers independently open and no fixed-height clipping.

Files: `html/contact.html`, `html/faq.html`, their dedicated stylesheets, new `css/support-pages.css` for shared tokens/page shell/footer, `BRAND_GUIDE.md` and linked baseline specs. Replace obsolete styles rather than accumulating conflicting overrides. Remove now-unused Bootstrap/jQuery/Popper/AOS/icon imports on these two routes only. No Netlify transport, booking URL, domain, pricing, other routes, packages or deployment changes.

Checks: compare FAQ answer markup and original field attributes before/after; run form mocks; verify all 20 disclosures open/close and independent states; check header/menu/footer and forms at 320/390/768/1280px. Validate local assets and script syntax; preserve native no-JS FAQ behavior. Record actual verification below.

## Verification

Implemented locally, September 2, 2026. Before/after assertions: all FAQ answer markup and Contact input/textarea attributes preserved. `node tests/contact-form.cjs` PASS; `git diff --check` PASS after whitespace cleanup.

In-app browser: all 20 questions opened and closed individually using pointer clicks (40 actions); Enter and Space toggled questions 1/2 independently. Expanded answer is present in the accessibility snapshot and visible on a 390px screenshot. Contact/FAQ mobile navigation works; desktop Contact layout and FAQ/footer inspected visually. Contact at 320/390/768/1280px and FAQ at 320/390/1280px show no horizontal page overflow; tablet FAQ checked separately below. No emails/bookings/deployments performed. Full screen-reader/zoom audit and actual hosted form delivery remain outside this verification.

Removed obsolete external libraries on these two pages only; no new packages. Style guide now documents actual shared CSS, header use, footer markup, colors/type, controls/disclosures, breakpoints and maintenance checks. Other pages and booking/form transport are untouched by this visual change.

Final check: FAQ tablet viewport/document both 768px; all answers closed after testing. Local href/src targets resolve on both pages; no legacy library imports remain. Browser viewport override reset.
