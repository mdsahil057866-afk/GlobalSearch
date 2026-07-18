import React, { useRef, useEffect } from 'react';

import PlayTubeLogo from './PlayTubeLogo';
import QuickChatLogo from './QuickChatLogo';
import PixoraLogo from './PixoraLogo';
import CoreCloudLogo from './CoreCloudLogo';
import NovaAILogo from './NovaAILogo';
import VillageInternetLogo from './VillageInternetLogo';
import CoreNetLogo from './CoreNetLogo';

const AppsMenu = ({ isOpen, onClose, setCurrentView, isLoggedIn, setPendingAction, setShowLoginModal }) => {
  const menuRef = useRef(null);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.addEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAppClick = (appId) => {
    if (appId === 'mail') {
      if (!isLoggedIn) {
        setPendingAction('gmail');
        setShowLoginModal(true);
      } else {
        setCurrentView('mail');
      }
    } else {
      
      setCurrentView(appId);
    }
    onClose();
  };

  const apps = [
    { id: 'search', name: 'GlobalSearch', customIcon: <CoreNetLogo className="w-6 h-6" /> },
    { id: 'playtube', name: 'PlayTube', customIcon: <img src="/assets/images/playtube.png" alt="PlayTube" className="w-8 object-contain" /> },
    { id: 'quickchat', name: 'QuickChat', customIcon: <QuickChatLogo className="w-6 h-6" /> },
    { id: 'pixora', name: 'Pixora', customIcon: <PixoraLogo className="w-6 h-6" /> },
    { id: 'CoreCloud', name: 'CoreCloud', customIcon: <CoreCloudLogo className="w-6 h-6" /> },
    { id: 'novaai', name: 'NovaAI', customIcon: <NovaAILogo className="w-6 h-6" /> },
    { id: 'village', name: 'VillageNet', customIcon: <VillageInternetLogo className="w-6 h-6" /> },
    { id: 'navimap', name: 'NaviMap', iconPath: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7l6-3 5.447 2.724A1 1 0 0121 7.618v10.764a1 1 0 01-1.447.894L15 17l-6 3z M9 7v13 M15 4v13', color: '#FF9933' },
    { id: 'swiftpay', name: 'SwiftPay', iconPath: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', color: '#138808' },
    { id: 'syncmeet', name: 'SyncMeet', iconPath: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', color: '#4285F4' },
    { id: 'mail', name: 'SwiftMail', iconPath: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: '#EA4335' }
  ];

  return (
    <div 
      ref={menuRef}
      className="absolute top-12 right-12 w-[320px] bg-white dark:bg-[#1f1f1f] rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-4 z-50 animate-in fade-in zoom-in-95 duration-200"
    >
      <div className="grid grid-cols-3 gap-2 overflow-y-auto max-h-[400px] custom-scrollbar p-2">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => handleAppClick(app.id)}
            className="flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group focus:outline-none"
          >
            <div className={`p-3 ${app.id !== 'playtube' ? 'rounded-full bg-gray-50 dark:bg-gray-900' : ''} group-hover:scale-110 transition-transform duration-200 flex items-center justify-center w-12 h-12`}>
              {app.customIcon ? (
                app.customIcon
              ) : app.iconPath ? (
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke={app.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={app.iconPath} />
                </svg>
              ) : (
                <app.icon className={`${app.color}`} size={26} strokeWidth={1.5} />
              )}
            </div>
            <span className="mt-2 text-xs text-gray-700 dark:text-gray-300 font-medium">
              {app.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AppsMenu;

