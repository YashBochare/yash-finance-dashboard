import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, Wallet, BarChart3, X, ChevronLeft, ChevronRight } from 'lucide-react'

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/wallets', label: 'Wallets', icon: Wallet },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
  collapsed: boolean
  onToggleCollapse: () => void
}

export default function Sidebar({ open, onClose, collapsed, onToggleCollapse }: SidebarProps) {
  const { pathname } = useLocation()

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen bg-surface border-r border-border flex flex-col z-30
          transition-all duration-200 lg:translate-x-0
          ${collapsed ? 'lg:w-16' : 'lg:w-60'}
          w-60 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className={`py-6 flex items-center ${collapsed ? 'lg:justify-center lg:px-0 px-6' : 'px-6'} justify-between`}>
          <h1 className={`text-lg font-header font-bold text-indigo ${collapsed ? 'lg:hidden' : ''}`}>
            Yash Finance
          </h1>
          {collapsed && (
            <span className="hidden lg:block text-lg font-header font-bold text-indigo">YF</span>
          )}
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-white lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className={`flex-1 flex flex-col gap-1 ${collapsed ? 'lg:px-2 px-3' : 'px-3'}`}>
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path)

            return (
              <Link
                key={path}
                to={path}
                onClick={onClose}
                title={collapsed ? label : undefined}
                className={`flex items-center gap-3 rounded-xl text-sm transition-colors
                  ${collapsed ? 'lg:justify-center lg:px-0 lg:py-3 px-3 py-3' : 'px-3 py-3'}
                  ${isActive
                    ? 'bg-indigo/10 text-indigo'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Icon size={20} />
                <span className={collapsed ? 'lg:hidden' : ''}>{label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Desktop collapse toggle */}
        <div className={`hidden lg:flex py-4 ${collapsed ? 'justify-center' : 'px-3'}`}>
          <button
            type="button"
            onClick={onToggleCollapse}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            {collapsed ? <ChevronRight size={18} /> : (
              <>
                <ChevronLeft size={18} />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}
