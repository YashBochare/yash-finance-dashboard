import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-background text-white">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
      />
      <div className={`flex-1 flex flex-col transition-all duration-200 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        <Navbar onMenuClick={() => setSidebarOpen(true)} sidebarCollapsed={sidebarCollapsed} />
        <main className="flex-1 overflow-auto p-4 lg:p-6 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
