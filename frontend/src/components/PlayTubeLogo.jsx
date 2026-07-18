import React from 'react';
import logoUrl from '../assets/playtube_logo.png';

export default function PlayTubeLogo({ className = "w-8 h-8" }) {
  return (
    <img 
      src={logoUrl} 
      alt="PlayTube Logo" 
      className={`object-contain ${className}`}
      style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}
    />
  );
}
