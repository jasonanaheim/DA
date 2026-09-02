class SiteHeader extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;

    const basePath = this.getAttribute('base-path') || '';
    const activePage = this.getAttribute('active') || '';
    const solidHeader = this.hasAttribute('solid');
    const pageLinks = [
      ['pricing', 'Pricing', `${basePath}html/pricing.html`],
      ['gallery', 'Gallery', `${basePath}html/gallery.html`],
      ['about', 'About', `${basePath}html/aboutus.html`],
      ['contact', 'Contact', `${basePath}html/contact.html`],
      ['faq', 'FAQ', `${basePath}html/faq.html`],
    ];

    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `
      <style>
        :host {
          --header-blue: #25a3ed;
          --header-deep-blue: #011c39;
          --header-cta: #2f7cff;
          display: block;
          font-family: "Montserrat", sans-serif;
        }

        * { box-sizing: border-box; }
        a { color: inherit; text-decoration: none; }
        ul { list-style: none; margin: 0; padding: 0; }

        .site-header {
          position: fixed;
          inset: 0 0 auto;
          z-index: 1000;
        }

        .contact-bar {
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          padding: 0 10%;
          background: var(--header-blue);
          color: #fff;
          font-family: "Open Sans", sans-serif;
          font-size: 12px;
        }

        .main-nav {
          position: relative;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 8% 0 12%;
          background: ${solidHeader ? '#fff' : 'transparent'};
          transition: background 160ms ease, box-shadow 160ms ease;
        }

        .site-header.scrolled .main-nav,
        .site-header.open .main-nav {
          background: #fff;
          box-shadow: 0 8px 24px rgba(1, 28, 57, 0.1);
        }

        .logo {
          position: relative;
          z-index: 3;
          display: block;
          width: 200px;
        }

        .logo img { display: block; width: 100%; height: auto; }

        .nav-links {
          display: flex;
          align-items: center;
          gap: clamp(18px, 2.5vw, 40px);
        }

        .nav-link {
          display: block;
          padding: 12px 2px 9px;
          border-bottom: 2px solid transparent;
          color: #111827;
          font-size: 16px;
          font-weight: 600;
        }

        .nav-link:hover,
        .nav-link:focus-visible,
        .nav-link.active {
          border-bottom-color: #db2b39;
          outline: none;
        }

        .book-now {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 10px 24px;
          border-radius: 999px;
          background: linear-gradient(135deg, #3a7bff, #2aa8ff);
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          box-shadow: 0 10px 20px rgba(34, 96, 255, 0.28);
          transition: transform 160ms ease, box-shadow 160ms ease;
        }

        .book-now:hover,
        .book-now:focus-visible {
          transform: translateY(-1px);
          box-shadow: 0 14px 26px rgba(34, 96, 255, 0.34);
          outline: none;
        }

        .menu-button {
          display: none;
          position: relative;
          z-index: 3;
          width: 48px;
          height: 48px;
          padding: 10px;
          border: 0;
          background: transparent;
          cursor: pointer;
        }

        .menu-line {
          position: absolute;
          left: 10px;
          width: 28px;
          height: 3px;
          border-radius: 3px;
          background: #111827;
          transition: transform 220ms ease, opacity 180ms ease;
        }

        .menu-line:nth-child(1) { top: 14px; }
        .menu-line:nth-child(2) { top: 22px; }
        .menu-line:nth-child(3) { top: 30px; }

        .site-header.open .menu-line:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .site-header.open .menu-line:nth-child(2) { opacity: 0; }
        .site-header.open .menu-line:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

        @media (max-width: 720px) {
          .contact-bar { display: none; }

          .main-nav {
            height: 60px;
            padding: 0 14px 0 22px;
            background: #fff;
            box-shadow: 0 8px 24px rgba(1, 28, 57, 0.1);
          }

          .logo { width: 168px; }
          .menu-button { display: block; }

          .nav-links {
            position: fixed;
            inset: 60px 0 0;
            z-index: 2;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 8px;
            padding: 32px 24px max(32px, env(safe-area-inset-bottom));
            background: linear-gradient(160deg, rgba(1, 28, 57, 0.985), rgba(13, 83, 124, 0.985));
            opacity: 0;
            visibility: hidden;
            transform: translateY(-12px);
            pointer-events: none;
            transition: opacity 220ms ease, transform 220ms ease, visibility 220ms ease;
          }

          .site-header.open .nav-links {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
            pointer-events: auto;
          }

          .nav-links li { width: min(100%, 360px); }

          .nav-link,
          .book-now {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            min-height: 52px;
            margin: 0;
            padding: 10px 20px;
            color: #fff;
            font-size: 20px;
            text-shadow: none;
          }

          .nav-link,
          .nav-link:hover,
          .nav-link:focus-visible,
          .nav-link.active { border: 0; }

          .book-now { margin-top: 8px; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { transition-duration: 0.01ms !important; }
        }
      </style>

      <header class="site-header">
        <div class="contact-bar">
          <span aria-hidden="true">✉</span>
          <a href="mailto:doubleadetailing@gmail.com">doubleadetailing@gmail.com</a>
          <span aria-hidden="true">|</span>
          <span aria-hidden="true">☎</span>
          <a href="tel:7144780556">714-478-0556</a>
        </div>
        <nav class="main-nav" aria-label="Primary navigation">
          <a class="logo" href="${basePath}index.html" aria-label="Double A Detailing home">
            <img src="${basePath}images/update - double a detailing logo.png" alt="Double A Detailing">
          </a>
          <ul class="nav-links" id="site-navigation">
            ${pageLinks.map(([key, label, href]) => `
              <li><a class="nav-link${activePage === key ? ' active' : ''}" href="${href}"${activePage === key ? ' aria-current="page"' : ''}>${label}</a></li>
            `).join('')}
            <li><a class="book-now" href="https://DoubleADetailing.as.me/">Book Now</a></li>
          </ul>
          <button class="menu-button" type="button" aria-label="Open navigation menu" aria-controls="site-navigation" aria-expanded="false">
            <span class="menu-line"></span>
            <span class="menu-line"></span>
            <span class="menu-line"></span>
          </button>
        </nav>
      </header>
    `;

    this.header = root.querySelector('.site-header');
    this.menuButton = root.querySelector('.menu-button');
    this.navLinks = root.querySelector('.nav-links');
    this.handleScroll = () => this.header.classList.toggle('scrolled', window.scrollY > 1);
    this.handleKeydown = (event) => {
      if (event.key === 'Escape' && this.header.classList.contains('open')) {
        this.closeMenu(true);
      }
    };

    this.menuButton.addEventListener('click', () => {
      this.header.classList.contains('open') ? this.closeMenu() : this.openMenu();
    });
    this.navLinks.addEventListener('click', (event) => {
      if (event.target.closest('a')) this.closeMenu();
    });
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    document.addEventListener('keydown', this.handleKeydown);
    this.handleScroll();
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('keydown', this.handleKeydown);
    document.body.classList.remove('nav-open');
    document.body.style.overflow = this.previousBodyOverflow || '';
  }

  openMenu() {
    this.previousBodyOverflow = document.body.style.overflow;
    this.header.classList.add('open');
    this.menuButton.setAttribute('aria-expanded', 'true');
    this.menuButton.setAttribute('aria-label', 'Close navigation menu');
    document.body.classList.add('nav-open');
    document.body.style.overflow = 'hidden';
  }

  closeMenu(restoreFocus = false) {
    this.header.classList.remove('open');
    this.menuButton.setAttribute('aria-expanded', 'false');
    this.menuButton.setAttribute('aria-label', 'Open navigation menu');
    document.body.classList.remove('nav-open');
    document.body.style.overflow = this.previousBodyOverflow || '';
    if (restoreFocus) this.menuButton.focus();
  }
}

if (!customElements.get('site-header')) {
  customElements.define('site-header', SiteHeader);
}
