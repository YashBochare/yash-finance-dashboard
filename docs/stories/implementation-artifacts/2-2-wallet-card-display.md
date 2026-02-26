# Story 2.2: Wallet Card Display

Status: done

## Story

As a **user**,
I want **to see my wallets displayed as high-fidelity cards with bold balance values**,
so that **I can quickly scan my financial accounts at a glance.**

## Acceptance Criteria

1. **Wallet Card Component**
   - Each wallet rendered as a card: `bg-surface` (#161A23), 24px padding, `rounded-xl` (12px)
   - Card accent: colored left border or top stripe using wallet's `color` field
   - Wallet name displayed prominently
   - Balance displayed in bold 28px (Space Grotesk), formatted as currency with 2 decimal places

2. **Wallet Gallery Layout**
   - Wallets page displays cards in a responsive grid (3 columns on desktop, 2 on tablet, 1 on mobile)
   - Cards have consistent spacing (16px gap)
   - Empty state: "No wallets yet" message with CTA to add

3. **Card Actions**
   - Each card has edit and delete icon buttons (top-right corner)
   - Actions reuse existing CRUD logic from Story 2.1

## Tasks / Subtasks

- [x] Task 1: Create WalletCard component (AC: #1)
  - [x] 1.1: Create `apps/web/src/components/WalletCard.tsx`
  - [x] 1.2: Implement card with surface background, accent color stripe (left border), name, bold 28px balance
- [x] Task 2: Update Wallets page with card grid (AC: #2, #3)
  - [x] 2.1: Replace wallet list rows with WalletCard grid layout (responsive: 1/2/3 columns)
  - [x] 2.2: Pass edit/delete handlers from Wallets page to WalletCard
- [x] Task 3: Verify (AC: all)
  - [x] 3.1: TypeScript compiles, ESLint passes, Vite builds

## Dev Notes

### Card Design Specs

From [Source: docs/prd.md#3.2]:
- Surface color: `#161A23` (bg-surface)
- Padding: 24px (p-6)
- Border radius: 12px (rounded-xl)
- Balance font: Space Grotesk (font-header), 28px, bold
- Left color accent strip using wallet's `color` field

### Project Structure

```
apps/web/src/
├── components/
│   └── WalletCard.tsx     ← NEW
├── pages/
│   └── Wallets.tsx        ← MODIFY (grid layout + WalletCard)
```

### References

- [Source: docs/prd.md#3.2] — Wallet Gallery: High-fidelity cards
- [Source: docs/prd.md#3.1] — Typography: 28px stats
- [Source: docs/architecture/6-ui-component-architecture.md] — Component hierarchy

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (Anthropic)

### Debug Log References

- TypeScript compiles cleanly, ESLint passes, Vite builds

### Completion Notes List

- Created WalletCard component with surface background, colored left accent strip, name, and bold 28px balance
- Edit and delete icon buttons in top-right corner, wired to parent handlers
- Wallets page now uses responsive grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Existing CRUD logic from Story 2.1 fully reused

### File List

- apps/web/src/components/WalletCard.tsx (NEW)
- apps/web/src/pages/Wallets.tsx (MODIFIED)
