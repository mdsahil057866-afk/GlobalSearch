import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Bookmark, Trash2, Search } from 'lucide-react';

const BookmarksModal = ({ isOpen, onClose }) => {
  const [savedItems, setSavedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      try {
        const items = JSON.parse(localStorage.getItem('gs_saved_items')) || [];
        setSavedItems(items);
      } catch(e) {
        setSavedItems([]);
      }
    }
  }, [isOpen]);

  const removeItem = (url) => {
    const newItems = savedItems.filter(item => item.url !== url);
    setSavedItems(newItems);
    localStorage.setItem('gs_saved_items', JSON.stringify(newItems));
  };

  const clearAll = () => {
    if (window.confirm("Are you sure you want to clear all saved items?")) {
      setSavedItems([]);
      localStorage.removeItem('gs_saved_items');
    }
  };

  if (!isOpen) return null;

  const filteredItems = savedItems.filter(item => 
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.snippet?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[200] flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="w-full max-w-md bg-white dark:bg-[#1a1a1c] border-l border-gray-200 dark:border-white/10 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-white/10">
          <div className="flex items-center text-gray-900 dark:text-white">
            <Bookmark className="w-6 h-6 mr-3 text-blue-500 fill-blue-500/20" />
            <h2 className="text-2xl font-bold tracking-tight">Saved Items</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 pb-2 border-b border-gray-200 dark:border-white/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search saved items..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 dark:bg-black/40 border border-transparent dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{savedItems.length} Items</span>
            {savedItems.length > 0 && (
              <button onClick={clearAll} className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors">Clear All</button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-70">
              <Bookmark className="w-16 h-16 mb-4 stroke-[1.5]" />
              <p className="text-lg font-medium">{searchQuery ? "No matching items found" : "No saved items yet"}</p>
              {!searchQuery && <p className="text-sm mt-2 text-center max-w-[250px]">Click the bookmark icon on any search result to save it here for offline access.</p>}
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 hover:shadow-md transition-shadow group relative">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="block pr-8">
                  <h3 className="font-bold text-blue-600 dark:text-blue-400 line-clamp-2 leading-tight mb-2 group-hover:underline">{item.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">{item.snippet}</p>
                </a>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
                  <span className="text-[10px] text-gray-400 truncate max-w-[200px]">{item.url}</span>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 p-1">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <button 
                  onClick={() => removeItem(item.url)}
                  className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 bg-gray-50 dark:bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarksModal;
