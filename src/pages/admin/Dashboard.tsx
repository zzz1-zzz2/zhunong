import React from 'react'

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">监管仪表盘</h1>
        <p className="text-gray-600">农产品质量安全监管总览</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">总企业数</h3>
          <p className="text-2xl font-bold text-gray-900">45</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">活跃产品</h3>
          <p className="text-2xl font-bold text-gray-900">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">本周预警</h3>
          <p className="text-2xl font-bold text-orange-600">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">区块链记录</h3>
          <p className="text-2xl font-bold text-gray-900">8,567</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard