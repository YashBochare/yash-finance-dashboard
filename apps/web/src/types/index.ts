export interface Wallet {
  id: string
  name: string
  balance: number // Integer (cents)
  color: string // Hex code for card accent
  createdAt: string // ISO Date
}

export type TransactionType = 'income' | 'expense' | 'subscription' | 'purchase'

export interface Transaction {
  id: string
  title: string
  amount: number // Integer (cents)
  type: TransactionType
  category: string
  walletId: string
  date: string // ISO Date
}

export interface Settings {
  currency: string
}
