# Double A Detailing Website

This repository contains the static site files for Double A Detailing.

## Structure
- `index.html` – site homepage
- `html/` – secondary pages (about, contact, pricing, etc.)
- `css/` – stylesheets
- `images/` – image and video assets
- `javascript/` – site scripts

## Notes
The repo is kept in sync with the deployed Netlify output.

## Safe updates

Create a branch and open a pull request. GitHub's **Site checks** runs the three existing regression suites, JavaScript syntax checks, and local link/asset checks. Run `node tests/contact-form.cjs`, `node tests/analytics.cjs`, `node tests/seo.cjs`, and `node tests/local-links.cjs` locally. New assets must be added to Git before the link check.

Review changed pages on phone and desktop in the Netlify deploy preview when available, then merge after checks pass. Confirm the live website after deployment. The static checks do not test browser interactions, email receipt or completed bookings. See [production checks](docs/specs/production-checks.md).
