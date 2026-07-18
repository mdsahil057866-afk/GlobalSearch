import React from 'react';

const LuminaAILogo = ({ className = "w-10 h-10", iconOnly = false }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background with glowing effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.5)]"></div>
      
      {/* Abstract AI Sparkle/Brain SVG */}
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3/5 h-3/5 relative z-10 text-white">
        <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" />
        <circle cx="12" cy="12" r="3" fill="#0f0f11" />
      </svg>
    </div>
  );
};

export default LuminaAILogo;
