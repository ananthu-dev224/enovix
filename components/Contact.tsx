'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle,
  MessageSquare, Briefcase, ArrowRight, ChevronRight,
} from 'lucide-react';

/* ─── static data ─────────────────────────────────────────────── */
const contactInfo = [
  { icon: Mail,   label: 'Email',        value: 'contact.enovix@gmail.com', href: 'mailto:contact.enovix@gmail.com' },
  { icon: Phone,  label: 'Web',          value: '+91 95269 52719',           href: 'tel:+919526952719' },
  { icon: Phone,  label: 'Mobile / App', value: '+91 79940 78089',           href: 'tel:+917994078089' },
  { icon: MapPin, label: 'Location',     value: 'Kerala, India',             href: '' },
];

const serviceOptions = ['Web Development', 'Android Development', 'iOS Development', 'Full-Stack Solution', 'Other'];
const budgetOptions  = ['< ₹50K', '₹50K – ₹1.5L', '₹1.5L – ₹5L', '₹5L+', "Let's Discuss"];

/* ─── step definitions ────────────────────────────────────────── */
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
  { key: 'name',    question: "Hey! What's your name?",                              type: 'text',     required: true,  placeholder: 'Type your name...' },
  { key: 'email',   question: "Great, {name}. What's your email address?",           type: 'email',    required: true,  placeholder: 'your@email.com' },
  { key: 'company', question: "What's your company or project name?",                type: 'text',     placeholder: 'Optional — press Enter to skip' },
  { key: 'service', question: "What kind of service are you looking for?",           type: 'chips',    options: serviceOptions },
  { key: 'budget',  question: "Awesome. What's your rough budget?",                  type: 'chips',    options: budgetOptions },
  { key: 'message', question: "Last one — describe your project in a few sentences.", type: 'textarea', required: true,  placeholder: 'Tell us about your goals, timeline, anything relevant...' },
];

type FormData = Record<StepKey, string>;
type FormStatus = 'idle' | 'sending' | 'success' | 'error';

