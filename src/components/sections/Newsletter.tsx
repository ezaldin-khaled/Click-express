import React, { useState } from 'react'

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Service order form submitted:', formData)
    // Reset form after submission
    setFormData({
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
      message: ''
    })
  }

  return (
    <section className="contact-form" id="contact">
      <div className="container">
        <div className="contact-form-content">
          <h2>Get a Quote</h2>
          <p>Contact us to order our logistics services and get a personalized quote</p>
          
          <form className="contact-form-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
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
              />
            </div>
            
            <button type="submit" className="contact-btn">
              Request Quote
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
