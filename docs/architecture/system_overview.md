# MediaGuide — System Architecture

## Overview
MediaGuide is an internal sales enablement tool for the **P2P Digital** account team. It provides a comprehensive reference for digital advertising platforms in Vietnam, including campaign objectives, benchmarks, FAQs, and training resources.

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 8 |
| Routing | react-router-dom v7 |
| Styling | Vanilla CSS (custom design system) |
| Data | Static JSON files |
| Hosting | GitHub (static deploy-ready) |

## File Structure
```
mediaguide/
├── public/
│   ├── icons/          # Phosphor-based UI icons (SVG)
│   └── logos/          # Platform brand logos (SVG)
├── src/
│   ├── data/
│   │   ├── platforms.json    # 8 platforms: specs, objectives, FAQs
│   │   └── glossary.json     # Marketing terms dictionary
│   ├── App.jsx               # Main SPA: routing, views, components
│   ├── App.css               # Design system + all component styles
│   └── main.jsx              # Entry point with BrowserRouter
├── docs/
│   └── architecture/         # This file
└── package.json
```

## URL Routing (React Router)
| Route | View | Description |
|-------|------|-------------|
| `/` | WelcomeView | Landing page with quick start cards |
| `/platform/:id` | PlatformDetailView | Platform overview + objectives |
| `/objectives` | ObjectiveFilterView | Cross-platform objective browser |
| `/glossary` | GlossaryView | Searchable marketing glossary |
| `/resources` | ResourcesView | Training materials library |

## Key Components (in App.jsx)
- **App** — Layout shell: sidebar + topbar + content
- **WelcomeView** — Landing page with stats and quick-start
- **PlatformDetailView** — Full platform detail: overview, info grid, account tools, FAQ, objectives
- **ObjectiveFilterView** — Cross-platform objective comparison by funnel stage
- **GlossaryView** — Searchable dictionary with categories
- **ResourcesView** — Training resource card grid

## Data Architecture
### platforms.json
Single source of truth per platform:
- `id`, `name`, `color`, `description`
- `audienceOverview`, `minBudget`, `pricingModel[]`, `idealFor[]`
- `pros[]`, `cons[]`, `audience{}`, `benchmarks{}`
- `objectives[]` — each with `formats[]`, `metrics[]`, `tips[]`, `mistakes[]`
- `faqs[]` — Q&A pairs for client objections

### glossary.json
Marketing terms with definitions, categorized for searchability.

## Design System (App.css)
- CSS custom properties for theming (light/dark)
- Typography: Inter (body), JetBrains Mono (code)
- Color system: primary (amber/gold), semantic (success/error/warning)
- Components: collapsible panels, info cards, filter chips, resource grid

## External Dependencies
- **Slide-Media-Team**: `https://github.com/vanhao1997/slide-media-team` (linked from ResourcesView)

## Environment
- **Dev**: `npm run dev` (port 5174)
- **Build**: `npm run build` (static output to `dist/`)
- No environment variables required
- No backend/API — purely static SPA
