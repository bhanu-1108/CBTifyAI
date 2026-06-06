import React, { useRef } from 'react';

const GlassCard = ({ children, className = '', glowColor = 'purple' }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const glowColors = {
    blue: 'rgba(59, 130, 246, 0.15)',
    purple: 'rgba(139, 92, 246, 0.15)',
    cyan: 'rgba(6, 182, 212, 0.15)',
    green: 'rgba(16, 185, 129, 0.15)'
  };

  const selectedGlow = glowColors[glowColor] || glowColors.purple;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => e.currentTarget.style.setProperty('--hover-opacity', '1')}
      onMouseLeave={(e) => e.currentTarget.style.setProperty('--hover-opacity', '0')}
      className={`glow-card glass-panel rounded-24px p-6 border border-borderGlass relative transition-all duration-300 hover:border-white/10 ${className}`}
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px',
        '--hover-opacity': '0'
      }}
    >
      {/* Glow effect background layer */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-24px z-0"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), ${selectedGlow}, transparent 50%)`,
          opacity: 'var(--hover-opacity)'
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;
