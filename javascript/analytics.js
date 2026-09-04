(() => {
  'use strict';

  const measurementId = 'G-9N49QPVB24';
  const preferenceKey = 'da_analytics_consent_v1';
  const approvedHosts = new Set([
    'doubleadetailing.netlify.app',
    'doubleadetailing.com',
    'www.doubleadetailing.com',
  ]);
  const production = location.protocol === 'https:' && approvedHosts.has(location.hostname);
  let enabled = false;
  let loaded = false;
  let panel;

  function preference() {
    try { return localStorage.getItem(preferenceKey); } catch (_) { return null; }
  }

  function savePreference(value) {
    try { localStorage.setItem(preferenceKey, value); } catch (_) { /* Choice applies for this page only. */ }
  }

  function pagePath() {
    const path = location.pathname.replace(/\/index\.html$/, '/') || '/';
    const known = new Set([
      '/', '/html/pricing.html', '/html/gallery.html', '/html/aboutus.html',
      '/html/contact.html', '/html/faq.html',
    ]);
    return known.has(path) ? path : '/';
  }

  function gtag() {
    window.dataLayer.push(arguments);
  }

  function loadAnalytics() {
    enabled = true;
    if (!production || loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    gtag('js', new Date());
    gtag('config', measurementId, {
      page_path: pagePath(),
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.dataset.daAnalytics = 'true';
    document.head.append(script);
  }

  function disableAnalytics() {
    enabled = false;
    if (loaded && window.dataLayer) {
      gtag('consent', 'update', { analytics_storage: 'denied' });
    }
  }

  function track(name, properties = {}) {
    if (!enabled || !loaded || !window.dataLayer) return;
    try {
      gtag('event', name, { page_path: pagePath(), ...properties });
    } catch (_) { /* Measurement must never interrupt the visitor. */ }
  }

  window.daAnalytics = Object.freeze({ track });

  function placement(anchor, path) {
    if (path.some(node => node && node.tagName === 'SITE-HEADER')) return 'header';
    if (anchor.closest('.site-nav-fallback')) return 'fallback';
    if (anchor.closest('footer')) return 'footer';
    if (anchor.closest('#sticky-cta')) return 'sticky';
    if (anchor.closest('.hero, .hero-buttons')) return 'hero';
    if (anchor.closest('.step')) return 'process';
    if (anchor.closest('.menu-item, .package-card')) return 'package';
    if (anchor.closest('.final-cta, .about-cta, .gallery-cta, .number')) return 'final';
    return 'body';
  }

  document.addEventListener('click', event => {
    const path = event.composedPath ? event.composedPath() : [event.target];
    const anchor = path.find(node => node && node.tagName === 'A');
    if (!anchor) return;
    const href = anchor.getAttribute('href') || '';
    const where = placement(anchor, path);
    if (/^https:\/\/DoubleADetailing\.as\.me\/?$/i.test(href)) {
      const card = anchor.closest('.menu-item, .package-card');
      const heading = card && card.querySelector('h3');
      const properties = { placement: where, booking_provider: 'acuity' };
      if (heading) properties.package_key = heading.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
      track('book_now_click', properties);
    } else if (href.startsWith('tel:') || href.startsWith('mailto:')) {
      track('contact_click', { method: href.startsWith('tel:') ? 'phone' : 'email', placement: where });
    }
  }, true);

  function closePanel() {
    if (panel) panel.hidden = true;
  }

  function choose(value) {
    savePreference(value);
    if (value === 'accepted') loadAnalytics(); else disableAnalytics();
    closePanel();
    renderChoicesButton();
  }

  function showPanel() {
    if (!panel) return;
    panel.hidden = false;
    const selected = preference() === 'accepted' ? panel.querySelector('.analytics-consent__decline') : panel.querySelector('.analytics-consent__accept');
    selected.focus();
  }

  function renderChoicesButton() {
    if (document.querySelector('.analytics-choices')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'analytics-choices';
    button.textContent = 'Privacy choices';
    button.addEventListener('click', showPanel);
    document.body.append(button);
  }

  function renderConsent() {
    panel = document.createElement('section');
    panel.className = 'analytics-consent';
    panel.setAttribute('aria-label', 'Analytics privacy choices');
    panel.innerHTML = '<h2>Optional website analytics</h2><p>Allow anonymous usage measurement to help us improve the site. We do not send your contact-form entries to Google.</p><div class="analytics-consent__actions"><button class="analytics-consent__accept" type="button">Accept analytics</button><button class="analytics-consent__decline" type="button">Decline</button></div>';
    panel.querySelector('.analytics-consent__accept').addEventListener('click', () => choose('accepted'));
    panel.querySelector('.analytics-consent__decline').addEventListener('click', () => choose('declined'));
    document.body.append(panel);
    const saved = preference();
    if (saved === 'accepted') { loadAnalytics(); closePanel(); renderChoicesButton(); }
    else if (saved === 'declined') { disableAnalytics(); closePanel(); renderChoicesButton(); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderConsent, { once: true });
  else renderConsent();
})();
