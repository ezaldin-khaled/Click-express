import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { authAPI } from '../services/api'
import GalleryManagement from '../components/admin/GalleryManagement'
import BlogManagement from '../components/admin/BlogManagement'
import EmailManagement from '../components/admin/EmailManagement'
import ContactManagement from '../components/admin/ContactManagement'

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('gallery')
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const { logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login')
    }
  }, [isAuthenticated, navigate])

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      // Call logout API
      await authAPI.logout()
      setNotification({ type: 'success', message: 'Logged out successfully' })
    } catch (error) {
      console.error('Logout API error:', error)
      setNotification({ type: 'error', message: 'Error during logout' })
    } finally {
      // Always logout locally regardless of API response
      logout()
      setIsLoading(false)
    }
  }

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 5000)
  }

  const tabs = [
    { id: 'gallery', label: 'Gallery', icon: '🖼️' },
    { id: 'blogs', label: 'Blogs', icon: '📝' },
    { id: 'emails', label: 'Email Subscribers', icon: '📧' },
    { id: 'contacts', label: 'Contact Forms', icon: '📞' }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'gallery':
        return <GalleryManagement onNotification={showNotification} />
      case 'blogs':
        return <BlogManagement onNotification={showNotification} />
      case 'emails':
        return <EmailManagement onNotification={showNotification} />
      case 'contacts':
        return <ContactManagement onNotification={showNotification} />
      default:
        return <GalleryManagement onNotification={showNotification} />
    }
  }

  if (!isAuthenticated) {
    return null // Will redirect via useEffect
  }

  return (
    <div className="admin-dashboard">
      {/* Notification System */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          <div className="notification-content">
            <span className="notification-icon">
              {notification.type === 'success' ? '✓' : '⚠'}
            </span>
            <span className="notification-message">{notification.message}</span>
            <button 
              className="notification-close"
              onClick={() => setNotification(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="admin-header">
        <div className="container">
          <div className="admin-header-content">
            <div className="admin-header-left">
              <h1>Admin Dashboard</h1>
              <div className="admin-breadcrumb">
                <span>Dashboard</span>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">{tabs.find(tab => tab.id === activeTab)?.label}</span>
              </div>
            </div>
            <div className="admin-header-actions">
              <Link to="/" className="back-to-site">
                <span className="action-icon">🏠</span>
                Back to Site
              </Link>
              <button 
                onClick={handleLogout} 
                className="logout-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Logging out...
                  </>
                ) : (
                  <>
                    <span className="action-icon">🚪</span>
                    Logout
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="container">
          <div className="admin-layout">
            <div className="admin-sidebar">
              <div className="sidebar-header">
                <h3>Management</h3>
                <p>Content & User Management</p>
              </div>
              <nav className="admin-nav">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`admin-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="nav-icon">{tab.icon}</span>
                    <span className="nav-label">{tab.label}</span>
                    {activeTab === tab.id && <span className="nav-indicator"></span>}
                  </button>
                ))}
              </nav>
              <div className="sidebar-footer">
                <div className="admin-info">
                  <div className="admin-avatar">👤</div>
                  <div className="admin-details">
                    <div className="admin-name">Administrator</div>
                    <div className="admin-role">System Admin</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-main">
              <div className="main-header">
                <h2>{tabs.find(tab => tab.id === activeTab)?.label} Management</h2>
                <p>Manage your {tabs.find(tab => tab.id === activeTab)?.label.toLowerCase()} content and settings</p>
              </div>
              <div className="main-content">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
