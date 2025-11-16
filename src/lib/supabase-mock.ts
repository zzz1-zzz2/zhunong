// 模拟Supabase客户端，用于演示
interface MockProduct {
  id: string
  name: string
  category: string
  price: number
  unit: string
  origin: string
  description: string
  images: string[]
  is_available: boolean
  farmer_id: string
  created_at: string
  updated_at: string
  users?: { name: string }
}

interface MockTraceability {
  id: string
  product_id: string
  stage: string
  data: any
  images: string[]
  location: any
  tx_hash?: string
  created_at: string
}

// 模拟产品数据
const mockProducts: MockProduct[] = [
  {
    id: '1',
    name: '有机红富士苹果',
    category: '水果',
    price: 15.8,
    unit: '斤',
    origin: '山东烟台',
    description: '优质有机红富士苹果，口感香甜，营养丰富',
    images: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400'],
    is_available: true,
    farmer_id: '2',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-15T08:00:00Z',
    users: { name: '李农户' }
  },
  {
    id: '2',
    name: '新鲜胡萝卜',
    category: '蔬菜',
    price: 8.5,
    unit: '斤',
    origin: '河北张家口',
    description: '新鲜胡萝卜，富含维生素A，口感甜脆',
    images: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400'],
    is_available: true,
    farmer_id: '2',
    created_at: '2024-01-14T08:00:00Z',
    updated_at: '2024-01-14T08:00:00Z',
    users: { name: '李农户' }
  },
  {
    id: '3',
    name: '优质大米',
    category: '谷物',
    price: 12.0,
    unit: '公斤',
    origin: '黑龙江五常',
    description: '五常优质大米，粒粒饱满，香味浓郁',
    images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'],
    is_available: true,
    farmer_id: '2',
    created_at: '2024-01-13T08:00:00Z',
    updated_at: '2024-01-13T08:00:00Z',
    users: { name: '李农户' }
  }
]

// 模拟溯源数据
const mockTraceability: MockTraceability[] = [
  {
    id: '1',
    product_id: '1',
    stage: 'planting',
    data: {
      plantingTime: '2024-03-15',
      seedVariety: '红富士',
      fertilizer: '有机肥',
      pesticide: '无'
    },
    images: [],
    location: {
      latitude: 37.1234,
      longitude: 121.5678
    },
    tx_hash: '0x1234567890abcdef',
    created_at: '2024-03-15T08:00:00Z'
  }
]

// 模拟Supabase客户端
export const supabase = {
  auth: {
    getUser: async () => {
      const userStr = localStorage.getItem('shennong_user')
      return {
        data: { user: userStr ? JSON.parse(userStr) : null },
        error: null
      }
    },
    getSession: async () => {
      const userStr = localStorage.getItem('shennong_user')
      return {
        data: { session: userStr ? { user: JSON.parse(userStr) } : null },
        error: null
      }
    },
    onAuthStateChange: (callback: any) => {
      return {
        subscription: {
          unsubscribe: () => {}
        }
      }
    }
  },
  from: (table: string) => {
    return {
      select: (query: string) => {
        return {
          eq: (column: string, value: any) => {
            return {
              order: async (field: string, options: any) => {
                // 模拟产品查询
                if (table === 'products') {
                  let result = [...mockProducts]
                  
                  // 根据条件过滤
                  if (column === 'is_available') {
                    result = result.filter(p => p.is_available === value)
                  }
                  if (column === 'farmer_id') {
                    result = result.filter(p => p.farmer_id === value)
                  }
                  
                  return {
                    data: result,
                    error: null
                  }
                }
                
                // 模拟溯源记录查询
                if (table === 'traceability_records') {
                  let result = [...mockTraceability]
                  
                  if (column === 'product_id') {
                    result = result.filter(t => t.product_id === value)
                  }
                  
                  return {
                    data: result,
                    error: null
                  }
                }
                
                return { data: null, error: null }
              },
              single: async () => {
                return { data: null, error: null }
              }
            }
          }
        }
      },
      insert: async (data: any) => {
        return { data: null, error: null }
      },
      update: (data: any) => {
        return {
          eq: async (column: string, value: any) => {
            return { data: null, error: null }
          }
        }
      },
      delete: () => {
        return {
          eq: async (column: string, value: any) => {
            return { data: null, error: null }
          }
        }
      }
    }
  }
}