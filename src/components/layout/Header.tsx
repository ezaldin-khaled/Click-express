import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NavigationItem } from '../../types'

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)

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

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <img 
              src="/src/assets/LOGO.png" 
              alt="CLICK EXPRESS Logo" 
              className="logo-image"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="nav">
            <ul className="nav-list">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  {item.href.startsWith('#') ? (
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        const element = document.querySelector(item.href)
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' })
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
      </div>
    </header>
  )
}

export default Header
