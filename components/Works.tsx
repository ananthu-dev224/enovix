'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const categories = ['All', 'Web', 'Android', 'iOS'];

const projects = [
  {
    id: 1,
    title: 'Medrec-Q Dictate',
    category: 'Android',
    tags: ['Flutter', 'Hive', 'API Integration', 'Playstore'],
    description:
      'A voice dictation application designed for the medical field, enabling users to record, send, and manage dictations efficiently. Features include dictation listing, resend and override options, priority tagging, comments, and customizable profile and settings management.',
    year: '2026',
    image: '/medrecq.jpg',
    link: 'https://play.google.com/store/apps/details?id=app.medrec_q.dictate',
  },
  {
    id: 2,
    title: 'Medrec-Q Dictate',
    category: 'iOS',
    tags: ['Flutter', 'Hive', 'API Integration', 'Appstore'],
    description:
      'A voice dictation application designed for the medical field, enabling users to record, send, and manage dictations efficiently. Features include dictation listing, resend and override options, priority tagging, comments, and customizable profile and settings management.',
    year: '2026',
    image: '/medrecq_ios.jpg',
    link: 'https://apps.apple.com/us/app/medrec-q-dictate/id6759154532',
  },
  {
    id: 3,
    title: 'Medrec-Q Desktop Dictation',
    category: 'Web',
    tags: ['Electron.js', 'Floating Recorder', 'Medical Dictation', 'Cross-Platform'],
    description:
      'A cross-platform desktop dictation app built with Electron.js for medical professionals. The app features a floating always-on-top recorder that works seamlessly over other applications.',
    year: '2026',
    image: '/desktop-app-2.png',
    link: '',
  },
  {
    id: 5,
    title: 'Medrec-Q Dictation Management System',
    category: 'Web',
    tags: ['Next.js', 'Node.js', 'AI Transcription', 'Role-Based Access'],
    description:
      'A web-based dictation platform with role-based access, AI transcription, rich text editing, report review, and seamless submission. Powered by Artificial Intelligence.',
    year: '2026',
    image: '/dms.png',
    link: 'https://dms.medrecq.com/',
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);
  const hasLink = Boolean(project.link && project.link !== '#');

  const arrowButton = (
    <motion.div
      animate={{ rotate: hovered ? 45 : 0, scale: hovered ? 1.08 : 1 }}
      transition={{ duration: 0.25 }}
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: 'var(--blue-soft)',
        border: '1px solid var(--blue-soft-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        cursor: hasLink ? 'pointer' : 'default',
        opacity: hasLink ? 1 : 0.6,
      }}
    >
      <ArrowUpRight size={15} color="var(--blue-accent)" />
    </motion.div>
  );

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid var(--border)',
        background: '#ffffff',
        boxShadow: hovered ? 'var(--shadow-hover)' : 'var(--shadow-sm)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease',
        borderColor: hovered ? 'var(--blue-soft-border)' : 'var(--border)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        className="img-zoom"
        style={{
          width: '100%',
          height: 200,
          position: 'relative',
          background: 'var(--bg-secondary)',
          overflow: 'hidden',
        }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{
            objectFit: 'fill',
            width: '100%',
            height: '100%',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      </div>

      <div style={{ padding: '24px 28px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.06em',
            }}
          >
            {project.year}
          </span>
          <span
            style={{
              padding: '3px 10px',
              borderRadius: 100,
              background: 'var(--blue-soft)',
              border: '1px solid var(--blue-soft-border)',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.68rem',
              fontWeight: 600,
              color: 'var(--blue-accent)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {project.category}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: 10,
            gap: 10,
          }}
        >
          <h3
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h3>
          {hasLink ? (
            <Link href={project.link} target="_blank" rel="noopener noreferrer">
              {arrowButton}
            </Link>
          ) : (
            arrowButton
          )}
        </div>

        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.88rem',
            fontWeight: 400,
            lineHeight: 1.65,
            color: 'var(--text-secondary)',
            marginBottom: 18,
            flex: 1,
          }}
        >
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.68rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.02em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: hovered ? 3 : 0 }}
        style={{
          background: 'var(--blue-accent)',
          borderRadius: '0 0 16px 16px',
        }}
      />
    </motion.article>
  );
}

export default function Works() {
  const [activeFilter, setActiveFilter] = useState('All');
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="works"
      style={{
        padding: '110px 0',
        position: 'relative',
        background: '#ffffff',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }} className="works-inner">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          style={{ marginBottom: 52 }}
        >
          <div className="section-label" style={{ marginBottom: 18 }}>
            Our Work
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: 28,
            }}
          >
            <h2
              className="section-title"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                lineHeight: 1.12,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
              }}
            >
              Previous{' '}
              <span style={{ color: 'var(--blue-accent)' }}>Works</span>
            </h2>

            <div
              role="tablist"
              aria-label="Filter projects"
              style={{
                display: 'flex',
                gap: 4,
                padding: 5,
                borderRadius: 12,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    letterSpacing: '0.03em',
                    transition: 'all 0.2s ease',
                    background:
                      activeFilter === cat ? 'var(--blue-accent)' : 'transparent',
                    color: activeFilter === cat ? '#ffffff' : 'var(--text-secondary)',
                    boxShadow:
                      activeFilter === cat
                        ? '0 4px 12px rgba(26, 111, 196, 0.25)'
                        : 'none',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 24,
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          layout
          style={{
            marginTop: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
            }}
          >
            Showing{' '}
            <strong style={{ color: 'var(--text-secondary)' }}>
              {filtered.length}
            </strong>{' '}
            of {projects.length} projects
          </span>
          <span
            style={{
              width: 1,
              height: 14,
              background: 'var(--border)',
            }}
          />
          <a
            href="#contact"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.85rem',
              color: 'var(--blue-accent)',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Have a project in mind? →
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .works-inner { padding: 0 20px !important; }
          section#works div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
