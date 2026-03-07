# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML/CSS/JS website for [Tiny Village Spirit](https://tinyvillagespirit.org), a Bay Area 501(c)(3) non-profit building tiny home communities for unhoused people. Hosted on Firebase Hosting.

## Development Workflow

```bash
node build.js            # assemble src/ → public/ (run after any HTML edit)
npm run build            # same as above
firebase serve           # local preview (requires Firebase CLI)
firebase deploy          # deploy to production (always build first)
```

**Always run `node build.js` before `firebase deploy`.** The `public/*.html` files are generated — edit `src/` instead.

## Architecture

**Source files live in `src/`** — do not edit `public/*.html` directly.

- `src/_partials/nav.html` — shared nav HTML (injected via `<!-- INCLUDE:nav -->`)
- `src/_partials/footer.html` — shared footer HTML (injected via `<!-- INCLUDE:footer -->`)
- `build.js` — assembles `src/*.html` into `public/*.html` by replacing `<!-- INCLUDE:nav -->` and `<!-- INCLUDE:footer -->` with partial content
- CSS and JS files are in `public/styling/` and `public/scripting/` (served directly, not built)

**Shared components:**
- `public/styling/topnav.css` + `public/styling/footer.css` — nav and footer styles
- `public/scripting/topnav.js` — responsive nav (hamburger menu at ≤995px, hide-on-scroll, dropdowns)

**URL structure** (Firebase `cleanUrls: true`):
- `/` → `public/index.html`
- `/about` → `public/about.html`
- `/about/partners` → `public/about/partners.html`
- `/projects` → `public/projects/index.html` (via firebase.json rewrite)
- `/projects/richmond`, `/projects/oakland`, `/projects/directory`, `/projects/blueprint` → `public/projects/`
- `/volunteer`, `/news`, `/contact` → top-level HTML files

**CSS organization:** `public/styling/` mirrors the URL structure — `styling/about/partners.css` for `/about/partners`, `styling/projects/directory.css` for `/projects/directory`, etc.

All asset paths in source files use absolute paths (`/media/`, `/styling/`, `/scripting/`) so they work correctly at any URL depth. The `<link rel="preload">` hrefs use relative paths since they reference page-specific images.

## Brand Colors

- Primary teal: `#04747C`
- Button/accent teal: `#07b1bd`
- Light background: `#f2f2f2`

## Key Notes

- Google Analytics (GA4, tag `G-VYD6FRZSK4`) is included inline at the bottom of each page.
- `projects/directory.html` has no footer (intentional).
- `public/media/` contains all image assets.
