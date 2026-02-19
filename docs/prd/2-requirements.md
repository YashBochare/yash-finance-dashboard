# 2. Requirements

## 2.1 Functional Requirements (FR)
*   **FR1: Transaction CRUD (Modal-Driven):** Create, Read, Update, and Delete transactions via a centered modal.
*   **FR2: Financial Event Types:** Support for *Income*, *Expense*, *Subscription*, and *Purchase*.
*   **FR3: Aggregation Logic:** "Subscription" and "Purchase" must be treated as "Expense" for dashboard totals.
*   **FR4: Wallet Management:** CRUD for multiple wallets (Bank, Card, Cash).
*   **FR5: Wallet Safety Constraint:** Prevent deletion of a wallet if it contains associated transactions.
*   **FR6: Global Dashboard Stats:** Total Balance, Income, and Expense cards must reflect the aggregate of all stored data.
*   **FR7: Persistent Storage:** Mirror all state changes to `localStorage` immediately.
*   **FR8: Search & Filter Logic:** Search by title and filter by category/type. Stats remain global during table filtering.
*   **FR9: Dynamic Data Visualization:** Real-time Indigo/Green/Red charts for trends and category breakdowns.

## 2.2 Non-Functional Requirements (NFR)
*   **NFR1: Mathematical Precision:** All calculations must use **integers** (cents). UI conversion only for display.
*   **NFR2: Performance Latency:** UI updates (Stats/Charts) must complete in under **50ms**.
*   **NFR3: Structural Fidelity:** Strict adherence to the **8px spacing system**.
*   **NFR4: Responsive Fluidity:** Fixed 240px sidebar (desktop) to collapsible menu (mobile).
*   **NFR5: Data Sovereignty:** No external data transmission; 100% client-side.

---
