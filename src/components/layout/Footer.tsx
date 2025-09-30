import React from 'react'
import { Link } from 'react-router-dom'
import { ContactInfo, SocialLink } from '../../types'

const Footer: React.FC = () => {
  const contactInfo: ContactInfo = {
    address: 'Level 1, 12 Sample St, Sydney NSW 2000',
    phone: '1000 123 4567',
    email: 'info@clickexpress.com'
  }

  const socialLinks: SocialLink[] = [
    { name: 'Facebook', url: '#', icon: 'fab fa-facebook' },
    { name: 'Instagram', url: '#', icon: 'fab fa-instagram' },
    { name: 'Twitter', url: '#', icon: 'fab fa-twitter' },
    { name: 'LinkedIn', url: '#', icon: 'fab fa-linkedin' },
    { name: 'YouTube', url: '#', icon: 'fab fa-youtube' }
  ]

  const quickLinks = [
    { label: 'FAQs', href: '#faq' },
    { label: 'Support Center', href: '#support' },
    { label: 'Feedback', href: '#feedback' },
    { label: 'Resources', href: '#resources' },
    { label: 'Community', href: '#community' }
  ]

  const companyLinks = [
    { label: 'FAQs', href: '#faq' },
    { label: 'Support Center', href: '#support' },
    { label: 'Feedback', href: '#feedback' },
    { label: 'Resources', href: '#resources' },
    { label: 'Community', href: '#community' }
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/assets/LOGO.png" alt="CLICK EXPRESS Logo" className="footer-logo-image" />
            </div>
            <div className="contact-info">
              <p><i className="fas fa-map-marker-alt"></i> Address: {contactInfo.address}</p>
              <p><i className="fas fa-phone"></i> Contact: {contactInfo.phone}</p>
              <p><i className="fas fa-envelope"></i> {contactInfo.email}</p>
            </div>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.url}>
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 CLICK EXPRESS</p>
            <div className="footer-links">
              <Link to="#privacy">Privacy Policy</Link>
              <Link to="#terms">Terms of Service</Link>
              <Link to="#cookies">Cookies Settings</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
