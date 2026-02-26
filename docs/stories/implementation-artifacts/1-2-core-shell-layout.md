# Story 1.2: Core Shell Layout

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **a professional dark-themed application shell with a fixed sidebar and top navbar**,
so that **I can navigate the finance dashboard intuitively and access key actions like adding transactions.**

## Acceptance Criteria

1. **Fixed Sidebar (240px)**
   - Fixed-position left sidebar, full viewport height, 240px wide
   - Background: `bg-surface` (`#161A23`) with right border `border-subtle` (`#232634`)
   - Contains the brand logo/text "Yash Finance" at the top (Space Grotesk, 18px)
   - Navigation items: Dashboard, Transactions, Wallets, Analytics (lucide-react icons + label)
   - Active nav item highlighted with `brand-indigo` (`#6366F1`) indicator
   - Nav items use Inter font, 14px, with 8px-grid-aligned padding (e.g., `py-3 px-6`)

2. **Top Navbar (64px)**
   - Fixed-position top bar, 64px height, spans full width minus sidebar (240px offset)
   - Background: `bg-surface` (`#161A23`) with bottom border `border-subtle` (`#232634`)
   - Left side: Current page title (Space Grotesk, 24px, white)
   - Right side: "Add Transaction" CTA button (`bg-indigo`, `rounded-xl`, lucide-react Plus icon)

3. **Main Content Area**
   - Positioned to the right of sidebar and below navbar
   - Background: `bg-main` (`#0F1117`)
   - Scrollable overflow with proper padding (24px / `p-6`)
   - Renders child route content via React Router `<Outlet />`

4. **React Router Integration**
   - `BrowserRouter` wrapping the app in `main.tsx`
   - Layout route at `/` rendering `<MainLayout>` (sidebar + navbar + outlet)
   - Child routes: `/` (Dashboard placeholder), `/transactions`, `/wallets`, `/analytics`
   - Placeholder page components for each route (simple heading text is sufficient)
   - Active route reflected in sidebar nav highlighting via `useLocation()`

5. **Design System Compliance**
   - All spacing uses 8px grid system (Tailwind standard scale: `p-2`=8px, `p-4`=16px, `p-6`=24px, `p-8`=32px)
   - Border radius: `rounded-xl` (12px) on cards/buttons
   - No arbitrary Tailwind values (e.g., no `p-[23px]`) — use standard scales or custom tokens only
   - Fonts loaded: Inter (body) and Space Grotesk (headers) via CSS `@import` or `<link>`

6. **Operational Verification**
   - App renders without console errors
   - Sidebar navigation links change the URL and render the correct page placeholder
   - Active nav item visually updates on route change
   - Layout does not scroll — only the main content area scrolls

## Tasks / Subtasks

