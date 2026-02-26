import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Wallet, Transaction, Settings } from '../types'

interface FinanceState {
  wallets: Wallet[]
  transactions: Transaction[]
  settings: Settings

  addWallet: (wallet: Omit<Wallet, 'id' | 'createdAt'>) => void
  updateWallet: (id: string, updates: Partial<Omit<Wallet, 'id' | 'createdAt'>>) => void
  removeWallet: (id: string) => void

  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  updateTransaction: (id: string, updates: Partial<Omit<Transaction, 'id'>>) => void
  removeTransaction: (id: string) => void
}

export const useStore = create<FinanceState>()(
  persist(
    (set) => ({
      wallets: [],
      transactions: [],
      settings: { currency: 'USD' },

      addWallet: (wallet) =>
        set((state) => ({
          wallets: [
            ...state.wallets,
            {
              ...wallet,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      updateWallet: (id, updates) =>
        set((state) => ({
          wallets: state.wallets.map((w) =>
            w.id === id ? { ...w, ...updates } : w
          ),
        })),

      removeWallet: (id) =>
        set((state) => ({
          wallets: state.wallets.filter((w) => w.id !== id),
        })),

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            ...state.transactions,
            {
              ...transaction,
              id: crypto.randomUUID(),
            },
          ],
        })),

      updateTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      removeTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
    }),
    {
      name: 'yash-finance-storage',
      version: 1,
    }
  )
)
