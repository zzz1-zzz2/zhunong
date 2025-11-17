import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Sprout, Droplets, Thermometer, Gauge, Calendar, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface DataPoint {
  name: string;
  value: number;
  color?: string;
}

interface SensorData {
  id: string;
  location: string;
  temperature: number;
  humidity: number;
  ph: number;
  moisture: number;
  status: 'normal' | 'warning' | 'critical';
  timestamp: string;
}

interface ExperimentData {
  sampleId: string;
  plotNumber: number;
  treatment: string;
  measurement: number;
  unit: string;
  date: string;
}

const AgriculturalDataDisplay: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'sensors' | 'experiments' | 'analysis'>('overview');

  // 模拟图片1中的柱状图数据
  const chartData: DataPoint[] = [
    { name: '土壤湿度', value: 65, color: '#10B981' },
    { name: '养分含量', value: 78, color: '#F59E0B' },
    { name: 'pH值', value: 45, color: '#EF4444' },
    { name: '有机质', value: 82, color: '#8B5CF6' }
  ];

  // 模拟传感器数据（基于图片4）
  const sensorData: SensorData[] = [
    {
      id: 'sensor-001',
      location: '北区果园-行1',
      temperature: 24.5,
      humidity: 68,
      ph: 6.8,
      moisture: 65,
      status: 'normal',
      timestamp: '2024-11-17 14:30'
    },
    {
      id: 'sensor-002',
      location: '北区果园-行2',
      temperature: 25.1,
      humidity: 72,
      ph: 7.2,
      moisture: 58,
      status: 'warning',
      timestamp: '2024-11-17 14:25'
    },
    {
      id: 'sensor-003',
      location: '南区果园-行1',
      temperature: 23.8,
      humidity: 64,
      ph: 6.5,
      moisture: 71,
      status: 'normal',
      timestamp: '2024-11-17 14:35'
    }
  ];

  // 模拟实验数据（基于图片5）
  const experimentData: ExperimentData[] = [
    { sampleId: '55*', plotNumber: 1, treatment: '标准灌溉', measurement: 3.2, unit: 'kg/株', date: '2024-11-15' },
    { sampleId: '26*', plotNumber: 2, treatment: '精准灌溉', measurement: 3.8, unit: 'kg/株', date: '2024-11-15' },
    { sampleId: '18*', plotNumber: 3, treatment: '生物刺激', measurement: 4.1, unit: 'kg/株', date: '2024-11-15' },
    { sampleId: '42*', plotNumber: 4, treatment: '对照组', measurement: 2.9, unit: 'kg/株', date: '2024-11-15' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'critical':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Sprout className="w-6 h-6 text-green-600" />
          智慧农业数据监控
        </h2>
        <p className="text-gray-600">实时监测果园环境数据，优化种植管理</p>
      </div>

      {/* 标签页导航 */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { key: 'overview', label: '数据概览', icon: TrendingUp },
          { key: 'sensors', label: '传感器', icon: Gauge },
          { key: 'experiments', label: '实验数据', icon: Calendar },
          { key: 'analysis', label: '分析报告', icon: Thermometer }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === key
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* 数据概览 */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: '平均温度', value: '24.5°C', icon: Thermometer, color: 'text-red-600' },
              { title: '土壤湿度', value: '65%', icon: Droplets, color: 'text-blue-600' },
              { title: 'pH值', value: '6.8', icon: Gauge, color: 'text-green-600' },
              { title: '传感器数量', value: '12', icon: Gauge, color: 'text-purple-600' }
            ].map(({ title, value, icon: Icon, color }) => (
              <div key={title} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-800">{value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${color}`} />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">土壤指标分析</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* 传感器数据 */}
      {activeTab === 'sensors' && (
        <div className="space-y-4">
          <div className="grid gap-4">
            {sensorData.map((sensor) => (
              <div key={sensor.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Gauge className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-gray-800">{sensor.location}</h4>
                      <p className="text-sm text-gray-600">{sensor.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(sensor.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sensor.status)}`}>
                      {sensor.status === 'normal' ? '正常' : sensor.status === 'warning' ? '警告' : '异常'}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">温度</p>
                    <p className="text-lg font-semibold">{sensor.temperature}°C</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">湿度</p>
                    <p className="text-lg font-semibold">{sensor.humidity}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">pH值</p>
                    <p className="text-lg font-semibold">{sensor.ph}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">土壤水分</p>
                    <p className="text-lg font-semibold">{sensor.moisture}%</p>
                  </div>
                </div>
                
                <div className="mt-3 text-right">
                  <p className="text-xs text-gray-500">更新时间: {sensor.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 实验数据 */}
      {activeTab === 'experiments' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">样本ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">试验区</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">处理方式</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">测量值</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {experimentData.map((exp, index) => (
                  <tr key={exp.sampleId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {exp.sampleId}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      第{exp.plotNumber}区
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {exp.treatment}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                      {exp.measurement} {exp.unit}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {exp.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">产量对比分析</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={experimentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="treatment" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="measurement" stroke="#3B82F6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* 分析报告 */}
      {activeTab === 'analysis' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">本周数据总结</h3>
            <ul className="text-blue-700 space-y-1">
              <li>• 土壤湿度保持在适宜范围（60-70%）</li>
              <li>• 温度变化稳定，有利于苹果生长</li>
              <li>• 精准灌溉组产量提升31%</li>
              <li>• 建议继续保持当前管理策略</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">优化建议</h4>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• 继续监测土壤pH值变化</li>
                <li>• 适当调整灌溉频率</li>
                <li>• 加强病虫害预防</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">注意事项</h4>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• 关注天气变化</li>
                <li>• 定期检查设备状态</li>
                <li>• 记录异常情况</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgriculturalDataDisplay;