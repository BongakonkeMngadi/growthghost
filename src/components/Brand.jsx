import { motion } from 'framer-motion';

export const FONT = "'Iosevka','JetBrains Mono',monospace";

export function GhostLogo({ size = 'w-10 h-10', compact = false }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3" style={{ fontFamily: FONT }}>
      <motion.div
        className={`${size} relative shrink-0 flex items-center justify-center`}
        animate={{ y: [0, -5, 0], rotate: [0, -2, 2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img src="/logo_x.png" alt="GrowthGhost logo" className="h-full w-full object-contain" />
      </motion.div>
      {!compact && (
        <div className="min-w-0">
          <div className="truncate text-[13px] sm:text-[14px] font-black tracking-tight text-orange-50">GrowthGhost</div>
          <div className="hidden sm:block truncate text-[9px] tracking-[0.24em] uppercase text-orange-200/35">Autonomous Growth Agent</div>
        </div>
      )}
    </div>
  );
}

export function NoiseBackground() {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none opacity-[0.045]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_10%,rgba(249,115,22,0.18),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(251,146,60,0.12),transparent_30%),linear-gradient(180deg,rgba(5,2,0,0)_0%,#050200_86%)]" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(251,146,60,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(251,146,60,0.22) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
    </>
  );
}
