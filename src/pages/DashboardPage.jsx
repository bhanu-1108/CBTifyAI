import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ArrowRight, 
  BookOpen, 
  Plus, 
  Calendar, 
  User 
} from 'lucide-react';
import GlassCard from '../components/GlassCard';

const DashboardPage = () => {
  const { currentUser, tests, schedules, getAnalytics } = useApp();
  const navigate = useNavigate();
  const analytics = getAnalytics();

  const stats = [
    { name: 'Total Tests Taken', value: analytics.totalTests, sub: 'Exams completed', icon: FileText, color: 'blue' },
    { name: 'Average Accuracy', value: `${analytics.avgAccuracy}%`, sub: 'Overall test score', icon: CheckCircle2, color: 'green' },
    { name: 'Time Spent Testing', value: `${Math.round(analytics.timeSpent / 60)}m`, sub: 'Total active minutes', icon: Clock, color: 'purple' },
    { name: 'Improvement Rate', value: `${analytics.improvementRate > 0 ? '+' : ''}${analytics.improvementRate}%`, sub: 'Since first attempt', icon: TrendingUp, color: 'cyan' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header welcome banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Student Dashboard</h1>
          <p className="text-xs text-mutedGray mt-1">
            Welcome back, <span className="text-accentBlue font-medium">{currentUser?.username}</span>. Track your metrics and convert new files.
          </p>
        </div>
        <Link
          to="/upload"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accentBlue to-purpleGlow text-xs font-semibold text-white shadow-glowBlue hover:scale-105 transition-all self-start md:self-auto"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>New CBT Exam</span>
        </Link>
      </div>

      {/* Scorecard grids */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <GlassCard key={stat.name} glowColor={stat.color} className="p-5 flex items-center justify-between">
              <div className="space-y-2">
                <span className="text-[10px] text-mutedGray uppercase tracking-wider block font-semibold">{stat.name}</span>
                <h3 className="text-3xl font-extrabold text-white tracking-tight">{stat.value}</h3>
                <span className="text-[10px] text-mutedGray block">{stat.sub}</span>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${
                stat.color === 'blue' ? 'text-accentBlue' :
                stat.color === 'green' ? 'text-green-400' :
                stat.color === 'purple' ? 'text-purpleGlow' : 'text-cyanAccent'
              }`}>
                <Icon className="w-6 h-6" />
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Main workspace panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Available CBT Tests */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accentBlue" />
              <span>Available Practice Exams</span>
            </h2>
            <span className="text-xs text-mutedGray font-mono">{tests.length} tests loaded</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {tests.map((test) => (
              <GlassCard key={test.id} glowColor="purple" className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-white/15 transition-all">
                <div className="space-y-1.5 max-w-xl">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{test.title}</span>
                    {test.createdBy !== 'system' && (
                      <span className="text-[9px] bg-purpleGlow/25 text-purpleGlow px-2 py-0.5 rounded border border-purpleGlow/30">AI Extracted</span>
                    )}
                  </h3>
                  <p className="text-xs text-mutedGray leading-relaxed">{test.description}</p>
                  <div className="flex items-center space-x-4 text-[10px] text-mutedGray font-mono">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {test.timeLimit} mins</span>
                    <span>•</span>
                    <span>{test.questions.length} Questions</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/test/${test.id}`)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-accentBlue hover:border-accentBlue text-xs font-semibold text-white transition-all flex items-center gap-1.5 flex-shrink-0 group"
                >
                  <span>Attempt Test</span>
                  <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Right 1 Column: Institutional Schedules & Alerts */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyanAccent" />
            <span>Scheduled Exam Alerts</span>
          </h2>

          <div className="space-y-4">
            {schedules.map((sched) => (
              <GlassCard key={sched.id} glowColor="cyan" className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-bold text-white leading-tight">{sched.title}</h4>
                  <span className="text-[9px] bg-cyanAccent/20 text-cyanAccent px-1.5 py-0.5 rounded border border-cyanAccent/20 font-mono">Exam Lock</span>
                </div>
                <div className="text-[11px] text-mutedGray space-y-1 font-mono">
                  <div>Date: {sched.date}</div>
                  <div>Time: {sched.time} ({sched.duration})</div>
                </div>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-mutedGray font-medium">
                  <span>Registered Candidates: {sched.studentsCount}</span>
                  <span className="text-accentBlue hover:underline cursor-pointer">Rules info</span>
                </div>
              </GlassCard>
            ))}

            {/* AI suggestion panel */}
            <GlassCard glowColor="purple" className="p-4 bg-gradient-to-tr from-purpleGlow/5 to-transparent border-purpleGlow/25">
              <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-purpleGlow" />
                <span>AI Preparation Tip</span>
              </h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Based on your last attempt on <strong>AI Ethics Quiz</strong>, we recommend spending 5 minutes reviewing <strong>Inner Alignment Policies</strong> before re-testing.
              </p>
            </GlassCard>
          </div>
        </div>

      </div>

    </div>
  );
};

export default DashboardPage;
