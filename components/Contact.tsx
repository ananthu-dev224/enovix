'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Briefcase,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact.enovix@gmail.com',
    href: 'mailto:contact.enovix@gmail.com',
  },
  { icon: Phone, label: 'Web', value: '+91 95269 52719', href: 'tel:+919526952719' },
  {
    icon: Phone,
    label: 'Mobile / App',
    value: '+91 79940 78089',
    href: 'tel:+917994078089',
  },
  { icon: MapPin, label: 'Location', value: 'Kerala, India', href: '' },
];

const serviceOptions = [
  'Web Development',
  'Android Development',
  'iOS Development',
  'Full-Stack Solution',
  'Other',
];
const budgetOptions = [
  '< ₹50K',
  '₹50K – ₹1.5L',
  '₹1.5L – ₹5L',
  '₹5L+',
  "Let's Discuss",
];

type StepKey = 'name' | 'email' | 'company' | 'service' | 'budget' | 'message';

interface Step {
  key: StepKey;
  question: string;
  type: 'text' | 'email' | 'chips' | 'textarea';
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

const STEPS: Step[] = [
  {
    key: 'name',
    question: "Hey! What's your name?",
    type: 'text',
    required: true,
    placeholder: 'Type your name...',
  },
  {
    key: 'email',
    question: "Great, {name}. What's your email address?",
    type: 'email',
    required: true,
    placeholder: 'your@email.com',
  },
  {
    key: 'company',
    question: "What's your company or project name?",
    type: 'text',
    placeholder: 'Optional — press Enter to skip',
  },
  {
    key: 'service',
    question: 'What kind of service are you looking for?',
    type: 'chips',
    options: serviceOptions,
  },
  {
    key: 'budget',
    question: "Awesome. What's your rough budget?",
    type: 'chips',
    options: budgetOptions,
  },
  {
    key: 'message',
    question: 'Last one — describe your project in a few sentences.',
    type: 'textarea',
    required: true,
    placeholder:
      'Tell us about your goals, timeline, anything relevant...',
  },
];

type FormData = Record<StepKey, string>;
type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [revealed, setRevealed] = useState<StepKey[]>([]);
  const [started, setStarted] = useState(false);

  const current = STEPS[step];

