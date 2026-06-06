import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Trophy, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import GlassCard from '../components/GlassCard';

const AnalyticsPage = () => {
  const { submissions, getAnalytics } = useApp();
  const analytics = getAnalytics();
  const [expandedSubId, setExpandedSubId] = useState(null);

  const toggleExpand = (subId) => {
    setExpandedSubId(expandedSubId === subId ? null : subId);
  };

  // SVG Line Chart coordinates generator
  const renderTrendLine = () => {
    const trend = analytics.accuracyTrend;
    if (trend.length === 0) return null;

    const width = 500;
    const height = 150;
    const paddingLeft = 40;
    const paddingRight = 20;
    const paddingTop = 20;
    const paddingBottom = 30;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    // Map coordinates
    const points = trend.map((val, idx) => {
      const x = paddingLeft + (trend.length > 1 ? (idx / (trend.length - 1)) * chartWidth : chartWidth / 2);
      // Flip Y since SVG origin is top-left, map accuracy 0-100 to chartHeight-0
      const y = paddingTop + chartHeight - (val.accuracy / 100) * chartHeight;
      return { x, y, val };
    });

    let pathD = '';
    points.forEach((pt, idx) => {
      if (idx === 0) {
        pathD = `M ${pt.x} ${pt.y}`;
      } else {
        // Curve fitting
        const prevPt = points[idx - 1];
        const cpX1 = prevPt.x + (pt.x - prevPt.x) / 2;
        const cpY1 = prevPt.y;
        const cpX2 = prevPt.x + (pt.x - prevPt.x) / 2;
        const cpY2 = pt.y;
        pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${pt.x} ${pt.y}`;
      }
    });

    return (
      <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        {/* Y Axis Grid lines */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const y = paddingTop + chartHeight - (tick / 100) * chartHeight;
          return (
            <g key={tick}>
              <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <text x={paddingLeft - 10} y={y + 4} fill="#9CA3AF" fontSize="9" textAnchor="end">{tick}%</text>
            </g>
          );
        })}

        {/* X Axis Date labels */}
        {points.map((pt, idx) => (
          <text key={idx} x={pt.x} y={height - 10} fill="#9CA3AF" fontSize="8" textAnchor="middle">
            {pt.val.date}
          </text>
        ))}

        {/* Glow Shadow Filter */}
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Path line */}
        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#glow)"
          />
        )}

        {/* Coordinate dots */}
        {points.map((pt, idx) => (
          <g key={idx}>
            <circle cx={pt.x} cy={pt.y} r="5" fill="#080B14" stroke="#3B82F6" strokeWidth="2.5" />
            <title>{`${pt.val.title}: ${pt.val.accuracy}%`}</title>
          </g>
        ))}
      </svg>
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="pb-5 border-b border-white/5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Visual Analytics</h1>
          <p className="text-xs text-mutedGray mt-1">
            Deep dive into your strengths, weak concepts, and mistake trends over recent attempts.
          </p>
        </div>
        <span className="text-xs text-accentBlue font-bold bg-accentBlue/10 border border-accentBlue/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
          <Trophy className="w-4 h-4" /> Grade: Master
        </span>
      </div>

      {/* Primary Row: Trend Chart and Subject breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SVG Trend line chart */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4.5 h-4.5 text-accentBlue" />
            <span>Accuracy Timeline Trend</span>
          </h3>
          <GlassCard glowColor="blue" className="p-6 h-64 flex items-center justify-center">
            {submissions.length > 0 ? (
              renderTrendLine()
            ) : (
              <div className="text-xs text-mutedGray text-center">No submissions recorded yet.</div>
            )}
          </GlassCard>
        </div>

        {/* Subject wise radial meters */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4.5 h-4.5 text-cyanAccent" />
            <span>Subject Analysis</span>
          </h3>
          <GlassCard glowColor="cyan" className="p-6 space-y-4.5 justify-center flex flex-col h-64">
            {Object.entries(analytics.subjectAnalysis).map(([subject, val]) => (
              <div key={subject} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">{subject}</span>
                  <span className="text-cyanAccent">{val}%</span>
                </div>
                {/* Custom CSS bar */}
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5 relative">
                  <div 
                    className="bg-gradient-to-r from-accentBlue to-cyanAccent h-full rounded-full" 
                    style={{ width: `${val}%` }}
                  />
                </div>
              </div>
            ))}
          </GlassCard>
        </div>

      </div>

      {/* Secondary Row: Mistakes heatmap and Weak/Strong topic arrays */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Heatmap calendar */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4.5 h-4.5 text-purpleGlow" />
            <span>14-Day Practice Heatmap</span>
          </h3>
          <GlassCard glowColor="purple" className="p-5 flex flex-col justify-center h-48">
            <div className="grid grid-cols-7 gap-2.5 max-w-sm mx-auto w-full">
              {analytics.mistakeHeatmap.map((day) => {
                let colorClass = 'bg-white/5 border-white/5';
                if (day.count === 1) colorClass = 'bg-accentBlue/30 border-accentBlue/40 text-accentBlue shadow-glowBlue';
                else if (day.count >= 2) colorClass = 'bg-cyanAccent/50 border-cyanAccent/60 text-white shadow-glowCyan';

                return (
                  <div
                    key={day.date}
                    className={`w-9 h-9 rounded-lg border text-[8px] font-bold flex flex-col items-center justify-center font-mono transition-all ${colorClass}`}
                  >
                    <span>{day.label.split(' ')[1]}</span>
                    {day.count > 0 && <span className="text-[7px] text-white opacity-80 mt-0.5">{day.count}x</span>}
                  </div>
                );
              })}
            </div>
            <div className="text-[10px] text-mutedGray text-center mt-4 italic">Cyan indicates multiple CBT exams attempted on that date.</div>
          </GlassCard>
        </div>

        {/* Weak topics card */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4.5 h-4.5 text-red-400" />
            <span>Weak Topics (Mistake Tally)</span>
          </h3>
          <GlassCard glowColor="purple" className="p-5 space-y-3.5 h-48 overflow-y-auto">
            {analytics.weakTopics.map((topic) => (
              <div key={topic.topic} className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-semibold truncate max-w-[180px]">{topic.topic}</span>
                <span className="text-[10px] bg-red-500/25 border border-red-500/30 text-red-400 font-bold px-2 py-0.5 rounded">
                  {topic.mistakesCount} mistakes
                </span>
              </div>
            ))}
          </GlassCard>
        </div>

        {/* Strong topics card */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <CheckCircle className="w-4.5 h-4.5 text-green-400" />
            <span>Strong Topics (Mastered)</span>
          </h3>
          <GlassCard glowColor="green" className="p-5 space-y-3.5 h-48 overflow-y-auto">
            {analytics.strongTopics.map((topic) => (
              <div key={topic} className="flex items-center text-xs text-slate-300 gap-2.5">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="font-semibold truncate">{topic}</span>
              </div>
            ))}
          </GlassCard>
        </div>

      </div>

      {/* Past attempts log review */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Historical Assessment Logs</h3>
        
        <div className="space-y-3">
          {submissions.map((sub) => {
            const isExpanded = expandedSubId === sub.id;
            return (
              <GlassCard key={sub.id} glowColor="blue" className="p-0 overflow-hidden border border-white/5 hover:border-white/10 transition-colors">
                
                {/* Header summary toggler */}
                <div
                  onClick={() => toggleExpand(sub.id)}
                  className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.01]"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">{sub.testTitle}</h4>
                    <p className="text-[10px] text-mutedGray font-mono">Attempted on: {new Date(sub.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <span className="block text-[10px] text-mutedGray font-mono">ACCURACY</span>
                      <span className={`text-base font-bold ${sub.accuracy >= 80 ? 'text-green-400' : sub.accuracy >= 60 ? 'text-yellow-500' : 'text-red-400'}`}>
                        {sub.accuracy}% ({sub.score}/{sub.totalQuestions})
                      </span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4.5 h-4.5 text-mutedGray" /> : <ChevronDown className="w-4.5 h-4.5 text-mutedGray" />}
                  </div>
                </div>

                {/* Collapsible detail panel */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-2 border-t border-white/5 bg-slate-950/40 space-y-5">
                    <h5 className="text-[11px] font-bold text-slate-300 uppercase tracking-widest pt-2">Detailed Question Audit</h5>
                    
                    {/* Simulated Questions List */}
                    <div className="space-y-4">
                      {sub.questionStatus.map((status, qIdx) => (
                        <div key={qIdx} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                          <div className="flex items-start justify-between text-[10px] pb-2 border-b border-white/5 font-mono">
                            <span className="font-bold text-slate-400">Question {qIdx + 1}</span>
                            {status === 'correct' ? (
                              <span className="text-green-400 flex items-center gap-1 font-semibold"><CheckCircle className="w-3.5 h-3.5" /> Correct</span>
                            ) : status === 'wrong' ? (
                              <span className="text-red-400 flex items-center gap-1 font-semibold"><XCircle className="w-3.5 h-3.5" /> Incorrect</span>
                            ) : (
                              <span className="text-yellow-500 flex items-center gap-1 font-semibold"><AlertTriangle className="w-3.5 h-3.5" /> Unanswered</span>
                            )}
                          </div>
                          <p className="text-xs text-white leading-relaxed pt-1">
                            {/* Fetch question text or mock fallback */}
                            {qIdx === 0 ? 'What is the primary objective of RLHF in LLMs?' :
                             qIdx === 1 ? 'Which ethical risk focuses on realistic false audio/visual generation?' :
                             qIdx === 2 ? 'In AI alignment, what does the term inner alignment refer to?' :
                             qIdx === 3 ? 'What does the concept of XAI represent in medical diagnostics?' :
                             'Which global regulatory framework has categorized AI systems by risk tiers?'}
                          </p>
                          <div className="text-[11px] bg-slate-950/60 p-3 rounded-lg border border-white/5 leading-relaxed">
                            <span className="text-accentBlue font-bold block mb-1">AI Explanation:</span>
                            <span className="text-slate-300">
                              {qIdx === 0 ? 'RLHF aligns models with human preferences using reward modeling and policy optimization.' :
                               qIdx === 1 ? 'Deepfake tech uses diffusion or GAN models to synthesize hyper-realistic false visual content.' :
                               qIdx === 2 ? 'Inner alignment ensures the optimized model policy maps to base intent rather than proxy metrics.' :
                               qIdx === 3 ? 'Explainability (XAI) ensures clinical experts can audit features trigger diagnosing pathways.' :
                               'The European Union (EU) AI Act classifies applications based on risk tiers (minimal, limited, high, unacceptable).'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default AnalyticsPage;
