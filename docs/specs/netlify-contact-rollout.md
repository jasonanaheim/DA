# Netlify inquiry rollout

## Authorization and boundary

Owner confirmed `doubleadetailing.com` as the intended production domain, `doubleadetailing.netlify.app` as the existing Netlify site, and approved Netlify Forms with test email notifications to `jason.almaraz808@gmail.com`. This resolves the provider/recipient portion of D1 in contact-delivery.md. No deployment, account modification, live inquiry or booking is authorized by this local implementation.

## Small implementation delta

Reuse `html/contact.html`, `javascript/app.js` and `css/stylecontact.css`. Keep all six customer fields, public business contact details, layout and Acuity links. Replace SMTPJS with a static Netlify form named `contact`, hidden `form-name` input and hidden `bot-field` honeypot. Remove the credential-bearing script implementation and SMTPJS import. No SDK, backend, environment variables, secrets or recipient address in browser code.

Submit URL-encoded data via same-origin POST `/` on the three approved hosts: `doubleadetailing.netlify.app`, `doubleadetailing.com`, `www.doubleadetailing.com`, over HTTPS. Local/file previews display a non-delivery notice and send no request. Other preview hosts need explicit registration before delivery is enabled. Without JavaScript, the native POST uses Netlify's default acknowledgment after deployment; plain local HTTP hosting cannot handle that POST. Show a noscript explanation with direct contact alternatives.

Native validity must pass. Submitting disables duplicate requests and announces status; existing fields remain editable. Preserve all input in every result, including acceptance, so an edit made during a request is never lost. HTTP 200 without redirects represents submission acknowledgment only, not inbox delivery or an appointment. Other responses are unconfirmed. Network error or 15-second timeout produces unknown status with deliberate retry/call options; do not retry automatically. Honeypot-filled requests are not sent. Render feedback as text, never interpolate form values into HTML, URLs or logs. No client storage or analytics collection.

## Acceptance and verification

- NF-AC-01: existing fields/required flags and Acuity hrefs remain; static form is detectable and encodes `form-name=contact` plus the original field names and honeypot.
- NF-AC-02: no SMTP credential/settings or SMTPJS import remain in current application sources. Old Git history/live deployments still require owner revocation and replacement; do not rewrite history.
- NF-AC-03: invalid/local/honeypot submissions issue no request; pending state allows only one request.
- NF-AC-04: mocked 200, non-200, redirected, offline and timeout outcomes preserve every field, re-enable Send and announce truthful status. No result claims email delivery or a booking.
- NF-AC-05: keyboard validation, labels/status and mobile layout remain usable. No live submission is needed for local verification.
- NF-AC-06: production readiness requires Netlify form detection, dashboard recipient configuration, owner-approved live receipt test, credential revocation, privacy/retention decision and deployment approval. Local mocks cannot certify receipt.

Run JS syntax and whitespace checks, dependency-free mock tests, and local browser smoke at phone/desktop widths. Record exact results below before handoff.

## Netlify dashboard checklist — not performed

1. Verify the selected project serves `doubleadetailing.netlify.app`; do not create another project.
2. In Forms, enable form detection. Deploy these changes only with owner approval and verify a `contact` form appears.
3. Configure an email form-submission notification for `contact` to `jason.almaraz808@gmail.com`. This address is dashboard configuration, not a hidden HTML field. Netlify controls the notification sender.
4. Review Netlify spam filtering, account usage limits and retention/access policy before public launch; the honeypot is supplementary, not guaranteed spam prevention.
5. With explicit permission, send one labeled test and verify both the Forms dashboard record and recipient inbox. Test JS and native no-JS flows, then remove test records as separately authorized.
6. Confirm domain/DNS/HTTPS and host redirects separately. Canonicals/sitemap and analytics remain separate work; no DNS or SEO implementation is implied here.

Official references: [Forms setup](https://docs.netlify.com/manage/forms/setup/), [notifications](https://docs.netlify.com/manage/forms/notifications/). Reviewed September 2, 2026.

## Local verification result

September 2, 2026 — implemented, not deployed. Added `tests/contact-form.cjs` using only Node built-ins; no packages. `node tests/contact-form.cjs`, `node --check javascript/app.js` and `git diff --check` PASS. Mocks cover all NF-AC-03/04 result classes, URL encoding including punctuation, approved hosts, pending edits, duplicate prevention and credential/import absence. No real network transport is used by tests.

In-app browser PASS: native empty-form validation focuses Full Name; invalid email focuses Email; a valid local-only test displays “Nothing was sent” and preserves text. Contact document has no horizontal overflow at 320, 390 and 1280px. Mobile status/Send layout visually inspected; viewport reset and page reloaded to clear dummy inputs. Versioned Contact script URL avoids reusing the old SMTP handler from cache. Frontend skill used only to keep feedback consistent with existing styling, not to redesign.

NF-AC-06 remains NOT VERIFIED: dashboard configuration, hosted native/AJAX receipt, email notification, revocation, retention/privacy and deployment are pending. No live site, account settings, domain configuration, analytics, booking or production deployment was changed.
