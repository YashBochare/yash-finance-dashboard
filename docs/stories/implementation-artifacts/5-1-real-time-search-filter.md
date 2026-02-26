# Story 5.1: Real-time Search & Filter

Status: done

## Story

As a **user**,
I want **to search transactions by title and filter by type or category**,
so that **I can quickly find specific transactions without scrolling through the entire list.**

## Acceptance Criteria

1. **Search by Title**
   - Text input with search icon (lucide-react `Search`) above the transactions table
   - Real-time filtering as user types — no submit button needed
   - Case-insensitive matching on transaction title
   - Placeholder text: "Search by title..."

2. **Filter by Type**
   - Dropdown/select for transaction type: All Types, Income, Expense, Subscription, Purchase
   - Filters applied in combination with search query

3. **Filter by Category**
   - Dropdown/select for category (dynamically populated from existing transaction categories)
   - Filters applied in combination with search and type filter

4. **Global Stats Preservation (FR8)**
   - Dashboard stats grid (StatsGrid) always reflects ALL transactions — not affected by search/filter
   - Only the transaction table on the Transactions page is filtered
   - Stats remain global during table filtering

5. **UX**
   - Filters shown in a horizontal bar above the table
   - "No transactions match your filters" message when filters yield empty results
   - Filtering is instant (sub-50ms) using `useMemo`

## Tasks / Subtasks

- [x] Task 1: Add search and filter controls (AC: #1, #2, #3, #5)
  - [x] 1.1: Add search input with Search icon to Transactions page
  - [x] 1.2: Add type filter dropdown (All Types + 4 types)
  - [x] 1.3: Add category filter dropdown (dynamic from existing categories)
  - [x] 1.4: Horizontal filter bar layout above table
- [x] Task 2: Implement filter logic (AC: #4)
  - [x] 2.1: `useMemo` combining search + type + category filters on transactions
  - [x] 2.2: Ensure StatsGrid is not affected by transaction page filters (global stats)
  - [x] 2.3: Empty filtered results message
- [x] Task 3: Verify (AC: all)
  - [x] 3.1: TypeScript compiles, ESLint passes, Vite builds

## Dev Notes

### FR8 Compliance

From [Source: docs/prd.md#2.1] — FR8: Stats remain global during table filtering.
The StatsGrid component reads directly from `useStore(s => s.transactions)` — no filtering applied.
Only the Transactions page table uses the filtered/searched subset.

### Filter Implementation

```typescript
const filteredTransactions = useMemo(() => {
  let result = [...transactions]
  if (searchQuery.trim()) result = result.filter(t => t.title.toLowerCase().includes(q))
  if (filterType) result = result.filter(t => t.type === filterType)
  if (filterCategory) result = result.filter(t => t.category === filterCategory)
  return result.sort(...)
}, [transactions, searchQuery, filterType, filterCategory])
```

### Project Structure

```
apps/web/src/
├── pages/
│   └── Transactions.tsx    ← MODIFIED (added search/filter bar)
```

### References

- [Source: docs/prd.md#2.1] — FR8: Search & Filter Logic, global stats preservation
- [Source: docs/prd.md#2.2] — NFR2: Sub-50ms performance

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (Anthropic)

### Debug Log References

- TypeScript compiles cleanly, ESLint passes, Vite builds

### Completion Notes List

- Added search input with Search icon, type dropdown, category dropdown in horizontal filter bar
- Real-time filtering via `useMemo` combining all three filters
- Category dropdown dynamically populated from unique transaction categories
- FR8 compliance: StatsGrid unaffected by filters — reads unfiltered store state
- Empty state differentiates between "no transactions" and "no filter matches"

### File List

- apps/web/src/pages/Transactions.tsx (MODIFIED)
