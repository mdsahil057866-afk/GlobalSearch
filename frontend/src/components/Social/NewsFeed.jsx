import React, { useEffect, useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import PostCreator from './PostCreator';
import PostCard from './PostCard';
import NotificationDropdown from './NotificationDropdown';
import ChatBubble from './ChatBubble';
import StoryViewer from './StoryViewer';
import UserProfile from './UserProfile';
import { Home, PlaySquare, Store, Users, User, Bookmark, Search, MessageCircle, Menu, Grid, MoreHorizontal } from 'lucide-react';
import pixoraLogo from '../../assets/pixora_unique_logo.png';

const NewsFeed = () => {
  const { feed, fetchFeed, user, activeChats, openChat } = useSocial();
  const [activeTab, setActiveTab] = useState('home');
  const [activeSidebarTab, setActiveSidebarTab] = useState('feed');
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);

  useEffect(() => {
    fetchFeed();
    
  }, []);

  
  const stories = [
    { id: 1, name: 'Add Story', img: user?.avatar, isAdd: true },
    { id: 2, name: 'Rahul Sharma', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=300&fit=crop' },
    { id: 3, name: 'Priya Singh', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=300&fit=crop' },
    { id: 4, name: 'Amit Kumar', img: 'https://images.unsplash.com/photo-1555448248-2571daf6344b?w=200&h=300&fit=crop' },
    { id: 5, name: 'Neha Gupta', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=300&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-[#070B14] text-white font-sans pt-16 relative overflow-hidden">
      {}
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/20 blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full bg-blue-600/20 blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed top-[40%] left-[30%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none z-0"></div>

      {}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg flex items-center justify-between px-4 z-50">
        {}
        <div className="flex items-center gap-2">
          <img 
            src={pixoraLogo} 
            alt="Pixora Logo" 
            className="w-10 h-10 object-contain cursor-pointer transition-transform hover:scale-105"
            onClick={() => setActiveSidebarTab('feed')}
          />
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search Pixora..." 
              className="pl-10 pr-4 py-2 bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/5 rounded-full text-sm outline-none w-64 text-white placeholder-gray-400 transition-all shadow-inner"
            />
          </div>
        </div>

        {}
        <div className="hidden md:flex flex-1 max-w-[600px] justify-center gap-2 px-10">
          {[
            { id: 'feed', icon: Home },
            { id: 'video', icon: PlaySquare },
            { id: 'marketplace', icon: Store },
            { id: 'groups', icon: Users }
          ].map(tab => (
            <div 
              key={tab.id}
              onClick={() => setActiveSidebarTab(tab.id)}
              className={`flex-1 flex justify-center items-center h-12 cursor-pointer border-b-[3px] transition-all rounded-lg mb-1 mt-1 mx-1 ${
                activeSidebarTab === tab.id 
                  ? 'border-cyan-400 text-cyan-400 bg-cyan-400/10 shadow-[inset_0_-2px_10px_rgba(34,211,238,0.2)]' 
                  : 'border-transparent text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <tab.icon className={`w-6 h-6 ${activeSidebarTab === tab.id ? 'fill-current' : ''}`} />
            </div>
          ))}
        </div>

        {}
        <div className="flex items-center gap-3">
          <button className="md:hidden w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/5 flex items-center justify-center transition-colors">
            <Search className="w-5 h-5 text-gray-300" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/5 flex items-center justify-center transition-colors shadow-[0_0_15px_rgba(0,0,0,0.2)]">
            <Grid className="w-5 h-5 text-cyan-300" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/5 flex items-center justify-center transition-colors shadow-[0_0_15px_rgba(0,0,0,0.2)]">
            <MessageCircle className="w-5 h-5 text-blue-300" />
          </button>
          <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/5 flex items-center justify-center transition-colors shadow-[0_0_15px_rgba(0,0,0,0.2)] text-emerald-300">
            <NotificationDropdown />
          </div>
          <img 
            src={user?.avatar || 'https://via.placeholder.com/150'} 
            alt="Profile" 
            onClick={() => setActiveSidebarTab('profile')}
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-cyan-500/50 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all object-cover ml-2" 
          />
        </div>
      </nav>

      {}
      <div className="flex justify-center w-full max-w-[1600px] mx-auto relative">
        
        {}
        <div className="hidden xl:block w-[360px] flex-shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto hover:scrollbar-thumb-gray-600 p-4 pb-20 custom-scrollbar z-10">
          <div onClick={() => setActiveSidebarTab('profile')} className={`flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-white/10 ${activeSidebarTab === 'profile' ? 'bg-white/10 border-white/20 shadow-lg' : ''}`}>
            <img src={user?.avatar} alt="User" className="w-10 h-10 rounded-full object-cover border border-cyan-500/50" />
            <span className="font-bold tracking-wide">{user?.name}</span>
          </div>
          <div onClick={() => setActiveSidebarTab('friends')} className={`flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl cursor-pointer mt-3 transition-colors border border-transparent hover:border-white/10 ${activeSidebarTab === 'friends' ? 'bg-white/10 border-white/20 shadow-lg' : ''}`}>
            <div className="bg-blue-500/20 p-2 rounded-lg border border-blue-500/30">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <span className="font-medium tracking-wide">Friends</span>
          </div>
          <div onClick={() => setActiveSidebarTab('saved')} className={`flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl cursor-pointer mt-1 transition-colors border border-transparent hover:border-white/10 ${activeSidebarTab === 'saved' ? 'bg-white/10 border-white/20 shadow-lg' : ''}`}>
            <div className="bg-purple-500/20 p-2 rounded-lg border border-purple-500/30">
              <Bookmark className="w-6 h-6 text-purple-400" />
            </div>
            <span className="font-medium tracking-wide">Saved</span>
          </div>
          <div onClick={() => setActiveSidebarTab('marketplace')} className={`flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl cursor-pointer mt-1 transition-colors border border-transparent hover:border-white/10 ${activeSidebarTab === 'marketplace' ? 'bg-white/10 border-white/20 shadow-lg' : ''}`}>
            <div className="bg-emerald-500/20 p-2 rounded-lg border border-emerald-500/30">
              <Store className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="font-medium tracking-wide">Marketplace</span>
          </div>
          <div onClick={() => setActiveSidebarTab('video')} className={`flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl cursor-pointer mt-1 transition-colors border border-transparent hover:border-white/10 ${activeSidebarTab === 'video' ? 'bg-white/10 border-white/20 shadow-lg' : ''}`}>
            <div className="bg-cyan-500/20 p-2 rounded-lg border border-cyan-500/30">
              <PlaySquare className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="font-medium tracking-wide">Watch</span>
          </div>
          
          <div className="border-b border-gray-300 dark:border-gray-700 my-2 mx-2"></div>
          <h3 className="text-gray-500 dark:text-gray-400 font-semibold px-2 py-2">Your Shortcuts</h3>
          {}
          <div className="flex items-center gap-3 p-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-green-400 to-blue-500"></div>
            <span className="font-medium text-sm">React Developers India</span>
          </div>
        </div>

        {}
        <div className="w-full max-w-[680px] sm:px-8 px-2 flex-shrink-0 pt-6 pb-20">
          
          {activeSidebarTab === 'feed' ? (
            <>
              {}
              <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-2">
                {stories.map((story, idx) => (
                  <div key={story.id} onClick={() => setActiveStoryIndex(idx)} className="relative w-[112px] h-[200px] flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer shadow-lg group hover:-translate-y-1 transition-all duration-300 border border-white/10">
                    {story.isAdd ? (
                      <div className="w-full h-full bg-white/5 backdrop-blur-md flex flex-col items-center border border-white/10">
                        <img src={story.img} alt="Add" className="w-full h-[130px] object-cover transition-transform group-hover:scale-105 opacity-80" />
                        <div className="absolute top-[110px] w-12 h-12 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-[0_0_15px_rgba(34,211,238,0.5)] border-2 border-[#0A0F1C]">
                          +
                        </div>
                        <span className="mt-6 text-xs font-semibold text-center">Create Story</span>
                      </div>
                    ) : (
                      <>
                        <img src={story.img} alt={story.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 group-hover:from-black/60 transition-colors"></div>
                        <div className="absolute top-3 left-3 w-10 h-10 rounded-full border-[3px] border-cyan-400 overflow-hidden z-10 shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                          <img src={story.img} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <span className="absolute bottom-3 left-3 text-white text-sm font-bold tracking-wide drop-shadow-lg z-10">{story.name}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>

              <PostCreator />
              
              <div className="space-y-6">
                {feed.length === 0 ? (
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-10 text-center shadow-xl border border-white/10 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <Grid className="w-8 h-8 text-gray-500" />
                    </div>
                    <p className="text-gray-400 font-semibold text-lg">Your universe is quiet right now.</p>
                    <p className="text-gray-500 text-sm mt-2">Connect with more friends to see their updates here.</p>
                  </div>
                ) : (
                  feed.map(post => (
                    <PostCard key={post._id} post={post} />
                  ))
                )}
              </div>
            </>
          ) : activeSidebarTab === 'profile' ? (
            <div className="-mx-4 sm:-mx-8">
               <UserProfile />
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 text-center shadow-xl border border-white/10 mt-10">
              <h2 className="text-3xl font-extrabold mb-4 capitalize bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">{activeSidebarTab}</h2>
              <p className="text-gray-400 font-medium">This module is currently charging up in the Pixora labs.</p>
            </div>
          )}
        </div>

        {}
        <div className="hidden lg:block w-[360px] flex-shrink-0 sticky top-14 h-[calc(100vh-56px)] overflow-y-auto hover:scrollbar-thumb-gray-300 dark:hover:scrollbar-thumb-gray-600 p-4 pb-20 custom-scrollbar">
          
          <h3 className="text-gray-500 dark:text-gray-400 font-semibold mb-3">Sponsored</h3>
          <div className="flex gap-3 items-center hover:bg-gray-200 dark:hover:bg-[#3A3B3C] p-2 rounded-lg cursor-pointer mb-2">
            <img src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=150&h=150&fit=crop" className="w-[110px] h-[110px] rounded-lg object-cover" alt="Ad" />
            <div>
              <p className="font-semibold text-sm">Boost your startup today</p>
              <p className="text-xs text-gray-500">investindia.gov.in</p>
            </div>
          </div>
          
          <div className="border-b border-gray-300 dark:border-gray-700 my-4"></div>
          
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-2">
            <h3 className="font-semibold">Contacts</h3>
            <div className="flex gap-3">
              <Search className="w-4 h-4 cursor-pointer" />
              <MoreHorizontal className="w-4 h-4 cursor-pointer" />
            </div>
          </div>
          
          {}
          {[
            { id: 'contact_1', name: 'Karan Mehra', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
            { id: 'contact_2', name: 'Sneha Patel', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
            { id: 'contact_3', name: 'Rohan Gupta', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop' },
            { id: 'contact_4', name: 'Riya Sen', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
          ].map((contact, i) => (
            <div 
              key={i} 
              onClick={() => openChat(contact)}
              className="flex items-center gap-3 p-2 hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg cursor-pointer relative"
            >
              <div className="relative">
                <img src={contact.img} alt={contact.name} className="w-9 h-9 rounded-full object-cover" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-[#242526]"></div>
              </div>
              <span className="font-medium text-sm">{contact.name}</span>
            </div>
          ))}
        </div>

      </div>

      {}
      <div className="fixed bottom-0 right-24 flex flex-row-reverse items-end gap-3 z-[100] pointer-events-none">
        {activeChats.map(contact => (
          <ChatBubble key={contact.id} contact={contact} />
        ))}
      </div>

      {}
      {activeStoryIndex !== null && (
        <StoryViewer 
          story={stories[activeStoryIndex]} 
          onClose={() => setActiveStoryIndex(null)}
          onNext={() => setActiveStoryIndex((prev) => (prev + 1) % stories.length)}
          onPrev={() => setActiveStoryIndex((prev) => (prev - 1 + stories.length) % stories.length)}
        />
      )}

    </div>
  );
};

export default NewsFeed;
