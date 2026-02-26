# Story 4.1: Dashboard Calculation Engine

Status: done

## Story

As a **user**,
I want **to see real-time global stats (Total Balance, Income, Expense, Net Change) on my dashboard**,
so that **I have an instant overview of my financial health.**

## Acceptance Criteria

1. **Stats Grid Component**
   - 4-column grid (2 columns on mobile): Total Balance, Income, Expense, Net Change
   - Each stat card: `bg-surface`, `rounded-xl`, 24px padding, icon + label + bold 28px value
   - Color-coded: Balance = indigo, Income = green, Expense = red, Net Change = green/red based on sign

2. **Calculation Logic**
   - Total Balance: sum of all wallet balances (integer cents, displayed as dollars)
   - Income: sum of all `income` type transaction amounts
   - Expense: sum of all `expense` + `subscription` + `purchase` type transaction amounts (FR3 compliance)
   - Net Change: Income - Expense
   - Uses `useMemo` for performance — recalculates only when transactions/wallets change

3. **Recent Transactions Table**
   - Dashboard shows last 10 transactions sorted by date (newest first)
   - Columns: Title, Type, Wallet, Date, Amount
   - Amount color-coded by type (green income, red expense)

4. **Performance**
   - Stats recalculation must complete in sub-50ms (NFR2)
   - `useMemo` with proper dependency arrays to prevent unnecessary recalculation

## Tasks / Subtasks

- [x] Task 1: Create StatsGrid component (AC: #1, #2, #4)
  - [x] 1.1: Create `apps/web/src/components/StatsGrid.tsx`
  - [x] 1.2: Implement 4-stat grid with `useMemo` calculation using `sumCents`
  - [x] 1.3: Color-code stats with icons (DollarSign, TrendingUp, TrendingDown, BarChart3)
- [x] Task 2: Update Dashboard page (AC: #3)
  - [x] 2.1: Replace `apps/web/src/pages/Dashboard.tsx` placeholder with StatsGrid + recent transactions table
  - [x] 2.2: Show last 10 transactions sorted by date descending
- [x] Task 3: Verify (AC: all)
  - [x] 3.1: TypeScript compiles, ESLint passes, Vite builds

## Dev Notes

### Aggregation Rule (FR3)

"Subscription" and "Purchase" must be treated as "Expense" for dashboard totals:
```typescript
const expenseTotal = sumCents(
  transactions
    .filter(t => t.type === 'expense' || t.type === 'subscription' || t.type === 'purchase')
    .map(t => t.amount)
)
```

### Project Structure

```
apps/web/src/
├── components/
│   └── StatsGrid.tsx     ← NEW
├── pages/
│   └── Dashboard.tsx     ← MODIFIED (replaced placeholder)
```

### References

- [Source: docs/prd.md#2.1] — FR6: Global Dashboard Stats, FR3: Aggregation Logic
- [Source: docs/prd.md#2.2] — NFR2: Sub-50ms performance
- [Source: docs/prd.md#3.1] — Typography: 28px bold stats
- [Source: docs/architecture/6-ui-component-architecture.md#6.2] — StatsGrid: 4-column CSS Grid

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (Anthropic)

### Debug Log References

- TypeScript compiles cleanly, ESLint passes, Vite builds

### Completion Notes List

- Created StatsGrid component with 4-stat cards using `useMemo` for performance
- Calculations use `sumCents` from math utility — pure integer math, no floating-point
- FR3 compliance: subscription + purchase aggregated with expense
- Dashboard page shows StatsGrid + recent transactions table (last 10, sorted by date)
- Icons from lucide-react: DollarSign, TrendingUp, TrendingDown, BarChart3
- Responsive grid: 2 columns on mobile, 4 on desktop

### File List

- apps/web/src/components/StatsGrid.tsx (NEW)
- apps/web/src/pages/Dashboard.tsx (MODIFIED)
