# 2. High-Level Architecture

## 2.1 Technical Summary
Yash-Finance is built as a **Single Page Application (SPA)** using a **Client-Side Monolith** pattern. It eliminates server latency by performing all calculations and data persistence directly in the browser. 

## 2.2 Architectural Style: Monorepo
We use a monorepo structure to maintain a clean separation of concerns:
*   **apps/web**: The React/Tailwind frontend application.
*   **packages/core**: Pure TypeScript logic for the Integer Math Engine and state validators.

## 2.3 System Diagram
```mermaid
graph TD
    User((User)) -->|Interacts| UI[React UI Components]
    UI -->|Triggers Action| Store[Zustand Global Store]
    Store -->|Invokes| Engine[Integer Math Engine]
    Engine -->|Returns Result| Store
    Store -->|Syncs| Persist[LocalStorage Middleware]
    Persist -->|Writes/Reads| DB[(Browser LocalStorage)]
    UI -->|Visualizes| Charts[Recharts/Data Viz]
```

---
