
# Cyberpunk Item Showcase — Single Page App

## Overview
A cyberpunk-themed React SPA for promoting items across 3 categories, with an immersive animated intro, category menu, and item detail pages. All content is data-driven via JSON + Markdown files — no code changes needed to update items.

## Color Palette (from uploaded reference)
- **Background/Dark**: #012326 (deep teal-black)
- **Secondary Dark**: #025373 (dark teal-blue)
- **Accent Cyan**: #05F2DB (neon cyan — borders, highlights, scrollbars)
- **Accent Pink**: #D9048E (neon magenta — hover glows, active states)
- **Accent Hot Pink**: #F205CB (neon hot pink — neon sign, CTA elements)

## Pages & Flow

### 1. Intro / Enter Page
- **Full-screen animated cyberpunk city scene** using React Three Fiber (r3f) with a Canvas/WebGL background — rain particles, flickering neon lights, subtle fog, and ambient movement
- A **vertical neon sign** in the center with customizable text and glow effect (pulsing hot pink #F205CB)
- "Belépés" (Enter) button styled as a glowing neon sign element
- **Configurable via `public/data/intro.json`** — neon sign text, subtitle, button text, colors

### 2. Category Menu Page
- Three large cards in a row, each with:
  - A cyberpunk-styled image (keyboard, mouse, misc gadgets)
  - Category name overlay text with neon glow
  - **Breathing/pulsing light effect on hover** — the card's border and glow intensity oscillates using CSS animation, intensifying when hovered
- **Configurable via `public/data/categories.json`** — image path, label text, link to category folder name
- Smooth fade-in transition from intro

### 3. Item Listing & Detail Page
- Shows all items for a chosen category
- Each item displayed as a card following the uploaded wireframe layout:
  - **Main image** (large, 3:2 ratio) + **3 smaller thumbnails** below it
  - **Scrollable description panel** to the right with custom-styled scrollbar (cyan neon)
  - All images clickable → opens a **fullscreen modal gallery** with cyberpunk-styled borders (cyan glow borders, dark overlay)
- **"Vissza" back button** with neon styling to return to category menu
- Custom modal with retro-futuristic border styling (double-line cyan borders, subtle scan-line effect)

## Content / Data Structure

```
public/data/
├── intro.json              ← Neon sign config
├── categories.json         ← Menu items (image, label, folder)
└── items/
    ├── billentyuzetek/
    │   ├── items.json       ← List of item folder names + titles
    │   ├── item-1/
    │   │   ├── main.jpg     ← Main picture
    │   │   ├── pic1.jpg     ← Additional photos
    │   │   ├── pic2.jpg
    │   │   ├── pic3.jpg
    │   │   └── description.md
    │   └── item-2/
    │       └── ...
    ├── egerek/
    │   └── ...
    └── egyeb/
        └── ...
```

**`categories.json` example:**
```json
[
  { "id": "billentyuzetek", "label": "Billentyűzetek", "image": "/data/items/billentyuzetek/cover.jpg" },
  { "id": "egerek", "label": "Egerek", "image": "/data/items/egerek/cover.jpg" },
  { "id": "egyeb", "label": "Egyéb", "image": "/data/items/egyeb/cover.jpg" }
]
```

**`items.json` example (per category):**
```json
[
  { "folder": "item-1", "title": "Cyberpunk RGB Keyboard" },
  { "folder": "item-2", "title": "Neon Mech 75%" }
]
```

Each item folder has fixed filenames: `main.jpg`, `pic1.jpg`, `pic2.jpg`, `pic3.jpg`, `description.md`. To add an item, create a folder with these files and add an entry to `items.json`.

## Key Components
1. **IntroScene** — R3F canvas with particle rain, flickering lights, neon sign (reads `intro.json`)
2. **CategoryMenu** — Grid of hoverable category cards with breathing glow (reads `categories.json`)
3. **ItemList** — Shows all items for a category in the wireframe layout (reads `items.json` + loads images/markdown)
4. **ImageGallery** — Modal with cyberpunk-bordered lightbox, left/right navigation
5. **CyberpunkScrollbar** — Custom scrollbar component with neon cyan styling
6. **NeonButton** — Reusable glowing button component for "Vissza" and other CTAs

## Visual Design Details
- Dark background (#012326) throughout
- Scan-line CSS overlay effect (subtle) on all pages for retro-CRT feel
- Custom scrollbars: thin, cyan (#05F2DB) track with pink thumb on hover
- Modal borders: double-line glowing cyan borders with corner accents
- All text in a clean sans-serif font, with neon glow on headings
- Transitions between pages use fade + slight scale animation

## Placeholder Content
Since this needs to work immediately, I'll include placeholder images (generated SVG placeholders with cyberpunk styling) and sample markdown descriptions so the app is fully functional out of the box. You replace them with real images later.
