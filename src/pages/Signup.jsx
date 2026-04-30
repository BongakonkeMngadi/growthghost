import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Eye, EyeOff, Loader2, Lock, Mail, Shield, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { FONT, GhostLogo, NoiseBackground } from '../components/Brand';

const PERKS = [
  'Connect your website, Google Analytics, LinkedIn, X, and email tool in minutes.',
  'Set one goal — the agent breaks it into experiments and starts shipping.',
  'Every action appears in a live proof feed. Nothing happens in the dark.',
  'Risky or expensive moves always require your explicit approval first.',
];

export default function Signup() {
  const navigate = useNavigate();
  const { signUpWithEmail } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await signUpWithEmail(email, password, displayName.trim() || undefined);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.message || 'Could not create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex" style={{ fontFamily: FONT }}>
      <NoiseBackground />

      <div className="hidden lg:flex lg:w-[46%] relative flex-col justify-between p-12 border-r border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.015] to-transparent" />
        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-12">
            <Link to="/" className="flex items-center gap-3"><GhostLogo /></Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10">
            <p className="text-[10px] text-white/25 tracking-[0.3em] uppercase mb-4">Get started</p>
            <h1 className="text-3xl font-bold text-white leading-[1.15] mb-4 tracking-tight">
              A growth marketer<br />
              <span className="text-white/35">running 24 hours a day.</span>
            </h1>
            <p className="text-[12px] text-white/30 leading-relaxed max-w-xs">Connect your accounts, set your goal, and let Vuka Browser run experiments, post content, and report what moved.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-3">
            {PERKS.map((perk, i) => (
              <motion.div key={perk} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.07 }} className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-white/40 shrink-0" />
                <span className="text-[12px] text-white/45">{perk}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="relative z-10 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
          <p className="text-[9px] text-white/20 tracking-[0.2em] uppercase mb-2">What happens after you connect</p>
          <p className="text-[11px] text-white/35 leading-relaxed font-mono">Watch analytics → Form hypothesis → Ship experiment → Measure → Repeat</p>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:p-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <Link to="/" className="flex items-center gap-3"><GhostLogo size="w-8 h-8" /></Link>
          </div>

          <div className="mb-6 sm:mb-8">
            <p className="text-[10px] text-white/25 tracking-[0.28em] uppercase mb-2">Create account</p>
            <h2 className="text-xl font-bold text-white mb-1.5 tracking-tight">Hire your growth agent.</h2>
            <p className="text-[12px] text-white/30">Takes 2 minutes. Connect your accounts, set your goal, watch it work.</p>
          </div>

          {error && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-5 p-3.5 rounded-xl bg-white/[0.04] border border-white/15 text-white/70 text-[12px]">{error}</motion.div>}

          <form onSubmit={handleSignup} className="space-y-3">
            <div className="relative group">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 group-focus-within:text-white/50 transition-colors" />
              <input type="text" placeholder="Full name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 pl-10 text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all" style={{ fontFamily: FONT }} />
            </div>

            <div className="relative group">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 group-focus-within:text-white/50 transition-colors" />
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 pl-10 text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all" style={{ fontFamily: FONT }} />
            </div>

            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 group-focus-within:text-white/50 transition-colors" />
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 pl-10 pr-10 text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all" style={{ fontFamily: FONT }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/45 transition-colors">
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 group-focus-within:text-white/50 transition-colors" />
              <input type={showConfirm ? 'text' : 'password'} placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 pl-10 pr-10 text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all" style={{ fontFamily: FONT }} />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/45 transition-colors">
                {showConfirm ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>

            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed text-black text-[13px] font-semibold transition-all hover:scale-[1.01] active:scale-[0.99]">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Create account</span><ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5 text-[10px] text-white/30">
            <Shield className="w-3 h-3 shrink-0" />
            <span className="text-center">End-to-end encrypted · You approve all sensitive actions · Your data stays yours</span>
          </div>

          <p className="mt-6 text-center text-[11px] text-white/30">Already have an account? <Link to="/login" className="text-white/70 hover:text-white transition-colors">Sign in →</Link></p>
        </motion.div>
      </div>
    </div>
  );
}
