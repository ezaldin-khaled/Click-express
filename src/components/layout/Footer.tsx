import React from 'react'
import { Link } from 'react-router-dom'
import { ContactInfo, SocialLink } from '../../types'

const Footer: React.FC = () => {
  const contactInfo: ContactInfo = {
    address: 'UAE, Dubai, Umm Ramool, Marrakech Street, Lootah Building, Office 206',
    phone: '+971503113160',
    email: 'Info@clickexpress.ae'
  }

  const socialLinks: SocialLink[] = [
    { name: 'Facebook', url: 'https://www.facebook.com/share/19nz8HJwpR/', icon: 'fab fa-facebook' },
    { name: 'Instagram', url: 'https://www.instagram.com/clickexpress.dxb?igsh=bmpmdnl6dWcxcDk=', icon: 'fab fa-instagram' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/click-express-transport/', icon: 'fab fa-linkedin' },
    { name: 'WhatsApp', url: 'https://wa.me/971503113160', icon: 'fab fa-whatsapp' }
  ]

  return (
    <footer className="footer" id="footer">
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
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 CLICK EXPRESS</p>
            <div className="footer-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/faq">FAQs</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
