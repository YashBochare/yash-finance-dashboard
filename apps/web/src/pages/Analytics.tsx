import StatsGrid from '../components/StatsGrid'
import TrendChart from '../components/TrendChart'
import CategoryChart from '../components/CategoryChart'

export default function Analytics() {
  return (
    <div className="flex flex-col gap-6">
      <StatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TrendChart />
        <CategoryChart />
      </div>
    </div>
  )
}
