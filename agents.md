# Project: paul-timmermann.de - Modernization

## Overview

This is a personal website project that needs to be migrated from vanilla HTML/CSS/JS to a modern stack (Astro) while preserving the exact current design.

---

## Current Stack (As-Is)

| Component | Details |
|-----------|---------|
| **Files** | `index.html`, `whatelse.html`, `error/404.html`, `error/error.html`, `webdevelpoment-error.html` |
| **CSS** | 9 separate CSS files in `styles/` folder (not bundled) |
| **JS** | `script.js` (minimal - just nav toggle) |
| **External deps** | Google Fonts (Roboto), AOS animations, (formerly reCAPTCHA - removed) |
| **Hosting** | None yet - target is self-hosted on Unraid via Docker/Coolify |

---

## Architecture Decision

### Chosen Stack
- **Framework**: Astro (static output mode)
- **Styling**: Keep current CSS exactly as-is (just bundle it)
- **Deployment**: Coolify on Unraid (not implemented yet)
- **Build**: pnpm (recommended) - npm/pnpm have permission issues on Windows UNC network paths

### Why Astro?
- Zero JS by default (best performance)
- Islands architecture for future features
- Static output is simple to host anywhere
- Perfect for preserving existing design

---

## Issues Found (To Fix Later)

| # | Issue | Location | Status |
|---|-------|----------|--------|
| 1 | Broken email link: `paul.timmermann@netthelp.de` | `error/404.html:17` | Unresolved |
| 2 | Broken email link: `paul.timmermann281103@gmail.com` | `error/error.html:17` | Unresolved |
| 3 | Broken link: `index.html` should be `/` | `error/error.html:20` | Unresolved |
| 4 | Broken image paths: `images/` vs `assets/` | `error/404.html:6`, `error/error.html:6` | Unresolved |
| 5 | Age inconsistency: "16 Jahre alt" vs "20-year-old" | `whatelse.html:8` vs `index.html:81` | Unresolved |
| 6 | Dead nav link: "#WebDesign" goes nowhere useful | `whatelse.html:72` | Unresolved |

### Code Removed During Audit
- **script.js**: Removed unused EmailJS code and reCAPTCHA init (lines 1-27)
- **index.html**: Removed unused reCAPTCHA script tag

---

## Project Structure (Current)

```
paul-timmermann.de - 2026/
├── index.html                 (main page)
├── whatelse.html              (projects page)
├── webdevelpoment-error.html  (web development error page)
├── script.js                 (nav toggle - CODE ALREADY CLEANED)
├── package.json              
├── error/
│   ├── 404.html             (needs fixing: images/ path)
│   └── error.html            (needs fixing: images/ path + email)
├── styles/
│   ├── index_styles/
│   │   ├── style.css
│   │   ├── contact.css
│   │   ├── about.css
│   │   ├── nav.css
│   │   ├── dropdown.css
│   │   └── services.css     (referenced in index.html)
│   ├── whatelse_styles/
│   │   ├── style.css
│   │   ├── nav.css
│   │   ├── icofont.min.css
│   │   └── fonts/           (icofont icon fonts)
│   │       ├── icofont.eot
│   │       ├── icofont.svg
│   │       ├── icofont.ttf
│   │       ├── icofont.woff
│   │       └── icofont.woff2
│   └── webdevelopment_error_styles/
│       └── style.css
└── assets/
    ├── paul-timmermann.ico
    ├── paul-timmermann_white.ico
    ├── linked.png
    ├── instagram.png
    ├── mail.svg
    └── images/
        ├── blog.png
        └── elate.png
```

### Page to CSS Mapping

| Page | CSS Files Used |
|------|---------------|
| `index.html` | `index_styles/style.css`, `dropdown.css`, `about.css`, `services.css`, `contact.css`, `nav.css` |
| `whatelse.html` | `whatelse_styles/style.css`, `nav.css`, `icofont.min.css` |
| `error/404.html` | `error/style.css` |
| `error/error.html` | `error/style.css` |
| `webdevelpoment-error.html` | `webdevelopment_error_styles/style.css` |

---

## Target Structure (Astro)

```
paul-timmermann/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── src/
│   ├── pages/
│   │   ├── index.astro      (port from current index.html)
│   │   ├── whatelse.astro  (port from current whatelse.html)
│   │   ├── error.astro     (port from webdevelpoment-error.html)
│   │   └── error/
│   │       ├── 404.astro
│   │       └── index.astro
│   └── styles/
│       └── global.css       (import all current CSS files)
└── public/
    ├── assets/              (copy from current)
    └── error/               (any static assets)
```

---

## Implementation Steps

