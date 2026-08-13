'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Works', href: '#works' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveLink('#' + sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;
    const navOffset = 56;
    const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    window.history.pushState(null, '', href);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setActiveLink(href);

    if (menuOpen) {
      setMenuOpen(false);
      document.body.style.overflow = '';
      // Wait for menu close + overflow unlock before scrolling
      window.setTimeout(() => scrollToSection(href), 120);
      return;
    }

    scrollToSection(href);
  };

  const solid = scrolled || menuOpen;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          background: solid ? '#ffffff' : 'transparent',
          backdropFilter: solid ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: solid ? 'blur(12px)' : 'none',
          boxShadow: scrolled
            ? '0 4px 24px rgba(17, 24, 39, 0.06)'
            : 'none',
          borderBottom: solid ? '1px solid #e5e7eb' : '1px solid transparent',
          transition:
            'box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        <div
          className="nav-inner"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '8px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'padding 0.3s ease',
            minHeight: 56,
          }}
        >
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="Enovix home"
            style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
          >
            <motion.div whileHover={{ scale: 1.02 }}>
              <Image
                src="/enovix_logo.png"
                alt="Enovix"
                width={112}
                height={32}
                priority
                style={{ width: 112, height: 'auto' }}
              />
            </motion.div>
          </a>

          <div
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`nav-underline${activeLink === link.href ? ' active' : ''}`}
                style={{
                  textDecoration: 'none',
                  padding: '8px 12px',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: activeLink === link.href ? 600 : 500,
                  color:
                    activeLink === link.href
                      ? 'var(--blue-accent)'
                      : 'var(--text-secondary)',
                  transition: 'color 0.2s ease',
                }}
              >
                {link.label}
              </a>
            ))}

            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary"
              style={{
                marginLeft: '8px',
                padding: '8px 18px',
                fontSize: '0.75rem',
              }}
            >
              Get In Touch
            </motion.a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{
              display: 'none',
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              padding: '6px',
              borderColor: solid ? 'var(--border)' : 'rgba(17, 24, 39, 0.12)',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu lives inside nav so it never sits under the bar */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mobile-menu-panel"
              style={{
                overflow: 'hidden',
                background: '#ffffff',
                borderTop: '1px solid var(--border)',
              }}
            >
              <div style={{ padding: '8px 0 24px', maxHeight: 'calc(100vh - 56px)', overflowY: 'auto' }}>
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      display: 'block',
                      padding: '14px 20px',
                      textDecoration: 'none',
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 600,
                      fontSize: '1rem',
                      lineHeight: 1.4,
                      color:
                        activeLink === link.href
                          ? 'var(--blue-accent)'
                          : 'var(--text-primary)',
                      borderLeft:
                        activeLink === link.href
                          ? '3px solid var(--blue-accent)'
                          : '3px solid transparent',
                      background:
                        activeLink === link.href
                          ? 'var(--blue-soft)'
                          : 'transparent',
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div style={{ padding: '16px 20px 0' }}>
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, '#contact')}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Get In Touch
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .nav-inner {
            padding-left: 16px !important;
            padding-right: 16px !important;
            padding-top: 6px !important;
            padding-bottom: 6px !important;
            min-height: 52px !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu-panel { display: none !important; }
        }
      `}</style>
    </>
  );
}
