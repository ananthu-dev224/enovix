'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Briefcase,
} from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'contact.enovix@gmail.com',
    href: 'mailto:contact.enovix@gmail.com',
    color: '#2889e8',
  },
  {
    icon: Phone,
    label: 'Web Enquiry',
    value: '+91 95269 52719',
    href: 'tel:+919526952719',
    color: '#00d4ff',
  },
   {
    icon: Phone,
    label: 'Mobile Application Enquiry',
    value: '+91 79940 78089',
    href: 'tel:+917994078089',
    color: '#00d4ff',
  },
  {
    icon: MapPin,
    label: 'Based In',
    value: 'Kerala, India',
    href: '',
    color: '#a855f7',
  },
];

const serviceOptions = [
  'Web Development',
  'Android Development',
  'iOS Development',
  'Full-Stack Solution',
  'Other',
];
const budgetOptions = ['< ₹50K', '₹50K – ₹1.5L', '₹1.5L – ₹5L', '₹5L+', "Let's Discuss"];

type FormData = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

function hexToRgb(hex: string) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `${parseInt(r[1], 16)}, ${parseInt(r[2], 16)}, ${parseInt(r[3], 16)}`
    : '255,255,255';
}

export default function Contact() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });

  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // ── Calls /api/contact → Nodemailer → Gmail ──────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
        return;
      }

      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setForm({ name: '', email: '', company: '', service: '', budget: '', message: '' });
      }, 6000);
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    padding: '14px 18px',
    borderRadius: '8px',
    background: focusedField === field
      ? 'rgba(40, 137, 232, 0.06)'
      : 'rgba(255, 255, 255, 0.03)',
    border: `1px solid ${focusedField === field
      ? 'rgba(0, 212, 255, 0.4)'
      : 'rgba(42, 137, 232, 0.15)'}`,
    color: 'var(--text-primary)',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.92rem',
    fontWeight: '300',
    outline: 'none',
    transition: 'all 0.25s ease',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(0,212,255,0.06)' : 'none',
  });

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.78rem',
    fontWeight: '500',
    color: 'var(--text-muted)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '8px',
  };

  return (
    <section id="contact" style={{ padding: '120px 0 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(42,137,232,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(42,137,232,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px', pointerEvents: 'none',
      }} />
      <div className="orb orb-blue" style={{ width: '600px', height: '600px', bottom: '0', right: '-200px', opacity: 0.35 }} />
      <div className="orb orb-cyan" style={{ width: '400px', height: '400px', top: '100px', left: '-100px', opacity: 0.2 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '20px' }}>
            Let&apos;s Connect
          </div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: '800', lineHeight: 1.1,
            letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '16px',
          }}>
            Start Your{' '}
            <span style={{
              background: 'linear-gradient(135deg, #2889e8, #00d4ff)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Project</span>{' '}With Us
          </h2>
          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', fontWeight: '300',
            color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7,
          }}>
            Tell us about your idea and we&apos;ll get back to you within 24 hours with a plan.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '32px', alignItems: 'start' }}
          className="contact-grid">

          {/* ── Left info column ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.a key={item.label} href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ x: 4 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '20px 22px', borderRadius: '12px',
                    background: 'rgba(4,20,40,0.6)', border: '1px solid rgba(42,137,232,0.12)',
                    textDecoration: 'none', backdropFilter: 'blur(8px)', transition: 'border-color 0.25s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(42,137,232,0.12)')}
                >
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '10px', flexShrink: 0,
                    background: `rgba(${hexToRgb(item.color)}, 0.1)`,
                    border: `1px solid rgba(${hexToRgb(item.color)}, 0.2)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} color={item.color} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', fontWeight: '500',
                      color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '3px',
                    }}>{item.label}</div>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.92rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                      {item.value}
                    </div>
                  </div>
                </motion.a>
              );
            })}

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.4 }}
              style={{
                padding: '20px 22px', borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(0,212,255,0.06), rgba(40,137,232,0.04))',
                border: '1px solid rgba(0,212,255,0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%', background: '#3ddc84',
                  boxShadow: '0 0 8px rgba(61,220,132,0.6)', animation: 'pulse-dot 2s infinite',
                }} />
                <span style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', fontWeight: '500',
                  color: '#3ddc84', letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>Available for Projects</span>
              </div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.84rem', fontWeight: '300', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                We typically respond within{' '}
                <strong style={{ color: 'var(--text-primary)', fontWeight: '500' }}>24 hours</strong>.
                Free consultation with every enquiry.
              </p>
            </motion.div>

            {/* Next steps */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.5 }}
              style={{ padding: '22px', borderRadius: '12px', background: 'rgba(4,20,40,0.5)', border: '1px solid rgba(42,137,232,0.1)' }}
            >
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '14px' }}>
                What happens next?
              </div>
              {[
                { icon: MessageSquare, text: 'We review your message & requirements' },
                { icon: Phone, text: 'Schedule a free discovery call' },
                { icon: Briefcase, text: 'Receive a detailed proposal & timeline' },
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: i < 2 ? '12px' : 0 }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '7px', flexShrink: 0, marginTop: '1px',
                      background: 'rgba(40,137,232,0.1)', border: '1px solid rgba(40,137,232,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={13} color="var(--blue-bright)" strokeWidth={1.5} />
                    </div>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.83rem', fontWeight: '300', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {step.text}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* ── Right form column ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            style={{
              padding: '44px', borderRadius: '20px',
              background: 'rgba(4,20,40,0.75)', border: '1px solid rgba(42,137,232,0.15)',
              backdropFilter: 'blur(16px)', position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)',
            }} />

            {/* Success */}
            {status === 'success' && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '40px 0' }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  style={{ display: 'inline-flex', marginBottom: '24px' }}>
                  <CheckCircle2 size={64} color="#3ddc84" strokeWidth={1.2} />
                </motion.div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.6rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' }}>
                  Message Sent!
                </h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', fontWeight: '300', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  Check your inbox — we&apos;ve sent you a confirmation. We&apos;ll be in touch within 24 hours.
                </p>
              </motion.div>
            )}

            {/* Error banner */}
            {status === 'error' && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '12px',
                  padding: '14px 18px', borderRadius: '10px', marginBottom: '24px',
                  background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
                }}>
                <AlertCircle size={18} color="#f87171" style={{ flexShrink: 0, marginTop: '1px' }} />
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: '#f87171', margin: 0, lineHeight: 1.5 }}>
                  {errorMsg}
                </p>
              </motion.div>
            )}

            {/* Form — hidden once success */}
            {status !== 'success' && (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="form-row">
                  <div>
                    <label style={labelStyle}>Your Name *</label>
                    <input type="text" required value={form.name}
                      onChange={e => update('name', e.target.value)}
                      onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                      placeholder="John Doe" style={inputStyle('name')} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input type="email" required value={form.email}
                      onChange={e => update('email', e.target.value)}
                      onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                      placeholder="you@example.com" style={inputStyle('email')} />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Company / Project Name</label>
                  <input type="text" value={form.company}
                    onChange={e => update('company', e.target.value)}
                    onFocus={() => setFocusedField('company')} onBlur={() => setFocusedField(null)}
                    placeholder="Your company or project" style={inputStyle('company')} />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Service Needed</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {serviceOptions.map(s => (
                      <button key={s} type="button" onClick={() => update('service', s)} style={{
                        padding: '8px 16px', borderRadius: '100px', cursor: 'pointer',
                        fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', fontWeight: '500', transition: 'all 0.2s ease',
                        border: form.service === s ? '1px solid rgba(0,212,255,0.5)' : '1px solid rgba(42,137,232,0.15)',
                        background: form.service === s ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.02)',
                        color: form.service === s ? 'var(--cyan-pop)' : 'var(--text-muted)',
                      }}>{s}</button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Budget Range</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {budgetOptions.map(b => (
                      <button key={b} type="button" onClick={() => update('budget', b)} style={{
                        padding: '8px 16px', borderRadius: '100px', cursor: 'pointer',
                        fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', fontWeight: '500', transition: 'all 0.2s ease',
                        border: form.budget === b ? '1px solid rgba(40,137,232,0.5)' : '1px solid rgba(42,137,232,0.12)',
                        background: form.budget === b ? 'rgba(40,137,232,0.1)' : 'rgba(255,255,255,0.02)',
                        color: form.budget === b ? 'var(--blue-bright)' : 'var(--text-muted)',
                      }}>{b}</button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '28px' }}>
                  <label style={labelStyle}>Tell Us About Your Project *</label>
                  <textarea required rows={4} value={form.message}
                    onChange={e => update('message', e.target.value)}
                    onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                    placeholder="Describe your idea, goals, and any specific requirements..."
                    style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '110px' }} />
                </div>

                <motion.button type="submit" disabled={status === 'sending'}
                  whileHover={status !== 'sending' ? { scale: 1.02, y: -2 } : {}}
                  whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                  style={{
                    width: '100%', padding: '16px 32px', borderRadius: '8px', border: 'none',
                    background: status === 'sending' ? 'rgba(40,137,232,0.4)' : 'linear-gradient(135deg, #1a6fc4, #2889e8)',
                    color: 'white', fontFamily: 'Syne, sans-serif', fontWeight: '700',
                    fontSize: '0.9rem', letterSpacing: '0.06em', textTransform: 'uppercase',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    boxShadow: '0 8px 32px rgba(0,212,255,0.2)', transition: 'all 0.3s ease',
                  }}>
                  {status === 'sending' ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white' }} />
                      Sending...
                    </>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </motion.button>

                <p style={{ textAlign: 'center', marginTop: '14px', fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  No spam. We respect your privacy.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%,100% { opacity:1; box-shadow:0 0 8px rgba(61,220,132,0.6); }
          50%      { opacity:0.6; box-shadow:0 0 14px rgba(61,220,132,0.9); }
        }
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 560px) { .form-row { grid-template-columns: 1fr !important; } }
        ::placeholder { color: rgba(138,175,212,0.35); }
      `}</style>
    </section>
  );
}