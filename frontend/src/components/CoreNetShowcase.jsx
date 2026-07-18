import React, { useState } from 'react';
import { X, Sparkles, Search, Zap } from 'lucide-react';
import PlayTubeLogo from './PlayTubeLogo';
import QuickChatLogo from './QuickChatLogo';
import PixoraLogo from './PixoraLogo';
import CoreCloudLogo from './CoreCloudLogo';
import NovaAILogo from './NovaAILogo';
import CoreNetLogo from './CoreNetLogo';
import VillageInternetLogo from './VillageInternetLogo';

const apps = [
  {
    id: 'search',
    name: 'Bharat Search',
    description: 'AI-powered futuristic search engine with holographic UI and regional language voice search.',
    image: '/assets/images/bharat_search.png',
    icon: Search,
    color: 'from-orange-500 to-white'
  },
  {
    id: 'tube',
    name: 'PlayTube',
    description: 'Futuristic Indian video platform with creators dashboard, shorts section, gaming & education, and realistic red/saffron neon UI.',
    image: null,
    icon: PlayTubeLogo,
    color: 'from-red-600 to-orange-500'
  },
  {
    id: 'chat',
    name: 'QuickChat',
    description: 'Secure encrypted chat inspired by WhatsApp, Indian flag color theme, voice/video call, AI assistant inside app, and a modern cyber futuristic smartphone UI.',
    image: null,
    icon: QuickChatLogo,
    color: 'from-orange-500 via-white to-green-500'
  },
  {
    id: 'social',
    name: 'Pixora',
    description: 'Futuristic Indian social media combining Facebook & Instagram. Features reels, live streaming, AI feed, tricolor neon theme, and an ultra modern app design.',
    image: null,
    icon: PixoraLogo,
    color: 'from-orange-500 via-white to-green-500'
  },
  {
    id: 'cloud',
    name: 'CoreCloud',
    description: 'Secure data servers in India, holographic cloud dashboard, advanced cyber security elements, and an ultra realistic blue and saffron glowing technology concept.',
    image: null,
    icon: CoreCloudLogo,
    color: 'from-blue-600 to-orange-500'
  },
  {
    id: 'ai',
    name: 'NovaAI',
    description: 'Advanced futuristic humanoid AI speaking Hindi & regional languages. Features glowing tricolor hologram interface helping students & farmers in realistic 4K.',
    image: null,
    icon: NovaAILogo,
    color: 'from-orange-500 via-white to-green-500'
  },
  {
    id: 'net',
    name: 'CoreNet Ecosystem',
    description: 'All Bharat platforms connected together! Massive Indian AI data center with a tricolor cyberpunk style and ultra realistic 8K future technology world.',
    image: null,
    icon: CoreNetLogo,
    color: 'from-orange-500 via-white to-green-500'
  },
  {
    id: 'village',
    name: 'Village Internet Mode',
    description: 'Smart rural India internet system with low network support, offline messaging, AI voice assistant in Hindi, and solar powered internet towers for digital villages.',
    image: null,
    icon: VillageInternetLogo,
    color: 'from-green-600 to-yellow-500'
  }
];

export default function CoreNetShowcase({ onClose }) {
  const [activeApp, setActiveApp] = useState(null);

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col animate-in fade-in duration-500 overflow-hidden font-sans">
      {}
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-600/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-green-600/20 blur-[120px]"></div>
        <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] rounded-full bg-blue-600/20 blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
      </div>

      {}
      <header className="flex justify-between items-center p-6 border-b border-white/10 bg-black/40 backdrop-blur-md relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 via-white to-green-500 p-[2px] animate-pulse">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
              <Sparkles className="text-white w-5 h-5" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-500 uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            CoreNet Ecosystem
          </h1>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          <X className="w-6 h-6" />
        </button>
      </header>

      {}
      <main className="flex-1 overflow-y-auto p-6 sm:p-10 hide-scrollbar relative z-10">
        
        {}
        {activeApp ? (
          <div className="mb-12 animate-in slide-in-from-bottom-8 duration-500">
            <button 
              onClick={() => setActiveApp(null)}
              className="mb-4 text-white/70 hover:text-white flex items-center text-sm font-medium transition-colors"
            >
              &larr; Back to Ecosystem
            </button>
            <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-black/40 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              {activeApp.image ? (
                <div className="aspect-[16/9] w-full relative group">
                  <img src={activeApp.image} alt={activeApp.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  
                  {}
                  <div className="absolute bottom-0 left-0 p-8 sm:p-12 w-full">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeApp.color} p-[1px] mb-6 shadow-lg shadow-${activeApp.color.split('-')[1]}/50`}>
                      <div className="w-full h-full bg-black/80 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <activeApp.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h2 className="text-4xl sm:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-lg">{activeApp.name}</h2>
                    <p className="text-lg sm:text-xl text-white/80 max-w-2xl font-light mb-8">{activeApp.description}</p>
                    
                    <button className="px-8 py-3 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform flex items-center shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                      <Zap className="w-5 h-5 mr-2" /> Launch Prototype
                    </button>
                  </div>
                </div>
              ) : (
                <div className={`aspect-[16/9] w-full relative flex flex-col items-center justify-center bg-gradient-to-br ${activeApp.color} overflow-hidden`}>
                   <div className="absolute inset-0 bg-black/60"></div>
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                   <div className="relative z-10 flex flex-col items-center text-center p-8">
                      <activeApp.icon className="w-32 h-32 text-white/90 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] mb-8" />
                      <h2 className="text-4xl sm:text-6xl font-black text-white mb-4 tracking-tight">{activeApp.name}</h2>
                      <p className="text-xl text-white/80 max-w-xl font-light mb-8">{activeApp.description}</p>
                      <button className="px-8 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/50 text-white font-bold hover:bg-white/30 transition-all flex items-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        Coming Soon to CoreNet
                      </button>
                   </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">The Future is Here</h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">Explore the conceptual ultra-realistic 4K AI-driven digital ecosystem designed for the next generation of India.</p>
            </div>

            {}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {apps.map((app) => (
                <div 
                  key={app.id}
                  onClick={() => setActiveApp(app)}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] aspect-square flex flex-col"
                >
                  {}
                  <div className="absolute inset-0 z-0">
                    {app.image ? (
                      <>
                        <img src={app.image} alt={app.name} className="w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                      </>
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${app.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                    )}
                  </div>

                  {}
                  <div className="relative z-10 flex-1 flex flex-col p-6 justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.color} p-[1px] mb-4`}>
                      <div className="w-full h-full bg-black/80 rounded-xl flex items-center justify-center backdrop-blur-md">
                        <app.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                        {app.name}
                      </h3>
                      <p className="text-sm text-white/60 line-clamp-2 group-hover:text-white/80 transition-colors">
                        {app.description}
                      </p>
                    </div>
                  </div>
                  
                  {}
                  <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

