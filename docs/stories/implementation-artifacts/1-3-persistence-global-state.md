# Story 1.3: Persistence & Global State

Status: done

## Story

As a **user**,
I want **my wallets and transactions to persist across browser sessions**,
so that **I never lose my financial data when I close or refresh the app.**

## Acceptance Criteria

1. **TypeScript Data Models**
   - `Wallet` interface: `id` (string UUID), `name` (string), `balance` (number, cents), `color` (string hex), `createdAt` (string ISO)
   - `Transaction` interface: `id` (string UUID), `title` (string), `amount` (number, cents), `type` (TransactionType), `category` (string), `walletId` (string), `date` (string ISO)
   - `TransactionType` = `'income' | 'expense' | 'subscription' | 'purchase'`
   - Types exported from a shared location (`apps/web/src/types/`)

2. **Zustand Store with Slices**
   - Single store with slices: `wallets: Wallet[]`, `transactions: Transaction[]`, `settings: { currency: string }`
   - Wallet actions: `addWallet`, `updateWallet`, `removeWallet`
   - Transaction actions: `addTransaction`, `updateTransaction`, `removeTransaction`
   - All state updates use spread operators or immer (immutability required per coding standards)
   - No `any` types anywhere

3. **LocalStorage Persistence**
   - Zustand `persist` middleware syncs entire store to `localStorage`
   - Storage key: `yash-finance-storage`
   - Schema includes `version: 1` for future migrations
   - State mirrors architecture schema: `{ version, state: { wallets, transactions, settings } }`
   - On app load, store hydrates from localStorage automatically

4. **UUID Generation**
   - Use `crypto.randomUUID()` (native browser API) for generating entity IDs
   - No external UUID library needed

5. **Operational Verification**
   - Add a wallet via store action → refresh browser → wallet still present
   - Add a transaction → refresh → transaction still present
   - localStorage entry visible in DevTools under key `yash-finance-storage`
   - Store hydration does not cause visual flicker or errors

## Tasks / Subtasks

- [x] Task 1: Define TypeScript data models (AC: #1)
  - [x] 1.1: Create `apps/web/src/types/index.ts` with `Wallet`, `Transaction`, `TransactionType`, `Settings` interfaces
- [x] Task 2: Implement Zustand store with persist middleware (AC: #2, #3)
  - [x] 2.1: Replace `apps/web/src/store/useStore.ts` with full store: wallets, transactions, settings slices
  - [x] 2.2: Add Zustand `persist` middleware from `zustand/middleware` with `yash-finance-storage` key
  - [x] 2.3: Include `version: 1` in persisted state
  - [x] 2.4: Implement wallet actions: `addWallet`, `updateWallet`, `removeWallet`
  - [x] 2.5: Implement transaction actions: `addTransaction`, `updateTransaction`, `removeTransaction`
- [x] Task 3: Verify persistence end-to-end (AC: #4, #5)
  - [x] 3.1: Verify TypeScript compiles, ESLint passes, Vite builds
  - [x] 3.2: Confirm localStorage schema matches architecture spec

## Dev Notes

### Zustand v5 Persist Middleware

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
```

**Important:** In Zustand v5, the `persist` middleware wraps the store creator. The `version` field enables future migrations via the `migrate` option.

### Architecture Data Models

From [Source: docs/architecture/4-data-models.md]

### LocalStorage Schema

From [Source: docs/architecture/5-the-finance-engine-logic.md#5.2]

### Project Structure Notes

```
apps/web/src/
├── types/
│   └── index.ts           ← NEW
├── store/
│   └── useStore.ts        ← MODIFIED
```

### Anti-Pattern Prevention

- **DO NOT** use external UUID libraries — `crypto.randomUUID()` is natively available
- **DO NOT** use `any` — all store state and actions must be fully typed
- **DO NOT** mutate state directly — always use spread operators or immer for immutability
- **DO NOT** add wallet balance recalculation logic here — that belongs to the Finance Engine (Epic 3)

### References

- [Source: docs/architecture/4-data-models.md] — Wallet and Transaction interfaces
- [Source: docs/architecture/5-the-finance-engine-logic.md#5.2] — LocalStorage schema
- [Source: docs/architecture/8-coding-standards-for-ai-agents.md] — No `any`, immutability
- [Source: docs/prd.md#2.1] — FR7: Persistent storage mirroring
- [Source: docs/prd.md#4] — Schema versioning requirement

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (Anthropic)

### Debug Log References

- TypeScript compiles cleanly with strict mode
- ESLint passes with no warnings
- Vite production build succeeds

### Completion Notes List

- Created `types/index.ts` with Wallet, Transaction, TransactionType, Settings interfaces matching architecture data models
- Replaced skeleton useStore.ts with full Zustand v5 persist store
- Store has wallets[], transactions[], settings slices with full CRUD actions
- All state updates use spread operators (immutability)
- `crypto.randomUUID()` for ID generation, no external dependencies
- Persist middleware configured with `yash-finance-storage` key and version: 1
- No `any` types — fully typed with proper Omit<> and Partial<> generics

### File List

- apps/web/src/types/index.ts (NEW)
- apps/web/src/store/useStore.ts (MODIFIED)
