import React from 'react';
export default function NovaAILogo({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF9933" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#138808" />
        </linearGradient>
        <filter id="glowAI"><feGaussianBlur stdDeviation="4" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
      </defs>
      <circle cx="50" cy="45" r="25" fill="none" stroke="url(#aiGrad)" strokeWidth="4" filter="url(#glowAI)" />
      <path d="M35,40 C35,30 65,30 65,40 C65,55 50,65 50,65 C50,65 35,55 35,40 Z" fill="url(#aiGrad)" opacity="0.4" />
      <circle cx="43" cy="40" r="3" fill="#FFFFFF" />
      <circle cx="57" cy="40" r="3" fill="#FFFFFF" />
      <path d="M30,80 C30,70 40,65 50,65 C60,65 70,70 70,80" fill="none" stroke="url(#aiGrad)" strokeWidth="5" />
    </svg>
  );
}
