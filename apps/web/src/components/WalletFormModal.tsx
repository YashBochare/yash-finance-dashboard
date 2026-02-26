import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useStore } from '../store/useStore'
import type { Wallet } from '../types'

const COLOR_PRESETS = [
  '#6366F1', '#10B981', '#EF4444', '#F59E0B', '#8B5CF6', '#EC4899',
]

interface WalletFormModalProps {
  wallet?: Wallet
  onClose: () => void
}

export default function WalletFormModal({ wallet, onClose }: WalletFormModalProps) {
  const addWallet = useStore((s) => s.addWallet)
  const updateWallet = useStore((s) => s.updateWallet)

  const [name, setName] = useState(wallet?.name ?? '')
  const [color, setColor] = useState(wallet?.color ?? COLOR_PRESETS[0])
  const [balanceInput, setBalanceInput] = useState(
    wallet ? (wallet.balance / 100).toFixed(2) : ''
  )
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

    if (!name.trim()) {
      setError('Wallet name is required.')
      return
    }

    const parsed = parseFloat(balanceInput || '0')
    if (isNaN(parsed)) {
      setError('Balance must be a valid number.')
      return
    }

    const balanceCents = Math.round(parsed * 100)

    if (wallet) {
      updateWallet(wallet.id, { name: name.trim(), color })
    } else {
      addWallet({ name: name.trim(), color, balance: balanceCents })
    }

    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-surface border border-border rounded-xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-header font-semibold text-white">
            {wallet ? 'Edit Wallet' : 'Add Wallet'}
          </h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Main Savings"
              className="w-full bg-background border border-border rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo"
            />
          </div>

          {!wallet && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Initial Balance ($)</label>
              <input
                type="text"
                inputMode="decimal"
                value={balanceInput}
                onChange={(e) => setBalanceInput(e.target.value)}
                placeholder="0.00"
                className="w-full bg-background border border-border rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-400 mb-1">Color</label>
            <div className="flex gap-2">
              {COLOR_PRESETS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-lg transition-all ${
                    color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-surface' : ''
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {error && <p className="text-red text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-indigo hover:bg-indigo/90 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors mt-2"
          >
            {wallet ? 'Save Changes' : 'Create Wallet'}
          </button>
        </form>
      </div>
    </div>
  )
}
