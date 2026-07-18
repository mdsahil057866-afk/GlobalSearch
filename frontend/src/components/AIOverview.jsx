import React, { useState } from 'react';
import { Sparkles, Volume2, ChevronDown } from 'lucide-react';

const AIOverview = ({ query = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayQuery = query ? query : 'the topic';
  const firstLetter = query ? query.charAt(0).toUpperCase() : 'AI';

  return (
    <div className="mb-8 rounded-2xl bg-gradient-to-br from-blue-50/50 via-purple-50/20 to-green-50/30 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-green-900/10 border border-[#e5e7eb] dark:border-gray-800 overflow-hidden font-sans">
      <div className="p-5">
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Sparkles size={18} className="text-[#4285F4] fill-[#4285F4]" />
            <span className="text-lg font-medium text-gray-900 dark:text-gray-100">AI Overview</span>
            <div className="flex items-center space-x-2 ml-4">
              <span className="bg-blue-100/50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full cursor-pointer hover:bg-blue-100 transition-colors">हिन्दी</span>
              <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-blue-600 dark:text-blue-400 transition-colors">
                <Volume2 size={16} />
              </button>
            </div>
          </div>
          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          
          <div className="flex-1 space-y-4 text-[15px] leading-relaxed text-gray-800 dark:text-gray-200">
            <p>
              Here is an AI summary for <span className="bg-blue-100/40 dark:bg-blue-900/30 px-1 py-0.5 rounded font-bold capitalize">"{displayQuery}"</span> based on top search results. This topic is widely discussed across various online platforms and official sources.
              <span className="inline-flex items-center ml-2 text-xs text-gray-500 border border-gray-200 dark:border-gray-700 rounded-full px-2 py-0.5 bg-white dark:bg-gray-800 cursor-pointer shadow-sm hover:shadow-md transition-shadow">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png" className="w-3 h-3 mr-1 grayscale opacity-70" alt="Wikipedia" />
                Wikipedia +1
              </span>
            </p>

            <p>Depending on your context, you might be looking for:</p>

            <div className="space-y-3 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">1. Key Information & Overview</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Definition:</strong> <b>{displayQuery}</b> refers to the primary subject of your search, encompassing relevant news, tools, or official portals in India.
                </li>
              </ul>
              
              {!isExpanded && (
                <div className="h-8 bg-gradient-to-t from-white dark:from-[#1f1f1f] to-transparent w-full mt-[-20px] relative z-10"></div>
              )}
              
              {isExpanded && (
                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mt-2">
                  <li><strong>Core Features:</strong> Access localized information, verified resources, and related media seamlessly.</li>
                  <li><strong>Updates:</strong> Check out the latest headlines and verified notifications regarding this topic.</li>
                  <li><strong>Related Areas:</strong> Explore associated digital ecosystem services and hyper-local applications.</li>
                </ul>
              )}
            </div>
          </div>

          <div className="w-full md:w-48 flex-shrink-0 flex items-start justify-center md:justify-end">
            <svg 
              viewBox="0 0 100 100" 
              className="w-32 h-32 filter drop-shadow-xl"
              style={{ filter: 'drop-shadow(0px 10px 15px rgba(212, 175, 55, 0.4)) saturate(1.5) brightness(1.1)' }}
            >
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF8D6" />
                  <stop offset="30%" stopColor="#FDE047" />
                  <stop offset="70%" stopColor="#EAB308" />
                  <stop offset="100%" stopColor="#A16207" />
                </linearGradient>
              </defs>
              <text 
                x="50%" 
                y="80%" 
                fontFamily="Georgia, serif" 
                fontSize="85" 
                fontWeight="bold" 
                fill="url(#goldGradient)" 
                textAnchor="middle"
              >
                {firstLetter}
              </text>
            </svg>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-800/50 p-2 flex justify-center bg-white/50 dark:bg-gray-900/20 backdrop-blur-sm">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors py-2 px-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <span>{isExpanded ? 'Show less' : 'Show more'}</span>
          <ChevronDown size={16} className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default AIOverview;
