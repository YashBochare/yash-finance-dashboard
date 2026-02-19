# 4. Data Models

## 4.1 Wallet Entity
```typescript
interface Wallet {
  id: string;          // UUID
  name: string;        // e.g., "Main Savings"
  balance: number;     // Integer (cents)
  color: string;       // Hex code for card accent
  createdAt: string;   // ISO Date
}
```

## 4.2 Transaction Entity
```typescript
type TransactionType = 'income' | 'expense' | 'subscription' | 'purchase';

interface Transaction {
  id: string;
  title: string;
  amount: number;      // Integer (cents)
  type: TransactionType;
  category: string;
  walletId: string;    // Reference to Wallet.id
  date: string;        // ISO Date
}
```

---
