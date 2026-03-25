'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

const categories = ['All', 'Web', 'Android', 'iOS',];

const projects = [
  {
    id: 1,
    title: "Medrec-Q Dictate",
    category: "Android",
    tags: ["Flutter", "Hive", "API Integration", "Playstore"],
    description:
      "A voice dictation application designed for the medical field, enabling users to record, send, and manage dictations efficiently. Features include dictation listing, resend and override options, priority tagging, comments, and customizable profile and settings management.",
    year: "2026",
    color: "#2889e8",
    glow: "rgba(40, 137, 232, 0.18)",
    gradient: "linear-gradient(135deg, #071e3d 0%, #0b2a57 60%, #1a3a6e 100%)",
    accentGrad: "linear-gradient(135deg, #2889e8, #00d4ff)",
    mockupLines: [
      { x: 20, y: 28, w: 100, h: 6, r: 3, op: 0.7 },
      { x: 20, y: 44, w: 60, h: 4, r: 2, op: 0.4 },
      { x: 20, y: 68, w: 220, h: 40, r: 6, op: 0.12 },
      { x: 20, y: 118, w: 100, h: 6, r: 3, op: 0.5 },
      { x: 20, y: 134, w: 220, h: 30, r: 5, op: 0.08 },
    ],
  },
  {
    id: 2,
    title: "Medrec-Q Dictate",
    category: "iOS",
    tags: ["Flutter", "Hive", "API Integration", "Appstore"],
    description:
      "A voice dictation application designed for the medical field, enabling users to record, send, and manage dictations efficiently. Features include dictation listing, resend and override options, priority tagging, comments, and customizable profile and settings management.",
    year: "2026",
    color: "#2889e8",
    glow: "rgba(40, 137, 232, 0.18)",
    gradient: "linear-gradient(135deg, #071e3d 0%, #0b2a57 60%, #1a3a6e 100%)",
    accentGrad: "linear-gradient(135deg, #2889e8, #00d4ff)",
    mockupLines: [
      { x: 20, y: 28, w: 100, h: 6, r: 3, op: 0.7 },
      { x: 20, y: 44, w: 60, h: 4, r: 2, op: 0.4 },
      { x: 20, y: 68, w: 220, h: 40, r: 6, op: 0.12 },
      { x: 20, y: 118, w: 100, h: 6, r: 3, op: 0.5 },
      { x: 20, y: 134, w: 220, h: 30, r: 5, op: 0.08 },
    ],
  },
];

