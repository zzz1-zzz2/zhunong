import React, { useMemo, useRef, useState } from 'react'
import { Play, RefreshCw, ChevronRight, Leaf, Truck, Store, Sprout, Music, PauseCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface Choice {
  text: string
  next: string
}

interface Scene {
  id: string
  title: string
  narrative: string
  icon: React.ReactNode
  image: string
  choices: Choice[]
}

const AppleAdventure: React.FC = () => {
  const scenes: Record<string, Scene> = useMemo(() => ({
    intro: {
      id: 'intro',
      title: '苹果奇遇记 · 青年红色筑梦',
      narrative: '面向乡村振兴的青年红色筑梦赛道，跟随这颗“希望之果”，完成合规与品质并重的旅程，连接产业与市场。',
      icon: <Play className="w-10 h-10 text-red-600" />,
      image: 'https://images.unsplash.com/photo-1517940310602-10524279f6f9?auto=format&fit=crop&w=1600&q=60',
      choices: [
        { text: '开始旅程', next: 'site' }
      ]
    },
    site: {
      id: 'site',
      title: '选址种植',
      narrative: '为苹果选择适宜的种植环境。向阳地有利于糖度积累，但需要精细水分管理；背阴地甜度略低，但抗旱压力较小。',
      icon: <Sprout className="w-10 h-10 text-red-500" />,
      image: 'https://images.unsplash.com/photo-1567954016-0b6b0d2a343b?auto=format&fit=crop&w=1600&q=60',
      choices: [
        { text: '向阳地', next: 'pest' },
        { text: '背阴地', next: 'pest' }
      ]
    },
    pest: {
      id: 'pest',
      title: '病虫害防治',
      narrative: '选择防治策略。AI 植保算法可早期识别病虫害并精准用药；传统人工依赖经验，识别及时性与准确率稍弱。',
      icon: <Leaf className="w-10 h-10 text-red-500" />,
      image: 'https://picsum.photos/id/1040/1600/900',
      choices: [
        { text: 'AI 植保算法', next: 'irrigation' },
        { text: '传统人工巡园', next: 'irrigation' }
      ]
    },
    irrigation: {
      id: 'irrigation',
      title: '灌溉策略',
      narrative: '灌溉方式影响根系活力与糖酸比。滴灌更节水、控制更精准；漫灌快速但水分利用率较低。',
      icon: <Leaf className="w-10 h-10 text-emerald-600" />,
      image: 'https://picsum.photos/id/1056/1600/900',
      choices: [
        { text: '滴灌', next: 'orchard' },
        { text: '漫灌', next: 'orchard' }
      ]
    },
    orchard: {
      id: 'orchard',
      title: '果园采摘',
      narrative: '在认证果园里，苹果通过智能采摘记录设备完成批次绑定。请选择采摘后的处理方式。',
      icon: <Sprout className="w-10 h-10 text-red-500" />,
      image: 'https://images.unsplash.com/photo-1601004890684-d8cbfef1c8f6?auto=format&fit=crop&w=1600&q=60',
      choices: [
        { text: '进行分级与清洗', next: 'warehouse' },
        { text: '直接装箱出库', next: 'transport_risk' }
      ]
    },
    warehouse: {
      id: 'warehouse',
      title: '冷链仓储',
      narrative: '苹果进入规范仓储，温湿度与批次信息写入链上，形成关键溯源节点。下一步选择运输方式。',
      icon: <Leaf className="w-10 h-10 text-red-500" />,
      image: 'https://picsum.photos/id/1039/1600/900',
      choices: [
        { text: '低温冷链运输', next: 'packaging' },
        { text: '常温运输', next: 'transport_risk' }
      ]
    },
    packaging: {
      id: 'packaging',
      title: '包装材质',
      narrative: '选择更适合流通的包装。环保纸箱利于透气与减震；塑料筐耐用但在高温下通风性稍差。',
      icon: <Leaf className="w-10 h-10 text-red-500" />,
      image: 'https://picsum.photos/id/1062/1600/900',
      choices: [
        { text: '环保纸箱', next: 'transport' },
        { text: '塑料筐', next: 'transport' }
      ]
    },
    transport: {
      id: 'transport',
      title: '冷链运输',
      narrative: '车辆载入电子温度记录仪，里程、温度、司机与车辆信息写入链上，形成完整运输记录。',
      icon: <Truck className="w-10 h-10 text-red-600" />,
      image: 'https://picsum.photos/id/1063/1600/900',
      choices: [
        { text: '电商直销', next: 'channel' },
        { text: '线下精选', next: 'channel' }
      ]
    },
    channel: {
      id: 'channel',
      title: '销售渠道',
      narrative: '不同渠道影响消费者体验与口碑。电商强调履约速度；线下精选更看重现场品控与陈列。',
      icon: <Store className="w-10 h-10 text-red-600" />,
      image: 'https://picsum.photos/id/1067/1600/900',
      choices: [
        { text: '完成上架', next: 'market' }
      ]
    },
    transport_risk: {
      id: 'transport_risk',
      title: '运输异常',
      narrative: '由于缺少规范分级/冷链，品质风险上升，监管提示该批次需复检。你可以返回并选择合规流程。',
      icon: <Truck className="w-10 h-10 text-red-500" />,
      image: 'https://images.unsplash.com/photo-1544829099-291d1f0bb7f7?auto=format&fit=crop&w=1600&q=60',
      choices: [
        { text: '返回果园重新选择', next: 'orchard' },
        { text: '进入仓储再试一次', next: 'warehouse' }
      ]
    },
    market: {
      id: 'market',
      title: '商超上架',
      narrative: '批次上架完成，消费者可扫码查看从果园到商超的完整链路，你已完成一次合规溯源旅程。',
      icon: <Store className="w-10 h-10 text-red-600" />,
      image: 'https://picsum.photos/id/1074/1600/900',
      choices: [
        { text: '重新体验', next: 'intro' }
      ]
    }
  }), [])

  const [current, setCurrent] = useState<string>('intro')
  const scene = scenes[current]
  const navigate = useNavigate()
  const { user } = useAuth()
  const [identity, setIdentity] = useState<string>('')
  const [flags, setFlags] = useState<{ graded: boolean; cold: boolean; risk: boolean; sunny: boolean; aiPest: boolean; drip: boolean; ecoPack: boolean; premiumChannel: boolean }>({ graded: false, cold: false, risk: false, sunny: false, aiPest: false, drip: false, ecoPack: false, premiumChannel: false })
  const [lastTip, setLastTip] = useState<string>('')
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [musicOn, setMusicOn] = useState<boolean>(false)
  const [editingImages, setEditingImages] = useState<boolean>(false)
  const [imageOverrides, setImageOverrides] = useState<Record<string, string>>(() => {
    try {
      const raw = localStorage.getItem('apple_adventure_images')
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  })

  const saveImages = () => {
    localStorage.setItem('apple_adventure_images', JSON.stringify(imageOverrides))
    setEditingImages(false)
  }

  const resetImages = () => {
    localStorage.removeItem('apple_adventure_images')
    setImageOverrides({})
    setEditingImages(false)
  }

  const handleChoice = (next: string) => {
    if (current === 'site') {
      if (next === 'pest') {
        setFlags((f) => ({ ...f, sunny: true }))
        setLastTip('向阳地提升光合作用与糖度，但需加强灌溉与防晒管理。')
      } else {
        setFlags((f) => ({ ...f, sunny: false }))
        setLastTip('背阴地糖度略低，但蒸发压力小，水分管理更容易。')
      }
    }
    if (current === 'pest') {
      if (next === 'irrigation') {}
    }
    if (current === 'irrigation') {
      if (next === 'orchard') {
        setFlags((f) => ({ ...f, drip: lastTip.includes('滴灌') }))
        setLastTip(lastTip.includes('滴灌') ? '滴灌提升水分利用率与糖度稳定性。' : '漫灌适合快速补水，但需注意积水与病害风险。')
      }
    }
    if (current === 'orchard') {
      if (next === 'warehouse') { setFlags((f) => ({ ...f, graded: true, risk: false })); setLastTip('分级与清洗可提升外观与储藏性，便于标准化流通。') }
      if (next === 'transport_risk') { setFlags((f) => ({ ...f, risk: true })); setLastTip('缺少分级与清洗会增加病害与碰伤风险。') }
    }
    if (current === 'warehouse') {
      if (next === 'packaging') { setFlags((f) => ({ ...f, cold: true, risk: false })); setLastTip('冷链可显著延缓呼吸作用，保持甜度与脆度。') }
      if (next === 'transport_risk') { setFlags((f) => ({ ...f, cold: false, risk: true })); setLastTip('常温运输在夏季易导致品质波动与腐烂。') }
    }
    if (current === 'packaging') {
      if (next === 'transport') { setFlags((f) => ({ ...f, ecoPack: lastTip.includes('环保纸箱') })) }
    }
    if (current === 'transport') { setLastTip('运输环节温控记录与司机资质上链，形成可信追溯。') }
    if (current === 'channel') { setFlags((f) => ({ ...f, premiumChannel: true })) }
    if (current === 'transport_risk') { setLastTip('建议返回选择合规流程，确保质量稳定。') }
    if (current === 'market') { setLastTip('扫码即可查看完整链路节点，支持监管复核。') }
    setCurrent(next)
  }

  const personaText = identity ? `${identity}${user?.name ? user.name : ''}，你在盖县的深山里发现了这颗神秘苹果种子…` : '请选择身份后开始旅程'
  const sweetnessBonus = flags.sunny ? 1 : 0
  const irrigationBonus = flags.drip ? 1 : 0
  const protectionBonus = flags.aiPest ? 1 : 0
  const packBonus = flags.ecoPack ? 1 : 0
  const channelBonus = flags.premiumChannel ? 1 : 0
  const chainBonus = (flags.graded ? 1 : 0) + (flags.cold ? 1 : 0)
  const score = sweetnessBonus + irrigationBonus + protectionBonus + packBonus + channelBonus + chainBonus
  const endingTitle = score >= 3 ? '传奇果王' : score === 2 ? '丰收能手' : score === 1 ? '合格批次' : '需复检'
  const endingReward = score >= 3 ? '买一送一券' : score === 2 ? '满减券（满99减20）' : score === 1 ? '折扣券（95折）' : '折扣券（9折）'

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-amber-50 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative group h-64 sm:h-72 md:h-80 w-full">
            <img
              src={imageOverrides[scene.id] || scene.image}
              alt={scene.title}
              className="absolute inset-0 w-full h-full object-cover transform transition duration-700 group-hover:scale-105"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex items-center gap-4">
              {scene.icon}
              <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow">{scene.title}</h1>
              <button
                onClick={() => {
                  if (!audioRef.current) return
                  if (musicOn) { audioRef.current.pause() } else { audioRef.current.play().catch(() => {}) }
                  setMusicOn(!musicOn)
                }}
                className="ml-auto inline-flex items-center gap-2 bg-amber-500/30 hover:bg-amber-500/40 text-white px-3 py-2 rounded"
              >
                {musicOn ? <PauseCircle className="w-5 h-5" /> : <Music className="w-5 h-5" />}
                <span className="text-sm">背景音乐</span>
              </button>
              <button
                onClick={() => setEditingImages((v) => !v)}
                className="ml-2 inline-flex items-center gap-2 bg-amber-500/30 hover:bg-amber-500/40 text-white px-3 py-2 rounded"
              >
                <span className="text-sm">编辑图片</span>
              </button>
            </div>
          </div>

          <div className="p-8">
            {editingImages && (
              <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <div className="text-sm font-medium mb-3">为每个场景设置更合适的图片 URL：</div>
                <div className="space-y-3">
                  {Object.values(scenes).map((s) => (
                    <div key={s.id} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                      <label className="text-sm text-gray-700">{s.title}</label>
                      <input
                        value={imageOverrides[s.id] ?? ''}
                        onChange={(e) => setImageOverrides((prev) => ({ ...prev, [s.id]: e.target.value }))}
                        placeholder={s.image}
                        className="sm:col-span-2 w-full px-3 py-2 border rounded"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <button onClick={saveImages} className="px-3 py-2 rounded bg-green-600 text-white text-sm">保存</button>
                  <button onClick={resetImages} className="px-3 py-2 rounded bg-gray-200 text-gray-800 text-sm">恢复默认</button>
                </div>
              </div>
            )}
            {current === 'intro' ? (
              <div className="space-y-6">
                <div className="text-gray-700 leading-relaxed">
                  <div className="font-medium mb-2">{user?.name ? `${identity || '追梦青年'}${user.name}，` : ''}欢迎踏上红色筑梦之旅。</div>
                  <div>选择你的身份，凝聚青年力量助力乡村振兴：</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['红色志愿者','田园爱好者','科技玩家'].map((role) => (
                    <button
                      key={role}
                      onClick={() => setIdentity(role)}
                      className={`w-full py-2 px-3 rounded border ${identity === role ? 'bg-amber-50 text-red-700 border-amber-400' : 'bg-white text-gray-700 hover:bg-amber-50 border-amber-300'}`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
                <div className="text-sm text-gray-600">{personaText}</div>
                <button
                  onClick={() => setCurrent('orchard')}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors border border-amber-400"
                >
                  开始旅程
                </button>
              </div>
            ) : (
              <p className="text-gray-700 leading-relaxed mb-6">{scene.narrative}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {scene.choices.map((c) => (
                <button
                  key={c.text}
                  onClick={() => {
                    if (current === 'pest') {
                      setFlags((f) => ({ ...f, aiPest: c.text.includes('AI') }))
                      setLastTip(c.text.includes('AI') ? 'AI 植保通过视觉识别与时序分析，提升早期发现率并减少药量。' : '人工巡园依赖经验，易受主观判断影响，建议结合定期抽检。')
                    }
                    if (current === 'irrigation') {
                      setFlags((f) => ({ ...f, drip: c.text.includes('滴灌') }))
                      setLastTip(c.text.includes('滴灌') ? '滴灌提升水分利用率与糖度稳定性。' : '漫灌适合快速补水，但需注意积水与病害风险。')
                    }
                    if (current === 'packaging') {
                      setFlags((f) => ({ ...f, ecoPack: c.text.includes('环保') }))
                      setLastTip(c.text.includes('环保') ? '环保纸箱透气与减震更优，利于保持果面状态。' : '塑料筐耐用但通风性偏弱，需注意温度管理。')
                    }
                    if (current === 'transport') {
                      setLastTip('运输环节温控记录与司机资质上链，形成可信追溯。')
                    }
                    if (current === 'channel') {
                      setFlags((f) => ({ ...f, premiumChannel: c.text.includes('线下精选') }))
                      setLastTip(c.text.includes('线下精选') ? '线下精选强调现场品控与陈列，口碑更稳定。' : '电商直销履约速度快，适合大促与快速分发。')
                    }
                    handleChoice(c.next)
                  }}
                  className="flex items-center justify-between w-full bg-white text-red-700 py-3 px-4 rounded-lg font-medium hover:bg-amber-50 transition-colors transform hover:translate-x-0.5 border border-amber-400"
                >
                  <span>{c.text}</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              ))}
            </div>

            {lastTip && (
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded">{lastTip}</div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <div className="text-sm text-gray-500">场景：{scene.id}</div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrent('intro')}
                  className="inline-flex items-center gap-2 text-sm text-gray-600 bg-gray-100 py-2 px-3 rounded hover:bg-gray-200"
                >
                  <RefreshCw className="w-4 h-4" />重来一次
                </button>
                {current === 'market' && (
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center gap-2 text-sm bg-red-600 text-white py-2 px-3 rounded hover:bg-red-700 border border-amber-400"
                >
                  立即兑换
                </button>
              )}
              </div>
            </div>

            {current === 'market' && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-gray-50">
                  <div className="font-semibold mb-1">{endingTitle}</div>
                  <div className="text-sm text-gray-600">根据你的选择生成结局与奖励。</div>
                </div>
                <div className="p-4 rounded-lg border bg-yellow-50">
                  <div className="font-semibold mb-1">{endingReward}</div>
                  <div className="text-sm text-gray-600">可在首页点击“立即兑换”完成闭环。</div>
                </div>
              </div>
            )}

            <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2021/09/27/audio_d9b2a7f5f7.mp3" loop className="hidden" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppleAdventure