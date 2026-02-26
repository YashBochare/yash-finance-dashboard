import { useMemo } from 'react'
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react'
import { useStore } from '../store/useStore'
import { formatCurrency, sumCents } from '../utils/math'

interface StatCard {
  label: string
  value: string
  icon: React.ElementType
  color: string
}

export default function StatsGrid() {
  const transactions = useStore((s) => s.transactions)
  const wallets = useStore((s) => s.wallets)

  const stats = useMemo<StatCard[]>(() => {
    const totalBalance = sumCents(wallets.map((w) => w.balance))

    const incomeTotal = sumCents(
      transactions.filter((t) => t.type === 'income').map((t) => t.amount)
    )

    const expenseTotal = sumCents(
      transactions
        .filter((t) => t.type === 'expense' || t.type === 'subscription' || t.type === 'purchase')
        .map((t) => t.amount)
    )

    const netChange = incomeTotal - expenseTotal

    return [
      { label: 'Total Balance', value: formatCurrency(totalBalance), icon: DollarSign, color: 'text-indigo' },
      { label: 'Income', value: formatCurrency(incomeTotal), icon: TrendingUp, color: 'text-green' },
      { label: 'Expense', value: formatCurrency(expenseTotal), icon: TrendingDown, color: 'text-red' },
      { label: 'Net Change', value: formatCurrency(netChange), icon: BarChart3, color: netChange >= 0 ? 'text-green' : 'text-red' },
    ]
  }, [transactions, wallets])

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm">{stat.label}</span>
            <stat.icon size={20} className={stat.color} />
          </div>
          <p className={`text-[28px] font-header font-bold leading-tight ${stat.color}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}
