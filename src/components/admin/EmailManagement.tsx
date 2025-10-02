import React, { useState, useEffect } from 'react'
import { EmailSubscriber } from '../../types'

interface EmailManagementProps {
  onNotification?: (type: 'success' | 'error', message: string) => void
}

const EmailManagement: React.FC<EmailManagementProps> = ({ onNotification }) => {
  const [subscribers, setSubscribers] = useState<EmailSubscriber[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Load email subscribers on component mount
  useEffect(() => {
    loadSubscribers()
  }, [])

  const loadSubscribers = async () => {
    setIsLoading(true)
    try {
      // Note: Email API endpoints may need to be implemented in the backend
      // For now, we'll use mock data
      const mockSubscribers: EmailSubscriber[] = [
        {
          id: '1',
          email: 'john.doe@example.com',
          firstName: 'John',
          lastName: 'Doe',
          subscribedAt: '2024-01-15',
          isActive: true
        },
        {
          id: '2',
          email: 'jane.smith@example.com',
          firstName: 'Jane',
          lastName: 'Smith',
          subscribedAt: '2024-01-16',
          isActive: true
        },
        {
          id: '3',
          email: 'bob.wilson@example.com',
          subscribedAt: '2024-01-17',
          isActive: false
        }
      ]
      setSubscribers(mockSubscribers)
    } catch (error) {
      console.error('Error loading email subscribers:', error)
      onNotification?.('error', 'Failed to load email subscribers')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesFilter = filter === 'all' || 
      (filter === 'active' && subscriber.isActive) ||
      (filter === 'inactive' && !subscriber.isActive)
    
    const matchesSearch = subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (subscriber.firstName && subscriber.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (subscriber.lastName && subscriber.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesFilter && matchesSearch
  })

  const handleToggleStatus = (id: string) => {
    setSubscribers(subscribers.map(sub => 
      sub.id === id ? { ...sub, isActive: !sub.isActive } : sub
    ))
  }

  const handleDeleteSubscriber = (id: string) => {
    setSubscribers(subscribers.filter(sub => sub.id !== id))
  }

  const handleExportEmails = () => {
    const activeEmails = subscribers
      .filter(sub => sub.isActive)
      .map(sub => sub.email)
      .join('\n')
    
    const blob = new Blob([activeEmails], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'email-subscribers.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Email Subscribers</h2>
        <div className="admin-actions">
          <button className="btn btn-secondary" onClick={handleExportEmails}>
            Export Emails
          </button>
        </div>
      </div>

      <div className="admin-filters">
        <div className="filter-group">
          <label>Filter:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
            <option value="all">All Subscribers</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Search:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by email or name..."
          />
        </div>
      </div>

      <div className="subscribers-stats">
        <div className="stat-card">
          <h3>{subscribers.length}</h3>
          <p>Total Subscribers</p>
        </div>
        <div className="stat-card">
          <h3>{subscribers.filter(sub => sub.isActive).length}</h3>
          <p>Active Subscribers</p>
        </div>
        <div className="stat-card">
          <h3>{subscribers.filter(sub => !sub.isActive).length}</h3>
          <p>Inactive Subscribers</p>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading email subscribers...</p>
        </div>
      ) : (
        <div className="subscribers-list">
          {filteredSubscribers.map((subscriber) => (
          <div key={subscriber.id} className={`subscriber-item ${!subscriber.isActive ? 'inactive' : ''}`}>
            <div className="subscriber-info">
              <div className="subscriber-email">{subscriber.email}</div>
              {(subscriber.firstName || subscriber.lastName) && (
                <div className="subscriber-name">
                  {subscriber.firstName} {subscriber.lastName}
                </div>
              )}
              <div className="subscriber-meta">
                Subscribed: {subscriber.subscribedAt}
                <span className={`status-badge ${subscriber.isActive ? 'active' : 'inactive'}`}>
                  {subscriber.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            <div className="subscriber-actions">
              <button 
                className={`btn btn-sm ${subscriber.isActive ? 'btn-warning' : 'btn-success'}`}
                onClick={() => handleToggleStatus(subscriber.id)}
              >
                {subscriber.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button 
                className="btn btn-sm btn-danger"
                onClick={() => handleDeleteSubscriber(subscriber.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        </div>
      )}

      {filteredSubscribers.length === 0 && !isLoading && (
        <div className="no-results">
          <p>No subscribers found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default EmailManagement
