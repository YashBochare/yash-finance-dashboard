import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useStore } from '../store/useStore'
import { toCents } from '../utils/math'
import type { Transaction, TransactionType } from '../types'

const TRANSACTION_TYPES: TransactionType[] = ['income', 'expense', 'subscription', 'purchase']

const CATEGORIES = [
  'Salary', 'Freelance', 'Food', 'Transport', 'Entertainment',
  'Utilities', 'Shopping', 'Health', 'Education', 'Other',
]

interface TransactionFormModalProps {
  transaction?: Transaction
  onClose: () => void
}

export default function TransactionFormModal({ transaction, onClose }: TransactionFormModalProps) {
  const wallets = useStore((s) => s.wallets)
  const addTransaction = useStore((s) => s.addTransaction)
  const updateTransaction = useStore((s) => s.updateTransaction)

  const [title, setTitle] = useState(transaction?.title ?? '')
  const [amountInput, setAmountInput] = useState(
    transaction ? (transaction.amount / 100).toFixed(2) : ''
  )
  const [type, setType] = useState<TransactionType>(transaction?.type ?? 'expense')
  const [category, setCategory] = useState(transaction?.category ?? CATEGORIES[0])
  const [walletId, setWalletId] = useState(transaction?.walletId ?? (wallets[0]?.id ?? ''))
  const [date, setDate] = useState(transaction?.date ?? new Date().toISOString().split('T')[0])
  const [error, setError] = useState('')

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!title.trim()) {
      setError('Title is required.')
      return
    }

    const cents = toCents(amountInput)
    if (cents <= 0) {
      setError('Amount must be greater than zero.')
      return
    }

    if (!walletId) {
      setError('Please select a wallet.')
      return
    }

    if (transaction) {
      updateTransaction(transaction.id, {
        title: title.trim(),
        amount: cents,
        type,
        category,
        walletId,
        date,
      })
    } else {
      addTransaction({
        title: title.trim(),
        amount: cents,
        type,
        category,
        walletId,
        date,
      })
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-surface border border-border rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-header font-semibold text-white">
            {transaction ? 'Edit Transaction' : 'Add Transaction'}
          </h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Monthly Salary"
              className="w-full bg-background border border-border rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Amount ($)</label>
            <input
              type="text"
              inputMode="decimal"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              placeholder="0.00"
              className="w-full bg-background border border-border rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Type</label>
            <div className="grid grid-cols-4 gap-2">
              {TRANSACTION_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`text-xs py-2 rounded-xl capitalize transition-colors ${
                    type === t
                      ? 'bg-indigo text-white'
                      : 'bg-background border border-border text-gray-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-background border border-border rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Wallet</label>
            <select
              value={walletId}
              onChange={(e) => setWalletId(e.target.value)}
              className="w-full bg-background border border-border rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo"
            >
              {wallets.length === 0 && <option value="">No wallets available</option>}
              {wallets.map((w) => (
                <option key={w.id} value={w.id}>{w.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-background border border-border rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo"
            />
          </div>

          {error && <p className="text-red text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-indigo hover:bg-indigo/90 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors mt-2"
          >
            {transaction ? 'Save Changes' : 'Add Transaction'}
          </button>
        </form>
      </div>
    </div>
  )
}
