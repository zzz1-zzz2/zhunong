import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Search, Scan, User, ShoppingBag, LogOut, Settings } from 'lucide-react'
import { toast } from 'sonner'

const Layout: React.FC = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('退出登录成功')
      navigate('/login')
    } catch (error) {
      toast.error('退出登录失败')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-red-600 to-amber-500 border border-amber-300 shadow">
                <span className="text-white font-bold text-sm">农</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">神农智链</span>
            </Link>

            {/* 搜索栏 */}
            <div className="flex-1 max-w-lg mx-4 sm:mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 w-4 h-4 md:w-5 md:h-5" />
                <input
                  type="text"
                  placeholder="搜索农产品..."
                  className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2 text-sm md:text-base border border-amber-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600"
                />
              </div>
            </div>

            {/* 右侧菜单 */}
            <div className="flex items-center space-x-4">
              {/* 扫码按钮 */}
              <Link
                to="/scan"
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <Scan className="w-6 h-6" />
              </Link>

              {/* 用户菜单 */}
              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-1 md:space-x-2 p-2 rounded-lg hover:bg-gray-100">
                    <User className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                    <span className="hidden md:block text-sm text-gray-700">{user.name}</span>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                    >
                      <User className="w-4 h-4" />
                      <span>个人中心</span>
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>我的订单</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Settings className="w-4 h-4" />
                      <span>设置</span>
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>退出登录</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-1 md:space-x-2">
                  <Link
                    to="/login"
                    className="px-3 py-2 text-sm text-gray-700 hover:text-red-600"
                  >
                    登录
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors border border-amber-400"
                  >
                    注册
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout