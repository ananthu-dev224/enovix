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
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Update active link based on scroll
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveLink('#' + sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setActiveLink(href);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          padding: scrolled ? '12px 0' : '22px 0',
          background: scrolled
            ? 'rgba(1, 11, 24, 0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(42, 137, 232, 0.12)'
            : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <a href="#home" onClick={() => handleNavClick('#home')}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
            >
              <div style={{
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontFamily: 'Syne, sans-serif',
                fontWeight: '800',
                paddingLeft: '50px'
              }}>
                  <Image
                src="/enovix_logo.png"
                alt="Enovix"
                width={140}
                height={0}
                style={{ height: "auto" }}
              />
              </div>
            </motion.div>
          </a>

          {/* Desktop nav links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }} className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  letterSpacing: '0.02em',
                  color: activeLink === link.href
                    ? 'var(--cyan-pop)'
                    : 'var(--text-secondary)',
                  position: 'relative',
                  transition: 'color 0.2s ease',
                }}
                className="nav-link"
              >
                {link.label}
                {activeLink === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    style={{
                      position: 'absolute',
                      bottom: '4px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'var(--cyan-pop)',
                    }}
                  />
                )}
              </a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => handleNavClick('#contact')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                textDecoration: 'none',
                marginLeft: '8px',
                padding: '10px 24px',
                borderRadius: '4px',
                background: 'linear-gradient(135deg, #1a6fc4, #2889e8)',
                color: 'white',
                fontFamily: 'Syne, sans-serif',
                fontWeight: '600',
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                boxShadow: '0 4px 20px rgba(0, 212, 255, 0.2)',
                transition: 'all 0.2s ease',
              }}
            >
              Get In Touch
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              padding: '4px',
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '68px',
              left: 0,
              right: 0,
              zIndex: 850,
              background: 'rgba(1, 11, 24, 0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(42, 137, 232, 0.15)',
              padding: '16px 0 24px',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  display: 'block',
                  padding: '14px 32px',
                  textDecoration: 'none',
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: '600',
                  fontSize: '1rem',
                  color: activeLink === link.href ? 'var(--cyan-pop)' : 'var(--text-primary)',
                  borderLeft: activeLink === link.href ? '2px solid var(--cyan-pop)' : '2px solid transparent',
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        .nav-link:hover { color: var(--text-primary) !important; }
      `}</style>
    </>
  );
}