import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const TestAuth: React.FC = () => {
  const { user, signIn, signOut } = useAuth()

  const testLogin = async () => {
    try {
      await signIn('13800138000', '123456')
      alert('登录成功！')
    } catch (error: any) {
      alert('登录失败：' + error.message)
    }
  }

  const testLogout = async () => {
    try {
      await signOut()
      alert('退出登录成功！')
    } catch (error: any) {
      alert('退出登录失败：' + error.message)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">认证测试页面</h1>
      
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">当前用户状态</h2>
        <div className="space-y-2">
          <p><strong>登录状态：</strong> {user ? '已登录' : '未登录'}</p>
          {user && (
            <>
              <p><strong>用户ID：</strong> {user.id}</p>
              <p><strong>手机号：</strong> {user.phone}</p>
              <p><strong>姓名：</strong> {user.name}</p>
              <p><strong>用户类型：</strong> {user.user_type}</p>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">测试账号</h2>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded">
            <p><strong>消费者账号：</strong> 13800138000</p>
            <p><strong>密码：</strong> 123456</p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p><strong>农户账号：</strong> 13900139000</p>
            <p><strong>密码：</strong> 123456</p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p><strong>企业账号：</strong> 13700137000</p>
            <p><strong>密码：</strong> 123456</p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p><strong>监管账号：</strong> 13600136000</p>
            <p><strong>密码：</strong> 123456</p>
          </div>
        </div>
      </div>

      <div className="space-x-4">
        <button
          onClick={testLogin}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          测试消费者登录
        </button>
        <button
          onClick={testLogout}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          测试退出登录
        </button>
      </div>
    </div>
  )
}

export default TestAuth