# 💾 Personal Portfolio — 90s Workstation / Print Zine Edition

A tactile, fully responsive personal portfolio built with **React (Vite)**, **Tailwind CSS v4** and
**Framer Motion** — styled in an authentic **90s OS / Print Zine aesthetic** with **100% flat solid
colors**, crisp `2px` ink borders, hard offset drop shadows (`4px 4px 0px`), classic window chrome
(`[_][□][×]`), and **zero gradients** anywhere.

---

## 🚀 Quick start

> Requires **Node.js 20.19+** (or 22.12+) and npm.

```bash
# 1. Install dependencies
npm install

# 2. (optional) enable the contact form — see "Contact form" below
cp .env.example .env       

# 3. Start the dev server → http://localhost:5173
npm run dev

# 4. Build for production (outputs to /dist)
npm run build

# 5. Preview the production build locally → http://localhost:4173
npm run preview
```

---

## 📁 Project structure

```
Portfolio/
├── index.html                 # SEO meta, Open Graph, Google Fonts, theme-flash prevention
├── public/
│   ├── favicon.svg            # 90s keycap icon (flat solid colors)
│   ├── og-image.png           # 1200×630 90s window social preview
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── generate-og.ps1        # Windows script that redraws og-image.png with your name
└── src/
    ├── main.jsx               # React entry
    ├── App.jsx                # Page composition, MotionConfig (reduced motion), BIOS preloader
    ├── index.css              # Tailwind v4 theme: 90s flat palette, fonts, hard shadows
    ├── data/
    │   └── portfolio.js       # ⭐ ALL CONTENT — edit this file
    ├── assets/
    │   └── profile-placeholder.svg
    ├── hooks/
    │   ├── useTheme.js        # Light ("95 OS") / Dark ("CRT") mode + circular reveal
    │   ├── useActiveSection.js# IntersectionObserver for navbar highlighting
    │   └── useMediaQuery.js
    ├── components/            # Reusable 90s UI building blocks
    │   ├── AnimatedCounter.jsx   BackToTop.jsx     Background.jsx
    │   ├── Button.jsx            CustomCursor.jsx  LazyImage.jsx
    │   ├── Magnetic.jsx          Navbar.jsx        Preloader.jsx
    │   ├── ProjectCard.jsx       Reveal.jsx        ScrollProgress.jsx
    │   ├── SectionHeading.jsx    SpotlightCard.jsx ThemeToggle.jsx
    │   └── TypingText.jsx
    └── sections/              # One file per page section
        ├── Hero.jsx  About.jsx  Skills.jsx  Projects.jsx
        └── Experience.jsx  Contact.jsx  Footer.jsx
```

---

## ✏️ Customizing your content

### 1. Text, links, skills, projects, timeline → `src/data/portfolio.js`

| Export | What it controls |
| --- | --- |
| `personal` | Name, initials, role, typing words, tagline, bio paragraphs, email, location, availability badge, résumé link, photo |
| `navLinks` | Navbar items (each `id` must match a section `id`) |
| `socials` | Social icons used in Hero, Contact and Footer |
| `stats` | Animated pixel counters in About |
| `quickFacts` | The four small fact cards in About |
| `skillCategories` | Skill groups, each skill = `{ name, icon, color }` |
| `projects` | Project window cards: `title, description, image, tags, category, github, live, featured` |
| `timeline` | Experience/education log entries |

### 2. Solid 90s color palette & fonts → `src/index.css`
```css
/* Light mode — "90s Classic Workstation" */
:root {
  --bg: #ebe5d5;
  --surface: #fcfaf2;
  --surface-alt: #dfd8c6;
  --ink: #141413;
  --accent: #d9381e;       /* Vermilion Red-Orange */
  --accent-2: #007a78;     /* Classic 90s Desktop Teal */
  --accent-3: #f2b705;     /* Walkman / Sticker Mustard Yellow */
  --win-bar: #002b7f;      /* Classic OS Navy title bar */
}
```
Fonts loaded in `index.html`: **Space Grotesk** (display), **IBM Plex Sans** (body), **IBM Plex Mono** (system chrome & tags), and **VT323** (pixel counters).
