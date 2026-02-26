# Story 5.2: Mobile Responsive Optimization

Status: done

## Story

As a **user**,
I want **the dashboard to work well on mobile devices with a collapsible sidebar and stacked layouts**,
so that **I can manage my finances on any screen size.**

## Acceptance Criteria

1. **Collapsible Sidebar**
   - Sidebar hidden off-screen on mobile (below `lg` breakpoint: 1024px)
   - Hamburger menu button (`Menu` icon) in navbar to toggle sidebar open
   - Sidebar slides in from left with backdrop overlay on mobile
   - Backdrop click or X button closes sidebar
   - Nav item click closes sidebar automatically on mobile
   - Sidebar remains fixed 240px on desktop (`lg:translate-x-0`)

2. **Responsive Navbar**
   - Navbar spans full width on mobile (no 240px left offset)
   - `lg:left-60` offset on desktop for sidebar clearance
   - Hamburger menu icon visible only on mobile (`lg:hidden`)
   - "Add Transaction" button text hidden on small screens, icon-only (`hidden sm:inline`)

3. **Responsive Grids**
   - StatsGrid: 2 columns on mobile, 4 on desktop (`grid-cols-2 lg:grid-cols-4`)
   - Chart section: 1 column on mobile, 2 on desktop (`grid-cols-1 lg:grid-cols-2`)
   - Wallet gallery: 1 column mobile, 2 tablet, 3 desktop (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`)

4. **Content Area**
   - Padding reduced on mobile: `p-4` vs `lg:p-6`
   - Main content offset: no left margin on mobile, `lg:ml-60` on desktop

## Tasks / Subtasks

- [x] Task 1: Make Sidebar collapsible (AC: #1)
  - [x] 1.1: Update `Sidebar.tsx` with `open`/`onClose` props
  - [x] 1.2: Add backdrop overlay, X close button, and slide-in transition
  - [x] 1.3: Close on nav item click and backdrop click
  - [x] 1.4: `lg:translate-x-0` to keep sidebar visible on desktop
- [x] Task 2: Make Navbar responsive (AC: #2)
  - [x] 2.1: Update `Navbar.tsx` with `onMenuClick` prop and hamburger Menu icon
  - [x] 2.2: Full-width on mobile (`left-0 lg:left-60`)
  - [x] 2.3: Hide "Add Transaction" text on small screens
- [x] Task 3: Update MainLayout state management (AC: #4)
  - [x] 3.1: Add `sidebarOpen` state to `MainLayout.tsx`
  - [x] 3.2: Wire sidebar open/close handlers between Navbar and Sidebar
  - [x] 3.3: Responsive content offset (`lg:ml-60`) and padding (`p-4 lg:p-6`)
- [x] Task 4: Make grids responsive (AC: #3)
  - [x] 4.1: StatsGrid: `grid-cols-2 lg:grid-cols-4`
  - [x] 4.2: Chart grids: `grid-cols-1 lg:grid-cols-2` on Dashboard and Analytics
  - [x] 4.3: Wallet gallery: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- [x] Task 5: Verify (AC: all)
  - [x] 5.1: TypeScript compiles, ESLint passes, Vite builds

## Dev Notes

### Breakpoint Strategy

Using Tailwind's default breakpoints:
- `sm`: 640px (small tablet)
- `lg`: 1024px (desktop — sidebar toggle point)

### NFR4 Compliance

From [Source: docs/prd.md#2.2] — NFR4: Fixed 240px sidebar (desktop) to collapsible menu (mobile).

### Project Structure

```
apps/web/src/
├── components/
│   ├── Sidebar.tsx       ← MODIFIED (collapsible with open/onClose)
│   ├── Navbar.tsx        ← MODIFIED (hamburger menu, responsive offset)
│   ├── MainLayout.tsx    ← MODIFIED (sidebar state, responsive layout)
│   └── StatsGrid.tsx     ← MODIFIED (responsive grid-cols)
├── pages/
│   ├── Dashboard.tsx     ← MODIFIED (responsive chart grid)
│   ├── Analytics.tsx     ← MODIFIED (responsive chart grid)
│   └── Wallets.tsx       ← MODIFIED (responsive wallet grid)
```

### References

- [Source: docs/prd.md#2.2] — NFR4: Responsive Fluidity
- [Source: docs/architecture/6-ui-component-architecture.md#6.2] — Sidebar 240px, Navbar 64px

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (Anthropic)

### Debug Log References

- TypeScript compiles cleanly, ESLint passes, Vite builds

### Completion Notes List

- Sidebar now accepts `open`/`onClose` props; hidden off-screen on mobile with slide-in transition
- Mobile backdrop overlay with click-to-close; X button in sidebar header; auto-close on nav click
- Navbar has hamburger Menu icon (mobile-only) and responsive "Add Transaction" (icon-only on small screens)
- MainLayout manages `sidebarOpen` state; content area uses `lg:ml-60` and `p-4 lg:p-6`
- StatsGrid: 2-col mobile, 4-col desktop
- Charts: 1-col mobile, 2-col desktop (Dashboard + Analytics)
- Wallet gallery: 1-col mobile, 2-col tablet, 3-col desktop

### File List

- apps/web/src/components/Sidebar.tsx (MODIFIED)
- apps/web/src/components/Navbar.tsx (MODIFIED)
- apps/web/src/components/MainLayout.tsx (MODIFIED)
- apps/web/src/components/StatsGrid.tsx (MODIFIED)
- apps/web/src/pages/Dashboard.tsx (MODIFIED)
- apps/web/src/pages/Analytics.tsx (MODIFIED)
- apps/web/src/pages/Wallets.tsx (MODIFIED)
