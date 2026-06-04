import React from 'react';

const Logo = ({ className = "w-10 h-10", glow = true }) => {
  return (
    <div className={`relative ${className} ${glow ? 'glow-purple' : ''} rounded-xl overflow-hidden`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        {/* Shield Shape */}
        <path
          d="M50 5L15 20V45C15 67.5 50 95 50 95C50 95 85 67.5 85 45V20L50 5Z"
          fill="url(#logo-gradient)"
          fillOpacity="0.15"
          stroke="url(#logo-gradient)"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* SF Letters */}
        <text
          x="50%"
          y="58%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="url(#logo-gradient)"
          style={{
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 900,
            fontSize: '38px',
            letterSpacing: '-2px'
          }}
        >
          SF
        </text>
        {/* Detail Lines */}
        <path
          d="M30 25H40M60 25H70M25 40H30M70 40H75"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>
    </div>
  );
};

export default Logo;
