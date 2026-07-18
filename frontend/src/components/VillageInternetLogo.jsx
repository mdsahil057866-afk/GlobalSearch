import React from 'react';
export default function VillageInternetLogo({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="villGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#138808" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
        <filter id="glowVill"><feGaussianBlur stdDeviation="3" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
      </defs>
      <path d="M50,80 L35,20 L65,20 Z" fill="none" stroke="url(#villGrad)" strokeWidth="5" filter="url(#glowVill)" />
      <line x1="42" y1="50" x2="58" y2="50" stroke="url(#villGrad)" strokeWidth="4" />
      <line x1="47" y1="70" x2="53" y2="70" stroke="url(#villGrad)" strokeWidth="4" />
      <circle cx="50" cy="15" r="8" fill="#FFD700" filter="url(#glowVill)" />
      <path d="M30,30 Q20,15 30,0 M70,30 Q80,15 70,0" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="4 4" />
    </svg>
  );
}
