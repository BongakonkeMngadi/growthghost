import { motion } from 'framer-motion';
import { Bell, CheckCircle2, Flame, PlayCircle, Shield, Target, Zap } from 'lucide-react';
import { FONT } from '../components/Brand';

const FEED = [
  { t:'Today 09:14',      tag:'WIN',        txt:'LinkedIn post series outperforming X by 2.6x on click quality',              sub:'+34 qualified visits in 4 hours',                       b:'border-l-emerald-500', tc:'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  { t:'Today 08:51',      tag:'QUEUE',      txt:'Reddit r/SaaS reply sequence ready — waiting for your approval',             sub:'3 replies drafted, medium risk flagged',                 b:'border-l-orange-400',  tc:'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  { t:'Today 07:30',      tag:'PAUSE',      txt:'Paused Google Ads campaign: CAC hit 3.4x above target',                      sub:'Saved est. R2,400 in wasted spend',                     b:'border-l-red-500',     tc:'bg-red-500/10 text-red-400 border-red-500/20' },
  { t:'Today 06:15',      tag:'POST',       txt:'Published 3 founder-led clips to LinkedIn and X',                            sub:'Scheduled at peak engagement window',                   b:'border-l-blue-400',    tc:'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { t:'Yest. 22:40',      tag:'MEASURE',    txt:'Headline test concluded: variant B won with +11.2% signup intent',           sub:'Variant B now live on landing page',                    b:'border-l-white/20',    tc:'bg-white/5 text-white/50 border-white/10' },
  { t:'Yest. 21:05',      tag:'ACT',        txt:'Launched A/B test on pricing page — 2 variants, 50/50 split',               sub:'Auto-conclude in 48h',                                  b:'border-l-orange-400',  tc:'bg-orange-500/10 text-orange-400 border-orange-500/20' },
];

const ACCOUNTS = [
  { n:'growthsaas.io',    s:'website',   c:'green'  },
  { n:'Google Analytics', s:'analytics', c:'green'  },
  { n:'LinkedIn',         s:'social',    c:'green'  },
  { n:'X / Twitter',      s:'social',    c:'green'  },
  { n:'Mailchimp',        s:'email',     c:'yellow' },
];

const METRICS = [
  { v:'+31%',   l:'Qualified traffic'  },
  { v:'+14',    l:'New trial signups'  },
  { v:'R2,400', l:'Ad spend saved'    },
  { v:'3',      l:'Experiments live'  },
];

const MODES = ['Autopilot', 'Suggest', 'Manual'];

function Dot({ c }) {
  const col = c === 'green' ? 'bg-emerald-500' : c === 'yellow' ? 'bg-yellow-400' : 'bg-red-500';
  return <span className={`w-2 h-2 rounded-full shrink-0 ${col}`} />;
}

function Pulse({ c }) {
  const cls = c === 'green' ? 'bg-emerald-500' : 'bg-orange-400';
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${cls}`} />
      <span className={`relative inline-flex rounded-full h-2 w-2 ${cls}`} />
    </span>
  );
}

function Card({ children, className = '' }) {
  return (
    <div className={`bg-white/[0.04] border border-white/[0.08] rounded-xl ${className}`}>
      {children}
    </div>
  );
}

export default function Screenshot() {
  return (
    <div className="min-h-screen bg-[#050200] text-white overflow-hidden select-none" style={{ fontFamily: FONT }}>

      {/* 2px orange accent bar at very top */}
      <div className="fixed top-0 inset-x-0 h-[2px] bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600 z-50" />

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[700px] h-[700px] bg-orange-500/[0.07] rounded-full blur-[160px]" />
        <div className="absolute inset-0 opacity-[0.028]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.14) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.14) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
      </div>

      {/* Header */}
      <header className="relative z-20 mt-[2px] h-12 border-b border-white/[0.06] bg-[#050200]/85 backdrop-blur-xl flex items-center px-5 gap-4">
        <span className="text-[13px] font-black tracking-tight text-white">Handio</span>
        <div className="absolute left-1/2 -translate-x-1/2 text-[11px] text-white/35 tracking-widest uppercase" style={{ letterSpacing: '0.18em' }}>
          Dashboard / Proof Feed
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-[10px] font-bold text-orange-300">B</div>
            <span className="text-[11px] text-white/60">Bonga Ngema</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/22">
            <Bell className="w-3 h-3 text-orange-400" />
            <span className="text-[10px] text-orange-400 font-semibold">1 pending</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <Pulse c="green" />
            <span className="text-[10px] text-emerald-400 font-semibold">Agent running</span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="relative z-10 flex h-[calc(100vh-50px)]">

        {/* LEFT SIDEBAR */}
        <aside className="w-[210px] border-r border-white/[0.06] flex flex-col p-4 gap-5 overflow-hidden shrink-0">

          <div>
            <p className="text-[8px] font-semibold tracking-[0.22em] uppercase text-white/28 mb-3">Connected Accounts</p>
            <div className="space-y-2.5">
              {ACCOUNTS.map(a => (
                <div key={a.n} className="flex items-center gap-2.5">
                  <Dot c={a.c} />
                  <div className="min-w-0">
                    <p className="text-[11px] text-white/78 truncate leading-tight">{a.n}</p>
                    <p className="text-[9px] text-white/28">{a.s}{a.c === 'yellow' ? ' · syncing' : ''}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[8px] font-semibold tracking-[0.22em] uppercase text-white/28 mb-2">Active Mission</p>
            <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-3">
              <p className="text-[10px] text-white/55 italic leading-relaxed">"Get 200 trial signups before end of month"</p>
            </div>
          </div>

          <div>
            <p className="text-[8px] font-semibold tracking-[0.22em] uppercase text-white/28 mb-2">Control Mode</p>
            <div className="flex flex-col gap-1.5">
              {MODES.map(m => {
                const active = m === 'Autopilot';
                return (
                  <div key={m} className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-[11px] ${active ? 'bg-orange-500/10 border border-orange-500/25 text-orange-400' : 'bg-white/[0.03] border border-white/[0.06] text-white/35'}`}>
                    {active ? <PlayCircle className="w-3.5 h-3.5 shrink-0" /> : <Zap className="w-3.5 h-3.5 opacity-40 shrink-0" />}
                    <span className={active ? 'font-bold' : 'font-medium'}>{m}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-auto flex items-center gap-2 pt-3 border-t border-white/[0.06]">
            <Pulse c="green" />
            <span className="text-[9px] text-white/35">Agent uptime: 6d 14h</span>
          </div>
        </aside>

        {/* CENTER — PROOF FEED */}
        <main className="flex-1 flex flex-col min-w-0 p-5 overflow-hidden">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <div>
              <h2 className="text-[15px] font-black tracking-[-0.04em] text-white">Proof Feed</h2>
              <p className="text-[10px] text-white/30 mt-0.5">Everything the agent shipped — newest first</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.07]">
              <Pulse c="orange" />
              <span className="text-[10px] text-white/45 font-medium">47 actions this week</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 overflow-hidden flex-1">
            {FEED.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className={`flex items-start gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] border-l-[3px] ${e.b} hover:bg-white/[0.055] transition-colors`}
              >
                <span className="text-[10px] text-white/28 shrink-0 w-[80px] pt-0.5 leading-tight">{e.t}</span>
                <div className="min-w-0 flex-1">
                  <span className={`inline-block px-2 py-0.5 rounded-md text-[8px] font-bold tracking-[0.14em] uppercase border mb-1.5 ${e.tc}`}>{e.tag}</span>
                  <p className="text-[12px] text-white/80 leading-snug">{e.txt}</p>
                  <p className="text-[10px] text-white/38 mt-0.5">{e.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </main>

        {/* RIGHT — LIVE PANEL */}
        <aside className="w-[300px] border-l border-white/[0.06] flex flex-col p-4 gap-3 overflow-hidden shrink-0">

          {/* Metrics */}
          <Card className="p-4">
            <p className="text-[8px] font-semibold tracking-[0.22em] uppercase text-white/28 mb-3">Metrics This Week</p>
            <div className="grid grid-cols-2 gap-2">
              {METRICS.map(m => (
                <div key={m.l} className="rounded-lg bg-white/[0.035] border border-white/[0.06] p-3">
                  <p className="text-[20px] font-black tracking-[-0.05em] text-white leading-none">{m.v}</p>
                  <p className="text-[9px] text-white/35 mt-1.5">{m.l}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Approval */}
          <Card className="p-4 !border-orange-500/25 !bg-orange-500/[0.04]">
            <div className="flex items-center gap-2 mb-2.5">
              <Shield className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <p className="text-[11px] font-bold text-white/85">Action needs your sign-off</p>
            </div>
            <p className="text-[11px] text-white/48 leading-relaxed mb-3">
              Reddit r/SaaS reply sequence — 3 targeted replies to founders discussing growth automation tools.
            </p>
            <div className="flex gap-2 mb-2.5">
              <button className="flex-1 py-2 rounded-lg bg-orange-500 text-[11px] font-bold text-[#1a0600]">Approve</button>
              <button className="flex-1 py-2 rounded-lg bg-white/[0.04] border border-white/[0.1] text-[11px] font-medium text-white/50">Review first</button>
            </div>
            <p className="text-[9px] text-white/28">Handio flagged this as medium risk — brand-visible action.</p>
          </Card>

          {/* Next planned action */}
          <Card className="p-4 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-2.5">
              <Target className="w-3.5 h-3.5 text-white/45 shrink-0" />
              <p className="text-[11px] font-bold text-white/78">What the agent is planning</p>
            </div>
            <p className="text-[11px] text-white/40 leading-relaxed italic flex-1">
              "Draft an email follow-up to 41 trial users who signed up but never activated their account."
            </p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
              <span className="px-2 py-1 rounded-md text-[8px] font-bold tracking-[0.12em] uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Low Risk</span>
              <span className="text-[10px] text-white/35 font-mono">Auto-execute in 1h 58m</span>
            </div>
          </Card>

          {/* Experiment queue */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <p className="text-[11px] font-bold text-white/70">Experiment Queue</p>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Founder pain headline test',   status: 'Running', color: 'text-emerald-400' },
                { name: 'LinkedIn proof thread series', status: 'Running', color: 'text-emerald-400' },
                { name: 'Pricing page trust module',    status: 'Queued',  color: 'text-orange-400'  },
              ].map(exp => (
                <div key={exp.name} className="flex items-center justify-between">
                  <span className="text-[10px] text-white/45">{exp.name}</span>
                  <span className={`text-[10px] font-semibold ${exp.color}`}>{exp.status}</span>
                </div>
              ))}
            </div>
          </Card>

        </aside>
      </div>
    </div>
  );
}
