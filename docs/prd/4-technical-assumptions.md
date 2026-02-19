# 4. Technical Assumptions

*   **Repository:** Monorepo (Vite/TypeScript) to separate Finance Core logic from UI.
*   **State Management:** **Zustand** for high-performance reactive state.
*   **Schema:** `localStorage` must include a `version` key for future migrations.
*   **Math:** Dedicated utility for decimal-to-integer conversion.

---
