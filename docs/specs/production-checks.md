# Production checks

Scope approved October 7, 2026: introduce pull-request checks and protect main. No website content, booking provider, DNS, form delivery or SEO changes.

Workflow: branch → pull request → Site checks → review Netlify preview when available → merge → live check. Site checks runs existing isolated suites, authored JavaScript syntax checks and exact-case local HTML href/src references on six active pages. Legacy booking markup is excluded due to documented pre-existing issues; it remains linked and is not removed. Browser behavior, external links, CSS URLs and inbox delivery are not certified by this static check.

Acceptance: all checks pass locally and in GitHub Actions; main requires a pull request and Site checks, blocks force-push/deletion, and applies to administrators. No mandatory second-person approval for this solo-owner repository. Netlify preview availability must be checked independently.
