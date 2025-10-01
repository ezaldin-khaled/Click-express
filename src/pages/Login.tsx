import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api'
// import { useAuth } from '../contexts/AuthContext'

const Login: React.FC = () => {
  console.log('Login component is rendering')
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  // const { login } = useAuth()
  
  const login = (token: string) => {
    localStorage.setItem('authToken', token)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await authAPI.login(formData)

      // Store auth token if provided
      if (response.token) {
        login(response.token)
      }
      // Redirect to admin dashboard
      navigate('/admin/dashboard')
    } catch (err: any) {
      if (err.response) {
        // Server responded with error status
        setError(err.response.data.message || 'Login failed. Please check your credentials.')
      } else if (err.request) {
        // Request was made but no response received
        setError('Network error. Please check your connection and try again.')
      } else {
        // Something else happened
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page" style={{backgroundColor: 'red', minHeight: '100vh', padding: '20px'}}>
      <div className="login-container">
        <div className="login-card" style={{backgroundColor: 'white', padding: '20px', borderRadius: '10px'}}>
          <div className="login-header">
            <h1 style={{color: 'black'}}>Admin Login</h1>
            <p style={{color: 'black'}}>Sign in to access the admin dashboard</p>
            <p style={{color: 'red', fontSize: '12px'}}>DEBUG: Login component is rendering</p>
            <p style={{color: 'blue', fontSize: '10px'}}>URL: {window.location.href}</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="login-footer">
            <a href="/" className="back-link">
              ← Back to Website
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
