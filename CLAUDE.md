# Creator Content Dashboard — CLAUDE.md

## What this is
A content command center for @tenfoldmarc built in Next.js 15. Six pages covering the full creator workflow: hooks, analytics, competitor research, scheduling, calendar planning, and trend monitoring.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | File-based routing, RSC-ready, best DX |
| Styling | Tailwind CSS v4 | Co-located utility classes, fast iteration |
| Components | Hand-rolled shadcn-style | shadcn CLI incompatible with Tailwind v4's new import syntax; built to same API |
| Charts | Recharts | Lightest charting lib with React-first API |
| Icons | Lucide React | Consistent stroke-based icon set |
| Language | TypeScript | Strict typing throughout |

## Architecture decisions

### No shadcn CLI
Next.js 15 ships Tailwind v4 which uses `@import "tailwindcss"` instead of `tailwind.config.js`. Both `shadcn@latest` and `shadcn-ui@0.8.0` fail to detect the Tailwind installation. All UI primitives (`src/components/ui/`) are built manually with the same props API shadcn uses, making a future swap straightforward.

### CSS custom properties for theming
All design tokens live in `:root` inside `globals.css`. The terracotta accent (`#c0622a`) is declared as `--terracotta` and referenced via inline styles and Tailwind arbitrary values.

### Client components
All six pages are `"use client"` because they use `useState` for filtering, tab state, and interactions. When real API data is wired up, extract data fetching into server components and pass data down as props.

### Mock data
All data (hooks, analytics, competitors, scheduler queue, trending stories) is hardcoded inline. Replace with API calls or a database layer as needed.

## Pages

| Route | Page | Key features |
|---|---|---|
| `/` | Hook Vault | Search + category filter, hook/template toggle, heat score bar |
| `/analytics` | Analytics | Stat cards, area/bar charts (Recharts), best posting times, top heaters table |
| `/competitors` | Competitor Tracker | Per-creator reel cards, hover-reveal "use this angle" action |
| `/scheduler` | Scheduler | Video upload drop zone, AI caption generation (simulated), multi-platform toggle, queue |
| `/calendar` | Content Calendar | Month grid, day-click detail panel, hook/angle/reel type color coding |
| `/trending` | What's Trending | 12-source feed, hook-potential scoring, save-to-vault action |

## Design tokens

```
Background:   #0f0f0f
Card:         #1a1a1a
Sidebar:      #141414
Border:       #2a2a2a
Muted text:   #888
Body text:    #f0ebe5
Terracotta:   #c0622a  (primary accent)
Terra light:  #e07848  (hover / gradient end)
```

## Running locally

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

## Adding real APIs

1. Create route handlers in `src/app/api/`
2. Move mock data to server components
3. For IG analytics, integrate Instagram Graph API with OAuth
4. For trending, wire up RSS aggregation or a news API (e.g. NewsAPI, Feedly)
