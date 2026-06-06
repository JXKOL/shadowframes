

const Logo = ({ className = "w-10 h-10", glow = true }) => {
  return (
    <div className={`relative ${className} ${glow ? 'glow-purple' : ''}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <filter id="inner-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="out" />
          </filter>
        </defs>
        
        {/* Hexagonal Shield Outer Frame */}
        <path
          d="M50 5L88 27V73L50 95L12 73V27L50 5Z"
          stroke="url(#logo-gradient)"
          strokeWidth="4"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"
        />
        
        {/* Inner Hexagon Accents */}
        <path
          d="M50 15L78 31V69L50 85L22 69V31L50 15Z"
          fill="url(#logo-gradient)"
          fillOpacity="0.1"
          stroke="url(#logo-gradient)"
          strokeWidth="1"
          strokeDasharray="4 2"
          opacity="0.5"
        />

        {/* Futuristic SF Lettering */}
        <g transform="translate(25, 35)">
          {/* S */}
          <path
            d="M20 0H5L0 5V12L5 17H15L20 22V29L15 34H0"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="square"
            className="animate-pulse"
          />
          {/* F */}
          <path
            d="M30 34V0H50M30 17H45"
            stroke="url(#logo-gradient)"
            strokeWidth="5"
            strokeLinecap="square"
          />
        </g>

        {/* Corner Detail Accents */}
        <path d="M50 5V15M12 27L22 31M88 27L78 31" stroke="white" strokeWidth="2" opacity="0.6" />
      </svg>
    </div>
  );
};

export default Logo;
