import React from 'react'
import { ChevronRight, ChevronDown, Sprout, Leaf, Truck, Store, Play, AlertTriangle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type SceneId = 'intro' | 'site' | 'pest' | 'irrigation' | 'orchard' | 'warehouse' | 'packaging' | 'transport' | 'channel' | 'transport_risk' | 'market'

interface SceneNode {
  id: SceneId
  title: string
  subtitle: string
  icon: React.ReactNode
  color: string
}

const nodes: SceneNode[] = [
  { id: 'intro', title: '开场', subtitle: '青年红色筑梦', icon: <Play className="w-6 h-6" />, color: 'from-red-500 to-amber-500' },
  { id: 'site', title: '选址种植', subtitle: '向阳/背阴', icon: <Sprout className="w-6 h-6" />, color: 'from-red-500 to-amber-500' },
  { id: 'pest', title: '病虫害防治', subtitle: 'AI/人工', icon: <Leaf className="w-6 h-6" />, color: 'from-red-500 to-amber-500' },
  { id: 'irrigation', title: '灌溉策略', subtitle: '滴灌/漫灌', icon: <Leaf className="w-6 h-6" />, color: 'from-red-500 to-amber-500' },
  { id: 'orchard', title: '果园采摘', subtitle: '分级/直接出库', icon: <Sprout className="w-6 h-6" />, color: 'from-red-500 to-amber-500' },
  { id: 'warehouse', title: '冷链仓储', subtitle: '温湿度上链', icon: <Leaf className="w-6 h-6" />, color: 'from-red-500 to-amber-500' },
  { id: 'packaging', title: '包装材质', subtitle: '纸箱/塑料筐', icon: <Leaf className="w-6 h-6" />, color: 'from-red-500 to-amber-500' },
  { id: 'transport', title: '冷链运输', subtitle: '温控/资质上链', icon: <Truck className="w-6 h-6" />, color: 'from-red-500 to-amber-500' },
  { id: 'channel', title: '销售渠道', subtitle: '电商/线下精选', icon: <Store className="w-6 h-6" />, color: 'from-red-500 to-amber-500' },
  { id: 'transport_risk', title: '运输异常', subtitle: '返回合规流程', icon: <AlertTriangle className="w-6 h-6" />, color: 'from-red-500 to-amber-500' },
  { id: 'market', title: '商超上架', subtitle: '完成闭环', icon: <Store className="w-6 h-6" />, color: 'from-red-500 to-amber-500' }
]

const edges: Array<[SceneId, SceneId, 'straight' | 'branch']> = [
  ['intro', 'site', 'straight'],
  ['site', 'pest', 'straight'],
  ['pest', 'irrigation', 'straight'],
  ['irrigation', 'orchard', 'straight'],
  ['orchard', 'warehouse', 'branch'],
  ['orchard', 'transport_risk', 'branch'],
  ['warehouse', 'packaging', 'branch'],
  ['warehouse', 'transport_risk', 'branch'],
  ['packaging', 'transport', 'straight'],
  ['transport', 'channel', 'straight'],
  ['channel', 'market', 'straight'],
  ['transport_risk', 'orchard', 'branch']
]

const StoryMap: React.FC = () => {
  const navigate = useNavigate()

  const renderNode = (node: SceneNode) => (
    <div
      key={node.id}
      className="group relative rounded-xl p-4 bg-white/70 backdrop-blur border border-amber-200 shadow-sm hover:shadow-lg transition duration-300"
    >
      <div className="flex items-center gap-3">
        <div className={`grid place-items-center w-10 h-10 rounded-lg bg-gradient-to-br ${node.color} text-white shadow-md`}>{node.icon}</div>
        <div>
          <div className="font-semibold text-gray-900">{node.title}</div>
          <div className="text-xs text-gray-600">{node.subtitle}</div>
        </div>
        <button
          onClick={() => navigate('/play/youth-red-dream')}
          className="ml-auto text-xs inline-flex items-center gap-1 px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700"
        >
          预览
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-amber-300 transition" />
    </div>
  )

  const renderEdge = (type: 'straight' | 'branch') => (
    <div className="flex items-center justify-center">
      {type === 'straight' ? (
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-16 bg-gradient-to-r from-amber-300 to-red-400 animate-pulse" />
          <ChevronRight className="w-4 h-4 text-red-600" />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-8 bg-gradient-to-r from-amber-300 to-red-400 animate-pulse" />
          <ChevronDown className="w-4 h-4 text-red-600" />
          <div className="h-0.5 w-8 bg-gradient-to-r from-amber-300 to-red-400 animate-pulse" />
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-amber-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="text-2xl font-bold text-gray-900">故事线预览</div>
          <div className="text-sm text-gray-600">红金主题 · 精致动态效果 · 分支走向一览</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            {renderNode(nodes.find(n => n.id === 'intro')!)}
            {renderEdge('straight')}
            {renderNode(nodes.find(n => n.id === 'site')!)}
            {renderEdge('straight')}
            {renderNode(nodes.find(n => n.id === 'pest')!)}
            {renderEdge('straight')}
            {renderNode(nodes.find(n => n.id === 'irrigation')!)}
          </div>

          <div className="space-y-4">
            {renderNode(nodes.find(n => n.id === 'orchard')!)}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                {renderEdge('branch')}
                {renderNode(nodes.find(n => n.id === 'warehouse')!)}
                {renderEdge('branch')}
                {renderNode(nodes.find(n => n.id === 'packaging')!)}
              </div>
              <div className="space-y-2">
                {renderEdge('branch')}
                {renderNode(nodes.find(n => n.id === 'transport_risk')!)}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {renderNode(nodes.find(n => n.id === 'transport')!)}
            {renderEdge('straight')}
            {renderNode(nodes.find(n => n.id === 'channel')!)}
            {renderEdge('straight')}
            {renderNode(nodes.find(n => n.id === 'market')!)}
            <div className="pt-2">
              <button
                onClick={() => navigate('/play/youth-red-dream')}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 border border-amber-400"
              >
                进入互动剧
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoryMap