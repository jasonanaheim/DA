const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const source = fs.readFileSync('javascript/analytics.js', 'utf8');
new Function(source);

const pages = ['index.html', 'html/pricing.html', 'html/gallery.html',
  'html/aboutus.html', 'html/contact.html', 'html/faq.html'];
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  assert(html.includes('analytics.css?v=20260903-1'), file + ': consent CSS');
  assert(html.includes('analytics.js?v=20260903-1'), file + ': analytics script');
}
assert(!fs.readFileSync('html/booknow.html', 'utf8').includes('analytics.js'), 'legacy route excluded');
assert(!/FormData|querySelector\([^)]*(?:email|number|carDetails|hearAbout|message)/.test(source),
  'analytics does not inspect form fields');

function run(saved) {
  const listeners = {};
  const store = new Map(saved ? [['da_analytics_consent_v1', saved]] : []);
  const appendedScripts = [];
  const elements = [];
  function button(className) {
    return { className, listeners: {}, addEventListener(type, fn) { this.listeners[type] = fn; }, focus() {} };
  }
  function element(tag) {
    const el = {
      tagName: tag.toUpperCase(), hidden: false, className: '', dataset: {}, listeners: {},
      setAttribute() {}, addEventListener(type, fn) { this.listeners[type] = fn; }, focus() {},
    };
    Object.defineProperty(el, 'innerHTML', { set() {
      el.accept = button('analytics-consent__accept');
      el.decline = button('analytics-consent__decline');
    }});
    el.querySelector = selector => selector.includes('accept') ? el.accept : el.decline;
    return el;
  }
  const document = {
    readyState: 'loading', head: { append(node) { appendedScripts.push(node); } },
    body: { append(node) { elements.push(node); } },
    createElement: element,
    querySelector(selector) { return selector === '.analytics-choices' ? elements.find(x => x.className === 'analytics-choices') : null; },
    addEventListener(type, fn) { listeners[type] = fn; },
  };
  const context = {
    document,
    location: { protocol: 'https:', hostname: 'doubleadetailing.netlify.app', pathname: '/' },
    localStorage: { getItem: key => store.get(key) || null, setItem: (key, value) => store.set(key, value) },
    console,
  };
  context.window = context;
  vm.runInNewContext(source, context);
  listeners.DOMContentLoaded();
  return { context, store, elements, appendedScripts, listeners };
}

const undecided = run();
assert.strictEqual(undecided.appendedScripts.length, 0, 'no Google script before consent');
assert.strictEqual(undecided.context.dataLayer, undefined, 'no data layer before consent');
const panel = undecided.elements.find(x => x.className === 'analytics-consent');
panel.accept.listeners.click();
assert.strictEqual(undecided.store.get('da_analytics_consent_v1'), 'accepted');
assert.strictEqual(undecided.appendedScripts.length, 1, 'one Google script after acceptance');
assert.strictEqual(undecided.appendedScripts[0].src,
  'https://www.googletagmanager.com/gtag/js?id=G-9N49QPVB24');
assert.strictEqual(undecided.context.dataLayer.length, 3, 'consent, js and config only');
undecided.context.daAnalytics.track('book_now_click', { placement: 'hero', booking_provider: 'acuity' });
assert.strictEqual(undecided.context.dataLayer.length, 4);
const bookingAnchor = {
  tagName: 'A',
  getAttribute: () => 'https://DoubleADetailing.as.me/',
  closest: () => null,
};
undecided.listeners.click({ composedPath: () => [bookingAnchor, { tagName: 'SITE-HEADER' }] });
const bookingEvent = undecided.context.dataLayer[4];
assert.strictEqual(bookingEvent[1], 'book_now_click');
assert.deepStrictEqual(JSON.parse(JSON.stringify(bookingEvent[2])), {
  page_path: '/', placement: 'header', booking_provider: 'acuity',
});

const declined = run('declined');
assert.strictEqual(declined.appendedScripts.length, 0, 'saved decline stays off');
declined.context.daAnalytics.track('contact_click', { method: 'phone', placement: 'header' });
assert.strictEqual(declined.context.dataLayer, undefined, 'declined actions are not queued');

const accepted = run('accepted');
assert.strictEqual(accepted.appendedScripts.length, 1, 'saved acceptance loads once');
assert(accepted.elements.some(x => x.className === 'analytics-choices'), 'preference can be reopened');

console.log('PASS: consent gating, saved choices, one-time GA4 load, bounded shared markup.');
