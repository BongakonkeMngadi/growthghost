import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Bot, CheckCircle2, Flame, LockKeyhole, Moon, Sparkles, Target } from 'lucide-react';
import { FONT, GhostLogo, NoiseBackground } from '../components/Brand';
import GhostLog from '../components/GhostLog';

const HERO_LINES = [
  { tag: 'OBSERVE', text: 'traffic up, signups flat — conversion leak detected', tone: 'dim' },
  { tag: 'HYPOTHESIS', text: 'founders need a stronger first-screen promise', tone: 'hot' },
  { tag: 'ACT', text: 'launched headline test: “growth while you ignore it”', tone: 'normal' },
  { tag: 'POST', text: 'scheduled 9 posts across LinkedIn and X', tone: 'normal' },
  { tag: 'WIN', text: '+18% traffic, +7 signups, weak campaign paused', tone: 'win' },
];

const CAPABILITIES = [
  { icon: Bot, title: 'Autonomous execution', copy: 'Creates content, posts it, checks dashboards, edits experiments, then adapts.' },
  { icon: Target, title: 'Goal-led growth', copy: 'User says “get me more signups.” GrowthGhost turns that into channel tests.' },
  { icon: BarChart3, title: 'Results over dashboards', copy: 'The feed says what changed, why it changed, and whether it worked.' },
  { icon: LockKeyhole, title: 'Control when it matters', copy: 'Autopilot, Suggest Mode, or Manual Assist depending on trust level.' },
];

const MODES = [
  { title: 'Autopilot', copy: 'Ghost executes low-risk growth tasks without asking.', active: true },
  { title: 'Suggest Mode', copy: 'Ghost drafts the campaign and waits for approval.', active: false },
  { title: 'Manual Assist', copy: 'You control the workflow while Ghost advises.', active: false },
];

const PROOF_ITEMS = [
  'Tested 3 landing page headlines',
  'Paused underperforming Facebook campaign',
  'Found LinkedIn was converting 2.4x better',
  'Drafted Reddit experiment, awaiting approval',
];

