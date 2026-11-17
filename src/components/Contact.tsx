import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Mail, Send, Phone, MapPin } from 'lucide-react'
import { validateName, isValidEmail, detectAttackPatterns } from '../lib/security'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '' })
  const [status, setStatus] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fades and scales in with improved animation
      if (sectionRef.current) {
        gsap.from(sectionRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 0.3,
          }
        })
      }

      // Form fades in with improved animation
      if (formRef.current) {
        gsap.from(formRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 0.3,
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Attack pattern detection
    if (detectAttackPatterns(formData.name) || 
        detectAttackPatterns(formData.email) || 
        detectAttackPatterns(formData.message) ||
        detectAttackPatterns(formData.company)) {
      setStatus('Invalid input detected. Please check your submission.')
      setTimeout(() => setStatus(''), 5000)
      return
    }

    // Validate name
    const nameValidation = validateName(formData.name)
    if (!nameValidation.valid) {
      setStatus(nameValidation.error || 'Invalid name')
      setTimeout(() => setStatus(''), 5000)
      return
    }

    // Validate email
    if (!isValidEmail(formData.email)) {
      setStatus('Please enter a valid email address')
      setTimeout(() => setStatus(''), 5000)
      return
    }

    // Sanitize inputs
    const sanitizedName = nameValidation.sanitized
    const sanitizedEmail = formData.email.trim()
    const sanitizedPhone = formData.phone.trim()
    const sanitizedCompany = formData.company.trim()
    const sanitizedMessage = formData.message.trim()

    const mailtoLink = `mailto:vedorabuildofficial@gmail.com?subject=Message from ${sanitizedName}&body=Name: ${sanitizedName}%0D%0AEmail: ${sanitizedEmail}%0D%0APhone: ${sanitizedPhone}%0D%0ACompany: ${sanitizedCompany}%0D%0A%0D%0AProject Details:%0D%0A${sanitizedMessage}`
    window.location.href = mailtoLink
    setStatus('Thank you for your message! We will respond within 16 hours.')
    setTimeout(() => setStatus(''), 5000)
  }

  return (
    <div ref={sectionRef} id="contact" className="section">
      <div className="section-content">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>
            Get In Touch
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255,255,255,0.7)', 
            textAlign: 'center', 
            maxWidth: '800px', 
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Ready to start your project? Contact us for a free consultation. We'll discuss your requirements, timeline, and how we can help achieve your goals.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '3rem', 
          maxWidth: '1200px', 
          margin: '0 auto' 
        }}>
          {/* Contact Information */}
          <div>
            <div className="whirl-card" style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>Contact Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                  }}>
                    <Mail size={20} color="white" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>Email</div>
                    <div style={{ fontSize: '1rem', color: 'white' }}>vedorabuildofficial@gmail.com</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                  }}>
                    <Phone size={20} color="white" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>Phone</div>
                    <div style={{ fontSize: '1rem', color: 'white' }}>+91 9840468688</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                  }}>
                    <MapPin size={20} color="white" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>Location</div>
                    <div style={{ fontSize: '1rem', color: 'white' }}>India, Tamilnadu, Salem</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="whirl-card">
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>Frequently Asked Questions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#3b82f6', fontSize: '0.95rem' }}>What is your typical project timeline?</div>
                  <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                    Project timelines vary based on scope and complexity. We provide detailed estimates during the discovery phase and work with you to establish realistic milestones.
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#3b82f6', fontSize: '0.95rem' }}>Do you work with startups?</div>
                  <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                    Yes, we work with companies of all sizes. We offer flexible engagement models and can adapt to your budget and timeline requirements.
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#3b82f6', fontSize: '0.95rem' }}>What technologies do you specialize in?</div>
                  <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                    We specialize in modern web technologies including React, Node.js, Python, Java, and Go. We work with cloud platforms like AWS, Azure, and GCP, and databases including PostgreSQL, MongoDB, and Redis.
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#3b82f6', fontSize: '0.95rem' }}>Do you provide ongoing support?</div>
                  <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                    Yes, we offer maintenance and support packages with flexible options. Support includes bug fixes, security updates, and assistance with feature enhancements.
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#3b82f6', fontSize: '0.95rem' }}>How do you handle intellectual property?</div>
                  <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                    All work product and intellectual property created during our engagement belongs to you. We use standard agreements that clearly assign IP rights to our clients.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="whirl-card">
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>Send Us a Message</h3>
            <p style={{ marginBottom: '1.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
              We will respond within 16 hours
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6'
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6'
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                  Phone Number (with Country Code) *
                </label>
                <input
                  type="tel"
                  placeholder="+91 9840468688"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6'
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                  Company (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Your Company"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6'
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                  Project Details *
                </label>
                <textarea
                  placeholder="Tell us about your project, timeline, and goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    resize: 'vertical',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6'
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>
              <button
                type="submit"
                className="hero-cta"
                style={{ 
                  width: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.5rem', 
                  marginTop: '0.5rem' 
                }}
              >
                <Send size={20} />
                Send Message
              </button>
              {status && (
                <div style={{
                  padding: '1rem',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '8px',
                  color: '#3b82f6',
                  fontSize: '0.9rem',
                  textAlign: 'center'
                }}>
                  {status}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
