import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Phone, Lock, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

const Login: React.FC = () => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!phone || !password) {
      toast.error('请填写手机号和密码')
      return
    }

    if (!/^1[3-9]\d{9}$/.test(phone)) {
      toast.error('请输入正确的手机号')
      return
    }

    setLoading(true)
    
    try {
      await signIn(phone, password)
      toast.success('登录成功！')
      navigate('/')
    } catch (error: any) {
      toast.error(error.message || '登录失败，请检查手机号和密码')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-amber-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-red-600 to-amber-500 border border-amber-300 shadow">
            <span className="text-white font-bold text-xl">农</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">欢迎回来</h1>
          <p className="text-gray-600">登录神农智链 · 红色筑梦主题</p>
        </div>

        {/* 登录表单 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                手机号
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 w-5 h-5" />
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="请输入手机号"
                  className="w-full pl-10 pr-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className="w-full pl-10 pr-12 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-500 hover:text-red-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-amber-300 text-red-600 focus:ring-red-600"
                />
                <span className="ml-2 text-sm text-gray-600">记住我</span>
              </label>
              <a href="#" className="text-sm text-red-600 hover:text-red-700">
                忘记密码？
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-amber-400"
            >
              {loading ? '登录中...' : '登录'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              还没有账号？{' '}
              <Link to="/register" className="text-red-600 hover:text-red-700 font-medium">
                立即注册
              </Link>
            </p>
          </div>

          {/* 快捷登录提示 */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-3">测试账号</p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setPhone('13800138000')
                  setPassword('123456')
                }}
                className="w-full text-xs text-red-700 bg-amber-50 py-2 px-3 rounded border border-amber-300 hover:bg-amber-100 transition-colors"
              >
                消费者账号：13800138000 / 123456
              </button>
              <button
                type="button"
                onClick={() => {
                  setPhone('13900139000')
                  setPassword('123456')
                }}
                className="w-full text-xs text-red-700 bg-amber-50 py-2 px-3 rounded border border-amber-300 hover:bg-amber-100 transition-colors"
              >
                商户账号：13900139000 / 123456
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login