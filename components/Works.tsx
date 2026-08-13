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
    imageWidth: 1600,
    imageHeight: 800,
    link: 'https://play.google.com/store/apps/details?id=app.medrec_q.dictate',
  },
  {
    id: 2,
    title: 'Medrec-Q Dictate iOS',
    category: 'iOS',
    tags: ['Flutter', 'Hive', 'API Integration', 'Appstore'],
    description:
      'A voice dictation application designed for the medical field, enabling users to record, send, and manage dictations efficiently. Features include dictation listing, resend and override options, priority tagging, comments, and customizable profile and settings management.',
    year: '2026',
    image: '/medrecq_ios.jpg',
    imageWidth: 1121,
    imageHeight: 858,
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
    imageWidth: 1536,
    imageHeight: 1024,
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
    imageWidth: 1883,
    imageHeight: 1070,
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
  const [hovered, setHovered] = useState(false);
  const hasLink = Boolean(project.link && project.link !== '#');

  const arrowButton = (
    <motion.div
      animate={{ rotate: hovered ? 45 : 0, scale: hovered ? 1.08 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        width: 42,
        height: 42,
        borderRadius: 12,
        background: hovered ? 'var(--blue-accent)' : 'var(--blue-soft)',
        border: '1px solid var(--blue-soft-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        cursor: hasLink ? 'pointer' : 'default',
        opacity: hasLink ? 1 : 0.6,
        transition: 'background-color 0.25s ease, border-color 0.25s ease',
      }}
    >
      <ArrowUpRight size={16} color={hovered ? '#ffffff' : 'var(--blue-accent)'} />
    </motion.div>
  );

  return (
    <motion.article
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 24,
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="project-card"
    >
      <div className="project-card-inner">
        {/* Left Column: Content */}
        <div className="project-card-content">
          <div className="project-card-header">
            <span className="project-card-year">{project.year}</span>
            <span className="project-card-category">{project.category}</span>
          </div>

          <div className="project-card-title-row">
            <h3 className="project-card-title">{project.title}</h3>
            {hasLink ? (
              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                {arrowButton}
              </Link>
            ) : (
              arrowButton
            )}
          </div>

          <p className="project-card-description">{project.description}</p>

          <div className="project-card-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-badge">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Image Preview */}
        <div className="project-card-image-wrapper">
          <div className="project-card-image-gradient">
            <div className="project-card-image-container">
              <Image
                src={project.image}
                alt={project.title}
                width={project.imageWidth}
                height={project.imageHeight}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="project-card-image"
              />
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: hovered ? 4 : 0 }}
        style={{
          background: 'var(--blue-accent)',
          borderRadius: '0 0 24px 24px',
          width: '100%',
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
              {categories.map((cat) => {
                const isActive = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFilter(cat)}
                    style={{
                      position: 'relative',
                      padding: '8px 18px',
                      borderRadius: 8,
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      letterSpacing: '0.03em',
                      transition: 'color 0.25s ease',
                      background: 'transparent',
                      color: isActive ? '#ffffff' : 'var(--text-secondary)',
                      outline: 'none',
                      zIndex: 1,
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterTab"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'var(--blue-accent)',
                          borderRadius: 8,
                          boxShadow: '0 4px 12px rgba(26, 111, 196, 0.25)',
                          zIndex: -1,
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          layout
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            paddingBottom: '80px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98, y: -20 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  top: 'calc(var(--nav-height, 72px) + 90px + ' + (i * 28) + 'px)',
                  zIndex: i + 1,
                }}
                className="project-card-wrapper"
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
        .project-card-inner {
          display: flex;
          flex-direction: column;
          flex: 1;
          width: 100%;
          height: 100%;
        }

        @media (min-width: 1024px) {
          .project-card-inner {
            flex-direction: row;
          }
        }

        .project-card {
          background: #ffffff;
          border: 1px solid var(--border);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          transition: box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1), 
                      border-color 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .project-card:hover {
          border-color: var(--blue-soft-border);
          box-shadow: var(--shadow-hover);
          transform: translateY(-4px);
        }

        .project-card-content {
          display: flex;
          flex-direction: column;
          padding: 32px 28px;
          flex: 1.25;
        }

        @media (min-width: 1024px) {
          .project-card-content {
            padding: 44px 48px;
          }
        }

        .project-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .project-card-year {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.06em;
        }

        .project-card-category {
          padding: 4px 12px;
          border-radius: 100px;
          background: var(--blue-soft);
          border: 1px solid var(--blue-soft-border);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--blue-accent);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .project-card-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 16px;
        }

        .project-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.45rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.25;
        }

        @media (min-width: 1024px) {
          .project-card-title {
            font-size: 1.75rem;
          }
        }

        .project-card-description {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem;
          font-weight: 400;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 24px;
          flex: 1;
        }

        .project-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag-badge {
          padding: 5px 12px;
          border-radius: 8px;
          background: rgba(26, 111, 196, 0.03);
          border: 1px solid rgba(26, 111, 196, 0.08);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--blue-accent);
          transition: all 0.25s ease;
        }

        .project-card:hover .tag-badge {
          background: rgba(26, 111, 196, 0.07);
          border-color: rgba(26, 111, 196, 0.15);
        }

        .project-card-image-wrapper {
          flex: 1;
          position: relative;
          min-height: 240px;
          overflow: hidden;
          order: -1;
          display: flex;
        }

        @media (min-width: 1024px) {
          .project-card-image-wrapper {
            min-height: 100%;
            align-self: stretch;
            order: 0;
          }
        }

        .project-card-image-gradient {
          width: 100%;
          height: 100%;
          min-height: inherit;
          background: linear-gradient(135deg, var(--bg-secondary) 0%, rgba(26, 111, 196, 0.04) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        @media (min-width: 1024px) {
          .project-card-image-gradient {
            padding: 44px;
          }
        }

        .project-card-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .project-card:hover .project-card-image-container {
          transform: scale(1.03);
        }

        .project-card-image {
          width: 100% !important;
          height: 100% !important;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          object-position: center center;
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.06));
          transition: filter 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .project-card:hover .project-card-image {
          filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.12));
        }

        @media (max-width: 768px) {
          .project-card-image-wrapper {
            flex: none;
            width: 100%;
            min-height: 0;
            height: auto;
            overflow: hidden;
          }

          .project-card-image-gradient {
            height: auto;
            min-height: 0;
            padding: 0;
            display: block;
            background: var(--bg-secondary);
          }

          .project-card-image-container {
            display: block;
            width: 100%;
            height: auto;
            min-height: 0;
          }

          .project-card:hover .project-card-image-container {
            transform: none;
          }

          .project-card-image,
          .project-card:hover .project-card-image {
            display: block;
            width: 100% !important;
            height: auto !important;
            max-width: 100%;
            max-height: none;
            object-fit: contain;
            object-position: center center;
            filter: none;
          }
        }

        .project-card-wrapper {
          position: relative;
        }

        @media (min-width: 1024px) {
          .project-card-wrapper {
            position: sticky;
          }
        }

        @media (max-width: 640px) {
          .works-inner { padding: 0 20px !important; }
        }
      `}</style>
    </section>
  );
}
