import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Plus, Menu } from 'lucide-react'
import TransactionFormModal from './TransactionFormModal'

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/transactions': 'Transactions',
  '/wallets': 'Wallets',
  '/analytics': 'Analytics',
}

interface NavbarProps {
  onMenuClick: () => void
  sidebarCollapsed: boolean
}

export default function Navbar({ onMenuClick, sidebarCollapsed }: NavbarProps) {
  const { pathname } = useLocation()
  const pageTitle = pageTitles[pathname] ?? 'Dashboard'
  const [showTransactionModal, setShowTransactionModal] = useState(false)

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border flex items-center justify-between px-6 z-10 transition-all duration-200 ${sidebarCollapsed ? 'lg:left-16' : 'lg:left-60'}`}>
        <div className="flex items-center gap-3">
          <button type="button" onClick={onMenuClick} className="text-gray-400 hover:text-white lg:hidden">
            <Menu size={20} />
          </button>
          <h2 className="text-2xl font-header font-semibold text-white">{pageTitle}</h2>
        </div>

        <button
          type="button"
          onClick={() => setShowTransactionModal(true)}
          className="flex items-center gap-2 bg-indigo hover:bg-indigo/90 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add Transaction</span>
        </button>
      </header>

      {showTransactionModal && (
        <TransactionFormModal onClose={() => setShowTransactionModal(false)} />
      )}
    </>
  )
}
