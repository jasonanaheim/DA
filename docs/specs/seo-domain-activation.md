# Domain SEO activation — prepared, not active

Do not copy these blocks into production until the domain transfer, DNS, HTTPS and chosen primary-host policy are verified. Current HTML intentionally has no canonical or og:url/image pointing to the pending domain. Text-only social metadata is prepared; complete social previews remain pending.

## Activation gate

1. Confirm `https://doubleadetailing.com` is the final primary host (non-www is the proposed choice, not a verified Netlify setting). If www is chosen instead, replace the host consistently in every block below before activation.
2. Verify that the primary host serves this Netlify project's current pages with valid HTTPS. Confirm the behavior of www and the Netlify alias; configure redirects only with owner approval. Do not redirect the form POST endpoint incidentally.
3. Use `/` as the proposed Home canonical. Keep existing /index.html links working; no route rewrite is included here.
4. Add the relevant head block below to each of the six marketing pages. These tags supplement, not duplicate, existing social title/description tags.
5. Create root `sitemap.xml` and `robots.txt` using the prepared contents below. No timestamps are guessed. Do not add the legacy booking route without its lifecycle/indexing decision. Sitemap exclusion is NOT noindex.
6. Add `"url": "https://doubleadetailing.com/"` and `"logo": "https://doubleadetailing.com/images/update%20-%20double%20a%20detailing%20logo.png"` to the existing homepage Organization JSON-LD after confirming the asset. Do not add an address, fixed hours, ratings or prices.
7. Run local tests (update the preparation-only no-canonical assertion for the activated state), inspect parsed metadata/JSON/XML, verify each canonical and image URL returns the intended content, then obtain approval to deploy.
8. After deployment verify source HTML, robots/sitemap responses, primary/alias redirects, a missing route's 404 response, and no unintended noindex/X-Robots-Tag. Test the contact form's same-origin transport without sending an inquiry unless authorized. Preview social sharing; different platforms may crop the existing wide logo.
9. Verify Search Console ownership and submit the sitemap only with owner authorization/access. Do not promise indexing, rich results, or rankings.

## Existing social asset

Reuse `images/update - double a detailing logo.png`, the existing full-color logo. No new artwork or photo claims. Verify its dimensions and live response before publishing the tags. A dedicated social image can be a separate future change.

## Per-page head additions

### index.html

```html
<link rel="canonical" href="https://doubleadetailing.com/">
<meta property="og:url" content="https://doubleadetailing.com/">
<meta property="og:image" content="https://doubleadetailing.com/images/update%20-%20double%20a%20detailing%20logo.png">
<meta property="og:image:alt" content="Double A Detailing logo">
<meta name="twitter:image" content="https://doubleadetailing.com/images/update%20-%20double%20a%20detailing%20logo.png">
<meta name="twitter:image:alt" content="Double A Detailing logo">
```

### html/pricing.html

```html
<link rel="canonical" href="https://doubleadetailing.com/html/pricing.html">
<meta property="og:url" content="https://doubleadetailing.com/html/pricing.html">
<meta property="og:image" content="https://doubleadetailing.com/images/update%20-%20double%20a%20detailing%20logo.png">
<meta property="og:image:alt" content="Double A Detailing logo">
<meta name="twitter:image" content="https://doubleadetailing.com/images/update%20-%20double%20a%20detailing%20logo.png">
<meta name="twitter:image:alt" content="Double A Detailing logo">
```

### html/gallery.html

```html
<link rel="canonical" href="https://doubleadetailing.com/html/gallery.html">
<meta property="og:url" content="https://doubleadetailing.com/html/gallery.html">
<meta property="og:image" content="https://doubleadetailing.com/images/update%20-%20double%20a%20detailing%20logo.png">
<meta property="og:image:alt" content="Double A Detailing logo">
<meta name="twitter:image" content="https://doubleadetailing.com/images/update%20-%20double%20a%20detailing%20logo.png">
<meta name="twitter:image:alt" content="Double A Detailing logo">
```

### html/aboutus.html

```html
<link rel="canonical" href="https://doubleadetailing.com/html/aboutus.html">
<meta property="og:url" content="https://doubleadetailing.com/html/aboutus.html">
<meta property="og:image" content="https://doubleadetailing.com/images/update%20-%20double%20a%20detailing%20logo.png">
<meta property="og:image:alt" content="Double A Detailing logo">
<meta name="twitter:image" content="https://doubleadetailing.com/images/update%20-%20double%20a%20detailing%20logo.png">
<meta name="twitter:image:alt" content="Double A Detailing logo">
```

### html/contact.html

```html
<link rel="canonical" href="https://doubleadetailing.com/html/contact.html">
<meta property="og:url" content="https://doubleadetailing.com/html/contact.html">
<meta property="og:image" content="https://doubleadetailing.com/images/update%20-%20double%20a%20detailing%20logo.png">
<meta property="og:image:alt" content="Double A Detailing logo">
<meta name="twitter:image" content="https://doubleadetailing.com/images/update%20-%20double%20a%20detailing%20logo.png">
<meta name="twitter:image:alt" content="Double A Detailing logo">
```

### html/faq.html

```html
<link rel="canonical" href="https://doubleadetailing.com/html/faq.html">
<meta property="og:url" content="https://doubleadetailing.com/html/faq.html">
<meta property="og:image" content="https://doubleadetailing.com/images/update%20-%20double%20a%20detailing%20logo.png">
<meta property="og:image:alt" content="Double A Detailing logo">
<meta name="twitter:image" content="https://doubleadetailing.com/images/update%20-%20double%20a%20detailing%20logo.png">
<meta name="twitter:image:alt" content="Double A Detailing logo">
```

## Root sitemap.xml — create only at activation

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://doubleadetailing.com/</loc></url>
  <url><loc>https://doubleadetailing.com/html/pricing.html</loc></url>
  <url><loc>https://doubleadetailing.com/html/gallery.html</loc></url>
  <url><loc>https://doubleadetailing.com/html/aboutus.html</loc></url>
  <url><loc>https://doubleadetailing.com/html/contact.html</loc></url>
  <url><loc>https://doubleadetailing.com/html/faq.html</loc></url>
</urlset>
```

## Root robots.txt — create only at activation

```text
User-agent: *
Allow: /

Sitemap: https://doubleadetailing.com/sitemap.xml
```

This draft applies to production, not a staging privacy mechanism. robots.txt is not access control and must not be used to protect private addresses or credentials. No host configuration or blanket crawler block is introduced.

## Status

Prepared locally only. Domain ownership/transfer completion, final host policy, redirects, HTTPS, Search Console verification, live metadata, and full social previews: **NOT VERIFIED**. Existing Acuity URLs and embed remain unchanged.
