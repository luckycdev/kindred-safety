/* Regenerates every screenshot in docs/screenshots/.
   Usage: npm start   (in one shell)
          npm run shots
   Uses the Chromium already installed on the machine (Edge or Chrome) — no browser download. */
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = process.env.BASE || 'http://localhost:5173';
const OUT = resolve(fileURLToPath(new URL('../docs/screenshots', import.meta.url)));

const DESKTOP = { width: 1600, height: 1000 };
const MOBILE = { width: 390, height: 844 };

async function launch() {
  for (const channel of ['msedge', 'chrome', undefined]) {
    try { return await chromium.launch({ channel }); } catch { /* try the next one */ }
  }
  throw new Error('No Chromium-based browser found. Install Edge or Chrome, or run: npx playwright install chromium');
}

async function newPage(browser, { theme = 'dark', viewport = DESKTOP, scale = 1 } = {}) {
  const ctx = await browser.newContext({
    viewport,
    deviceScaleFactor: scale,
    isMobile: viewport === MOBILE,
    hasTouch: viewport === MOBILE,
    colorScheme: theme,
    reducedMotion: 'no-preference',
  });
  await ctx.addInitScript((t) => {
    try { localStorage.setItem('kindred-theme', t); } catch {}
  }, theme);
  return ctx.newPage();
}

async function settle(page) {
  // Reveal-on-scroll elements would otherwise be invisible in a full-page capture.
  await page.evaluate(() => document.querySelectorAll('.reveal').forEach((el) => {
    el.style.transitionDelay = '0ms';
    el.classList.add('in');
  }));
  await page.waitForTimeout(900);
}

async function shot(page, name, opts = {}) {
  const path = `${OUT}/${name}.png`;
  if (opts.selector) await page.locator(opts.selector).first().screenshot({ path });
  else await page.screenshot({ path, fullPage: !!opts.full });
  console.log('  ✓', name + '.png');
}

