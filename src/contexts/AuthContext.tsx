import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  phone: string
  name: string
  user_type: 'consumer' | 'farmer' | 'enterprise' | 'admin'
  avatar_url?: string
  is_verified: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (phone: string, password: string) => Promise<void>
  signUp: (phone: string, password: string, name: string, userType: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 模拟用户数据库
const mockUsers: User[] = [
  {
    id: '1',
    phone: '13800138000',
    name: '张消费者',
    user_type: 'consumer',
    is_verified: true
  },
  {
    id: '2',
    phone: '13900139000',
    name: '李农户',
    user_type: 'farmer',
    is_verified: true
  },
  {
    id: '3',
    phone: '13700137000',
    name: '王企业',
    user_type: 'enterprise',
    is_verified: true
  },
  {
    id: '4',
    phone: '13600136000',
    name: '赵监管',
    user_type: 'admin',
    is_verified: true
  }
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 从localStorage恢复用户会话
    const savedUser = localStorage.getItem('shennong_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const signIn = async (phone: string, password: string) => {
    try {
      setLoading(true)
      
      // 模拟登录验证
      const foundUser = mockUsers.find(u => u.phone === phone)
      if (!foundUser) {
        throw new Error('用户不存在')
      }
      
      // 模拟密码验证（测试密码统一为123456）
      if (password !== '123456') {
        throw new Error('密码错误')
      }
      
      // 保存用户会话
      setUser(foundUser)
      localStorage.setItem('shennong_user', JSON.stringify(foundUser))
      
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (phone: string, password: string, name: string, userType: string) => {
    try {
      setLoading(true)
      
      // 检查手机号是否已存在
      const existingUser = mockUsers.find(u => u.phone === phone)
      if (existingUser) {
        throw new Error('手机号已注册')
      }
      
      // 创建新用户
      const newUser: User = {
        id: Date.now().toString(),
        phone,
        name,
        user_type: userType as any,
        is_verified: false
      }
      
      // 添加到模拟数据库
      mockUsers.push(newUser)
      
      // 自动登录
      setUser(newUser)
      localStorage.setItem('shennong_user', JSON.stringify(newUser))
      
    } catch (error) {
      console.error('Sign up error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setUser(null)
      localStorage.removeItem('shennong_user')
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}