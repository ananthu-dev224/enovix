'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Globe,
  Smartphone,
  Apple,
  Code2,
  Zap,
  Shield,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

const services = [
  {
    id: 'web',
    icon: Globe,
    accentIcon: Code2,
    label: '01',
    title: 'Web Development',
    tagline: 'Fast. Scalable. Pixel-perfect.',
    description:
    'We build modern web applications and websites using React, Next.js, and WordPress — from simple business sites to scalable SaaS platforms.',
    features: [
      'E-commerce Websites',
      'Portfolio Websites',
      'Business Websites',
      'Custom Web Applications',
      'SaaS Platforms'
    ],
    color: '#2889e8',
    glow: 'rgba(40, 137, 232, 0.15)',
    border: 'rgba(40, 137, 232, 0.25)',
    gradient: 'linear-gradient(135deg, rgba(40, 137, 232, 0.12), rgba(0, 212, 255, 0.06))',
  },
  {
    id: 'android',
    icon: Smartphone,
    accentIcon: Zap,
    label: '02',
    title: 'Android Development',
    tagline: 'Native power. Seamless feel.',
    description:
      'Robust Android applications crafted for performance on every device. We build apps using Flutter, following Material Design for intuitive, engaging user experiences.',
    features: [
      'E-commerce Apps',
      'Booking & Service Apps',
      'Social Media Apps',
      'Business & Productivity Apps',
      'Custom Android Applications'
    ],
    color: '#3ddc84',
    glow: 'rgba(61, 220, 132, 0.12)',
    border: 'rgba(61, 220, 132, 0.2)',
    gradient: 'linear-gradient(135deg, rgba(61, 220, 132, 0.1), rgba(0, 212, 255, 0.04))',
  },
  {
    id: 'ios',
    icon: Apple,
    accentIcon: Shield,
    label: '03',
    title: 'iOS Development',
    tagline: 'Refined. Polished. Apple-approved.',
    description:
      'Premium iOS apps built with Flutter that feel right at home on Apple devices. We follow Human Interface Guidelines to deliver apps users love and App Store reviewers approve.',
    features: [
      'E-commerce Apps',
      'On-demand Service Apps',
      'Social Networking Apps',
      'Enterprise iOS Solutions',
      'Custom iOS Applications'
    ],
    color: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.12)',
    border: 'rgba(168, 85, 247, 0.2)',
    gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(40, 137, 232, 0.05))',
  },
];

