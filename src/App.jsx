import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

const FONT = "'Iosevka','JetBrains Mono',monospace";

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#050200] flex items-center justify-center" style={{ fontFamily: FONT }}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-14 h-14 flex items-center justify-center">
          <img src="/logo_x.png" alt="Vuka Browser logo" className="h-full w-full object-contain" />
        </div>
        <p className="text-orange-200/40 text-[10px] tracking-[0.32em] uppercase">Summoning ghost...</p>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
