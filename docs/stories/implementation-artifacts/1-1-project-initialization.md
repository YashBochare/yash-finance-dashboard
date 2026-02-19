# Story 1.1: Project Initialization

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **Lead Developer**,
I want to **initialize the project monorepo with the correct technology stack and structure**,
so that **the development team has a solid, type-safe foundation to build the Finance Dashboard.**

## Acceptance Criteria

1.  **Monorepo Structure Established**
    -   Root directory contains `apps/` and `packages/`.
    -   `apps/web`: Initialized with **Vite + React + TypeScript** (swc).
    -   `packages/core`: Initialized as a TypeScript library (for "Integer Math Engine" logic).
    -   `packages/shared`: Initialized as a TypeScript library (for "Common Types & Constants").

2.  **Tech Stack Configuration**
    -   **Vite:** Latest stable version configured for `apps/web`.
    -   **TypeScript:** Version 5.x installed. `tsconfig.json` configured with `strict: true` for all workspaces.
    -   **Tailwind CSS:** Version 3.x installed in `apps/web`.
    -   **Zustand:** Installed and initialized with a basic store skeleton in `apps/web/src/store`.
    -   **Router:** React Router DOM (or similar, though not explicitly in logic, usually needed for SPA). *Self-correction: Architecture 2.1 says "SPA", 6.2 mentions "Sidebar/Navbar". PRD 1.1 says "Fixed sidebar". Likely need routing.* (Adding as implicit requirement for SPA scaffold).
    -   **Icons:** `lucide-react` installed.

3.  **Design System Tokens Configured**
    -   Tailwind config must implement the **8px spacing system** (0.5rem base).
    -   Colors configured:
        -   Background: `#0F1117`
        -   Surface: `#161A23`
        -   Border: `#232634`
        -   Indigo: `#6366F1`
        -   Green: `#10B981`
        -   Red: `#EF4444`
    -   Border Radius: `squared-xl` (12px) - wait, "rounded-xl" (12px) in Arch 6.1.
    -   Fonts: Inter (Body) / Space Grotesk (Headers) configured.

4.  **Operational Verification**
    -   `npm install` installs all dependencies.
    -   `npm run dev` starts the web application without errors.
    -   Home page displays a basic "Hello World" or shell to verify Tailwind is working (e.g., correct background color).

## Dev Notes

-   **Architecture Conflict Resolution:** The Architecture document mentions `packages/core` in section 2.2 and `packages/shared` in section 7.0 source tree.
    -   **Decision:** Create **BOTH**. Use `packages/core` for the complex "Integer Math Engine" logic (Epic 3). Use `packages/shared` for shared types/interfaces (like `Transaction`, `Wallet`) to be used by both web and core.
-   **Strict Typing:** Ensure `noImplicitAny` is on.
-   **Clean Code:** Delete default Vite boilerplate (logos, counter example) and replacement with a clean structure matching `docs/architecture/7-source-tree-structure.md`.

### Project Structure Notes

-   Follow `docs/architecture/7-source-tree-structure.md` for `apps/web/src` layout:
    -   `components/`
    -   `features/`
    -   `store/`
    -   `hooks/`
    -   `utils/`
    -   `assets/`

### References

-   **Tech Stack:** `docs/architecture/3-tech-stack.md`
-   **Design Tokens:** `docs/architecture/6-ui-component-architecture.md` / `docs/prd/3-user-interface-design-goals.md`
-   **Coding Standards:** `docs/architecture/8-coding-standards-for-ai-agents.md`

## Dev Agent Record

### Agent Model Used

Antigravity (Google Deepmind)

### Debug Log References

-   Implemented monorepo structure with apps/web, packages/core, packages/shared.
-   Manually configured Tailwind CSS due to npx issues.
-   Added Zustand store skeleton.
-   Verified operational status with `npm run dev`.

### Completion Notes List

-   Story created based on PRD/Architecture shard analysis.
-   Implemented Story 1.1 successfully.

### File List

-   `docs/stories/1-1-project-initialization.md`
-   `apps/web/vite.config.ts`
-   `apps/web/tailwind.config.js`
-   `apps/web/postcss.config.js`
-   `apps/web/src/App.tsx`
-   `apps/web/src/index.css`
-   `apps/web/src/store/useStore.ts`
-   `packages/core/tsconfig.json`
-   `packages/core/package.json`
-   `packages/shared/tsconfig.json`
-   `packages/shared/package.json`
