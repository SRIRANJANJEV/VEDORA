import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Code, Database, Shield, Microchip, Brain, Globe } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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

      // Cards fade in with staggered animation
      const cards = cardsRef.current?.querySelectorAll('.whirl-card')
      cards?.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 0.3,
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const services: Array<{
    icon: any
    title: string
    description: string
    image: string
  }> = [
    {
      icon: Code,
      title: 'Software Development',
      description: 'We build web applications and software solutions using modern frameworks and programming languages. Our focus is on creating clean, functional code that solves real problems.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80'
    },
    {
      icon: Database,
      title: 'Web Development',
      description: 'Responsive web applications with modern design and functionality. We work with frontend and backend technologies to create user-friendly digital experiences.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Security-focused development and testing. We explore network security, digital forensics, and secure coding practices to build more resilient systems.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80'
    },
    {
      icon: Microchip,
      title: 'Embedded Systems & IoT',
      description: 'Electronics programming and IoT device development. We work with microcontrollers like STM32 and ESP32 to create connected hardware solutions.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80'
    },
    {
      icon: Brain,
      title: 'AI & Automation',
      description: 'Exploration of AI technologies, large language models, and intelligent automation. We experiment with building AI-powered tools and solutions.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'
    },
    {
      icon: Globe,
      title: 'Technology Exploration',
      description: 'Continuous learning across emerging technologies. We research and experiment with new tools, frameworks, and approaches to expand our technical capabilities.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
    }
  ]

  return (
    <div ref={sectionRef} id="services" className="section">
      <div className="section-content">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>
            Our Services
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255,255,255,0.7)', 
            textAlign: 'center', 
            maxWidth: '800px', 
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Comprehensive technology solutions engineered for enterprise scale and performance
          </p>
        </div>
        
        <div ref={cardsRef} className="cards-grid">
          {services.map((service, index) => (
            <div key={index} className="whirl-card">
              <div className="image-container">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                marginBottom: '1rem' 
              }}>
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
                  <service.icon size={24} color="white" />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{service.title}</h3>
              </div>
              
              <p style={{ 
                fontSize: '0.95rem', 
                color: 'rgba(255,255,255,0.7)', 
                lineHeight: 1.7,
                margin: 0
              }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
