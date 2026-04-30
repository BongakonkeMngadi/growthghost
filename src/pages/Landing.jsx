import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, CheckCircle, ChevronRight, Megaphone, Shield, Target, Zap } from 'lucide-react';
import { FONT, GhostLogo, NoiseBackground } from '../components/Brand';
import { joinWaitlist } from '../lib/waitlist';

const PROOF_LOG = [
  { site: 'analytics', task: 'traffic up 24% — signup rate flat, leak detected' },
  { site: 'landing', task: 'ran headline test: conversion intent +8.4%' },
  { site: 'linkedin', task: 'posted 4 founder clips — 2.1x better than X' },
  { site: 'x.com', task: 'paused campaign bleeding budget with no results' },
  { site: 'email', task: 'sent follow-up to 38 trial users who never converted' },
];

const AGENT_STEPS = [
  { label: 'Connect', sub: 'Link your website, analytics, socials, and email tool' },
  { label: 'Set intent', sub: 'Tell it one goal: "get me more paying users"' },
  { label: 'Ghost ships', sub: 'Posts content, runs A/B tests, adjusts campaigns' },
  { label: 'You see proof', sub: 'A feed of what ran, what moved, what stopped' },
];

const CAPABILITIES = [
  { icon: Target, name: 'One intent, full execution', desc: 'Say "get more signups." The agent breaks that into experiments and ships them.' },
  { icon: Megaphone, name: 'Posts across every channel', desc: 'LinkedIn, X, Reddit — it drafts, schedules, and publishes. You just approve what matters.' },
  { icon: BarChart3, name: 'Reads your real numbers', desc: 'Connects to Google Analytics and your dashboard. Spots what is leaking before you do.' },
  { icon: Shield, name: 'You stay in control', desc: 'Autopilot for safe work. Explicit approval required before any sensitive or expensive action.' },
  { icon: Zap, name: 'Kills what is not working', desc: 'Detects underperforming campaigns and pauses them. No more budget bleeding on dead angles.' },
  { icon: CheckCircle, name: 'Proof feed, not reports', desc: 'Every action lands in a simple timeline. What ran, what changed, what it wants to try next.' },
];

const EXAMPLE_COMMANDS = [
  '"Get my SaaS to 100 paying users this month"',
  '"Find the exact reason my landing page is not converting"',
  '"Post 5 founder-led pieces across LinkedIn and X this week"',
  '"Pause every campaign with a CAC above my target"',
  '"Write and send a follow-up to trial users who went cold"',
];

function TypewriterText({ texts, speed = 65, pause = 1800 }) {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState('typing');

  useEffect(() => {
    const current = texts[idx];
    if (phase === 'typing') {
      if (display.length < current.length) {
        const timer = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), speed);
        return () => clearTimeout(timer);
      }
      const timer = setTimeout(() => setPhase('deleting'), pause);
      return () => clearTimeout(timer);
    }
    if (display.length > 0) {
      const timer = setTimeout(() => setDisplay(display.slice(0, -1)), speed / 2);
      return () => clearTimeout(timer);
    }
    setIdx((i) => (i + 1) % texts.length);
    setPhase('typing');
  }, [display, phase, idx, texts, speed, pause]);

  return (
    <span>
      {display}
      <span className="animate-blink border-r-2 border-black ml-0.5">&nbsp;</span>
    </span>
  );
}

