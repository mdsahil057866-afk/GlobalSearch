import React, { useState } from 'react';
import { 
  Search, Menu, Settings, Grid, HelpCircle, Inbox, 
  Star, Clock, Send, File, AlertCircle, Trash2, 
  ChevronLeft, ChevronRight, MoreVertical, Archive, RotateCw, Sparkles, Languages
} from 'lucide-react';
import mailLogoImg from '../assets/swiftmail_logo.png';

const MailInbox = ({ userEmail, onBack, onNavigate, isDarkMode, setIsDarkMode, isLoggedIn, setIsLoggedIn, setLoggedInEmail }) => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Top Navigation States
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAppGrid, setShowAppGrid] = useState(false);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const INITIAL_EMAILS = [
    {
      id: 1,
      sender: "Security @ GlobalSearch",
      subject: "Security alert for your linked GlobalSearch account",
      preview: "We noticed a new sign-in to your INDIMail account from a Windows device.",
      date: "1:20 AM",
      read: false,
      starred: true,
      tag: "Security"
    },
    {
      id: 2,
      sender: "Welcome Team",
      subject: "Welcome to INDIMail, the secure email experience",
      preview: "Thank you for creating an account with GlobalSearch. Here are a few tips to get started with your new inbox...",
      date: "May 18",
      read: true,
      starred: false
    },
    {
      id: 3,
      sender: "GlobalSearch App Store",
      subject: "Your receipt from GlobalSearch App Store",
      preview: "Thank you. You've made a purchase from GlobalSearch App Store. Order Number: IN.3340-...",
      date: "May 15",
      read: true,
      starred: false
    },
    {
      id: 4,
      sender: "GitHub",
      subject: "[GitHub] Please verify your device",
      preview: "A sign in attempt requires further verification because we did not recognize your device.",
      date: "May 12",
      read: true,
      starred: false,
      tag: "Updates"
    },
    {
      id: 5,
      sender: "GlobalSearch Promotions",
      subject: "Try the new GlobalSearch AI Features today!",
      preview: "We've rolled out new AI capabilities to your search experience. Try it out now.",
      date: "May 10",
      read: true,
      starred: true,
      tag: "Promotions"
    }
  ];

  const [emails, setEmails] = useState(INITIAL_EMAILS);
  
  
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [attachments, setAttachments] = useState([]);

  const handleSend = () => {
    if (!composeTo.trim()) {
      alert("Please specify a recipient in the 'To' field.");
      return;
    }
    
    const newEmail = {
      id: Date.now(),
      sender: 'To: ' + composeTo,
      subject: composeSubject || '(No Subject)',
      preview: composeBody.substring(0, 50) + (composeBody.length > 50 ? '...' : ''),
      date: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      read: true,
      starred: false,
      isSent: true,
      hasAttachments: attachments.length > 0
    };
    
    setEmails([newEmail, ...emails]);
    setIsComposeOpen(false);
    setComposeTo('');
    setComposeSubject('');
    setComposeBody('');
    setAttachments([]);
    setActiveTab('sent');
  };

  const filteredEmails = emails.filter(email => {
    if (searchQuery && !email.subject.toLowerCase().includes(searchQuery.toLowerCase()) && !email.sender.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    switch (activeTab) {
      case 'starred': return email.starred;
      case 'inbox': return !email.isSent;
      case 'sent': return email.isSent; 
      case 'drafts': return false;
      case 'snoozed': return false;
      case 'spam': return false;
      case 'trash': return false;
      default: return true;
    }
  });

  const sidebarItems = [
    { id: 'inbox', icon: Inbox, label: 'Inbox', count: 1 },
    { id: 'starred', icon: Star, label: 'Starred' },
    { id: 'snoozed', icon: Clock, label: 'Snoozed' },
    { id: 'sent', icon: Send, label: 'Sent' },
    { id: 'drafts', icon: File, label: 'Drafts' },
    { id: 'spam', icon: AlertCircle, label: 'Spam' },
    { id: 'trash', icon: Trash2, label: 'Trash' },
  ];

  return (
    <div className="flex flex-col h-screen w-full bg-white dark:bg-[#0f0f0f] text-gray-800 dark:text-gray-200 overflow-hidden font-sans">
      
      {}
      <header className="flex items-center justify-between px-4 sm:px-6 py-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f0f0f] z-10">
        <div className="flex items-center min-w-[238px]">
          <button className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors mr-1">
            <Menu size={20} />
          </button>
          
          <div className="flex items-center cursor-pointer select-none ml-2" onClick={onBack}>
            <img src={mailLogoImg} alt="SwiftMail Logo" className="w-9 h-9 rounded-full object-cover mr-2.5 border border-gray-200 dark:border-gray-700 shadow-sm" />
            <span className="text-xl font-medium tracking-tight text-gray-700 dark:text-gray-200">
              Bharat<span className="font-bold text-[#FF9933]">Mail</span>
            </span>
          </div>
        </div>

        <div className="flex-1 max-w-3xl px-8 hidden md:block">
          <div className="flex items-center bg-[#EAF1FB] dark:bg-gray-800/60 rounded-full px-4 py-2.5 w-full focus-within:bg-white dark:focus-within:bg-gray-800 focus-within:shadow-md border border-transparent focus-within:border-gray-200 dark:focus-within:border-gray-700 transition-all">
            <button className="text-gray-500 dark:text-gray-400 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Search size={18} />
            </button>
            <input 
              type="text" 
              placeholder="Search mail" 
              className="bg-transparent border-none outline-none w-full px-3 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="text-gray-500 dark:text-gray-400 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Settings size={18} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-1 min-w-[150px] relative">
          <button 
            onClick={onBack}
            className="hidden sm:flex mr-4 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
          >
            Return to Search
          </button>

          <button onClick={() => { setShowHelp(!showHelp); setShowSettings(false); setShowAppGrid(false); }} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors hidden sm:block relative">
            <HelpCircle size={20} />
            {showHelp && (
              <div className="absolute right-0 top-12 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 p-4 text-left cursor-default" onClick={e => e.stopPropagation()}>
                <h3 className="text-gray-900 dark:text-white font-bold mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">Help Center</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer transition-colors">Training & Tutorials</li>
                  <li className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer transition-colors">Updates & Release Notes</li>
                  <li className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer transition-colors">Send Feedback</li>
                </ul>
              </div>
            )}
          </button>
          
          <button onClick={() => { setShowSettings(!showSettings); setShowHelp(false); setShowAppGrid(false); }} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors hidden sm:block relative">
            <Settings size={20} />
            {showSettings && (
              <div className="absolute right-0 top-12 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 p-4 text-left cursor-default" onClick={e => e.stopPropagation()}>
                <h3 className="text-gray-900 dark:text-white font-bold mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">Settings</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer transition-colors" onClick={() => setIsDarkMode(!isDarkMode)}>
                    <span>Dark Mode</span>
                    <div className={`w-8 h-4 rounded-full relative transition-colors ${isDarkMode ? 'bg-[#FF9933]' : 'bg-gray-300'}`}>
                      <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-all ${isDarkMode ? 'right-0.5' : 'left-0.5'}`}></div>
                    </div>
                  </li>
                  <li className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer transition-colors">See all settings</li>
                  <li className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded cursor-pointer transition-colors">Keyboard Shortcuts</li>
                </ul>
              </div>
            )}
          </button>
          
          <button onClick={() => { setShowAppGrid(!showAppGrid); setShowHelp(false); setShowSettings(false); }} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors mr-2 hidden sm:block relative">
            <Grid size={20} />
            {showAppGrid && (
              <div className="absolute right-0 top-12 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl z-50 p-4 text-left cursor-default" onClick={e => e.stopPropagation()}>
                <h3 className="text-gray-900 dark:text-white font-bold mb-3 text-center border-b border-gray-200 dark:border-gray-700 pb-2">GlobalSearch Apps</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: 'Search', icon: '🔍', color: 'text-blue-500', view: 'search' },
                    { name: 'Drive', icon: '📁', color: 'text-indigo-500', view: 'bharatdrive' },
                    { name: 'Maps', icon: '🗺️', color: 'text-green-500', view: 'navimap' },
                    { name: 'Tube', icon: '▶️', color: 'text-red-500', view: 'playtube' },
                    { name: 'Meet', icon: '📹', color: 'text-blue-400', view: 'syncmeet' },
                    { name: 'Pay', icon: '₹', color: 'text-green-600', view: 'swiftpay' }
                  ].map(app => (
                    <div 
                      key={app.name} 
                      onClick={() => onNavigate && onNavigate(app.view)}
                      className="flex flex-col items-center justify-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl cursor-pointer transition-colors"
                    >
                      <div className={`text-2xl mb-1 ${app.color}`}>{app.icon}</div>
                      <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">{app.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </button>

          <div className="relative group cursor-pointer ml-1">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm uppercase ring-2 ring-transparent group-hover:ring-indigo-300 transition-all shadow-sm">
              {isLoggedIn && userEmail ? userEmail.charAt(0) : 'U'}
            </div>
            <div className="absolute right-0 top-10 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {isLoggedIn ? (userEmail || 'user@corenet.in') : 'Not Signed In'}
                </p>
                <p className="text-xs text-gray-500 mt-1">SwiftMail User</p>
              </div>
              <div className="p-2">
                {isLoggedIn ? (
                  <button 
                    onClick={() => { setIsLoggedIn(false); setLoggedInEmail(''); }}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button 
                    onClick={() => { setIsLoggedIn(true); setLoggedInEmail('user@corenet.in'); }}
                    className="w-full text-left px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {}
      <div className="flex flex-1 overflow-hidden">
        
        {}
        <div className="w-[256px] flex-shrink-0 flex flex-col py-3 px-3 hidden md:flex">
          <button 
            onClick={() => setIsComposeOpen(true)}
            className="bg-gradient-to-r from-[#FF9933] to-[#138808] hover:opacity-90 text-white rounded-2xl py-4 px-5 flex items-center justify-center space-x-3 w-[160px] shadow-[0_4px_15px_rgba(255,153,51,0.4)] transition-all mb-4 font-bold tracking-wide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
            </svg>
            <span>Compose</span>
          </button>
          
          <button className="flex items-center space-x-3 mb-6 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl border border-purple-200 dark:border-purple-800/50 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors w-full font-medium text-sm">
             <Sparkles size={18} />
             <span>AI Auto-Triage</span>
          </button>

          <div className="flex-1 overflow-y-auto space-y-0.5">
            {sidebarItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  activeTab === item.id 
                    ? 'bg-[#D3E3FD] dark:bg-blue-900/40 text-[#041E49] dark:text-blue-100 font-semibold' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <item.icon size={18} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                  <span>{item.label}</span>
                </div>
                {item.count && (
                  <span className={`text-xs ${activeTab === item.id ? 'font-bold' : ''}`}>{item.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {}
        <div className="flex-1 flex flex-col bg-white dark:bg-[#0f0f0f] rounded-t-3xl md:mt-2 md:mr-2 border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm relative">
          
          {}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-4">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
              <button className="p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <RotateCw size={16} />
              </button>
              <button className="p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <MoreVertical size={16} />
              </button>
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
              <span>1-5 of 5</span>
              <div className="flex">
                <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors opacity-50 cursor-default">
                  <ChevronLeft size={18} />
                </button>
                <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors opacity-50 cursor-default">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {}
          <div className="flex border-b border-gray-100 dark:border-gray-800">
            <button className="flex items-center space-x-3 px-4 py-3 border-b-2 border-blue-600 text-blue-600 dark:text-blue-500 w-56 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <Inbox size={18} />
              <span className="font-semibold text-sm">Primary</span>
            </button>
            <button className="flex items-center space-x-3 px-4 py-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-800 dark:hover:text-gray-200 transition-colors w-56">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <span className="font-medium text-sm">Social</span>
            </button>
            <button className="flex items-center space-x-3 px-4 py-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-800 dark:hover:text-gray-200 transition-colors w-56">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
              <span className="font-medium text-sm">Promotions</span>
            </button>
          </div>

          {}
          <div className="flex-1 overflow-y-auto">
            {filteredEmails.length > 0 ? (
              filteredEmails.map((email) => (
                <div 
                  key={email.id} 
                  className={`group flex items-center px-4 py-2 border-b border-gray-100 dark:border-gray-800/50 hover:shadow-[inset_1px_0_0_#dadce0,-inset_1px_0_0_#dadce0,0_1px_2px_0_rgba(60,64,67,.3),0_1px_3px_1px_rgba(60,64,67,.15)] dark:hover:shadow-[inset_1px_0_0_#3c4043,-inset_1px_0_0_#3c4043,0_1px_2px_0_rgba(0,0,0,.3),0_1px_3px_1px_rgba(0,0,0,.15)] cursor-pointer transition-all bg-white dark:bg-[#0f0f0f] relative z-0 hover:z-10 ${!email.read ? 'bg-gray-50/50 dark:bg-gray-800/20' : ''}`}
                >
                  <div className="flex items-center space-x-3 w-48 flex-shrink-0">
                    <div className="flex items-center space-x-2 text-gray-300 dark:text-gray-600">
                      <button className="hover:text-gray-500 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
                      </button>
                      <button className={`hover:text-yellow-400 transition-colors ${email.starred ? 'text-yellow-400 fill-yellow-400' : ''}`}>
                        <Star size={18} fill={email.starred ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <span className={`text-sm truncate w-full pr-2 ${!email.read ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      {email.sender}
                    </span>
                  </div>
                  
                  <div className="flex-1 flex items-center min-w-0 pr-4">
                    {email.tag && (
                      <span className="px-2 py-0.5 text-[10px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded mr-2 flex-shrink-0 border border-gray-200 dark:border-gray-700">
                        {email.tag}
                      </span>
                    )}
                    <span className={`text-sm truncate ${!email.read ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-800 dark:text-gray-200'}`}>
                      {email.subject}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-500 mx-1">-</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {email.preview}
                    </span>
                  </div>

                  <div className="w-32 flex-shrink-0 text-right flex items-center justify-end space-x-2">
                    {email.hasAttachments && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 group-hover:hidden"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                    )}
                    <span className={`text-xs ${!email.read ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'} group-hover:hidden block`}>
                      {email.date}
                    </span>
                    <div className="hidden group-hover:flex items-center justify-end space-x-2 text-gray-500 dark:text-gray-400">
                      <button className="hover:text-blue-500" title="Smart Translate"><Languages size={16} /></button>
                      <button className="hover:text-gray-800 dark:hover:text-gray-200"><Archive size={16} /></button>
                      <button className="hover:text-gray-800 dark:hover:text-gray-200"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500">
                <Inbox size={48} className="mb-4 opacity-20" />
                <p className="text-sm font-medium">No emails here.</p>
              </div>
            )}
          </div>

          <div className="p-4 text-xs text-gray-500 text-center border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0f0f0f]">
            <p>0 GB of 15 GB used</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="#" className="hover:underline">Terms</a>
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Program Policies</a>
            </div>
          </div>
        </div>
        
        {}
        <div className="w-12 border-l border-gray-200 dark:border-gray-800 flex flex-col items-center py-4 space-y-6 bg-white dark:bg-[#0f0f0f] hidden lg:flex">
          <div className="w-8 h-8 rounded shadow-sm bg-yellow-100 flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#FABB05"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>
          </div>
          <div className="w-8 h-8 rounded shadow-sm bg-blue-100 flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1A73E8"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path></svg>
          </div>
          <div className="w-8 h-8 rounded shadow-sm bg-indigo-100 flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#8AB4F8"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>
          </div>
          <div className="w-8 h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"></path></svg>
          </button>
        </div>

      </div>

      {}
      {isComposeOpen && (
        <div className="fixed bottom-0 right-8 sm:right-24 w-full sm:w-[500px] h-[500px] bg-white dark:bg-[#1a1a1a] shadow-2xl rounded-t-2xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8">
          {}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-[#252525] border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">New Message</h3>
            <div className="flex space-x-2">
              <button className="text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 p-1.5 rounded-md transition-colors" onClick={() => setIsComposeOpen(false)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"></path></svg>
              </button>
            </div>
          </div>
          
          {}
          <div className="flex flex-col flex-1 p-2 bg-white dark:bg-[#1a1a1a]">
             <div className="flex items-center border-b border-gray-100 dark:border-gray-800 px-2 py-1">
                <span className="text-sm text-gray-500 mr-2">To</span>
                <input 
                  type="text" 
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  className="w-full py-1.5 bg-transparent text-sm text-gray-800 dark:text-gray-200 outline-none" 
                  placeholder="Recipient Email"
                />
             </div>
             <div className="flex items-center border-b border-gray-100 dark:border-gray-800 px-2 py-1">
                <span className="text-sm text-gray-500 mr-2">Subject</span>
                <input 
                  type="text" 
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  className="w-full py-1.5 bg-transparent text-sm text-gray-800 dark:text-gray-200 outline-none font-medium" 
                />
             </div>
             <textarea 
               value={composeBody}
               onChange={(e) => setComposeBody(e.target.value)}
               className="w-full flex-1 p-3 bg-transparent text-sm text-gray-800 dark:text-gray-200 outline-none resize-none mt-1"
             ></textarea>
             
             {attachments.length > 0 && (
               <div className="flex flex-wrap gap-2 px-2 py-2 border-t border-gray-100 dark:border-gray-800/50 bg-gray-50/50 dark:bg-[#1f1f1f]">
                 {attachments.map((file, idx) => (
                   <div key={idx} className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-full text-xs text-gray-700 dark:text-gray-300 shadow-sm">
                     <span className="truncate max-w-[150px] font-medium">{file.name}</span>
                     <button onClick={() => setAttachments(attachments.filter((_, i) => i !== idx))} className="text-gray-400 hover:text-red-500 transition-colors p-0.5">
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"></path></svg>
                     </button>
                   </div>
                 ))}
               </div>
             )}
          </div>
          
          {}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a1a1a]">
            <div className="flex items-center">
              <button 
                onClick={handleSend}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-md transition-colors"
              >
                <span>Send</span>
              </button>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-3"></div>
              <label className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 mr-1 cursor-pointer" title="Attach file">
                <input 
                  type="file" 
                  className="hidden" 
                  multiple 
                  onChange={(e) => {
                    if (e.target.files) {
                      setAttachments([...attachments, ...Array.from(e.target.files)]);
                    }
                  }} 
                />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
              </label>
              <button className="text-purple-500 hover:text-purple-600 transition-colors p-1.5 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/30" title="Write with AI Auto-Triage">
                <Sparkles size={18} />
              </button>
            </div>
            <button className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20" title="Discard draft" onClick={() => setIsComposeOpen(false)}>
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MailInbox;
