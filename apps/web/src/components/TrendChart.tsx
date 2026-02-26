import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useStore } from '../store/useStore'

export default function TrendChart() {
  const transactions = useStore((s) => s.transactions)

  const data = useMemo(() => {
    const monthMap = new Map<string, { income: number; expense: number }>()

    for (const t of transactions) {
      const month = t.date.slice(0, 7) // YYYY-MM
      const entry = monthMap.get(month) ?? { income: 0, expense: 0 }

      if (t.type === 'income') {
        entry.income += t.amount
      } else {
        entry.expense += t.amount
      }

      monthMap.set(month, entry)
    }

    return Array.from(monthMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, vals]) => ({
        month,
        income: vals.income / 100,
        expense: vals.expense / 100,
      }))
  }, [transactions])

  if (data.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-xl p-6">
        <h4 className="text-white font-header font-semibold mb-4">Income vs Expense Trend</h4>
        <p className="text-gray-400 text-sm">Add transactions to see trends.</p>
      </div>
    )
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <h4 className="text-white font-header font-semibold mb-4">Income vs Expense Trend</h4>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E1E24" />
          <XAxis dataKey="month" tick={{ fill: '#71717A', fontSize: 12 }} stroke="#1E1E24" />
          <YAxis tick={{ fill: '#71717A', fontSize: 12 }} stroke="#1E1E24" />
          <Tooltip
            contentStyle={{ backgroundColor: '#131316', border: '1px solid #1E1E24', borderRadius: 12 }}
            labelStyle={{ color: '#fff' }}
          />
          <Line type="monotone" dataKey="income" stroke="#34D399" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="expense" stroke="#F87171" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
