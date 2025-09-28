import React from 'react'
import { Routes as ReactRoutes, Route } from 'react-router-dom'
import Home from '../../pages/Home'
import Blogs from '../../pages/Blogs'
import AdminDashboard from '../../pages/AdminDashboard'

const Routes: React.FC = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </ReactRoutes>
  )
}

export default Routes
