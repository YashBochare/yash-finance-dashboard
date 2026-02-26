import { useStore } from '../store/useStore'
import { formatCurrency } from '../utils/math'
import StatsGrid from '../components/StatsGrid'
import TrendChart from '../components/TrendChart'
import CategoryChart from '../components/CategoryChart'

export default function Dashboard() {
  const transactions = useStore((s) => s.transactions)
  const wallets = useStore((s) => s.wallets)

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)

  const getWalletName = (walletId: string) =>
    wallets.find((w) => w.id === walletId)?.name ?? 'Unknown'

  return (
    <div className="flex flex-col gap-6">
      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TrendChart />
        <CategoryChart />
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-white font-header font-semibold">Recent Transactions</h3>
        </div>

        {recentTransactions.length === 0 ? (
          <p className="px-6 py-4 text-gray-400 text-sm">No transactions yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-gray-400 text-left">
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Wallet</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-b-0 hover:bg-white/5">
                  <td className="px-6 py-3 text-white">{t.title}</td>
                  <td className="px-6 py-3 capitalize text-gray-400">{t.type}</td>
                  <td className="px-6 py-3 text-gray-400">{getWalletName(t.walletId)}</td>
                  <td className="px-6 py-3 text-gray-400">{t.date}</td>
                  <td className={`px-6 py-3 text-right font-medium ${t.type === 'income' ? 'text-green' : 'text-red'}`}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
