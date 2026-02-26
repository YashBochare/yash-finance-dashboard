import { Pencil, Trash2 } from 'lucide-react'
import type { Wallet } from '../types'

interface WalletCardProps {
  wallet: Wallet
  onEdit: (wallet: Wallet) => void
  onDelete: (walletId: string) => void
}

export default function WalletCard({ wallet, onEdit, onDelete }: WalletCardProps) {
  const formattedBalance = `$${(wallet.balance / 100).toFixed(2)}`

  return (
    <div className="bg-surface border border-border rounded-xl p-6 relative">
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
        style={{ backgroundColor: wallet.color }}
      />

      <div className="flex items-start justify-between mb-4">
        <p className="text-gray-400 text-sm font-medium">{wallet.name}</p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(wallet)}
            className="text-gray-400 hover:text-white p-1 transition-colors"
          >
            <Pencil size={14} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(wallet.id)}
            className="text-gray-400 hover:text-red p-1 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <p className="text-[28px] font-header font-bold text-white leading-tight">
        {formattedBalance}
      </p>
    </div>
  )
}