/* ─── main component ──────────────────────────────────────────── */
export default function Contact() {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const inView        = useInView(sectionRef, { once: true, margin: '-60px' });
  const inputRef      = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const [step,     setStep]     = useState(0);
  const [form,     setForm]     = useState<FormData>({ name:'', email:'', company:'', service:'', budget:'', message:'' });
  const [draft,    setDraft]    = useState('');
  const [status,   setStatus]   = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [revealed, setRevealed] = useState<StepKey[]>([]);

  const current = STEPS[step];

  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Only auto-focus after the user has started interacting (step > 0)
    // to prevent the browser from scrolling to this section on initial page load
    if (status === 'idle' && started) {
      setTimeout(() => (inputRef.current as HTMLElement | null)?.focus(), 150);
    }
  }, [step, status, started]);

  useEffect(() => {
    if (transcriptRef.current) transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
  }, [revealed, step, status]);

  const resolveQuestion = (q: string) => q.replace('{name}', form.name.split(' ')[0] || 'you');

  const commit = (value: string) => {
    if (current.required && !value.trim()) return;
    if (!started) setStarted(true);
    const next = { ...form, [current.key]: value };
    setForm(next);
    setDraft('');
    setRevealed(prev => [...prev, current.key]);
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
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
      const res  = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const json = await res.json();
      if (!res.ok) { setErrorMsg(json.error || 'Something went wrong.'); setStatus('error'); return; }
      setStatus('success');
    } catch {
      setErrorMsg('Network error. Check your connection.');
      setStatus('error');
    }
  };

  const restart = () => {
    setStep(0);
    setStarted(false);
    setForm({ name:'', email:'', company:'', service:'', budget:'', message:'' });
    setDraft('');
    setStatus('idle');
    setRevealed([]);
  };

  const progress = (step / STEPS.length) * 100;

  return (
    <section id="contact" ref={sectionRef} style={{ padding: '120px 0 0', position: 'relative', overflow: 'hidden' }}>

      {/* ambient bg */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse 60% 80% at 80% 20%, rgba(40,137,232,0.06) 0%, transparent 60%), radial-gradient(ellipse 40% 50% at 10% 80%, rgba(0,212,255,0.04) 0%, transparent 60%)',
      }}/>

      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 32px' }}>

        {/* heading */}
        <motion.div initial={{ opacity:0, y:24 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.7, ease:[0.16,1,0.3,1] }} style={{ marginBottom:'72px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px', justifyContent:'center' }}>
            <span style={{ width:'24px', height:'1px', background:'linear-gradient(90deg,transparent,#2889e8)' }}/>
            <span style={{ fontFamily:'DM Mono,monospace', fontSize:'0.68rem', letterSpacing:'0.22em', color:'#2889e8', textTransform:'uppercase' }}>Let&apos;s Connect</span>
            <span style={{ width:'24px', height:'1px', background:'linear-gradient(90deg,#00d4ff,transparent)' }}/>
          </div>
          <h2 style={{
            textAlign:'center', fontFamily:'Syne,sans-serif',
            fontSize:'clamp(2.4rem,5vw,4rem)', fontWeight:'800',
            lineHeight:1.05, letterSpacing:'-0.04em', color:'var(--text-primary)', margin:0,
          }}>
            Start Your{' '}
            <span style={{ background:'linear-gradient(135deg,#2889e8,#00d4ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              Project
            </span>{' '}With Us
          </h2>
        </motion.div>

        {/* two-column layout */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.55fr', gap:'48px', alignItems:'start' }} className="contact-grid">

          {/* LEFT: contact info */}
          <motion.div initial={{ opacity:0, x:-24 }} animate={inView ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.7, delay:0.15 }} style={{ display:'flex', flexDirection:'column', gap:'4px' }}>

            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'28px' }}>
              <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#3ddc84', boxShadow:'0 0 10px rgba(61,220,132,0.7)', animation:'pulse-dot 2s infinite' }}/>
              <span style={{ fontFamily:'DM Mono,monospace', fontSize:'0.65rem', color:'#3ddc84', letterSpacing:'0.14em', textTransform:'uppercase' }}>Available for Projects</span>
            </div>

            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.a key={item.label} href={item.href}
                  initial={{ opacity:0, y:12 }} animate={inView ? { opacity:1, y:0 } : {}}
                  transition={{ delay: 0.25 + i * 0.08, duration:0.5 }}
                  style={{ display:'flex', gap:'16px', alignItems:'center', padding:'18px 0', borderBottom:'1px solid rgba(42,137,232,0.08)', textDecoration:'none' }}
                  onMouseEnter={e => { (e.currentTarget.querySelector('.ci-val') as HTMLElement).style.color = '#00d4ff'; }}
                  onMouseLeave={e => { (e.currentTarget.querySelector('.ci-val') as HTMLElement).style.color = 'var(--text-primary)'; }}
                >
                  <div style={{ width:'40px', height:'40px', borderRadius:'10px', flexShrink:0, background:'rgba(40,137,232,0.07)', border:'1px solid rgba(40,137,232,0.14)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon size={16} color="#2889e8" strokeWidth={1.5}/>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:'DM Mono,monospace', fontSize:'0.6rem', color:'var(--text-muted)', letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:'4px' }}>{item.label}</div>
                    <div className="ci-val" style={{ fontFamily:'DM Sans,sans-serif', fontSize:'0.9rem', fontWeight:'500', color:'var(--text-primary)', transition:'color 0.2s' }}>{item.value}</div>
                  </div>
                  {item.href && <ArrowRight size={14} color="rgba(42,137,232,0.3)" strokeWidth={1.5}/>}
                </motion.a>
              );
            })}

            <div style={{ marginTop:'36px', padding:'24px', borderRadius:'14px', background:'rgba(4,20,40,0.5)', border:'1px solid rgba(42,137,232,0.1)' }}>
              <div style={{ fontFamily:'DM Mono,monospace', fontSize:'0.6rem', color:'var(--text-muted)', letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:'18px' }}>What happens next?</div>
              {[
                { icon: MessageSquare, text: 'We review your message & requirements' },
                { icon: Phone,         text: 'Schedule a free discovery call' },
                { icon: Briefcase,     text: 'Receive a detailed proposal & timeline' },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} style={{ display:'flex', gap:'12px', alignItems:'flex-start', marginBottom: i<2?'14px':0 }}>
                    <div style={{ width:'26px', height:'26px', borderRadius:'6px', flexShrink:0, background:'rgba(40,137,232,0.08)', border:'1px solid rgba(40,137,232,0.12)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <Icon size={12} color="#2889e8" strokeWidth={1.5}/>
                    </div>
                    <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'0.82rem', fontWeight:'300', color:'var(--text-secondary)', lineHeight:1.55 }}>{s.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT: conversational form */}
          <motion.div initial={{ opacity:0, x:24 }} animate={inView ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.7, delay:0.2 }} style={{ position:'relative' }}>

            <div style={{
              borderRadius:'20px', overflow:'hidden',
              background:'rgba(4,14,28,0.92)', backdropFilter:'blur(20px)',
              border:'1px solid rgba(42,137,232,0.14)',
              boxShadow:'0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,212,255,0.04)',
            }}>
              {/* mac-style top bar */}
              <div style={{ display:'flex', alignItems:'center', gap:'8px', padding:'14px 20px', background:'rgba(255,255,255,0.02)', borderBottom:'1px solid rgba(42,137,232,0.08)' }}>
                {['#ff5f57','#febc2e','#28c840'].map(c => (
                  <div key={c} style={{ width:'11px', height:'11px', borderRadius:'50%', background:c, opacity:0.8 }}/>
                ))}
                <span style={{ marginLeft:'10px', fontFamily:'DM Mono,monospace', fontSize:'0.62rem', color:'rgba(138,175,212,0.35)', letterSpacing:'0.1em' }}>enovix — new-project</span>
              </div>

              {/* progress bar */}
              {status === 'idle' && (
                <div style={{ height:'2px', background:'rgba(42,137,232,0.08)' }}>
                  <motion.div style={{ height:'100%', background:'linear-gradient(90deg,#2889e8,#00d4ff)' }}
                    animate={{ width:`${progress}%` }} transition={{ duration:0.4, ease:'easeOut' }}/>
                </div>
              )}

              {/* transcript scroll area */}
              <div ref={transcriptRef} style={{ padding:'28px 28px 0', minHeight:'200px', maxHeight:'340px', overflowY:'auto', scrollbarWidth:'none' }}>
                <AnimatePresence initial={false}>
                  {revealed.map(key => {
                    const s = STEPS.find(x => x.key === key)!;
                    return (
                      <motion.div key={key}
                        initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                        transition={{ duration:0.35 }} style={{ marginBottom:'22px' }}>
                        {/* bot bubble */}
                        <div style={{ display:'flex', gap:'10px', alignItems:'flex-start', marginBottom:'8px' }}>
                          <BotAvatar/>
                          <div style={{ background:'rgba(40,137,232,0.08)', border:'1px solid rgba(40,137,232,0.12)', borderRadius:'0 12px 12px 12px', padding:'10px 14px', maxWidth:'90%' }}>
                            <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'0.84rem', fontWeight:'300', color:'var(--text-secondary)', margin:0, lineHeight:1.6 }}>
                              {resolveQuestion(s.question)}
                            </p>
                          </div>
                        </div>
                        {/* user bubble */}
                        <div style={{ display:'flex', justifyContent:'flex-end' }}>
                          <div style={{ background:'rgba(0,212,255,0.08)', border:'1px solid rgba(0,212,255,0.15)', borderRadius:'12px 0 12px 12px', padding:'10px 16px', maxWidth:'80%' }}>
                            <p style={{ fontFamily:'Syne,sans-serif', fontSize:'0.9rem', fontWeight:'600', color:'var(--text-primary)', margin:0 }}>
                              {form[key] || <span style={{ color:'var(--text-muted)', fontStyle:'italic', fontWeight:300 }}>skipped</span>}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* current question bubble */}
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.div key={current.key}
                      initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
                      transition={{ duration:0.38, ease:[0.16,1,0.3,1] }} style={{ marginBottom:'6px' }}>
                      <div style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}>
                        <BotAvatar/>
                        <div style={{ background:'rgba(40,137,232,0.08)', border:'1px solid rgba(40,137,232,0.12)', borderRadius:'0 12px 12px 12px', padding:'10px 14px', maxWidth:'90%' }}>
                          <TypewriterText text={resolveQuestion(current.question)}/>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* sending */}
                {status === 'sending' && (
                  <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
                    style={{ display:'flex', gap:'10px', alignItems:'center', padding:'12px 0' }}>
                    <BotAvatar/>
                    <TypingIndicator/>
                  </motion.div>
                )}

                {/* success */}
                {status === 'success' && (
                  <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} style={{ paddingBottom:'28px' }}>
                    <div style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}>
                      <BotAvatar/>
                      <div style={{ background:'rgba(61,220,132,0.07)', border:'1px solid rgba(61,220,132,0.2)', borderRadius:'0 12px 12px 12px', padding:'14px 18px' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px' }}>
                          <CheckCircle2 size={16} color="#3ddc84" strokeWidth={1.5}/>
                          <span style={{ fontFamily:'Syne,sans-serif', fontSize:'0.9rem', fontWeight:'700', color:'#3ddc84' }}>Message received!</span>
                        </div>
                        <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'0.83rem', fontWeight:'300', color:'var(--text-secondary)', margin:0, lineHeight:1.6 }}>
                          We&apos;ve sent a confirmation to your email. Expect to hear from us within 24 hours.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* error */}
                {status === 'error' && (
                  <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ paddingBottom:'16px' }}>
                    <div style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}>
                      <div style={{ width:'22px', height:'22px', borderRadius:'50%', background:'rgba(239,68,68,0.3)', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <AlertCircle size={11} color="#f87171" strokeWidth={2}/>
                      </div>
                      <div style={{ background:'rgba(239,68,68,0.06)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:'0 12px 12px 12px', padding:'10px 14px' }}>
                        <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'0.83rem', color:'#f87171', margin:0, lineHeight:1.5 }}>{errorMsg}</p>
                      </div>
                    </div>
                    <div style={{ display:'flex', justifyContent:'flex-end', marginTop:'12px' }}>
                      <button onClick={restart} style={{ fontFamily:'DM Mono,monospace', fontSize:'0.65rem', color:'#2889e8', background:'none', border:'none', cursor:'pointer', letterSpacing:'0.1em', textTransform:'uppercase' }}>↩ Try again</button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* input zone */}
              {status === 'idle' && (
                <div style={{ padding:'16px 20px 20px', borderTop:'1px solid rgba(42,137,232,0.08)' }}>

                  {/* chips */}
                  {current.type === 'chips' && (
                    <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'12px' }}>
                      {current.options!.map(opt => (
                        <motion.button key={opt} type="button"
                          whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                          onClick={() => commit(opt)}
                          style={{ padding:'10px 18px', borderRadius:'100px', cursor:'pointer', border:'1px solid rgba(40,137,232,0.15)', fontFamily:'DM Sans,sans-serif', fontSize:'0.82rem', fontWeight:'500', background:'rgba(40,137,232,0.06)', color:'var(--text-secondary)', transition:'all 0.18s ease' }}
                          onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background='rgba(0,212,255,0.1)'; b.style.color='#00d4ff'; b.style.borderColor='rgba(0,212,255,0.3)'; }}
                          onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background='rgba(40,137,232,0.06)'; b.style.color='var(--text-secondary)'; b.style.borderColor='rgba(40,137,232,0.15)'; }}
                        >{opt}</motion.button>
                      ))}
                      {!current.required && (
                        <motion.button type="button" whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                          onClick={() => commit('')}
                          style={{ padding:'10px 18px', borderRadius:'100px', cursor:'pointer', fontFamily:'DM Mono,monospace', fontSize:'0.65rem', letterSpacing:'0.1em', textTransform:'uppercase', background:'transparent', border:'1px solid rgba(42,137,232,0.1)', color:'var(--text-muted)', transition:'all 0.18s' }}>
                          Skip
                        </motion.button>
                      )}
                    </div>
                  )}

                  {/* text / email */}
                  {(current.type === 'text' || current.type === 'email') && (
                    <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
                      <div style={{ flex:1, display:'flex', alignItems:'center', gap:'10px', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(40,137,232,0.18)', borderRadius:'12px', padding:'0 16px' }}>
                        <ChevronRight size={14} color="#2889e8" strokeWidth={2}/>
                        <input
                          ref={inputRef as React.RefObject<HTMLInputElement>}
                          type={current.type}
                          value={draft}
                          onChange={e => setDraft(e.target.value)}
                          onKeyDown={handleKey}
                          placeholder={current.placeholder}
                          style={{ flex:1, padding:'14px 0', background:'transparent', border:'none', outline:'none', fontFamily:'DM Sans,sans-serif', fontSize:'0.9rem', fontWeight:'400', color:'var(--text-primary)' }}
                        />
                      </div>
                      <motion.button type="button"
                        whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                        onClick={() => commit(draft)}
                        style={{ width:'44px', height:'44px', borderRadius:'12px', border:'none', cursor:'pointer', background: draft.trim() ? 'linear-gradient(135deg,#1a6fc4,#2889e8)' : 'rgba(40,137,232,0.12)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow: draft.trim() ? '0 6px 20px rgba(0,160,220,0.25)' : 'none', transition:'all 0.2s ease' }}>
                        <Send size={16} color={draft.trim() ? 'white' : 'rgba(40,137,232,0.35)'} strokeWidth={1.8}/>
                      </motion.button>
                      {!current.required && (
                        <button type="button" onClick={() => commit('')}
                          style={{ fontFamily:'DM Mono,monospace', fontSize:'0.62rem', color:'var(--text-muted)', background:'none', border:'none', cursor:'pointer', letterSpacing:'0.1em', textTransform:'uppercase', whiteSpace:'nowrap' }}>
                          Skip
                        </button>
                      )}
                    </div>
                  )}

                  {/* textarea */}
                  {current.type === 'textarea' && (
                    <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                      <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(40,137,232,0.18)', borderRadius:'12px', padding:'12px 16px' }}>
                        <textarea
                          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                          rows={3}
                          value={draft}
                          onChange={e => setDraft(e.target.value)}
                          placeholder={current.placeholder}
                          style={{ width:'100%', background:'transparent', border:'none', outline:'none', resize:'none', fontFamily:'DM Sans,sans-serif', fontSize:'0.9rem', fontWeight:'300', color:'var(--text-primary)', lineHeight:1.7, boxSizing:'border-box' }}
                        />
                      </div>
                      <div style={{ display:'flex', justifyContent:'flex-end' }}>
                        <motion.button type="button"
                          whileHover={{ scale:1.02, y:-1 }} whileTap={{ scale:0.98 }}
                          onClick={() => commit(draft)}
                          disabled={!draft.trim()}
                          style={{ padding:'12px 28px', borderRadius:'10px', border:'none', cursor: draft.trim() ? 'pointer' : 'not-allowed', background: draft.trim() ? 'linear-gradient(135deg,#1a6fc4,#2889e8)' : 'rgba(40,137,232,0.12)', color: draft.trim() ? 'white' : 'rgba(40,137,232,0.35)', fontFamily:'Syne,sans-serif', fontSize:'0.82rem', fontWeight:'700', letterSpacing:'0.08em', textTransform:'uppercase', display:'flex', alignItems:'center', gap:'8px', boxShadow: draft.trim() ? '0 8px 24px rgba(0,160,220,0.22)' : 'none', transition:'all 0.2s ease' }}>
                          <Send size={14} strokeWidth={2}/> Send Message
                        </motion.button>
                      </div>
                    </div>
                  )}

                  {/* step counter + back */}
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'12px' }}>
                    <span style={{ fontFamily:'DM Mono,monospace', fontSize:'0.6rem', color:'rgba(138,175,212,0.3)', letterSpacing:'0.1em' }}>
                      STEP {step + 1} / {STEPS.length}
                    </span>
                    {step > 0 && (
                      <button type="button"
                        onClick={() => { setStep(s => s - 1); setRevealed(prev => prev.slice(0, -1)); setDraft(''); }}
                        style={{ fontFamily:'DM Mono,monospace', fontSize:'0.6rem', color:'rgba(138,175,212,0.3)', background:'none', border:'none', cursor:'pointer', letterSpacing:'0.1em' }}>
                        ← back
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* success footer */}
              {status === 'success' && (
                <div style={{ padding:'16px 20px 20px', borderTop:'1px solid rgba(42,137,232,0.08)', display:'flex', justifyContent:'center' }}>
                  <button onClick={restart}
                    style={{ fontFamily:'DM Mono,monospace', fontSize:'0.65rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(138,175,212,0.4)', background:'none', border:'1px solid rgba(42,137,232,0.1)', borderRadius:'8px', padding:'8px 20px', cursor:'pointer', transition:'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color='#2889e8')}
                    onMouseLeave={e => (e.currentTarget.style.color='rgba(138,175,212,0.4)')}>
                    ↩ Start over
                  </button>
                </div>
              )}
            </div>

            <p style={{ textAlign:'center', marginTop:'14px', fontFamily:'DM Mono,monospace', fontSize:'0.62rem', color:'rgba(138,175,212,0.25)', letterSpacing:'0.1em' }}>
              NO SPAM · WE RESPECT YOUR PRIVACY
            </p>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1;box-shadow:0 0 8px rgba(61,220,132,0.6);}50%{opacity:0.6;box-shadow:0 0 16px rgba(61,220,132,1);} }
        @keyframes blink { 0%,100%{opacity:1}50%{opacity:0} }
        @keyframes bounce-dot { 0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)} }
        @media(max-width:900px){ .contact-grid{grid-template-columns:1fr!important;} }
        ::placeholder{color:rgba(138,175,212,0.2)!important;}
        ::-webkit-scrollbar{display:none;}
      `}</style>
    </section>
  );
}

/* ── sub-components ─────────────────────────────────────────── */
function BotAvatar() {
  return (
    <div style={{ width:'22px', height:'22px', borderRadius:'50%', background:'linear-gradient(135deg,#2889e8,#00d4ff)', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <span style={{ fontSize:'9px', fontWeight:'800', color:'white', fontFamily:'Syne,sans-serif' }}>E</span>
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
    <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'0.88rem', fontWeight:'300', color:'var(--text-secondary)', margin:0, lineHeight:1.65 }}>
      {displayed}
      {displayed.length < text.length && (
        <span style={{ display:'inline-block', width:'2px', height:'14px', background:'#2889e8', marginLeft:'2px', verticalAlign:'middle', animation:'blink 0.8s infinite' }}/>
      )}
    </p>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display:'flex', gap:'5px', alignItems:'center', padding:'12px 16px', background:'rgba(40,137,232,0.07)', border:'1px solid rgba(40,137,232,0.12)', borderRadius:'0 12px 12px 12px' }}>
      {[0,1,2].map(i => (
        <div key={i} style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#2889e8', opacity:0.7, animation:`bounce-dot 1.2s ${i * 0.2}s infinite` }}/>
      ))}
    </div>
  );
}