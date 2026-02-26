# Story 3.1: Integer Math Utility

Status: done

## Story

As a **developer**,
I want **a dedicated utility module for integer-based (cents) currency math**,
so that **all financial calculations are free of floating-point errors.**

## Acceptance Criteria

1. **Core Math Functions**
   - `toCents(dollars: string | number): number` — converts dollar input to integer cents (rounds to nearest cent)
   - `formatCurrency(cents: number): string` — converts cents to display string with `$` prefix and 2 decimal places
   - `sumCents(amounts: number[]): number` — sums an array of cent values using integer addition

2. **Edge Case Handling**
   - `toCents` returns 0 for NaN or invalid input
   - `formatCurrency` handles negative values with `-$` prefix
   - No floating-point operations in the sum — pure integer addition

3. **Architecture Compliance**
   - Functions located in `apps/web/src/utils/math.ts` per source tree structure
   - No external math library needed (no Decimal.js) — simple integer operations
   - Exported for use across the app

## Tasks / Subtasks

- [x] Task 1: Create integer math utility (AC: #1, #2, #3)
  - [x] 1.1: Create `apps/web/src/utils/math.ts` with `toCents`, `formatCurrency`, `sumCents`
  - [x] 1.2: Handle edge cases: NaN input, negative values, empty arrays
- [x] Task 2: Verify (AC: all)
  - [x] 2.1: TypeScript compiles, ESLint passes, Vite builds

## Dev Notes

### Integer Rule

From [Source: docs/architecture/5-the-finance-engine-logic.md#5.1]:
- Input: User types `10.50` → utility converts to `1050`
- Storage: `1050` stored in the Transaction/Wallet object
- Calculation: `balance = sum(incomes) - sum(expenses)` using integer math
- Display: `(1050 / 100).toFixed(2)` → `$10.50`

### Project Structure

```
apps/web/src/
├── utils/
│   └── math.ts    ← NEW
```

### References

- [Source: docs/architecture/5-the-finance-engine-logic.md#5.1] — The Integer Rule
- [Source: docs/prd.md#2.2] — NFR1: Mathematical Precision
- [Source: docs/architecture/8-coding-standards-for-ai-agents.md] — CentAmount type alias

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (Anthropic)

### Debug Log References

- TypeScript compiles cleanly, ESLint passes, Vite builds

### Completion Notes List

- Created `math.ts` utility with three functions: `toCents`, `formatCurrency`, `sumCents`
- `toCents` handles string and number input with `Math.round(parsed * 100)` for integer precision
- `formatCurrency` handles negative values with `-$` prefix, uses `Math.abs` for display
- `sumCents` uses `Array.reduce` with pure integer addition
- No external dependencies — all native JavaScript math

### File List

- apps/web/src/utils/math.ts (NEW)
