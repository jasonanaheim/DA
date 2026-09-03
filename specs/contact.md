# Contact

Approved wording update: rename the inquiry field label from “Contact Number” to “Phone Number” and match its placeholder. Preserve `id`/`name="number"`, telephone input type, required validation and Netlify payload. Verify with the existing contact-form tests.

Baseline: 2026-09-02; source `html/contact.html`, `css/stylecontact.css`, `javascript/app.js`, SMTPJS and shared header.

Implementation update: [Netlify contact rollout](../docs/specs/netlify-contact-rollout.md) supersedes the SMTP baseline below. The local form now uses Netlify-compatible markup and guarded AJAX with accessible status and preserved input. SMTPJS and credentials were removed from current source. Owner approved `jason.almaraz808@gmail.com` for dashboard notifications; live delivery is not yet configured or verified. Public contact details remain unchanged.

## Purpose

Offer an inquiry channel for questions and business needs, not appointment scheduling.

## User goal

Contact the business or clarify a service before booking externally.

## Business goal

Recover leads who need help deciding while keeping Book Now primary.

## Current implementation

Visual update September 2, 2026: [Contact/FAQ alignment](../docs/specs/contact-faq-design.md) replaces the legacy visual baseline below. Contact now uses the shared support-page styling and newer footer, preserves its Netlify form, and corrects the Inquiry heading typo. See [brand/UI guide](../BRAND_GUIDE.md) for maintenance rules.

Legacy photo hero, “Enrquiry Form,” contact information (Anaheim, California; 714-478-0556; doubleadetailing@gmail.com), call banner, and old footer with hours/social placeholders. The public contact info is largely plain text; the shared header has actionable phone/email links.

POST form has no action endpoint or Netlify form attributes. app.js prevents default submission, reads values, resets the form immediately, and calls SMTPJS Email.send(). Hard-coded SMTP authentication and a different personal recipient are in browser-delivered source. No credential value is reproduced here. It displays a success alert for any resolved response without checking success, and has no rejection handling, pending state, or server-side validation.

Actual email delivery is unverified and was not tested. No backend/function exists in this repository.

## Required content/sections

Preserve current inquiry intent and contact information until approved corrections. Fields:

| Field | Current type | Required |
| --- | --- | --- |
| Full Name | text | Yes |
| Email | text, not email | Yes |
| Contact Number | text, not tel | Yes |
| Year / Make / Model / Color | text | Yes |
| How did you hear about us? | text | No |
| Message | textarea | Yes |

Submit label is “send.” No booking date, payment, appointment availability, consent text, privacy policy link, or response-time promise is present.

## Primary CTA

Book Now via shared header/footer remains the primary site action. Send is the page's inquiry action; it must not imply a reservation. Calls/email are secondary support.

## Functional requirements

Baseline form implementation is documented, not endorsed as safe. An approved future repair must never expose SMTP credentials, falsely report success, or lose user input before confirmed delivery. Provider, recipient, validation/spam strategy, privacy/retention, and response expectations are TBD. Do not add them during documentation work or test by sending real personal data.

## Mobile requirements

Form and information column stack around <=991px; padding tightens <=580px. Name/email remain a flex row in current markup. Verify comfortable input widths, keyboard use, zoom, and readable contact information. Proposed input-type changes require scoped approval.

## Accessibility requirements

Existing labels reference input IDs and required attributes are present. Known gaps: text email/phone types, suppressed focus outlines, no accessible pending/error/success feedback, no field-level error strategy. Future authorized work must support keyboard focus, meaningful errors, and persistent form data.

## SEO requirements

Contact title exists; description is duplicated from FAQ/legacy booking. One H1. Local contact text is present, but source values and canonical host need confirmation. Old footer Home links and logo case are broken on case-sensitive hosting.

## Acceptance criteria

- Inquiry and external-booking purposes stay separate; no custom appointment form.
- Approved public contact details remain consistent with the shared header.
- Never test production email or credentials without explicit authorization.
- For an approved form repair: mock/test success and failure, retain input on failure, prevent duplicate submission, and verify accessible feedback.
- Document current unsafe delivery, broken footer links and placeholders as unresolved until repaired; no false “working form” claim.

## Out of scope

Credential rotation via external accounts, mail-provider migration, backend creation, copy changes, form redesign, analytics, response promises, and booking changes without separate approval.
