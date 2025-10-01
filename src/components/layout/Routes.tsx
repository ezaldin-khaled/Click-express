import React from 'react'
import { Routes as ReactRoutes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from '../../pages/Home'
import Blogs from '../../pages/Blogs'
import Login from '../../pages/Login'
import TestLogin from '../../pages/TestLogin'
import AdminDashboard from '../../pages/AdminDashboard'
import ProtectedRoute from '../ProtectedRoute'

const Routes: React.FC = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/blogs" element={<Layout><Blogs /></Layout>} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <AdminDashboard />
          </Layout>
        </ProtectedRoute>
      } />
    </ReactRoutes>
  )
}

export default Routes
