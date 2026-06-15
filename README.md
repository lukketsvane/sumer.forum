# SUMER — coming soon

A single-page **"SUMER is coming"** landing site for [sumer.forum](https://sumer.forum).

SUMER is a creative collective working at the intersection of nightlife,
culture, music and conversation. This page is a placeholder while the full
site is built: it presents the brand, links to Instagram, and lets visitors
sign up for the *utelivsbrevet* newsletter.

## Stack

Plain, dependency-free **static site** — `index.html` + `styles.css` +
`script.js`. No build step. Deploy the folder as-is to any static host
(Vercel, Netlify, GitHub Pages, `sumer.iverfinne.no`, …).

```
index.html          markup + meta/OG tags
styles.css          design system + responsive, iOS-optimised layout
script.js           newsletter signup handler
site.webmanifest    PWA manifest
assets/             logo, icons, social preview (og.png)
```

## Brand

| Token            | Hex       |
| ---------------- | --------- |
| Deep Terracotta  | `#6e2f20` |
| Acid Yellow      | `#e8f880` |
| Blueish-Pink     | `#d088f8` |
| Ocean Blue       | `#4080f8` |
| Cream            | `#f4ead7` |

Type: **Syne** (display) + **Space Grotesk** (body). Logo by Ida Eva Neverdahl.

## Notes / TODO

- **Instagram link** is set to `instagram.com/sumer` in `index.html` —
  confirm the real handle (e.g. `@frozenxjungle`) and update both anchors.
- **Newsletter signup** currently opens the visitor's mail app addressed to
  `utelivsbrevet@vartoslo.no`. Swap for a hosted form/API when available
  (see `script.js`).

## Develop

Just open `index.html`, or serve locally:

```bash
python3 -m http.server 8000   # → http://localhost:8000
```
