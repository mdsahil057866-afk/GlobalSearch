import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, Loader2, Image as ImageIcon, Bot, X, Globe, Languages, Sparkles, ShieldCheck } from 'lucide-react';
import { getTranslation } from '../utils/translations';
import { useSearchLabs } from '../context/SearchLabsContext';

const SearchBar = ({ onSearch, isLoading, initialQuery, language = 'English' }) => {
  const languageCodes = {
    'Hindi': 'hi',
    'Bengali': 'bn',
    'Gujarati': 'gu',
    'Kannada': 'kn',
    'Malayalam': 'ml',
    'Marathi': 'mr',
    'Odia': 'or',
    'Punjabi': 'pa',
    'Tamil': 'ta',
    'Telugu': 'te',
    'Urdu': 'ur',
    'Arabic': 'ar',
    'Persian': 'fa',
    'Russian': 'ru'
  };

  const { isFeatureEnabled } = useSearchLabs();
  const [query, setQuery] = useState(initialQuery || '');
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Modals state
  const [showVoicePro, setShowVoicePro] = useState(false);
  const [showVisionAI, setShowVisionAI] = useState(false);
  const [showJarvis, setShowJarvis] = useState(false);
  const [jarvisQuery, setJarvisQuery] = useState('');
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    setQuery(initialQuery || '');
  }, [initialQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      let finalQuery = query;
      const langCode = languageCodes[language];
      
      if (langCode && language !== 'English') {
        const words = finalQuery.trim().split(' ');
        const lastWord = words[words.length - 1];
        
        if (lastWord && /^[a-zA-Z]+$/.test(lastWord)) {
          try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/api/transliterate?text=${encodeURIComponent(lastWord)}&langCode=${langCode}`);
            const data = await response.json();
            if (data[0] === 'SUCCESS' && data[1][0] && data[1][0][1] && data[1][0][1][0]) {
              const transliteratedWord = data[1][0][1][0];
              words[words.length - 1] = transliteratedWord;
              finalQuery = words.join(' ');
              setQuery(finalQuery);
            }
          } catch (error) {
            console.error("Transliteration on submit failed", error);
          }
        }
      }
      
      onSearch(finalQuery);
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    const langCode = languageCodes[language];
    if (!langCode || language === 'English') return;

    if (value.endsWith(' ')) {
      const words = value.split(' ');
      const lastWord = words[words.length - 2];
      
      if (lastWord && lastWord.trim() !== '' && /^[a-zA-Z]+$/.test(lastWord)) {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/api/transliterate?text=${encodeURIComponent(lastWord)}&langCode=${langCode}`);
          const data = await response.json();
          if (data[0] === 'SUCCESS' && data[1][0] && data[1][0][1] && data[1][0][1][0]) {
            const transliteratedWord = data[1][0][1][0];
            words[words.length - 2] = transliteratedWord;
            setQuery(words.join(' '));
          }
        } catch (error) {
          console.error("Transliteration failed", error);
        }
      }
    }
  };

  const handleVoiceSearch = () => {
    if (isListening) return;

    if (isFeatureEnabled('voice-pro')) {
      setShowVoicePro(true);
      return;
    }

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Your browser does not support voice search. Please try Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = language === 'English' ? 'en-US' : 'hi-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setQuery('Listening...');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      onSearch(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      setQuery('');
      if (event.error === 'network' || event.error === 'not-allowed' || event.error === 'no-speech') {
        const mockTranscript = prompt("Mic failed. Type your simulated voice command:", "");
        if (mockTranscript) {
          setQuery(mockTranscript);
          onSearch(mockTranscript);
        }
      } else if (event.error !== 'aborted') {
        alert('Voice search failed: ' + event.error);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (e) {
      console.error('Recognition start failed', e);
      setIsListening(false);
      const mockTranscript = prompt("Mic failed. Type your simulated voice command:", "");
      if (mockTranscript) {
        setQuery(mockTranscript);
        onSearch(mockTranscript);
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (isFeatureEnabled('lens-ai')) {
        setShowVisionAI(true);
        setTimeout(() => {
          setShowVisionAI(false);
          const mockQuery = `Vision AI Analysis: ${file.name}`;
          setQuery(mockQuery);
          onSearch(mockQuery);
        }, 3000);
      } else {
        const mockQuery = `Image Search: ${file.name}`;
        setQuery(mockQuery);
        onSearch(mockQuery);
      }
    }
  };

  return (
    <div className="w-full relative mx-auto max-w-[584px]">
      <form onSubmit={handleSubmit} className="relative w-full">
        <div 
          className={`flex items-center rounded-full px-4 py-3 transition-all duration-300 ${isFocused || query ? 'glass-panel bharat-glow border-transparent' : 'glass-panel border-white/20 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(255,153,51,0.2)]'}`}
        >
          <Search className="text-foreground/40 mr-3" size={20} />
          
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={getTranslation(language, 'searchPlaceholder')}
            className="flex-1 bg-transparent text-base text-foreground focus:outline-none w-full"
            autoFocus
          />

          {isLoading ? (
            <Loader2 className="animate-spin text-blue-500 ml-3" size={20} />
          ) : (
            <div className="flex items-center ml-2 space-x-1">
              {}
              <button
                type="button"
                onClick={handleVoiceSearch}
                className={`p-1.5 rounded-full transition-colors ${isListening ? 'bg-red-100 animate-pulse' : 'hover:bg-accent'}`}
                title={isFeatureEnabled('voice-pro') ? "Voice Search Pro" : "Search by voice"}
              >
                <Mic size={20} className={isListening ? 'text-red-500' : isFeatureEnabled('voice-pro') ? 'text-blue-500' : 'text-gray-600'} />
              </button>

              {}
              {isFeatureEnabled('lens-ai') ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1.5 rounded-full hover:bg-green-50/20 transition-colors group"
                  title="Vision AI Search"
                >
                  <ImageIcon size={20} className="text-[#138808] group-hover:drop-shadow-[0_0_8px_rgba(19,136,8,0.8)] transition-all" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1.5 rounded-full hover:bg-accent transition-colors"
                  title="Search by image"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14H8c-1.66 0-3-1.34-3-3s1.34-3 3-3h.5a5.5 5.5 0 0 1 10.89-1.22c1.37.15 2.44 1.34 2.44 2.72 0 1.51-1.22 2.73-2.73 2.73L16.5 16z"/>
                    <circle cx="12" cy="11.5" r="2.5" />
                  </svg>
                </button>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />

              {}
              {isFeatureEnabled('jarvis-integration') && (
                <button
                  type="button"
                  onClick={() => setShowJarvis(true)}
                  className="p-1.5 rounded-full hover:bg-teal-50/20 transition-colors group relative ml-1"
                  title="J.A.R.V.I.S Agent Mode"
                >
                  <div className="absolute inset-0 bg-teal-400 opacity-20 rounded-full animate-ping group-hover:opacity-40"></div>
                  <Bot size={20} className="text-teal-500 relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
                </button>
              )}

              {}
              {isFeatureEnabled('sge') && (
                <button
                  type="button"
                  className="flex items-center px-4 py-1.5 ml-2 rounded-full border border-[#FF9933]/30 bg-gradient-to-r from-[#FF9933]/10 to-[#138808]/10 hover:from-[#FF9933]/20 hover:to-[#138808]/20 transition-all text-sm font-semibold backdrop-blur-md shadow-[0_0_10px_rgba(255,153,51,0.2)] hover:shadow-[0_0_15px_rgba(255,153,51,0.4)]"
                  title="AI Overviews Enabled"
                >
                  <Sparkles className="w-4 h-4 mr-1 text-[#FF9933]" />
                  <span className="bg-gradient-to-r from-[#FF9933] to-[#138808] text-transparent bg-clip-text">NovaAI</span>
                </button>
              )}
            </div>
          )}
        </div>
      </form>

      {}
      {showVoicePro && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-white/20">
            <div className="p-8 flex flex-col items-center">
              <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                <div className="absolute inset-0 bg-blue-500 opacity-20 rounded-full animate-ping"></div>
                <div className="absolute inset-2 bg-blue-400 opacity-30 rounded-full animate-pulse"></div>
                <div className="relative z-10 w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                  <Mic size={40} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Voice Search Pro</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-8">Listening in multiple languages. Real-time translation active.</p>
              
              <div className="flex items-center space-x-2 text-sm text-blue-500 font-medium bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-8">
                <Languages size={16} />
                <span>Auto-detecting language...</span>
              </div>
              
              <button onClick={() => setShowVoicePro(false)} className="w-full py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-xl text-gray-700 dark:text-gray-300 font-bold transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      {showVisionAI && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-transparent flex flex-col items-center">
            <div className="relative w-48 h-48 mb-6 border-2 border-green-500 border-dashed rounded-xl flex items-center justify-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-green-400 animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_15px_rgba(74,222,128,1)]"></div>
              <ImageIcon size={64} className="text-green-500 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 text-center">Vision AI Analyzing...</h3>
            <p className="text-green-400 text-center">Extracting text, identifying objects, cross-referencing visual database.</p>
          </div>
        </div>
      )}

      {}
      {showJarvis && (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="absolute top-4 right-4">
             <button onClick={() => setShowJarvis(false)} className="text-gray-400 hover:text-white"><X size={32} /></button>
          </div>
          <div className="flex flex-col items-center max-w-lg w-full">
            <div className="relative w-64 h-64 flex items-center justify-center mb-12">
               <div className="absolute inset-0 border-[4px] border-teal-500 rounded-full animate-[spin_4s_linear_infinite] opacity-50 border-t-transparent border-b-transparent"></div>
               <div className="absolute inset-4 border-[2px] border-teal-300 rounded-full animate-[spin_3s_linear_infinite_reverse] opacity-70 border-l-transparent border-r-transparent"></div>
               <div className="absolute inset-8 border-[1px] border-teal-200 rounded-full animate-[spin_5s_linear_infinite] opacity-90 border-t-transparent"></div>
               <div className="w-32 h-32 bg-teal-500/20 rounded-full shadow-[0_0_50px_rgba(20,184,166,0.6)] flex items-center justify-center">
                 <Bot size={48} className="text-teal-400" />
               </div>
            </div>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4 tracking-widest uppercase">J.A.R.V.I.S</h2>
            <p className="text-teal-200/70 text-center text-lg mb-8">Awaiting directive, sir. I can book flights, send emails, or execute system commands.</p>
            <form onSubmit={(e) => { e.preventDefault(); if (jarvisQuery.trim()) { onSearch(jarvisQuery); setShowJarvis(false); setJarvisQuery(''); } }} className="w-full relative">
              <input type="text" value={jarvisQuery} onChange={(e) => setJarvisQuery(e.target.value)} placeholder="Type a directive..." className="w-full bg-teal-900/20 border border-teal-500/30 rounded-xl py-4 px-6 text-teal-100 placeholder-teal-500/50 focus:outline-none focus:border-teal-400 focus:bg-teal-900/40 shadow-[0_0_15px_rgba(20,184,166,0.1)] transition-all" autoFocus />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-teal-500 hover:bg-teal-400 rounded-lg text-black transition-colors"><Mic size={20} /></button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
