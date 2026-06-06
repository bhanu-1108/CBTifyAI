import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { User, Mail, Lock, Building, Cpu, AlertCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const RegisterPage = () => {
  const { register } = useApp();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // 'student' or 'organization'
  const [organizationName, setOrganizationName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password) {
      setError('Please fill in all standard credentials.');
      return;
    }
    if (role === 'organization' && !organizationName) {
      setError('Please specify your Institution / School name.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      try {
        register(username, email, password, role, organizationName);
        setLoading(false);
        navigate('/');
      } catch (err) {
        setLoading(false);
        setError('Error creating account. Please try again.');
      }
    }, 1000);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 grid-bg">
      <div className="glow-orb-blue top-10 right-10"></div>
      <div className="glow-orb-purple bottom-10 left-10"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2.5 mb-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-accentBlue to-purpleGlow flex items-center justify-center shadow-glowBlue">
              <Cpu className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">CBTify AI</span>
          </Link>
          <h2 className="text-2xl font-bold text-white">Create your account</h2>
          <p className="text-xs text-mutedGray mt-1.5">Start converting study files into interactive assessments.</p>
        </div>

        {/* Register Card Form */}
        <GlassCard glowColor="purple" className="p-8">
          {error && (
            <div className="flex items-center space-x-2.5 p-3.5 mb-5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              <AlertCircle className="w-4.5 h-4.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Role selection tab */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Account Type</label>
              <div className="grid grid-cols-2 p-1 rounded-xl bg-white/5 border border-white/10">
                <button
                  type="button"
                  onClick={() => { setRole('student'); setError(''); }}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                    role === 'student' ? 'bg-accentBlue text-white shadow-glowBlue' : 'text-mutedGray hover:text-white'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => { setRole('organization'); setError(''); }}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                    role === 'organization' ? 'bg-purpleGlow text-white shadow-glowPurple' : 'text-mutedGray hover:text-white'
                  }`}
                >
                  Organization
                </button>
              </div>
            </div>

            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-mutedGray">
                  <User className="w-4.5 h-4.5" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-accentBlue focus:border-accentBlue transition-colors"
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Organization Name (Conditional) */}
            {role === 'organization' && (
              <div className="space-y-1.5 animate-fadeIn">
                <label className="text-xs font-semibold text-slate-300">Organization / Institute Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-mutedGray">
                    <Building className="w-4.5 h-4.5" />
                  </div>
                  <input
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    placeholder="IIIT Delhi Coaching Center"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purpleGlow focus:border-purpleGlow transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-mutedGray">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-accentBlue focus:border-accentBlue transition-colors"
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl text-white text-xs font-semibold hover:scale-[1.02] active:scale-95 disabled:scale-100 disabled:opacity-50 transition-all flex items-center justify-center ${
                role === 'student' ? 'bg-gradient-to-r from-accentBlue to-cyanAccent' : 'bg-gradient-to-r from-purpleGlow to-accentBlue'
              }`}
            >
              {loading ? 'Creating workspace...' : 'Sign Up'}
            </button>
          </form>
        </GlassCard>

        {/* Footer info */}
        <p className="text-center text-xs text-mutedGray mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-accentBlue font-medium hover:text-cyanAccent transition-colors">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
