import React from 'react';
export default function CoreCloudLogo({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#007BFF" />
          <stop offset="100%" stopColor="#FF9933" />
        </linearGradient>
        <filter id="glowCloud"><feGaussianBlur stdDeviation="5" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
      </defs>
      <path d="M25,65 C15,65 15,50 25,50 C25,30 55,25 65,40 C80,40 85,55 75,65 Z" fill="none" stroke="url(#cloudGrad)" strokeWidth="6" filter="url(#glowCloud)" />
      <path d="M40,50 L50,40 L60,50" fill="none" stroke="#FFFFFF" strokeWidth="4" />
      <line x1="50" y1="40" x2="50" y2="75" stroke="#FFFFFF" strokeWidth="4" />
    </svg>
  );
}

