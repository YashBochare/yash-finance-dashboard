import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, Wallet, BarChart3, X } from 'lucide-react'

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/wallets', label: 'Wallets', icon: Wallet },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { pathname } = useLocation()

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-60 bg-surface border-r border-border flex flex-col z-30
          transition-transform lg:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="px-6 py-6 flex items-center justify-between">
          <h1 className="text-lg font-header font-bold text-indigo">Yash Finance</h1>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-white lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-1 px-3">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path)

            return (
              <Link
                key={path}
                to={path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-colors ${
                  isActive
                    ? 'bg-indigo/10 text-indigo border-r-2 border-indigo'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
