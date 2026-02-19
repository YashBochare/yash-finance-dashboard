# Yash Finance Dashboard

A modern, high-performance finance dashboard built with a monorepo architecture.

## Tech Stack

-   **Frontend**: React (Vite), TypeScript, Tailwind CSS, Zustand
-   **Core Logic**: TypeScript packages (`@packages/core`, `@packages/shared`)
-   **State Management**: Zustand
-   **Styling**: Tailwind CSS (8px grid system)

## Project Structure

-   `apps/web`: The main web application.
-   `packages/core`: Core business logic and "Integer Math Engine".
-   `packages/shared`: Shared types, constants, and utilities.

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev -w apps/web
    ```

## Development

-   **Build Packages**: `npm run build -w packages/core` / `npm run build -w packages/shared`
-   **Linting**: `npm run lint`

## License

Private
