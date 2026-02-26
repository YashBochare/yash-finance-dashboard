import { useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { useStore } from '../store/useStore'

const COLORS = ['#6366F1', '#10B981', '#EF4444', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316']

export default function CategoryChart() {
  const transactions = useStore((s) => s.transactions)

  const data = useMemo(() => {
    const categoryMap = new Map<string, number>()

    for (const t of transactions) {
      if (t.type === 'income') continue // Only show expense categories
      const current = categoryMap.get(t.category) ?? 0
      categoryMap.set(t.category, current + t.amount)
    }

    return Array.from(categoryMap.entries())
      .map(([name, value]) => ({ name, value: value / 100 }))
      .sort((a, b) => b.value - a.value)
  }, [transactions])

  if (data.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-xl p-6">
        <h4 className="text-white font-header font-semibold mb-4">Expense by Category</h4>
        <p className="text-gray-400 text-sm">Add expense transactions to see breakdown.</p>
      </div>
    )
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <h4 className="text-white font-header font-semibold mb-4">Expense by Category</h4>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#161A23', border: '1px solid #232634', borderRadius: 12 }}
            labelStyle={{ color: '#fff' }}
          />
          <Legend
            formatter={(value) => <span style={{ color: '#9CA3AF', fontSize: 12 }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