- [x] Task 1: Set up React Router (AC: #4)
  - [x] 1.1: Wrap app with `BrowserRouter` in `main.tsx`
  - [x] 1.2: Create `MainLayout` component with sidebar + navbar + `<Outlet />`
  - [x] 1.3: Define routes: index `/`, `/transactions`, `/wallets`, `/analytics`
  - [x] 1.4: Create placeholder page components (Dashboard, Transactions, Wallets, Analytics)
- [x] Task 2: Build Sidebar component (AC: #1, #5)
  - [x] 2.1: Create `Sidebar.tsx` in `apps/web/src/components/`
  - [x] 2.2: Implement 240px fixed sidebar with brand header
  - [x] 2.3: Add nav items with lucide-react icons (LayoutDashboard, ArrowLeftRight, Wallet, BarChart3)
  - [x] 2.4: Implement active-route highlighting using `useLocation()` + `Link`
- [x] Task 3: Build Navbar component (AC: #2, #5)
  - [x] 3.1: Create `Navbar.tsx` in `apps/web/src/components/`
  - [x] 3.2: Implement 64px fixed navbar with page title (derive from current route)
  - [x] 3.3: Add "Add Transaction" CTA button (non-functional placeholder for now)
- [x] Task 4: Compose MainLayout (AC: #3)
  - [x] 4.1: Create `MainLayout.tsx` in `apps/web/src/components/`
  - [x] 4.2: Wire sidebar + navbar + scrollable content area + `<Outlet />`
- [x] Task 5: Load fonts and cleanup (AC: #5, #6)
  - [x] 5.1: Add Inter and Space Grotesk font imports (Google Fonts `<link>` in `index.html`)
  - [x] 5.2: Delete unused `App.css` boilerplate file
  - [x] 5.3: Verify no console errors — TypeScript compiles, Vite builds, ESLint passes
- [x] Task 6: Migrate Tailwind CSS to v4 (required for build)
  - [x] 6.1: Install `@tailwindcss/postcss`, update PostCSS config
  - [x] 6.2: Migrate `index.css` to `@import "tailwindcss"` + `@theme` tokens
  - [x] 6.3: Remove obsolete `tailwind.config.js`

## Dev Notes

### Critical Version Alert

The architecture doc specifies Tailwind 3.x / React 18.x / Zustand 4.x, but the **actual installed versions** are:

| Package | Arch Spec | Installed | Impact |
|---|---|---|---|
| Tailwind CSS | 3.x | **4.2.0** | CSS-first config model — see notes below |
| React | 18.x | **19.2.0** | Minimal API changes for this story |
| Zustand | 4.x | **5.0.11** | `useShallow` required for multi-value selectors |
| React Router DOM | - | **7.13.0** | v6 patterns (`BrowserRouter`, `Routes`, `Route`) still work |
| Vite | - | **7.3.1** | No impact for this story |

### Tailwind CSS v4 Configuration

**The project currently uses a v3-style setup** (`tailwind.config.js` + `@tailwind` directives + PostCSS plugin). Tailwind v4's preferred approach is CSS-based config via `@theme` directives and `@import "tailwindcss"`.

**Decision for this story:** Continue with the existing v3-compat setup that Story 1.1 established. The current `tailwind.config.js` custom colors (`background`, `surface`, `border`, `indigo`, `green`, `red`) and font families (`sans: Inter`, `header: Space Grotesk`) work. Do NOT migrate to v4 native config in this story — that is a separate concern.

Use existing Tailwind classes:
- `bg-background`, `bg-surface`, `border-border` for theme colors
- `text-indigo`, `bg-indigo` for brand accent
- `font-sans` (Inter), `font-header` (Space Grotesk)
- `rounded-xl` for 12px border radius

### React Router v7 Usage

React Router v7 is **backward-compatible with v6 patterns**. Use the declarative API:

```tsx
// main.tsx
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
```

```tsx
// App.tsx
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="wallets" element={<Wallets />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
    </Routes>
  )
}
```

```tsx
// MainLayout.tsx
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div className="flex h-screen bg-background text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-[240px]">
        <Navbar />
        <main className="flex-1 overflow-auto p-6 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
```

**Note on `ml-[240px]`:** This is one exception where an arbitrary value is acceptable — the sidebar width is a fixed architectural requirement (240px) that does not map to Tailwind's standard spacing scale. Alternatively, define `w-60` (240px) in the sidebar and use `ml-60` on the content wrapper.

**Correction:** `w-60` = 15rem = 240px in Tailwind's default scale. Use `w-60` for sidebar and `ml-60` for content offset — **no arbitrary values needed**.

### Sidebar Navigation Items

Use these lucide-react icons for nav items:

| Route | Label | Icon | Import |
|---|---|---|---|
| `/` | Dashboard | `LayoutDashboard` | `lucide-react` |
| `/transactions` | Transactions | `ArrowLeftRight` | `lucide-react` |
| `/wallets` | Wallets | `Wallet` | `lucide-react` |
| `/analytics` | Analytics | `BarChart3` | `lucide-react` |

Active state: Apply `bg-indigo/10 text-indigo border-r-2 border-indigo` (or similar indigo highlight pattern) to the active nav item. Inactive: `text-gray-400 hover:text-white hover:bg-white/5`.

### Page Title Derivation

Map route pathname to page title in the Navbar:

```tsx
const titles: Record<string, string> = {
  '/': 'Dashboard',
  '/transactions': 'Transactions',
  '/wallets': 'Wallets',
  '/analytics': 'Analytics',
}
const { pathname } = useLocation()
const pageTitle = titles[pathname] ?? 'Dashboard'
```

### Project Structure Notes

Place new files according to the architecture source tree:

```
apps/web/src/
├── components/
│   ├── Sidebar.tsx        ← NEW
│   ├── Navbar.tsx         ← NEW
│   └── MainLayout.tsx     ← NEW
├── features/              (empty — future stories)
├── pages/
│   ├── Dashboard.tsx      ← NEW (placeholder)
│   ├── Transactions.tsx   ← NEW (placeholder)
│   ├── Wallets.tsx        ← NEW (placeholder)
│   └── Analytics.tsx      ← NEW (placeholder)
├── store/
│   └── useStore.ts        (exists — do not modify)
├── hooks/                 (empty — future stories)
├── utils/                 (empty — future stories)
├── assets/                (empty — future stories)
├── App.tsx                ← MODIFY (replace placeholder with router)
├── main.tsx               ← MODIFY (wrap with BrowserRouter)
├── index.css              (exists — may add font imports here)
└── App.css                ← DELETE (unused boilerplate)
```

**Note:** The architecture tree shows `components/` for UI components. Place page-level components in a `pages/` directory (standard React pattern) to separate layout components from page views.

### Anti-Pattern Prevention

- **DO NOT** create a custom router abstraction — use React Router's built-in `<Routes>`, `<Route>`, `<Link>` directly
- **DO NOT** use inline styles — use Tailwind utility classes exclusively
- **DO NOT** use `any` types — all components must be properly typed
- **DO NOT** use arbitrary Tailwind values when standard scale values exist (e.g., use `w-60` not `w-[240px]`)
- **DO NOT** modify the Zustand store in this story — state management changes come in Story 1.3
- **DO NOT** implement sidebar collapse/mobile responsive — that is Story 5.2
- **DO NOT** implement the "Add Transaction" button functionality — just render the button as a non-functional CTA

### Previous Story Intelligence (1.1 Project Initialization)

**Agent:** Antigravity (Google Deepmind)
**Key learnings from Story 1.1:**
- Monorepo structure: `apps/web`, `packages/core`, `packages/shared`
- Tailwind manually configured (npx issues encountered)
- Zustand store skeleton at `apps/web/src/store/useStore.ts` — basic theme toggle only
- React Router DOM installed but **not configured** — this story must set it up
- `App.css` contains old Vite boilerplate — should be deleted
- `index.css` has Tailwind directives with root background color set
- Code review fixed: workspace configs, package builds, boilerplate removal
- Unused `useState` import in current `App.tsx` — will be replaced entirely

### Git Intelligence

Recent commits (3 total):
1. `f8863c5` — fix: review findings (workspaces, package builds, cleanup)
2. `e14f3ad` — feat: project initialization
3. `3b7b171` — InitialCommit

Established patterns: conventional commits (`feat:`, `fix:`), direct commits to `main`.

### References

- [Source: docs/architecture/6-ui-component-architecture.md#6.2] — Sidebar 240px, Navbar 64px, component hierarchy
- [Source: docs/architecture/7-source-tree-structure.md] — File placement (components/, features/, store/)
- [Source: docs/architecture/8-coding-standards-for-ai-agents.md] — No `any`, no arbitrary Tailwind values, component size rules
- [Source: docs/architecture/3-tech-stack.md] — React, TypeScript, Tailwind, Zustand, Lucide-React
- [Source: docs/prd.md#3.1] — Design tokens (colors, typography, spacing, radius)
- [Source: docs/prd.md#2.2] — NFR4: Fixed 240px sidebar desktop
- [Source: docs/stories/implementation-artifacts/1-1-project-initialization.md] — Previous story learnings

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (Anthropic)

### Debug Log References

- Tailwind CSS v4 build failure required migration from v3-style config to v4 native `@theme` CSS config
- Installed `@tailwindcss/postcss` package, removed `tailwind.config.js`, updated `postcss.config.js`
- TypeScript strict mode compiles cleanly, ESLint passes, Vite production build succeeds

### Completion Notes List

- Implemented full application shell: Sidebar (240px fixed), Navbar (64px fixed), MainLayout with Outlet
- Set up React Router v7 with BrowserRouter, nested routes, 4 placeholder pages
- Sidebar nav uses lucide-react icons with active-route highlighting via useLocation()
- Navbar derives page title from current route, includes non-functional "Add Transaction" CTA
- Migrated Tailwind CSS from v3-compat to v4 native config (required for build to work)
- Loaded Inter + Space Grotesk fonts via Google Fonts in index.html
- Deleted App.css boilerplate
- All design tokens (colors, fonts, radius) defined in CSS @theme block

### File List

- apps/web/src/components/Sidebar.tsx (NEW)
- apps/web/src/components/Navbar.tsx (NEW)
- apps/web/src/components/MainLayout.tsx (NEW)
- apps/web/src/pages/Dashboard.tsx (NEW)
- apps/web/src/pages/Transactions.tsx (NEW)
- apps/web/src/pages/Wallets.tsx (NEW)
- apps/web/src/pages/Analytics.tsx (NEW)
- apps/web/src/App.tsx (MODIFIED — replaced placeholder with router)
- apps/web/src/main.tsx (MODIFIED — added BrowserRouter)
- apps/web/src/index.css (MODIFIED — migrated to Tailwind v4 @theme)
- apps/web/index.html (MODIFIED — added Google Fonts, updated title)
- apps/web/postcss.config.js (MODIFIED — @tailwindcss/postcss)
- apps/web/tailwind.config.js (DELETED — replaced by CSS @theme)
- apps/web/src/App.css (DELETED — unused boilerplate)
