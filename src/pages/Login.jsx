import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { FONT, GhostLogo, NoiseBackground } from '../components/Brand';
import GhostLog from '../components/GhostLog';

const LOG_LINES = [
  { tag: 'CONNECT', text: 'checking linked analytics and social accounts' },
  { tag: 'RESUME', text: 'loading experiments that ran while you were away' },
  { tag: 'QUEUE', text: 'found 1 action waiting for your approval' },
  { tag: 'READY', text: 'your proof feed is up to date' },
];

export default function Login() {
  const navigate = useNavigate();
  const { signInWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.message || 'Could not sign in. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex" style={{ fontFamily: FONT }}>
      <NoiseBackground />

      <div className="hidden lg:flex lg:w-[46%] relative flex-col justify-between p-12 border-r border-black/[0.06] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-transparent" />
        <div className="relative z-10">
          <motion.div initial={{ y: -10 }} animate={{ y: 0 }} className="flex items-center gap-3 mb-12">
            <Link to="/" className="flex items-center gap-3"><GhostLogo /></Link>
          </motion.div>

          <motion.div initial={{ y: 16 }} animate={{ y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
            <p className="text-[10px] font-medium text-black tracking-[0.3em] uppercase mb-4">Welcome back</p>
            <h1 className="text-3xl font-bold text-black leading-[1.15] mb-4 tracking-tight">
              Your agent kept working<br />
              <span className="text-black">while you were gone.</span>
            </h1>
            <p className="text-[12px] font-medium text-black leading-relaxed">Sign in to see every experiment shipped, every campaign paused, and what Vuka Browser wants approval to run next.</p>
          </motion.div>

          <motion.div initial={{ y: 10 }} animate={{ y: 0 }} transition={{ delay: 0.25 }}>
            <GhostLog lines={LOG_LINES} title="Agent running" minHeight="min-h-[140px]" />
          </motion.div>
        </div>

        <motion.div initial={false} animate={{}} transition={{ delay: 0.4 }} className="relative z-10 flex flex-wrap gap-2">
          {['Growth Feed', 'Autopilot', 'Campaigns', 'Proof Log'].map((label) => (
            <div key={label} className="px-2.5 py-1.5 rounded-lg border border-black/[0.07] bg-black/[0.03] text-[10px] font-medium text-black">{label}</div>
          ))}
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:p-6 relative z-10">
        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <Link to="/" className="flex items-center gap-3"><GhostLogo size="w-8 h-8" /></Link>
          </div>

          <div className="mb-6 sm:mb-8">
            <p className="text-[10px] font-medium text-black tracking-[0.28em] uppercase mb-2">Welcome back</p>
            <h2 className="text-xl font-bold text-black mb-1.5 tracking-tight">See what your ghost shipped.</h2>
            <p className="text-[12px] font-medium text-black">Sign in to open your proof feed and control panel.</p>
          </div>

          {error && <motion.div initial={{ y: -8 }} animate={{ y: 0 }} className="mb-5 p-3.5 rounded-xl bg-black/[0.04] border border-black/15 text-black text-[12px]">{error}</motion.div>}

          <form onSubmit={handleEmailLogin} className="space-y-3">
            <div className="relative group">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black group-focus-within:text-black transition-colors" />
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-black/[0.04] border border-black/10 rounded-xl px-4 py-3 pl-10 text-black text-[13px] placeholder:text-black focus:outline-none focus:border-black/30 focus:bg-black/[0.06] transition-all" style={{ fontFamily: FONT }} />
            </div>

            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-black group-focus-within:text-black transition-colors" />
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-black/[0.04] border border-black/10 rounded-xl px-4 py-3 pl-10 pr-10 text-black text-[13px] placeholder:text-black focus:outline-none focus:border-black/30 focus:bg-black/[0.06] transition-all" style={{ fontFamily: FONT }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black hover:text-black transition-colors">
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>

            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-black hover:bg-black/90 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[13px] font-semibold transition-all hover:scale-[1.01] active:scale-[0.99]">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Sign in</span><ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-medium text-black">
            <Shield className="w-3 h-3 shrink-0" />
            <span className="text-center font-medium">End-to-end encrypted · You approve all sensitive actions · Your data stays yours</span>
          </div>

          <p className="mt-6 text-center text-[11px] font-medium text-black">No account yet? <Link to="/signup" className="text-black hover:text-black transition-colors">Create one →</Link></p>
        </motion.div>
      </div>
    </div>
  );
}
