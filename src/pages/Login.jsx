import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { FONT, GhostLogo, NoiseBackground } from '../components/Brand';
import GhostLog from '../components/GhostLog';

const LOGIN_LINES = [
  { tag: 'SCAN', text: 'checking your growth workspace', tone: 'dim' },
  { tag: 'AUTH', text: 'secure Firebase session requested', tone: 'hot' },
  { tag: 'READY', text: 'dashboard will resume active experiments', tone: 'win' },
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
    <div className="min-h-screen bg-[#050200] text-orange-50" style={{ fontFamily: FONT }}>
      <NoiseBackground />
      <div className="relative z-10 min-h-screen grid lg:grid-cols-[1fr_0.95fr]">
        <section className="hidden lg:flex flex-col justify-between p-10 border-r border-orange-300/10 bg-orange-400/[0.015]">
          <Link to="/"><GhostLogo /></Link>
          <div className="max-w-lg">
            <div className="ghost-tag mb-6"><LockKeyhole className="w-3 h-3" /> Secure agent session</div>
            <h1 className="text-5xl font-black tracking-[-0.07em] leading-[0.95] mb-6">Return to the ghost in your funnel.</h1>
            <p className="text-[13px] leading-7 text-orange-100/42 mb-8">Sign in and see what GrowthGhost observed, tested, shipped, paused, or queued while you were gone.</p>
            <GhostLog lines={LOGIN_LINES} title="session boot" minHeight="min-h-[145px]" />
          </div>
          <p className="text-[10px] tracking-[0.24em] uppercase text-orange-200/25">GrowthGhost / Results feed first</p>
        </section>

        <section className="flex items-center justify-center px-3 sm:px-4 py-6 sm:py-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="w-full max-w-md">
            <div className="lg:hidden mb-6 sm:mb-8 flex justify-between items-center gap-3">
              <Link to="/"><GhostLogo compact size="w-10 h-10" /></Link>
              <Link to="/" className="shrink-0 text-[11px] text-orange-100/42 flex items-center gap-2"><ArrowLeft className="w-3.5 h-3.5" /> Back</Link>
            </div>

            <div className="ghost-glass rounded-[1.4rem] sm:rounded-[1.7rem] p-5 sm:p-8">
              <div className="mb-8">
                <p className="text-[10px] tracking-[0.3em] uppercase text-orange-200/35 mb-3">Sign in</p>
                <h2 className="text-2xl sm:text-3xl font-black tracking-[-0.05em]">Open the command room.</h2>
                <p className="mt-3 text-[12px] leading-6 text-orange-100/38">Your Ghost Feed is waiting.</p>
              </div>

              <form onSubmit={handleEmailLogin} className="space-y-4">
                <label className="block">
                  <span className="text-[10px] text-orange-100/38 mb-2 block">Email</span>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-200/25" />
                    <input className="ghost-input pl-11" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="founder@company.com" required />
                  </div>
                </label>
                <label className="block">
                  <span className="text-[10px] text-orange-100/38 mb-2 block">Password</span>
                  <div className="relative">
                    <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-200/25" />
                    <input className="ghost-input pl-11 pr-11" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                    <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-200/30 hover:text-orange-200/70">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </label>

                {error && <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-[11px] text-red-200/80">{error}</div>}

                <button type="submit" disabled={loading} className="w-full ghost-button flex items-center justify-center gap-2">
                  {loading ? 'Opening...' : 'Enter GrowthGhost'} <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <p className="mt-6 text-center text-[11px] text-orange-100/35">No ghost yet? <Link to="/signup" className="text-orange-300 hover:text-orange-200">Create one</Link></p>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
