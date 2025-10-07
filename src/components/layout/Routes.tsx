import React from 'react'
import { Routes as ReactRoutes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from '../../pages/Home'
import Blogs from '../../pages/Blogs'
import FAQs from '../../pages/FAQs'
import Terms from '../../pages/Terms'
import Privacy from '../../pages/Privacy'
import Login from '../../pages/Login'
import AdminDashboard from '../../pages/AdminDashboard'
import ProtectedRoute from '../ProtectedRoute'

const Routes: React.FC = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/blogs" element={<Layout><Blogs /></Layout>} />
      <Route path="/faq" element={<Layout><FAQs /></Layout>} />
      <Route path="/terms" element={<Layout><Terms /></Layout>} />
      <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/dashboard" element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      } />
    </ReactRoutes>
  )
}

export default Routes