function ModeCard({ mode }) {
  return (
    <div className={`rounded-2xl border p-4 ${mode.active ? 'border-orange-300/35 bg-orange-400/10' : 'border-orange-300/12 bg-orange-50/[0.025]'}`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[12px] font-bold text-orange-50">{mode.title}</p>
        <span className={`w-2 h-2 rounded-full ${mode.active ? 'bg-orange-300 shadow-[0_0_18px_rgba(251,146,60,0.8)]' : 'bg-orange-200/20'}`} />
      </div>
      <p className="text-[11px] leading-relaxed text-orange-100/38">{mode.copy}</p>
    </div>
  );
}

export default function Landing() {
  const [intent, setIntent] = useState('Get me more paying users');

  return (
    <div className="min-h-screen bg-[#050200] text-orange-50 overflow-hidden" style={{ fontFamily: FONT }}>
      <NoiseBackground />

      <nav className="fixed top-0 inset-x-0 z-50 border-b border-orange-300/10 bg-[#050200]/88 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center"><GhostLogo size="w-9 h-9" /></Link>
          <div className="hidden md:flex items-center gap-6 text-[11px] text-orange-100/38">
            <a href="#how" className="hover:text-orange-200 transition-colors">How it works</a>
            <a href="#control" className="hover:text-orange-200 transition-colors">Control</a>
            <a href="#proof" className="hover:text-orange-200 transition-colors">Proof</a>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Link to="/login" className="px-3 sm:px-4 py-2 rounded-xl text-[12px] text-orange-100/50 hover:text-orange-100 transition-colors">Sign in</Link>
            <Link to="/signup" className="ghost-button hidden sm:inline-flex items-center gap-2">Hire a Ghost <ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="pt-24 sm:pt-36 pb-14 sm:pb-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.04fr_0.96fr] gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
              <div className="ghost-tag mb-6"><Moon className="w-3 h-3" /> It grows your business while you sleep</div>
              <h1 className="text-4xl min-[380px]:text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.07em] leading-[0.9] text-orange-50">
                Hire a<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 via-orange-400 to-orange-600">GrowthGhost.</span>
              </h1>
              <p className="mt-7 max-w-xl text-[14px] sm:text-[15px] leading-7 text-orange-100/45">
                Not an AI content tool. An autonomous marketer that watches your funnel, forms hypotheses, runs growth experiments, and tells you what it already did.
              </p>

              <div className="mt-8 p-2 rounded-2xl border border-orange-300/14 bg-black/35 max-w-xl shadow-2xl">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 px-4 py-3 rounded-xl bg-orange-50/[0.035] border border-orange-300/10">
                    <p className="text-[9px] tracking-[0.28em] uppercase text-orange-200/32 mb-1.5">Intent</p>
                    <input value={intent} onChange={(e) => setIntent(e.target.value)} className="w-full bg-transparent text-[13px] text-orange-50 focus:outline-none" />
                  </div>
                  <Link to="/signup" className="ghost-button flex items-center justify-center gap-2 sm:whitespace-nowrap">Activate ghost <Sparkles className="w-4 h-4" /></Link>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {['SaaS founders', 'Shopify stores', 'Creators', 'B2B growth'].map((item) => <span className="ghost-tag" key={item}>{item}</span>)}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }} className="relative">
              <div className="absolute -inset-8 rounded-[2rem] bg-orange-500/12 blur-3xl" />
              <div className="relative ghost-glass rounded-[1.6rem] p-4 sm:p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[9px] tracking-[0.28em] uppercase text-orange-200/35">Live autonomous loop</p>
                    <p className="text-[18px] font-black text-orange-50 mt-1">Ghost Feed</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-400/10 border border-orange-300/16">
                    <span className="w-2 h-2 rounded-full bg-orange-300 animate-pulse" />
                    <span className="text-[10px] text-orange-100/55">ACTIVE</span>
                  </div>
                </div>
                <GhostLog lines={HERO_LINES} title="agent running" />
                <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-2 mt-4">
                  {[['Traffic', '+18%'], ['Signups', '+7'], ['Revenue', 'tracking']].map(([k, v]) => (
                    <div key={k} className="rounded-2xl border border-orange-300/12 bg-black/25 p-3">
                      <p className="text-[9px] text-orange-200/30 tracking-[0.2em] uppercase">{k}</p>
                      <p className="mt-2 text-lg font-black text-orange-100">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="how" className="px-4 sm:px-6 py-16 border-y border-orange-300/8 bg-orange-400/[0.018]">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-10">
              <p className="text-[10px] tracking-[0.3em] uppercase text-orange-200/35 mb-3">What it actually does</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.05em]">AI runs experiments, not just posts.</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {CAPABILITIES.map((cap) => <div key={cap.title} className="ghost-card p-5"><cap.icon className="w-5 h-5 text-orange-300 mb-5" /><h3 className="text-[14px] font-bold text-orange-50 mb-3">{cap.title}</h3><p className="text-[12px] leading-6 text-orange-100/38">{cap.copy}</p></div>)}
            </div>
          </div>
        </section>

        <section id="control" className="px-4 sm:px-6 py-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-orange-200/35 mb-3">Trust system</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.05em] mb-5">Autonomous, but not reckless.</h2>
              <p className="text-[13px] leading-7 text-orange-100/42 max-w-lg">GrowthGhost starts conservative. It can operate silently for low-risk growth work, but asks before expensive, public, or brand-sensitive actions.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">{MODES.map((mode) => <ModeCard key={mode.title} mode={mode} />)}</div>
          </div>
        </section>

        <section id="proof" className="px-4 sm:px-6 pb-24">
          <div className="max-w-7xl mx-auto ghost-glass rounded-[2rem] p-6 sm:p-8 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
            <div>
              <div className="ghost-tag mb-5"><Flame className="w-3 h-3" /> The product says: we already did it</div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.05em] mb-4">Users return for proof, not features.</h2>
              <p className="text-[13px] leading-7 text-orange-100/42">The main dashboard is not a maze. It is a timeline of work done, experiments running, and measurable outcomes.</p>
            </div>
            <div className="space-y-3">
              {PROOF_ITEMS.map((item, i) => <motion.div key={item} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="flex items-center gap-3 rounded-2xl border border-orange-300/12 bg-black/28 p-4"><CheckCircle2 className="w-4 h-4 text-orange-300" /><span className="text-[12px] text-orange-50/62">{item}</span></motion.div>)}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
