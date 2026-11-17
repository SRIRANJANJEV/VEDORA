import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Target, Eye, Zap, Award, Brain, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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
      const cards = contentRef.current?.querySelectorAll('.whirl-card')
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

  return (
    <div ref={sectionRef} id="about" className="section">
      <div className="section-content">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>
            About VEDORA
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255,255,255,0.7)', 
            textAlign: 'center', 
            maxWidth: '800px', 
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Technology partners committed to your success
          </p>
        </div>

        <div ref={contentRef} style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '2rem', 
          marginBottom: '4rem' 
        }}>
          <div className="whirl-card">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              marginBottom: '1.5rem' 
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
              }}>
                <Target size={28} color="white" />
              </div>
              <h3 style={{ margin: 0 }}>Our Mission</h3>
            </div>
            <p style={{ 
              fontSize: '0.95rem', 
              color: 'rgba(255,255,255,0.7)', 
              lineHeight: 1.7,
              margin: 0
            }}>
              To empower businesses with technology that transforms ideas into
              reality. We bridge the gap between vision and execution through
              strategic planning, technical excellence, and collaborative
              partnerships.
            </p>
          </div>

          <div className="whirl-card">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              marginBottom: '1.5rem' 
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
              }}>
                <Eye size={28} color="white" />
              </div>
              <h3 style={{ margin: 0 }}>Our Vision</h3>
            </div>
            <p style={{ 
              fontSize: '0.95rem', 
              color: 'rgba(255,255,255,0.7)', 
              lineHeight: 1.7,
              margin: 0
            }}>
              To be recognized as a trusted technology partner that combines
              technical excellence with strategic insight. We deliver innovative
              solutions that help businesses achieve their goals.
            </p>
          </div>
        </div>

        <div style={{ marginBottom: '4rem' }}>
          <h3 style={{ 
            fontSize: '1.8rem', 
            marginBottom: '2rem', 
            textAlign: 'center',
            color: 'white'
          }}>
            Built by Two. Driven by Possibility.
          </h3>
          
          <p style={{ 
            fontSize: '1.1rem', 
            color: 'rgba(255,255,255,0.7)', 
            textAlign: 'center', 
            maxWidth: '800px', 
            margin: '0 auto 3rem',
            lineHeight: 1.7
          }}>
            VEDORA brings together two aspiring technology builders with
            complementary interests across software engineering, cybersecurity,
            artificial intelligence, automation, and electronics. We combine our
            curiosity, technical learning, and practical experimentation to
            explore ideas and develop useful digital solutions.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem', 
          marginBottom: '4rem' 
        }}>
          <div className="whirl-card" style={{ textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
            }}>
              <Zap size={32} color="white" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Complementary Technical Interests</h3>
            <p style={{ 
              fontSize: '0.95rem', 
              color: 'rgba(255,255,255,0.7)', 
              lineHeight: 1.7,
              margin: 0
            }}>
              Our backgrounds span cybersecurity, embedded systems, AI
              development, and automation, allowing us to approach problems from
              multiple angles.
            </p>
          </div>

          <div className="whirl-card" style={{ textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
            }}>
              <Users size={32} color="white" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Hands-On Problem Solving</h3>
            <p style={{ 
              fontSize: '0.95rem', 
              color: 'rgba(255,255,255,0.7)', 
              lineHeight: 1.7,
              margin: 0
            }}>
              We learn by doing—building projects, experimenting with
              technologies, and solving real technical challenges through
              practical application.
            </p>
          </div>

          <div className="whirl-card" style={{ textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
            }}>
              <Brain size={32} color="white" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Exploration Across Domains</h3>
            <p style={{ 
              fontSize: '0.95rem', 
              color: 'rgba(255,255,255,0.7)', 
              lineHeight: 1.7,
              margin: 0
            }}>
              From software and AI to cybersecurity and electronics, we explore
              the intersections between technologies to create integrated
              solutions.
            </p>
          </div>

          <div className="whirl-card" style={{ textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
            }}>
              <Award size={32} color="white" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Continuous Learning</h3>
            <p style={{ 
              fontSize: '0.95rem', 
              color: 'rgba(255,255,255,0.7)', 
              lineHeight: 1.7,
              margin: 0
            }}>
              We are committed to continuous learning, staying current with
              emerging technologies, and applying new knowledge to practical
              innovation.
            </p>
          </div>
        </div>

        <div style={{
          marginTop: '4rem',
          padding: '2.5rem',
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
        }}>
          <h3 style={{
            fontSize: '1.8rem',
            marginBottom: '2rem',
            textAlign: 'center',
            color: 'white'
          }}>
            Our Engagement Process
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#3b82f6',
                marginBottom: '0.5rem',
              }}>
                01
              </div>
              <h4 style={{ marginBottom: '0.75rem', color: 'white' }}>Discovery</h4>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                We learn about your business requirements, technical
                constraints, and project goals.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#3b82f6',
                marginBottom: '0.5rem',
              }}>
                02
              </div>
              <h4 style={{ marginBottom: '0.75rem', color: 'white' }}>Strategy</h4>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                Architecture design, technology selection, and detailed project
                planning with clear milestones.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#3b82f6',
                marginBottom: '0.5rem',
              }}>
                03
              </div>
              <h4 style={{ marginBottom: '0.75rem', color: 'white' }}>Development</h4>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                Agile development with regular demos, continuous integration,
                and quality assurance.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#3b82f6',
                marginBottom: '0.5rem',
              }}>
                04
              </div>
              <h4 style={{ marginBottom: '0.75rem', color: 'white' }}>Launch & Support</h4>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                Production deployment, monitoring setup, and ongoing
                maintenance and support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
