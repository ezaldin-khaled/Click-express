import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NavigationItem } from '../../types'

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems: NavigationItem[] = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact Us', href: '#contact' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Blogs', href: '/blogs' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <img 
              src="/assets/LOGO.png" 
              alt="CLICK EXPRESS Logo" 
              className="logo-image"
            />
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="nav desktop-nav">
            <ul className="nav-list">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  {item.href.startsWith('#') ? (
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        // Navigate to home page first if not already there
                        if (window.location.pathname !== '/') {
                          window.location.href = `/${item.href}`
                        } else {
                          const element = document.querySelector(item.href)
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' })
                          }
                        }
                      }}
                    >
                      {item.label}
                      {item.hasDropdown && (
                        <i className="fas fa-chevron-down"></i>
                      )}
                    </a>
                  ) : (
                    <Link to={item.href}>
                      {item.label}
                      {item.hasDropdown && (
                        <i className="fas fa-chevron-down"></i>
                      )}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-list">
            {navigationItems.map((item) => (
              <li key={item.label}>
                {item.href.startsWith('#') ? (
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      // Navigate to home page first if not already there
                      if (window.location.pathname !== '/') {
                        window.location.href = `/${item.href}`
                      } else {
                        const element = document.querySelector(item.href)
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' })
                          closeMobileMenu()
                        }
                      }
                    }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link to={item.href} onClick={closeMobileMenu}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
