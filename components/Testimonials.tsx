'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Vinodhan P V',
    role: 'Founder',
    company: 'Medrec-Q Dictate',
    avatar: 'RM',
    avatarColor: '#2889e8',
    rating: 5,
    text: 'Enovix delivered our platform in a short timeframe while staying budget-friendly throughout the process. Their clear communication and collaborative approach made the entire experience smooth and efficient. A great choice for teams looking to move fast without compromising quality.',
    project: 'Mobile Application (android & ios)',
    flag: '🇮🇳',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
      ))}
    </div>
  );
}

function Avatar({ initials, color }: { initials: string; color: string }) {
  function hexToRgb(hex: string) {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r ? `${parseInt(r[1], 16)}, ${parseInt(r[2], 16)}, ${parseInt(r[3], 16)}` : '255,255,255';
  }
  return (
    <div style={{
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      background: `radial-gradient(circle at 35% 35%, rgba(${hexToRgb(color)}, 0.5), rgba(${hexToRgb(color)}, 0.15))`,
      border: `1.5px solid rgba(${hexToRgb(color)}, 0.4)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Syne, sans-serif',
      fontWeight: '700',
      fontSize: '0.85rem',
      color: color,
      flexShrink: 0,
      letterSpacing: '0.02em',
    }}>
      {initials}
    </div>
  );
}

export default function Testimonials() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const total = testimonials.length;

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + total) % total);
  };

  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60, scale: 0.97 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60, scale: 0.97 }),
  };

  const t = testimonials[current];
  // Side previews
  const prev = testimonials[(current - 1 + total) % total];
  const next = testimonials[(current + 1) % total];

  return (
    <section
      id="testimonials"
      style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, transparent 0%, rgba(7, 30, 61, 0.3) 50%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      <div className="orb orb-cyan" style={{ width: '500px', height: '500px', top: '0', right: '-100px', opacity: 0.2 }} />
      <div className="orb orb-blue" style={{ width: '400px', height: '400px', bottom: '0', left: '-100px', opacity: 0.2 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '20px' }}>
            Client Love
          </div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: '800',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            marginBottom: '16px',
          }}>
            What Our{' '}
            <span style={{
              background: 'linear-gradient(135deg, #2889e8, #00d4ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Clients Say
            </span>
          </h2>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '1rem',
            fontWeight: '300',
            color: 'var(--text-secondary)',
            maxWidth: '460px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Real feedback from the people and companies we've had the pleasure of building with.
          </p>
        </motion.div>

        {/* Carousel */}
        <div style={{ position: 'relative' }}>

          {/* Side previews (desktop) */}
          <div className="side-previews" style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pointerEvents: 'none',
            zIndex: 1,
          }}>
            {/* Left ghost */}
            <div style={{
              width: '220px',
              opacity: 0.25,
              transform: 'scale(0.88)',
              transformOrigin: 'right center',
              pointerEvents: 'none',
              marginLeft: '-60px',
            }}>
              <MiniCard t={prev} />
            </div>
            {/* Right ghost */}
            <div style={{
              width: '220px',
              opacity: 0.25,
              transform: 'scale(0.88)',
              transformOrigin: 'left center',
              pointerEvents: 'none',
              marginRight: '-60px',
            }}>
              <MiniCard t={next} />
            </div>
          </div>

          {/* Main card */}
          <div style={{
            maxWidth: '720px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 2,
          }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  borderRadius: '20px',
                  padding: '52px 52px 44px',
                  background: 'rgba(4, 20, 40, 0.8)',
                  border: '1px solid rgba(42, 137, 232, 0.18)',
                  backdropFilter: 'blur(20px)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Accent glow from avatar color */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '280px',
                  height: '280px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${t.avatarColor}18 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }} />

                {/* Quote icon */}
                <div style={{
                  position: 'absolute',
                  top: '36px',
                  right: '44px',
                  opacity: 0.08,
                }}>
                  <Quote size={72} color={t.avatarColor} />
                </div>

                {/* Rating + project tag */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
                  <StarRating count={t.rating} />
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '100px',
                    background: `rgba(42, 137, 232, 0.1)`,
                    border: '1px solid rgba(42, 137, 232, 0.2)',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.7rem',
                    fontWeight: '500',
                    color: 'var(--blue-bright)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase' as const,
                  }}>
                    {t.project}
                  </span>
                </div>

                {/* Quote text */}
                <blockquote style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                  fontWeight: '300',
                  fontStyle: 'italic',
                  lineHeight: 1.8,
                  color: 'var(--text-primary)',
                  marginBottom: '36px',
                  position: 'relative',
                }}>
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                {/* Divider */}
                <div style={{
                  width: '100%',
                  height: '1px',
                  background: 'rgba(42, 137, 232, 0.12)',
                  marginBottom: '28px',
                }} />

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Avatar initials={t.avatar} color={t.avatarColor} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        fontFamily: 'Syne, sans-serif',
                        fontSize: '0.95rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.01em',
                      }}>
                        {t.name}
                      </span>
                      <span style={{ fontSize: '0.9rem' }}>{t.flag}</span>
                    </div>
                    <div style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '0.8rem',
                      fontWeight: '400',
                      color: 'var(--text-muted)',
                      marginTop: '2px',
                    }}>
                      {t.role} · <span style={{ color: t.avatarColor, opacity: 0.85 }}>{t.company}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            marginTop: '40px',
          }}>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => go(-1)}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1px solid rgba(42, 137, 232, 0.25)',
                background: 'rgba(4, 20, 40, 0.7)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,212,255,0.4)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--cyan-pop)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(42,137,232,0.25)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
              }}
            >
              <ChevronLeft size={18} />
            </motion.button>

            {/* Dot indicators */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => goTo(i)}
                  animate={{
                    width: i === current ? 24 : 8,
                    background: i === current ? '#00d4ff' : 'rgba(42,137,232,0.3)',
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    height: '8px',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => go(1)}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1px solid rgba(42, 137, 232, 0.25)',
                background: 'rgba(4, 20, 40, 0.7)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,212,255,0.4)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--cyan-pop)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(42,137,232,0.25)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
              }}
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>

          {/* Auto-play progress bar */}
          {!isPaused && (
            <div style={{ maxWidth: '720px', margin: '20px auto 0', height: '2px', background: 'rgba(42,137,232,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <motion.div
                key={current}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: 'linear' }}
                style={{ height: '100%', background: 'linear-gradient(90deg, #1a6fc4, #00d4ff)', borderRadius: '2px' }}
              />
            </div>
          )}
        </div>

        {/* Trust strip */}
        {/* <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            marginTop: '72px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '40px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '5.0', label: 'Average Rating' },
            { value: '30+', label: 'Happy Clients' },
            { value: '100%', label: 'On-time Delivery' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '1.8rem',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #4dabff, #00d4ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                marginBottom: '6px',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div> */}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .side-previews { display: none !important; }
          section#testimonials div[style*="padding: '52px 52px"] {
            padding: 32px 24px 28px !important;
          }
        }
      `}</style>
    </section>
  );
}

// Lightweight ghost card for side preview
function MiniCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div style={{
      borderRadius: '16px',
      padding: '24px',
      background: 'rgba(4, 20, 40, 0.6)',
      border: '1px solid rgba(42, 137, 232, 0.1)',
    }}>
      <div style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '0.78rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
        marginBottom: '16px',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical' as const,
        overflow: 'hidden',
        fontStyle: 'italic',
      }}>
        &ldquo;{t.text}&rdquo;
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: `${t.avatarColor}22`,
          border: `1px solid ${t.avatarColor}44`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Syne, sans-serif',
          fontSize: '0.6rem',
          fontWeight: '700',
          color: t.avatarColor,
        }}>
          {t.avatar}
        </div>
        <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.72rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
          {t.name}
        </span>
      </div>
    </div>
  );
}