import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle, MapPin, Calendar, Thermometer, Droplets, Leaf, Shield, Clock, User, Truck, Package, Store } from 'lucide-react';
import { useParams } from 'react-router-dom';

interface TraceabilityData {
  productId: string;
  productName: string;
  batchNumber: string;
  blockchainHash: string;
  farmInfo: {
    name: string;
    location: string;
    coordinates: { lat: number; lng: number };
    certification: string[];
    farmerName: string;
  };
  growthCycle: {
    plantingDate: string;
    floweringDate: string;
    fruitingDate: string;
    harvestDate: string;
  };
  farmingOperations: {
    fertilization: Array<{
      date: string;
      type: string;
      amount: string;
      method: string;
    }>;
    pestControl: Array<{
      date: string;
      method: string;
      product: string;
      dosage: string;
    }>;
    irrigation: Array<{
      date: string;
      duration: number;
      volume: string;
      method: string;
    }>;
  };
  qualityTests: Array<{
    date: string;
    testType: string;
    result: string;
    institution: string;
  }>;
  logistics: {
    coldChain: {
      storageTemp: string;
      transportTemp: string;
      humidity: string;
      duration: string;
    };
    transport: Array<{
      timestamp: string;
      location: string;
      temperature: string;
      handler: string;
    }>;
  };
  blockchainRecords: Array<{
    timestamp: string;
    hash: string;
    previousHash: string;
    dataType: string;
    validator: string;
  }>;
}

const mockAppleData: TraceabilityData = {
  productId: "ORG-APPLE-2024-001",
  productName: "有机红富士苹果",
  batchNumber: "RF-2024-11-15-A",
  blockchainHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef12345678",
  farmInfo: {
    name: "绿野有机果园",
    location: "辽宁省盖县",
    coordinates: { lat: 37.3034, lng: 120.8349 },
    certification: ["有机认证", "GAP认证", "ISO22000"],
    farmerName: "张师傅"
  },
  growthCycle: {
    plantingDate: "2024-03-15",
    floweringDate: "2024-04-20",
    fruitingDate: "2024-06-10",
    harvestDate: "2024-11-10"
  },
  farmingOperations: {
    fertilization: [
      {
        date: "2024-04-01",
        type: "有机堆肥",
        amount: "50kg/亩",
        method: "根部施肥"
      },
      {
        date: "2024-07-15",
        type: "生物有机肥",
        amount: "30kg/亩",
        method: "滴灌施肥"
      }
    ],
    pestControl: [
      {
        date: "2024-05-20",
        method: "生物防治",
        product: "七星瓢虫",
        dosage: "1000只/亩"
      },
      {
        date: "2024-08-10",
        method: "物理防治",
        product: "诱虫板",
        dosage: "20块/亩"
      }
    ],
    irrigation: [
      {
        date: "2024-06-01",
        duration: 2,
        volume: "20m³/亩",
        method: "滴灌"
      },
      {
        date: "2024-09-15",
        duration: 1.5,
        volume: "15m³/亩",
        method: "滴灌"
      }
    ]
  },
  qualityTests: [
    {
      date: "2024-11-05",
      testType: "农药残留检测",
      result: "未检出",
      institution: "国家农产品质量安全监督检验中心"
    },
    {
      date: "2024-11-08",
      testType: "重金属检测",
      result: "符合国家标准",
      institution: "山东省产品质量检验研究院"
    },
    {
      date: "2024-11-12",
      testType: "营养成分检测",
      result: "维生素C: 4.2mg/100g, 糖分: 14.8%",
      institution: "中国农业大学食品科学与营养工程学院"
    }
  ],
  logistics: {
    coldChain: {
      storageTemp: "0-4°C",
      transportTemp: "2-6°C",
      humidity: "85-90%",
      duration: "48小时"
    },
    transport: [
      {
        timestamp: "2024-11-11T08:00:00Z",
        location: "辽宁省盖县",
        temperature: "3.2°C",
        handler: "李师傅"
      },
      {
        timestamp: "2024-11-11T14:30:00Z",
        location: "盖县冷链物流中心",
        temperature: "2.8°C",
        handler: "王主管"
      },
      {
        timestamp: "2024-11-12T09:15:00Z",
        location: "盖县配送中心",
        temperature: "3.5°C",
        handler: "赵司机"
      }
    ]
  },
  blockchainRecords: [
    {
      timestamp: "2024-11-10T16:30:00Z",
      hash: "0x2a3b4c5d6e7f8901bcdef2345678901bcdef2345678901bcdef23456789012",
      previousHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
      dataType: "收获记录",
      validator: "农场主"
    },
    {
      timestamp: "2024-11-11T08:00:00Z",
      hash: "0x3b4c5d6e7f8901cdef2345678902cdef2345678902cdef2345678902cdef234",
      previousHash: "0x2a3b4c5d6e7f8901bcdef2345678901bcdef2345678901bcdef23456789012",
      dataType: "运输记录",
      validator: "物流司机"
    },
    {
      timestamp: "2024-11-12T10:30:00Z",
      hash: "0x4c5d6e7f8901def2345678903def2345678903def2345678903def234567890",
      previousHash: "0x3b4c5d6e7f8901cdef2345678902cdef2345678902cdef2345678902cdef234",
      dataType: "质检记录",
      validator: "质检机构"
    }
  ]
};

const TraceabilityDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [data, setData] = useState<TraceabilityData>(mockAppleData);
  const [activeTab, setActiveTab] = useState<'overview' | 'farm' | 'growth' | 'operations' | 'quality' | 'logistics' | 'blockchain'>('overview');

  const generateQRCode = () => {
    const currentUrl = window.location.href;
    return currentUrl;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-yellow-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* 头部信息 */}
        <div className="bg-white rounded-2xl shadow-2xl p-12 mb-8 border-2 border-red-200">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-6">
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Leaf className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-red-800">{data.productName}</h1>
                <p className="text-red-600 text-lg font-medium">批次号: {data.batchNumber}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <QRCodeSVG 
                  value={generateQRCode()} 
                  size={80} 
                  level="H"
                  includeMargin={true}
                  className="border-2 border-gray-200 rounded-lg"
                />
                <p className="text-lg text-red-600 font-bold mt-3">扫码验证</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-6 h-6 text-red-600" />
                  <span className="text-lg font-bold text-red-800">区块链验证</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-2">
                  <p className="text-sm text-gray-500 font-mono break-all max-w-40">
                    {data.blockchainHash.slice(0, 16)}...
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 认证徽章 */}
          <div className="flex flex-wrap gap-4 mb-8">
            {data.farmInfo.certification.map((cert, index) => (
              <div key={index} className="bg-gradient-to-r from-red-100 to-amber-100 text-red-800 px-6 py-4 rounded-full text-xl font-bold flex items-center space-x-3 shadow-lg border border-amber-400">
                <CheckCircle className="w-6 h-6 text-red-600" />
                <span>{cert}</span>
              </div>
            ))}
          </div>

          {/* 快速信息卡片 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-xl p-8 shadow-lg border-2 border-red-200">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-8 h-8 text-red-600" />
                <span className="text-xl font-bold text-red-800">产地</span>
              </div>
              <p className="text-base text-gray-700 font-medium">{data.farmInfo.location}</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-8 border-2 border-amber-400 shadow-lg">
              <div className="flex items-center space-x-2 mb-2">
                <User className="w-8 h-8 text-red-600" />
                <span className="text-xl font-bold text-red-800">种植者</span>
              </div>
              <p className="text-base text-gray-700 font-medium">{data.farmInfo.farmerName}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-8 shadow-lg border-2 border-orange-200">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-8 h-8 text-orange-600" />
                <span className="text-xl font-bold text-orange-800">收获日期</span>
              </div>
              <p className="text-base text-gray-700 font-medium">{formatDate(data.growthCycle.harvestDate)}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 shadow-lg border-2 border-purple-200">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-8 h-8 text-purple-600" />
                <span className="text-lg font-bold text-purple-800">冷链时长</span>
              </div>
              <p className="text-base text-gray-700 font-medium">{data.logistics.coldChain.duration}</p>
            </div>
          </div>
        </div>

        {/* 导航标签 */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border-2 border-red-200">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'overview', label: '总览', icon: Shield },
              { id: 'farm', label: '农场信息', icon: MapPin },
              { id: 'growth', label: '生长周期', icon: Leaf },
              { id: 'operations', label: '农事操作', icon: User },
              { id: 'quality', label: '质量检测', icon: CheckCircle },
              { id: 'logistics', label: '冷链物流', icon: Truck },
              { id: 'blockchain', label: '区块链记录', icon: Clock }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-4 px-10 py-5 rounded-lg font-bold transition-all text-2xl ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <tab.icon className="w-6 h-6" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 内容区域 */}
        <div className="bg-white rounded-2xl shadow-2xl p-12 border-2 border-red-200">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-red-800 mb-8">产品溯源总览</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-red-100 to-amber-100 rounded-xl p-8 shadow-lg border-2 border-red-300">
                  <h3 className="text-3xl font-bold text-red-800 mb-8 flex items-center">
                    <Leaf className="w-8 h-8 mr-4 text-red-600" />
                    生长周期
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-xl text-red-700 font-medium">种植日期</span>
                      <span className="text-xl font-bold text-red-800">{formatDate(data.growthCycle.plantingDate)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">开花日期</span>
                      <span className="font-medium">{formatDate(data.growthCycle.floweringDate)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">结果日期</span>
                      <span className="font-medium">{formatDate(data.growthCycle.fruitingDate)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">收获日期</span>
                      <span className="font-medium">{formatDate(data.growthCycle.harvestDate)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-8 shadow-lg border-2 border-amber-400">
                  <h3 className="text-3xl font-bold text-red-800 mb-6 flex items-center">
                    <Shield className="w-8 h-8 mr-4 text-red-600" />
                    质量检测
                  </h3>
                  <div className="space-y-4">
                    {data.qualityTests.slice(0, 2).map((test, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600">{test.testType}</span>
                        <span className="text-xl font-bold text-red-800">{test.result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'farm' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">农场信息</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">基本信息</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-gray-600">农场名称</span>
                      <span className="text-lg font-medium">{data.farmInfo.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-gray-600">农场位置</span>
                      <span className="text-lg font-medium">{data.farmInfo.location}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-gray-600">种植者</span>
                      <span className="text-lg font-medium">{data.farmInfo.farmerName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-gray-600">坐标</span>
                      <span className="text-lg font-medium">
                        {data.farmInfo.coordinates.lat.toFixed(4)}, {data.farmInfo.coordinates.lng.toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-8">
                  <h3 className="text-2xl font-semibold text-green-800 mb-6">认证信息</h3>
                  <div className="space-y-3">
                    {data.farmInfo.certification.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-red-600" />
                        <span className="text-lg font-medium">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'growth' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">生长周期记录</h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-green-300"></div>
                <div className="space-y-8">
                  {[
                    { date: data.growthCycle.plantingDate, title: '种植', description: '苹果树苗定植', icon: '🌱' },
                    { date: data.growthCycle.floweringDate, title: '开花', description: '苹果树开花期', icon: '🌸' },
                    { date: data.growthCycle.fruitingDate, title: '结果', description: '幼果形成期', icon: '🍎' },
                    { date: data.growthCycle.harvestDate, title: '收获', description: '苹果成熟期采摘', icon: '🏆' }
                  ].map((stage, index) => (
                    <div key={index} className="relative flex items-center space-x-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold z-10">
                        {stage.icon}
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-6 flex-1">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-xl font-semibold text-gray-800">{stage.title}</h3>
                          <span className="text-base text-gray-500">{formatDate(stage.date)}</span>
                        </div>
                        <p className="text-lg text-gray-600">{stage.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'operations' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">农事操作记录</h2>
              
              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
                  <Leaf className="w-6 h-6 mr-3 text-red-600" />
                  施肥记录
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {data.farmingOperations.fertilization.map((fert, index) => (
                    <div key={index} className="bg-green-50 rounded-xl p-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-lg font-medium text-green-800">{fert.type}</span>
                        <span className="text-sm text-gray-500">{formatDate(fert.date)}</span>
                      </div>
                      <div className="text-base text-gray-600 space-y-2">
                        <div className="py-1">用量: {fert.amount}</div>
                        <div className="py-1">方法: {fert.method}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-blue-600" />
                  病虫害防治
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {data.farmingOperations.pestControl.map((pest, index) => (
                    <div key={index} className="bg-blue-50 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-blue-800">{pest.method}</span>
                        <span className="text-sm text-gray-500">{formatDate(pest.date)}</span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>产品: {pest.product}</div>
                        <div>用量: {pest.dosage}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                  <Droplets className="w-5 h-5 mr-2 text-cyan-600" />
                  灌溉记录
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {data.farmingOperations.irrigation.map((irr, index) => (
                    <div key={index} className="bg-cyan-50 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-cyan-800">{irr.method}</span>
                        <span className="text-sm text-gray-500">{formatDate(irr.date)}</span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>时长: {irr.duration}小时</div>
                        <div>水量: {irr.volume}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quality' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">质量检测报告</h2>
              <div className="space-y-4">
                {data.qualityTests.map((test, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-purple-800">{test.testType}</h3>
                      <span className="text-sm text-gray-500">{formatDate(test.date)}</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">检测结果</p>
                        <p className="font-semibold text-red-600">{test.result}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">检测机构</p>
                        <p className="font-semibold text-purple-700">{test.institution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'logistics' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">冷链物流追踪</h2>
              
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">冷链环境参数</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <Thermometer className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">储存温度</p>
                    <p className="font-semibold text-blue-800">{data.logistics.coldChain.storageTemp}</p>
                  </div>
                  <div className="text-center">
                    <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">运输温度</p>
                    <p className="font-semibold text-blue-800">{data.logistics.coldChain.transportTemp}</p>
                  </div>
                  <div className="text-center">
                    <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">湿度</p>
                    <p className="font-semibold text-blue-800">{data.logistics.coldChain.humidity}</p>
                  </div>
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">冷链时长</p>
                    <p className="font-semibold text-blue-800">{data.logistics.coldChain.duration}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">运输轨迹</h3>
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-300"></div>
                  <div className="space-y-4">
                    {data.logistics.transport.map((transport, index) => (
                      <div key={index} className="relative flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white z-10">
                          <Truck className="w-6 h-6" />
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-gray-800">{transport.location}</h4>
                            <span className="text-sm text-gray-500">{formatDateTime(transport.timestamp)}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-600">
                            <span>温度: <span className="font-medium text-blue-600">{transport.temperature}</span></span>
                            <span>经手人: <span className="font-medium">{transport.handler}</span></span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'blockchain' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">区块链验证记录</h2>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-orange-300"></div>
                <div className="space-y-4">
                  {data.blockchainRecords.map((record, index) => (
                    <div key={index} className="relative flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white z-10">
                        <Shield className="w-6 h-6" />
                      </div>
                      <div className="bg-white border-2 border-orange-200 rounded-lg p-4 flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-orange-800">{record.dataType}</h4>
                          <span className="text-sm text-gray-500">{formatDateTime(record.timestamp)}</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">当前哈希:</span>
                            <span className="font-mono text-xs text-orange-600 break-all max-w-64">
                              {record.hash.slice(0, 24)}...
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">前序哈希:</span>
                            <span className="font-mono text-xs text-gray-500 break-all max-w-64">
                              {record.previousHash.slice(0, 24)}...
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">验证者:</span>
                            <span className="font-medium">{record.validator}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 底部信任标识 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-red-600" />
                <span className="font-semibold text-red-800">区块链验证</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-blue-600" />
                <span className="font-semibold text-blue-800">质量检测</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-6 h-6 text-purple-600" />
                <span className="font-semibold text-purple-800">全程追溯</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">扫码验证产品真伪</p>
              <QRCodeSVG 
                value={generateQRCode()} 
                size={100} 
                level="H"
                includeMargin={true}
                className="border-2 border-gray-200 rounded-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraceabilityDetail;