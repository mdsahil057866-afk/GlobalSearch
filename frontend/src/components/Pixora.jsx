import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Home, Search, PlusSquare, PlayCircle, User, Heart, MessageCircle, Share2, MoreHorizontal, X, AlertTriangle, CheckCircle, Loader2, Image as ImageIcon, WifiOff, ShieldCheck, Phone, Video, Send, Music } from 'lucide-react';
import socialLogoImg from '../assets/pixora_logo.png';

export default function Pixora({ onBack }) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Priya_cyber',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      location: 'Neon Delhi, 2050',
      image: 'https://images.unsplash.com/photo-1555448248-2571daf6344b?q=80&w=1000&auto=format&fit=crop',
      likes: '1.2M',
      caption: 'The view from the top is always glowing. 🌆✨ #Pixora #NeonDelhi #Cyberpunk',
      time: '2 hours ago',
      status: 'approved',
      mediaType: 'image'
    },
    {
      id: 2,
      user: 'Rahul.Holo',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
      location: 'Virtual Studio',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop',
      likes: '845K',
      caption: 'Just finished my new cyber PC build. Rate my setup out of 10! 💻🔥',
      time: '5 hours ago',
      status: 'approved',
      mediaType: 'image'
    }
  ]);

  const [currentTab, setCurrentTab] = useState('Home');
  const [activeChat, setActiveChat] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPostCaption, setNewPostCaption] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [isMusicModalOpen, setIsMusicModalOpen] = useState(false);
  
  const musicOptions = [
    { id: 1, title: 'Cyberpunk Neon Drift', artist: 'HoloBeats', duration: '2:15' },
    { id: 2, title: 'Delhi 2050 Theme', artist: 'SitaVR', duration: '3:05' },
    { id: 3, title: 'Trending Bass Drops', artist: 'DJ AI', duration: '1:45' },
    { id: 4, title: 'Lo-Fi Chill (Desi Edit)', artist: 'Varanasi Loops', duration: '2:30' }
  ];
  
  const [isMeshActive, setIsMeshActive] = useState(false);
  const [isGuardianActive, setIsGuardianActive] = useState(true);

  const stories = [
    { id: 1, user: 'Your Story', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop', hasStory: false },
    { id: 2, user: 'Aisha_VR', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', hasStory: true },
    { id: 3, user: 'TechGuru', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', hasStory: true },
    { id: 4, user: 'Maya.AI', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop', hasStory: true },
  ];

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axios.get('/api/social/feed', { withCredentials: true });
        if (res.data && res.data.length > 0) {
          const formattedPosts = res.data.map(p => ({
            id: p._id,
            user: p.author ? p.author.name : 'Unknown',
            avatar: p.author && p.author.avatar ? p.author.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
            location: 'GlobalSearch',
            image: p.mediaUrl || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
            mediaType: p.mediaType || 'image',
            likes: p.likes ? p.likes.length : 0,
            caption: p.content,
            time: new Date(p.createdAt).toLocaleDateString(),
            status: 'approved'
          }));
          setPosts(formattedPosts);
        }
      } catch (error) {
        console.error('Failed to fetch feed:', error);
      }
    };
    fetchFeed();
  }, []);

  const handlePostSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('content', newPostCaption);
      formData.append('mediaType', selectedMedia ? selectedMedia.type : 'none');
      if (selectedMedia && selectedMedia.file) {
        formData.append('media', selectedMedia.file);
      }
      
      const res = await axios.post('/api/social/post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      
      const newPostId = res.data._id || Date.now();
      const newPost = {
          id: newPostId,
          user: 'You',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
          location: 'Current Location',
          image: selectedMedia ? selectedMedia.url : 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
          mediaType: selectedMedia ? selectedMedia.type : 'image',
          likes: '0',
          caption: newPostCaption,
          time: 'Just now',
          status: 'approved'
      };
      
      setPosts([newPost, ...posts]);
      setIsCreateModalOpen(false);
      setNewPostCaption('');
      setSelectedMedia(null);
      setSelectedMusic(null);
      setCurrentTab('Home'); 
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('Failed to post. Ensure backend is running.');
    }
  };

  const navItems = [
    { icon: Home, label: 'Home' },
    { icon: Search, label: 'Explore' },
    { icon: PlayCircle, label: 'Reels' },
    { icon: MessageCircle, label: 'Messages' },
    { icon: Heart, label: 'Notifications' },
    { icon: PlusSquare, label: 'Create' },
    { icon: User, label: 'Profile' },
  ];

  
  const displayedPosts = currentTab === 'Home' 
    ? posts.filter(p => p.status === 'approved') 
    : posts.filter(p => p.user === 'You'); 

  return (
    <div className="flex h-screen w-full bg-[#050505] text-white font-sans overflow-hidden">
      
      {}
      <div className="hidden md:flex flex-col w-64 border-r border-white/10 bg-[#0a0a0a] p-6 relative z-10">
        <div className="absolute top-0 right-0 w-[1px] h-32 bg-gradient-to-b from-[#138808] via-[#FF9933] to-[#FF00FF]"></div>
        
        <div className="flex items-center mb-12 cursor-pointer" onClick={onBack}>
          <button className="mr-2 p-1 rounded-full hover:bg-white/10 text-gray-400">
            <ArrowLeft size={20} />
          </button>
          <img src={socialLogoImg} alt="Pixora Logo" className="w-10 h-10 mr-2 object-cover rounded-full drop-shadow-[0_0_10px_rgba(255,0,255,0.5)] border border-white/20" />
          <span className="font-bold text-xl tracking-tight">Bharat<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] to-[#FF00FF]">Social</span></span>
        </div>

        <nav className="flex-1 space-y-6">
          {navItems.map((item, i) => {
            const isActive = currentTab === item.label;
            return (
              <button 
                key={i} 
                onClick={(e) => {
                  e.preventDefault();
                  if (item.label === 'Create') {
                    setIsCreateModalOpen(true);
                  } else {
                    setCurrentTab(item.label);
                    if (item.label === 'Messages') {
                      setActiveChat(null);
                    }
                  }
                }}
                className={`w-full text-left flex items-center space-x-4 text-lg p-2 rounded-xl transition-all ${isActive ? 'font-bold text-white bg-white/10 shadow-[inset_4px_0_0_0_#FF00FF]' : 'font-medium text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <item.icon size={24} className={isActive ? 'text-[#FF00FF]' : ''} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        {/* Offline Mesh & AI Guardian */}
        <div className="mt-auto space-y-4 pt-6 border-t border-white/10">
           <button 
             onClick={() => setIsMeshActive(!isMeshActive)}
             className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${isMeshActive ? 'bg-blue-500/20 border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}
           >
             <div className="flex items-center">
               <WifiOff size={18} className={isMeshActive ? 'text-blue-400 mr-3 animate-pulse' : 'text-gray-400 mr-3'} />
               <span className={`text-sm font-medium ${isMeshActive ? 'text-white' : 'text-gray-400'}`}>Mesh Network</span>
             </div>
             <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${isMeshActive ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'}`}>
               {isMeshActive ? 'ON' : 'OFF'}
             </span>
           </button>
           
           <button 
             onClick={() => setIsGuardianActive(!isGuardianActive)}
             className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${isGuardianActive ? 'bg-emerald-500/20 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}
           >
             <div className="flex items-center">
               <ShieldCheck size={18} className={isGuardianActive ? 'text-emerald-400 mr-3' : 'text-gray-400 mr-3'} />
               <span className={`text-sm font-medium ${isGuardianActive ? 'text-white' : 'text-gray-400'}`}>AI Guardian</span>
             </div>
             <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${isGuardianActive ? 'bg-emerald-500 text-white' : 'bg-gray-800 text-gray-400'}`}>
               {isGuardianActive ? 'ON' : 'OFF'}
             </span>
           </button>
        </div>
      </div>

      {/* Main Feed Area */}
      <div className="flex-1 overflow-y-auto hide-scrollbar relative bg-[#050505]">
        <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-[#FF00FF]/10 blur-[100px] pointer-events-none"></div>
        <div className="absolute top-[50%] left-[5%] w-[20%] h-[20%] rounded-full bg-[#138808]/10 blur-[100px] pointer-events-none"></div>

        <div className="max-w-[470px] mx-auto w-full pb-20 pt-8 relative z-10 px-4">
          
          {/* Header Tab Title */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold border-b-2 border-[#FF00FF] pb-1 inline-block">
              {currentTab === 'Home' ? 'Your Feed' : 
               currentTab === 'Profile' ? 'Your Profile' : 
               currentTab}
            </h2>
          </div>

          {/* Stories Bar (Only show on Home) */}
          {currentTab === 'Home' && (
            <div className="flex space-x-4 mb-10 overflow-x-auto hide-scrollbar pb-2">
            {stories.map(story => (
              <div key={story.id} className="flex flex-col items-center space-y-2 shrink-0 cursor-pointer">
                <div className={`w-16 h-16 rounded-full p-[2px] ${story.hasStory ? 'bg-gradient-to-tr from-[#138808] via-[#FF9933] to-[#FF00FF]' : 'bg-gray-800'}`}>
                  <div className="w-full h-full bg-black rounded-full p-0.5">
                    <img src={story.img} alt="" className="w-full h-full rounded-full object-cover" />
                  </div>
                </div>
                <span className="text-xs text-gray-300 font-medium">{story.user}</span>
              </div>
            ))}
          </div>
          )}

          {/* Profile Details (Only show on Profile) */}
          {currentTab === 'Profile' && (
             <div className="mb-8 flex items-center space-x-6 p-6 bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-sm">
                <div className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-tr from-[#FF9933] to-[#FF00FF]">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" className="w-full h-full rounded-full object-cover border-4 border-black" alt="Profile" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">You</h3>
                  <p className="text-gray-400 mb-2">@globalsearch_user</p>
                  <div className="flex space-x-4 text-sm">
                    <span><strong className="text-white">{displayedPosts.length}</strong> posts</span>
                    <span><strong className="text-white">14.2K</strong> followers</span>
                  </div>
                </div>
             </div>
          )}

          {displayedPosts.length === 0 && currentTab === 'Profile' && (
            <div className="text-center text-gray-500 mt-12">
              <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
              <p>You haven't posted any videos yet.</p>
            </div>
          )}

          {/* Feed Posts */}
          {(currentTab === 'Home' || currentTab === 'Profile') && (
            <div className="space-y-12">
              {displayedPosts.map(post => (
              <div key={post.id} className="border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-sm overflow-hidden">
                {/* Post Header */}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3 cursor-pointer">
                    <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-[#FF9933] to-[#FF00FF]">
                      <img src={post.avatar} className="w-full h-full rounded-full object-cover border-2 border-black" alt="" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-white">{post.user}</h3>
                      <p className="text-xs text-gray-500">{post.location}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-white"><MoreHorizontal size={20} /></button>
                </div>

                {/* Post Image */}
                <div className="w-full aspect-square bg-black relative overflow-hidden">
                  {post.mediaType === 'video' ? (
                     <video 
                       src={post.image} 
                       className="w-full h-full object-cover" 
                       autoPlay muted loop playsInline 
                     />
                  ) : (
                     <img 
                       src={post.image} 
                       className="w-full h-full object-cover" 
                       alt="" 
                     />
                  )}
                </div>

                {/* Post Actions */}
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex space-x-4">
                      <button className={`transition-colors ${post.status !== 'approved' ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:text-[#FF00FF]'}`} disabled={post.status !== 'approved'}><Heart size={26} /></button>
                      <button className={`transition-colors ${post.status !== 'approved' ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:text-gray-300'}`} disabled={post.status !== 'approved'}><MessageCircle size={26} /></button>
                      <button className={`transition-colors ${post.status !== 'approved' ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:text-gray-300'}`} disabled={post.status !== 'approved'}><Share2 size={26} /></button>
                    </div>
                  </div>
                  
                  <p className="font-semibold text-sm mb-2">{post.status === 'approved' ? post.likes : '0'} likes</p>
                  <p className="text-sm">
                    <span className="font-semibold mr-2">{post.user}</span>
                    <span className={post.status !== 'approved' ? 'text-gray-500 italic' : 'text-gray-300'}>{post.caption}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2 uppercase tracking-wide">{post.time}</p>
                </div>
              </div>
            ))}
          </div>
          )}

          {/* Explore Tab */}
          {currentTab === 'Explore' && (
            <div className="space-y-6">
               <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                 <input type="text" placeholder="Search Pixora..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#FF00FF] transition-colors" />
               </div>
               <div className="grid grid-cols-3 gap-2">
                 {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                   <div key={i} className="aspect-square bg-white/5 rounded-xl border border-white/10 animate-pulse"></div>
                 ))}
               </div>
            </div>
          )}

          {/* Reels Tab */}
          {currentTab === 'Reels' && (
            <div className="flex justify-center h-[70vh]">
               <div className="w-full max-w-sm h-full bg-white/5 border border-white/10 rounded-3xl overflow-hidden relative flex flex-col justify-end p-6 shadow-2xl">
                 <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <PlayCircle size={64} className="opacity-50 animate-pulse" />
                 </div>
                 <div className="relative z-10 space-y-2">
                    <h3 className="font-bold text-lg">@creator_vikas</h3>
                    <p className="text-sm">Swipe up for more reels! 🔥 #trending</p>
                 </div>
               </div>
            </div>
          )}

          {/* Messages Tab */}
          {currentTab === 'Messages' && (
            <div className="space-y-4">
              {activeChat ? (
                <div className="flex flex-col h-[65vh] bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-in slide-in-from-right-8 duration-300">
                  {/* Chat Header */}
                  <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/20">
                    <div className="flex items-center space-x-3">
                      <button onClick={() => setActiveChat(null)} className="p-1 hover:bg-white/10 rounded-full text-gray-400 transition-colors">
                        <ArrowLeft size={20} />
                      </button>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#138808] to-[#FF00FF] p-[2px]">
                        <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-xs font-bold">{activeChat.name.charAt(0)}</div>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm leading-tight">{activeChat.name}</h4>
                        <span className="text-[10px] text-green-500 font-medium">Online</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-400">
                      <button className="hover:text-[#138808] transition-colors"><Phone size={20} /></button>
                      <button className="hover:text-[#FF00FF] transition-colors"><Video size={20} /></button>
                      <button className="hover:text-white transition-colors"><MoreHorizontal size={20} /></button>
                    </div>
                  </div>
                  
                  {/* Chat Messages */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col justify-end bg-gradient-to-b from-transparent to-black/20">
                    <div className="flex justify-center"><span className="text-[10px] uppercase tracking-wider text-gray-600 bg-black/40 px-3 py-1 rounded-full">Today</span></div>
                    <div className="flex justify-start">
                      <div className="bg-white/10 rounded-2xl rounded-tl-sm py-2.5 px-4 max-w-[80%] text-sm border border-white/5">
                        {activeChat.msg}
                      </div>
                    </div>
                    {chatMessages.map((msg, idx) => (
                      <div key={idx} className="flex justify-end">
                        <div className="bg-gradient-to-r from-[#FF9933] to-[#FF00FF] rounded-2xl rounded-tr-sm py-2.5 px-4 max-w-[80%] text-sm text-white shadow-lg">
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Chat Input */}
                  <div className="p-4 border-t border-white/10 bg-black/40 flex items-center space-x-3">
                    <button className="text-gray-400 hover:text-white transition-colors"><PlusSquare size={20} /></button>
                    <input 
                      type="text" 
                      placeholder="Type a message..." 
                      className="flex-1 bg-white/5 border border-white/10 rounded-full py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#FF00FF]/50 focus:bg-white/10 transition-all" 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && chatInput.trim()) {
                          setChatMessages([...chatMessages, { text: chatInput }]);
                          setChatInput('');
                        }
                      }}
                    />
                    <button 
                      onClick={() => {
                        if (chatInput.trim()) {
                          setChatMessages([...chatMessages, { text: chatInput }]);
                          setChatInput('');
                        }
                      }}
                      className="text-[#FF00FF] hover:text-[#FF9933] transition-colors p-2 bg-[#FF00FF]/10 rounded-full"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative mb-4">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" placeholder="Search messages..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#FF00FF] transition-colors" />
                  </div>
                  {[
                    { name: 'Aisha_VR', msg: 'Hey, did you see the new update?', time: '2m ago' },
                    { name: 'TechGuru', msg: 'Sent an attachment', time: '1h ago' },
                    { name: 'Rahul.Holo', msg: 'Let\'s catch up later.', time: 'Yesterday' }
                  ].map((m, i) => (
                    <div key={i} onClick={() => { setActiveChat(m); setChatMessages([]); }} className="flex items-center space-x-4 p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors group">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#138808] to-[#FF00FF] p-[2px] group-hover:scale-105 transition-transform">
                         <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-xs font-bold">{m.name.charAt(0)}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-bold group-hover:text-[#FF00FF] transition-colors">{m.name}</h4>
                          <span className="text-[10px] text-gray-500 uppercase tracking-wider">{m.time}</span>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-1">{m.msg}</p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {/* Notifications Tab */}
          {currentTab === 'Notifications' && (
            <div className="space-y-4">
              {[
                { text: 'Aisha_VR liked your post.', time: '10m ago', icon: Heart, color: 'text-red-500' },
                { text: 'TechGuru started following you.', time: '2h ago', icon: User, color: 'text-blue-500' },
                { text: 'New login from Neon Delhi.', time: '1d ago', icon: AlertTriangle, color: 'text-yellow-500' }
              ].map((n, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 border-b border-white/10">
                  <div className={`p-2 rounded-full bg-white/5 ${n.color}`}>
                    <n.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{n.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Create Post Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#1a1a1a] border border-white/20 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col relative">
            
            {/* Music Selection Sub-Modal */}
            {isMusicModalOpen && (
               <div className="absolute inset-0 bg-[#1a1a1a] z-20 flex flex-col animate-in slide-in-from-bottom-4 duration-200">
                 <div className="flex items-center p-4 border-b border-white/10">
                   <button onClick={() => setIsMusicModalOpen(false)} className="text-gray-400 hover:text-white mr-4"><ArrowLeft size={24} /></button>
                   <h3 className="font-semibold text-lg flex-1 text-center">Add Music</h3>
                   <div className="w-6"></div>
                 </div>
                 <div className="p-4">
                   <div className="relative mb-4">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                     <input type="text" placeholder="Search music..." className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#FF00FF]" />
                   </div>
                   <div className="space-y-2 overflow-y-auto max-h-[300px] hide-scrollbar">
                     {musicOptions.map(track => (
                       <div key={track.id} onClick={() => { setSelectedMusic(track); setIsMusicModalOpen(false); }} className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-[#FF00FF]/30">
                         <div className="flex items-center">
                           <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#138808] via-[#FF9933] to-[#FF00FF] p-[1px] mr-3">
                             <div className="w-full h-full bg-black rounded-lg flex items-center justify-center"><Music size={16} className="text-white" /></div>
                           </div>
                           <div>
                             <p className="text-sm font-medium text-white">{track.title}</p>
                             <p className="text-xs text-gray-400">{track.artist}</p>
                           </div>
                         </div>
                         <span className="text-xs text-gray-500">{track.duration}</span>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
            )}
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-semibold text-lg">Create New Post</h3>
              <button 
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setNewPostCaption('');
                  setSelectedMedia(null);
                  setSelectedMusic(null);
                }}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6">
              <label className="w-full h-48 bg-black/50 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center mb-6 hover:bg-white/5 transition-colors cursor-pointer group relative overflow-hidden">
                 <input type="file" className="hidden" accept="video/*,image/*" onChange={(e) => {
                   if (e.target.files && e.target.files[0]) {
                     const file = e.target.files[0];
                     setSelectedMedia({
                       file: file,
                       url: URL.createObjectURL(file),
                       type: file.type.startsWith('video/') ? 'video' : 'image'
                     });
                   }
                 }} />
                 {selectedMedia ? (
                    selectedMedia.type === 'video' ? (
                      <video src={selectedMedia.url} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                    ) : (
                      <img src={selectedMedia.url} className="w-full h-full object-cover" alt="Preview" />
                    )
                 ) : (
                    <>
                      <ImageIcon size={48} className="text-gray-500 mb-2 group-hover:text-gray-400 transition-colors" />
                      <span className="text-sm text-gray-400 group-hover:text-gray-300">Click to upload video or image</span>
                    </>
                 )}
              </label>
              
              <textarea 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF00FF] transition-colors resize-none mb-4"
                rows="3"
                placeholder="Write a caption for your post..."
                value={newPostCaption}
                onChange={(e) => setNewPostCaption(e.target.value)}
              ></textarea>

              {/* Music Selection */}
              <div className="mb-6">
                {!selectedMusic ? (
                  <button 
                    onClick={() => setIsMusicModalOpen(true)}
                    className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 text-gray-300 flex items-center justify-center transition-colors"
                  >
                    <Music size={18} className="mr-2 text-[#FF00FF]" /> Add Music
                  </button>
                ) : (
                  <div className="w-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-[#FF00FF]/30 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <Music size={18} className="mr-3 text-[#FF00FF] animate-pulse" />
                      <div>
                        <p className="text-sm text-white font-medium">{selectedMusic.title}</p>
                        <p className="text-xs text-gray-400">{selectedMusic.artist}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedMusic(null)} className="text-gray-400 hover:text-white p-1 bg-black/20 rounded-full hover:bg-black/40 transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              <button 
                onClick={handlePostSubmit}
                disabled={!newPostCaption.trim() && !selectedMedia}
                className={`w-full py-3 rounded-xl font-bold transition-all ${!newPostCaption.trim() && !selectedMedia ? 'bg-white/10 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-[#FF9933] to-[#FF00FF] hover:opacity-90 text-white shadow-lg shadow-purple-500/20'}`}
              >
                Post Video / Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