  useEffect(() => {
    if (status === 'idle' && started) {
      setTimeout(() => (inputRef.current as HTMLElement | null)?.focus(), 150);
    }
  }, [step, status, started]);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [revealed, step, status]);

  const resolveQuestion = (q: string) =>
    q.replace('{name}', form.name.split(' ')[0] || 'you');

  const commit = (value: string) => {
    if (current.required && !value.trim()) return;
    if (!started) setStarted(true);
    const next = { ...form, [current.key]: value };
    setForm(next);
    setDraft('');
    setRevealed((prev) => [...prev, current.key]);
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      submit(next);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && current.type !== 'textarea') {
      e.preventDefault();
      commit(draft);
    }
  };

  const submit = async (data: FormData) => {
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error || 'Something went wrong.');
        setStatus('error');
        return;
      }
      setStatus('success');
    } catch {
      setErrorMsg('Network error. Check your connection.');
      setStatus('error');
    }
  };

  const restart = () => {
    setStep(0);
    setStarted(false);
    setForm({
      name: '',
      email: '',
      company: '',
      service: '',
      budget: '',
      message: '',
    });
    setDraft('');
    setStatus('idle');
    setRevealed([]);
  };

  const progress = (step / STEPS.length) * 100;

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        padding: '110px 0 0',
        position: 'relative',
        background: '#ffffff',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }} className="contact-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 64 }}
        >
          <div
            className="section-label"
            style={{ justifyContent: 'center', marginBottom: 18 }}
          >
            Let&apos;s Connect
          </div>
          <h2
            className="section-title"
            style={{
              textAlign: 'center',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            Start Your{' '}
            <span style={{ color: 'var(--blue-accent)' }}>Project</span> With Us
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.55fr',
            gap: 48,
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 0 4px rgba(34, 197, 94, 0.15)',
                  animation: 'pulse-dot 2s infinite',
                }}
              />
              <span
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#16a34a',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Available for Projects
              </span>
            </div>

            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              const rowStyle: React.CSSProperties = {
                display: 'flex',
                gap: 16,
                alignItems: 'center',
                padding: '16px 0',
                borderBottom: '1px solid var(--border)',
                textDecoration: 'none',
              };
              const content = (
                <>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      flexShrink: 0,
                      background: 'var(--blue-soft)',
                      border: '1px solid var(--blue-soft-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={16} color="var(--blue-accent)" strokeWidth={1.5} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        color: 'var(--text-muted)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginBottom: 4,
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="ci-val"
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '0.92rem',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                        transition: 'color 0.2s',
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                  {item.href && (
                    <ArrowRight
                      size={14}
                      color="var(--text-muted)"
                      strokeWidth={1.5}
                    />
                  )}
                </>
              );
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.45 }}
                >
                  {item.href ? (
                    <a href={item.href} style={rowStyle} className="contact-info-row">
                      {content}
                    </a>
                  ) : (
                    <div style={rowStyle} className="contact-info-row">
                      {content}
                    </div>
                  )}
                </motion.div>
              );
            })}

            <div
              style={{
                marginTop: 32,
                padding: 24,
                borderRadius: 16,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
              }}
            >
              <div
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: 16,
                }}
              >
                What happens next?
              </div>
              {[
                {
                  icon: MessageSquare,
                  text: 'We review your message & requirements',
                },
                { icon: Phone, text: 'Schedule a free discovery call' },
                {
                  icon: Briefcase,
                  text: 'Receive a detailed proposal & timeline',
                },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: 12,
                      alignItems: 'flex-start',
                      marginBottom: i < 2 ? 14 : 0,
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        flexShrink: 0,
                        background: '#ffffff',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={12} color="var(--blue-accent)" strokeWidth={1.5} />
                    </div>
                    <span
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.55,
                      }}
                    >
                      {s.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            style={{ position: 'relative' }}
          >
            <div
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                background: '#ffffff',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 20px',
                  background: 'var(--bg-secondary)',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                  <div
                    key={c}
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: '50%',
                      background: c,
                      opacity: 0.85,
                    }}
                  />
                ))}
                <span
                  style={{
                    marginLeft: 10,
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.06em',
                  }}
                >
                  enovix — new-project
                </span>
              </div>

              {status === 'idle' && (
                <div style={{ height: 3, background: 'var(--border)' }}>
                  <motion.div
                    style={{
                      height: '100%',
                      background: 'var(--blue-accent)',
                    }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </div>
              )}

              <div
                ref={transcriptRef}
                style={{
                  padding: '28px 28px 0',
                  minHeight: 200,
                  maxHeight: 340,
                  overflowY: 'auto',
                  scrollbarWidth: 'none',
                }}
              >
                <AnimatePresence initial={false}>
                  {revealed.map((key) => {
                    const s = STEPS.find((x) => x.key === key)!;
                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ marginBottom: 22 }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            gap: 10,
                            alignItems: 'flex-start',
                            marginBottom: 8,
                          }}
                        >
                          <BotAvatar />
                          <div
                            style={{
                              background: 'var(--bg-secondary)',
                              border: '1px solid var(--border)',
                              borderRadius: '0 12px 12px 12px',
                              padding: '10px 14px',
                              maxWidth: '90%',
                            }}
                          >
                            <p
                              style={{
                                fontFamily: 'DM Sans, sans-serif',
                                fontSize: '0.86rem',
                                color: 'var(--text-secondary)',
                                margin: 0,
                                lineHeight: 1.6,
                              }}
                            >
                              {resolveQuestion(s.question)}
                            </p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <div
                            style={{
                              background: 'var(--blue-soft)',
                              border: '1px solid var(--blue-soft-border)',
                              borderRadius: '12px 0 12px 12px',
                              padding: '10px 16px',
                              maxWidth: '80%',
                            }}
                          >
                            <p
                              style={{
                                fontFamily: 'Syne, sans-serif',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                                margin: 0,
                              }}
                            >
                              {form[key] || (
                                <span
                                  style={{
                                    color: 'var(--text-muted)',
                                    fontStyle: 'italic',
                                    fontWeight: 400,
                                  }}
                                >
                                  skipped
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.div
                      key={current.key}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35 }}
                      style={{ marginBottom: 6 }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          gap: 10,
                          alignItems: 'flex-start',
                        }}
                      >
                        <BotAvatar />
                        <div
                          style={{
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border)',
                            borderRadius: '0 12px 12px 12px',
                            padding: '10px 14px',
                            maxWidth: '90%',
                          }}
                        >
                          <TypewriterText text={resolveQuestion(current.question)} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {status === 'sending' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      display: 'flex',
                      gap: 10,
                      alignItems: 'center',
                      padding: '12px 0',
                    }}
                  >
                    <BotAvatar />
                    <TypingIndicator />
                  </motion.div>
                )}

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ paddingBottom: 28 }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        gap: 10,
                        alignItems: 'flex-start',
                      }}
                    >
                      <BotAvatar />
                      <div
                        style={{
                          background: 'rgba(34, 197, 94, 0.08)',
                          border: '1px solid rgba(34, 197, 94, 0.25)',
                          borderRadius: '0 12px 12px 12px',
                          padding: '14px 18px',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            marginBottom: 8,
                          }}
                        >
                          <CheckCircle2 size={16} color="#16a34a" strokeWidth={1.5} />
                          <span
                            style={{
                              fontFamily: 'Syne, sans-serif',
                              fontSize: '0.9rem',
                              fontWeight: 700,
                              color: '#16a34a',
                            }}
                          >
                            Message received!
                          </span>
                        </div>
                        <p
                          style={{
                            fontFamily: 'DM Sans, sans-serif',
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)',
                            margin: 0,
                            lineHeight: 1.6,
                          }}
                        >
                          We&apos;ve sent a confirmation to your email. Expect to
                          hear from us within 24 hours.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ paddingBottom: 16 }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        gap: 10,
                        alignItems: 'flex-start',
                      }}
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: '50%',
                          background: 'rgba(239, 68, 68, 0.12)',
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <AlertCircle size={11} color="#ef4444" strokeWidth={2} />
                      </div>
                      <div
                        style={{
                          background: 'rgba(239, 68, 68, 0.06)',
                          border: '1px solid rgba(239, 68, 68, 0.2)',
                          borderRadius: '0 12px 12px 12px',
                          padding: '10px 14px',
                        }}
                      >
                        <p
                          style={{
                            fontFamily: 'DM Sans, sans-serif',
                            fontSize: '0.85rem',
                            color: '#dc2626',
                            margin: 0,
                            lineHeight: 1.5,
                          }}
                        >
                          {errorMsg}
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: 12,
                      }}
                    >
                      <button
                        type="button"
                        onClick={restart}
                        style={{
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: 'var(--blue-accent)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        ↩ Try again
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {status === 'idle' && (
                <div
                  style={{
                    padding: '16px 20px 20px',
                    borderTop: '1px solid var(--border)',
                  }}
                >
                  {current.type === 'chips' && (
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 8,
                        marginBottom: 12,
                      }}
                    >
                      {current.options!.map((opt) => (
                        <motion.button
                          key={opt}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => commit(opt)}
                          style={{
                            padding: '10px 16px',
                            borderRadius: 100,
                            cursor: 'pointer',
                            border: '1px solid var(--border)',
                            fontFamily: 'DM Sans, sans-serif',
                            fontSize: '0.82rem',
                            fontWeight: 500,
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-secondary)',
                            transition: 'all 0.18s ease',
                          }}
                          onMouseEnter={(e) => {
                            const b = e.currentTarget as HTMLButtonElement;
                            b.style.background = 'var(--blue-soft)';
                            b.style.color = 'var(--blue-accent)';
                            b.style.borderColor = 'var(--blue-soft-border)';
                          }}
                          onMouseLeave={(e) => {
                            const b = e.currentTarget as HTMLButtonElement;
                            b.style.background = 'var(--bg-secondary)';
                            b.style.color = 'var(--text-secondary)';
                            b.style.borderColor = 'var(--border)';
                          }}
                        >
                          {opt}
                        </motion.button>
                      ))}
                      {!current.required && (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => commit('')}
                          style={{
                            padding: '10px 16px',
                            borderRadius: 100,
                            cursor: 'pointer',
                            fontFamily: 'DM Sans, sans-serif',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            background: 'transparent',
                            border: '1px solid var(--border)',
                            color: 'var(--text-muted)',
                          }}
                        >
                          Skip
                        </motion.button>
                      )}
                    </div>
                  )}

                  {(current.type === 'text' || current.type === 'email') && (
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <div
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border)',
                          borderRadius: 12,
                          padding: '0 16px',
                        }}
                      >
                        <ChevronRight
                          size={14}
                          color="var(--blue-accent)"
                          strokeWidth={2}
                        />
                        <input
                          ref={inputRef as React.RefObject<HTMLInputElement>}
                          type={current.type}
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          onKeyDown={handleKey}
                          placeholder={current.placeholder}
                          aria-label={current.question}
                          style={{
                            flex: 1,
                            padding: '14px 0',
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            fontFamily: 'DM Sans, sans-serif',
                            fontSize: '0.9rem',
                            color: 'var(--text-primary)',
                          }}
                        />
                      </div>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => commit(draft)}
                        aria-label="Submit answer"
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          border: 'none',
                          cursor: 'pointer',
                          background: draft.trim()
                            ? 'var(--blue-accent)'
                            : 'var(--bg-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: draft.trim()
                            ? '0 4px 14px rgba(26, 111, 196, 0.3)'
                            : 'none',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <Send
                          size={16}
                          color={draft.trim() ? 'white' : 'var(--text-muted)'}
                          strokeWidth={1.8}
                        />
                      </motion.button>
                      {!current.required && (
                        <button
                          type="button"
                          onClick={() => commit('')}
                          style={{
                            fontFamily: 'DM Sans, sans-serif',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            color: 'var(--text-muted)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Skip
                        </button>
                      )}
                    </div>
                  )}

                  {current.type === 'textarea' && (
                    <div
                      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
                    >
                      <div
                        style={{
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border)',
                          borderRadius: 12,
                          padding: '12px 16px',
                        }}
                      >
                        <textarea
                          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                          rows={3}
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          placeholder={current.placeholder}
                          aria-label={current.question}
                          style={{
                            width: '100%',
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            resize: 'none',
                            fontFamily: 'DM Sans, sans-serif',
                            fontSize: '0.9rem',
                            color: 'var(--text-primary)',
                            lineHeight: 1.7,
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => commit(draft)}
                          disabled={!draft.trim()}
                          className="btn-primary"
                          style={{
                            opacity: draft.trim() ? 1 : 0.5,
                            cursor: draft.trim() ? 'pointer' : 'not-allowed',
                            padding: '12px 24px',
                            fontSize: '0.8rem',
                          }}
                        >
                          <Send size={14} strokeWidth={2} /> Send Message
                        </motion.button>
                      </div>
                    </div>
                  )}

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 12,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.06em',
                      }}
                    >
                      STEP {step + 1} / {STEPS.length}
                    </span>
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setStep((s) => s - 1);
                          setRevealed((prev) => prev.slice(0, -1));
                          setDraft('');
                        }}
                        style={{
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: '0.7rem',
                          color: 'var(--text-muted)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        ← back
                      </button>
                    )}
                  </div>
                </div>
              )}

              {status === 'success' && (
                <div
                  style={{
                    padding: '16px 20px 20px',
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <button
                    type="button"
                    onClick={restart}
                    className="btn-outline"
                    style={{ padding: '8px 20px', fontSize: '0.75rem' }}
                  >
                    ↩ Start over
                  </button>
                </div>
              )}
            </div>

            <p
              style={{
                textAlign: 'center',
                marginTop: 14,
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
              }}
            >
              NO SPAM · WE RESPECT YOUR PRIVACY
            </p>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.15); }
          50% { opacity: 0.7; box-shadow: 0 0 0 8px rgba(34, 197, 94, 0.08); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes bounce-dot {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }
        .contact-info-row:hover .ci-val {
          color: var(--blue-accent) !important;
        }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-inner { padding: 0 20px !important; }
        }
        ::placeholder { color: var(--text-muted) !important; }
      `}</style>
    </section>
  );
}

function BotAvatar() {
  return (
    <div
      style={{
        width: 22,
        height: 22,
        borderRadius: '50%',
        background: 'var(--blue-accent)',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontSize: 9,
          fontWeight: 800,
          color: 'white',
          fontFamily: 'Syne, sans-serif',
        }}
      >
        E
      </span>
    </div>
  );
}

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [text]);
  return (
    <p
      style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '0.88rem',
        color: 'var(--text-secondary)',
        margin: 0,
        lineHeight: 1.65,
      }}
    >
      {displayed}
      {displayed.length < text.length && (
        <span
          style={{
            display: 'inline-block',
            width: 2,
            height: 14,
            background: 'var(--blue-accent)',
            marginLeft: 2,
            verticalAlign: 'middle',
            animation: 'blink 0.8s infinite',
          }}
        />
      )}
    </p>
  );
}

function TypingIndicator() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 5,
        alignItems: 'center',
        padding: '12px 16px',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        borderRadius: '0 12px 12px 12px',
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--blue-accent)',
            opacity: 0.7,
            animation: `bounce-dot 1.2s ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
