import React, { useState } from 'react';
import { ArrowLeft, Search, Star, Download, CheckCircle2, UploadCloud, Plus, Code, X, Image as ImageIcon, ShoppingBag, Pizza } from 'lucide-react';
import mapLogoImg from '../assets/navimap_logo.png';
import aiLogoImg from '../assets/novaai_logo.png';
import socialLogoImg from '../assets/pixora_logo.png';
import chatLogoImg from '../assets/quickchat_logo.png';
import mailLogoImg from '../assets/swiftmail_logo.png';
import connectLogoImg from '../assets/pixora_unique_logo.png';
import PlayTubeLogo from './PlayTubeLogo';
import CoreCloudLogo from './CoreCloudLogo';
import VillageInternetLogo from './VillageInternetLogo';
import SwiftPayLogo from './SwiftPayLogo';
import CoreNetLogo from './CoreNetLogo';
import LuminaAILogo from './LuminaAILogo';
import ZygoLogo from './ZygoLogo';

const STORE_APPS = [
  {
    id: 'cravedrop',
    name: 'CraveDrop',
    category: 'Food & Drink',
    developer: 'GlobalSearch Inc.',
    rating: '4.9',
    reviews: '1.2M',
    size: '35 MB',
    iconType: 'component',
    iconComponent: Pizza,
    description: 'Lightning fast food delivery from your favorite restaurants with premium dining offers.'
  },
  {
    id: 'shopnova',
    name: 'ShopNova',
    category: 'Shopping',
    developer: 'GlobalSearch Inc.',
    rating: '4.8',
    reviews: '3.5M',
    size: '42 MB',
    iconType: 'component',
    iconComponent: ShoppingBag,
    description: 'The ultimate e-commerce experience. Shop the latest trends with exclusive discounts.'
  },
  {
    id: 'zygo',
    name: 'Zygo',
    category: 'Travel & Mobility',
    developer: 'GlobalSearch Inc.',
    rating: '4.9',
    reviews: '5.2M',
    size: '45 MB',
    iconType: 'component',
    iconComponent: ZygoLogo,
    description: 'Next-gen ride hailing with AR pickup radar, fare negotiation, and a dedicated EV fleet.'
  },
  {
    id: 'quickchat',
    name: 'QuickChat',
    category: 'Communication',
    developer: 'GlobalSearch Inc.',
    rating: '4.9',
    reviews: '2.4M',
    size: '42 MB',
    iconType: 'img',
    iconSrc: chatLogoImg,
    description: 'A lightning-fast, highly secure messaging platform with built-in AI translation and rich media sharing.'
  },
  {
    id: 'playtube',
    name: 'PlayTube',
    category: 'Entertainment',
    developer: 'GlobalSearch Inc.',
    rating: '4.8',
    reviews: '5.1M',
    size: '68 MB',
    iconType: 'component',
    iconComponent: PlayTubeLogo,
    description: 'Immersive short-form and long-form video platform with seamless scrolling and premium UI.'
  },
  {
    id: 'pixora',
    name: 'Pixora',
    category: 'Social',
    developer: 'GlobalSearch Inc.',
    rating: '4.7',
    reviews: '1.2M',
    size: '55 MB',
    iconType: 'img',
    iconSrc: socialLogoImg,
    description: 'Share your moments, connect with friends, and discover new creators in a vibrant social network.'
  },
  {
    id: 'navimap',
    name: 'NaviMap',
    category: 'Navigation',
    developer: 'GlobalSearch Inc.',
    rating: '4.9',
    reviews: '3.8M',
    size: '120 MB',
    iconType: 'img',
    iconSrc: mapLogoImg,
    description: 'Highly detailed 3D navigation with real-time traffic, offline maps, and hyper-local discovery.'
  },
  {
    id: 'swiftpay',
    name: 'SwiftPay',
    category: 'Finance',
    developer: 'GlobalSearch Inc.',
    rating: '4.8',
    reviews: '4.5M',
    size: '34 MB',
    iconType: 'component',
    iconComponent: SwiftPayLogo,
    description: 'Secure, instant UPI payments, wallet services, and financial tracking all in one app.'
  },
  {
    id: 'luminaai',
    name: 'LuminaAI',
    category: 'Productivity',
    developer: 'GlobalSearch Labs',
    rating: '5.0',
    reviews: '3.2M',
    size: '110 MB',
    iconType: 'component',
    iconComponent: LuminaAILogo,
    description: 'The ultimate AI assistant. Write code, generate images, and converse in over 30 languages seamlessly.'
  },
  {
    id: 'novaai',
    name: 'NovaAI',
    category: 'Productivity',
    developer: 'GlobalSearch Labs',
    rating: '5.0',
    reviews: '890K',
    size: '22 MB',
    iconType: 'img',
    iconSrc: aiLogoImg,
    description: 'Your intelligent virtual assistant. Summarize text, generate images, and code at the speed of thought.'
  },
  {
    id: 'bharatdrive',
    name: 'BharatDrive',
    category: 'Productivity',
    developer: 'GlobalSearch Inc.',
    rating: '4.6',
    reviews: '1.1M',
    size: '45 MB',
    iconType: 'component',
    iconComponent: CoreCloudLogo,
    description: 'Secure cloud storage with zero-knowledge encryption and seamless file syncing.'
  },
  {
    id: 'villagenet',
    name: 'VillageNet',
    category: 'Tools',
    developer: 'GlobalSearch CSR',
    rating: '4.9',
    reviews: '500K',
    size: '18 MB',
    iconType: 'component',
    iconComponent: VillageInternetLogo,
    description: 'Connecting rural communities with mesh networks and low-bandwidth optimized internet access.'
  },
  {
    id: 'pixora-connect',
    name: 'Pixora Connect',
    category: 'Professional',
    developer: 'GlobalSearch Inc.',
    rating: '4.5',
    reviews: '2.2M',
    size: '80 MB',
    iconType: 'img',
    iconSrc: connectLogoImg,
    description: 'The ultimate professional network. Build your career, find jobs, and connect with industry leaders.'
  },
  {
    id: 'swiftmail',
    name: 'SwiftMail',
    category: 'Communication',
    developer: 'GlobalSearch Inc.',
    rating: '4.7',
    reviews: '3.1M',
    size: '38 MB',
    iconType: 'img',
    iconSrc: mailLogoImg,
    description: 'Fast, secure, and smart email client with powerful search and spam protection.'
  },
  {
    id: 'corenet',
    name: 'CoreNet',
    category: 'Tools',
    developer: 'GlobalSearch Inc.',
    rating: '4.8',
    reviews: '1.5M',
    size: '12 MB',
    iconType: 'component',
    iconComponent: CoreNetLogo,
    description: 'A revolutionary networking infrastructure bridging the digital divide.'
  },
  {
    id: 'syncmeet',
    name: 'SyncMeet',
    category: 'Communication',
    developer: 'GlobalSearch Inc.',
    rating: '4.6',
    reviews: '2.1M',
    size: '48 MB',
    iconType: 'svg',
    iconPath: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
    iconColor: '#4285F4',
    description: 'High-quality, secure video conferencing for personal and enterprise use.'
  }
];

