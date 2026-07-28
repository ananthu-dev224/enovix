'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Heart } from 'lucide-react';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import Image from 'next/image';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Works', href: '#works' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  { label: 'Web Development', href: '#services' },
  { label: 'Android Development', href: '#services' },
  { label: 'iOS Development', href: '#services' },
  { label: 'Full-Stack Solutions', href: '#services' },
];

const socials = [
  { icon: FaFacebook, href: 'https://facebook.com/', label: 'Facebook' },
  { icon: FaSquareXTwitter, href: 'https://twitter.com/', label: 'X' },
  { icon: FaLinkedin, href: 'https://linkedin.com/', label: 'LinkedIn' },
  { icon: FaInstagram, href: 'https://instagram.com/enovix.tech', label: 'Instagram' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{ position: 'relative', marginTop: 100, overflow: 'hidden' }}>
      <div
        style={{
          height: 1,
          background:
            'linear-gradient(90deg, transparent, var(--border), var(--blue-accent), var(--border), transparent)',
        }}
      />

      <div
        style={{
          background: 'var(--bg-secondary)',
          padding: '72px 0 0',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }} className="footer-inner">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            style={{
              padding: '48px 52px',
              borderRadius: 20,
              background: '#ffffff',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 32,
              marginBottom: 64,
            }}
            className="footer-cta"
          >
            <div>
              <div
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--blue-accent)',
                  marginBottom: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 2,
                    background: 'var(--blue-accent)',
                    display: 'inline-block',
                    borderRadius: 2,
                  }}
                />
                Ready to Build?
              </div>
              <h3
                className="section-title"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.2,
                  maxWidth: 440,
                }}
              >
                Let&apos;s turn your idea into a{' '}
                <span style={{ color: 'var(--blue-accent)' }}>digital reality.</span>
              </h3>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#contact" className="btn-primary">
                Start a Project
                <ArrowUpRight size={16} />
              </a>
              <a
                href="mailto:contact.enovix@gmail.com"
                className="btn-outline"
              >
                Email Us
              </a>
            </div>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.8fr 1fr 1fr 1fr',
              gap: 40,
              paddingBottom: 48,
              borderBottom: '1px solid var(--border)',
            }}
            className="footer-grid"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <div style={{ marginBottom: 18 }}>
                <Image
                  src="/enovix_logo.png"
                  alt="Enovix"
                  width={140}
                  height={40}
                />
              </div>

              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  maxWidth: 280,
                  marginBottom: 24,
                }}
              >
                A freelance tech team building world-class web and mobile
                products. Turning ideas into polished digital experiences.
              </p>

              <div style={{ display: 'flex', gap: 10 }}>
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      title={s.label}
                      aria-label={s.label}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        background: '#ffffff',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)',
                        transition: 'all 0.2s ease',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.borderColor = 'var(--blue-accent)';
                        el.style.color = 'var(--blue-accent)';
                        el.style.background = 'var(--blue-soft)';
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.borderColor = 'var(--border)';
                        el.style.color = 'var(--text-secondary)';
                        el.style.background = '#ffffff';
                      }}
                    >
                      <Icon size={15} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            <FooterCol title="Navigate" links={navLinks} delay={0.08} />
            <FooterCol title="Services" links={services} delay={0.15} />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.22 }}
            >
              <h4
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: 18,
                }}
              >
                Contact
              </h4>
              {[
                {
                  label: 'contact.enovix@gmail.com',
                  href: 'mailto:contact.enovix@gmail.com',
                },
                { label: '+91 95269 52719', href: 'tel:+919526952719' },
                { label: '+91 79940 78089', href: 'tel:+917994078089' },
                { label: '+91 99471 17079', href: 'tel:+919947117079' },
                { label: 'Kerala, India', href: '' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href || undefined}
                  style={{
                    display: 'block',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    marginBottom: 10,
                    transition: 'color 0.2s ease',
                    cursor: item.href ? 'pointer' : 'default',
                  }}
                  onMouseEnter={(e) => {
                    if (item.href)
                      e.currentTarget.style.color = 'var(--blue-accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          </div>

          <div
            style={{
              padding: '24px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                flexWrap: 'wrap',
              }}
            >
              © {new Date().getFullYear()} Enovix. Crafted with
              <Heart
                size={12}
                fill="#ec4899"
                color="#ec4899"
                style={{ display: 'inline' }}
              />
              in Kerala, India.
            </p>

            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Back to top"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '8px 14px',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow-sm)',
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
              ↑ Back to Top
            </motion.button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-cta { padding: 28px 22px !important; }
          .footer-inner { padding: 0 20px !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  delay,
}: {
  title: string;
  links: { label: string; href: string }[];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
    >
      <h4
        style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '0.8rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 18,
        }}
      >
        {title}
      </h4>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          style={{
            display: 'block',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.88rem',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            marginBottom: 10,
            transition: 'color 0.2s ease, padding-left 0.2s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.color = 'var(--blue-accent)';
            el.style.paddingLeft = '4px';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.color = 'var(--text-secondary)';
            el.style.paddingLeft = '0px';
          }}
        >
          {link.label}
        </a>
      ))}
    </motion.div>
  );
}
