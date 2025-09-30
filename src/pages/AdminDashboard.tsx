import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GalleryManagement from '../components/admin/GalleryManagement'
import BlogManagement from '../components/admin/BlogManagement'
import EmailManagement from '../components/admin/EmailManagement'
import ContactManagement from '../components/admin/ContactManagement'

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('gallery')

  const tabs = [
    { id: 'gallery', label: 'Gallery', icon: '🖼️' },
    { id: 'blogs', label: 'Blogs', icon: '📝' },
    { id: 'emails', label: 'Email Subscribers', icon: '📧' },
    { id: 'contacts', label: 'Contact Forms', icon: '📞' }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'gallery':
        return <GalleryManagement />
      case 'blogs':
        return <BlogManagement />
      case 'emails':
        return <EmailManagement />
      case 'contacts':
        return <ContactManagement />
      default:
        return <GalleryManagement />
    }
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="container">
          <div className="admin-header-content">
            <h1>Admin Dashboard</h1>
            <Link to="/" className="back-to-site">
              ← Back to Site
            </Link>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="container">
          <div className="admin-layout">
            <div className="admin-sidebar">
              <nav className="admin-nav">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`admin-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="nav-icon">{tab.icon}</span>
                    <span className="nav-label">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="admin-main">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
