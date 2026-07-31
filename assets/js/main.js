/* Kindred — shared site chrome.
   Nav + footer are injected here so the ten static pages can't drift apart. */

const ICONS = {
  logo: `<svg class="brand__mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="kg" x1="0" y1="0" x2="40" y2="40">
        <stop offset="0" stop-color="#8b6cff"/><stop offset=".55" stop-color="#6d47f5"/><stop offset="1" stop-color="#f5a623"/>
      </linearGradient>
    </defs>
    <path d="M20 3.2 34.5 9v11.4c0 8.3-5.8 14.4-14.5 17.4C11.3 34.8 5.5 28.7 5.5 20.4V9L20 3.2Z" fill="url(#kg)" opacity=".22"/>
    <path d="M20 3.2 34.5 9v11.4c0 8.3-5.8 14.4-14.5 17.4C11.3 34.8 5.5 28.7 5.5 20.4V9L20 3.2Z" stroke="url(#kg)" stroke-width="2.1" stroke-linejoin="round"/>
    <circle cx="20" cy="18.6" r="3.6" fill="url(#kg)"/>
    <path d="M12.4 28.2c1.1-4.1 4-6.2 7.6-6.2s6.5 2.1 7.6 6.2" stroke="url(#kg)" stroke-width="2.1" stroke-linecap="round"/>
  </svg>`,
  sun: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.4v2.2M12 19.4v2.2M4.2 12H2M22 12h-2.2M5.6 5.6 4 4M20 20l-1.6-1.6M18.4 5.6 20 4M4 20l1.6-1.6"/></svg>`,
  moon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 14.3A8.6 8.6 0 0 1 9.7 3.5a8.8 8.8 0 1 0 10.8 10.8Z"/></svg>`,
  burger: `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3.5 7h17M3.5 12h17M3.5 17h17"/></svg>`,
  apple: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.3 12.7c0-2.4 2-3.6 2.1-3.6-1.1-1.7-2.9-1.9-3.6-1.9-1.5-.2-3 .9-3.8.9s-2-.9-3.3-.9c-1.7 0-3.2 1-4.1 2.5-1.7 3-.4 7.5 1.3 10 .8 1.2 1.8 2.5 3.1 2.5 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.4-1-2.4-3.7ZM14 5.4c.7-.8 1.1-2 1-3.2-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.3Z"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l.1.1 9.3-9.3v-.2L3.7 2.9l-.1-.1Zm12.5 6.1L13.1 12l3 3 3.6-2c1-.6 1-1.5 0-2.1l-3.6-2.1Zm-2.4 3.5L4.4 21c.3.3.9.4 1.5 0l9.8-5.5-2-2Zm2-6.5L5.9 3c-.6-.3-1.2-.3-1.5 0l9.3 9.2 2-2Z"/></svg>`,
  check: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m4.5 12.5 5 5 10-11"/></svg>`,
  shield: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 2.6 20.5 6v6.4c0 5-3.4 8.7-8.5 10.4-5.1-1.7-8.5-5.4-8.5-10.4V6L12 2.6Z"/></svg>`,
  lock: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4.5" y="10.5" width="15" height="10.5" rx="2.4"/><path d="M8 10.5V7.6a4 4 0 0 1 8 0v2.9"/></svg>`,
  bolt: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M13.4 2.5 4.6 13.4h6.2l-1 8.1 8.8-10.9h-6.2l1-8.1Z"/></svg>`,
  star: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.8 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.6 6.2 20.7l1.1-6.5L2.6 9.6l6.5-.9L12 2.8Z"/></svg>`,
};

const SOCIALS = {
  bluesky: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.2C10.8 7.9 7.6 3.6 4.6 2.4 1.7 1.2.6 2.6.6 4.4c0 1.8 1 7.4 1.6 8.3.6.9 1.9 1.2 3.1 1-2 .3-3.7 1.2-1.4 4 2.5 3 3.4-.9 4-2.9.2-.7.4-1.4.5-1.9.1.5.3 1.2.5 1.9.6 2 1.5 5.9 4 2.9 2.3-2.8.6-3.7-1.4-4 1.2.2 2.5-.1 3.1-1 .6-.9 1.6-6.5 1.6-8.3 0-1.8-1.1-3.2-4-2C16.4 3.6 13.2 7.9 12 10.2Z"/></svg>`,
  youtube: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.2 7.2a2.9 2.9 0 0 0-2-2C18.4 4.7 12 4.7 12 4.7s-6.4 0-8.2.5a2.9 2.9 0 0 0-2 2C1.3 9 1.3 12 1.3 12s0 3 .5 4.8a2.9 2.9 0 0 0 2 2c1.8.5 8.2.5 8.2.5s6.4 0 8.2-.5a2.9 2.9 0 0 0 2-2c.5-1.8.5-4.8.5-4.8s0-3-.5-4.8ZM9.9 15.4V8.6l5.8 3.4-5.8 3.4Z"/></svg>`,
  instagram: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none"/></svg>`,
  github: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.8a10.2 10.2 0 0 0-3.2 19.9c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 2v2.9c0 .3.2.6.7.5A10.2 10.2 0 0 0 12 1.8Z"/></svg>`,
};

