import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import {
  FileText,
  Cpu,
  BarChart3,
  Users,
  Trophy,
  Clock,
  ArrowRight,
  Play,
  CheckCircle2,
  Layers,
  Sparkles,
  Zap,
  Mail,
  MapPin,
  Phone,
  Send,
  Building
} from 'lucide-react';
import GlassCard from '../components/GlassCard';

const LandingPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('org'); // 'org' or 'student'
  const [demoStep, setDemoStep] = useState(0); // For animating mockup steps

  // Run a slow interval to animate the dashboard preview steps automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setDemoStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { title: 'Upload PDF/Image', desc: 'Drag-and-drop notes, question files, or page screenshots.' },
    { title: 'AI Question Extraction', desc: 'CBTify AI scans text, formulas, drawings and isolates Q&As.' },
    { title: 'Generate CBT Exam', desc: 'Converts questions into standard MCQ online assessments.' },
    { title: 'Attempt CBT Test', desc: 'Students attempt the test inside a secure timer-driven browser.' },
    { title: 'Get Analytics & Insights', desc: 'Get subject breakdown, mistakes list, and rank mapping.' }
  ];

  const features = [
    { title: '📄 PDF to CBT', desc: 'Transform multi-page documents and textbook PDFs into interactive tests instantly.', color: 'blue' },
    { title: '🖼️ Image to CBT', desc: 'Take a snapshot of any written question paper or whiteboard note and convert it directly.', color: 'purple' },
    { title: '🤖 AI Question Detection', desc: 'Engine parses complex academic texts, separating questions, options, and explanations.', color: 'cyan' },
    { title: '📊 Detailed Analytics', desc: 'Track averages, accuracy ratios, speed coefficients, and percentile distributions.', color: 'green' },
    { title: '🎯 Mistake Tracking', desc: 'Automatically flags incorrect answers and compiles them in a centralized error bank.', color: 'purple' },
    { title: '⚡ Instant Generation', desc: 'Scans, compiles, structures, and releases tests online in under 30 seconds.', color: 'blue' },
    { title: '🏫 Organization Portal', desc: 'Allows schools and coaches to create secure exams, schedule dates, and monitor rosters.', color: 'cyan' },
    { title: '👨‍🎓 Student Dashboard', desc: 'Personal work desk loaded with calendar heatmaps, recommendations, and test history.', color: 'green' },
    { title: '📈 Progress Reports', desc: 'Send automated PDF/CSV reports to parents, instructors, or school administrations.', color: 'blue' },
    { title: '🏆 Leaderboards', desc: 'Gamify studying with cohort rankings, score badges, and topic-wise expert statuses.', color: 'purple' }
  ];

  // Motion variants for container animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100 }
    }
  };

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen grid-bg overflow-x-hidden">
      {/* Background Radial Glow Elements */}
      <div className="glow-orb-blue top-10 left-10 animate-pulse-slow" />
      <div className="glow-orb-purple top-1/3 right-10" />
      <div className="glow-orb-cyan bottom-10 left-1/4" />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-28 md:pt-32 md:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          {/* Background decoration glow triggers */}

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accentBlue/10 border border-accentBlue/30 text-accentBlue text-xs font-semibold mb-6 shadow-glowBlue"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Prototyping Active</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 100, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.08] mb-6"
          >
            Turn Any PDF or Image into an{' '}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-accentBlue via-purpleGlow to-cyanAccent">
              Interactive CBT Exam
              <span className="absolute bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-accentBlue via-purpleGlow to-cyanAccent opacity-70 blur-[1px]"></span>
            </span>{' '}
            in Seconds
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-mutedGray max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Upload lecture notes, question papers, screenshots, or PDFs and instantly generate AI-powered CBT tests with detailed analytics and performance tracking.
          </motion.p>
          
          {currentUser && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto p-3.5 mb-6 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200"
            >
              👋 Welcome back, <strong className="text-accentBlue font-bold">{currentUser.username}</strong>! Select a workspace pathway below to open your pages.
            </motion.div>
          )}

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 max-w-3xl mx-auto"
          >
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-gradient-to-r from-accentBlue to-purpleGlow text-white font-semibold shadow-glowBlue hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 text-sm"
                >
                  <span>Student Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/upload"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold transition-all flex items-center justify-center space-x-2 text-sm"
                >
                  <span>Upload PDF/Image</span>
                </Link>
                <Link
                  to="/analytics"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold transition-all flex items-center justify-center space-x-2 text-sm"
                >
                  <span>Analytics Page</span>
                </Link>
                {currentUser.role === 'organization' && (
                  <Link
                    to="/organization"
                    className="w-full sm:w-auto px-6 py-4 rounded-xl bg-purpleGlow/20 border border-purpleGlow/30 hover:bg-purpleGlow/35 text-purpleGlow font-semibold transition-all flex items-center justify-center space-x-2 text-sm"
                  >
                    <span>Organization Portal</span>
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-accentBlue via-purpleGlow to-cyanAccent text-white font-medium shadow-glowBlue hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 text-sm"
                >
                  <span>Start Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => {
                    const el = document.getElementById('how-it-works');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-medium transition-all flex items-center justify-center space-x-2 text-sm"
                >
                  <Play className="w-4 h-4 text-cyanAccent fill-cyanAccent" />
                  <span>Watch Demo</span>
                </button>
              </>
            )}
          </motion.div>

          {/* Hero mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 80, delay: 0.4 }}
            className="relative max-w-5xl mx-auto rounded-24px p-1.5 bg-gradient-to-b from-white/15 to-transparent shadow-2xl border border-white/10 backdrop-blur-md overflow-hidden"
          >
            <div className="rounded-3xl bg-darkBg/90 overflow-hidden border border-white/5 relative min-h-[400px] md:min-h-[500px] flex flex-col md:flex-row">

              {/* Sidebar simulation */}
              <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-white/5 bg-white/[0.02] p-4 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start md:space-y-4">
                <div className="flex items-center space-x-2 mb-0 md:mb-6">
                  <div className="w-7 h-7 rounded-lg bg-accentBlue flex items-center justify-center shadow-glowBlue"><Cpu className="w-4 h-4 text-white" /></div>
                  <span className="font-bold text-sm text-white">CBTify Engine</span>
                </div>
                <div className="hidden md:flex flex-col space-y-1.5 w-full">
                  <div className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-semibold ${demoStep === 0 ? 'bg-accentBlue/20 text-accentBlue border-l-2 border-accentBlue' : 'text-mutedGray'}`}><FileText className="w-3.5 h-3.5" /><span>1. Source File</span></div>
                  <div className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-semibold ${demoStep === 1 ? 'bg-purpleGlow/20 text-purpleGlow border-l-2 border-purpleGlow' : 'text-mutedGray'}`}><Cpu className="w-3.5 h-3.5" /><span>2. AI Core</span></div>
                  <div className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-semibold ${demoStep === 2 ? 'bg-cyanAccent/20 text-cyanAccent border-l-2 border-cyanAccent' : 'text-mutedGray'}`}><Clock className="w-3.5 h-3.5" /><span>3. CBT Exam</span></div>
                  <div className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-semibold ${demoStep === 3 ? 'bg-green-500/20 text-green-400 border-l-2 border-green-400' : 'text-mutedGray'}`}><BarChart3 className="w-3.5 h-3.5" /><span>4. Analytics</span></div>
                </div>
                <div className="text-xs bg-white/5 text-slate-300 px-2.5 py-1 rounded md:mt-auto border border-white/10">Active Simulation</div>
              </div>

              {/* Showcase Screen */}
              <div className="flex-1 p-6 md:p-10 flex flex-col justify-center bg-radial-gradient">

                {/* Step 0: Uploading */}
                {demoStep === 0 && (
                  <div className="flex flex-col items-center justify-center text-center space-y-6 animate-fadeIn">
                    <div className="w-20 h-20 rounded-2xl bg-accentBlue/10 border border-accentBlue/30 flex items-center justify-center animate-bounce">
                      <FileText className="w-10 h-10 text-accentBlue" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Extracting from "chemistry_unit_4.pdf"</h4>
                      <p className="text-xs text-mutedGray mt-1">Uploaded successfully. Size: 4.8MB</p>
                    </div>
                    <div className="w-full max-w-sm bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                      <div className="bg-accentBlue h-full rounded-full animate-[loading_4s_infinite]" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-xs text-accentBlue font-medium">Scanning layout coordinates...</span>
                  </div>
                )}

                {/* Step 1: AI Processing */}
                {demoStep === 1 && (
                  <div className="flex flex-col items-center justify-center space-y-6 text-center animate-fadeIn">
                    <div className="w-20 h-20 rounded-full bg-purpleGlow/10 border border-purpleGlow/30 flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-full border-t-2 border-purpleGlow animate-spin"></div>
                      <Cpu className="w-8 h-8 text-purpleGlow" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">AI Engine Parsing Content</h4>
                      <p className="text-xs text-mutedGray mt-1">OCR identifying text boxes, math expressions, and drawings.</p>
                    </div>
                    <div className="flex flex-col items-center space-y-1.5 text-xs text-purpleGlow/90 font-mono">
                      <span>✓ Identified: 15 multiple choice structures</span>
                      <span>✓ Solved correct options via AI Reasoning</span>
                      <span>⚙ Generating student answer cards...</span>
                    </div>
                  </div>
                )}

                {/* Step 2: Exam Environment */}
                {demoStep === 2 && (
                  <div className="text-left space-y-5 animate-fadeIn max-w-xl mx-auto w-full">
                    <div className="flex justify-between items-center pb-3 border-b border-white/10 text-xs">
                      <span className="font-semibold text-cyanAccent">QUESTION 3 OF 15</span>
                      <span className="text-slate-300 font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-cyanAccent" /> 12:45 remaining</span>
                    </div>
                    <h4 className="text-base font-semibold text-white">
                      Which of the following compounds is classified as a strong Arrhenius acid in aqueous solutions?
                    </h4>
                    <div className="space-y-2.5">
                      {['CH3COOH (Acetic Acid)', 'HCl (Hydrochloric Acid)', 'NH3 (Ammonia)', 'NaOH (Sodium Hydroxide)'].map((opt, i) => (
                        <div
                          key={opt}
                          className={`p-3 rounded-xl border text-xs font-medium transition-all ${i === 1
                            ? 'bg-cyanAccent/10 border-cyanAccent text-cyanAccent'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                            }`}
                        >
                          <span className="inline-block w-5 h-5 rounded-full bg-white/5 border border-white/10 text-center leading-5 mr-3 font-semibold">{String.fromCharCode(65 + i)}</span>
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Analytics */}
                {demoStep === 3 && (
                  <div className="text-left space-y-5 animate-fadeIn max-w-xl mx-auto w-full">
                    <h4 className="text-lg font-semibold text-white flex items-center justify-between">
                      <span>Attempt Complete!</span>
                      <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded">Saved to history</span>
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="block text-[10px] text-mutedGray">ACCURACY</span>
                        <span className="text-2xl font-bold text-green-400">93%</span>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="block text-[10px] text-mutedGray">TIME SPENT</span>
                        <span className="text-2xl font-bold text-purpleGlow">4.2m</span>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="block text-[10px] text-mutedGray">IMPROVEMENT</span>
                        <span className="text-2xl font-bold text-accentBlue">+14%</span>
                      </div>
                    </div>
                    {/* SVG Chart mockup */}
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl h-36 flex items-end">
                      <svg className="w-full h-full" viewBox="0 0 300 100">
                        <path
                          d="M10,80 Q50,70 90,60 T170,40 T250,20 T290,10"
                          fill="none"
                          stroke="url(#blue-grad)"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <circle cx="290" cy="10" r="4" fill="#3B82F6" className="animate-ping" />
                        <circle cx="290" cy="10" r="3" fill="#3B82F6" />
                        <defs>
                          <linearGradient id="blue-grad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#8B5CF6" />
                            <stop offset="50%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#06B6D4" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="how-it-works" className="py-24 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">How It Works</h2>
            <p className="text-base text-mutedGray max-w-2xl mx-auto">
              From raw documents to fully graded computer-based assessments in five easy stages.
            </p>
          </motion.div>

          {/* Horizontal scroll cards on mobile / grid layout on desktop */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-5 gap-6"
          >
            {steps.map((step, idx) => (
              <motion.div key={step.title} variants={itemVariants}>
                <GlassCard glowColor={idx % 2 === 0 ? 'blue' : 'purple'} className="flex flex-col relative h-full justify-between">
                  <div>
                    <span className="absolute top-4 right-4 text-4xl font-bold bg-gradient-to-br from-white/10 to-transparent bg-clip-text text-transparent">{`0${idx + 1}`}</span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accentBlue font-bold text-sm mb-6 mt-2">
                      {idx + 1}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-mutedGray leading-relaxed">{step.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 bg-darkSec/35 relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Futuristic Feature Matrix</h2>
            <p className="text-base text-mutedGray max-w-2xl mx-auto">
              Equipped with elite core features to assist both standard learners and institutions.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feat) => (
              <motion.div key={feat.title} variants={itemVariants}>
                <GlassCard glowColor={feat.color} className="p-6 flex flex-col justify-between group h-full">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">
                      <span>{feat.title}</span>
                    </h3>
                    <p className="text-xs text-mutedGray leading-relaxed mb-4">{feat.desc}</p>
                  </div>
                  <span className="text-[10px] text-accentBlue/80 font-mono tracking-widest uppercase mt-auto">Premium Core</span>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- TABS SHOWCASE (STUDENT vs ORGANIZATION) --- */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-12">
          <div className="flex p-1 rounded-xl bg-white/5 border border-white/10">
            <button
              onClick={() => setActiveTab('org')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'org' ? 'bg-gradient-to-r from-accentBlue to-purpleGlow text-white shadow-glowBlue' : 'text-mutedGray hover:text-white'
                }`}
            >
              For Institutions & Schools
            </button>
            <button
              onClick={() => setActiveTab('student')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'student' ? 'bg-gradient-to-r from-accentBlue to-purpleGlow text-white shadow-glowBlue' : 'text-mutedGray hover:text-white'
                }`}
            >
              For Private Students
            </button>
          </div>
        </div>

        {activeTab === 'org' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fadeIn">
            <div className="space-y-6">
              <h3 className="text-3xl font-extrabold text-white">Automate Assessment Lifecycle</h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                Deploy exams securely, roster student groups, track scores dynamically, and compile academic files in a secure layout dashboard. Perfect for Coaching Centers, Universities, and Corporate Training departments.
              </p>
              <ul className="space-y-3">
                {[
                  'Secure testing configuration preventing screenshot captures',
                  'Simulated bulk rosters upload for cohort testing',
                  'Instant exam link generator to share with classes',
                  'Aggregate school leaderboard rank indices',
                  'Automatic student mistake audit banks'
                ].map((item) => (
                  <li key={item} className="flex items-start text-xs text-slate-300">
                    <CheckCircle2 className="w-4.5 h-4.5 text-accentBlue mr-2.5 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link
                  to="/register"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-accentBlue to-purpleGlow text-white font-medium shadow-glowPurple"
                >
                  <span>Register Institution</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Mockup */}
            <GlassCard glowColor="purple" className="p-4">
              <div className="rounded-xl overflow-hidden border border-white/5 bg-slate-950/60 p-4 space-y-4">
                <div className="flex justify-between items-center text-xs pb-3 border-b border-white/10">
                  <span className="font-bold text-white flex items-center gap-1.5"><Users className="w-4 h-4 text-purpleGlow" /> IIIT DELHI ROSTER</span>
                  <span className="text-mutedGray">Cohort: CS Prep-2026</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Alice Smith', email: 'alice@iiitd.ac.in', score: '92%' },
                    { name: 'Bob Johnson', email: 'bob@iiitd.ac.in', score: '84%' },
                    { name: 'Charlie Davis', email: 'charlie@iiitd.ac.in', score: '96%' }
                  ].map((s) => (
                    <div key={s.name} className="flex items-center justify-between p-2 rounded bg-white/5 text-xs">
                      <div>
                        <div className="font-semibold text-white">{s.name}</div>
                        <div className="text-[10px] text-mutedGray">{s.email}</div>
                      </div>
                      <span className="font-bold text-green-400">{s.score} accuracy</span>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] text-mutedGray text-center italic">Manage students, schedule mid-terms, and click export.</div>
              </div>
            </GlassCard>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fadeIn">
            <div className="space-y-6">
              <h3 className="text-3xl font-extrabold text-white">Study Smarter, Not Harder</h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                Stop typing out study questionnaires. Simply upload your class PDF notes or snaps of past homework problems and study with mock interactive exams directly calibrated for you.
              </p>
              <ul className="space-y-3">
                {[
                  'Convert screenshots directly into mock quizzes',
                  'Highlight weak concepts and generate remediation quizzes',
                  'Simulate realistic countdown timer conditions',
                  'View answers with explainers for incorrect answers',
                  'Access score logs locally at any time'
                ].map((item) => (
                  <li key={item} className="flex items-start text-xs text-slate-300">
                    <CheckCircle2 className="w-4.5 h-4.5 text-cyanAccent mr-2.5 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link
                  to="/register"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-accentBlue to-cyanAccent text-white font-medium shadow-glowCyan"
                >
                  <span>Create Student Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Mockup */}
            <GlassCard glowColor="cyan" className="p-4">
              <div className="rounded-xl overflow-hidden border border-white/5 bg-slate-950/60 p-4 space-y-4">
                <div className="flex justify-between items-center text-xs pb-3 border-b border-white/10">
                  <span className="font-bold text-white flex items-center gap-1.5"><Trophy className="w-4 h-4 text-cyanAccent" /> INDIVIDUAL PERFORMANCE</span>
                  <span className="text-cyanAccent font-mono">Rank: #14 in Prep Cohort</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
                    <span className="block text-[9px] text-mutedGray">WEAK TOPIC</span>
                    <span className="text-xs font-bold text-red-400">Arrhenius Acids</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
                    <span className="block text-[9px] text-mutedGray">AI RECOMMENDATION</span>
                    <span className="text-xs font-bold text-accentBlue">Review Mechanics Q2</span>
                  </div>
                </div>
                <div className="text-[10px] text-mutedGray text-center italic">Get personalized reminders to retry questions you missed.</div>
              </div>
            </GlassCard>
          </div>
        )}
      </section>

      {/* --- ABOUT US SECTION --- */}
      <section id="about" className="py-24 bg-darkSec/20 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">About CBTify AI</h2>
            <p className="text-base text-mutedGray max-w-2xl mx-auto">
              Bridging the gap between static content and active educational evaluation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Building className="w-6 h-6 text-accentBlue" />
                Our Educational Vision
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                At CBTify AI, we believe that learning happens by doing. Traditional assessment cycles are slow, tedious, and often delayed. Our mission is to democratize instant feedback by converting static lecture slides, textbooks, and notes into interactive quiz portals immediately.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                Developed in partnership with academic hubs like the IIIT Delhi labs, our technology uses layout-aware neural extraction systems to separate instructional sheets from grading items, saving institutions hundreds of work hours.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-2xl font-bold text-accentBlue">100%</span>
                  <span className="text-[10px] text-mutedGray uppercase tracking-wider">Automated Conversions</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-2xl font-bold text-purpleGlow">&lt; 30s</span>
                  <span className="text-[10px] text-mutedGray uppercase tracking-wider">Test Processing time</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard glowColor="purple" className="p-8 space-y-6">
                <h4 className="text-base font-bold text-white">Our Core Commitments</h4>

                <div className="space-y-4">
                  {[
                    { title: 'Explainable AI Answers', desc: 'Every incorrect response triggers a detailed step-by-step mathematical or logical AI-generated explainer.' },
                    { title: 'Secure Evaluation Canvas', desc: 'Features a focus tracking locker, disabling copy-pastes and logging focus loss indicators for tutors.' },
                    { title: 'Zero Setup Integration', desc: 'No servers, databases, or local scripts to manage. Runs entirely in high-fidelity browser workspaces.' }
                  ].map((val) => (
                    <div key={val.title} className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-accentBlue/10 border border-accentBlue/20 flex items-center justify-center text-accentBlue flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-white">{val.title}</h5>
                        <p className="text-[11px] text-mutedGray mt-0.5 leading-relaxed">{val.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CONTACT US SECTION --- */}
      <section id="contact" className="py-24 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Get In Touch</h2>
            <p className="text-base text-mutedGray max-w-2xl mx-auto">
              Have questions about secure exam lockers or custom institutional deployments? Message us directly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start max-w-5xl mx-auto">
            {/* Info cards (2 columns) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <GlassCard glowColor="blue" className="p-6 space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact Information</h4>

                <div className="space-y-4 text-xs text-slate-300">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4.5 h-4.5 text-accentBlue" />
                    <span>support@cbtify.ai</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4.5 h-4.5 text-purpleGlow" />
                    <span>+91 11 2430 7330</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4.5 h-4.5 text-cyanAccent mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">
                      Ram Nagar,<br />
                      RIICO Industrial Area, Phase I,<br />
                      Kota,Rajasthan,324005,India
                    </span>
                  </div>
                </div>
              </GlassCard>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-mutedGray leading-relaxed flex items-start">
                <Sparkles className="w-5 h-5 text-accentBlue flex-shrink-0 mr-2.5 mt-0.5" />
                <span>Our administrative and development labs are located inside the Innovation and Incubation Center of IIIT Delhi, Delhi, India.</span>
              </div>
            </motion.div>

            {/* Contact Form (3 columns) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-3 w-full"
            >
              <GlassCard glowColor="purple" className="p-6">
                {submitSuccess ? (
                  <div className="text-center py-12 space-y-3 animate-fadeIn">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto text-green-400">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-white">Message Transmitted</h4>
                    <p className="text-xs text-mutedGray">We will review your inquiry and follow up within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-slate-300">Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-accentBlue focus:border-accentBlue"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-slate-300">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@institution.edu"
                          className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-accentBlue focus:border-accentBlue"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-slate-300">Subject</label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Deployment query"
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-accentBlue focus:border-accentBlue"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-slate-300">Message</label>
                      <textarea
                        required
                        rows="4"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your classroom size or mock trial needs..."
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-accentBlue focus:border-accentBlue resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-accentBlue via-purpleGlow to-cyanAccent text-white text-xs font-semibold hover:scale-102 active:scale-98 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Transmitting inquiry...' : 'Send Message'}</span>
                    </button>
                  </form>
                )}
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10">
        <GlassCard glowColor="blue" className="p-8 md:p-14 text-center space-y-6 relative overflow-hidden border border-white/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accentBlue/20 rounded-full filter blur-3xl"></div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Ready to Transform Any Document into an Exam?</h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Upload notes, exams, sheets, or homework slides. Join thousands of cohorts generating premium quality computer-based tests in minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-accentBlue to-purpleGlow text-white font-medium shadow-glowBlue flex items-center justify-center space-x-2"
            >
              <span>Start Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all"
            >
              Book Demo
            </button>
          </div>
        </GlassCard>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-white/5 bg-slate-950/45 relative z-10 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8 text-mutedGray">

            {/* Logo brief */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded bg-accentBlue flex items-center justify-center text-white"><Cpu className="w-3.5 h-3.5" /></div>
                <span className="font-bold text-white">CBTify AI</span>
              </div>
              <p className="leading-relaxed">
                Transforming textbook PDF notes, written notes, and mock question files into interactive CBT testing rooms inside secure canvas layers.
              </p>
            </div>

            {/* Links */}
            <div className="space-y-3 md:pl-8">
              <h4 className="text-white font-bold uppercase tracking-wider text-[10px]">Resource Links</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-white transition-colors">Core Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Conversion Timeline</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">Our Vision (About Us)</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Help Desk (Contact)</a></li>
              </ul>
            </div>

            {/* Address location */}
            <div className="space-y-3">
              <h4 className="text-white font-bold uppercase tracking-wider text-[10px]">Address</h4>
              <p className="leading-relaxed font-sans text-slate-300">
                <strong>Ram Nagar</strong><br />
                RIICO Industrial Area, Phase I,<br />
                Kota,Rajasthan,324005,India
              </p>

            </div>

          </div>

          <hr className="border-white/5 my-6" />

          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-mutedGray text-[10px]">
            <p>&copy; 2026 CBTify AI Platforms. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Support center</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
