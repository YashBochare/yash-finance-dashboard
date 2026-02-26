# Story 2.1: Wallet CRUD Logic

Status: done

## Story

As a **user**,
I want **to create, edit, and delete wallets for organizing my finances**,
so that **I can track balances across multiple accounts like Bank, Card, and Cash.**

## Acceptance Criteria

1. **Create Wallet**
   - User can create a wallet with: name, color (hex), initial balance (entered in dollars, stored in cents)
   - Modal form with fields: Name (text), Color (color picker or preset swatches), Initial Balance (number input)
   - On submit: wallet added to Zustand store, persisted to localStorage
   - New wallet appears immediately in the Wallets page

2. **Edit Wallet**
   - User can edit wallet name and color (balance is computed, not manually editable)
   - Edit form pre-populated with current wallet data
   - On submit: wallet updated in store, changes persist

3. **Delete Wallet — Safety Constraint**
   - User can delete a wallet ONLY if it has zero associated transactions
   - If wallet has transactions: show error message "Cannot delete wallet with existing transactions. Remove all transactions first."
   - If wallet has no transactions: show confirmation dialog, then delete on confirm
   - FR5 compliance: Prevent deletion of wallets containing associated transactions

4. **Wallet Form Modal**
   - Centered overlay modal with `bg-surface` background, `border-border`, `rounded-xl`
   - Close on backdrop click or X button
   - Form validation: name required, balance must be valid number

5. **Wallets Page Integration**
   - Wallets page (currently placeholder) shows list of wallets with "Add Wallet" button
   - Each wallet row shows name, color indicator, balance (formatted as currency)
   - Edit and Delete action buttons per wallet row

## Tasks / Subtasks

- [x] Task 1: Build Wallet Form Modal (AC: #1, #2, #4)
  - [x] 1.1: Create `apps/web/src/components/WalletFormModal.tsx` with name, color, balance fields
  - [x] 1.2: Implement dollar-to-cents conversion on balance input (multiply by 100, round to integer)
  - [x] 1.3: Support both create and edit modes (edit pre-populates existing data)
  - [x] 1.4: Form validation: name required, balance numeric
- [x] Task 2: Implement delete safety constraint (AC: #3)
  - [x] 2.1: Add `hasTransactions(walletId)` selector or check in store
  - [x] 2.2: Create confirmation dialog for wallet deletion
  - [x] 2.3: Show error toast/message when attempting to delete wallet with transactions
- [x] Task 3: Build Wallets page (AC: #5)
  - [x] 3.1: Replace `apps/web/src/pages/Wallets.tsx` placeholder with full wallet list UI
  - [x] 3.2: Add "Add Wallet" button that opens WalletFormModal
  - [x] 3.3: Display wallet rows with name, color dot, balance (formatted), edit/delete buttons
  - [x] 3.4: Wire edit button to WalletFormModal in edit mode
  - [x] 3.5: Wire delete button to safety-checked deletion flow
- [x] Task 4: Verify (AC: all)
  - [x] 4.1: TypeScript compiles, ESLint passes, Vite builds
  - [x] 4.2: Create/edit/delete wallet flow works end-to-end with persistence

## Dev Notes

### Dollar-to-Cents Conversion

Per architecture (Integer Rule), user inputs dollar amounts but storage is in cents:
```typescript
const amountInCents = Math.round(parseFloat(dollarInput) * 100)
```
Display conversion: `(cents / 100).toFixed(2)`

Do NOT build a full math utility here — that's Story 3.1. Just do inline conversion for wallet initial balance.

### Delete Safety Check

```typescript
// In store or as a derived selector
const walletHasTransactions = (walletId: string) =>
  useStore.getState().transactions.some(t => t.walletId === walletId)
```

### Modal Pattern

Use a simple React portal or overlay div pattern. No external modal library needed.

```tsx
// Basic modal overlay pattern
<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div className="bg-surface border border-border rounded-xl p-6 w-full max-w-md">
    {/* form content */}
  </div>
</div>
```

### Color Presets

Provide preset color swatches matching the design system:
- `#6366F1` (Indigo), `#10B981` (Green), `#EF4444` (Red), `#F59E0B` (Amber), `#8B5CF6` (Purple), `#EC4899` (Pink)

### Project Structure

```
apps/web/src/
├── components/
│   └── WalletFormModal.tsx   ← NEW
├── pages/
│   └── Wallets.tsx           ← MODIFY (replace placeholder)
```

### Anti-Pattern Prevention

- **DO NOT** build a full currency formatting utility — simple `(cents / 100).toFixed(2)` is sufficient for now
- **DO NOT** use external modal or form libraries — keep it native React
- **DO NOT** allow manual balance editing on existing wallets — balance is derived from transactions (Epic 4)
- **DO NOT** implement wallet card display styling — that's Story 2.2

### References

- [Source: docs/architecture/4-data-models.md] — Wallet entity
- [Source: docs/architecture/5-the-finance-engine-logic.md#5.1] — Integer Rule
- [Source: docs/prd.md#2.1] — FR4: Wallet CRUD, FR5: Wallet safety constraint
- [Source: docs/architecture/8-coding-standards-for-ai-agents.md] — Component size, strict typing

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (Anthropic)

### Debug Log References

- TypeScript compiles cleanly, ESLint passes, Vite builds

### Completion Notes List

- Created WalletFormModal component with create/edit modes, dollar-to-cents conversion, color presets
- Updated Wallets page with full CRUD: add wallet button, wallet list, edit/delete per wallet
- Implemented FR5 delete safety constraint: blocks deletion when wallet has associated transactions
- Confirmation dialog for wallet deletion, timed error message for safety violations
- Form validation: name required, balance must be valid number

### File List

- apps/web/src/components/WalletFormModal.tsx (NEW)
- apps/web/src/pages/Wallets.tsx (MODIFIED)