const NAV_LINKS = [
  ['index.html', 'Home'],
  ['plans.html', 'Plans'],
  ['about.html', 'About'],
  ['setup.html', 'Setup'],
  ['app.html', 'Live demo'],
  ['contact.html', 'Contact'],
];

function currentPage() {
  const file = location.pathname.split('/').pop();
  return file === '' ? 'index.html' : file;
}

function renderNav() {
  const host = document.querySelector('[data-nav]');
  if (!host) return;
  const here = currentPage();
  host.className = 'nav';
  host.innerHTML = `
    <div class="wrap nav__inner">
      <a class="brand" href="index.html" aria-label="Kindred home">
        ${ICONS.logo}
        <span>Kindred<small>Personal security</small></span>
      </a>
      <button class="icon-btn nav__burger" data-burger aria-label="Toggle menu" aria-expanded="false">${ICONS.burger}</button>
      <nav class="nav__links" data-menu>
        ${NAV_LINKS.map(([href, label]) =>
          `<a href="${href}"${href === here ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
        <a href="login.html" class="hide-lg">Log in</a>
      </nav>
      <div class="nav__actions">
        <button class="icon-btn" data-theme-toggle aria-label="Switch colour theme"></button>
        <a class="btn btn--ghost hide-sm" href="login.html">Log in</a>
        <a class="btn" href="register.html">Start free trial</a>
      </div>
    </div>`;

  host.querySelector('[data-burger]').addEventListener('click', (e) => {
    const menu = host.querySelector('[data-menu]');
    const open = menu.classList.toggle('open');
    e.currentTarget.setAttribute('aria-expanded', String(open));
  });
}

function renderFooter() {
  const host = document.querySelector('[data-footer]');
  if (!host) return;
  const cols = [
    ['Product', [['index.html', 'Overview'], ['plans.html', 'Plans & pricing'], ['app.html', 'Live demo'], ['setup.html', 'Setup guides']]],
    ['Company', [['about.html', 'About us'], ['contact.html', 'Contact'], ['setup.html', 'Help centre']]],
    ['Legal', [['terms.html', 'Terms of service'], ['privacy.html', 'Privacy policy'], ['privacy.html', 'Data retention']]],
  ];
  host.className = 'footer';
  host.innerHTML = `
    <div class="wrap">
      <div class="footer__grid">
        <div>
          <a class="brand" href="index.html">${ICONS.logo}<span>Kindred<small>Personal security</small></span></a>
          <p class="small muted mt-2" style="max-width:34ch">Live video, live location and one-tap SOS — shared only with the people you choose.</p>
          <div class="socials mt-2">
            <a href="#" aria-label="Bluesky">${SOCIALS.bluesky}</a>
            <a href="#" aria-label="YouTube">${SOCIALS.youtube}</a>
            <a href="#" aria-label="Instagram">${SOCIALS.instagram}</a>
            <a href="https://github.com/" aria-label="GitHub">${SOCIALS.github}</a>
          </div>
        </div>
        ${cols.map(([title, links]) => `
          <div>
            <h4>${title}</h4>
            <ul>${links.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul>
          </div>`).join('')}
      </div>
      <div class="footer__bottom">
        <span>© ${new Date().getFullYear()} Kindred Safety Labs — a fictional company.</span>
        <span>Made for the open web · No trackers · No ad SDKs</span>
      </div>
      <p class="demo-note">Kindred is an open-source demo project. It is not a real security service: there is no
      backend, no account is ever created, every person, quote, press mention and statistic on this site is invented
      for illustration, and nothing here should be relied on in an emergency.</p>
    </div>`;
}

/* ---------- theme ---------- */
function initTheme() {
  const stored = localStorage.getItem('kindred-theme');
  const theme = stored || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', theme);
  paintToggle(theme);

  document.querySelectorAll('[data-theme-toggle]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('kindred-theme', next);
      paintToggle(next);
    }));
}
function paintToggle(theme) {
  document.querySelectorAll('[data-theme-toggle]').forEach((b) => { b.innerHTML = theme === 'light' ? ICONS.moon : ICONS.sun; });
}

/* ---------- scroll reveal ---------- */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
  items.forEach((el, i) => { el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`; io.observe(el); });
}