function hexToRgb(hex: string) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1], 16)}, ${parseInt(r[2], 16)}, ${parseInt(r[3], 16)}` : '255,255,255';
}

function MockupPreview({ project }: { project: typeof projects[0] }) {
  return (
    <svg width="260" height="180" viewBox="0 0 260 180" xmlns="http://www.w3.org/2000/svg">
      {/* Browser / phone chrome */}
      <rect x="0" y="0" width="260" height="180" rx="10"
        fill={`rgba(${hexToRgb(project.color)}, 0.06)`}
        stroke={`rgba(${hexToRgb(project.color)}, 0.18)`} strokeWidth="1" />
      {/* Top bar */}
      <rect x="0" y="0" width="260" height="20" rx="10" fill={`rgba(${hexToRgb(project.color)}, 0.1)`} />
      <rect x="10" y="0" width="260" height="10" fill={`rgba(${hexToRgb(project.color)}, 0.1)`} />
      {/* Traffic lights */}
      <circle cx="16" cy="10" r="3" fill={`rgba(${hexToRgb(project.color)}, 0.4)`} />
      <circle cx="26" cy="10" r="3" fill={`rgba(${hexToRgb(project.color)}, 0.25)`} />
      <circle cx="36" cy="10" r="3" fill={`rgba(${hexToRgb(project.color)}, 0.15)`} />
      {/* URL bar */}
      <rect x="60" y="5" width="140" height="10" rx="5" fill={`rgba(${hexToRgb(project.color)}, 0.1)`} />
      {/* Content lines */}
      {project.mockupLines.map((line, i) => (
        <rect
          key={i}
          x={line.x}
          y={line.y + 20}
          width={line.w}
          height={line.h}
          rx={line.r}
          fill={project.color}
          opacity={line.op}
        />
      ))}
      {/* Accent glow dot */}
      <circle cx="230" cy="160" r="20" fill={project.color} opacity="0.07" />
    </svg>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1px solid rgba(${hexToRgb(project.color)}, ${hovered ? 0.35 : 0.15})`,
        background: project.gradient,
        cursor: 'pointer',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? `0 24px 60px ${project.glow}` : '0 0 0 transparent',
        position: 'relative',
      }}
    >
      {/* Mockup preview area */}
      <div style={{
        padding: '28px 28px 16px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Ambient glow */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 70% 30%, ${project.glow} 0%, transparent 65%)`,
          opacity: hovered ? 1 : 0.5,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }} />

        <div style={{
          transform: hovered ? 'scale(1.03) translateY(-4px)' : 'scale(1)',
          transition: 'transform 0.4s ease',
        }}>
          <MockupPreview project={project} />
        </div>
      </div>

      {/* Card content */}
      <div style={{ padding: '0 28px 28px' }}>

        {/* Year + category badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
          }}>
            {project.year}
          </span>
          <span style={{
            padding: '3px 10px',
            borderRadius: '100px',
            background: `rgba(${hexToRgb(project.color)}, 0.12)`,
            border: `1px solid rgba(${hexToRgb(project.color)}, 0.25)`,
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.68rem',
            fontWeight: '500',
            color: project.color,
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
          }}>
            {project.category}
          </span>
        </div>

        {/* Title + arrow */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px', gap: '10px' }}>
          <h3 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: '1.35rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}>
            {project.title}
          </h3>
          <motion.div
            animate={{ rotate: hovered ? 45 : 0, scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.25 }}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: `rgba(${hexToRgb(project.color)}, 0.1)`,
              border: `1px solid rgba(${hexToRgb(project.color)}, 0.25)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ArrowUpRight size={15} color={project.color} />
          </motion.div>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.86rem',
          fontWeight: '300',
          lineHeight: 1.7,
          color: 'var(--text-secondary)',
          marginBottom: '20px',
        }}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              padding: '4px 10px',
              borderRadius: '4px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.68rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.04em',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover overlay bar */}
      <motion.div
        initial={false}
        animate={{ height: hovered ? '3px' : '0px' }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: project.accentGrad,
          borderRadius: '0 0 16px 16px',
          overflow: 'hidden',
        }}
      />
    </motion.div>
  );
}

export default function Works() {
  const [activeFilter, setActiveFilter] = useState('All');
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="works" style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Bg decoration */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(42, 137, 232, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(42, 137, 232, 0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />
      <div className="orb orb-blue" style={{ width: '600px', height: '600px', top: '50px', left: '-200px', opacity: 0.3 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '56px' }}
        >
          <div className="section-label" style={{ marginBottom: '20px' }}>Our Work</div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '28px',
          }}>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: '800',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
            }}>
              Previous{' '}
              <span style={{
                background: 'linear-gradient(135deg, #2889e8, #00d4ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Works
              </span>
            </h2>

            {/* Filter tabs */}
            <div style={{
              display: 'flex',
              gap: '6px',
              padding: '5px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(42,137,232,0.12)',
            }}>
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '7px',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: '600',
                    fontSize: '0.8rem',
                    letterSpacing: '0.04em',
                    transition: 'all 0.25s ease',
                    background: activeFilter === cat
                      ? 'linear-gradient(135deg, #1a6fc4, #2889e8)'
                      : 'transparent',
                    color: activeFilter === cat ? 'white' : 'var(--text-muted)',
                    boxShadow: activeFilter === cat ? '0 4px 16px rgba(0,212,255,0.2)' : 'none',
                  }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Count indicator */}
        <motion.div
          layout
          style={{
            marginTop: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
          }}>
            Showing <strong style={{ color: 'var(--text-secondary)' }}>{filtered.length}</strong> of {projects.length} projects
          </span>
          <span style={{ width: '1px', height: '14px', background: 'var(--text-muted)', opacity: 0.3 }} />
          <a
            href="#contact"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.82rem',
              color: 'var(--cyan-pop)',
              textDecoration: 'none',
              fontWeight: '500',
            }}
          >
            Have a project in mind? →
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          section#works div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}