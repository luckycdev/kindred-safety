<div align="center">

# Kindred

**A personal security system for your phone — live video, live location and one‑tap SOS, shared only with the people you choose.**

A complete, dependency‑free marketing site *and* an interactive demo console for a fictional consumer‑safety product.
No build step. No frameworks. No trackers. No backend. Just HTML, CSS and vanilla JavaScript.

[![No dependencies](https://img.shields.io/badge/runtime_dependencies-0-6d47f5?style=flat-square)](#project-structure)
[![No build step](https://img.shields.io/badge/build_step-none-16b97a?style=flat-square)](#quick-start)
[![Pages](https://img.shields.io/badge/pages-10-4cc4ff?style=flat-square)](#screenshot-tour)
[![Screenshots](https://img.shields.io/badge/screenshots-42-f5a623?style=flat-square)](#screenshot-tour)
[![License](https://img.shields.io/badge/license-MIT-b3acd8?style=flat-square)](LICENSE)

**[▶ Open the live site](https://luckycdev.github.io/kindred-safety/)** · **[▶ Open the demo console](https://luckycdev.github.io/kindred-safety/app.html)**

![Kindred home page](docs/screenshots/01-home-hero.png)

</div>

---

## What this is

Kindred is a **concept build** of a category of app that really exists: personal‑safety streaming. You press one
button, your phone starts broadcasting video and location to a small private circle of people, everyone gets alerted at
once, and the footage is archived encrypted afterwards.

This repository implements that idea end to end as a website:

* a full marketing site — hero, features, how‑it‑works, an in‑app preview, pricing, testimonials, FAQ;
* nine subscription tiers with a monthly/yearly toggle and a comparison table;
* about, setup guides, contact, register, login, terms and privacy pages;
* and a **live demo console** that simulates watching someone's stream — animated camera feed, moving map with a
  breadcrumb trail, circle presence, panic siren, SOS broadcast and a running alert feed.

> ### ⚠️ Read this before you do anything else
>
> **Kindred is fiction.** Kindred Safety Labs is not a real company, the app does not exist, and none of this is a
> safety product. Every person, quote, statistic, press mention and legal clause on the site is invented for
> illustration. There is no server, no account system and no data storage of any kind — the signup and login forms
> deliberately discard everything and tell you so. Never type a real password into it, and never rely on any of it in
> an emergency: call your local emergency number.
>
> It is also **not affiliated with, endorsed by, or a copy of any existing product or company.** All copy, artwork,
> layout and code here are original to this repository.

---

## Quick start

No install, no bundler, no `node_modules` needed to run it — every page is a plain `.html` file.

```bash
git clone https://github.com/luckycdev/kindred-safety.git
```

Then either open `index.html` directly in a browser, or serve it (recommended, and required if you want to regenerate
screenshots):

```bash
npm start
```

That runs `scripts/serve.mjs`, a ~40‑line zero‑dependency static server, on <http://localhost:5173>.

Prefer something else? Any static server works:

```bash
python -m http.server 5173
```

---

## Screenshot tour

Forty‑two screenshots, all generated automatically by [`scripts/shoot.mjs`](scripts/shoot.mjs) — see
[Regenerating the screenshots](#regenerating-the-screenshots).

### The home page

The hero pairs the pitch with an animated phone mock: a canvas "camera feed", a live HUD, a pulsing SOS button and a
working tab bar. Nothing is a photograph — the entire site ships zero third‑party imagery.

![Home hero](docs/screenshots/01-home-hero.png)

Six feature cards, one per thing that happens the moment the button is pressed.

![Feature grid](docs/screenshots/03-home-features.png)

A three‑step setup story, on a banded background so it reads as its own chapter.

![How it works](docs/screenshots/04-home-how-it-works.png)

An in‑app preview with real tabs — each one swaps both the copy and the phone screen beside it.

| Stream tab | Map tab |
| --- | --- |
| ![In-app preview, stream tab](docs/screenshots/05-home-app-preview.png) | ![In-app preview, map tab](docs/screenshots/06-home-preview-map-tab.png) |

A pricing teaser with the featured plan lit up, then FAQ and the closing call to action.

| Pricing teaser | FAQ |
| --- | --- |
| ![Pricing teaser](docs/screenshots/07-home-pricing-teaser.png) | ![FAQ accordion](docs/screenshots/08-home-faq.png) |

![CTA and footer](docs/screenshots/09-home-cta-footer.png)

<details>
<summary><b>The whole page, top to bottom (one tall image)</b></summary>

![Full home page](docs/screenshots/02-home-full.png)

</details>

### Plans

Nine tiers, rendered from a single data array, sized by how many people are in your circle. The billing toggle
recomputes every card in place.

![Plans, monthly](docs/screenshots/10-plans-monthly.png)

| Yearly billing | Feature comparison |
| --- | --- |
| ![Plans, yearly](docs/screenshots/11-plans-yearly.png) | ![Comparison table](docs/screenshots/12-plans-comparison.png) |

### About, setup and contact

| About | Setup guides |
| --- | --- |
| ![About hero](docs/screenshots/13-about-hero.png) | ![Setup guides](docs/screenshots/15-setup-guides.png) |

![Contact page](docs/screenshots/17-contact.png)

<details>
<summary><b>Full-length About and Setup pages</b></summary>

![About, full page](docs/screenshots/14-about-full.png)

![Setup, full page](docs/screenshots/16-setup-full.png)

</details>

### Sign up and log in

Split‑screen auth with a gradient aside. Both forms are inert: they validate, clear the password field, and show a
banner explaining that nothing was transmitted.

| Register | Log in |
| --- | --- |
| ![Register](docs/screenshots/18-register.png) | ![Log in](docs/screenshots/19-login.png) |

### Legal pages

Sample terms and a sample privacy policy, both opening with a plain statement that they are placeholder text.

| Terms of service | Privacy policy |
| --- | --- |
| ![Terms](docs/screenshots/20-terms.png) | ![Privacy](docs/screenshots/21-privacy.png) |

---

## The live demo console

`app.html` is the interesting part. It simulates the experience of *watching* someone's stream, and every moving piece
is generated in the browser — there is no video file, no map tile service and no network traffic at all.

![Console overview](docs/screenshots/22-console-overview.png)

| What it does | How it's faked |
| --- | --- |
| **Camera feed** — four scenes, switchable | `<canvas>` drawing a perspective grid, a drifting light source, particles and a vignette |
| **Live map** — moving dot, breadcrumb trail, safe places, dropped pins | Hand‑authored SVG plus a small heading/step simulation |
| **Circle presence** — six members, live / watching / idle | Static roster mutated by the SOS handler |
| **Alert feed** — timestamped, colour‑coded events | A 1 Hz ticker plus one entry per user action |
| **Session KPIs** — elapsed, viewers, bitrate, battery, speed, GPS accuracy | Sine‑wave drift around plausible values |
| **Clip archive** — six thumbnails | The same canvas scene renderer, at thumbnail size |

| Circle presence | Live location |
| --- | --- |
| ![Circle pane](docs/screenshots/25-console-circle.png) | ![Map pane](docs/screenshots/24-console-map.png) |

Press **Sound siren** and the HUD arms a warning chip while the button pulses:

![Siren armed](docs/screenshots/26-console-siren-armed.png)

Switch cameras and drop a pin — the scene, the place name and the map marker all change:

![Camera switched](docs/screenshots/27-console-camera-switched.png)

Fire the SOS and the whole console reacts: every idle member flips to *alerted*, the viewer count jumps to the full
circle, the stage flashes red three times, and two events land at the top of the feed.

![SOS fired](docs/screenshots/28-console-sos-fired.png)

| Alert feed | Clip archive |
| --- | --- |
| ![Alert feed](docs/screenshots/29-console-alert-feed.png) | ![Clip archive](docs/screenshots/30-console-clip-archive.png) |

<details>
<summary><b>The whole console, full page</b></summary>

![Console, full page](docs/screenshots/23-console-full.png)

</details>

---

## Light theme

Every surface, border and shadow is a CSS custom property, so light mode is a token swap rather than a second
stylesheet. The theme follows the OS by default and remembers a manual override in `localStorage`.

![Home in light mode](docs/screenshots/31-home-light.png)

| Features | Plans |
| --- | --- |
| ![Features, light](docs/screenshots/32-home-features-light.png) | ![Plans, light](docs/screenshots/33-plans-light.png) |

| Console | Register |
| --- | --- |
| ![Console, light](docs/screenshots/34-console-light.png) | ![Register, light](docs/screenshots/35-register-light.png) |

---

## Mobile

Captured at 390 × 844 @2x. The layout collapses to a single column, the nav becomes a slide‑down sheet, and the
three‑column console stacks without losing anything.

| Home | Menu open | Plans |
| --- | --- | --- |
| ![Mobile home](docs/screenshots/36-mobile-home.png) | ![Mobile menu](docs/screenshots/38-mobile-menu.png) | ![Mobile plans](docs/screenshots/39-mobile-plans.png) |

| Console | Register | Home, light |
| --- | --- | --- |
| ![Mobile console](docs/screenshots/40-mobile-console.png) | ![Mobile register](docs/screenshots/41-mobile-register.png) | ![Mobile home, light](docs/screenshots/42-mobile-home-light.png) |

<details>
<summary><b>Full-length mobile home page</b></summary>

![Mobile home, full page](docs/screenshots/37-mobile-home-full.png)

</details>

---

## Project structure

```
kindred-safety/
├── index.html              # marketing home
├── plans.html              # nine tiers + billing toggle + comparison table
├── about.html              # mission, what we won't build, promises
├── setup.html              # guide cards, written walkthrough, troubleshooting
├── contact.html            # inert contact form + routing cards
├── register.html           # split-screen signup (inert)
├── login.html              # split-screen login (inert)
├── app.html                # the live demo console
├── terms.html              # sample terms
├── privacy.html            # sample privacy policy
├── assets/
│   ├── css/styles.css      # the entire design system, ~900 lines
│   ├── js/main.js          # nav/footer injection, theme, tabs, reveal, canvas scenes
│   ├── js/app.js           # the demo console simulation
│   └── img/favicon.svg
├── scripts/
│   ├── serve.mjs           # zero-dependency static server
│   └── shoot.mjs           # Playwright screenshot generator
└── docs/screenshots/       # the 42 images above
```

### How the pages stay consistent

The nav and footer are rendered once in `main.js` and injected into a `<header data-nav>` / `<footer data-footer>` on
every page. Ten static files, one source of truth for site chrome — the trade‑off is that both require JavaScript,
which is acceptable here because the demo console does anyway.

### Design system

Everything is driven by custom properties on `:root`, with a `[data-theme="light"]` block overriding roughly a dozen
surface and text tokens:

| Token group | Examples |
| --- | --- |
| Brand ramp | `--brand-50` … `--brand-800` (indigo/violet) |
| Accents | `--amber-500`, `--rose-500`, `--mint-400`, `--sky-400` |
| Surfaces | `--bg`, `--bg-alt`, `--surface`, `--surface-2`, `--line` |
| Text | `--text`, `--text-dim`, `--text-mute` |
| Shape | `--radius-sm/-/-lg/-xl`, `--shadow-sm/-/-lg`, `--glow` |

Type is a fluid `clamp()` scale on the system font stack — no webfonts, so nothing is fetched from a third party.

### Accessibility and performance notes

* Tabs use `role="tablist"` / `aria-selected` / `aria-controls`; the FAQ uses native `<details>`.
* The current page is marked with `aria-current="page"`; the burger button reports `aria-expanded`.
* `prefers-reduced-motion` stops the canvas animation loop after one frame and disables reveals, transitions and smooth scrolling.
* Focus is never suppressed — `:focus-visible` gets a 2px brand outline everywhere.
* Zero network requests beyond the ten HTML files, one stylesheet, two scripts and one SVG favicon. No fonts, no CDNs, no analytics, no cookies.

---

## Regenerating the screenshots

```bash
npm install        # installs playwright-core only (~1 package, no browser download)
npm start          # terminal 1 — serve on :5173
npm run shots      # terminal 2 — write all 42 PNGs to docs/screenshots/
```

`shoot.mjs` drives the Chromium that is already on your machine (it tries Edge, then Chrome, then a bundled build), so
there is no multi‑hundred‑megabyte browser download. It captures four passes — desktop dark, the demo console mid‑interaction,
desktop light, and mobile at 2× — forcing scroll‑reveal elements visible first so full‑page captures aren't full of blank space.

Point it somewhere else with `BASE=http://localhost:8080 npm run shots`.

---

## What's deliberately missing

This is a front‑end concept build, so there is no: account system, payment integration, WebRTC or HLS pipeline, push
notification service, map tile provider, media storage, or encryption implementation. The copy describes what such a
product *would* do; the code implements the interface and simulates the behaviour.

If you want to take it further, the obvious next steps are a real signalling server and `getUserMedia` capture behind
the Stream tab, and swapping the SVG map for a tile provider.

---

## Credits and licence

Built as an original design and implementation exercise. All code, copy and artwork in this repository are MIT
licensed — see [LICENSE](LICENSE). The brand name "Kindred", the logo, the invented press outlets and the fictional
testimonials exist only to make the demo feel complete.
