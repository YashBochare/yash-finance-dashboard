# 7. Source Tree Structure

```text
yash-finance/
├── apps/
│   └── web/
│       ├── src/
│       │   ├── components/     # UI (Sidebar, Navbar, Cards)
│       │   ├── features/       # Logic (WalletCRUD, TransactionCRUD)
│       │   ├── store/          # Zustand slices
│       │   ├── hooks/          # useLocalStorage, useFinance
│       │   ├── utils/          # formatCurrency, mathEngine
│       │   └── assets/         # Global styles & Fonts
│       └── tailwind.config.js
├── packages/
│   └── shared/                 # Common Types & Constants
├── docs/
│   ├── prd.md
│   └── architecture.md
└── package.json
```

---