function ProofLog() {
  const [shown, setShown] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    setShown(0);
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= PROOF_LOG.length) {
        clearInterval(timer);
        setTimeout(() => setCycle((c) => c + 1), 3500);
      }
    }, 700);
    return () => clearInterval(timer);
  }, [cycle]);

  return (
    <div className="rounded-xl overflow-hidden border border-black/10 bg-black/[0.03]" style={{ fontFamily: FONT }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-black/[0.06] bg-black/[0.02]">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-black/15" />
          <div className="w-2 h-2 rounded-full bg-black/15" />
          <div className="w-2 h-2 rounded-full bg-black/15" />
        </div>
        <div className="flex items-center gap-1.5">
          <motion.div className="w-1.5 h-1.5 rounded-full bg-black/60" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span className="text-[9px] text-black tracking-[0.25em] uppercase">Growth running</span>
        </div>
      </div>
      <div className="p-4 space-y-2 min-h-[160px]">
        {PROOF_LOG.map((entry, i) => (
          <motion.div key={`${cycle}-${i}`} initial={{ x: -8 }} animate={shown > i ? { x: 0 } : { x: -8 }} transition={{ duration: 0.3 }} className="flex items-center gap-2.5 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-black/40 shrink-0 mt-0.5" />
            <span className="text-black shrink-0 min-w-[72px]">{entry.site}</span>
            <span className="text-black truncate">{entry.task}</span>
            <span className="ml-auto text-black shrink-0">&#10003;</span>
          </motion.div>
        ))}
        {shown > 0 && shown < PROOF_LOG.length && <motion.span className="inline-block w-1.5 h-3.5 bg-black/30 rounded-sm ml-4" animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} />}
      </div>
    </div>
  );
}

