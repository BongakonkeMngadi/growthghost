import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FONT } from './Brand';

const DEFAULT_LINES = [
  { tag: 'OBSERVE', text: 'read analytics: signups flat, traffic rising', tone: 'dim' },
  { tag: 'HYPOTHESIS', text: 'landing page promise is unclear for founders', tone: 'hot' },
  { tag: 'ACT', text: 'tested 3 homepage headlines', tone: 'normal' },
  { tag: 'POST', text: 'published 5 founder-focused posts', tone: 'normal' },
  { tag: 'MEASURE', text: 'conversion rate increased +8.4%', tone: 'win' },
];

export default function GhostLog({ lines = DEFAULT_LINES, title = 'Ghost activity', minHeight = 'min-h-[190px]' }) {
  const [shown, setShown] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    setShown(0);
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= lines.length) {
        clearInterval(timer);
        setTimeout(() => setCycle((v) => v + 1), 3600);
      }
    }, 760);
    return () => clearInterval(timer);
  }, [cycle, lines.length]);

  const toneClass = (tone) => {
    if (tone === 'win') return 'text-emerald-300 border-emerald-300/20 bg-emerald-400/10';
    if (tone === 'hot') return 'text-orange-200 border-orange-300/25 bg-orange-400/12';
    if (tone === 'dim') return 'text-orange-100/35 border-orange-300/10 bg-orange-400/5';
    return 'text-orange-100/55 border-orange-300/14 bg-orange-400/7';
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-orange-300/14 bg-black/30 shadow-2xl" style={{ fontFamily: FONT }}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-orange-300/10 bg-orange-400/[0.035]">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-orange-300/30" />
          <div className="w-2 h-2 rounded-full bg-orange-300/20" />
          <div className="w-2 h-2 rounded-full bg-orange-300/10" />
        </div>
        <div className="flex items-center gap-2">
          <motion.div className="w-1.5 h-1.5 rounded-full bg-orange-300" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
          <span className="text-[9px] text-orange-100/35 tracking-[0.26em] uppercase">{title}</span>
        </div>
      </div>
      <div className={`p-4 space-y-2.5 ${minHeight}`}>
        {lines.map((line, i) => (
          <motion.div
            key={`${cycle}-${line.tag}-${i}`}
            initial={{ opacity: 0, x: -8 }}
            animate={shown > i ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.28 }}
            className="flex items-start gap-2.5 text-[10px]"
          >
            <span className={`px-2 py-1 rounded-lg border tracking-[0.16em] shrink-0 ${toneClass(line.tone)}`}>{line.tag}</span>
            <span className="min-w-0 leading-5 text-orange-50/45 sm:truncate">{line.text}</span>
          </motion.div>
        ))}
        {shown > 0 && shown < lines.length && <motion.span className="inline-block w-1.5 h-3.5 bg-orange-300/50 rounded-sm ml-1" animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} />}
      </div>
    </div>
  );
}
