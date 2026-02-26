import { useState, useMemo } from 'react'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { useStore } from '../store/useStore'
import { formatCurrency } from '../utils/math'
import TransactionFormModal from '../components/TransactionFormModal'
import type { Transaction, TransactionType } from '../types'

const TYPE_COLORS: Record<string, string> = {
  income: 'text-green',
  expense: 'text-red',
  subscription: 'text-red',
  purchase: 'text-red',
}

const ALL_TYPES: TransactionType[] = ['income', 'expense', 'subscription', 'purchase']

export default function Transactions() {
  const transactions = useStore((s) => s.transactions)
  const wallets = useStore((s) => s.wallets)
  const removeTransaction = useStore((s) => s.removeTransaction)

  const [showModal, setShowModal] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<TransactionType | ''>('')
  const [filterCategory, setFilterCategory] = useState('')

  const categories = useMemo(
    () => [...new Set(transactions.map((t) => t.category))].sort(),
    [transactions]
  )

  const handleAdd = () => {
    setEditingTransaction(undefined)
    setShowModal(true)
  }

  const handleEdit = (t: Transaction) => {
    setEditingTransaction(t)
    setShowModal(true)
  }

  const getWalletName = (walletId: string) =>
    wallets.find((w) => w.id === walletId)?.name ?? 'Unknown'

  const filteredTransactions = useMemo(() => {
    let result = [...transactions]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter((t) => t.title.toLowerCase().includes(q))
    }

    if (filterType) {
      result = result.filter((t) => t.type === filterType)
    }

    if (filterCategory) {
      result = result.filter((t) => t.category === filterCategory)
    }

    return result.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }, [transactions, searchQuery, filterType, filterCategory])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-header font-semibold text-white">All Transactions</h3>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-2 bg-indigo hover:bg-indigo/90 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
        >
          <Plus size={18} />
          <span>Add Transaction</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title..."
            className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-indigo"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as TransactionType | '')}
          className="bg-surface border border-border rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo"
        >
          <option value="">All Types</option>
          {ALL_TYPES.map((t) => (
            <option key={t} value={t} className="capitalize">{t}</option>
          ))}
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-surface border border-border rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="text-gray-400 text-sm">
          {transactions.length === 0
            ? 'No transactions yet. Add your first transaction to get started.'
            : 'No transactions match your filters.'}
        </p>
      ) : (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-gray-400 text-left">
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Wallet</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium text-right">Amount</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-b-0 hover:bg-white/5">
                  <td className="px-4 py-3 text-white">{t.title}</td>
                  <td className="px-4 py-3 capitalize text-gray-400">{t.type}</td>
                  <td className="px-4 py-3 text-gray-400">{t.category}</td>
                  <td className="px-4 py-3 text-gray-400">{getWalletName(t.walletId)}</td>
                  <td className="px-4 py-3 text-gray-400">{t.date}</td>
                  <td className={`px-4 py-3 text-right font-medium ${TYPE_COLORS[t.type] ?? 'text-white'}`}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={() => handleEdit(t)} className="text-gray-400 hover:text-white p-1 transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button type="button" onClick={() => removeTransaction(t.id)} className="text-gray-400 hover:text-red p-1 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <TransactionFormModal
          transaction={editingTransaction}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
