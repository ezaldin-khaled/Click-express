import React from 'react'
import { Routes as ReactRoutes, Route } from 'react-router-dom'
import Home from '../../pages/Home'
import Blogs from '../../pages/Blogs'
import Login from '../../pages/Login'
import AdminDashboard from '../../pages/AdminDashboard'
import ProtectedRoute from '../ProtectedRoute'

const Routes: React.FC = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs" element={<Blogs />} />
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