function useReveal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return { ref, inView };
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const { ref, inView } = useReveal();
  const Icon = service.icon;
  const AccentIcon = service.accentIcon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      style={{
        position: 'relative',
        borderRadius: '16px',
        background: service.gradient,
        border: `1px solid ${service.border}`,
        padding: '40px 36px',
        cursor: 'default',
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
        boxShadow: `0 0 0 0px ${service.glow}`,
        transition: 'box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px ${service.glow}, 0 0 0 1px ${service.border}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 0 0px transparent';
      }}
    >
      {/* Top corner label */}
      <div style={{
        position: 'absolute',
        top: '24px',
        right: '28px',
        fontFamily: 'Syne, sans-serif',
        fontSize: '0.75rem',
        fontWeight: '800',
        color: service.color,
        opacity: 0.5,
        letterSpacing: '0.1em',
      }}>
        {service.label}
      </div>

      {/* Decorative background blob */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${service.glow} 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Icon */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '58px',
        height: '58px',
        borderRadius: '12px',
        background: `rgba(${hexToRgb(service.color)}, 0.1)`,
        border: `1px solid ${service.border}`,
        marginBottom: '28px',
        position: 'relative',
      }}>
        <Icon size={26} color={service.color} strokeWidth={1.5} />
        <div style={{
          position: 'absolute',
          bottom: '-6px',
          right: '-6px',
          width: '20px',
          height: '20px',
          borderRadius: '6px',
          background: 'var(--navy-800)',
          border: `1px solid ${service.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <AccentIcon size={10} color={service.color} />
        </div>
      </div>

      {/* Tagline */}
      <div style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '0.72rem',
        fontWeight: '500',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: service.color,
        marginBottom: '10px',
        opacity: 0.85,
      }}>
        {service.tagline}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: '1.6rem',
        fontWeight: '700',
        color: 'var(--text-primary)',
        marginBottom: '16px',
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
      }}>
        {service.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '0.92rem',
        fontWeight: '300',
        lineHeight: 1.75,
        color: 'var(--text-secondary)',
        marginBottom: '28px',
      }}>
        {service.description}
      </p>

      {/* Divider */}
      <div style={{
        width: '100%',
        height: '1px',
        background: service.border,
        marginBottom: '24px',
      }} />

      {/* Feature tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
        {service.features.map((feat) => (
          <span key={feat} style={{
            padding: '5px 12px',
            borderRadius: '100px',
            background: `rgba(${hexToRgb(service.color)}, 0.07)`,
            border: `1px solid rgba(${hexToRgb(service.color)}, 0.2)`,
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.73rem',
            fontWeight: '500',
            color: service.color,
            letterSpacing: '0.02em',
          }}>
            {feat}
          </span>
        ))}
      </div>

      {/* CTA */}
      <motion.a
        href="#contact"
        whileHover={{ gap: '14px' }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'Syne, sans-serif',
          fontSize: '0.82rem',
          fontWeight: '600',
          color: service.color,
          textDecoration: 'none',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          transition: 'gap 0.2s ease',
        }}
      >
        Get Started
        <ArrowUpRight size={15} />
      </motion.a>
    </motion.div>
  );
}

// Utility to convert hex to RGB string
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '255, 255, 255';
}

export default function Services() {
  const headingReveal = useReveal();

  return (
    <section id="services" style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background orbs */}
      <div className="orb orb-blue" style={{ width: '500px', height: '500px', top: '0', right: '-150px', opacity: 0.4 }} />
      <div className="orb orb-cyan" style={{ width: '300px', height: '300px', bottom: '100px', left: '-80px', opacity: 0.25 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>

        {/* Section header */}
        <motion.div
          ref={headingReveal.ref}
          initial={{ opacity: 0, y: 30 }}
          animate={headingReveal.inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '70px' }}
        >
          <div className="section-label" style={{ marginBottom: '20px' }}>What We Do</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: '800',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              maxWidth: '500px',
            }}>
              Our{' '}
              <span style={{
                background: 'linear-gradient(135deg, #2889e8, #00d4ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Core Services
              </span>
            </h2>
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.95rem',
              fontWeight: '300',
              lineHeight: 1.75,
              color: 'var(--text-secondary)',
              maxWidth: '360px',
            }}>
              End-to-end digital product development — from idea to launch, built with quality and precision at every step.
            </p>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            marginTop: '60px',
            padding: '36px 48px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(26, 111, 196, 0.1), rgba(0, 212, 255, 0.05))',
            border: '1px solid rgba(42, 137, 232, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '10px',
              background: 'rgba(0, 212, 255, 0.1)',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Layers size={22} color="var(--cyan-pop)" strokeWidth={1.5} />
            </div>
            <div>
              <div style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '1.05rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '4px',
              }}>
                Need a full-stack solution?
              </div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.87rem',
                color: 'var(--text-secondary)',
                fontWeight: '300',
              }}>
                We combine all three — web + Android + iOS — into one unified product team.
              </div>
            </div>
          </div>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              textDecoration: 'none',
              padding: '12px 28px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #1a6fc4, #2889e8)',
              color: 'white',
              fontFamily: 'Syne, sans-serif',
              fontWeight: '600',
              fontSize: '0.82rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 20px rgba(0, 212, 255, 0.2)',
            }}
          >
            Let&apos;s Talk
          </motion.a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section#services > div > div[style*="justifyContent"] {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          section#services div[style*="padding: '36px 48px'"] {
            padding: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}