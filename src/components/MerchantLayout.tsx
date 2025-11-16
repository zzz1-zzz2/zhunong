import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  Home, 
  Package, 
  Search, 
  FileText, 
  ShoppingCart, 
  BarChart3,
  LogOut,
  Settings
} from 'lucide-react'

const MerchantLayout: React.FC = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const menuItems = [
    { path: '/merchant', icon: Home, label: '首页' },
    { path: '/merchant/products', icon: Package, label: '产品管理' },
    { path: '/merchant/traceability', icon: Search, label: '溯源录入' },
    { path: '/merchant/orders', icon: ShoppingCart, label: '订单管理' },
  ]

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/merchant" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">商</span>
              </div>
              <span className="text-xl font-bold text-gray-900">商户后台</span>
            </Link>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">欢迎，{user?.name}</span>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>退出</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* 侧边栏 */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* 主要内容 */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MerchantLayout