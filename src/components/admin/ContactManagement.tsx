import React, { useState } from 'react'
import { ContactSubmission } from '../../types'

const ContactManagement: React.FC = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([
    {
      id: '1',
      email: 'john.doe@example.com',
      phone: '+1-555-0123',
      firstName: 'John',
      lastName: 'Doe',
      message: 'I need a quote for shipping my products from New York to Los Angeles.',
      submittedAt: '2024-01-15T10:30:00Z',
      status: 'new'
    },
    {
      id: '2',
      email: 'jane.smith@example.com',
      phone: '+1-555-0456',
      firstName: 'Jane',
      lastName: 'Smith',
      message: 'Looking for logistics services for our e-commerce business.',
      submittedAt: '2024-01-16T14:20:00Z',
      status: 'read'
    },
    {
      id: '3',
      email: 'bob.wilson@example.com',
      phone: '+1-555-0789',
      firstName: 'Bob',
      lastName: 'Wilson',
      message: 'Need urgent delivery services for medical supplies.',
      submittedAt: '2024-01-17T09:15:00Z',
      status: 'replied'
    }
  ])

  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSubmissions = submissions.filter(submission => {
    const matchesFilter = filter === 'all' || submission.status === filter
    
    const matchesSearch = submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const handleStatusChange = (id: string, status: 'new' | 'read' | 'replied') => {
    setSubmissions(submissions.map(sub => 
      sub.id === id ? { ...sub, status } : sub
    ))
  }

  const handleDeleteSubmission = (id: string) => {
    setSubmissions(submissions.filter(sub => sub.id !== id))
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
      case 'new': return 'status-new'
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
            <option value="new">New</option>
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
          <h3>{submissions.filter(sub => sub.status === 'new').length}</h3>
          <p>New</p>
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
                  className={`btn btn-sm ${submission.status === 'new' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => handleStatusChange(submission.id, 'new')}
                >
                  Mark as New
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

      {filteredSubmissions.length === 0 && (
        <div className="no-results">
          <p>No submissions found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default ContactManagement
