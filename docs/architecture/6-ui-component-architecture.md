# 6. UI & Component Architecture

## 6.1 Design Tokens (Tailwind Config)
*   **Spacing:** `8px` base. `1 = 4px`, `2 = 8px`, `4 = 16px`, `6 = 24px`, `8 = 32px`.
*   **Radius:** `rounded-xl` (12px).
*   **Theme:**
    *   `bg-main`: `#0F1117`
    *   `bg-surface`: `#161A23`
    *   `border-subtle`: `#232634`
    *   `brand-indigo`: `#6366F1`

## 6.2 Component Hierarchy
*   **Sidebar (240px):** Fixed left navigation.
*   **Navbar (64px):** Page title and "Add Transaction" CTA.
*   **StatsGrid:** 4-column CSS Grid (Total Balance, Income, Expense, Net Change).
*   **ChartSection:** 2-column flexbox for Trend and Category charts.
*   **TransactionList:** Filterable table using the `#161A23` card surface.

---
