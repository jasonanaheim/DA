(() => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const status = document.getElementById('contact-status');
  const submit = form.querySelector('[type="submit"]');
  const approvedHosts = new Set([
    'doubleadetailing.netlify.app',
    'doubleadetailing.com',
    'www.doubleadetailing.com',
  ]);
  const hosted = location.protocol === 'https:' && approvedHosts.has(location.hostname);
  let pending = false;

  function announce(message) {
    status.textContent = message;
  }

  if (!hosted) {
    announce('Preview only: this form does not send inquiries here. Delivery must be tested on the configured Netlify site.');
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (pending || !form.reportValidity()) return;
    if (!hosted) {
      announce('Nothing was sent. This preview cannot deliver inquiries; your entries have been kept.');
      return;
    }

    const data = new FormData(form);
    if (data.get('bot-field')) {
      announce('Your inquiry could not be submitted. Please use the phone or email listed on this page.');
      return;
    }

    pending = true;
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    announce('Submitting your inquiry…');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
        signal: controller.signal,
        redirect: 'error',
      });

      if (response.status === 200 && !response.redirected) {
        announce('Your inquiry was submitted. This does not confirm a booking or email delivery. Your entries have been kept for reference.');
      } else {
        announce('We could not confirm your submission. Your entries have been kept. Please call or email us before trying again.');
      }
    } catch (error) {
      announce('We could not confirm whether your inquiry was received. Your entries have been kept. Please call or email us before trying again.');
    } finally {
      clearTimeout(timeout);
      pending = false;
      submit.disabled = false;
      form.setAttribute('aria-busy', 'false');
    }
  });
})();
