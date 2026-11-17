import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const ctx = gsap.context(() => {
        // Logo scale and fade entrance with smoother animation
        if (logoRef.current) {
          gsap.from(logoRef.current, {
            scale: 0.9,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
          })
        }

        // Tagline fade in with slight vertical movement
        if (taglineRef.current) {
          gsap.from(taglineRef.current, {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out',
          })
        }

        // Main heading entrance
        if (headingRef.current) {
          gsap.from(headingRef.current, {
            opacity: 0,
            y: 30,
            duration: 1.2,
            delay: 0.4,
            ease: 'power3.out',
          })
        }

        // Description fade in
        if (descriptionRef.current) {
          gsap.from(descriptionRef.current, {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 0.6,
            ease: 'power3.out',
          })
        }

        // CTA button entrance
        if (ctaRef.current) {
          gsap.from(ctaRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 0.8,
            ease: 'power3.out',
          })
        }

        // Scroll indicator animation
        if (scrollIndicatorRef.current) {
          gsap.to(scrollIndicatorRef.current, {
            y: 10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
          })
        }
      }, heroRef)

      return () => ctx.revert()
    } catch (error) {
      console.error('Hero animation error:', error)
    }
  }, [])

  const handleScroll = () => {
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      const offset = 80
      const elementPosition = servicesSection.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div ref={heroRef} id="hero" className="hero-section">
      {/* Hero Content Container */}
      <div style={{
        textAlign: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Logo and Brand */}
        <div ref={logoRef} style={{ marginBottom: '2.5rem' }}>
          <img
            src="/logo.png"
            alt="VEDORA Logo"
            style={{
              maxWidth: '280px',
              height: 'auto',
              display: 'block',
              margin: '0 auto 1.5rem',
              filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))',
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <div className="hero-logo" style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)' }}>
            VEDORA
          </div>
        </div>

        {/* Tagline */}
        <div ref={taglineRef} style={{ marginBottom: '1.5rem' }}>
          <h3 style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
            fontWeight: 500,
            color: '#3b82f6',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            margin: 0,
            lineHeight: 1.4
          }}>
            Imagine. Engineer. Evolve.
          </h3>
        </div>

        {/* Main Heading */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 ref={headingRef} style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            color: 'white',
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Building Intelligent Solutions for Tomorrow
          </h1>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '3rem' }}>
          <p ref={descriptionRef} style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.85)',
            lineHeight: 1.7,
            maxWidth: '700px',
            margin: '0 auto',
            fontWeight: 400
          }}>
            We create innovative technology solutions that transform businesses and shape the future of digital experiences.
          </p>
        </div>

        {/* CTA Button */}
        <div ref={ctaRef} style={{ marginBottom: '4rem' }}>
          <button 
            className="hero-cta" 
            onClick={handleScroll}
            style={{
              padding: '1.25rem 3rem',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'white',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(59, 130, 246, 0.6)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.4)'
            }}
          >
            Explore Our Work
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div ref={scrollIndicatorRef} style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 0.6
        }}>
          <span style={{
            fontSize: '0.875rem',
            color: 'rgba(255, 255, 255, 0.7)',
            letterSpacing: '0.05em'
          }}>
            Scroll to explore
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
