import React, { useState, useEffect } from 'react'
import { ContactSubmission } from '../../types'
import { contactAPI } from '../../services/api'

interface ContactManagementProps {
  onNotification?: (type: 'success' | 'error', message: string) => void
}

const ContactManagement: React.FC<ContactManagementProps> = ({ onNotification }) => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState<'all' | 'pending' | 'read' | 'replied'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Load contact submissions on component mount
  useEffect(() => {
    loadSubmissions()
  }, [])

  const loadSubmissions = async () => {
    setIsLoading(true)
    try {
      const data = await contactAPI.getSubmissions()
      setSubmissions(data)
    } catch (error) {
      console.error('Error loading contact submissions:', error)
      onNotification?.('error', 'Failed to load contact submissions')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredSubmissions = submissions.filter(submission => {
    const matchesFilter = filter === 'all' || submission.status === filter
    
    const matchesSearch = submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const handleStatusChange = async (id: string, status: 'pending' | 'read' | 'replied') => {
    setIsLoading(true)
    try {
      await contactAPI.updateSubmissionStatus(id, status)
      setSubmissions(submissions.map(sub => 
        sub.id === id ? { ...sub, status } : sub
      ))
      onNotification?.('success', 'Status updated successfully')
    } catch (error) {
      console.error('Error updating status:', error)
      onNotification?.('error', 'Failed to update status')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteSubmission = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) return
    
    setIsLoading(true)
    try {
      await contactAPI.deleteSubmission(id)
      setSubmissions(submissions.filter(sub => sub.id !== id))
      onNotification?.('success', 'Submission deleted successfully')
    } catch (error) {
      console.error('Error deleting submission:', error)
      onNotification?.('error', 'Failed to delete submission')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'status-new'
      case 'read': return 'status-read'
      case 'replied': return 'status-replied'
      default: return ''
    }
  }

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Contact Form Submissions</h2>
      </div>

      <div className="admin-filters">
        <div className="filter-group">
          <label>Filter:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
            <option value="all">All Submissions</option>
            <option value="pending">Pending</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Search:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or message..."
          />
        </div>
      </div>

      <div className="submissions-stats">
        <div className="stat-card">
          <h3>{submissions.length}</h3>
          <p>Total Submissions</p>
        </div>
        <div className="stat-card">
          <h3>{submissions.filter(sub => sub.status === 'pending').length}</h3>
          <p>Pending</p>
        </div>
        <div className="stat-card">
          <h3>{submissions.filter(sub => sub.status === 'read').length}</h3>
          <p>Read</p>
        </div>
        <div className="stat-card">
          <h3>{submissions.filter(sub => sub.status === 'replied').length}</h3>
          <p>Replied</p>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading contact submissions...</p>
        </div>
      ) : (
        <div className="submissions-list">
          {filteredSubmissions.map((submission) => (
          <div key={submission.id} className="submission-item">
            <div className="submission-header">
              <div className="submission-contact">
                <h4>{submission.firstName} {submission.lastName}</h4>
                <p className="submission-email">{submission.email}</p>
                <p className="submission-phone">{submission.phone}</p>
              </div>
              <div className="submission-meta">
                <span className={`status-badge ${getStatusColor(submission.status)}`}>
                  {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                </span>
                <span className="submission-date">{formatDate(submission.submittedAt)}</span>
              </div>
            </div>
            
            <div className="submission-message">
              <p>{submission.message}</p>
            </div>
            
            <div className="submission-actions">
              <div className="status-actions">
                <button 
                  className={`btn btn-sm ${submission.status === 'pending' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => handleStatusChange(submission.id, 'pending')}
                >
                  Mark as Pending
                </button>
                <button 
                  className={`btn btn-sm ${submission.status === 'read' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => handleStatusChange(submission.id, 'read')}
                >
                  Mark as Read
                </button>
                <button 
                  className={`btn btn-sm ${submission.status === 'replied' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => handleStatusChange(submission.id, 'replied')}
                >
                  Mark as Replied
                </button>
              </div>
              <div className="other-actions">
                <a 
                  href={`mailto:${submission.email}?subject=Re: Your inquiry`}
                  className="btn btn-sm btn-success"
                >
                  Reply
                </a>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteSubmission(submission.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}

      {filteredSubmissions.length === 0 && !isLoading && (
        <div className="no-results">
          <p>No submissions found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default ContactManagement
