import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { FONT, GhostLogo, NoiseBackground } from '../components/Brand';
import GhostLog from '../components/GhostLog';

const SIGNUP_LINES = [
  { tag: 'SETUP', text: 'creating first growth workspace', tone: 'dim' },
  { tag: 'INTAKE', text: 'waiting for your north-star metric', tone: 'hot' },
  { tag: 'MODE', text: 'starts in Suggest Mode by default', tone: 'normal' },
  { tag: 'READY', text: 'Ghost Feed will show actions and outcomes', tone: 'win' },
];

const PROMISES = [
  'Minimal dashboard: intent, feed, metrics, controls',
  'No feature maze — proof of work is the product',
  'Starts cautious, earns more autonomy over time',
];

export default function Signup() {
  const navigate = useNavigate();
  const { signUpWithEmail } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await signUpWithEmail(email, password, displayName);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.message || 'Could not create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050200] text-orange-50" style={{ fontFamily: FONT }}>
      <NoiseBackground />
      <div className="relative z-10 min-h-screen grid lg:grid-cols-[0.95fr_1fr]">
        <section className="flex items-center justify-center px-3 sm:px-4 py-2 sm:py-6 order-2 lg:order-1">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="w-full max-w-[30rem]">
            <div className="lg:hidden mb-3 sm:mb-5 flex justify-between items-center gap-3">
              <Link to="/"><GhostLogo compact size="w-10 h-10" /></Link>
              <Link to="/" className="shrink-0 text-[11px] text-orange-100/42 flex items-center gap-2"><ArrowLeft className="w-3.5 h-3.5" /> Back</Link>
            </div>

            <div className="ghost-glass rounded-[1.2rem] sm:rounded-[1.5rem] p-4 sm:p-5">
              <div className="mb-4 sm:mb-5">
                <p className="text-[10px] tracking-[0.24em] uppercase text-orange-200/35 mb-2">Create ghost</p>
                <h2 className="text-[1.35rem] sm:text-[1.7rem] font-black tracking-[-0.05em] leading-tight">Start with one intent.</h2>
                <p className="mt-2 text-[11px] leading-5 text-orange-100/38">GrowthGhost begins by learning what outcome you want.</p>
              </div>

              <form onSubmit={handleSignup} className="space-y-3">
                <div className="grid min-[420px]:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-[10px] text-orange-100/38 mb-1.5 block">Name</span>
                    <div className="relative"><UserRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-200/25" /><input className="ghost-input pl-11" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Bonga" required /></div>
                  </label>
                  <label className="block">
                    <span className="text-[10px] text-orange-100/38 mb-1.5 block">Email</span>
                    <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-200/25" /><input className="ghost-input pl-11" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="founder@company.com" required /></div>
                  </label>
                </div>
                <div className="grid min-[420px]:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-[10px] text-orange-100/38 mb-1.5 block">Password</span>
                    <div className="relative"><LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-200/25" /><input className="ghost-input pl-11 pr-10" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" minLength={6} required /><button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-200/30 hover:text-orange-200/70">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div>
                  </label>
                  <label className="block">
                    <span className="text-[10px] text-orange-100/38 mb-1.5 block">Confirm</span>
                    <input className="ghost-input" type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" minLength={6} required />
                  </label>
                </div>

                {error && <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2.5 text-[11px] text-red-200/80">{error}</div>}

                <button type="submit" disabled={loading} className="w-full ghost-button flex items-center justify-center gap-2">
                  {loading ? 'Creating...' : 'Hire your Ghost'} <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <p className="mt-4 text-center text-[11px] text-orange-100/35">Already have access? <Link to="/login" className="text-orange-300 hover:text-orange-200">Sign in</Link></p>
            </div>
          </motion.div>
        </section>

        <section className="hidden lg:flex flex-col justify-between p-10 border-l border-orange-300/10 bg-orange-400/[0.015] order-1 lg:order-2">
          <Link to="/"><GhostLogo /></Link>
          <div className="max-w-lg">
            <div className="ghost-tag mb-6">Built around outcomes</div>
            <h1 className="text-5xl font-black tracking-[-0.07em] leading-[0.95] mb-6">A growth agent you understand at a glance.</h1>
            <div className="space-y-3 mb-8">{PROMISES.map((item) => <div key={item} className="flex items-start gap-3 rounded-2xl border border-orange-300/12 bg-black/25 p-4"><CheckCircle2 className="w-4 h-4 text-orange-300 mt-0.5 shrink-0" /><span className="text-[12px] leading-6 text-orange-100/48">{item}</span></div>)}</div>
            <GhostLog lines={SIGNUP_LINES} title="onboarding preview" minHeight="min-h-[175px]" />
          </div>
          <p className="text-[10px] tracking-[0.24em] uppercase text-orange-200/25">No dark patterns / just dark mode</p>
        </section>
      </div>
    </div>
  );
}
