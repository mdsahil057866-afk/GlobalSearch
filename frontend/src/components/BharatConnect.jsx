import React from 'react';
import { SocialProvider } from '../context/SocialContext';
import NewsFeed from './Social/NewsFeed';

export default function Pixora({ onBack }) {
  return (
    <SocialProvider>
      <div className="relative w-full h-full bg-[#F0F2F5] dark:bg-[#18191A]">
        {}
        <button 
          onClick={onBack}
          className="fixed top-2 left-4 z-[60] w-10 h-10 flex items-center justify-center bg-[#F0F2F5] dark:bg-[#3A3B3C] rounded-full shadow-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="Back to Home"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <NewsFeed />
      </div>
    </SocialProvider>
  );
}
