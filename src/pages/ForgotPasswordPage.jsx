import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Mail, Cpu, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const ForgotPasswordPage = () => {
  const { forgotPassword } = useApp();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      try {
        forgotPassword(email);
        setLoading(false);
        setSuccess('We have sent password recovery instructions to your email address.');
      } catch (err) {
        setLoading(false);
        setError('No account found with this email.');
      }
    }, 1000);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 grid-bg">
      <div className="glow-orb-blue top-10 left-10"></div>
      <div className="glow-orb-purple bottom-10 right-10"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2.5 mb-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-accentBlue to-purpleGlow flex items-center justify-center shadow-glowBlue">
              <Cpu className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">CBTify AI</span>
          </Link>
          <h2 className="text-2xl font-bold text-white">Reset password</h2>
          <p className="text-xs text-mutedGray mt-1.5">Enter your email to receive recovery instructions.</p>
        </div>

        {/* Card Panel */}
        <GlassCard glowColor="cyan" className="p-8">
          {error && (
            <div className="flex items-center space-x-2.5 p-3.5 mb-5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              <AlertCircle className="w-4.5 h-4.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="text-center space-y-4 py-4 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto text-green-400">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-white">Instructions sent</h3>
              <p className="text-xs text-mutedGray leading-relaxed">{success}</p>
              <div className="pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center space-x-2 text-xs font-semibold text-accentBlue hover:text-cyanAccent transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to login</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
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
                    placeholder="name@domain.com"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-accentBlue focus:border-accentBlue transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accentBlue via-purpleGlow to-cyanAccent text-white text-xs font-semibold hover:scale-[1.02] active:scale-95 disabled:scale-100 disabled:opacity-50 transition-all flex items-center justify-center"
              >
                {loading ? 'Sending email...' : 'Send Recovery Email'}
              </button>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center space-x-2 text-[11px] text-mutedGray hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to login</span>
                </Link>
              </div>
            </form>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
