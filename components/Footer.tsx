'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Heart } from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
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
  { icon: FaTwitter, href: 'https://twitter.com/', label: 'Twitter' },
  { icon: FaLinkedin, href: 'https://linkedin.com/', label: 'LinkedIn' },
  { icon: FaInstagram, href: 'https://instagram.com/', label: 'Instagram' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      style={{ position: "relative", marginTop: "100px", overflow: "hidden" }}
    >
      {/* Top wave / gradient fade */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), rgba(40,137,232,0.4), rgba(0,212,255,0.3), transparent)",
          marginBottom: "0",
        }}
      />

      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(2,13,31,0.95) 0%, #010b18 100%)",
          padding: "72px 0 0",
          position: "relative",
        }}
      >
        {/* Orbs */}
        <div
          className="orb orb-blue"
          style={{
            width: "400px",
            height: "400px",
            top: "-100px",
            left: "-150px",
            opacity: 0.2,
          }}
        />
        <div
          className="orb orb-cyan"
          style={{
            width: "300px",
            height: "300px",
            bottom: "0",
            right: "-80px",
            opacity: 0.15,
          }}
        />

        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}
        >
          {/* CTA banner */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              padding: "52px 56px",
              borderRadius: "20px",
              background:
                "linear-gradient(135deg, rgba(7,30,61,0.9) 0%, rgba(11,42,87,0.8) 100%)",
              border: "1px solid rgba(40, 137, 232, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "32px",
              marginBottom: "72px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative corner accent */}
            <div
              style={{
                position: "absolute",
                top: "-30px",
                right: "-30px",
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)",
              }}
            />

            <div>
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: "500",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--cyan-pop)",
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    width: "20px",
                    height: "1px",
                    background: "var(--cyan-pop)",
                    display: "inline-block",
                  }}
                />
                Ready to Build?
              </div>
              <h3
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                  fontWeight: "800",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                  maxWidth: "440px",
                }}
              >
                Let&apos;s turn your idea into a{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #2889e8, #00d4ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  digital reality.
                </span>
              </h3>
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  textDecoration: "none",
                  padding: "14px 32px",
                  borderRadius: "6px",
                  background: "linear-gradient(135deg, #1a6fc4, #2889e8)",
                  color: "white",
                  fontFamily: "Syne, sans-serif",
                  fontWeight: "700",
                  fontSize: "0.85rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 8px 30px rgba(0,212,255,0.25)",
                }}
              >
                Start a Project
                <ArrowUpRight size={16} />
              </motion.a>
              <motion.a
                href="mailto:contact.enovix@gmail.com"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  textDecoration: "none",
                  padding: "14px 28px",
                  borderRadius: "6px",
                  border: "1px solid rgba(42,137,232,0.3)",
                  background: "transparent",
                  color: "var(--blue-bright)",
                  fontFamily: "Syne, sans-serif",
                  fontWeight: "600",
                  fontSize: "0.85rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Email Us
              </motion.a>
            </div>
          </motion.div>

          {/* Footer columns */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.8fr 1fr 1fr 1fr",
              gap: "40px",
              paddingBottom: "52px",
              borderBottom: "1px solid rgba(42,137,232,0.1)",
            }}
            className="footer-grid"
          >
            {/* Brand column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Logo — same placeholder as Navbar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    width: "98px",
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    fontFamily: "Syne, sans-serif",
                    fontWeight: "800",
                  }}
                >
                  <Image
                    src="/enovix_logo.png"
                    alt="Enovix"
                    width={140}
                    height={40}
                  />
                </div>
              </div>

              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.88rem",
                  fontWeight: "300",
                  lineHeight: 1.75,
                  color: "var(--text-secondary)",
                  maxWidth: "280px",
                  marginBottom: "24px",
                }}
              >
                A freelance tech team building world-class web and mobile
                products. Turning ideas into polished digital experiences.
              </p>

              {/* Social icons */}
              <div style={{ display: "flex", gap: "10px" }}>
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.93 }}
                      title={s.label}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(42,137,232,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--text-muted)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (
                          e.currentTarget as HTMLAnchorElement
                        ).style.borderColor = "rgba(0,212,255,0.35)";
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          "var(--cyan-pop)";
                        (
                          e.currentTarget as HTMLAnchorElement
                        ).style.background = "rgba(0,212,255,0.06)";
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLAnchorElement
                        ).style.borderColor = "rgba(42,137,232,0.15)";
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          "var(--text-muted)";
                        (
                          e.currentTarget as HTMLAnchorElement
                        ).style.background = "rgba(255,255,255,0.04)";
                      }}
                    >
                      <Icon size={15} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Navigation column */}
            <FooterCol title="Navigate" links={navLinks} delay={0.1} />

            {/* Services column */}
            <FooterCol title="Services" links={services} delay={0.2} />

            {/* Contact column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: "700",
                  color: "var(--text-primary)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                Contact
              </h4>
              {[
                { label: "contact.enovix@gmail.com", href: "mailto:contact.enovix@gmail.com" },
                { label: "+91 95269 52719", href: "tel:+919526952719" },
                { label: "+91 79940 78089", href: "tel:+917994078089" },
                { label: "Kerala, India", href: "" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    display: "block",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.86rem",
                    fontWeight: "300",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    marginBottom: "10px",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--cyan-pop)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-secondary)")
                  }
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              padding: "24px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.78rem",
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                flexWrap: "wrap",
              }}
            >
              © {new Date().getFullYear()} Enovix. Crafted with
              <Heart
                size={12}
                fill="#ec4899"
                color="#ec4899"
                style={{ display: "inline" }}
              />
              in Kerala, India.
            </p>

            {/* Back to top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "none",
                border: "1px solid rgba(42,137,232,0.2)",
                borderRadius: "6px",
                padding: "7px 14px",
                cursor: "pointer",
                color: "var(--text-muted)",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.75rem",
                fontWeight: "500",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(0,212,255,0.35)";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "var(--cyan-pop)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(42,137,232,0.2)";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "var(--text-muted)";
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
          footer div[style*="padding: '52px 56px'"] { padding: 28px 24px !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterCol({ title, links, delay }: { title: string; links: { label: string; href: string }[]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <h4 style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: '0.8rem',
        fontWeight: '700',
        color: 'var(--text-primary)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: '20px',
      }}>
        {title}
      </h4>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          style={{
            display: 'block',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.86rem',
            fontWeight: '300',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            marginBottom: '10px',
            transition: 'color 0.2s ease, padding-left 0.2s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-primary)';
            (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '6px';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)';
            (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '0px';
          }}
        >
          {link.label}
        </a>
      ))}
    </motion.div>
  );
}