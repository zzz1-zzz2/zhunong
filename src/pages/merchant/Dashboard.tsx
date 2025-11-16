import React from 'react'

const MerchantDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">商户仪表盘</h1>
        <p className="text-gray-600">欢迎回来，这里是您的商户后台</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">总产品数</h3>
          <p className="text-2xl font-bold text-gray-900">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">本月订单</h3>
          <p className="text-2xl font-bold text-gray-900">48</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">本月收入</h3>
          <p className="text-2xl font-bold text-gray-900">¥2,340</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">溯源记录</h3>
          <p className="text-2xl font-bold text-gray-900">156</p>
        </div>
      </div>
    </div>
  )
}

export default MerchantDashboard