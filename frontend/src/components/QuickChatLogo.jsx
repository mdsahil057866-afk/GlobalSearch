import React from 'react';
export default function QuickChatLogo({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="chatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF9933" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#138808" />
        </linearGradient>
        <filter id="glowChat"><feGaussianBlur stdDeviation="3" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
      </defs>
      <path d="M15,20 C15,10 25,10 25,10 L75,10 C85,10 85,20 85,20 L85,60 C85,70 75,70 75,70 L35,70 L15,90 L20,65 C15,60 15,50 15,50 Z" fill="url(#chatGrad)" filter="url(#glowChat)" opacity="0.9" />
      <circle cx="35" cy="40" r="6" fill="#000" />
      <circle cx="50" cy="40" r="6" fill="#000" />
      <circle cx="65" cy="40" r="6" fill="#000" />
    </svg>
  );
}