const run = async () => {
  await mkdir(OUT, { recursive: true });
  const browser = await launch();

  /* ---------------- desktop, dark ---------------- */
  console.log('desktop · dark');
  {
    const page = await newPage(browser);

    await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });
    await settle(page);
    await shot(page, '01-home-hero');
    await shot(page, '02-home-full', { full: true });
    await shot(page, '03-home-features', { selector: '#features' });
    await page.locator('text=Set it up once').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await shot(page, '04-home-how-it-works');
    await shot(page, '05-home-app-preview', { selector: '.panel[data-tabs]' });

    // second tab of the in-app preview
    await page.locator('#tb-2').click();
    await page.waitForTimeout(400);
    await shot(page, '06-home-preview-map-tab', { selector: '.panel[data-tabs]' });

    await page.locator('text=Priced by the size').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await shot(page, '07-home-pricing-teaser');
    await page.locator('text=The things people ask first').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await shot(page, '08-home-faq');
    await page.locator('.cta').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await shot(page, '09-home-cta-footer');

    await page.goto(`${BASE}/plans.html`, { waitUntil: 'networkidle' });
    await settle(page);
    await shot(page, '10-plans-monthly', { full: true });
    await page.locator('[data-cycle="year"]').click();
    await settle(page);
    await shot(page, '11-plans-yearly');
    await page.locator('.table-scroll').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await shot(page, '12-plans-comparison', { selector: '.table-scroll' });

    await page.goto(`${BASE}/about.html`, { waitUntil: 'networkidle' });
    await settle(page);
    await shot(page, '13-about-hero');
    await shot(page, '14-about-full', { full: true });

    await page.goto(`${BASE}/setup.html`, { waitUntil: 'networkidle' });
    await settle(page);
    await shot(page, '15-setup-guides');
    await shot(page, '16-setup-full', { full: true });

    await page.goto(`${BASE}/contact.html`, { waitUntil: 'networkidle' });
    await settle(page);
    await shot(page, '17-contact');

    await page.goto(`${BASE}/register.html`, { waitUntil: 'networkidle' });
    await settle(page);
    await shot(page, '18-register');

    await page.goto(`${BASE}/login.html`, { waitUntil: 'networkidle' });
    await settle(page);
    await shot(page, '19-login');

    await page.goto(`${BASE}/terms.html`, { waitUntil: 'networkidle' });
    await settle(page);
    await shot(page, '20-terms');

    await page.goto(`${BASE}/privacy.html`, { waitUntil: 'networkidle' });
    await settle(page);
    await shot(page, '21-privacy');

    await page.close();
  }

  /* ---------------- demo console ---------------- */
  console.log('demo console');
  {
    const page = await newPage(browser);
    await page.goto(`${BASE}/app.html`, { waitUntil: 'networkidle' });
    await settle(page);
    await page.waitForTimeout(2500);            // let the trail draw and the clock run
    await shot(page, '22-console-overview');
    await shot(page, '23-console-full', { full: true });
    await shot(page, '24-console-map', { selector: '.console__right .pane' });
    await shot(page, '25-console-circle', { selector: '.console__left .pane' });

    await page.locator('#btn-siren').click();
    await page.waitForTimeout(700);
    await shot(page, '26-console-siren-armed');

    await page.locator('#btn-pin').click();
    await page.locator('#btn-scene').click();
    await page.waitForTimeout(900);
    await shot(page, '27-console-camera-switched', { selector: '.console__center' });

    await page.locator('#btn-sos').click();
    await page.waitForTimeout(1200);
    await shot(page, '28-console-sos-fired');
    await shot(page, '29-console-alert-feed', { selector: '.console__right .pane:last-child' });

    await page.locator('#clips').scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await shot(page, '30-console-clip-archive');
    await page.close();
  }

  /* ---------------- desktop, light ---------------- */
  console.log('desktop · light');
  {
    const page = await newPage(browser, { theme: 'light' });
    await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });
    await settle(page);
    await shot(page, '31-home-light');
    await page.locator('#features').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await shot(page, '32-home-features-light');

    await page.goto(`${BASE}/plans.html`, { waitUntil: 'networkidle' });
    await settle(page);
    await shot(page, '33-plans-light');

    await page.goto(`${BASE}/app.html`, { waitUntil: 'networkidle' });
    await settle(page);
    await page.waitForTimeout(2500);
    await shot(page, '34-console-light');

    await page.goto(`${BASE}/register.html`, { waitUntil: 'networkidle' });
    await settle(page);
    await shot(page, '35-register-light');
    await page.close();
  }

  /* ---------------- mobile ---------------- */
  console.log('mobile · 390×844 @2x');
  {
    const page = await newPage(browser, { viewport: MOBILE, scale: 2 });
    await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });
    await settle(page);
    await shot(page, '36-mobile-home');
    await shot(page, '37-mobile-home-full', { full: true });

    await page.locator('[data-burger]').click();
    await page.waitForTimeout(500);
    await shot(page, '38-mobile-menu');
    await page.locator('[data-burger]').click();

    await page.goto(`${BASE}/plans.html`, { waitUntil: 'networkidle' });
    await settle(page);
    await shot(page, '39-mobile-plans');

    await page.goto(`${BASE}/app.html`, { waitUntil: 'networkidle' });
    await settle(page);
    await page.waitForTimeout(2500);
    await shot(page, '40-mobile-console');

    await page.goto(`${BASE}/register.html`, { waitUntil: 'networkidle' });
    await settle(page);
    await shot(page, '41-mobile-register');

    const light = await newPage(browser, { theme: 'light', viewport: MOBILE, scale: 2 });
    await light.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });
    await settle(light);
    await shot(light, '42-mobile-home-light');
    await light.close();
    await page.close();
  }

  await browser.close();
  console.log(`\nDone — screenshots written to ${OUT}`);
};

run().catch((err) => { console.error(err); process.exit(1); });
