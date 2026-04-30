import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, BellRing, Bot, CheckCircle2, ChevronRight, Flame, Ghost, LogOut, MousePointer2, PauseCircle, PlayCircle, Send, ShieldCheck, Sparkles, Target, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { FONT, GhostLogo, NoiseBackground } from '../components/Brand';
import GhostLog from '../components/GhostLog';

const FEED_LINES = [
  { tag: 'OBSERVE', text: 'pricing page views up 24%, checkout starts flat — trust gap detected', tone: 'dim' },
  { tag: 'HYPOTHESIS', text: 'visitors need proof before the first pricing claim', tone: 'hot' },
  { tag: 'SHIP', text: 'drafted pricing social-proof module with founder screenshots', tone: 'normal' },
  { tag: 'POST', text: 'queued 4 founder-led clips and 2 comparison posts', tone: 'normal' },
  { tag: 'MEASURE', text: 'LinkedIn traffic converting 2.1x better than X', tone: 'win' },
  { tag: 'APPROVE', text: 'Reddit launch reply sprint waiting for human approval', tone: 'hot' },
];

const METRICS = [
  { label: 'Qualified traffic', value: '+24%', sub: 'last 7 days', icon: BarChart3 },
  { label: 'Signup lift', value: '+31%', sub: 'trial intent', icon: Target },
  { label: 'Experiments', value: '16', sub: '4 currently live', icon: Flame },
  { label: 'Actions shipped', value: '72', sub: 'this month', icon: Zap },
];

const EXPERIMENTS = [
  { title: 'Founder pain headline test', status: 'running', metric: '+12.8% signup intent', risk: 'low' },
  { title: 'LinkedIn proof thread series', status: 'running', metric: '2.1x click quality', risk: 'low' },
  { title: 'Reddit launch reply sprint', status: 'approval', metric: 'awaiting human', risk: 'medium' },
  { title: 'Pricing page trust module', status: 'draft', metric: 'projected +9% checkout starts', risk: 'medium' },
];

const TASKS = [
  'Rewrite above-the-fold copy for conversion clarity',
  'Find 20 high-intent communities discussing growth automation',
  'Pause campaigns with CAC above target',
  'Summarize every experiment that moved signup rate',
];

const MODES = ['Suggest', 'Autopilot', 'Manual'];

const FUNNEL_STAGES = [
  { label: 'Visitors', value: '8.4k', lift: '+24%' },
  { label: 'Trials', value: '612', lift: '+31%' },
  { label: 'Pipeline', value: '$18.7k', lift: '+14%' },
];

function MetricCard({ metric }) {
  return (
    <div className="ghost-card p-4">
      <div className="flex items-center justify-between mb-4">
        <metric.icon className="w-4 h-4 text-orange-300" />
        <span className="text-[9px] tracking-[0.2em] uppercase text-orange-200/28">{metric.sub}</span>
      </div>
      <p className="text-3xl font-black tracking-[-0.06em] text-orange-50">{metric.value}</p>
      <p className="mt-1 text-[11px] text-orange-100/38">{metric.label}</p>
    </div>
  );
}

