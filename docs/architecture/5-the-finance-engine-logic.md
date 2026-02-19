# 5. The "Finance Engine" Logic

## 5.1 The Integer Rule
To prevent floating-point errors, all currency is handled as **cents**:
*   **Input:** User types `10.50` -> Utility converts to `1050`.
*   **Storage:** `1050` is stored in the Transaction object.
*   **Calculation:** `balance = sum(incomes) - sum(expenses)`.
*   **Display:** `(1050 / 100).toFixed(2)` -> Result `$10.50`.

## 5.2 LocalStorage Schema
```json
{
  "version": 1,
  "state": {
    "wallets": [],
    "transactions": [],
    "settings": { "currency": "USD" }
  }
}
```

---
