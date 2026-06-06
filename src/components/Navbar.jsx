import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Cpu, Menu, X, LogOut, User, BarChart2 } from 'lucide-react';

const Navbar = () => {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = currentUser
    ? [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Upload PDF/Image', path: '/upload' },
        { name: 'Analytics', path: '/analytics' },
        ...(currentUser.role === 'organization'
          ? [{ name: 'Organization Portal', path: '/organization' }]
          : [])
      ]
    : [
        { name: 'Features', path: '/#features' },
        { name: 'How It Works', path: '/#how-it-works' },
        { name: 'About Us', path: '/#about' },
        { name: 'Contact Us', path: '/#contact' }
      ];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      const elementId = path.substring(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(elementId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accentBlue to-purpleGlow flex items-center justify-center shadow-glowPurple group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              CBTify <span className="bg-gradient-to-r from-accentBlue to-cyanAccent bg-clip-text text-transparent">AI</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`text-base font-semibold transition-colors hover:text-white ${
                  isActive(link.path) ? 'text-accentBlue text-glow-blue' : 'text-mutedGray'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center space-x-5">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <User className="w-4.5 h-4.5 text-purpleGlow" />
                  <span className="text-base font-semibold text-white">{currentUser.username}</span>
                  {currentUser.role === 'organization' && (
                    <span className="text-[10px] bg-accentBlue/20 text-accentBlue px-1.5 py-0.5 rounded border border-accentBlue/30">
                      ORG
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-base font-semibold text-mutedGray hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-4.5 h-4.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-base font-semibold text-mutedGray hover:text-white transition-colors px-2 py-1">
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-accentBlue to-purpleGlow text-base font-bold text-white shadow-glowBlue hover:scale-105 active:scale-95 transition-all"
                >
                  Start Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-mutedGray hover:text-white p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-white/10 px-4 pt-4 pb-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`text-left py-2 text-base font-medium ${
                  isActive(link.path) ? 'text-accentBlue' : 'text-mutedGray'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>
          
          <hr className="border-white/10" />

          {/* Mobile Auth actions */}
          <div className="pt-2">
            {currentUser ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 py-2">
                  <User className="w-5 h-5 text-purpleGlow" />
                  <span className="text-base text-white">{currentUser.username}</span>
                  {currentUser.role === 'organization' && (
                    <span className="text-[10px] bg-accentBlue/20 text-accentBlue px-1.5 py-0.5 rounded border border-accentBlue/30">
                      ORG
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl bg-white/5 border border-white/10 font-medium hover:text-white text-mutedGray"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-accentBlue to-purpleGlow text-white font-medium shadow-glowBlue"
                >
                  Start Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
