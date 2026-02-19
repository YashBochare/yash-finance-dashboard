# 8. Coding Standards for AI Agents
1.  **Strict Typing:** No `any` types. All financial amounts must use the `CentAmount` type alias (number).
2.  **Tailwind Strictness:** Do not use arbitrary values like `p-[23px]`. Use standard scales or custom defined tokens.
3.  **Component Size:** Break complex modals into sub-components (e.g., `TransactionForm`, `WalletSelect`).
4.  **Immutability:** Always use spread operators or `immer` when updating the Zustand store.

---
