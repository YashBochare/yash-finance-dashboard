import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useStore } from '../store/useStore'
import WalletFormModal from '../components/WalletFormModal'
import WalletCard from '../components/WalletCard'
import type { Wallet } from '../types'

export default function Wallets() {
  const wallets = useStore((s) => s.wallets)
  const transactions = useStore((s) => s.transactions)
  const removeWallet = useStore((s) => s.removeWallet)

  const [showModal, setShowModal] = useState(false)
  const [editingWallet, setEditingWallet] = useState<Wallet | undefined>()
  const [deleteError, setDeleteError] = useState('')
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  const handleEdit = (wallet: Wallet) => {
    setEditingWallet(wallet)
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditingWallet(undefined)
    setShowModal(true)
  }

  const handleDelete = (walletId: string) => {
    const hasTransactions = transactions.some((t) => t.walletId === walletId)
    if (hasTransactions) {
      setDeleteError('Cannot delete wallet with existing transactions. Remove all transactions first.')
      setConfirmDeleteId(null)
      setTimeout(() => setDeleteError(''), 4000)
      return
    }
    setConfirmDeleteId(walletId)
    setDeleteError('')
  }

  const confirmDelete = () => {
    if (confirmDeleteId) {
      removeWallet(confirmDeleteId)
      setConfirmDeleteId(null)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-header font-semibold text-white">Your Wallets</h3>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-2 bg-indigo hover:bg-indigo/90 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
        >
          <Plus size={18} />
          <span>Add Wallet</span>
        </button>
      </div>

      {deleteError && (
        <div className="bg-red/10 border border-red/30 text-red text-sm rounded-xl px-4 py-3 mb-4">
          {deleteError}
        </div>
      )}

      {wallets.length === 0 ? (
        <p className="text-gray-400 text-sm">No wallets yet. Create your first wallet to get started.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wallets.map((wallet) => (
            <WalletCard
              key={wallet.id}
              wallet={wallet}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setConfirmDeleteId(null)}>
          <div className="bg-surface border border-border rounded-xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <h4 className="text-white font-header font-semibold mb-2">Delete Wallet?</h4>
            <p className="text-gray-400 text-sm mb-4">This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                className="text-gray-400 hover:text-white text-sm px-4 py-2 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="bg-red hover:bg-red/90 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <WalletFormModal
          wallet={editingWallet}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
