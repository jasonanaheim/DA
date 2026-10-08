// Exact-case paths use the Git index, including on case-insensitive macOS.
const assert = require('assert').strict;
const fs = require('fs');
const path = require('path').posix;
const { execFileSync } = require('child_process');
const tracked = new Set(execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0'));
const pages = ['index.html', ...['pricing', 'gallery', 'aboutus', 'contact', 'faq'].map(name => `html/${name}.html`)];
const failures = [];
let checked = 0;
for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  for (const match of html.matchAll(/\b(?:href|src)\s*=\s*["']([^"']*)["']/gi)) {
    const value = match[1];
    if (!value || /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(value)) continue;
    const pathname = decodeURIComponent(value.split(/[?#]/)[0]);
    if (!pathname) continue;
    let target = path.normalize(pathname.startsWith('/') ? pathname.slice(1) : path.join(path.dirname(page), pathname));
    if (pathname.endsWith('/')) target = path.join(target, 'index.html');
    checked++;
    if (!tracked.has(target)) failures.push(`${page}: ${value} → ${target}`);
  }
}
assert.equal(failures.length, 0, `Missing or incorrectly capitalized paths:\n${failures.join('\n')}`);
console.log(`PASS: ${checked} local references across ${pages.length} active pages.`);