function ExperimentRow({ item }) {
  const statusStyles = {
    running: 'text-emerald-300 bg-emerald-400/10 border-emerald-300/20',
    approval: 'text-orange-200 bg-orange-400/10 border-orange-300/25',
    draft: 'text-orange-100/40 bg-orange-50/[0.035] border-orange-300/12',
  };

  return (
    <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-orange-300/10 bg-black/22 p-4 hover:bg-orange-400/[0.045] transition-colors">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className={`px-2 py-1 rounded-lg border text-[9px] uppercase tracking-[0.16em] ${statusStyles[item.status]}`}>{item.status}</span>
          <span className="text-[9px] uppercase tracking-[0.16em] text-orange-100/25">{item.risk} risk</span>
        </div>
        <p className="text-[12px] leading-5 text-orange-50/78 sm:truncate">{item.title}</p>
        <p className="mt-1 text-[10px] text-orange-100/34">{item.metric}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-orange-200/24 shrink-0" />
    </div>
  );
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [intent, setIntent] = useState('Increase trial signups without increasing ad spend');
  const [mode, setMode] = useState('Suggest');
  const [queued, setQueued] = useState(TASKS[0]);
  const [submittedIntent, setSubmittedIntent] = useState('Increase trial signups without increasing ad spend');

  const displayName = useMemo(() => user?.displayName || user?.email?.split('@')[0] || 'Founder', [user]);

  const handleIntentSubmit = (e) => {
    e.preventDefault();
    if (!intent.trim()) return;
    setSubmittedIntent(intent.trim());
  };

  return (
    <div className="min-h-screen bg-[#050200] text-orange-50" style={{ fontFamily: FONT }}>
      <NoiseBackground />
      <div className="relative z-10 min-h-screen">
        <header className="sticky top-0 z-40 border-b border-orange-300/10 bg-[#050200]/88 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
            <GhostLogo size="w-9 h-9" compact />
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <div className="hidden sm:flex items-center gap-2 rounded-xl border border-orange-300/12 bg-orange-400/[0.035] px-3 py-2">
                <span className="w-2 h-2 rounded-full bg-orange-300 animate-pulse" />
                <span className="text-[10px] text-orange-100/42">{mode} Mode</span>
              </div>
              <button className="ghost-button-secondary !px-2.5 sm:!px-3 !py-2 flex items-center gap-2"><BellRing className="w-4 h-4" /><span className="hidden sm:inline">Alerts</span></button>
              <button onClick={signOut} className="ghost-button-secondary !px-2.5 sm:!px-3 !py-2 flex items-center gap-2"><LogOut className="w-4 h-4" /><span className="hidden sm:inline">Exit</span></button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-3 sm:px-6 py-5 sm:py-10">
          <section className="mb-8 grid lg:grid-cols-[1fr_0.42fr] gap-5 items-stretch">
            <div className="ghost-glass rounded-[1.4rem] sm:rounded-[1.8rem] p-5 sm:p-7 overflow-hidden relative">
              <div className="absolute -right-24 -top-24 w-64 h-64 bg-orange-500/12 rounded-full blur-3xl" />
              <div className="absolute left-12 bottom-0 w-72 h-24 bg-orange-300/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="ghost-tag"><Ghost className="w-3 h-3" /> Welcome back, {displayName}</span>
                  <span className="ghost-tag"><ShieldCheck className="w-3 h-3" /> Human approval on medium risk</span>
                  <span className="ghost-tag"><Sparkles className="w-3 h-3" /> Launch sprint active</span>
                </div>
                <h1 className="text-3xl min-[380px]:text-4xl sm:text-5xl font-black tracking-[-0.07em] leading-[0.95] max-w-3xl">Your ghost is shipping growth while you sleep.</h1>
                <p className="mt-4 max-w-2xl text-[13px] leading-7 text-orange-100/42">Tell it the outcome. It finds the bottleneck, runs small experiments, publishes safe work, and reports the lift with proof.</p>

                <div className="mt-6 grid min-[420px]:grid-cols-3 gap-3 max-w-3xl">
                  {FUNNEL_STAGES.map((stage) => (
                    <div key={stage.label} className="rounded-2xl border border-orange-300/12 bg-black/24 p-4">
                      <p className="text-[9px] tracking-[0.22em] uppercase text-orange-200/30">{stage.label}</p>
                      <div className="mt-2 flex items-end justify-between gap-3">
                        <p className="text-2xl font-black tracking-[-0.06em] text-orange-50">{stage.value}</p>
                        <span className="rounded-lg border border-emerald-300/20 bg-emerald-400/10 px-2 py-1 text-[10px] text-emerald-100/80">{stage.lift}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleIntentSubmit} className="mt-7 rounded-2xl border border-orange-300/14 bg-black/28 p-2">
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex-1 px-4 py-3 rounded-xl bg-orange-50/[0.035] border border-orange-300/10">
                      <p className="text-[9px] tracking-[0.28em] uppercase text-orange-200/32 mb-2">Intent Box</p>
                      <textarea value={intent} onChange={(e) => setIntent(e.target.value)} rows={2} className="w-full resize-none bg-transparent text-[13px] leading-6 text-orange-50 focus:outline-none" placeholder="What growth outcome do you want?" />
                    </div>
                    <button className="ghost-button flex items-center justify-center gap-2 md:w-44"><Send className="w-4 h-4" /> Set intent</button>
                  </div>
                </form>
              </div>
            </div>

            <div className="ghost-glass rounded-[1.4rem] sm:rounded-[1.8rem] p-5 sm:p-6 relative overflow-hidden">
              <div className="absolute -right-16 -bottom-16 w-44 h-44 rounded-full bg-orange-400/10 blur-3xl" />
              <div className="relative">
              <p className="text-[10px] tracking-[0.3em] uppercase text-orange-200/35 mb-4">Control level</p>
              <div className="grid gap-2 mb-5">
                {MODES.map((item) => (
                  <button key={item} onClick={() => setMode(item)} className={`text-left rounded-2xl border p-4 transition-all ${mode === item ? 'border-orange-300/36 bg-orange-400/10' : 'border-orange-300/10 bg-black/20 hover:bg-orange-400/[0.045]'}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-bold text-orange-50">{item} Mode</span>
                      {mode === item ? <PlayCircle className="w-4 h-4 text-orange-300" /> : <PauseCircle className="w-4 h-4 text-orange-200/22" />}
                    </div>
                    <p className="mt-2 text-[10px] leading-5 text-orange-100/35">{item === 'Autopilot' ? 'Execute safe work silently.' : item === 'Suggest' ? 'Draft and ask before action.' : 'Only advise, never execute.'}</p>
                  </button>
                ))}
              </div>
              <div className="rounded-2xl border border-orange-300/12 bg-black/25 p-4">
                <p className="text-[9px] tracking-[0.22em] uppercase text-orange-200/30 mb-2">Current mission</p>
                <p className="text-[12px] leading-6 text-orange-50/66">{submittedIntent}</p>
              </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {METRICS.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
          </section>

          <section className="grid lg:grid-cols-[0.92fr_1.08fr] gap-5 mb-8">
            <div className="ghost-glass rounded-[1.4rem] sm:rounded-[1.8rem] p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-orange-200/35 mb-1">Live feed</p>
                  <h2 className="text-xl font-black tracking-[-0.04em]">What the ghost did</h2>
                </div>
                <span className="ghost-tag"><Bot className="w-3 h-3" /> running</span>
              </div>
              <GhostLog lines={FEED_LINES} title="ghost feed" minHeight="min-h-[260px]" />
            </div>

            <div className="ghost-glass rounded-[1.4rem] sm:rounded-[1.8rem] p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-orange-200/35 mb-1">Experiments</p>
                  <h2 className="text-xl font-black tracking-[-0.04em]">Growth loops in motion</h2>
                </div>
                <span className="ghost-tag"><Sparkles className="w-3 h-3" /> 3 active</span>
              </div>
              <div className="space-y-3">
                {EXPERIMENTS.map((item) => <ExperimentRow key={item.title} item={item} />)}
              </div>
            </div>
          </section>

          <section className="grid lg:grid-cols-[1fr_0.8fr] gap-5 pb-8">
            <div className="ghost-glass rounded-[1.4rem] sm:rounded-[1.8rem] p-5 sm:p-6">
              <p className="text-[10px] tracking-[0.3em] uppercase text-orange-200/35 mb-4">Quick commands</p>
              <div className="grid md:grid-cols-2 gap-3">
                {TASKS.map((task) => (
                  <button key={task} onClick={() => setQueued(task)} className={`text-left rounded-2xl border p-4 transition-all ${queued === task ? 'border-orange-300/35 bg-orange-400/10' : 'border-orange-300/10 bg-black/22 hover:bg-orange-400/[0.045]'}`}>
                    <div className="flex items-start gap-3">
                      <MousePointer2 className="w-4 h-4 text-orange-300 mt-0.5 shrink-0" />
                      <span className="text-[12px] leading-6 text-orange-50/62">{task}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="ghost-glass rounded-[1.4rem] sm:rounded-[1.8rem] p-5 sm:p-6">
              <p className="text-[10px] tracking-[0.3em] uppercase text-orange-200/35 mb-4">Queued action</p>
              <div className="rounded-2xl border border-orange-300/14 bg-black/28 p-5 mb-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-300 mt-0.5" />
                  <div>
                    <p className="text-[13px] leading-6 text-orange-50/76">{queued}</p>
                    <p className="mt-2 text-[10px] leading-5 text-orange-100/35">Vuka Browser will turn this into a small, measurable experiment and report the outcome in the feed.</p>
                  </div>
                </div>
              </div>
              <button className="w-full ghost-button flex items-center justify-center gap-2"><Zap className="w-4 h-4" /> Queue for ghost</button>
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
}
