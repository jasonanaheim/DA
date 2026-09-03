const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const pages = ['index.html', 'html/pricing.html', 'html/gallery.html',
  'html/aboutus.html', 'html/contact.html', 'html/faq.html'];
const titles = new Set();
const descriptions = new Set();

// Preparation-state assertions: revise intentionally when domain SEO is activated.
for (const file of pages) {
  const html = read(file);
  const head = html.match(/<head>([\s\S]*?)<\/head>/i)[1];
  const titleMatches = [...head.matchAll(/<title>(.*?)<\/title>/g)];
  assert.strictEqual(titleMatches.length, 1, file + ': one title');
  const title = titleMatches[0][1].trim();
  const metas = [...head.matchAll(/<meta\s+(?:name|property)="([^"]+)"\s+content="([^"]*)"\s*\/?>/g)];
  const meta = {};
  for (const [, key, value] of metas) {
    assert(!(key in meta), file + ': duplicate ' + key);
    meta[key] = value;
  }
  assert(meta.description, file + ': description');
  assert(!titles.has(title), file + ': unique title');
  assert(!descriptions.has(meta.description), file + ': unique description');
  titles.add(title);
  descriptions.add(meta.description);
  assert.strictEqual(meta['og:title'], title);
  assert.strictEqual(meta['twitter:title'], title);
  assert.strictEqual(meta['og:description'], meta.description);
  assert.strictEqual(meta['twitter:description'], meta.description);
  assert.strictEqual(meta['og:type'], 'website');
  assert.strictEqual(meta['og:site_name'], 'Double A Detailing');
  assert.strictEqual(meta['twitter:card'], 'summary');
  assert(!meta['og:url'] && !meta['og:image'] && !meta['twitter:image']);
  assert(!/rel=["']canonical["']/i.test(head), file + ': domain activation is gated');
  assert(!/doubleadetailing\.com|noindex|localhost|file:\/\//i.test(head));
  assert.strictEqual((html.match(/<h1\b/g) || []).length, 1);
}

const home = read('index.html');
const blocks = [...home.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
assert.strictEqual(blocks.length, 1);
assert.deepStrictEqual(JSON.parse(blocks[0][1]), {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Double A Detailing',
  description: 'Mobile car wash and auto detailing in Orange County, California.',
  telephone: '+1-714-478-0556',
  email: 'doubleadetailing@gmail.com',
  areaServed: { '@type': 'AdministrativeArea', name: 'Orange County, California' },
});

const legacy = read('html/booknow.html');
assert(!/Hampshire/i.test(legacy), 'private street address removed');
assert(legacy.includes('https://app.acuityscheduling.com/schedule.php?owner=21786409'));
assert(!fs.existsSync(path.join(root, 'sitemap.xml')), 'sitemap activation is gated');
assert(!fs.existsSync(path.join(root, 'robots.txt')), 'robots activation is gated');
const draft = read('docs/specs/seo-domain-activation.md');
const locs = [...draft.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
assert.deepStrictEqual(locs, pages.map(file =>
  'https://doubleadetailing.com' + (file === 'index.html' ? '/' : '/' + file)));
assert(fs.existsSync(path.join(root, 'images/update - double a detailing logo.png')));
console.log('PASS: six page metadata sets, approved JSON-LD, privacy removal, staged domain artifacts.');