/* ---------- tabs ---------- */
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach((group) => {
    const buttons = [...group.querySelectorAll('[role="tab"]')];
    buttons.forEach((btn) => btn.addEventListener('click', () => {
      buttons.forEach((b) => {
        const on = b === btn;
        b.setAttribute('aria-selected', String(on));
        document.getElementById(b.getAttribute('aria-controls')).hidden = !on;
      });
    }));
  });
}

/* ---------- demo forms: never submit anywhere ---------- */
function initDemoForms() {
  document.querySelectorAll('form[data-demo]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const box = form.querySelector('[data-demo-result]');
      if (box) {
        box.hidden = false;
        box.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
      form.querySelectorAll('input[type="password"]').forEach((i) => { i.value = ''; });
    });
  });
}

/* ---------- animated phone feed (marketing pages) ---------- */
function initPhoneScenes() {
  document.querySelectorAll('canvas[data-scene]').forEach((cv) => drawScene(cv, cv.dataset.scene));
}

/* A stylised, abstract "camera feed": moving light, horizon, drifting particles.
   Deliberately not a photo — the project ships zero third-party imagery. */
function drawScene(canvas, variant = 'street') {
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const resize = () => {
    const r = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, r.width * dpr);
    canvas.height = Math.max(1, r.height * dpr);
  };
  resize();
  window.addEventListener('resize', resize);

  const palettes = {
    street: ['#1b1442', '#2d1c63', '#f5a623'],
    park:   ['#0f2b26', '#16523f', '#3ddc97'],
    night:  ['#120b2c', '#2a1358', '#4cc4ff'],
    campus: ['#241340', '#4a1f6b', '#ff6b81'],
  };
  const [c1, c2, accent] = palettes[variant] || palettes.street;

  const motes = Array.from({ length: 26 }, (_, i) => ({
    x: Math.random(), y: Math.random(), r: 0.4 + Math.random() * 1.8, s: 0.02 + Math.random() * 0.07, p: i,
  }));

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let t = 0;

  function frame() {
    const w = canvas.width, h = canvas.height;
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, c1); g.addColorStop(1, c2);
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

    // horizon glow
    const glow = ctx.createRadialGradient(w * (0.5 + Math.sin(t / 260) * 0.14), h * 0.62, 0, w * 0.5, h * 0.62, w * 0.75);
    glow.addColorStop(0, accent + '55'); glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h);

    // perspective grid — reads as "street"
    ctx.strokeStyle = 'rgba(255,255,255,.10)'; ctx.lineWidth = dpr;
    const hy = h * 0.58;
    ctx.beginPath(); ctx.moveTo(0, hy); ctx.lineTo(w, hy); ctx.stroke();
    for (let i = -6; i <= 6; i++) {
      ctx.beginPath();
      ctx.moveTo(w / 2 + i * (w / 9), h);
      ctx.lineTo(w / 2 + i * (w / 60), hy);
      ctx.stroke();
    }
    for (let i = 1; i < 7; i++) {
      const y = hy + Math.pow(i / 7, 2.1) * (h - hy);
      ctx.globalAlpha = 0.5;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // drifting motes
    motes.forEach((m) => {
      const y = ((m.y + (reduced ? 0 : t * m.s / 100)) % 1);
      ctx.beginPath();
      ctx.arc(m.x * w, y * h, m.r * dpr * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${0.10 + (m.p % 5) * 0.045})`;
      ctx.fill();
    });

    // vignette
    const v = ctx.createRadialGradient(w / 2, h / 2, h * 0.28, w / 2, h / 2, h * 0.85);
    v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(4,2,14,.72)');
    ctx.fillStyle = v; ctx.fillRect(0, 0, w, h);

    t += 1;
    if (!reduced) requestAnimationFrame(frame);
  }
  frame();
}

/* ---------- boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();
  initTheme();
  initReveal();
  initTabs();
  initDemoForms();
  initPhoneScenes();
});

window.KindredIcons = ICONS;
window.KindredScene = drawScene;
