# Yash-Finance Product Requirements Document (PRD)

**Date:** October 26, 2023  
**Version:** 1.0  
**Status:** Approved for Implementation  
**Author:** John (Product Manager) 📋

---

## 1. Goals and Background Context

### 1.1 Goals
*   **Mathematical Integrity:** Implement a zero-error calculation engine using integer-based math (cents) for all financial totals.
*   **Premium Visual Experience:** Adhere to a strict 8px spacing system and a "Dark Graphite" color palette to create a professional, calm fintech environment.
*   **Local Sovereignty:** Ensure 100% of user data remains on the device via `localStorage`, providing privacy and offline availability.
*   **Instant Feedback:** Achieve sub-50ms dashboard recalculations (Stats & Charts) whenever data is modified.
*   **Structural Clarity:** Maintain a rigid UI hierarchy with a fixed sidebar and responsive grid that scales from desktop to mobile.

### 1.2 Background Context
**Yash-Finance** fill the gap between complex, cloud-synced applications and over-simplified lists. It is a "local-first" dashboard that feels like a premium banking application but functions as a private, standalone tool. By focusing on a minimal yet high-fidelity aesthetic, the application aims to reduce "financial anxiety" through precision and structural harmony.

### 1.3 Change Log
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 2023-10-26 | v1.0 | Initial PRD Draft derived from Refined Project Brief | John (PM) |

---

## 2. Requirements

### 2.1 Functional Requirements (FR)
*   **FR1: Transaction CRUD (Modal-Driven):** Create, Read, Update, and Delete transactions via a centered modal.
*   **FR2: Financial Event Types:** Support for *Income*, *Expense*, *Subscription*, and *Purchase*.
*   **FR3: Aggregation Logic:** "Subscription" and "Purchase" must be treated as "Expense" for dashboard totals.
*   **FR4: Wallet Management:** CRUD for multiple wallets (Bank, Card, Cash).
*   **FR5: Wallet Safety Constraint:** Prevent deletion of a wallet if it contains associated transactions.
*   **FR6: Global Dashboard Stats:** Total Balance, Income, and Expense cards must reflect the aggregate of all stored data.
*   **FR7: Persistent Storage:** Mirror all state changes to `localStorage` immediately.
*   **FR8: Search & Filter Logic:** Search by title and filter by category/type. Stats remain global during table filtering.
*   **FR9: Dynamic Data Visualization:** Real-time Indigo/Green/Red charts for trends and category breakdowns.

### 2.2 Non-Functional Requirements (NFR)
*   **NFR1: Mathematical Precision:** All calculations must use **integers** (cents). UI conversion only for display.
*   **NFR2: Performance Latency:** UI updates (Stats/Charts) must complete in under **50ms**.
*   **NFR3: Structural Fidelity:** Strict adherence to the **8px spacing system**.
*   **NFR4: Responsive Fluidity:** Fixed 240px sidebar (desktop) to collapsible menu (mobile).
*   **NFR5: Data Sovereignty:** No external data transmission; 100% client-side.

---

## 3. User Interface Design Goals

### 3.1 Design System Tokens
*   **Palette:**
    *   Background: `#0F1117` | Surface: `#161A23` | Border: `#232634`
    *   Indigo: `#6366F1` | Green: `#10B981` | Red: `#EF4444`
*   **Typography:** Inter (Body) / Space Grotesk (Headers). 28px (Stats), 24px (Title), 18px (Brand), 14px (Nav).
*   **Rhythm:** 8px base grid. Spacing: 16px, 24px, 32px. Radius: 12px. Navbar: 64px.

### 3.2 Key Views
*   **Dashboard:** 4-column stats grid, primary charts, and "Recent Transactions" table.
*   **Wallet Gallery:** High-fidelity cards (`#161A23`) with 24px padding.

---

## 4. Technical Assumptions

*   **Repository:** Monorepo (Vite/TypeScript) to separate Finance Core logic from UI.
*   **State Management:** **Zustand** for high-performance reactive state.
*   **Schema:** `localStorage` must include a `version` key for future migrations.
*   **Math:** Dedicated utility for decimal-to-integer conversion.

---

## 5. Epic & Story List

### Epic 1: Foundation & Design Scaffolding
*   **Story 1.1:** Project Initialization (Vite, TS, Tailwind Config).
*   **Story 1.2:** Core Shell Layout (240px Sidebar, 64px Navbar).
*   **Story 1.3:** Persistence & Global State (Zustand + LocalStorage).

### Epic 2: Wallet Management System
*   **Story 2.1:** Wallet CRUD Logic (Safety constraints for deletion).
*   **Story 2.2:** Wallet Card Display (12px radius, bold 28px values).

### Epic 3: Transaction Engine & Integer Math
*   **Story 3.1:** Integer Math Utility (Cents-based calculation logic).
*   **Story 3.2:** Transaction Modal & CRUD (Modal-based data entry).

### Epic 4: Analytics Dashboard & Real-time Stats
*   **Story 4.1:** Dashboard Calculation Engine (Sub-50ms global updates).
*   **Story 4.2:** Dynamic Trend & Category Charts (Indigo/Green/Red data viz).

### Epic 5: Search, Filtering & Responsive Polish
*   **Story 5.1:** Real-time Search & Filter (Global Stats preservation).
*   **Story 5.2:** Mobile Responsive Optimization (Collapsible menu & stacked grid).

---

## 6. Next Steps
1.  **Handoff to UX Expert/Architect** to define the Frontend Specification and System Architecture.
2.  **Shard Document:** Break this PRD into `docs/prd/` shards for development.

***

