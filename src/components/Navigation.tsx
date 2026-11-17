import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Only track sections on homepage
      if (location.pathname === '/') {
        const sections = ['hero', 'services', 'solutions', 'projects', 'about', 'founders', 'founders-brain', 'contact']
        const scrollPosition = window.scrollY + 100

        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const { offsetTop, offsetHeight } = element
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section)
              break
            }
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
      setIsMobileMenuOpen(false)
    }
  }

  const navLinks = [
    { name: 'Home', target: 'hero', type: 'section' },
    { name: 'About', target: 'about', type: 'section' },
    { name: 'Services', target: 'services', type: 'section' },
    { name: 'Solutions', target: 'solutions', type: 'section' },
    { name: 'Projects', target: 'projects', type: 'section' },
    { name: 'Contact', target: 'contact', type: 'section' },
  ]

  const dropdownLinks = [
    { name: 'Founders Brain', target: 'founders-brain', type: 'section' },
    { name: 'Founders', target: 'founders', type: 'section' },
    { name: 'Promotion Partner', target: '/promotion-partner', type: 'route' },
    { name: 'Wall of Love', target: '/wall-of-love', type: 'route' },
  ]

  const renderNavLink = (link: { name: string; target: string; type: string }, isMobile = false) => {
    const isActive = link.type === 'route' 
      ? location.pathname === link.target 
      : activeSection === link.target && location.pathname === '/'

    if (link.type === 'route') {
      return (
        <Link
          key={link.name}
          to={link.target}
          style={{
            padding: isMobile ? '0.875rem 1.25rem' : '0.625rem 1.25rem',
            fontSize: isMobile ? '0.95rem' : '0.875rem',
            fontWeight: 500,
            color: isActive ? '#3b82f6' : 'rgba(255, 255, 255, 0.75)',
            borderRadius: '0.5rem',
            transition: 'all 0.3s ease',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            position: 'relative',
            fontFamily: 'inherit',
            textDecoration: 'none',
            display: isMobile ? 'block' : 'inline-block',
            width: isMobile ? '100%' : 'auto',
            textAlign: isMobile ? 'left' : 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#3b82f6'
            e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.08)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = isActive ? '#3b82f6' : 'rgba(255, 255, 255, 0.75)'
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {link.name}
          {isActive && (
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '2px',
                backgroundColor: '#3b82f6',
                borderRadius: '1px',
                boxShadow: '0 0 8px rgba(59, 130, 246, 0.6)',
              }}
            />
          )}
        </Link>
      )
    } else {
      return (
        <button
          key={link.name}
          onClick={() => {
            if (location.pathname !== '/') {
              window.location.href = '/'
              setTimeout(() => scrollToSection(link.target), 100)
            } else {
              scrollToSection(link.target)
            }
          }}
          style={{
            padding: isMobile ? '0.875rem 1.25rem' : '0.625rem 1.25rem',
            fontSize: isMobile ? '0.95rem' : '0.875rem',
            fontWeight: 500,
            color: isActive ? '#3b82f6' : 'rgba(255, 255, 255, 0.75)',
            borderRadius: '0.5rem',
            transition: 'all 0.3s ease',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            position: 'relative',
            fontFamily: 'inherit',
            display: isMobile ? 'block' : 'inline-block',
            width: isMobile ? '100%' : 'auto',
            textAlign: isMobile ? 'left' : 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#3b82f6'
            e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.08)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = isActive ? '#3b82f6' : 'rgba(255, 255, 255, 0.75)'
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          {link.name}
          {isActive && location.pathname === '/' && (
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '2px',
                backgroundColor: '#3b82f6',
                borderRadius: '1px',
                boxShadow: '0 0 8px rgba(59, 130, 246, 0.6)',
              }}
            />
          )}
        </button>
      )
    }
  }

  const renderDropdownLink = (link: { name: string; target: string; type: string }, isMobile = false) => {
    const isActive = link.type === 'route' 
      ? location.pathname === link.target 
      : activeSection === link.target && location.pathname === '/'

    if (link.type === 'route') {
      return (
        <Link
          key={link.name}
          to={link.target}
          style={{
            padding: isMobile ? '0.75rem 1rem' : '0.5rem 1rem',
            fontSize: isMobile ? '0.9rem' : '0.85rem',
            fontWeight: 500,
            color: isActive ? '#3b82f6' : 'rgba(255, 255, 255, 0.7)',
            borderRadius: '0.5rem',
            transition: 'all 0.3s ease',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            position: 'relative',
            fontFamily: 'inherit',
            textDecoration: 'none',
            display: isMobile ? 'block' : 'block',
            width: '100%',
            textAlign: 'left',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#3b82f6'
            e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.08)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = isActive ? '#3b82f6' : 'rgba(255, 255, 255, 0.7)'
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
          onClick={() => {
            setIsMobileMenuOpen(false)
            setIsDropdownOpen(false)
          }}
        >
          {link.name}
        </Link>
      )
    } else {
      return (
        <button
          key={link.name}
          onClick={() => {
            if (location.pathname !== '/') {
              window.location.href = '/'
              setTimeout(() => scrollToSection(link.target), 100)
            } else {
              scrollToSection(link.target)
            }
            setIsMobileMenuOpen(false)
            setIsDropdownOpen(false)
          }}
          style={{
            padding: isMobile ? '0.75rem 1rem' : '0.5rem 1rem',
            fontSize: isMobile ? '0.9rem' : '0.85rem',
            fontWeight: 500,
            color: isActive ? '#3b82f6' : 'rgba(255, 255, 255, 0.7)',
            borderRadius: '0.5rem',
            transition: 'all 0.3s ease',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            position: 'relative',
            fontFamily: 'inherit',
            display: 'block',
            width: '100%',
            textAlign: 'left',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#3b82f6'
            e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.08)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = isActive ? '#3b82f6' : 'rgba(255, 255, 255, 0.7)'
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          {link.name}
        </button>
      )
    }
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        transition: 'all 0.3s ease',
        backgroundColor: isScrolled ? 'rgba(10, 14, 26, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.4)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 2rem',
          height: '5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src="/logo.png"
            alt="VEDORA"
            style={{
              height: '2.5rem',
              width: 'auto',
              filter: 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.4))',
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <div
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '-0.02em',
            }}
          >
            VEDORA
          </div>
        </div>

        {/* Desktop Navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.125rem',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => renderNavLink(link))}
          
          {/* Dropdown for additional links */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onMouseEnter={() => setIsDropdownOpen(true)}
              style={{
                padding: '0.625rem 1rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.75)',
                borderRadius: '0.5rem',
                transition: 'all 0.3s ease',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#3b82f6'
                e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)'
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              More
              <ChevronDown size={16} style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease' }} />
            </button>
            
            {isDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '0.5rem',
                  backgroundColor: 'rgba(10, 14, 26, 0.98)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.75rem',
                  padding: '0.5rem',
                  minWidth: '200px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                  zIndex: 100,
                }}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                {dropdownLinks.map((link) => renderDropdownLink(link))}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              if (location.pathname !== '/') {
                window.location.href = '/'
                setTimeout(() => scrollToSection('contact'), 100)
              } else {
                scrollToSection('contact')
              }
            }}
            style={{
              marginLeft: '1rem',
              padding: '0.625rem 1.75rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'white',
              backgroundColor: '#2563eb',
              borderRadius: '9999px',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#3b82f6'
              e.currentTarget.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.5)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Let's Talk
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            padding: '0.5rem',
            color: 'white',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            display: 'block',
            backgroundColor: 'rgba(10, 14, 26, 0.98)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
          className="mobile-menu"
        >
          <div style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {navLinks.map((link) => renderNavLink(link, true))}
            
            {/* Dropdown section for mobile */}
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                More
              </div>
              {dropdownLinks.map((link) => renderDropdownLink(link, true))}
            </div>

            <button
              onClick={() => {
                if (location.pathname !== '/') {
                  window.location.href = '/'
                  setTimeout(() => scrollToSection('contact'), 100)
                } else {
                  scrollToSection('contact')
                }
              }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'center',
                padding: '0.875rem 2rem',
                marginTop: '1.25rem',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'white',
                backgroundColor: '#2563eb',
                borderRadius: '9999px',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#3b82f6'
                e.currentTarget.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb'
                e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)'
              }}
            >
              Let's Talk
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
