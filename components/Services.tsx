'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Globe,
  Smartphone,
  Apple,
  Code2,
  Zap,
  Shield,
  Layers,
  BrainCircuit,
  Palette,
  ArrowUpRight,
  FileDown,
} from 'lucide-react';

const services = [
  {
    id: 'application-development',
    icon: Code2,
    accentIcon: Zap,
    label: '01',
    title: 'Application Development',
    tagline: 'Custom. Secure. Built to scale.',
    description:
      'We design and build custom applications that streamline operations, solve complex business challenges, and scale reliably as your organization grows.',
    features: [
      'Custom Business Applications',
      'SaaS Platforms',
      'Enterprise Solutions',
      'API Development & Integration',
      'Application Modernization',
    ],
  },
  {
    id: 'web-development-management',
    icon: Globe,
    accentIcon: Shield,
    label: '02',
    title: 'Web Development & Management',
    tagline: 'Fast. Reliable. Always evolving.',
    description:
      'We create high-performing websites and web applications, then keep them secure, optimized, and up to date with dependable ongoing management.',
    features: [
      'Business & Corporate Websites',
      'E-commerce Development',
      'Custom Web Applications',
      'Performance & SEO',
      'Maintenance & Support',
    ],
  },
  {
    id: 'mobile-app-development',
    icon: Smartphone,
    accentIcon: Apple,
    label: '03',
    title: 'Mobile App Development',
    tagline: 'Intuitive. Engaging. Cross-platform.',
    description:
      'We build intuitive, high-performance mobile apps for iOS and Android, delivering seamless experiences from initial concept through launch and support.',
    features: [
      'iOS & Android Apps',
      'Cross-platform Development',
      'UI/UX Implementation',
      'App Store Deployment',
      'Maintenance & Updates',
    ],
  },
  {
    id: 'product-engineering',
    icon: Layers,
    accentIcon: Code2,
    label: '04',
    title: 'Product Engineering',
    tagline: 'From idea to market-ready product.',
    description:
      'We turn ideas into reliable digital products through strategic planning, rapid prototyping, scalable engineering, and continuous improvement.',
    features: [
      'Product Strategy & Discovery',
      'MVP Development',
      'Architecture & Prototyping',
      'Quality Engineering',
      'Product Scaling',
    ],
  },
  {
    id: 'ai-integration',
    icon: BrainCircuit,
    accentIcon: Zap,
    label: '05',
    title: 'AI Integration',
    tagline: 'Smarter workflows. Better decisions.',
    description:
      'We integrate practical AI capabilities into your products and business processes to automate repetitive work, improve customer experiences, and unlock valuable insights.',
    features: [
      'AI Assistants & Chatbots',
      'Workflow Automation',
      'Generative AI Integration',
      'Data Analysis & Insights',
      'Custom AI Solutions',
    ],
  },
  {
    id: 'graphic-ui-design',
    icon: Palette,
    accentIcon: Layers,
    label: '06',
    title: 'Graphic & UI Design',
    tagline: 'Distinctive. Intuitive. User-focused.',
    description:
      'We create compelling visual identities and intuitive digital interfaces that communicate your brand clearly and make every user interaction feel effortless.',
    features: [
      'UI/UX Design',
      'Brand Identity',
      'Web & Mobile Interfaces',
      'Marketing Creatives',
      'Prototyping & Design Systems',
    ],
  },
];

function useReveal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return { ref, inView };
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const { ref, inView } = useReveal();
  const Icon = service.icon;
  const AccentIcon = service.accentIcon;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      style={{
        position: 'relative',
        borderRadius: 16,
        background: '#ffffff',
        border: '1px solid var(--border)',
        padding: '36px 32px',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
        height: '100%',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-hover)';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--blue-soft-border)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 24,
          right: 28,
          fontFamily: 'Syne, sans-serif',
          fontSize: '0.75rem',
          fontWeight: 800,
          color: 'var(--blue-accent)',
          opacity: 0.35,
          letterSpacing: '0.1em',
        }}
      >
        {service.label}
      </div>

      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 56,
          height: 56,
          borderRadius: 14,
          background: 'var(--blue-soft)',
          border: '1px solid var(--blue-soft-border)',
          marginBottom: 24,
          position: 'relative',
        }}
      >
        <Icon size={24} color="var(--blue-accent)" strokeWidth={1.5} />
        <div
          style={{
            position: 'absolute',
            bottom: -5,
            right: -5,
            width: 20,
            height: 20,
            borderRadius: 6,
            background: '#ffffff',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <AccentIcon size={10} color="var(--blue-accent)" />
        </div>
      </div>

      <div
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--blue-accent)',
          marginBottom: 10,
        }}
      >
        {service.tagline}
      </div>

      <h3
        style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '1.45rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: 14,
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
        }}
      >
        {service.title}
      </h3>

      <p
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.92rem',
          fontWeight: 400,
          lineHeight: 1.7,
          color: 'var(--text-secondary)',
          marginBottom: 24,
        }}
      >
        {service.description}
      </p>

      <div
        style={{
          width: '100%',
          height: 1,
          background: 'var(--border)',
          marginBottom: 20,
        }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
        {service.features.map((feat) => (
          <span
            key={feat}
            style={{
              padding: '5px 12px',
              borderRadius: 100,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.72rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
            }}
          >
            {feat}
          </span>
        ))}
      </div>

      <motion.a
        href="#contact"
        whileHover={{ gap: '12px' }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'Syne, sans-serif',
          fontSize: '0.82rem',
          fontWeight: 600,
          color: 'var(--blue-accent)',
          textDecoration: 'none',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        Get Started
        <ArrowUpRight size={15} />
      </motion.a>
    </motion.article>
  );
}

export default function Services() {
  const { ref: headingRef, inView: headingInView } = useReveal();
  const BROCHURE_PATH = '/enovixtech-brochure.pdf';

  return (
    <section
      id="services"
      className="section-alt"
      style={{ padding: '110px 0', position: 'relative' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }} className="services-inner">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          style={{ marginBottom: 64 }}
        >
          <div className="section-label" style={{ marginBottom: 18 }}>
            What We Do
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: 24,
            }}
          >
            <h2
              className="section-title"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                lineHeight: 1.12,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                maxWidth: 480,
              }}
            >
              Our{' '}
              <span style={{ color: 'var(--blue-accent)' }}>Core Services</span>
            </h2>
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.98rem',
                fontWeight: 400,
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                maxWidth: 360,
              }}
            >
              End-to-end digital product development — from idea to launch, built
              with quality and precision at every step.
            </p>
          </div>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            marginTop: 56,
            padding: '32px 40px',
            borderRadius: 16,
            background: '#ffffff',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
          }}
          className="services-cta"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'var(--blue-soft)',
                border: '1px solid var(--blue-soft-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Layers size={22} color="var(--blue-accent)" strokeWidth={1.5} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: 4,
                }}
              >
                Need a full-stack solution?
              </div>
              <div
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                }}
              >
                We unite design, AI, application, web, mobile, and product
                engineering in one expert team.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <a
              href={BROCHURE_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ padding: '11px 20px', fontSize: '0.78rem' }}
            >
              <FileDown size={15} strokeWidth={1.8} />
              View Brochure
            </a>
            <a
              href="#contact"
              className="btn-primary"
              style={{ padding: '11px 24px', fontSize: '0.78rem' }}
            >
              Let&apos;s Talk
            </a>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .services-inner { padding: 0 20px !important; }
          .services-cta { padding: 24px 20px !important; }
        }
      `}</style>
    </section>
  );
}
