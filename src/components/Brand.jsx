import { motion } from 'framer-motion';

export const FONT = "'Iosevka','JetBrains Mono',monospace";

export function GhostLogo({ size = 'w-10 h-10', compact = false }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3" style={{ fontFamily: FONT }}>
      <motion.div
        className={`${size} relative shrink-0 flex items-center justify-center`}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img src="/logo_x.png" alt="Vuka Browser logo" className="h-full w-full object-contain opacity-90" />
      </motion.div>
      {!compact && (
        <div className="min-w-0">
          <div className="truncate text-[13px] sm:text-[14px] font-bold tracking-tight text-black">Vuka Browser</div>
          <div className="hidden sm:block truncate text-[9px] font-medium tracking-[0.24em] uppercase text-black">Autonomous Growth Agent</div>
        </div>
      )}
    </div>
  );
}

export function NoiseBackground() {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.08),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0)_0%,#fff_88%)]" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.2) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
    </>
  );
}
