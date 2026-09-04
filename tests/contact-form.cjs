// Run: node tests/contact-form.cjs — isolated mocks; never sends a request.
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'javascript/app.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'html/contact.html'), 'utf8');

function setup(options = {}) {
  const values = new Map(Object.entries({
    'form-name': 'contact', 'bot-field': '', name: 'Local test',
    email: 'test@example.invalid', number: '+1 (714) 000-0000',
    carDetails: 'Test vehicle', hearAbout: '', message: '<test> & = +',
  }));
  if (options.bot) values.set('bot-field', 'spam');
  const status = { textContent: '' };
  const button = { disabled: false };
  const attributes = {};
  let handler;
  let timer;
  const calls = [];
  const analytics = [];
  const form = {
    querySelector: () => button,
    reportValidity: () => options.valid !== false,
    setAttribute: (key, value) => { attributes[key] = value; },
    addEventListener: (name, callback) => { handler = callback; },
    reset: () => { throw new Error('Input must never be discarded'); },
  };
  class Controller {
    constructor() { this.signal = { aborted: false }; }
    abort() { this.signal.aborted = true; if (this.signal.onabort) this.signal.onabort(); }
  }
  const context = {
    document: { querySelector: () => form, getElementById: () => status },
    location: { protocol: 'https:', hostname: options.host || 'doubleadetailing.netlify.app' },
    FormData: class extends Map { constructor() { super(values); } },
    URLSearchParams, AbortController: Controller,
    setTimeout: callback => { timer = callback; return 1; },
    clearTimeout: () => {},
    fetch: (url, init) => {
      calls.push({ url, init });
      return options.respond ? options.respond(init) : Promise.resolve({ status: 200, redirected: false });
    },
    daAnalytics: { track: (name, properties) => analytics.push({ name, properties }) },
  };
  context.window = context;
  vm.runInNewContext(source, context);
  return { values, status, button, attributes, calls,
    analytics, submit: () => handler({ preventDefault() {} }), timeout: () => timer() };
}

(async () => {
  assert(!/smtpjs|Email\.send|Password\s*:/i.test(source + html));
  assert(/name="contact"[^>]+method="POST"[^>]+action="\/"[^>]+data-netlify="true"/.test(html));
  assert(/name="form-name" value="contact"/.test(html));
  assert(/netlify-honeypot="bot-field"/.test(html));
  assert(/role="status" aria-live="polite"/.test(html));
  assert(!/jason\.almaraz808/.test(source + html));
  for (const options of [{ host: 'localhost' }, { host: 'unapproved.example' }, { valid: false }, { bot: true }]) {
    const test = setup(options);
    await test.submit();
    assert.equal(test.calls.length, 0);
  }
  for (const host of ['doubleadetailing.netlify.app', 'doubleadetailing.com', 'www.doubleadetailing.com']) {
    const test = setup({ host });
    const before = [...test.values];
    await test.submit();
    assert.equal(test.calls.length, 1);
    assert.equal(test.calls[0].url, '/');
    assert.equal(test.calls[0].init.method, 'POST');
    assert.equal(test.calls[0].init.redirect, 'error');
    assert.deepStrictEqual([...new URLSearchParams(test.calls[0].init.body)], before);
    assert.deepStrictEqual([...test.values], before);
    assert.match(test.status.textContent, /inquiry was submitted/);
    assert.equal(test.button.disabled, false);
    assert.equal(test.attributes['aria-busy'], 'false');
    assert.equal(test.analytics.length, 2);
    assert.equal(test.analytics[0].name, 'contact_submit_attempt');
    assert.equal(test.analytics[1].name, 'contact_submit_result');
    assert.equal(test.analytics[1].properties.result, 'unknown');
  }
  for (const response of [{ status: 400 }, { status: 500 }, { status: 204 }, { status: 200, redirected: true }]) {
    const test = setup({ respond: () => Promise.resolve(response) });
    await test.submit();
    assert.match(test.status.textContent, /could not confirm/);
    assert.equal(test.values.get('message'), '<test> & = +');
    assert.equal(test.button.disabled, false);
  }
  const offline = setup({ respond: () => Promise.reject(new Error('offline')) });
  await offline.submit();
  assert.match(offline.status.textContent, /whether your inquiry was received/);
  let resolve;
  const pending = setup({ respond: () => new Promise(done => { resolve = done; }) });
  const first = pending.submit();
  assert.equal(pending.button.disabled, true);
  assert.equal(pending.attributes['aria-busy'], 'true');
  await pending.submit();
  assert.equal(pending.calls.length, 1);
  pending.values.set('message', 'Edited during request');
  resolve({ status: 200, redirected: false });
  await first;
  assert.equal(pending.values.get('message'), 'Edited during request');
  const timeout = setup({ respond: init => new Promise((resolve, reject) => {
    init.signal.onabort = () => reject(new Error('aborted'));
  }) });
  const waiting = timeout.submit();
  timeout.timeout();
  await waiting;
  assert.match(timeout.status.textContent, /whether your inquiry was received/);
  assert.equal(timeout.button.disabled, false);
  assert.equal(timeout.calls.length, 1);
  console.log('PASS: markup, credential removal, local/invalid/spam guard, encoding, acknowledgment, errors, timeout, duplicate prevention and input preservation.');
})().catch(error => { console.error(error); process.exitCode = 1; });
