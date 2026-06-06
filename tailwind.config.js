/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#080B14',
        darkSec: '#111827',
        accentBlue: '#3B82F6',
        purpleGlow: '#8B5CF6',
        cyanAccent: '#06B6D4',
        whiteText: '#F8FAFC',
        mutedGray: '#9CA3AF',
        borderGlass: 'rgba(255, 255, 255, 0.08)',
        bgGlass: 'rgba(17, 24, 39, 0.7)',
      },
      fontFamily: {
        sans: ['Inter', 'Satoshi', 'General Sans', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        glowBlue: '0 0 20px 2px rgba(59, 130, 246, 0.15)',
        glowPurple: '0 0 20px 2px rgba(139, 92, 246, 0.15)',
        glowCyan: '0 0 20px 2px rgba(6, 182, 212, 0.15)',
      },
      borderRadius: {
        '24px': '24px',
      }
    },
  },
  plugins: [],
}
