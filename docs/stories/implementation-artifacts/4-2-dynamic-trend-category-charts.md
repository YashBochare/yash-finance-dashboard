# Story 4.2: Dynamic Trend & Category Charts

Status: done

## Story

As a **user**,
I want **to see visual charts showing income vs expense trends and expense category breakdowns**,
so that **I can understand my spending patterns at a glance.**

## Acceptance Criteria

1. **Trend Chart (Line Chart)**
   - Income vs Expense line chart grouped by month (YYYY-MM)
   - Income line: green (#10B981), Expense line: red (#EF4444)
   - Recharts `LineChart` with responsive container
   - Dark-themed: grid stroke #232634, axis text gray, tooltip with surface background

2. **Category Chart (Pie/Donut Chart)**
   - Expense breakdown by category (excludes income transactions)
   - Donut chart with inner radius, sorted by amount descending
   - Color palette: Indigo, Green, Red, Amber, Purple, Pink, Teal, Orange
   - Legend showing category names

3. **Chart Section Layout**
   - 2-column flexbox layout on Dashboard and Analytics pages
   - Responsive: stacks to 1 column on mobile
   - Empty state: "Add transactions to see trends/breakdown" message

4. **Recharts Integration**
   - Recharts library installed as project dependency (per architecture tech stack)
   - Responsive SVG-based charts
   - Data computed via `useMemo` for performance

## Tasks / Subtasks

- [x] Task 1: Install Recharts (AC: #4)
  - [x] 1.1: `npm install recharts -w apps/web`
- [x] Task 2: Create TrendChart component (AC: #1)
  - [x] 2.1: Create `apps/web/src/components/TrendChart.tsx`
  - [x] 2.2: Implement income vs expense line chart with monthly grouping
  - [x] 2.3: Dark theme styling for grid, axes, tooltip
- [x] Task 3: Create CategoryChart component (AC: #2)
  - [x] 3.1: Create `apps/web/src/components/CategoryChart.tsx`
  - [x] 3.2: Implement expense donut chart with category breakdown
  - [x] 3.3: Legend with category names
- [x] Task 4: Integrate charts into Dashboard and Analytics pages (AC: #3)
  - [x] 4.1: Add TrendChart + CategoryChart to Dashboard page (below StatsGrid)
  - [x] 4.2: Replace Analytics page placeholder with StatsGrid + charts
- [x] Task 5: Verify (AC: all)
  - [x] 5.1: TypeScript compiles, ESLint passes, Vite builds

## Dev Notes

### Recharts Library

Per [Source: docs/architecture/3-tech-stack.md]: Recharts 2.x for responsive SVG-based data visualization.
Adds ~400KB to bundle — chunk size warning is expected.

### Chart Color Scheme (FR9)

From [Source: docs/prd.md#2.1] — FR9: Dynamic Data Visualization: Real-time Indigo/Green/Red charts.
- Income line: `#10B981` (green)
- Expense line: `#EF4444` (red)
- Category pie colors: brand palette + extended colors

### Project Structure

```
apps/web/src/
├── components/
│   ├── TrendChart.tsx      ← NEW
│   └── CategoryChart.tsx   ← NEW
├── pages/
│   ├── Dashboard.tsx       ← MODIFIED (added charts)
│   └── Analytics.tsx       ← MODIFIED (replaced placeholder)
```

### References

- [Source: docs/architecture/3-tech-stack.md] — Recharts 2.x
- [Source: docs/prd.md#2.1] — FR9: Dynamic Data Visualization
- [Source: docs/architecture/6-ui-component-architecture.md#6.2] — ChartSection: 2-column flexbox

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (Anthropic)

### Debug Log References

- Recharts installed, adds ~400KB to bundle (expected per memory notes)
- TypeScript compiles cleanly, ESLint passes, Vite builds

### Completion Notes List

- Installed `recharts` package in apps/web workspace
- Created TrendChart: LineChart with monthly income vs expense, dark-themed tooltips/grid
- Created CategoryChart: PieChart donut showing expense category breakdown with legend
- Both use `useMemo` for data computation from store transactions
- Empty state messages when no data available
- Charts added to both Dashboard (below StatsGrid) and Analytics pages
- Responsive: 2-column grid on desktop, 1-column on mobile

### File List

- apps/web/src/components/TrendChart.tsx (NEW)
- apps/web/src/components/CategoryChart.tsx (NEW)
- apps/web/src/pages/Dashboard.tsx (MODIFIED)
- apps/web/src/pages/Analytics.tsx (MODIFIED)
- apps/web/package.json (MODIFIED — added recharts dependency)