### Step 1: Initialize Astro Project
```bash
# Create project (needs Node.js environment that works properly)
# Use pnpm (recommended)
```

### Step 2: Port Pages to .astro
- Create `src/pages/index.astro` - copy content from current `index.html`
- Create `src/pages/whatelse.astro` - copy content from current `whatelse.html`
- Create error pages in `src/pages/error/`

### Step 3: Import CSS
- Create `src/styles/global.css`
- Import all current CSS files using `@import` or let Astro handle them
- Goal: Bundle all CSS into one file automatically

### Step 4: Copy Assets
- Copy `assets/` folder to `public/assets/`
- Update paths in HTML (remove `assets/` prefix since it's now `public/`)

### Step 5: Test Build
```bash
pnpm build
```
- Should produce static HTML in `dist/` folder

### Step 6: Deploy to Coolify
- Push to GitHub
- Connect repo in Coolify (on Unraid)
- Auto-deploy will handle the rest

---

## Important Clarifications for Agent

### 1. Design Preservation
**CRITICAL**: Do NOT change any styling. The design must remain exactly the same. Only port the code to Astro - don't improve, don't refactor, don't add features yet.

### 2. CSS Handling
- Current CSS is spread across 9 files
- In Astro, import them in one place (e.g., `src/styles/global.css` or in a Layout component)
- Astro will bundle them automatically - no need to manually combine
- Keep all class names and selectors exactly as-is

### 3. External Dependencies
- Keep Google Fonts (Roboto) - same URL
- Keep AOS animations - same CDN links
- Keep IcoFont icon fonts - copy `styles/whatelse_styles/fonts/` to `public/fonts/`
- Don't add any new dependencies yet

### 4. JavaScript
- Current `script.js` only has nav toggle logic
- Can be embedded directly in Astro components or kept as separate file
- Don't add any new JS features

### 5. Build Output
- Astro should be configured for static output (`output: 'static'`)
- Final result will be plain HTML/CSS/JS files
- Can be hosted anywhere (Nginx, Caddy, etc.)

### 6. Issues to Fix Later (Don't Touch Now)
- All 6 issues listed above (broken links, age inconsistency, etc.)
- These are separate from the migration task

### 7. Environment Problems
- Windows machine has issues with npm/pnpm on UNC network paths (\\SERVER\Paul\...)
- Node.js postinstall scripts (esbuild, sharp) fail on UNC paths
- The `paul-timmermann/` subfolder was attempted but node_modules are broken
- Best approach: Do installation on a local Windows path (C:\...) then push to Git, OR let Coolify handle build

### 8. Build Command
```bash
# On local machine (not UNC path)
pnpm install
pnpm build
```

### 9. Future Features (Not Implemented)
- Dark/Light mode
- Contact form with SMTP
- Project showcase with MDX
- These were planned but explicitly deferred until after migration

---

## Contact Information (From Current Site)

| Field | Value |
|-------|-------|
| Name | Paul Timmermann |
| Location | Hamburg, Bergedorf, Germany |
| Email (main) | paul@paul-timmermann.de |
| LinkedIn | https://www.linkedin.com/in/paul-timmermann/ |
| Instagram | @paul28.11 |

---

## Current Files Summary

### index.html
- Single-page scroll design
- Hero section ("Hey, I am Paul")
- About section with contact info
- Uses 6 CSS files
- AOS animations
- Navigation tabs

### whatelse.html
- Project showcase (Blog & Newsletter, WebDesign Agency)
- Uses 3 CSS files + icofont icons
- External links to blog.paul-timmermann.de and elate-agency.de

### webdevelpoment-error.html
- Error page for web development issues
- Uses 1 CSS file
- (Not yet analyzed - need to read content)

### error/404.html & error.html
- Basic error pages
- Uses `error/style.css`
- Have broken image paths

---

## GitHub & Deployment Info

- **GitHub**: User has account (to be connected later)
- **Coolify**: To be installed on Unraid
- **Reverse Proxy**: Nginx Proxy Manager (already running)
- **Domain**: paul-timmermann.de (already configured in NPM)

---

## Notes for Agent

1. **Start fresh** - The `paul-timmermann/` subfolder was started but has broken node_modules. Clean it up or create new.

2. **No features** - This is a pure migration. Don't add dark mode, contact form, or project showcase yet.

3. **Exact copy** - Port HTML to .astro syntax but keep every visual element identical.

4. **Test locally** - Before pushing to Git, run `pnpm build` and verify output looks the same as current site.

5. **Bundle CSS** - The main benefit of Astro here is automatic CSS bundling. Use that.

6. **Coolify integration** - Once migration is complete and working, the agent should also set up the Coolify deployment, or at minimum provide clear instructions for it.