export default function Landing() {
  const [waitlist, setWaitlist] = useState({ name: '', email: '', company: '', goal: 'Get me more paying users' });
  const [waitlistStatus, setWaitlistStatus] = useState('idle');
  const [waitlistMessage, setWaitlistMessage] = useState('');

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    setWaitlistStatus('loading');
    setWaitlistMessage('');

    try {
      await joinWaitlist(waitlist);
      setWaitlistStatus('success');
      setWaitlistMessage('You are on the list. Handio will reach out when your early access spot opens.');
      setWaitlist({ name: '', email: '', company: '', goal: 'Get me more paying users' });
    } catch (err) {
      setWaitlistStatus('error');
      setWaitlistMessage(err?.message || 'Could not join the waitlist yet. Try again.');
    }
  };

  const updateWaitlist = (field) => (e) => {
    setWaitlist((current) => ({ ...current, [field]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-white text-black" style={{ fontFamily: FONT }}>
      <NoiseBackground />
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-black/[0.08] bg-white/90 backdrop-blur-xl">
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/[0.12] to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <GhostLogo size="w-7 h-7" compact />
            <span className="text-[13px] font-semibold tracking-tight text-black">Handio</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/login" className="px-4 py-2 rounded-lg text-[12px] font-medium text-black hover:text-black transition-colors">Sign in</Link>
            <Link to="/signup" className="hidden sm:block px-4 py-2 rounded-lg text-[12px] bg-black text-white font-semibold hover:bg-black/90 transition-colors">Start free</Link>
          </div>
        </div>
      </nav>

      <section className="pt-28 sm:pt-32 pb-14 sm:pb-20 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-black/[0.05] blur-[120px]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-black/[0.04] blur-[60px]" />
        </div>
        <motion.div initial={{ y: 24 }} animate={{ y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-black leading-[1.1] tracking-tight mb-5 sm:mb-6">
            Your autonomous<br />
            <span className="bg-gradient-to-r from-black/50 to-black/25 bg-clip-text text-transparent">marketer.</span>
          </h1>
          <p className="text-[14px] sm:text-[15px] text-black leading-relaxed max-w-xl mx-auto mb-4">
            Connect your website, analytics, and social accounts. Set one growth goal. Handio watches your funnel, runs experiments, posts content, kills what fails, and shows you exactly what it did — in a live proof feed.
          </p>
          <div className="text-[11px] sm:text-[13px] font-medium text-black mb-10 px-2">
            <TypewriterText texts={EXAMPLE_COMMANDS} speed={60} pause={2000} />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/signup" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-black text-white text-[13px] font-semibold hover:bg-black/90 transition-all hover:scale-[1.02] active:scale-[0.99] shadow-[0_0_24px_rgba(0,0,0,0.15)]">
              Create your agent <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#waitlist" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-black/10 text-black text-[13px] hover:bg-black/5 hover:text-black transition-all">
              Join waitlist
            </a>
          </div>
          <p className="mt-5 text-[11px] font-medium text-black leading-relaxed">Connects to your website · Google Analytics · LinkedIn · X · Reddit · Email tool</p>
        </motion.div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 border-t border-black/[0.06]">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ y: 16 }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-8">
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-black mb-3">Live proof feed</p>
            <h2 className="text-2xl font-bold text-black">What the agent shipped today.</h2>
            <p className="text-[13px] font-medium text-black mt-2">Not a report. Not a dashboard. A timeline of real work done across your channels.</p>
          </motion.div>
          <ProofLog />
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 border-t border-black/[0.06]">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ y: 16 }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-10">
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-black mb-3">How it works</p>
            <h2 className="text-2xl font-bold text-black">Set it up once. It runs on its own.</h2>
          </motion.div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-1 sm:gap-0">
            {AGENT_STEPS.map((step, i) => (
              <motion.div key={step.label} initial={{ y: 12 }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="flex sm:flex-col items-center gap-3 sm:gap-2 px-3 py-3 sm:px-4 sm:py-0 rounded-xl sm:rounded-none bg-black/[0.02] sm:bg-transparent border border-black/[0.05] sm:border-0">
                <div className="w-7 h-7 rounded-full border border-black/20 bg-black/[0.04] flex items-center justify-center text-[10px] font-medium text-black shrink-0">{i + 1}</div>
                <div className="flex-1 sm:text-center">
                  <p className="text-[11px] font-semibold text-black sm:w-28 leading-snug">{step.label}</p>
                  <p className="text-[9px] text-black leading-snug mt-0.5 sm:w-28">{step.sub}</p>
                </div>
                {i < AGENT_STEPS.length - 1 && <ChevronRight className="hidden sm:block w-4 h-4 text-black shrink-0 -mr-2" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 border-t border-black/[0.06]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ y: 16 }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-10">
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-black mb-3">What it does</p>
            <h2 className="text-2xl font-bold text-black">Not a tool. An agent that executes.</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CAPABILITIES.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.name} initial={{ y: 12 }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="p-4 rounded-2xl border border-black/[0.08] bg-black/[0.03] hover:bg-black/[0.06] hover:border-black/20 transition-all">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3 bg-black/[0.06] border border-black/[0.08]"><Icon className="w-4 h-4 text-black" /></div>
                  <p className="text-[12px] font-semibold text-black mb-1.5">{item.name}</p>
                  <p className="text-[10px] font-medium text-black leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="waitlist" className="py-14 sm:py-20 px-4 sm:px-6 border-t border-black/[0.06] text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-black/[0.035] blur-[100px]" />
        </div>
        <motion.div initial={{ y: 16 }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-xl mx-auto relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3">Get early access.</h2>
          <p className="text-[14px] text-black mb-6 leading-relaxed">Handio is in private beta. Tell us your growth goal and we will invite you when your spot opens.</p>
          <form onSubmit={handleWaitlistSubmit} className="space-y-3 text-left">
            <div className="grid sm:grid-cols-2 gap-3">
              <input value={waitlist.name} onChange={updateWaitlist('name')} className="input-field text-[13px]" placeholder="Name" required />
              <input value={waitlist.email} onChange={updateWaitlist('email')} className="input-field text-[13px]" type="email" placeholder="Email address" required />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <input value={waitlist.company} onChange={updateWaitlist('company')} className="input-field text-[13px]" placeholder="Company" required />
              <input value={waitlist.goal} onChange={updateWaitlist('goal')} className="input-field text-[13px]" placeholder="Growth goal" required />
            </div>
            {waitlistMessage && <div className="rounded-xl border border-black/15 bg-black/[0.04] px-4 py-3 text-[11px] font-medium text-black">{waitlistMessage}</div>}
            <button type="submit" disabled={waitlistStatus === 'loading'} className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-black text-white text-[14px] font-semibold hover:bg-black/90 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_32px_rgba(0,0,0,0.2)]">
              {waitlistStatus === 'loading' ? 'Joining...' : 'Join the waitlist'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <p className="mt-4 text-[11px] font-medium text-black">Supabase-powered waitlist. No spam.</p>
        </motion.div>
      </section>

      <footer className="border-t border-black/[0.06] py-8 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <GhostLogo size="w-5 h-5" compact />
            <span className="text-[11px] font-medium text-black">Handio</span>
          </div>
          <p className="text-[11px] font-medium text-black">The growth marketer that never clocks out.</p>
        </div>
      </footer>
    </div>
  );
}