let globalAppsList = null;
let globalDownloadStates = {};

export default function GlobalSearchAppStore({ onBack, onLaunchApp }) {
  if (!globalAppsList) globalAppsList = [...STORE_APPS];
  
  const [appsList, setAppsList] = useState(globalAppsList);
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadStates, setDownloadStates] = useState(globalDownloadStates); // id -> 'idle' | 'downloading' | 'installing' | 'installed'
  const [downloadProgress, setDownloadProgress] = useState({}); // id -> number (0-100)
  const [selectedApp, setSelectedApp] = useState(null);
  const [isDevConsoleOpen, setIsDevConsoleOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newAppForm, setNewAppForm] = useState({ name: '', category: 'Productivity', description: '', developer: 'Independent Developer', size: '15 MB' });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmitApp = (e) => {
    e.preventDefault();
    if (!newAppForm.name || !newAppForm.description || !selectedFile) {
      alert("Please fill all required fields and upload an app package.");
      return;
    }
    
    const newApp = {
      id: newAppForm.name.toLowerCase().replace(/\s+/g, '-'),
      name: newAppForm.name,
      category: newAppForm.category,
      developer: newAppForm.developer,
      rating: '5.0',
      reviews: '0',
      size: newAppForm.size,
      iconType: 'component',
      iconComponent: Code,
      description: newAppForm.description
    };
    
    const newList = [newApp, ...appsList];
    setAppsList(newList);
    globalAppsList = newList;
    
    setIsDevConsoleOpen(false);
    setNewAppForm({ name: '', category: 'Productivity', description: '', developer: 'Independent Developer', size: '15 MB' });
    setSelectedFile(null);
    setSelectedApp(newApp);
  };

  const handleInstall = (appId, e) => {
    if (e) e.stopPropagation();
    
    if (downloadStates[appId] === 'installed') {
      onLaunchApp(appId);
      return;
    }
    
    if (downloadStates[appId] && downloadStates[appId] !== 'idle') return;
    
    setDownloadStates(prev => {
      const next = { ...prev, [appId]: 'downloading' };
      globalDownloadStates = next;
      return next;
    });
    setDownloadProgress(prev => ({ ...prev, [appId]: 0 }));
    
    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setDownloadStates(prev => {
          const next = { ...prev, [appId]: 'installing' };
          globalDownloadStates = next;
          return next;
        });
        setDownloadProgress(prev => ({ ...prev, [appId]: 100 }));
        
        // Simulate installation delay
        setTimeout(() => {
          setDownloadStates(prev => {
            const next = { ...prev, [appId]: 'installed' };
            globalDownloadStates = next;
            return next;
          });
        }, 1500);
      } else {
        setDownloadProgress(prev => ({ ...prev, [appId]: progress }));
      }
    }, 200);
  };

  const renderIcon = (app, className = "") => {
    if (app.iconType === 'img') {
      return <img src={app.iconSrc} alt={app.name} className={`object-cover rounded-2xl ${className}`} />;
    } else if (app.iconType === 'svg') {
      return (
        <div className={`flex items-center justify-center bg-[#050505] rounded-2xl ${className}`}>
          <svg viewBox="0 0 24 24" className="w-1/2 h-1/2" fill={app.iconColor}>
            <path d={app.iconPath} />
          </svg>
        </div>
      );
    } else {
      const Component = app.iconComponent;
      return (
        <div className={`flex items-center justify-center bg-[#050505] rounded-2xl ${className}`}>
          <Component className="w-3/4 h-3/4" iconOnly={true} />
        </div>
      );
    }
  };

  const getButtonState = (appId) => {
    const state = downloadStates[appId] || 'idle';
    if (state === 'idle') return { text: 'Get', className: 'bg-white text-black hover:bg-gray-200' };
    if (state === 'downloading') return { text: `${downloadProgress[appId] || 0}%`, className: 'bg-white/20 text-white border border-white/30', disabled: true };
    if (state === 'installing') return { text: 'Installing...', className: 'bg-white/20 text-white border border-white/30', disabled: true };
    if (state === 'installed') return { text: 'Open', className: 'bg-blue-600 text-white hover:bg-blue-700' };
  };

  const filteredApps = appsList.filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase()) || app.category.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="fixed inset-0 bg-[#0f0f11] text-white overflow-hidden flex flex-col font-sans z-[100] animate-in fade-in duration-500">
      
      {/* Dynamic Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none animate-pulse duration-[10000ms]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none animate-pulse duration-[12000ms]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-cyan-600/10 rounded-full blur-[180px] pointer-events-none"></div>

      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 backdrop-blur-xl border-b border-white/10 z-20 bg-[#0f0f11]/80">
        <div className="flex items-center shrink-0">
          <button onClick={onBack} className="p-2 sm:p-3 mr-2 sm:mr-6 rounded-full hover:bg-white/10 transition-colors group">
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="hidden sm:flex items-center">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-600/20 text-blue-500 mr-3">
              <Download className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              App Center
            </h1>
          </div>
        </div>
        
        <div className="flex items-center flex-1 max-w-2xl mx-2 sm:mx-6 min-w-0">
          <div className="relative w-full">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search apps..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 sm:py-3.5 pl-10 sm:pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm sm:text-lg"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 lg:space-x-6 ml-auto shrink-0">
          <div className="hidden md:flex items-center text-sm font-medium text-gray-400">
            <span onClick={() => { setSearchQuery(''); document.querySelector('#app-store-main')?.scrollTo({top:0, behavior:'smooth'}); }} className="mr-4 hover:text-white cursor-pointer transition-colors">Discover</span>
            <span onClick={() => setIsCategoriesOpen(true)} className="mr-4 hover:text-white cursor-pointer transition-colors">Categories</span>
            <button onClick={() => setIsDevConsoleOpen(true)} className="flex items-center text-blue-400 hover:text-blue-300 cursor-pointer transition-colors bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-500/20 shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]">
              <UploadCloud className="w-4 h-4 mr-2" />
              Developer Console
            </button>
          </div>
          {isLoggedIn ? (
            <div onClick={() => setIsProfileOpen(true)} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/20 overflow-hidden cursor-pointer hover:border-white/50 hover:shadow-[0_0_15px_-3px_rgba(255,255,255,0.5)] transition-all">
              <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop" alt="Profile" className="w-full h-full object-cover" />
            </div>
          ) : (
            <button 
              onClick={() => setIsProfileOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full font-bold transition-all shadow-[0_0_15px_-3px_rgba(59,130,246,0.5)] text-sm"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main id="app-store-main" className="flex-1 overflow-y-auto relative z-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
        {searchQuery ? (
          <div className="px-4 sm:px-8 py-6 sm:py-8">
            <h2 className="text-xl font-semibold mb-6 text-white/90">Search results for "{searchQuery}"</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredApps.map(app => (
                <div key={app.id} onClick={() => setSelectedApp(app)} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col cursor-pointer backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group hover:border-white/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="w-16 h-16 shadow-lg group-hover:scale-105 transition-transform">
                      {renderIcon(app, "w-full h-full")}
                    </div>
                    <div className="flex items-center bg-white/5 rounded-full px-2 py-1 border border-white/5">
                      <span className="text-xs text-gray-300 font-medium mr-1">{app.rating}</span>
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-white mb-1 truncate">{app.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{app.category}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <span className="text-sm font-medium text-gray-500">{app.size}</span>
                    <button 
                      onClick={(e) => handleInstall(app.id, e)}
                      disabled={getButtonState(app.id).disabled}
                      className={`px-4 py-1.5 rounded-full font-bold text-sm transition-all shadow-md relative overflow-hidden ${getButtonState(app.id).className}`}
                    >
                      {downloadStates[app.id] === 'downloading' && (
                        <div className="absolute left-0 top-0 bottom-0 bg-white/30 transition-all duration-200" style={{ width: `${downloadProgress[app.id]}%` }}></div>
                      )}
                      <span className="relative z-10">{getButtonState(app.id).text}</span>
                    </button>
                  </div>
                </div>
              ))}
              {filteredApps.length === 0 && (
                <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-400">
                  <Search className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-lg">No apps found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Featured Hero Banner */}
            <div className="px-4 sm:px-8 mt-6 sm:mt-8 mb-8 sm:mb-12">
              <div 
                className="w-full min-h-[320px] bg-[#1a1a1c]/40 rounded-3xl overflow-hidden relative cursor-pointer group border border-white/10 hover:border-blue-500/50 transition-all duration-500 shadow-[0_0_40px_-10px_rgba(59,130,246,0.2)] hover:shadow-[0_0_50px_-5px_rgba(59,130,246,0.5)] backdrop-blur-md flex flex-col justify-center"
                onClick={() => setSelectedApp(appsList[0])}
              >
                <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&h=600&fit=crop" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" alt="Hero Banner" />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#0f0f11] via-[#0f0f11]/90 to-transparent z-10"></div>
                
                <div className="relative z-20 p-6 sm:p-12 flex flex-col justify-center max-w-2xl h-full">
                  <span className="px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider w-max mb-3 sm:mb-4">Featured App</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 sm:mb-4 leading-tight">Scale your social media<br className="hidden sm:block"/>content with AI.</h2>
                  <p className="text-gray-400 text-sm sm:text-lg mb-6 sm:mb-8 max-w-md leading-relaxed">Discover powerful new AI prompts and creative workflows designed specifically for the Indian creator ecosystem.</p>
                  <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-black hover:bg-gray-200 rounded-full font-bold transition-colors w-max shadow-lg shadow-white/10 text-sm sm:text-base">
                    Explore Now
                  </button>
                </div>
              </div>
            </div>
            
            {/* GlobalSearch Premium Section */}
            <div className="px-4 sm:px-8 mb-8 sm:mb-12">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">GlobalSearch Originals</h2>
                <button className="text-blue-400 hover:text-blue-300 font-medium text-xs sm:text-sm transition-colors">See all</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[appsList.find(a => a.id === 'zygo'), appsList.find(a => a.id === 'luminaai'), appsList.find(a => a.id === 'playtube'), appsList.find(a => a.id === 'quickchat')].filter(Boolean).map(app => (
                  <div key={app.id} onClick={() => setSelectedApp(app)} className="bg-white/5 border border-white/10 rounded-3xl p-6 cursor-pointer group transition-all duration-300 hover:bg-white/10 backdrop-blur-xl hover:border-purple-500/50 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className="w-20 h-20 shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-300">
                        {renderIcon(app, "w-full h-full rounded-[1.5rem]")}
                      </div>
                      <button 
                        onClick={(e) => handleInstall(app.id, e)}
                        disabled={getButtonState(app.id).disabled}
                        className={`px-5 py-1.5 rounded-full font-bold text-sm transition-all shadow-md relative overflow-hidden ${getButtonState(app.id).className}`}
                      >
                        {downloadStates[app.id] === 'downloading' && (
                          <div className="absolute left-0 top-0 bottom-0 bg-white/30 transition-all duration-200" style={{ width: `${downloadProgress[app.id]}%` }}></div>
                        )}
                        <span className="relative z-10">{getButtonState(app.id).text}</span>
                      </button>
                    </div>
                    <h3 className="font-bold text-xl text-white mb-1 truncate">{app.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">{app.category}</p>
                    <div className="flex items-center mt-auto">
                      <div className="flex items-center bg-white/5 rounded-full px-2 py-1 mr-3 border border-white/5">
                        <span className="text-xs text-gray-300 font-medium mr-1">{app.rating}</span>
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      </div>
                      <span className="text-[13px] text-gray-500 font-medium">{app.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Boost Your Productivity Section */}
            <div className="px-4 sm:px-8 mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4 sm:mb-6">Boost Your Productivity</h2>
              <div className="flex space-x-6 overflow-x-auto pb-6 hide-scrollbar">
                {[appsList.find(a => a.id === 'luminaai'), appsList.find(a => a.id === 'novaai'), appsList.find(a => a.id === 'bharatdrive'), appsList.find(a => a.id === 'swiftmail')].filter(Boolean).map(app => (
                  <div key={app.id} onClick={() => setSelectedApp(app)} className="min-w-[320px] bg-white/5 border border-white/10 rounded-3xl p-6 cursor-pointer group transition-all duration-300 hover:bg-white/10 backdrop-blur-xl hover:border-cyan-500/50 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)] hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <div className="w-[72px] h-[72px] shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-300">
                        {renderIcon(app, "w-full h-full rounded-[1.25rem]")}
                      </div>
                      <button 
                        onClick={(e) => handleInstall(app.id, e)}
                        disabled={getButtonState(app.id).disabled}
                        className={`px-4 py-1.5 rounded-full font-bold text-sm transition-all shadow-md relative overflow-hidden ${getButtonState(app.id).className}`}
                      >
                        {downloadStates[app.id] === 'downloading' && (
                          <div className="absolute left-0 top-0 bottom-0 bg-white/30 transition-all duration-200" style={{ width: `${downloadProgress[app.id]}%` }}></div>
                        )}
                        <span className="relative z-10">{getButtonState(app.id).text}</span>
                      </button>
                    </div>
                    <h3 className="font-bold text-xl text-white mb-1">{app.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">{app.developer}</p>
                    <p className="text-[13px] text-white/70 line-clamp-2 leading-relaxed">{app.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Lifestyle & Shopping Section */}
            <div className="px-4 sm:px-8 mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4 sm:mb-6">Lifestyle & Shopping</h2>
              <div className="flex space-x-6 overflow-x-auto pb-6 hide-scrollbar">
                {[appsList.find(a => a.id === 'shopnova'), appsList.find(a => a.id === 'cravedrop'), appsList.find(a => a.id === 'swiftpay')].filter(Boolean).map(app => (
                  <div key={app.id} onClick={() => setSelectedApp(app)} className="min-w-[320px] bg-white/5 border border-white/10 rounded-3xl p-6 cursor-pointer group transition-all duration-300 hover:bg-white/10 backdrop-blur-xl hover:border-pink-500/50 hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.3)] hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <div className="w-[72px] h-[72px] shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-300">
                        {renderIcon(app, "w-full h-full rounded-[1.25rem]")}
                      </div>
                      <button 
                        onClick={(e) => handleInstall(app.id, e)}
                        disabled={getButtonState(app.id).disabled}
                        className={`px-4 py-1.5 rounded-full font-bold text-sm transition-all shadow-md relative overflow-hidden ${getButtonState(app.id).className}`}
                      >
                        {downloadStates[app.id] === 'downloading' && (
                          <div className="absolute left-0 top-0 bottom-0 bg-white/30 transition-all duration-200" style={{ width: `${downloadProgress[app.id]}%` }}></div>
                        )}
                        <span className="relative z-10">{getButtonState(app.id).text}</span>
                      </button>
                    </div>
                    <h3 className="font-bold text-xl text-white mb-1">{app.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">{app.developer}</p>
                    <p className="text-[13px] text-white/70 line-clamp-2 leading-relaxed">{app.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* All Apps Section */}
            <div className="px-4 sm:px-8 mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4 sm:mb-6">All Applications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {appsList.map(app => (
                  <div key={`all-${app.id}`} onClick={() => setSelectedApp(app)} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col cursor-pointer backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group hover:border-white/30 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)] hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div className="w-16 h-16 shadow-lg group-hover:scale-105 transition-transform">
                        {renderIcon(app, "w-full h-full rounded-[1rem]")}
                      </div>
                      <div className="flex items-center bg-white/5 rounded-full px-2 py-1 border border-white/5">
                        <span className="text-xs text-gray-300 font-medium mr-1">{app.rating}</span>
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-white mb-1 truncate">{app.name}</h3>
                      <p className="text-sm text-gray-400 mb-4">{app.category}</p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                      <span className="text-sm font-medium text-gray-500">{app.size}</span>
                      <button 
                        onClick={(e) => handleInstall(app.id, e)}
                        disabled={getButtonState(app.id).disabled}
                        className={`px-4 py-1.5 rounded-full font-bold text-sm transition-all shadow-md relative overflow-hidden ${getButtonState(app.id).className}`}
                      >
                        {downloadStates[app.id] === 'downloading' && (
                          <div className="absolute left-0 top-0 bottom-0 bg-white/30 transition-all duration-200" style={{ width: `${downloadProgress[app.id]}%` }}></div>
                        )}
                        <span className="relative z-10">{getButtonState(app.id).text}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {/* App Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-[150] flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedApp(null)}>
          <div 
            className="w-full max-w-2xl bg-[#1a1a1c] h-full shadow-2xl flex flex-col transform transition-transform animate-in slide-in-from-right duration-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="h-[300px] relative shrink-0">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-[#1a1a1c] z-10"></div>
              <button onClick={() => setSelectedApp(null)} className="absolute top-6 right-6 z-30 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              
              <div className="absolute bottom-0 left-0 w-full p-10 z-20 flex items-end">
                <div className="w-[120px] h-[120px] shadow-2xl rounded-[2rem] overflow-hidden mr-8 border border-white/10 bg-[#050505]">
                  {renderIcon(selectedApp, "w-full h-full")}
                </div>
                <div className="flex-1 pb-2">
                  <h2 className="text-4xl font-extrabold text-white tracking-tight mb-2">{selectedApp.name}</h2>
                  <p className="text-blue-400 font-medium text-lg">{selectedApp.developer}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-10 py-8">
              <div className="flex items-center space-x-12 pb-10 border-b border-white/10 mb-10">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Reviews</span>
                  <div className="flex items-center text-2xl font-bold text-white">
                    {selectedApp.rating} <Star className="w-5 h-5 ml-1.5 text-gray-400 fill-gray-400" />
                  </div>
                </div>
                <div className="w-px h-12 bg-white/10"></div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Category</span>
                  <span className="text-xl font-bold text-white">{selectedApp.category}</span>
                </div>
                <div className="w-px h-12 bg-white/10"></div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Size</span>
                  <span className="text-xl font-bold text-white">{selectedApp.size}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-10">
                <button 
                  onClick={(e) => handleInstall(selectedApp.id, e)}
                  disabled={getButtonState(selectedApp.id).disabled}
                  className={`flex-1 py-4 rounded-full font-bold text-lg transition-all shadow-lg relative overflow-hidden flex items-center justify-center ${getButtonState(selectedApp.id).className}`}
                >
                  {downloadStates[selectedApp.id] === 'downloading' && (
                    <div className="absolute left-0 top-0 bottom-0 bg-black/10 transition-all duration-200" style={{ width: `${downloadProgress[selectedApp.id]}%` }}></div>
                  )}
                  {downloadStates[selectedApp.id] === 'installed' && <CheckCircle2 className="w-5 h-5 mr-2" />}
                  <span className="relative z-10">{getButtonState(selectedApp.id).text}</span>
                </button>
              </div>

              <div className="mb-10">
                <h3 className="text-2xl font-bold text-white mb-4">What's New</h3>
                <p className="text-gray-300 leading-relaxed">Version 2.4.1<br/><br/>- Introducing major performance improvements.<br/>- New premium glassmorphism UI language.<br/>- Enhanced security features for enterprise users.</p>
              </div>

              <div className="mb-10">
                <h3 className="text-2xl font-bold text-white mb-4">About this app</h3>
                <p className="text-gray-300 leading-relaxed text-lg">{selectedApp.description}</p>
                <p className="text-gray-400 leading-relaxed mt-4">Built natively for the GlobalSearch Global Ecosystem, ensuring maximum privacy, blazing fast speeds, and an unparalleled user experience. No third-party tracking, absolute data sovereignty.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Developer Console Modal */}
      {isDevConsoleOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200 p-4" onClick={() => setIsDevConsoleOpen(false)}>
          <div 
            className="w-full max-w-xl bg-white/5 border border-white/10 backdrop-blur-3xl rounded-3xl shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)] flex flex-col transform transition-transform animate-in zoom-in-95 duration-300 overflow-hidden relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"></div>
            
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mr-4">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Developer Console</h3>
                  <p className="text-sm text-gray-400">Publish a new app to the GlobalSearch Ecosystem</p>
                </div>
              </div>
              <button onClick={() => setIsDevConsoleOpen(false)} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmitApp} className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="space-y-6">
                
                {/* App Name & Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">App Name <span className="text-red-400">*</span></label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. My Awesome App"
                      value={newAppForm.name}
                      onChange={(e) => setNewAppForm({...newAppForm, name: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <select 
                      value={newAppForm.category}
                      onChange={(e) => setNewAppForm({...newAppForm, category: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none"
                    >
                      <option value="Productivity">Productivity</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Communication">Communication</option>
                      <option value="Social">Social</option>
                      <option value="Tools">Tools</option>
                      <option value="Games">Games</option>
                    </select>
                  </div>
                </div>

                {/* Developer & Size */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Developer Name</label>
                    <input 
                      type="text" 
                      value={newAppForm.developer}
                      onChange={(e) => setNewAppForm({...newAppForm, developer: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">App Size</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 24 MB"
                      value={newAppForm.size}
                      onChange={(e) => setNewAppForm({...newAppForm, size: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">App Description <span className="text-red-400">*</span></label>
                  <textarea 
                    required
                    rows="4"
                    placeholder="Describe what your app does..."
                    value={newAppForm.description}
                    onChange={(e) => setNewAppForm({...newAppForm, description: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                  ></textarea>
                </div>

                {/* File Upload Simulation */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Upload App Package (.zip, .apk) <span className="text-red-400">*</span></label>
                  <label className="border-2 border-dashed border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center bg-black/20 hover:bg-black/40 hover:border-blue-500/50 transition-colors cursor-pointer group">
                    <input 
                      type="file" 
                      accept=".zip,.apk" 
                      className="hidden" 
                      onChange={(e) => setSelectedFile(e.target.files[0])} 
                    />
                    <UploadCloud className="w-10 h-10 text-gray-500 group-hover:text-blue-400 mb-3 transition-colors" />
                    <p className="text-gray-400 text-sm font-medium">
                      {selectedFile ? selectedFile.name : "Click to browse or drag & drop files here"}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">Maximum file size: 500 MB</p>
                  </label>
                </div>

              </div>

              <div className="mt-8 flex justify-end">
                <button type="button" onClick={() => setIsDevConsoleOpen(false)} className="px-6 py-2.5 rounded-full text-white font-medium hover:bg-white/10 transition-colors mr-3">
                  Cancel
                </button>
                <button type="submit" className="px-8 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] flex items-center">
                  <UploadCloud className="w-4 h-4 mr-2" />
                  Publish App
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Categories Modal */}
      {isCategoriesOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4" onClick={() => setIsCategoriesOpen(false)}>
          <div className="w-full max-w-2xl bg-white/5 border border-white/10 backdrop-blur-3xl rounded-3xl shadow-[0_0_50px_-10px_rgba(59,130,246,0.2)] p-8 flex flex-col animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white tracking-tight">Browse Categories</h2>
              <button onClick={() => setIsCategoriesOpen(false)} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Productivity', 'Entertainment', 'Communication', 'Social', 'Tools', 'Games', 'Finance', 'Navigation', 'Shopping', 'Food & Drink', 'Professional', 'Travel & Mobility'].map(cat => (
                <div key={cat} onClick={() => { setSearchQuery(cat); setIsCategoriesOpen(false); }} className="bg-black/40 hover:bg-blue-500/20 border border-white/5 hover:border-blue-500/50 p-4 rounded-xl text-center cursor-pointer transition-all shadow-md">
                  <span className="font-medium text-white">{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsProfileOpen(false)}>
          <div className="w-full max-w-sm bg-[#1a1a1c] border-l border-white/10 h-full shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold text-white tracking-tight">Account</h2>
              <button onClick={() => setIsProfileOpen(false)} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            {!isLoggedIn ? (
              <div className="flex flex-col flex-1">
                <div className="flex flex-col items-center mb-10 mt-4">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                     <svg className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Sign in to App Store</h3>
                  <p className="text-sm text-gray-400 text-center mb-8 px-4">Get personalized recommendations, sync your downloaded apps, and access premium content.</p>
                  
                  <button onClick={() => setIsLoggedIn(true)} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] mb-4">
                    Sign In / Create Account
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center mb-10">
                  <div className="relative">
                    <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop" className="w-28 h-28 rounded-full border-4 border-blue-500/30 mb-4 object-cover" />
                    <div className="absolute bottom-4 right-0 w-6 h-6 bg-green-500 border-4 border-[#1a1a1c] rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">Developer Mode Active</h3>
                  <p className="text-sm text-gray-400">admin@globalsearch.local</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-xl flex items-center justify-between hover:bg-white/10 cursor-pointer transition-colors border border-white/5 hover:border-white/20">
                    <span className="font-medium text-white">Installed Apps</span>
                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">{appsList.length}</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl flex items-center justify-between hover:bg-white/10 cursor-pointer transition-colors border border-white/5 hover:border-white/20">
                    <span className="font-medium text-white">Payment Methods</span>
                    <span className="text-gray-400 text-sm">UPI Connected</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl flex items-center justify-between hover:bg-white/10 cursor-pointer transition-colors border border-white/5 hover:border-white/20">
                    <span className="font-medium text-white">Settings & Preferences</span>
                  </div>
                </div>
                <div className="mt-auto pt-8">
                  <button onClick={() => setIsLoggedIn(false)} className="w-full bg-red-500/10 p-4 rounded-xl flex items-center justify-center hover:bg-red-500/20 cursor-pointer transition-colors text-red-500 font-bold border border-red-500/20">
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

