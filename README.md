# SUMER — launching soon

The launching-soon page for [sumer.forum](https://sumer.forum).

SUMER is a creative collective working at the intersection of nightlife,
culture, music and conversation — *"a collective, not a platform"* — building
spaces for connection and expression across West Asia and North Africa and
beyond. This page presents the brand, counts down to launch, links to
Instagram, and collects sign-ups for the *utelivsbrevet* newsletter.

## Stack

Plain, dependency-free **static site** — `index.html` + `styles.css` +
`script.js`. No build step. Deploy the folder as-is to any static host
(Vercel, `sumer.iverfinne.no`, …). Served from the web root.

```
index.html          markup + meta/OG + favicon/PWA tags
styles.css          terracotta design system, responsive + iOS-optimised
script.js           countdown + newsletter signup
manifest.webmanifest, browserconfig.xml, favicon.*, apple-touch-icon.png,
android-chrome-*, maskable-*, mstile-*, icons/   ← official icon pack (root)
assets/             sumer-emblem.png, sumer-logo.png, og.png
assets/textures/    brand textures (see below)
```

## Brand

| Token            | Hex       |                          |
| ---------------- | --------- | ------------------------ |
| Deep Terracotta  | `#7b3523` | page / cards / theme     |
| Acid Yellow      | `#e8f870` | actions, accents         |
| Blueish-Pink     | `#d888f0` | accent                   |
| Ocean Blue       | `#3878f8` | accent                   |
| Cream            | `#f4ecde` | type on terracotta       |

Type: **Fraunces** (display) + **Inter** (UI). Logo / emblem by Ida Eva Neverdahl.

### Textures (`assets/textures/`)

Tileable brand patterns, ready to drop into components as backgrounds:

- `lattice-acid.png` — orchid diamond lattice on acid (used on the "Join the movement" band)
- `rays-terracotta.png` — cream sunburst lines on terracotta
- `stars-blue.png` — cream 8-point stars on ocean blue
- `squiggle-orchid.png` — gold squiggle on orchid

## Notes / TODO

- **Countdown** targets **2026-09-01** (`LAUNCH_DATE` in `script.js`).
- **Instagram** links to Frozen Jungle (`@frozenxjungle`) — no SUMER handle yet.
  SoundCloud + X are omitted from the footer until handles exist.
- **Signup** opens the visitor's mail app to `utelivsbrevet@vartoslo.no`
  (no backend). Swap for a hosted form/API when available (see `script.js`).

## Develop

```bash
python3 -m http.server 8000   # → http://localhost:8000
```
