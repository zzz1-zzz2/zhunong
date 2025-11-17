import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Scan, Star, MapPin, Calendar, Shield, QrCode } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface Product {
  id: string
  name: string
  price: number
  unit: string
  origin: string
  images: string[]
  description: string
  farmer: {
    name: string
  }
  traceability_count: number
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全部')

  const categories = ['全部', '水果', '蔬菜', '谷物', '肉类', '水产']

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          users!farmer_id(name)
        `)
        .eq('is_available', true)
        .order('created_at', { ascending: false })

      if (error) throw error

      // 获取每个产品的溯源记录数量
      const productsWithTraceability = await Promise.all(
        data.map(async (product) => {
          const { data: traceabilityData } = await supabase
            .from('traceability_records')
            .select('*')
            .eq('product_id', product.id) as any

          return {
            ...product,
            farmer: product.users,
            traceability_count: traceabilityData?.length || 0
          }
        })
      )

      setProducts(productsWithTraceability)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter((product: any) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === '全部' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8">
      {/* 英雄区域 */}
      <section className="bg-gradient-to-r from-red-600 via-red-500 to-amber-500 rounded-2xl p-12 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">神农智链 · 青年红色筑梦</h1>
          <p className="text-2xl mb-6 text-amber-100">
            基于区块链技术的农产品全生命周期溯源，让每一份农产品都有可信的身份证明
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/scan"
              className="flex items-center space-x-3 bg-white text-red-700 px-10 py-5 rounded-lg font-bold hover:bg-amber-50 transition-colors border border-amber-300 text-lg"
            >
              <Scan className="w-5 h-5" />
              <span>扫码溯源</span>
            </Link>
            <Link
              to="/register"
              className="bg-red-600 text-white px-10 py-5 rounded-lg font-bold hover:bg-red-700 transition-colors border border-amber-400 text-lg"
            >
              立即注册
            </Link>
            <Link
              to="/play/apple"
              className="bg-white text-red-700 px-10 py-5 rounded-lg font-bold hover:bg-amber-50 transition-colors border border-amber-300 text-lg"
            >
              互动剧入口
            </Link>
            <Link
              to="/play/map"
              className="bg-white text-red-700 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors border border-amber-300"
            >
              故事线预览
            </Link>
            <Link
              to="/traceability/ORG-APPLE-2024-001"
              className="bg-gradient-to-r from-red-600 to-amber-600 text-white px-10 py-5 rounded-lg font-bold hover:from-red-700 hover:to-amber-700 transition-all shadow-lg flex items-center space-x-3 text-lg"
            >
              <QrCode className="w-5 h-5" />
              <span>有机苹果溯源示例</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 搜索和筛选 */}
      <section className="bg-white rounded-xl p-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜索农产品..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-lg"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-4 rounded-lg font-bold transition-colors text-lg ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white border border-amber-400'
                    : 'bg-white text-gray-700 hover:bg-amber-50 border border-amber-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 产品列表 */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">热门农产品</h2>
          <span className="text-gray-500 text-lg">{filteredProducts.length} 个产品</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-red-100 to-amber-100 flex items-center justify-center">
                      <span className="text-red-700 font-semibold">{product.name}</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-xl">{product.name}</h3>
                  <p className="text-base text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-red-600">
                      ¥{product.price}/{product.unit}
                    </span>
                    <div className="flex items-center space-x-1 text-base text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{product.origin}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-base text-gray-500">
                    <span>农户：{product.farmer?.name}</span>
                    <div className="flex items-center space-x-1">
                      <Shield className="w-4 h-4 text-red-500" />
                      <span>{product.traceability_count} 条溯源</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">未找到相关产品</h3>
            <p className="text-gray-500">尝试调整搜索条件或浏览其他分类</p>
          </div>
        )}
      </section>

      {/* 特色功能 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">区块链溯源</h3>
          <p className="text-gray-600 text-base">基于区块链技术，确保数据不可篡改，提供可信的溯源服务</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">品质保证</h3>
          <p className="text-gray-600 text-base">严格的质检流程，权威检测报告，让消费者买得放心</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-6 h-6 text-rose-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">全链追踪</h3>
          <p className="text-gray-600 text-base">从种植到销售的全生命周期记录，透明可视的供应链</p>
        </div>
      </section>
    </div>
  )
}

export default Home