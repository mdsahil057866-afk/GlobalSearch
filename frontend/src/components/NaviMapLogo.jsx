import React from 'react';

export default function NaviMapLogo({ className = "w-full max-w-sm", iconOnly = false }) {
  const indiaPolygon = "40,10 45,0 55,5 60,15 55,25 65,30 70,40 80,40 95,45 90,55 80,55 75,50 70,55 60,55 55,75 50,85 45,100 35,85 30,65 25,55 5,50 15,45 25,45 30,35 35,25";

  if (iconOnly) {
    return (
      <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="india-clip-icon">
            <polygon points={indiaPolygon} />
          </clipPath>
        </defs>
        
        <g clipPath="url(#india-clip-icon)">
          <rect x="0" y="0" width="100" height="33" fill="#FF9933" />
          <rect x="0" y="33" width="100" height="34" fill="#FFFFFF" />
          <rect x="0" y="67" width="100" height="34" fill="#138808" />
        </g>
        
        <g transform="translate(50, 50)">
          <circle cx="0" cy="0" r="8" fill="none" stroke="#000080" strokeWidth="1" />
          <path d="M 0 -8 L 0 8 M -8 0 L 8 0 M -5.5 -5.5 L 5.5 5.5 M -5.5 5.5 L 5.5 -5.5" stroke="#000080" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="1.5" fill="#000080" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="india-clip">
          <polygon points={indiaPolygon} />
        </clipPath>
        
        <g id="map-pin" transform="scale(0.35) translate(-12, -30)">
          <path d="M 12 0 C 5.3 0 0 5.3 0 12 C 0 21 12 30 12 30 C 12 30 24 21 24 12 C 24 5.3 18.7 0 12 0 Z" fill="#4285F4" stroke="#002147" strokeWidth="2" />
          <circle cx="12" cy="10" r="4" fill="#FFFFFF" />
        </g>
      </defs>

      {}
      {}
      <text x="100" y="30" fontFamily="'Inter', 'Segoe UI', sans-serif" fontWeight="900" fontSize="24" fill="#FFFFFF" textAnchor="middle" letterSpacing="1">
        BHARATMAP
      </text>

      {}
      <g transform="translate(50, 40)">
        
        {}
        <polygon points={indiaPolygon} fill="#000000" opacity="0.2" transform="translate(2, 4)" />
        
        {}
        <g clipPath="url(#india-clip)">
          <rect x="0" y="0" width="100" height="33.3" fill="#FF9933" />
          <rect x="0" y="33.3" width="100" height="33.4" fill="#FFFFFF" />
          <rect x="0" y="66.7" width="100" height="33.3" fill="#138808" />
        </g>

        {}
        <g transform="translate(50, 50)">
          <circle cx="0" cy="0" r="10" fill="none" stroke="#000080" strokeWidth="1" />
          <path d="M 0 -10 L 0 10 M -10 0 L 10 0 M -7 -7 L 7 7 M -7 7 L 7 -7 M -3.8 -9.2 L 3.8 9.2 M -9.2 -3.8 L 9.2 3.8 M -9.2 3.8 L 9.2 -3.8 M -3.8 9.2 L 3.8 -9.2" stroke="#000080" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="2" fill="#000080" />
        </g>
        
        {}
        <path d="M 45 10 L 25 45 L 30 65 L 50 85 L 70 55 L 90 45 L 70 40 Z" fill="none" stroke="#002147" strokeWidth="1" opacity="0.6" />
        <path d="M 25 45 L 70 40 M 30 65 L 70 55 M 50 85 L 50 50 M 45 10 L 50 50 L 90 45" fill="none" stroke="#002147" strokeWidth="1" opacity="0.6" />

        {}
        <use href="#map-pin" x="45" y="10" />
        <use href="#map-pin" x="25" y="45" />
        <use href="#map-pin" x="30" y="65" />
        <use href="#map-pin" x="50" y="85" />
        <use href="#map-pin" x="70" y="55" />
        <use href="#map-pin" x="90" y="45" />
        <use href="#map-pin" x="70" y="40" />
      </g>

      {}
      <g transform="translate(140, 130) scale(0.6)">
        <circle cx="0" cy="0" r="22" fill="none" stroke="#002147" strokeWidth="2" />
        <polygon points="0,-24 4,-4 24,0 4,4 0,24 -4,4 -24,0 -4,-4" fill="#002147" />
        <polygon points="0,-24 0,0 -24,0" fill="#4285F4" opacity="0.5" />
        <polygon points="0,24 0,0 24,0" fill="#4285F4" opacity="0.5" />
        <text x="0" y="-28" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="12" fill="#FFFFFF" textAnchor="middle">N</text>
      </g>

      {}
      <text x="100" y="175" fontFamily="'Inter', 'Segoe UI', sans-serif" fontWeight="600" fontSize="7" fill="#888888" textAnchor="middle" letterSpacing="2">
        GLOBAL EXPLORER • PATHFINDER
      </text>
    </svg>
  );
}
