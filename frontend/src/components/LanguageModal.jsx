import React, { useState } from 'react';
import { X, Search, Globe } from 'lucide-react';

const LanguageModal = ({ isOpen, onClose, languages, currentLanguage, onSelectLanguage, isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredLanguages = languages.filter(lang => 
    lang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative w-full max-w-2xl max-h-[80vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-[#1f1f1f] border border-gray-700' : 'bg-white border border-gray-200'}`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between p-5 border-b ${isDarkMode ? 'border-gray-700 bg-[#1a1a1a]' : 'border-gray-100 bg-gray-50/50'}`}>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
              <Globe size={24} />
            </div>
            <div>
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Select Language
              </h2>
              <p className={`text-sm mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Choose your preferred language for GlobalSearch
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <div className={`relative flex items-center w-full rounded-xl overflow-hidden ${isDarkMode ? 'bg-black/50 border-gray-700' : 'bg-gray-100 border-transparent'} border focus-within:ring-2 focus-within:ring-blue-500/50 transition-all`}>
            <Search size={18} className={`absolute left-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input 
              type="text" 
              placeholder="Search languages..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-3 pl-11 pr-4 bg-transparent outline-none text-sm ${isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
            />
          </div>
        </div>

        {}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {filteredLanguages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filteredLanguages.map(lang => {
                const isSelected = lang === currentLanguage;
                return (
                  <button
                    key={lang}
                    onClick={() => {
                      onSelectLanguage(lang);
                      onClose();
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 ${
                      isSelected 
                        ? (isDarkMode ? 'bg-blue-600/20 border-blue-500/50 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-700')
                        : (isDarkMode ? 'hover:bg-gray-800 border-transparent text-gray-300' : 'hover:bg-gray-50 border-transparent text-gray-700')
                    } border`}
                  >
                    <span className="font-medium text-sm">{lang}</span>
                    {isSelected && (
                      <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'}`} />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 opacity-50">
              <Globe size={48} className={`mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`} />
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>No languages found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
