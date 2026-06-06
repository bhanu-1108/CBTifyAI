import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Mail, Lock, Cpu, Eye, EyeOff, AlertCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const LoginPage = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    // Simulate minor delay for realism
    setTimeout(() => {
      try {
        login(email, password);
        setLoading(false);
        navigate('/');
      } catch (err) {
        setLoading(false);
        setError('Invalid login credentials.');
      }
    }, 1000);
  };

  const autofill = (type) => {
    if (type === 'student') {
      setEmail('student@cbtify.ai');
      setPassword('password');
    } else {
      setEmail('school@cbtify.ai');
      setPassword('password');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 grid-bg">
      {/* Background Gradients */}
      <div className="glow-orb-blue top-10 left-10"></div>
      <div className="glow-orb-purple bottom-10 right-10"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2.5 mb-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-accentBlue to-purpleGlow flex items-center justify-center shadow-glowBlue">
              <Cpu className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">CBTify AI</span>
          </Link>
          <h2 className="text-2xl font-bold text-white">Welcome back</h2>
          <p className="text-xs text-mutedGray mt-1.5">Sign in to resume creating interactive exams.</p>
        </div>

        {/* Card Form */}
        <GlassCard glowColor="blue" className="p-8">
          {error && (
            <div className="flex items-center space-x-2.5 p-3.5 mb-5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              <AlertCircle className="w-4.5 h-4.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-mutedGray">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@institution.edu"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-accentBlue focus:border-accentBlue transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <Link to="/forgot-password" className="text-[11px] text-accentBlue hover:text-cyanAccent transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-mutedGray">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-accentBlue focus:border-accentBlue transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-mutedGray hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accentBlue via-purpleGlow to-cyanAccent text-white text-xs font-semibold hover:scale-[1.02] active:scale-95 disabled:scale-100 disabled:opacity-50 transition-all flex items-center justify-center"
            >
              {loading ? 'Securing connection...' : 'Sign In'}
            </button>
          </form>

          {/* Quick Seseeded Logins */}
          <div className="mt-6 pt-5 border-t border-white/5 text-center">
            <span className="text-[10px] text-mutedGray uppercase tracking-widest block mb-3">Quick Demo Logins</span>
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => autofill('student')}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                Student Demo
              </button>
              <button
                onClick={() => autofill('org')}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                Institute Demo
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Footer info */}
        <p className="text-center text-xs text-mutedGray mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-accentBlue font-medium hover:text-cyanAccent transition-colors">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
