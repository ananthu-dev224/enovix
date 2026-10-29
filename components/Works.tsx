'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const categories = ['All', 'Web', 'Desktop', 'Android', 'iOS'];

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
    category: 'Desktop',
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
    id: 4,
    title: 'Medrec-Q Mini',
    category: 'Desktop',
    tags: ['AI Reporting', 'Realtime AI', 'Vision OCR', 'Structured Reports', 'Floating Desktop App'],
    description:
      'An intelligent desktop application designed to float seamlessly over EHRs and other clinical software. Features real-time AI text reporting, virtual reporting with AI-driven image OCR, and automated structured report generation for rapid medical documentation.',
    year: '2026',
    image: '/medrecq-mini-1.png',
    imageWidth: 439,
    imageHeight: 417,
    extraImage: '/medrecq-mini-2.png',
    extraImageWidth: 435,
    extraImageHeight: 440,
    link: '',
  },
  {
    id: 5,
    title: 'DMS',
    category: 'Web',
    tags: ['React.js', 'Node.js', 'AssemblyAI', 'Footpedal Support', 'Role-Based Access'],
    description:
      'A web-based dictation platform with role-based access, AssemblyAI transcription, integrated footpedal support, rich text editing, report review, and seamless submission. A refinement layer uses saved user profiles so transcriptions are tailored and improved from each userâ€™s data.',
    year: '2026',
    image: '/dms.png',
    imageWidth: 1883,
    imageHeight: 1070,
    link: 'https://dms.medrecq.com/',
  },
];

function ImageCarousel({
  images,
  title,
}: {
  images: { src: string; width: number; height: number }[];
  title: string;
}) {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="carousel-root">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="carousel-slide"
        >
          <Image
            src={images[current].src}
            alt={`${title} — ${current + 1}`}
            width={images[current].width}
            height={images[current].height}
            sizes="(max-width: 768px) 90vw, 45vw"
            className="carousel-img"
          />
        </motion.div>
      </AnimatePresence>

      {/* Nav arrows */}
      <button
        onClick={prev}
        className="carousel-btn carousel-btn-left"
        aria-label="Previous image"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="carousel-btn carousel-btn-right"
        aria-label="Next image"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`carousel-dot${i === current ? ' carousel-dot-active' : ''}`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

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
            {'extraImage' in project && project.extraImage ? (
              <ImageCarousel
                images={[
                  { src: project.image, width: project.imageWidth, height: project.imageHeight },
                  {
                    src: project.extraImage,
                    width: 'extraImageWidth' in project && project.extraImageWidth ? project.extraImageWidth : 435,
                    height: 'extraImageHeight' in project && project.extraImageHeight ? project.extraImageHeight : 440,
                  },
                ]}
                title={project.title}
              />
            ) : (
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
            )}
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
              className="works-tablist"
              style={{
                display: 'flex',
                gap: 4,
                padding: 5,
                borderRadius: 12,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                maxWidth: '100%',
                overflowX: 'auto',
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
            Have a project in mind? â†’
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
            padding: 44px 44px;
            flex: 1;
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
          min-height: 320px;
          overflow: hidden;
          order: -1;
          display: flex;
        }

        @media (min-width: 1024px) {
          .project-card-image-wrapper {
            min-height: 100%;
            align-self: stretch;
            order: 0;
            flex: 1.25;
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
          padding: 24px;
        }

        @media (min-width: 1024px) {
          .project-card-image-gradient {
            padding: 28px 32px;
          }
        }

        /* Single image container */
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

        /* Carousel for dual-image projects */
        .carousel-root {
          position: relative;
          width: 100%;
          height: 360px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .carousel-slide {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 44px; /* room for arrows */
        }

        .carousel-img {
          width: auto !important;
          height: 100% !important;
          max-width: 100%;
          max-height: 320px;
          object-fit: contain;
          object-position: center center;
          border-radius: 12px;
          filter: drop-shadow(0 10px 28px rgba(0, 0, 0, 0.12));
          transition: filter 0.4s ease;
        }

        .project-card:hover .carousel-img {
          filter: drop-shadow(0 18px 40px rgba(0, 0, 0, 0.18));
        }

        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid var(--blue-soft-border);
          background: rgba(255, 255, 255, 0.9);
          color: var(--blue-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(6px);
          transition: background 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
          opacity: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .project-card:hover .carousel-btn {
          opacity: 1;
        }

        .carousel-btn:hover {
          background: var(--blue-accent);
          color: #fff;
          box-shadow: 0 4px 14px rgba(26, 111, 196, 0.35);
        }

        .carousel-btn-left  { left: 8px; }
        .carousel-btn-right { right: 8px; }

        .carousel-dots {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 10;
        }

        .carousel-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          border: none;
          background: rgba(26, 111, 196, 0.25);
          cursor: pointer;
          transition: background 0.25s ease, transform 0.25s ease;
          padding: 0;
        }

        .carousel-dot-active {
          background: var(--blue-accent);
          transform: scale(1.35);
        }

        @media (max-width: 768px) {
          .carousel-btn {
            width: 30px;
            height: 30px;
            opacity: 1;
          }
          .carousel-btn-left  { left: 4px; }
          .carousel-btn-right { right: 4px; }

          .carousel-root {
            height: 280px;
          }

          .carousel-img {
            max-height: 240px;
          }
        }

        @media (max-width: 768px) {
          .project-card-image-wrapper {
            flex: none;
            width: 100%;
            min-height: 300px;
            height: 300px;
            overflow: hidden;
          }

          .project-card-image-gradient {
            height: 300px;
            min-height: 300px;
            padding: 16px 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--bg-secondary);
          }

          .project-card-image-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: auto;
            min-height: 0;
          }

          .project-card-image,
          .project-card:hover .project-card-image {
            width: auto !important;
            height: auto !important;
            max-width: 100%;
            max-height: 300px;
            object-fit: contain;
            object-position: center center;
            filter: none;
          }
        }

        .project-card-wrapper {
          position: relative;
        }

        .works-tablist {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .works-tablist::-webkit-scrollbar {
          display: none;
        }

        @media (max-width: 640px) {
          .works-tablist button {
            padding: 7px 12px !important;
            white-space: nowrap;
          }
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
