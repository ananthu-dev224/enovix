'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Vinodhan P V',
    role: 'Founder',
    company: 'Medrec-Q',
    avatar: 'V',
    avatarColor: '#1a6fc4',
    rating: 5,
    text: 'Working with Enovix was a great experience. The team delivered exactly what we needed on time, kept us informed throughout the project, and maintained a high standard of quality from start to finish. They are reliable, responsive, and genuinely easy to work with.',
    project: 'App & Web',
    flag: '🇮🇳',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 3 }} aria-label={`${count} star rating`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
      ))}
    </div>
  );
}

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: 'var(--blue-soft)',
        border: `1.5px solid ${color}40`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Syne, sans-serif',
        fontWeight: 700,
        fontSize: '0.9rem',
        color,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function MiniCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div
      style={{
        borderRadius: 16,
        padding: 24,
        background: '#ffffff',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.78rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: 16,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical' as const,
          overflow: 'hidden',
          fontStyle: 'italic',
        }}
      >
        &ldquo;{t.text}&rdquo;
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'var(--blue-soft)',
            border: '1px solid var(--blue-soft-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Syne, sans-serif',
            fontSize: '0.6rem',
            fontWeight: 700,
            color: t.avatarColor,
          }}
        >
          {t.avatar}
        </div>
        <span
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: '0.72rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
          }}
        >
          {t.name}
        </span>
      </div>
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

  useEffect(() => {
    if (isPaused || total <= 1) return;
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
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 48 : -48, scale: 0.98 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -48 : 48, scale: 0.98 }),
  };

  const t = testimonials[current];
  const prev = testimonials[(current - 1 + total) % total];
  const next = testimonials[(current + 1) % total];

  return (
    <section
      id="testimonials"
      className="section-alt"
      style={{ padding: '110px 0', position: 'relative' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }} className="testimonials-inner">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div
            className="section-label"
            style={{ justifyContent: 'center', marginBottom: 18 }}
          >
            Client Love
          </div>
          <h2
            className="section-title"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              marginBottom: 14,
            }}
          >
            What Our{' '}
            <span style={{ color: 'var(--blue-accent)' }}>Clients Say</span>
          </h2>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '1rem',
              fontWeight: 400,
              color: 'var(--text-secondary)',
              maxWidth: 460,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Real feedback from the people and companies we&apos;ve had the pleasure
            of building with.
          </p>
        </motion.div>

        <div style={{ position: 'relative' }}>
          <div
            className="side-previews"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: 220,
                opacity: 0.35,
                transform: 'scale(0.88)',
                transformOrigin: 'right center',
                marginLeft: -60,
              }}
            >
              <MiniCard t={prev} />
            </div>
            <div
              style={{
                width: 220,
                opacity: 0.35,
                transform: 'scale(0.88)',
                transformOrigin: 'left center',
                marginRight: -60,
              }}
            >
              <MiniCard t={next} />
            </div>
          </div>

          <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  borderRadius: 20,
                  padding: '48px 48px 40px',
                  background: '#ffffff',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-lg)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                className="testimonial-card"
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 32,
                    right: 40,
                    opacity: 0.08,
                  }}
                >
                  <Quote size={72} color={t.avatarColor} />
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 24,
                    flexWrap: 'wrap',
                    gap: 12,
                  }}
                >
                  <StarRating count={t.rating} />
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: 100,
                      background: 'var(--blue-soft)',
                      border: '1px solid var(--blue-soft-border)',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      color: 'var(--blue-accent)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {t.project}
                  </span>
                </div>

                <blockquote
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 'clamp(1rem, 2vw, 1.12rem)',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    lineHeight: 1.8,
                    color: 'var(--text-primary)',
                    marginBottom: 32,
                  }}
                >
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                <div
                  style={{
                    width: '100%',
                    height: 1,
                    background: 'var(--border)',
                    marginBottom: 24,
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <Avatar initials={t.avatar} color={t.avatarColor} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span
                        style={{
                          fontFamily: 'Syne, sans-serif',
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {t.name}
                      </span>
                      <span style={{ fontSize: '0.9rem' }}>{t.flag}</span>
                    </div>
                    <div
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '0.82rem',
                        color: 'var(--text-muted)',
                        marginTop: 2,
                      }}
                    >
                      {t.role} ·{' '}
                      <span style={{ color: 'var(--blue-accent)' }}>{t.company}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 20,
              marginTop: 36,
            }}
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                border: '1px solid var(--border)',
                background: '#ffffff',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-sm)',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  'var(--blue-accent)';
                (e.currentTarget as HTMLButtonElement).style.color =
                  'var(--blue-accent)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  'var(--border)';
                (e.currentTarget as HTMLButtonElement).style.color =
                  'var(--text-secondary)';
              }}
            >
              <ChevronLeft size={18} />
            </motion.button>

            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  animate={{
                    width: i === current ? 24 : 8,
                    background:
                      i === current ? 'var(--blue-accent)' : '#d1d5db',
                  }}
                  transition={{ duration: 0.25 }}
                  style={{
                    height: 8,
                    borderRadius: 4,
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => go(1)}
              aria-label="Next testimonial"
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                border: '1px solid var(--border)',
                background: '#ffffff',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-sm)',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  'var(--blue-accent)';
                (e.currentTarget as HTMLButtonElement).style.color =
                  'var(--blue-accent)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  'var(--border)';
                (e.currentTarget as HTMLButtonElement).style.color =
                  'var(--text-secondary)';
              }}
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>

          {!isPaused && total > 1 && (
            <div
              style={{
                maxWidth: 720,
                margin: '20px auto 0',
                height: 2,
                background: 'var(--border)',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <motion.div
                key={current}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: 'linear' }}
                style={{
                  height: '100%',
                  background: 'var(--blue-accent)',
                  borderRadius: 2,
                }}
              />
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .side-previews { display: none !important; }
          .testimonial-card { padding: 32px 24px 28px !important; }
          .testimonials-inner { padding: 0 20px !important; }
        }
      `}</style>
    </section>
  );
}
