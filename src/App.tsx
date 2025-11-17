import React from 'react'
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import MerchantDashboard from './pages/merchant/Dashboard'
import MerchantProducts from './pages/merchant/Products'
import MerchantTraceability from './pages/merchant/Traceability'
import MerchantOrders from './pages/merchant/Orders'
import AdminDashboard from './pages/admin/Dashboard'
import AdminMonitoring from './pages/admin/Monitoring'
import AdminEnterprises from './pages/admin/Enterprises'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Scan from './pages/Scan'
import TestAuth from './pages/TestAuth'
import Layout from './components/Layout'
import MerchantLayout from './components/MerchantLayout'
import AdminLayout from './components/AdminLayout'
import { AuthProvider } from './contexts/AuthContext'
import StoryMap from './pages/play/StoryMap'
import AppleAdventure from './pages/play/AppleAdventure'
import TraceabilityDetail from './pages/TraceabilityDetail'

function App() {
  return (
    <AuthProvider>
      {import.meta.env.BASE_URL !== '/' ? (
        <HashRouter>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* 公开路由 */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/scan" element={<Scan />} />
              <Route path="/test-auth" element={<TestAuth />} />
              <Route path="/play/map" element={<StoryMap />} />
              <Route path="/play/apple" element={<AppleAdventure />} />
              <Route path="/traceability/:productId" element={<TraceabilityDetail />} />
              <Route path="/traceability/:productId" element={<TraceabilityDetail />} />
              
              {/* 用户端路由 */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="profile" element={<Profile />} />
                <Route path="orders" element={<Orders />} />
              </Route>
              
              {/* 商户端路由 */}
              <Route path="/merchant" element={<MerchantLayout />}>
                <Route index element={<MerchantDashboard />} />
                <Route path="products" element={<MerchantProducts />} />
                <Route path="traceability" element={<MerchantTraceability />} />
                <Route path="orders" element={<MerchantOrders />} />
              </Route>
              
              {/* 监管端路由 */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="monitoring" element={<AdminMonitoring />} />
                <Route path="enterprises" element={<AdminEnterprises />} />
              </Route>
            </Routes>
            <Toaster position="top-right" />
          </div>
        </HashRouter>
      ) : (
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* 公开路由 */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/scan" element={<Scan />} />
              <Route path="/test-auth" element={<TestAuth />} />
              <Route path="/play/map" element={<StoryMap />} />
              <Route path="/play/apple" element={<AppleAdventure />} />
              
              {/* 用户端路由 */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="profile" element={<Profile />} />
                <Route path="orders" element={<Orders />} />
              </Route>
              
              {/* 商户端路由 */}
              <Route path="/merchant" element={<MerchantLayout />}>
                <Route index element={<MerchantDashboard />} />
                <Route path="products" element={<MerchantProducts />} />
                <Route path="traceability" element={<MerchantTraceability />} />
                <Route path="orders" element={<MerchantOrders />} />
              </Route>
              
              {/* 监管端路由 */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="monitoring" element={<AdminMonitoring />} />
                <Route path="enterprises" element={<AdminEnterprises />} />
              </Route>
            </Routes>
            <Toaster position="top-right" />
          </div>
        </BrowserRouter>
      )}
    </AuthProvider>
  )
}

export default App