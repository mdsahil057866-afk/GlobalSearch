import React from 'react';
export default function PixoraLogo({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="socGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#138808" />
          <stop offset="50%" stopColor="#FF9933" />
          <stop offset="100%" stopColor="#FF00FF" />
        </linearGradient>
        <filter id="glowSoc"><feGaussianBlur stdDeviation="4" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
      </defs>
      <rect x="15" y="15" width="70" height="70" rx="20" fill="none" stroke="url(#socGrad)" strokeWidth="8" filter="url(#glowSoc)" />
      <circle cx="50" cy="50" r="16" fill="none" stroke="url(#socGrad)" strokeWidth="6" />
      <circle cx="70" cy="30" r="4" fill="#FFFFFF" />
    </svg>
  );
}
