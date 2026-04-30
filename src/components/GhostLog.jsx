import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FONT } from './Brand';

const DEFAULT_LINES = [
  { tag: 'SCAN', text: 'found traffic moving, signups flat' },
  { tag: 'IDEA', text: 'new headline test queued' },
  { tag: 'SHIP', text: 'posted launch copy to X and LinkedIn' },
  { tag: 'CHECK', text: 'measured clicks, paused weak angle' },
  { tag: 'DONE', text: 'growth work logged with proof' },
];

export default function GhostLog({ lines = DEFAULT_LINES, title = 'Agent running', minHeight = 'min-h-[160px]' }) {
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
        setTimeout(() => setCycle((v) => v + 1), 3000);
      }
    }, 850);
    return () => clearInterval(timer);
  }, [cycle, lines.length]);

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-white/[0.03]" style={{ fontFamily: FONT }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white/15" />
          <div className="w-2 h-2 rounded-full bg-white/15" />
          <div className="w-2 h-2 rounded-full bg-white/15" />
        </div>
        <div className="flex items-center gap-1.5">
          <motion.div className="w-1.5 h-1.5 rounded-full bg-white/60" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span className="text-[9px] text-white/30 tracking-[0.25em] uppercase">{title}</span>
        </div>
      </div>
      <div className={`p-4 space-y-2.5 ${minHeight}`}>
        {lines.map((line, i) => (
          <motion.div
            key={`${cycle}-${line.tag}-${i}`}
            initial={{ opacity: 0, x: -8 }}
            animate={shown > i ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2.5 text-[10px]"
          >
            <span className="px-1.5 py-0.5 rounded border border-white/15 bg-white/[0.06] text-white/50 tracking-widest shrink-0">{line.tag}</span>
            <span className="text-white/30 truncate">{line.text}</span>
          </motion.div>
        ))}
        {shown > 0 && shown < lines.length && <motion.span className="inline-block w-1.5 h-3.5 bg-white/30 rounded-sm ml-1" animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} />}
      </div>
    </div>
  );
}
