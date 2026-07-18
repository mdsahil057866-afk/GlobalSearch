import React from 'react';
export default function CoreNetLogo({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF9933" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#138808" />
        </linearGradient>
        <filter id="glowNet"><feGaussianBlur stdDeviation="4" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
      </defs>
      <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="url(#netGrad)" strokeWidth="4" filter="url(#glowNet)" />
      <circle cx="50" cy="50" r="10" fill="url(#netGrad)" />
      <line x1="50" y1="50" x2="50" y2="10" stroke="url(#netGrad)" strokeWidth="3" />
      <line x1="50" y1="50" x2="10" y2="70" stroke="url(#netGrad)" strokeWidth="3" />
      <line x1="50" y1="50" x2="90" y2="70" stroke="url(#netGrad)" strokeWidth="3" />
    </svg>
  );
}
