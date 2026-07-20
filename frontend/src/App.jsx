import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, ArrowRight, RotateCw, Sparkles, Globe, Mic, Cpu, Plus, X, Link2 } from 'lucide-react';
import Navbar from './components/Navbar';
import SearchResults from './components/SearchResults';
import FoodWidget from './components/FoodWidget';
import KnowledgePanel from './components/KnowledgePanel';
import SearchBar from './components/SearchBar';
import LanguageModal from './components/LanguageModal';
import { getTranslation } from './utils/translations';
import MailInbox from './components/MailInbox';
import CoreNetShowcase from './components/CoreNetShowcase';
import PlayTube from './components/PlayTube';
import PlayTubeLogo from './components/PlayTubeLogo';
import QuickChatLogo from './components/QuickChatLogo';
import PixoraLogo from './components/PixoraLogo';
import CoreCloudLogo from './components/CoreCloudLogo';
import NovaAILogo from './components/NovaAILogo';
import CoreNetLogo from './components/CoreNetLogo';
import VillageInternetLogo from './components/VillageInternetLogo';

import QuickChat from './components/QuickChat';
import Pixora from './components/Pixora';
import GlobalSearchDrive from './components/GlobalSearchDrive';
import NovaAI from './components/NovaAI';
import LuminaAI from './components/LuminaAI';
import Zygo from './components/Zygo';
import VillageInternet from './components/VillageInternet';
import NaviMap from './components/NaviMap';
import mapLogoImg from './assets/navimap_logo.png';
import aiLogoImg from './assets/novaai_logo.png';
import socialLogoImg from './assets/pixora_logo.png';
import chatLogoImg from './assets/quickchat_logo.png';
import mailLogoImg from './assets/swiftmail_logo.png';
import connectLogoImg from './assets/pixora_unique_logo.png';
import earthLogoImg from './assets/earth_logo.png';
import SwiftPay from './components/SwiftPay';
import SwiftPayLogo from './components/SwiftPayLogo';
import SyncMeet from './components/SyncMeet';
import GlobalSearchAppStore from './components/GlobalSearchAppStore';
import CraveDrop from './components/CraveDrop';
import ShopNova from './components/ShopNova';
import EGovernance from './components/EGovernance';
import appStoreLogoImg from './assets/app_store_logo.png';
import DynamicAppViewer from './components/DynamicAppViewer';

