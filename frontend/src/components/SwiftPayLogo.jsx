import React from 'react';

export default function SwiftPayLogo({ className = "h-8 w-auto", iconOnly = false }) {
  if (iconOnly) {
    return (
      <svg viewBox="0 0 70 70" className={className} xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(5, 5)">
          <defs>
            <clipPath id="bp-circle-clip-icon">
              <circle cx="30" cy="30" r="23" />
            </clipPath>
          </defs>
          <g clipPath="url(#bp-circle-clip-icon)">
            <polygon points="0,0 42,0 0,42" fill="#FF9933" />
            <polygon points="42,0 60,0 60,18 18,60 0,60 0,42" fill="#FFFFFF" />
            <polygon points="60,18 60,60 18,60" fill="#138808" />
          </g>
          <g transform="translate(16, 28)">
            <circle cx="0" cy="0" r="5" fill="none" stroke="#000080" strokeWidth="0.8" />
            <path d="M 0 -5 L 0 5 M -5 0 L 5 0 M -3.5 -3.5 L 3.5 3.5 M -3.5 3.5 L 3.5 -3.5" stroke="#000080" strokeWidth="0.4" />
            <circle cx="0" cy="0" r="1.5" fill="#000080" />
          </g>
          <path d="M 25 53 A 24 24 0 0 0 56 26" fill="none" stroke="#138808" strokeWidth="5" strokeLinecap="round" />
          <polygon points="48,28 62,15 64,32" fill="#138808" />
          <text x="35" y="42" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="30" fill="#002147" textAnchor="middle">₹</text>
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 240 60" className={className} xmlns="http://www.w3.org/2000/svg">
      {}
      <g transform="translate(10, 0)">
        {}
        <defs>
          <clipPath id="bp-circle-clip">
            <circle cx="30" cy="30" r="23" />
          </clipPath>
        </defs>

        {}
        <g clipPath="url(#bp-circle-clip)">
          {}
          <polygon points="0,0 42,0 0,42" fill="#FF9933" />
          {}
          <polygon points="42,0 60,0 60,18 18,60 0,60 0,42" fill="#FFFFFF" />
          {}
          <polygon points="60,18 60,60 18,60" fill="#138808" />
        </g>

        {}
        <g transform="translate(16, 28)">
          <circle cx="0" cy="0" r="5" fill="none" stroke="#000080" strokeWidth="0.8" />
          <path d="M 0 -5 L 0 5 M -5 0 L 5 0 M -3.5 -3.5 L 3.5 3.5 M -3.5 3.5 L 3.5 -3.5" stroke="#000080" strokeWidth="0.4" />
          <circle cx="0" cy="0" r="1.5" fill="#000080" />
        </g>

        {}
        <path d="M 25 53 A 24 24 0 0 0 56 26" fill="none" stroke="#138808" strokeWidth="5" strokeLinecap="round" />
        {}
        <polygon points="48,28 62,15 64,32" fill="#138808" />

        {}
        <text x="35" y="42" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="30" fill="#002147" textAnchor="middle">₹</text>
      </g>

      {}
      <text x="80" y="43" fontFamily="'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" fontWeight="800" fontSize="36" fill="#FFFFFF" letterSpacing="-1">
        Bharat<tspan fill="#4285F4">Pay</tspan>
      </text>
    </svg>
  );
}
