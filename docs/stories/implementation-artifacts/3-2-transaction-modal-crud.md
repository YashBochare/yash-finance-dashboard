# Story 3.2: Transaction Modal & CRUD

Status: done

## Story

As a **user**,
I want **to create, edit, and delete transactions via a centered modal form**,
so that **I can record my financial activity across my wallets.**

## Acceptance Criteria

1. **Transaction Form Modal**
   - Centered overlay modal with `bg-surface`, `border-border`, `rounded-xl`
   - Fields: Title (text), Amount in dollars (converts to cents on submit), Type (4-button selector: income/expense/subscription/purchase), Category (dropdown), Wallet (dropdown), Date (date picker)
   - Close on backdrop click, X button, or Escape key
   - Form validation: title required, amount > 0, wallet required

2. **Transaction Types**
   - Support for 4 types: `income`, `expense`, `subscription`, `purchase`
   - Visual type selector with toggle buttons (active = indigo highlight)
   - Per FR3: subscription and purchase treated as expense for totals

3. **CRUD Operations**
   - Create: opens empty form, submits via `addTransaction` store action
   - Edit: pre-populates form with existing data, submits via `updateTransaction`
   - Delete: inline delete button on transaction rows via `removeTransaction`
   - Dollar-to-cents conversion using `toCents()` from math utility (Story 3.1)

4. **Transactions Page**
   - Full transaction list table with columns: Title, Type, Category, Wallet, Date, Amount, Actions
   - Sorted by date (newest first)
   - Add Transaction button opens modal
   - Edit/Delete action buttons per row
   - Amount colored: green for income, red for expense/subscription/purchase

5. **Navbar CTA**
   - "Add Transaction" button in navbar now opens the transaction modal from any page

## Tasks / Subtasks

- [x] Task 1: Build TransactionFormModal (AC: #1, #2, #3)
  - [x] 1.1: Create `apps/web/src/components/TransactionFormModal.tsx`
  - [x] 1.2: Implement form fields with type toggle buttons, category/wallet dropdowns, date picker
  - [x] 1.3: Dollar-to-cents conversion using `toCents()` from utils/math
  - [x] 1.4: Support create and edit modes
  - [x] 1.5: Form validation and escape-to-close
- [x] Task 2: Build Transactions page (AC: #4)
  - [x] 2.1: Replace `apps/web/src/pages/Transactions.tsx` placeholder with full table UI
  - [x] 2.2: Sort transactions by date descending
  - [x] 2.3: Color-code amounts by type (green/red)
  - [x] 2.4: Wire add/edit/delete actions
- [x] Task 3: Wire Navbar CTA (AC: #5)
  - [x] 3.1: Update `apps/web/src/components/Navbar.tsx` to open TransactionFormModal on "Add Transaction" click
- [x] Task 4: Verify (AC: all)
  - [x] 4.1: TypeScript compiles, ESLint passes, Vite builds

## Dev Notes

### Transaction Type Categories

```typescript
const TRANSACTION_TYPES: TransactionType[] = ['income', 'expense', 'subscription', 'purchase']
```

Per FR3: "Subscription" and "Purchase" must be treated as "Expense" for dashboard totals.

### Category List

Predefined categories: Salary, Freelance, Food, Transport, Entertainment, Utilities, Shopping, Health, Education, Other

### Project Structure

```
apps/web/src/
├── components/
│   ├── TransactionFormModal.tsx   ← NEW
│   └── Navbar.tsx                 ← MODIFIED (added modal trigger)
├── pages/
│   └── Transactions.tsx           ← MODIFIED (replaced placeholder)
```

### References

- [Source: docs/architecture/4-data-models.md#4.2] — Transaction entity
- [Source: docs/prd.md#2.1] — FR1: Transaction CRUD, FR2: Event types, FR3: Aggregation logic
- [Source: docs/architecture/5-the-finance-engine-logic.md#5.1] — Integer math for amounts
- [Source: docs/architecture/8-coding-standards-for-ai-agents.md] — Component size rules

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (Anthropic)

### Debug Log References

- TypeScript compiles cleanly, ESLint passes, Vite builds

### Completion Notes List

- Created TransactionFormModal with full form: title, amount, 4-button type selector, category dropdown, wallet dropdown, date picker
- Dollar-to-cents conversion via `toCents()` from math utility
- Create and edit modes supported; form pre-populates in edit mode
- Escape key and backdrop click close the modal
- Transactions page replaced with full table: sorted by date, color-coded amounts, edit/delete per row
- Navbar "Add Transaction" CTA now opens TransactionFormModal from any page

### File List

- apps/web/src/components/TransactionFormModal.tsx (NEW)
- apps/web/src/components/Navbar.tsx (MODIFIED)
- apps/web/src/pages/Transactions.tsx (MODIFIED)