function App() {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('English');
  const [district, setDistrict] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showBackground, setShowBackground] = useState(true);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [customColor, setCustomColor] = useState('');
  const [customBackgroundImage, setCustomBackgroundImage] = useState('');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState('');
  const [currentView, setCurrentView] = useState('search');
  const [activeTab, setActiveTab] = useState('all');
  const [isShowcaseOpen, setIsShowcaseOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [securityAlert, setSecurityAlert] = useState(null);

  const KNOWN_VIEWS = [
    'search', 'mail', 'playtube', 'quickchat', 'pixora', 'bharatdrive', 'novaai', 
    'luminaai', 'zygo', 'village', 'navimap', 'swiftpay', 'syncmeet', 'appstore', 
    'cravedrop', 'shopnova', 'egovernance'
  ];

  const defaultShortcuts = [
    { id: 'appstore', name: 'App Store', customIcon: <img src={appStoreLogoImg} alt="App Store" className="w-full h-full object-contain p-1.5 rounded-full" />, bg: '#050505', action: () => setCurrentView('appstore') }
  ];
  const [userShortcuts, setUserShortcuts] = useState(defaultShortcuts);
  const [isAddShortcutOpen, setIsAddShortcutOpen] = useState(false);
  const [newShortcutForm, setNewShortcutForm] = useState({ name: '', url: '' });

  const languages = [
    'Hindi', 'English', 'Spanish', 'French', 'Mandarin', 'Arabic', 'Russian', 'Portuguese', 
    'Indonesian', 'German', 'Japanese', 'Korean', 'Italian', 'Turkish', 'Vietnamese', 
    'Bengali', 'Urdu', 'Punjabi', 'Marathi', 'Telugu', 'Tamil', 'Gujarati', 'Kannada', 
    'Malayalam', 'Odia', 'Dutch', 'Polish', 'Thai', 'Persian', 'Swahili'
  ];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleAddShortcut = (e) => {
    e.preventDefault();
    if (!newShortcutForm.name || !newShortcutForm.url) return;
    
    let url = newShortcutForm.url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    let domain = '';
    try {
      domain = new URL(url).hostname;
    } catch(err) {
      domain = url;
    }

    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

    const newShortcut = {
      id: Date.now().toString(),
      name: newShortcutForm.name,
      customIcon: (
        <div className="w-full h-full relative flex items-center justify-center">
          <img 
            src={faviconUrl} 
            alt={newShortcutForm.name} 
            className="w-full h-full object-cover rounded-[10px] sm:rounded-[12px] z-10" 
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
            }} 
          />
          <span className="absolute inset-0 hidden items-center justify-center text-white font-bold text-lg z-0">{newShortcutForm.name.charAt(0).toUpperCase()}</span>
        </div>
      ),
      bg: 'white/20',
      url: url,
      action: () => window.open(url, '_blank')
    };
    
    setUserShortcuts(prev => [...prev, newShortcut]);
    setNewShortcutForm({ name: '', url: '' });
    setIsAddShortcutOpen(false);
  };

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    
    const q = searchQuery.toLowerCase();
    const qNoSpace = q.replace(/\s+/g, '');
    let ecosystemAppMatch = null;
    
    // Check for explicit "open" commands or exact/close matches to ecosystem apps
    const openKeywords = ['open', 'start', 'launch', 'kholo', 'खोलें', 'ਖੋਲ੍ਹੋ', 'খুলুন', 'abrir', 'ouvrir', 'buka', 'öffnen', '開く', '열기', 'apri', 'aç', 'mở', 'کھولیں', 'उघडा', 'తెరవండి', 'திற', 'ખોલો', 'ತೆರೆಯಿರಿ', 'തുറക്കുക', 'ଖୋଲନ୍ତୁ', 'otworzyć', 'เปิด', 'باز کردن', 'fungua'];
    const isOpenCommand = openKeywords.some(kw => q.includes(kw));

    const shortcutsMap = {
      'playtube': 'PlayTube',
      'quickchat': 'QuickChat',
      'pixora': 'Pixora',
      'bharatdrive': 'Drive',
      'novaai': 'NovaAI',
      'luminaai': 'LuminaAI',
      'zygo': 'Zygo',
      'village': 'VillageNet',
      'navimap': 'NaviMap',
      'swiftpay': 'SwiftPay',
      'syncmeet': 'SyncMeet',
      'mail': 'SwiftMail',
      'pixora': 'Pixora',
      'appstore': 'App Store',
      'cravedrop': 'CraveDrop',
      'shopnova': 'ShopNova'
    };

    
    for (const [appId, transKey] of Object.entries(shortcutsMap)) {
      const translatedName = getTranslation(language, `shortcuts.${transKey}`).toLowerCase().replace(/\s+/g, '');
      if (translatedName && qNoSpace.includes(translatedName)) {
        ecosystemAppMatch = appId;
        break;
      }
    }

    // NEW LOGIC FOR HYPER-LOCAL GRIEVANCE & SCHEMES
    if (!ecosystemAppMatch) {
      const grievanceKeywords = ['shikayat', 'complaint', 'kharab', 'paani', 'bijli', 'road', 'sadak', 'bhrashtachar', 'problem', 'issue', 'toota', 'garbage', 'kachra'];
      const schemeKeywords = ['yojana', 'scheme', 'scholarship', 'subsidy', 'loan', 'kisan', 'farmer', 'pension'];
      
      if (grievanceKeywords.some(kw => q.includes(kw)) || schemeKeywords.some(kw => q.includes(kw))) {
        setCurrentView('egovernance');
        setQuery(searchQuery);
        setHasSearched(false);
        return;
      }
    }

    if (!ecosystemAppMatch) {
      if (q.includes('tube') || q.includes('video') || q.includes('youtube') || q.includes('टूब') || q.includes('वीडियो')) ecosystemAppMatch = 'playtube';
      else if (q.includes('chat') || q.includes('message') || q.includes('whatsapp') || q.includes('चैट') || q.includes('मैसेज') || q.includes('संदेश')) ecosystemAppMatch = 'quickchat';
      else if (q.includes('social') || q.includes('facebook') || q.includes('instagram') || q.includes('सोशल')) ecosystemAppMatch = 'pixora';
      else if (q.includes('cloud') || q.includes('drive') || q.includes('क्लाउड') || q.includes('ड्राइव')) ecosystemAppMatch = 'bharatdrive';
      else if (q.includes('chatgpt') || q.includes('lumina') || q.includes('openai') || q.includes('चैटजीपीटी') || q.includes('लुमिना')) ecosystemAppMatch = 'luminaai';
      else if (q.includes('ai') || q.includes('assistant') || q.includes('gemini') || q.includes('एआई') || q.includes('ए.आई') || q.includes('असिस्टेंट')) ecosystemAppMatch = 'novaai';
      else if (q.includes('ride') || q.includes('taxi') || q.includes('rapido') || q.includes('zygo') || q.includes('uber') || q.includes('ola') || q.includes('टैक्सी') || q.includes('राइड') || q.includes('ज़ाइगो') || q.includes('कैब')) ecosystemAppMatch = 'zygo';
      else if (q.includes('village') || q.includes('rural') || q.includes('mesh') || q.includes('गांव') || q.includes('विलेज') || q.includes('रूरल')) ecosystemAppMatch = 'village';
      else if (q.includes('map') || q.includes('navigation') || q.includes('मैप') || q.includes('नक्शा') || q.includes('रास्ता')) ecosystemAppMatch = 'navimap';
      else if (q.includes('pay') || q.includes('upi') || q.includes('wallet') || q.includes('पे') || q.includes('यूपीआई') || q.includes('वॉलेट') || q.includes('भुगतान')) ecosystemAppMatch = 'swiftpay';
      else if (q.includes('meet') || q.includes('zoom') || q.includes('call') || q.includes('मीट') || q.includes('कॉल') || q.includes('मीटिंग')) ecosystemAppMatch = 'syncmeet';
      else if (q.includes('mail') || q.includes('email') || q.includes('gmail') || q.includes('मेल') || q.includes('ईमेल')) ecosystemAppMatch = 'mail';
      else if (q.includes('connect') || q.includes('कनेक्ट')) ecosystemAppMatch = 'pixora';
      else if (q.includes('store') || q.includes('app') || q.includes('download') || q.includes('स्टोर') || q.includes('ऐप') || q.includes('एप्प') || q.includes('डाउनलोड')) ecosystemAppMatch = 'appstore';
      else if (q.includes('food') || q.includes('delivery') || q.includes('crave') || q.includes('zomato') || q.includes('swiggy') || q.includes('फूड') || q.includes('खाना') || q.includes('डिलीवरी')) ecosystemAppMatch = 'cravedrop';
      else if (q.includes('shop') || q.includes('ecommerce') || q.includes('nova') || q.includes('amazon') || q.includes('flipkart') || q.includes('buy') || q.includes('शॉप') || q.includes('खरीद') || q.includes('दुकान') || q.includes('ईकॉमर्स')) ecosystemAppMatch = 'shopnova';
    }

    const isBharatQuery = q.includes('bharat') || q.includes('भारत') || q.includes('ਭਾਰਤ') || q.includes('ভারত');

    if (ecosystemAppMatch && isOpenCommand) {
      setCurrentView(ecosystemAppMatch);
      setQuery('');
      setHasSearched(false);
      return;
    }
    
    setIsSearching(true);
    setHasSearched(true);
    setQuery(searchQuery);

    try {
      const response = await axios.get(`/api/search?q=${encodeURIComponent(searchQuery)}&language=${encodeURIComponent(language)}&district=${encodeURIComponent(district)}`);
      
      let newResults = [];
      if (ecosystemAppMatch) {
        newResults.push({ isEcosystemApp: true, appId: ecosystemAppMatch, _id: 'ecosystem-' + ecosystemAppMatch });
      }
      
      if (response.data && response.data.results && response.data.results.length > 0) {
        newResults = [...newResults, ...response.data.results];
      } else {
        // Fallback or empty state
        const fallbackResults = [
          {
            title: getTranslation(language, 'searchResults.officialTitle').replace('{query}', searchQuery),
            url: `https://www.${searchQuery.toLowerCase().replace(/\s+/g, '')}.com`,
            description: getTranslation(language, 'searchResults.officialDesc').replace('{query}', searchQuery),
          }
        ];
        newResults = [...newResults, ...fallbackResults];
      }
      setResults(newResults);
    } catch (error) {
      console.error('Search error:', error);
      if (error.response && error.response.status === 403) {
        setSecurityAlert(error.response.data.error || 'Access Denied: Third-party link or hack attempt blocked.');
      } else {
        // Fallback if backend is down
        let newResults = [];
        if (ecosystemAppMatch) {
          newResults.push({ isEcosystemApp: true, appId: ecosystemAppMatch, _id: 'ecosystem-' + ecosystemAppMatch });
        }
        const mockResults = [
          {
            title: getTranslation(language, 'searchResults.officialTitle').replace('{query}', searchQuery),
            url: `https://www.${searchQuery.toLowerCase().replace(/\s+/g, '')}.com`,
            description: getTranslation(language, 'searchResults.officialDesc').replace('{query}', searchQuery),
          }
        ];
        newResults = [...newResults, ...mockResults];
        setResults(newResults);
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const clearSearch = () => {
    setHasSearched(false);
    setQuery('');
    setResults([]);
  };

  const handleOrbVoiceSearch = () => {
    if (isListening) return;

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Your browser does not support voice search. Please try Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    const speechLangMap = {
      'English': 'en-IN',
      'Hindi': 'hi-IN',
      'Bengali': 'bn-IN',
      'Gujarati': 'gu-IN',
      'Kannada': 'kn-IN',
      'Malayalam': 'ml-IN',
      'Marathi': 'mr-IN',
      'Odia': 'or-IN',
      'Punjabi': 'pa-IN',
      'Tamil': 'ta-IN',
      'Telugu': 'te-IN',
      'Urdu': 'ur-IN',
      'Arabic': 'ar-SA',
      'Mandarin': 'zh-CN',
      'Russian': 'ru-RU',
      'Spanish': 'es-ES',
      'French': 'fr-FR'
    };
    
    recognition.lang = speechLangMap[language] || 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      handleSearch(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      
      if (event.error === 'network' || event.error === 'not-allowed' || event.error === 'no-speech') {
        console.log('Falling back to simulated voice command due to API error.');
        const mockTranscript = prompt("Mic blocked/failed. Type your simulated voice command:", "open quickchat");
        if (mockTranscript) {
          setQuery(mockTranscript);
          handleSearch(mockTranscript);
        }
      } else {
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
      
      const mockTranscript = prompt("Mic failed. Type your simulated voice command:", "open quickchat");
      if (mockTranscript) {
        setQuery(mockTranscript);
        handleSearch(mockTranscript);
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col relative ${(!hasSearched && showBackground && currentView === 'search') ? 'bg-transparent' : (!hasSearched && !showBackground && customColor && currentView === 'search') ? customColor : 'bg-background'} transition-colors duration-300`}>
      {currentView === 'mail' ? (
        <MailInbox 
          userEmail={loggedInEmail} 
          onBack={() => setCurrentView('search')} 
          onNavigate={(view) => setCurrentView(view)}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setLoggedInEmail={setLoggedInEmail}
        />
      ) : currentView === 'playtube' ? (
        <PlayTube onBack={() => setCurrentView('search')} />
      ) : currentView === 'quickchat' ? (
        <QuickChat onBack={() => setCurrentView('search')} />
      ) : currentView === 'pixora' ? (
        <Pixora onBack={() => setCurrentView('search')} />
      ) : currentView === 'pixora' ? (
        <Pixora onBack={() => setCurrentView('search')} />
      ) : currentView === 'bharatdrive' ? (
        <GlobalSearchDrive onBack={() => setCurrentView('search')} onNavigate={(view) => setCurrentView(view)} />
      ) : currentView === 'novaai' ? (
        <NovaAI onBack={() => setCurrentView('search')} />
      ) : currentView === 'luminaai' ? (
        <LuminaAI onBack={() => setCurrentView('search')} />
      ) : currentView === 'zygo' ? (
        <Zygo onBack={() => setCurrentView('search')} />
      ) : currentView === 'village' ? (
        <VillageInternet onBack={() => setCurrentView('search')} />
      ) : currentView === 'navimap' ? (
        <NaviMap onBack={() => setCurrentView('search')} />
      ) : currentView === 'swiftpay' ? (
        <SwiftPay onBack={() => setCurrentView('search')} />
      ) : currentView === 'syncmeet' ? (
        <SyncMeet onBack={() => setCurrentView('search')} />
      ) : currentView === 'appstore' ? (
        <GlobalSearchAppStore onBack={() => setCurrentView('search')} onLaunchApp={(appId) => setCurrentView(appId)} />
      ) : currentView === 'cravedrop' ? (
        <CraveDrop onBack={() => setCurrentView('search')} />
      ) : currentView === 'shopnova' ? (
        <ShopNova onBack={() => setCurrentView('search')} />
      ) : currentView === 'egovernance' ? (
        <EGovernance onBack={() => setCurrentView('search')} initialQuery={query} />
      ) : !KNOWN_VIEWS.includes(currentView) ? (
        <DynamicAppViewer appId={currentView} onBack={() => setCurrentView('search')} />
      ) : (
        <>
          <Navbar 
            language={language} 
            setLanguage={setLanguage} 
            district={district}
            setDistrict={setDistrict}
            isDarkMode={isDarkMode} 
            setIsDarkMode={setIsDarkMode} 
            isHomepage={!hasSearched}
            showBackground={showBackground}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            loggedInEmail={loggedInEmail}
            setLoggedInEmail={setLoggedInEmail}
            setCurrentView={setCurrentView}
          />

          {!hasSearched ? (
        
        <>
          {showBackground && (
            <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#050505] transition-all duration-500">
              {customBackgroundImage ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${customBackgroundImage}')` }}
                >
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                </div>
              ) : (
                <div className="absolute inset-0 w-full h-full opacity-80">
                  <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/40 rounded-full blur-[120px] mix-blend-screen animate-blob"></div>
                  <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/30 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000"></div>
                  <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-4000"></div>
                </div>
              )}
            </div>
          )}
          <main className="flex-1 flex flex-col items-center justify-center px-4 w-full relative pt-12 sm:pt-16">
            
            {/* Logo */}
            <div className={`relative mb-8 flex flex-col items-center justify-center cursor-default select-none ${showBackground ? 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' : 'drop-shadow-sm'}`}>
              <h1 className="flex items-center text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter drop-shadow-2xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Global</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Search</span>
              </h1>
            </div>

            <div className="w-full z-10 pb-8 sm:pb-0">
              <SearchBar onSearch={handleSearch} isLoading={isSearching} initialQuery={query} language={language} />
            </div>
          </main>

          {/* Floating Dock (Menu Bar) */}
          <nav className="fixed bottom-16 sm:bottom-12 left-1/2 -translate-x-1/2 z-50 glass-premium px-4 sm:px-6 py-2.5 sm:py-3 rounded-[2rem] flex items-center space-x-3 sm:space-x-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10 w-max max-w-[95vw] overflow-x-auto hide-scrollbar">
            
            {/* Language Selector */}
            <button 
              onClick={() => setIsLanguageModalOpen(true)}
              className="flex flex-col items-center justify-center group w-12 sm:w-14"
              title="Change Language"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] sm:rounded-[14px] flex items-center justify-center transition-all ${showBackground ? 'bg-white/10 hover:bg-white/20 text-white shadow-md border border-white/10' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}>
                <Globe size={20} className="sm:w-6 sm:h-6" />
              </div>
              <span className={`text-[10px] mt-1 font-medium hidden sm:block ${showBackground ? 'text-white/70 group-hover:text-white' : 'text-foreground/70'}`}>{language.substring(0, 3).toUpperCase()}</span>
            </button>

            <div className="w-px h-8 bg-white/20 mx-1 sm:mx-2"></div>

            {/* App Shortcuts */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {userShortcuts.map((shortcut, idx) => (
                <button key={idx} className="flex flex-col items-center justify-center group w-12 sm:w-14" onClick={shortcut.action ? shortcut.action : undefined} title={shortcut.name}>
                  <div 
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] sm:rounded-[14px] flex items-center justify-center hover:scale-110 transition-transform shadow-md overflow-hidden ${shortcut.bg === 'transparent' ? 'border border-white/10' : (shortcut.bg === 'white/20' ? 'bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md' : 'border border-white/10')}`}
                    style={{ background: shortcut.bg !== 'white/20' && shortcut.bg !== 'transparent' ? shortcut.bg : undefined }}
                  >
                    {shortcut.customIcon ? shortcut.customIcon : shortcut.iconLetter ? (
                      <span className="text-white font-bold text-lg">{shortcut.iconLetter}</span>
                    ) : shortcut.icon ? (
                      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill={shortcut.color}>
                        <path d={shortcut.icon} />
                      </svg>
                    ) : null}
                  </div>
                  <span className={`text-[10px] mt-1 font-medium hidden sm:block truncate w-full text-center ${showBackground ? 'text-white/70 group-hover:text-white' : 'text-foreground/70'}`}>{shortcut.name.split(' ')[0]}</span>
                </button>
              ))}
              
              <button className="flex flex-col items-center justify-center group w-12 sm:w-14" onClick={() => setIsAddShortcutOpen(true)} title="Add shortcut">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] sm:rounded-[14px] flex items-center justify-center bg-white/5 hover:bg-white/20 transition-all border border-dashed border-white/30 hover:border-white/60 text-white shadow-md">
                  <Plus size={20} className="sm:w-6 sm:h-6" />
                </div>
                <span className={`text-[10px] mt-1 font-medium hidden sm:block ${showBackground ? 'text-white/70 group-hover:text-white' : 'text-foreground/70'}`}>Add</span>
              </button>
            </div>

            <div className="w-px h-8 bg-white/20 mx-1 sm:mx-2"></div>

            {/* AI Voice Orb */}
            <button 
              className="flex flex-col items-center justify-center group w-12 sm:w-14"
              onClick={handleOrbVoiceSearch}
              title="Voice Search"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-[12px] sm:rounded-[14px] flex items-center justify-center transition-all duration-500 shadow-md ${isListening ? 'bg-gradient-to-r from-emerald-400 to-blue-500 animate-pulse scale-110 shadow-[0_0_20px_rgba(52,211,153,0.6)]' : 'bg-white/10 hover:bg-white/20 hover:scale-110 text-white border border-white/10'}`}>
                {isListening ? (
                  <Mic size={20} className="text-white sm:w-6 sm:h-6 animate-bounce" />
                ) : (
                  <Cpu size={20} className="sm:w-6 sm:h-6 text-white" />
                )}
              </div>
              <span className={`text-[10px] mt-1 font-medium hidden sm:block ${isListening ? 'text-emerald-400 animate-pulse' : (showBackground ? 'text-white/70 group-hover:text-white' : 'text-foreground/70')}`}>
                {isListening ? '...' : 'AI'}
              </span>
            </button>
          </nav>
          <button 
            onClick={() => setIsCustomizeOpen(true)}
            className="fixed bottom-4 right-4 p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all shadow-md z-40"
            title="Customize GlobalSearch"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>

          {}
          {isCustomizeOpen && (
            <div className="fixed top-0 right-0 h-full w-full sm:w-[360px] bg-white dark:bg-[#1f1f1f] shadow-2xl z-50 flex flex-col transform transition-transform animate-in slide-in-from-right">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{getTranslation(language, 'customize.title')}</h2>
                <button onClick={() => setIsCustomizeOpen(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">{getTranslation(language, 'customize.appearance')}</h3>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6 border border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{getTranslation(language, 'customize.backgroundImage')}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{getTranslation(language, 'customize.currentTheme')}</p>
                    </div>
                  </div>
                  
                  {}
                  <div className="mb-3">
                    <label className="flex items-center justify-center w-full py-2 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer transition-colors">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      {getTranslation(language, 'customize.uploadFromDevice')}
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const imageUrl = URL.createObjectURL(e.target.files[0]);
                            setCustomBackgroundImage(imageUrl);
                            setShowBackground(true);
                            setCustomColor('');
                          }
                        }}
                      />
                    </label>
                  </div>

                  <button 
                    onClick={() => setShowBackground(!showBackground)}
                    className="w-full py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-lg border border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    {showBackground ? getTranslation(language, 'customize.removeBackground') : getTranslation(language, 'customize.setBackground')}
                  </button>
                </div>

                {}
                <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg mb-6">
                  <button 
                    onClick={() => setIsDarkMode(false)} 
                    className={`flex-1 py-1.5 text-sm font-medium rounded-md flex items-center justify-center ${!isDarkMode ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg> {getTranslation(language, 'customize.light')}
                  </button>
                  <button 
                    onClick={() => setIsDarkMode(true)} 
                    className={`flex-1 py-1.5 text-sm font-medium rounded-md flex items-center justify-center ${isDarkMode ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg> {getTranslation(language, 'customize.dark')}
                  </button>
                </div>

                {}
                <div className="grid grid-cols-4 gap-3">
                  {['bg-blue-600', 'bg-blue-400', 'bg-blue-200', 'bg-blue-100', 'bg-teal-600', 'bg-teal-400', 'bg-green-600', 'bg-green-400', 'bg-yellow-600', 'bg-yellow-400', 'bg-orange-600', 'bg-orange-400', 'bg-red-400', 'bg-pink-400', 'bg-purple-500', 'bg-indigo-500'].map((color, i) => (
                    <div key={i} className="flex justify-center">
                      <button 
                        onClick={() => {
                          setCustomColor(color);
                          setShowBackground(false);
                        }}
                        className={`w-14 h-14 rounded-full ${color} border-4 ${customColor === color ? 'border-gray-800 dark:border-white shadow-lg scale-110' : 'border-transparent hover:border-gray-300'} transition-all focus:outline-none`} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        
        <div className="flex flex-col min-h-screen w-full">
          {}
          <header className="sticky top-0 bg-background border-b border-border z-40 pt-4 sm:pt-6 pb-4 px-4 sm:px-8 flex flex-wrap lg:flex-nowrap items-center">
            
            {}
            <div className="flex items-center space-x-1 mr-4 text-foreground/70">
              <button 
                className="p-2 rounded-full hover:bg-accent hover:text-foreground transition-colors focus:outline-none" 
                title="Back" 
                onClick={() => window.history.back()}
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                className="p-2 rounded-full hover:bg-accent hover:text-foreground transition-colors focus:outline-none" 
                title="Forward" 
                onClick={() => window.history.forward()}
              >
                <ArrowRight size={20} />
              </button>
              <button 
                className="p-2 rounded-full hover:bg-accent hover:text-foreground transition-colors focus:outline-none" 
                title="Reload" 
                onClick={() => window.location.reload()}
              >
                <RotateCw size={18} />
              </button>
            </div>

            <div className="mr-8 cursor-pointer flex items-center" onClick={clearSearch}>
              <img src={earthLogoImg} alt="GlobalSearch Logo" className="w-8 h-8 sm:w-10 sm:h-10 mr-2 object-contain" />
              <span className="flex items-center text-2xl sm:text-3xl font-extrabold tracking-tight">
                <span className="text-[#0B2447] dark:text-blue-100">Global</span>
                <span className="text-[#007BFF] dark:text-blue-400">Search</span>
              </span>
            </div>
            <div className="flex-1 w-full min-w-[280px] lg:w-auto max-w-full lg:max-w-[692px] mt-4 lg:mt-0">
              <SearchBar onSearch={handleSearch} isLoading={isSearching} initialQuery={query} language={language} />
            </div>
          </header>

          {}
          <div className="border-b border-border pl-4 lg:pl-[148px] py-3 flex space-x-6 text-sm text-foreground/70 overflow-x-auto whitespace-nowrap hide-scrollbar">
            <div 
              className={`cursor-pointer flex items-center ${activeTab === 'ai' ? 'text-primary border-b-2 border-primary pb-3 -mb-3 font-medium' : 'hover:text-foreground text-[#4285F4]'}`}
              onClick={() => setActiveTab('ai')}
            >
              <Sparkles size={16} className="mr-1 fill-current" />
              {getTranslation(language, 'tabs.aiMode')}
            </div>
            <div 
              className={`cursor-pointer ${activeTab === 'all' ? 'text-primary border-b-2 border-primary pb-3 -mb-3 font-medium' : 'hover:text-foreground'}`}
              onClick={() => setActiveTab('all')}
            >
              {getTranslation(language, 'tabs.all')}
            </div>
            <div 
              className={`cursor-pointer ${activeTab === 'videos' ? 'text-primary border-b-2 border-primary pb-3 -mb-3 font-medium' : 'hover:text-foreground'}`}
              onClick={() => setActiveTab('videos')}
            >
              {getTranslation(language, 'tabs.videos')}
            </div>
            <div 
              className={`cursor-pointer ${activeTab === 'images' ? 'text-primary border-b-2 border-primary pb-3 -mb-3 font-medium' : 'hover:text-foreground'}`}
              onClick={() => setActiveTab('images')}
            >
              {getTranslation(language, 'tabs.images')}
            </div>
            <div 
              className={`cursor-pointer ${activeTab === 'shortVideos' ? 'text-primary border-b-2 border-primary pb-3 -mb-3 font-medium' : 'hover:text-foreground'}`}
              onClick={() => setActiveTab('shortVideos')}
            >
              {getTranslation(language, 'tabs.shortVideos')}
            </div>
            <div 
              className={`cursor-pointer ${activeTab === 'shopping' ? 'text-primary border-b-2 border-primary pb-3 -mb-3 font-medium' : 'hover:text-foreground'}`}
              onClick={() => setActiveTab('shopping')}
            >
              {getTranslation(language, 'tabs.shopping')}
            </div>
            <div 
              className={`cursor-pointer ${activeTab === 'news' ? 'text-primary border-b-2 border-primary pb-3 -mb-3 font-medium' : 'hover:text-foreground'}`}
              onClick={() => setActiveTab('news')}
            >
              {getTranslation(language, 'tabs.news')}
            </div>
            <div className="cursor-pointer hover:text-foreground flex items-center">
              {getTranslation(language, 'tabs.more')}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>

          {}
          <main className="flex-1 flex flex-col lg:flex-row px-4 lg:px-[148px] py-6 w-full max-w-7xl">
            {}
            <div className="w-full lg:max-w-[652px] lg:mr-12 mb-8 lg:mb-0">
              <p className="text-sm text-foreground/50 mb-4">
                {getTranslation(language, 'aboutResults').replace('{count}', results.length)}
              </p>
              <SearchResults results={results} isLoading={isSearching} query={query} onLaunchApp={setCurrentView} activeTab={activeTab} />
            </div>
            
            {}
            <div className="hidden lg:block w-[360px]">
              {query.toLowerCase() === 'u' ? (
                <KnowledgePanel />
              ) : (query.toLowerCase().includes('food') || query.toLowerCase().includes('hunger') || query.toLowerCase().includes('waste') || query.toLowerCase().includes('crave') || query.toLowerCase().includes('eat')) ? (
                <FoodWidget district={district} />
              ) : null}
            </div>
          </main>
        </div>
      )}
      
      {}
      {!hasSearched && (
        <footer className={`text-sm w-full z-10 relative ${showBackground ? 'bg-black/20 backdrop-blur-lg border-t border-white/10 text-white/70' : 'bg-accent text-foreground/60'}`}>
          <div className={`border-b px-8 py-3 flex items-center ${showBackground ? 'border-white/10' : 'border-border'}`}>
            <span className="mr-2">{getTranslation(language, 'footer.india')}</span>
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            <span>{getTranslation(language, 'footer.zeroLogs')}</span>
          </div>
          <div className="px-8 py-3 flex flex-wrap justify-between">
            <div className="flex space-x-6">
              <a href="#" className="hover:underline">{getTranslation(language, 'footer.about')}</a>
              <a href="#" className="hover:underline">{getTranslation(language, 'footer.advertising')}</a>
              <a href="#" className="hover:underline">{getTranslation(language, 'footer.business')}</a>
              <a href="#" className="hover:underline">{getTranslation(language, 'footer.howSearchWorks')}</a>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:underline">{getTranslation(language, 'footer.privacy')}</a>
              <a href="#" className="hover:underline">{getTranslation(language, 'footer.terms')}</a>
              <a href="#" className="hover:underline">{getTranslation(language, 'footer.settings')}</a>
            </div>
          </div>
        </footer>
      )}

        <LanguageModal 
          isOpen={isLanguageModalOpen} 
          onClose={() => setIsLanguageModalOpen(false)} 
          languages={languages} 
          currentLanguage={language} 
          onSelectLanguage={handleLanguageChange} 
          isDarkMode={isDarkMode} 
        />
        
        {isShowcaseOpen && (
          <CoreNetShowcase onClose={() => setIsShowcaseOpen(false)} />
        )}
        
        {/* Add Shortcut Modal */}
        {isAddShortcutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
            <div className="w-full max-w-sm bg-white dark:bg-[#1a1a1c] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col transform transition-transform animate-in zoom-in-95 duration-300 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add shortcut</h3>
                <button onClick={() => setIsAddShortcutOpen(false)} className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleAddShortcut} className="p-5">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
                    <input 
                      type="text" 
                      required
                      value={newShortcutForm.name}
                      onChange={(e) => setNewShortcutForm({...newShortcutForm, name: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-black/40 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">URL</label>
                    <div className="relative">
                      <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        required
                        value={newShortcutForm.url}
                        onChange={(e) => setNewShortcutForm({...newShortcutForm, url: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-black/40 border border-gray-300 dark:border-white/10 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button type="button" onClick={() => setIsAddShortcutOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                    Done
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        </>
      )}

      {/* Security Threat Modal */}
      {securityAlert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#1a1a1c] border border-red-500/50 rounded-2xl p-8 max-w-md w-full mx-4 shadow-[0_0_50px_rgba(239,68,68,0.3)] text-center flex flex-col items-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Threat Blocked</h2>
            <p className="text-red-400 font-medium mb-6">{securityAlert}</p>
            <button 
              onClick={() => setSecurityAlert(null)}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors w-full shadow-lg"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

