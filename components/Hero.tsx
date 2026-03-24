'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const floatAnim = {
  animate: {
    y: [0, -18, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const},
  },
};

// const stats = [
//   { value: '50+', label: 'Projects Delivered' },
//   { value: '30+', label: 'Happy Clients' },
//   { value: '3+', label: 'Years Experience' },
//   { value: '100%', label: 'Client Satisfaction' },
// ];
const stats:any = [];

export default function Hero() {
  return (
    <section
      id="home"
      className="grid-bg"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '80px',
      }}
    >
      {/* Ambient orbs */}
      <div className="orb orb-blue" style={{ width: '600px', height: '600px', top: '-100px', left: '-200px', opacity: 0.6 }} />
      <div className="orb orb-cyan" style={{ width: '400px', height: '400px', top: '20%', right: '-100px', opacity: 0.5 }} />
      <div className="orb orb-blue" style={{ width: '300px', height: '300px', bottom: '0', left: '40%', opacity: 0.3 }} />

      {/* Floating geometric accents */}
      <motion.div
        variants={floatAnim}
        animate="animate"
        style={{
          position: 'absolute',
          top: '15%',
          right: '8%',
          width: '80px',
          height: '80px',
          border: '1px solid rgba(0, 212, 255, 0.2)',
          borderRadius: '12px',
          transform: 'rotate(15deg)',
        }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '25%',
          right: '12%',
          width: '40px',
          height: '40px',
          border: '1px solid rgba(26, 111, 196, 0.3)',
          borderRadius: '50%',
        }}
      />
      <motion.div
        variants={floatAnim}
        animate="animate"
        style={{
          position: 'absolute',
          bottom: '25%',
          left: '5%',
          width: '50px',
          height: '50px',
          background: 'rgba(0, 212, 255, 0.05)',
          border: '1px solid rgba(0, 212, 255, 0.15)',
          transform: 'rotate(45deg)',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px', width: '100%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '800px' }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '100px',
              background: 'rgba(0, 212, 255, 0.07)',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              marginBottom: '32px',
            }}
          >
            <Sparkles size={14} color="var(--cyan-pop)" />
            <span style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.78rem',
              fontWeight: '500',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--cyan-pop)',
            }}>
             Product Engineering Studio
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: '800',
              lineHeight: '1.05',
              letterSpacing: '-0.03em',
              marginBottom: '28px',
              color: 'var(--text-primary)',
            }}
          >
            From Concept{' '}
            <span style={{
              background: 'linear-gradient(135deg, #2889e8 0%, #00d4ff 50%, #4dabff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}>
              to Code
            </span>
            <span style={{ fontStyle: 'italic', fontWeight: '700', color: 'var(--text-secondary)' }}> — <br />We Deliver</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              fontWeight: '300',
              lineHeight: '1.8',
              color: 'var(--text-secondary)',
              maxWidth: '560px',
              marginBottom: '48px',
            }}
          >
            Enovix is a freelance tech team crafting scalable web platforms
            and mobile apps — built with precision, designed to grow.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '80px' }}
          >
            <motion.a
              href="#works"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <span>View Our Work</span>
              <ArrowRight size={16} />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline"
              style={{ textDecoration: 'none' }}
            >
              Start a Project
            </motion.a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0',
              paddingTop: '40px',
              borderTop: '1px solid var(--border-subtle)',
              maxWidth: '560px',
            }}
          >
            {stats?.length > 0 && stats.map((stat:any, i:any) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                style={{ textAlign: i === 0 ? 'left' : 'center' }}
              >
                <div style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: '800',
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                  marginBottom: '6px',
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #4dabff, #00d4ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {stat.value}
                  </span>
                </div>
                <div style={{
                  fontSize: '0.72rem',
                  fontWeight: '400',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.05em',
                  lineHeight: 1.4,
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--blue-accent), transparent)',
          }}
        />
      </motion.div>

      <style>{`
        @media (max-width: 600px) {
          section#home div[style*="gridTemplateColumns"] {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}