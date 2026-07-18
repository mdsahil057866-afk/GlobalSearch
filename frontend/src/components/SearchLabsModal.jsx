import React from 'react';
import { X, Beaker, Sparkles, Image as ImageIcon, Mic, Code, Check, Video, ShieldAlert, Bot } from 'lucide-react';
import { useSearchLabs } from '../context/SearchLabsContext';

const SearchLabsModal = ({ isOpen, onClose }) => {
  const { features, toggleFeature } = useSearchLabs();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-sans">
      {}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {}
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white dark:bg-[#1a1a1a] rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-400 border border-white/20 dark:border-white/10">
        
        {}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        
        {}
        <div className="flex items-center justify-between px-8 pt-8 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-2xl">
              <Beaker className="text-purple-600 dark:text-purple-400" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Search Labs</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 font-medium">Try early-stage AI experiments</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {}
        <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-4 custom-scrollbar">
          
          <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/30 rounded-2xl p-5 mb-6">
            <p className="text-sm text-purple-800 dark:text-purple-300 font-medium leading-relaxed">
              Welcome to GlobalSearch Labs! Here you can turn on experimental features and help shape the future of search. These features are in development and their availability may change.
            </p>
          </div>

          <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2 pt-2">Available Experiments</h3>
          
          {}
          <div className="space-y-4">
            {features.map((feature) => (
              <div 
                key={feature.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 hover:bg-white dark:hover:bg-gray-800/80 transition-all shadow-sm hover:shadow-md group"
              >
                <div className="flex items-start space-x-4 mb-4 sm:mb-0 pr-4">
                  <div className={`p-3 rounded-xl flex-shrink-0 ${feature.bgColor} transition-colors group-hover:scale-105 duration-300`}>
                    <feature.icon className={feature.color} size={22} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">{feature.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {}
                <button
                  onClick={() => toggleFeature(feature.id)}
                  className={`relative flex items-center justify-center w-[72px] h-[34px] rounded-full flex-shrink-0 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-900 ${
                    feature.enabled ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <span className="sr-only">Toggle {feature.title}</span>
                  <div 
                    className={`absolute flex items-center justify-center w-[26px] h-[26px] bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out ${
                      feature.enabled ? 'translate-x-[18px]' : '-translate-x-[18px]'
                    }`}
                  >
                    {feature.enabled && <Check size={14} className="text-purple-600" strokeWidth={3} />}
                  </div>
                </button>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default SearchLabsModal;
