import React, { useState } from 'react';
import { Moon, Sun, Grid, Beaker } from 'lucide-react';
import LoginModal from './LoginModal';
import SearchLabsModal from './SearchLabsModal';
import AppsMenu from './AppsMenu';

const Navbar = ({ language, setLanguage, district, setDistrict, isDarkMode, setIsDarkMode, isHomepage, showBackground, isLoggedIn, setIsLoggedIn, loggedInEmail, setLoggedInEmail, setCurrentView }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLabsOpen, setIsLabsOpen] = useState(false);
  const [showAppsMenu, setShowAppsMenu] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const districts = ['All', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'];

  const handleEmailClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setPendingAction('gmail');
      setShowLoginModal(true);
    } else {
      setCurrentView('mail');
    }
  };

  if (!isHomepage) return null;

  const isTransparent = isHomepage && showBackground;

  return (
    <nav className={`w-full px-4 py-3 flex justify-end items-center z-50 transition-colors absolute top-0 ${isTransparent ? 'bg-transparent text-white' : 'bg-background'}`}>
      
      {}
      <div className={`flex items-center space-x-2 sm:space-x-4 text-sm ${isTransparent ? 'text-white/90' : 'text-foreground/80'}`}>
        
        {/* District Selector */}
        <div className="hidden sm:flex items-center hover:underline cursor-pointer">
          <select 
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="bg-transparent font-medium focus:outline-none cursor-pointer"
          >
            {districts.map(d => (
              <option key={d} value={d} className="bg-background text-foreground">{d}</option>
            ))}
          </select>
        </div>

        {isHomepage && (
          <>
            <button onClick={handleEmailClick} className="hidden sm:inline-block hover:underline text-sm font-medium">SwiftMail</button>
            <button onClick={(e) => e.preventDefault()} className="hidden sm:inline-block hover:underline text-sm font-medium">Images</button>
          </>
        )}
        
        {/* Search Labs Icon */}
        <button 
          onClick={() => setIsLabsOpen(true)}
          className="p-1.5 sm:p-2 rounded-full hover:bg-accent hover:text-foreground transition-colors focus:outline-none"
          title="Search Labs"
        >
          <Beaker size={20} />
        </button>

        {/* Dark Mode Toggle */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-1.5 sm:p-2 rounded-full hover:bg-accent hover:text-foreground transition-colors focus:outline-none"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Apps Menu Toggle */}
        <div className="relative">
          <button 
            onClick={() => setShowAppsMenu(!showAppsMenu)}
            className="p-1.5 sm:p-2 rounded-full hover:bg-accent hover:text-foreground transition-colors focus:outline-none"
          >
            <Grid size={20} />
          </button>
          
          <AppsMenu 
            isOpen={showAppsMenu} 
            onClose={() => setShowAppsMenu(false)}
            setCurrentView={setCurrentView}
            isLoggedIn={isLoggedIn}
            setPendingAction={setPendingAction}
            setShowLoginModal={setShowLoginModal}
          />
        </div>

        {/* User Account / Sign In */}
        {isLoggedIn ? (
          <div className="relative">
            <div 
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs cursor-pointer shadow-sm ring-2 ring-transparent hover:ring-blue-400 transition-all uppercase"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {loggedInEmail ? loggedInEmail.charAt(0) : 'U'}
            </div>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1f1f1f] rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">User Account</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{loggedInEmail || 'user@globalsearch.in'}</p>
                </div>
                <div className="p-2">
                  <button 
                    onClick={() => { setIsLoggedIn(false); setShowDropdown(false); }}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={() => {
              setPendingAction(null);
              setShowLoginModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 sm:px-5 sm:py-1.5 rounded-full font-medium transition-colors shadow-sm text-sm"
          >
            Sign In
          </button>
        )}
      </div>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        onLogin={(email) => { 
          setIsLoggedIn(true); 
          setLoggedInEmail(email);
          setShowLoginModal(false); 
          if (pendingAction === 'gmail') {
            setCurrentView('mail');
            setPendingAction(null);
          }
        }} 
      />
      <SearchLabsModal 
        isOpen={isLabsOpen} 
        onClose={() => setIsLabsOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;
