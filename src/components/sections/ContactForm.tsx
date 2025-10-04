import React, { useState } from 'react'
import { contactAPI } from '../../services/api'

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Prepare data for API - send data structure that matches API expectations
      const contactData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        message: formData.message,
        subject: 'Inquiry about Click Express'
      }

      await contactAPI.submitContact(contactData)
      
      setSubmitStatus('success')
      // Reset form after successful submission
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        message: ''
      })
    } catch (error) {
      console.error('Error submitting contact form:', error)
      setSubmitStatus('error')
      setErrorMessage('Failed to submit your request. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact-form" id="contact">
      <div className="container">
        <div className="contact-form-content">
          <h2>Get in Touch</h2>
          <p>Contact us to order our logistics services and get a personalized quote</p>
          
          <form className="contact-form-form" onSubmit={handleSubmit}>
            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="form-message success-message">
                <p>Thank you! Your quote request has been submitted successfully. We'll get back to you soon.</p>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="form-message error-message">
                <p>{errorMessage}</p>
              </div>
            )}

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Tell us about your logistics needs and requirements"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                disabled={isSubmitting}
              />
            </div>
            
            <button 
              type="submit" 
              className="contact-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending Email...' : 'Send Email'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
