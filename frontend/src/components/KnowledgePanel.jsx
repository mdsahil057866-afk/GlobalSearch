import React from 'react';
import { Share2, MoreVertical } from 'lucide-react';

const KnowledgePanel = () => {
  return (
    <div className="flex flex-col space-y-4">
      
      {}
      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-[#1f1f1f] shadow-sm hover:shadow-md transition-shadow">
        <div className="p-4 flex items-start justify-between">
          <div>
            <h2 className="text-[17px] font-medium text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-tight mb-1">
              u - song and lyrics by Kendrick Lamar - Spotify
            </h2>
            <p className="text-sm text-[#006621] dark:text-[#81c995] mb-2">
              u - song and lyrics by Kendrick Lamar | Spotify.
            </p>
            <div className="flex items-center mt-3">
              <div className="w-5 h-5 rounded-full bg-[#1DB954] flex items-center justify-center mr-2">
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.54-1.02.72-1.56.3z"/></svg>
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Spotify</span>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png/220px-Kendrick_Lamar_-_To_Pimp_a_Butterfly.png" 
              alt="Kendrick Lamar Album Cover" 
              className="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
            />
          </div>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-2 flex justify-end">
          <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {}
      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-[#1f1f1f] shadow-sm hover:shadow-md transition-shadow">
        <div className="p-4 flex items-start justify-between">
          <div className="flex-1 pr-4">
            <h2 className="text-[17px] font-medium text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-tight mb-1">
              U - Wikipedia
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-3">
              This article is about the letter of the alphabet. For other uses, see U (disambiguation). U (minuscule: u) is the twenty-first and sixth-to-last letter of the ISO basic Latin alphabet and the fifth vowel letter of the modern English alphabet.
            </p>
            <span className="text-sm text-gray-500 dark:text-gray-400">Wikipedia</span>
          </div>
          <div className="flex-shrink-0">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Uu_cursive.svg/1200px-Uu_cursive.svg.png" 
              alt="Cursive U" 
              className="w-20 h-auto object-contain border border-gray-200 dark:border-gray-700 rounded p-1 bg-white"
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default KnowledgePanel;
