import React, { useEffect, useState } from 'react';
import { X, ChevronRight, ChevronLeft, Play, Pause, Volume2, MoreHorizontal } from 'lucide-react';

const StoryViewer = ({ story, onClose, onNext, onPrev }) => {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          onNext(); 
          return 0;
        }
        return oldProgress + 1; 
      });
    }, 50);

    return () => clearInterval(timer);
  }, [isPaused, onNext, story]);

  
  useEffect(() => {
    setProgress(0);
  }, [story]);

  if (!story) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
      
      {}
      <div className="absolute top-4 left-4 flex items-center gap-4 z-10">
        <button onClick={onClose} className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors">
          <X className="w-6 h-6" />
        </button>
        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
          f
        </div>
      </div>

      {}
      <button 
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-20 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button 
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-20 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {}
      <div 
        className="relative w-full max-w-[400px] h-[90vh] md:h-[95vh] bg-[#242526] rounded-xl overflow-hidden cursor-pointer flex flex-col justify-center"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        
        {}
        <div className="absolute top-0 left-0 right-0 p-3 z-10 flex gap-1">
          <div className="h-1 bg-white/30 flex-1 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {}
        <div className="absolute top-6 left-0 right-0 p-3 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={story.img} alt={story.name} className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover" />
            <span className="font-semibold text-white drop-shadow-md">{story.name}</span>
            <span className="text-gray-300 text-sm drop-shadow-md">4h</span>
          </div>
          <div className="flex items-center gap-3 text-white">
            <button onClick={() => setIsPaused(!isPaused)}>
              {isPaused ? <Play className="w-5 h-5 drop-shadow-md" /> : <Pause className="w-5 h-5 drop-shadow-md" />}
            </button>
            <Volume2 className="w-5 h-5 drop-shadow-md" />
            <MoreHorizontal className="w-5 h-5 drop-shadow-md" />
          </div>
        </div>

        {}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-3xl z-0" style={{ backgroundImage: `url(${story.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <img src={story.img} alt="Story" className="w-full max-h-full object-contain relative z-0" />

        {}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-3">
            <input 
              type="text" 
              placeholder="Reply..." 
              className="flex-1 bg-transparent border border-white/50 rounded-full px-4 py-2.5 text-white placeholder-white/70 outline-none focus:border-white transition-colors"
            />
            <button className="text-white hover:text-blue-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StoryViewer;
