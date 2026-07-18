import React from 'react';

const ZygoLogo = ({ className = "w-10 h-10", iconOnly = false }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-500 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.5)] transform -skew-x-6"></div>
      
      {/* Stylized 'Z' implying speed and transit */}
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3/5 h-3/5 relative z-10 text-white transform italic">
        <path d="M4 7H16L8 17H20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="7" r="2" fill="currentColor" />
        <circle cx="6" cy="17" r="2" fill="currentColor" />
      </svg>
    </div>
  );
};

export default ZygoLogo;
