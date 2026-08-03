import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ArrowLeft, Search, Bell, Video, Menu, X, Home, Flame, PlaySquare, Gamepad2, GraduationCap, LayoutDashboard, CheckCircle2, ThumbsUp, ThumbsDown, MessageSquare, Mic, MoreVertical, Share2, Download, Scissors, Eye, TrendingUp, Sparkles, Languages, Users, ShoppingBag, Maximize, BrainCircuit, Box, ShieldCheck, User, Settings, LogOut, Clock, ListPlus, AudioWaveform, Globe, Play, Pause, SkipForward, Volume2, VolumeX, Subtitles, MonitorPlay, RectangleHorizontal, Minimize, ToggleRight, ToggleLeft, ChevronRight, ChevronUp, ChevronDown, Lock, RotateCw } from 'lucide-react';
import PlayTubeLogo from './PlayTubeLogo';

const mockVideos = [
  { id: 1, title: 'Exploring the Metaverse: India 2050', thumbnail: 'https://images.unsplash.com/photo-1614729939124-03290b5509ce?q=80&w=2069&auto=format&fit=crop', channel: 'TechWorld', views: '1.2M', time: '2 hours ago', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop', summary: ['Neural-interface gaming integration', 'Hyper-realistic VR marketplaces', 'Decentralized digital identities'] },
  { id: 2, title: 'Epic BGMI Tournament Highlights', thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop', channel: 'GamerX', views: '850K', time: '5 hours ago', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop', isGaming: true, isDualStream: true, summary: ['Final clutch 1v4 moment', 'New weapon meta analysis', 'Interview with MVP'] },
  { id: 3, title: 'Quantum Physics Explained in Hindi', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop', channel: 'EduNation', views: '430K', time: '1 day ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', isEducation: true, summary: ['Schrödinger\'s cat paradox', 'Quantum entanglement basics', 'Future of quantum computing in India'] },
  { id: 4, title: 'Neon Cyberpunk City Tour', thumbnail: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop', channel: 'VisualsIN', views: '2.1M', time: '3 days ago', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop', summary: ['Walkthrough of Sector 7', 'Holographic billboard displays', 'Flying auto-rickshaw concepts'] },
  { id: 5, title: 'Advanced Robotics Engineering', thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop', channel: 'TechWorld', views: '95K', time: '6 hours ago', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop', isEducation: true, summary: ['Bipedal robot stabilization', 'AI integration in manufacturing', 'Open-source robotics kits'] },
  { id: 6, title: 'Valorant Clutch Moments - LIVE', thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2165&auto=format&fit=crop', channel: 'EsportsIND', views: '1.5M', time: 'LIVE', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop', isGaming: true, isLive: true, summary: ['Live Grand Finals', 'South Asia Championship', 'Map 3: Ascent'] },
  { id: 7, title: 'Building the Future: ISRO 2.0', thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop', channel: 'SpaceIndia', views: '3.4M', time: '1 week ago', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop', summary: ['Gaganyaan mission updates', 'Next-gen launch vehicles', 'Lunar base plans'] },
  { id: 8, title: 'Street Food in 2030: Neon Markets LIVE', thumbnail: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop', channel: 'FoodieTech', views: '720K', time: 'LIVE', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', isLive: true, summary: ['Live from Cyber-Chowk', 'Trying synthetic spices', '3D printed momos'] },
];

const mockShorts = [
  { id: 1, title: 'Neon UI Design Tips', views: '1M', thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop' },
  { id: 2, title: 'Cyberpunk PC Build', views: '2.5M', thumbnail: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop' },
  { id: 3, title: 'Delhi in 2050 AI Art', views: '800K', thumbnail: 'https://images.unsplash.com/photo-1555448248-2571daf6344b?q=80&w=1000&auto=format&fit=crop' },
  { id: 4, title: 'Quick Math Trick', views: '5M', thumbnail: 'https://images.unsplash.com/photo-1632516643720-e7f0d7e6a739?q=80&w=1000&auto=format&fit=crop' },
  { id: 5, title: 'BGMI 1v4 Clutch', views: '3.2M', thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1000&auto=format&fit=crop' },
];

export default function PlayTube({ onBack }) {
  const [dbVideos, setDbVideos] = useState([]);
  const videoRef = useRef(null);
  const [activeTab, setActiveTab] = useState('Home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [creationMode, setCreationMode] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showDigiLockerModal, setShowDigiLockerModal] = useState(false);
  const [pipVideo, setPipVideo] = useState(null);
  const [summaryVideo, setSummaryVideo] = useState(null);
  const [tubeLanguage, setTubeLanguage] = useState('English');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Normal');
  const [videoSpeed, setVideoSpeed] = useState('1x');
  const [videoQuality, setVideoQuality] = useState('1080p');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [bellActive, setBellActive] = useState(false);
  const [uploadVisibility, setUploadVisibility] = useState('Public');
  const [studioTab, setStudioTab] = useState('Dashboard');
  const [isPremium, setIsPremium] = useState(false);
  const [showPremiumToast, setShowPremiumToast] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL || ''}/api/videos`);
        if (res.data && res.data.length > 0) {
          setDbVideos(res.data);
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.play().catch(e => console.log('Autoplay blocked'));
      else videoRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const translate = (text) => {
    if (tubeLanguage === 'English') return text;
    if (tubeLanguage === 'Hindi') {
      const dict = {
        'Home': 'मुख्य पृष्ठ',
        'Subscriptions': 'सदस्यताएं',
        'Music': 'संगीत',
        'Gaming': 'गेमिंग',
        'Education': 'शिक्षा',
        'Shopping': 'खरीदारी',
        'Trending': 'ट्रेंडिंग',
        'Dashboard': 'डैशबोर्ड',
        'Play Shorts': 'प्ले शॉर्ट्स',
        'All': 'सभी',
        'Mixes': 'मिक्स',
        'Live': 'लाइव',
        'Music': 'संगीत',
        'News': 'समाचार',
        'Space': 'अंतरिक्ष',
        'Podcasts': 'पॉडकास्ट',
        'Regional Trends': 'क्षेत्रीय रुझान',
        'Computer Programming': 'प्रोग्रामिंग',
        'Recently Uploaded': 'हाल ही में अपलोड'
      };
      return dict[text] || text;
    }
    return `${text}`; 
  };

  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'Play Shorts', icon: AudioWaveform },
    { name: 'Subscriptions', icon: PlaySquare },
    { name: 'Music', icon: Volume2 },
    { name: 'Gaming', icon: Gamepad2 },
    { name: 'Education', icon: GraduationCap },
    { name: 'Shopping', icon: ShoppingBag },
    { name: 'Trending', icon: TrendingUp },
    { name: 'Dashboard', icon: LayoutDashboard },
  ];

  const getFilteredVideos = () => {
    let videos = dbVideos.length > 0 ? dbVideos : mockVideos;
    
    if (activeTab === 'Gaming') videos = videos.filter(v => v.isGaming);
    else if (activeTab === 'Education') videos = videos.filter(v => v.isEducation);
    else if (activeTab === 'Subscriptions') videos = videos.filter(v => ['TechWorld', 'GamerX', 'SpaceIndia'].includes(v.channel));
    
    if (activeCategory === 'Live') videos = videos.filter(v => v.isLive);
    else if (activeCategory === 'Space') videos = videos.filter(v => v.channel === 'SpaceIndia' || v.title.includes('ISRO'));
    else if (activeCategory === 'Regional Trends') videos = videos.filter(v => v.title.includes('Hindi') || v.title.includes('Delhi'));
    else if (activeCategory === 'Computer Programming') videos = videos.filter(v => v.isEducation || v.channel === 'TechWorld');
    else if (activeCategory !== 'All' && activeCategory !== 'Mixes' && activeCategory !== 'Recently Uploaded') {
        videos = videos.slice(0, 2); 
    }
    
    return videos;
  };

  const handleUpload = async () => {
    if (!uploadFile) {
      alert("Please select a video file first");
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append('video', uploadFile);
    formData.append('title', uploadTitle || 'Untitled Video');
    formData.append('description', uploadDescription);
    formData.append('category', activeCategory !== 'All' ? activeCategory : 'General');
    formData.append('isShort', creationMode === 'short');
    formData.append('channelName', 'My Channel');
    formData.append('music', selectedMusic);
    formData.append('filter', selectedFilter);
    formData.append('speed', videoSpeed);
    formData.append('quality', videoQuality);
    formData.append('visibility', uploadVisibility);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL || ''}/api/videos/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-user-id': 'current_user'
        }
      });
      alert('Video uploaded successfully!');
      
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL || ''}/api/videos`);
      if (res.data && res.data.length > 0) {
        setDbVideos(res.data);
      }
      
      setCreationMode(null);
      setUploadFile(null);
      setUploadTitle('');
      setUploadDescription('');
      setSelectedMusic('');
      setSelectedFilter('Normal');
      setVideoSpeed('1x');
      setVideoQuality('1080p');
      setUploadVisibility('Public');
    } catch (err) {
      console.error('Upload failed', err);
      alert('Failed to upload video');
    } finally {
      setIsUploading(false);
    }
  };

  const renderCreationStudio = () => {
    return (
      <div className="flex flex-col w-full h-[calc(100vh-4rem)] p-4 md:p-6 animate-in fade-in zoom-in duration-500">
        <div className="flex items-center justify-between mb-6 shrink-0">
          <div className="flex items-center">
            <button 
              onClick={() => setCreationMode(null)} 
              className="mr-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center">
              {creationMode === 'ai' ? <BrainCircuit className="mr-2 text-blue-400" /> : <Video className="mr-2 text-[#FF9933]" />}
              {creationMode === 'short' ? 'Play Shorts Studio' : creationMode === 'long' ? 'Cinematic Studio 8K' : 'AI Video Generator'}
            </h2>
          </div>
          <button 
            className="px-6 py-2 bg-gradient-to-r from-[#FF0000] to-[#FF9933] rounded-full font-bold text-white shadow-[0_0_15px_rgba(255,153,51,0.4)] hover:opacity-90 transition-opacity disabled:opacity-50"
            onClick={creationMode === 'ai' ? () => {
              alert('Video rendering and publishing to GlobalNet ecosystem...');
              setCreationMode(null);
            } : handleUpload}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Publish'}
          </button>
        </div>

        <div className="flex-1 bg-black/60 border border-white/10 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center">
          {creationMode === 'live' ? (
             <div className="w-full max-w-4xl p-6 md:p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md relative overflow-y-auto max-h-[70vh] hide-scrollbar">
               <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                 <h3 className="text-2xl font-bold text-white flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></span> Live Control Room</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="md:col-span-2 space-y-6">
                   <div className="bg-black/50 border border-white/10 rounded-xl p-4">
                     <h4 className="text-white font-medium mb-3">Stream Setup</h4>
                     <label className="block text-gray-400 text-xs mb-1">Stream Key (Keep this secret)</label>
                     <div className="flex">
                       <input type="password" value="live_123456789_abcdefghijklmnop" readOnly className="flex-1 bg-black/80 border border-white/10 rounded-l-lg p-2 text-white font-mono text-sm outline-none" />
                       <button className="bg-white/10 border border-l-0 border-white/10 rounded-r-lg px-4 text-sm font-medium hover:bg-white/20 transition-colors">Copy</button>
                     </div>
                     <label className="block text-gray-400 text-xs mb-1 mt-4">Stream URL</label>
                     <div className="flex">
                       <input type="text" value="rtmp://a.rtmp.playtube.com/live2" readOnly className="flex-1 bg-black/80 border border-white/10 rounded-l-lg p-2 text-white font-mono text-sm outline-none" />
                       <button className="bg-white/10 border border-l-0 border-white/10 rounded-r-lg px-4 text-sm font-medium hover:bg-white/20 transition-colors">Copy</button>
                     </div>
                   </div>
                   <div className="bg-black/50 border border-white/10 rounded-xl p-4">
                     <h4 className="text-white font-medium mb-3">Stream Details</h4>
                     <input type="text" placeholder="Live Stream Title" className="w-full bg-white/5 border border-white/10 rounded-lg p-2 mb-3 text-white text-sm outline-none focus:border-red-500/50" />
                     <textarea placeholder="Tell viewers about your stream..." className="w-full h-20 bg-white/5 border border-white/10 rounded-lg p-2 text-white text-sm outline-none focus:border-red-500/50 resize-none"></textarea>
                   </div>
                 </div>
                 <div className="space-y-6">
                   <div className="bg-black/50 border border-white/10 rounded-xl p-4 h-full flex flex-col">
                     <h4 className="text-white font-medium mb-3 flex items-center justify-between">Live Chat <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-gray-400">Enabled</span></h4>
                     <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 min-h-[200px] flex items-center justify-center text-gray-500 text-sm text-center">
                       Waiting for stream to begin...<br/>Chat will appear here.
                     </div>
                   </div>
                 </div>
               </div>
               <div className="mt-6 flex justify-end">
                 <button onClick={() => alert('Starting live stream...')} className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all">Go Live Now</button>
               </div>
             </div>
          ) : creationMode === 'ai' ? (
             <div className="w-full max-w-3xl p-6 md:p-10 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <h3 className="text-xl font-bold text-white mb-2 relative z-10">Prompt your imagination</h3>
               <p className="text-gray-400 text-sm mb-6 relative z-10">Use GlobalNet's Sora-equivalent AI to generate hyper-realistic sequences.</p>
               <textarea 
                 className="w-full h-40 bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500/50 resize-none mb-6 relative z-10"
                 placeholder="E.g., A cinematic flythrough of a futuristic cyber-punk Mumbai in 2050 with neon tricolor lights, flying auto-rickshaws, and holographic billboards in 8K resolution..."
               ></textarea>
               <button 
                 onClick={() => alert('Generating AI Video... This might take a few moments.')}
                 className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:opacity-90 transition-opacity flex justify-center items-center relative z-10"
               >
                 <Sparkles className="mr-2" size={20} />
                 Generate Video
               </button>
             </div>
          ) : (
             <div className="w-full max-w-4xl p-6 md:p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md relative overflow-y-auto max-h-[70vh] hide-scrollbar">
               <h3 className="text-xl font-bold text-white mb-6 text-center">Upload Video File</h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 <div className="space-y-4">
                   <div>
                     <label className="block text-gray-300 text-sm font-medium mb-2">Video Title</label>
                     <input 
                       type="text" 
                       value={uploadTitle}
                       onChange={(e) => setUploadTitle(e.target.value)}
                       placeholder="Enter video title" 
                       className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#FF9933]/50 transition-colors"
                     />
                   </div>
                   <div>
                     <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
                     <textarea 
                       value={uploadDescription}
                       onChange={(e) => setUploadDescription(e.target.value)}
                       placeholder="Describe your video" 
                       className="w-full h-24 bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#FF9933]/50 resize-none transition-colors"
                     />
                   </div>
                 </div>

                 <div className="flex flex-col">
                   <label className="block text-gray-300 text-sm font-medium mb-2">Media File</label>
                   <div className="flex-1 w-full flex items-center justify-center bg-black/40 border-2 border-dashed border-white/20 rounded-xl p-6 hover:border-[#FF9933]/50 transition-colors cursor-pointer relative min-h-[160px]">
                     <input 
                       type="file" 
                       accept="video/*" 
                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                       onChange={(e) => {
                         if (e.target.files && e.target.files[0]) {
                           setUploadFile(e.target.files[0]);
                           if (!uploadTitle) {
                             setUploadTitle(e.target.files[0].name.split('.')[0]);
                           }
                         }
                       }}
                     />
                     <div className="flex flex-col items-center pointer-events-none text-center">
                       <Video size={36} className="text-[#FF9933] mb-3" />
                       <p className="text-white font-medium text-sm">
                         {uploadFile ? uploadFile.name : 'Select a video file to upload'}
                       </p>
                       <p className="text-gray-500 text-xs mt-1">MP4, WebM, or OGG up to 2GB</p>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Advanced Upload Settings */}
               <h4 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Advanced Features</h4>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {/* Music Selection */}
                 <div className="bg-black/30 border border-white/5 rounded-xl p-3">
                   <label className="flex items-center text-gray-300 text-xs font-medium mb-2"><AudioWaveform size={14} className="mr-1.5 text-blue-400" /> Background Music</label>
                   <select 
                     value={selectedMusic} 
                     onChange={(e) => setSelectedMusic(e.target.value)}
                     className="w-full bg-black/60 border border-white/10 rounded text-sm text-white p-2 focus:outline-none focus:border-blue-400"
                   >
                     <option value="">None (Original Audio)</option>
                     <option value="cyberpunk">Cyberpunk Neon Drift</option>
                     <option value="lofi">Lo-Fi Chill (Desi Edit)</option>
                     <option value="bass">Trending Bass Drops</option>
                     <option value="delhi">Delhi 2050 Theme</option>
                   </select>
                 </div>

                 {/* Filters */}
                 <div className="bg-black/30 border border-white/5 rounded-xl p-3">
                   <label className="flex items-center text-gray-300 text-xs font-medium mb-2"><Sparkles size={14} className="mr-1.5 text-purple-400" /> Video Filter</label>
                   <select 
                     value={selectedFilter} 
                     onChange={(e) => setSelectedFilter(e.target.value)}
                     className="w-full bg-black/60 border border-white/10 rounded text-sm text-white p-2 focus:outline-none focus:border-purple-400"
                   >
                     <option value="Normal">Normal</option>
                     <option value="Cyberpunk">Cyberpunk (Neon)</option>
                     <option value="Cinematic">Cinematic 2050</option>
                     <option value="BW">Noir (B&W)</option>
                     <option value="Vintage">Vintage Bharat</option>
                   </select>
                 </div>

                 {/* Video Speed */}
                 <div className="bg-black/30 border border-white/5 rounded-xl p-3">
                   <label className="flex items-center text-gray-300 text-xs font-medium mb-2"><Clock size={14} className="mr-1.5 text-emerald-400" /> Playback Speed</label>
                   <select 
                     value={videoSpeed} 
                     onChange={(e) => setVideoSpeed(e.target.value)}
                     className="w-full bg-black/60 border border-white/10 rounded text-sm text-white p-2 focus:outline-none focus:border-emerald-400"
                   >
                     <option value="0.5x">0.5x (Slow-Mo)</option>
                     <option value="1x">1x (Normal)</option>
                     <option value="1.5x">1.5x (Fast)</option>
                     <option value="2x">2x (Time-Lapse)</option>
                   </select>
                 </div>

                 {/* Video Quality */}
                 <div className="bg-black/30 border border-white/5 rounded-xl p-3">
                   <label className="flex items-center text-gray-300 text-xs font-medium mb-2"><MonitorPlay size={14} className="mr-1.5 text-red-400" /> Video Quality</label>
                   <select 
                     value={videoQuality} 
                     onChange={(e) => setVideoQuality(e.target.value)}
                     className="w-full bg-black/60 border border-white/10 rounded text-sm text-white p-2 focus:outline-none focus:border-red-400"
                   >
                     <option value="720p">720p (HD)</option>
                     <option value="1080p">1080p (FHD)</option>
                     <option value="1440p">1440p (2K)</option>
                     <option value="2160p">2160p (4K Ultra)</option>
                     <option value="4320p">4320p (8K Cinematic)</option>
                   </select>
                 </div>

                 {/* Visibility / Scheduling */}
                 <div className="bg-black/30 border border-white/5 rounded-xl p-3 md:col-span-4">
                   <label className="flex items-center text-gray-300 text-xs font-medium mb-2"><Globe size={14} className="mr-1.5 text-blue-300" /> Visibility & Scheduling</label>
                   <div className="flex space-x-4">
                     <select 
                       value={uploadVisibility} 
                       onChange={(e) => setUploadVisibility(e.target.value)}
                       className="flex-1 bg-black/60 border border-white/10 rounded text-sm text-white p-2 focus:outline-none focus:border-blue-300"
                     >
                       <option value="Public">Public (Everyone can see)</option>
                       <option value="Unlisted">Unlisted (Only people with link)</option>
                       <option value="Private">Private (Only you can see)</option>
                       <option value="Scheduled">Scheduled (Publish later)</option>
                     </select>
                     {uploadVisibility === 'Scheduled' && (
                       <input type="datetime-local" className="flex-1 bg-black/60 border border-white/10 rounded text-sm text-white p-2 focus:outline-none focus:border-blue-300" />
                     )}
                   </div>
                 </div>
               </div>
             </div>
          )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    
    if (selectedVideo) {
      return (
        <div className="flex flex-col lg:flex-row p-4 md:p-6 gap-6 w-full animate-in fade-in duration-300">
          <div className="flex-1 relative">
            {}
            <div className="absolute inset-0 bg-[#FF9933]/10 blur-[100px] rounded-full pointer-events-none animate-pulse"></div>
            
            <div 
              className={`w-full ${isTheaterMode ? 'aspect-[21/9]' : 'aspect-video'} bg-black rounded-2xl overflow-hidden relative shadow-[0_0_50px_rgba(255,153,51,0.2)] border border-white/10 group z-10 ${selectedVideo.isDualStream ? 'flex' : ''} transition-all duration-500`}
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              {selectedVideo.isDualStream ? (
                <>
                  <div className="flex-1 relative border-r border-white/20">
                    <img src={selectedVideo.thumbnail} alt={selectedVideo.title} className="w-full h-full object-cover opacity-60" />
                    <div className="absolute bottom-16 left-2 bg-black/60 backdrop-blur text-xs px-2 py-1 rounded text-white font-bold">Player 1: {selectedVideo.channel}</div>
                  </div>
                  <div className="flex-1 relative">
                    <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" style={{filter: 'hue-rotate(90deg)'}} alt="Player 2" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute bottom-16 left-2 bg-black/60 backdrop-blur text-xs px-2 py-1 rounded text-white font-bold">Player 2: Enemy POV</div>
                  </div>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] tracking-widest font-bold px-3 py-1 rounded-full animate-pulse z-20 shadow-[0_0_10px_red] transition-opacity duration-300">DUAL VIEW</div>
                </>
              ) : selectedVideo.videoUrl && !selectedVideo.videoUrl.startsWith('http') ? (
                <video 
                  ref={videoRef}
                  src={`${import.meta.env.VITE_BACKEND_URL || ''}/api/videos/stream/${selectedVideo._id}`} 
                  className="w-full h-full object-cover" 
                  autoPlay={autoPlay}
                  onEnded={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              ) : (
                <img src={selectedVideo.thumbnailUrl || selectedVideo.thumbnail} alt={selectedVideo.title} className="w-full h-full object-cover opacity-80 transition-transform duration-700" />
              )}
              
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none group-hover:pointer-events-auto">
                  <button 
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-[#FF9933]/70 hover:scale-110 transition-all border border-white/20 shadow-[0_0_30px_rgba(255,153,51,0.4)] pointer-events-auto"
                  >
                    <Play size={40} className="text-white ml-2" fill="currentColor" />
                  </button>
                </div>
              )}
              
              <div className={`absolute top-4 right-4 flex space-x-3 transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                <button className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-white/20 text-xs font-bold text-white flex items-center hover:bg-[#138808]/80 transition-colors">
                  <Maximize size={14} className="mr-1.5" /> VR/360 Mode
                </button>
                <button className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-[#FF0000]/50 text-xs font-bold text-white flex items-center shadow-[0_0_10px_rgba(255,0,0,0.5)]">
                  <span className="w-2 h-2 bg-[#FF0000] rounded-full mr-2 animate-pulse"></span> Live Squad
                </button>
              </div>

              <div className={`absolute bottom-0 left-0 right-0 pt-16 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 z-20 flex flex-col px-4 pb-2 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                
                <div className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer relative group/progress hover:h-1.5 transition-all">
                  <div className="absolute top-0 left-0 h-full bg-white/40 w-1/2 rounded-full pointer-events-none"></div>
                  <div className="absolute top-0 left-0 h-full bg-[#FF0000] w-1/3 rounded-full relative pointer-events-none">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#FF0000] rounded-full shadow-[0_0_10px_#FF0000] opacity-0 group-hover/progress:opacity-100 transition-opacity pointer-events-auto cursor-pointer scale-150"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-[#FF9933] transition-colors focus:outline-none cursor-pointer">
                      {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
                    </button>
                    <button className="text-white hover:text-white transition-colors focus:outline-none cursor-pointer">
                      <SkipForward size={20} fill="currentColor" />
                    </button>
                    
                    <div className="flex items-center group/volume cursor-pointer">
                      <button onClick={() => setIsMuted(!isMuted)} className="text-white hover:text-white transition-colors focus:outline-none mr-2">
                        {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </button>
                      <div className="w-0 overflow-hidden group-hover/volume:w-16 transition-all duration-300 ease-in-out flex items-center">
                        <input 
                          type="range" 
                          min="0" max="100" 
                          value={isMuted ? 0 : volume}
                          onChange={(e) => { setVolume(e.target.value); setIsMuted(e.target.value === '0'); }}
                          className="w-full h-1 bg-white/30 rounded-full appearance-none outline-none accent-white cursor-pointer" 
                        />
                      </div>
                    </div>

                    <div className="text-xs text-white/90 font-medium font-mono">
                      01:10 / 03:16
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 mr-2 cursor-pointer" onClick={() => setAutoPlay(!autoPlay)}>
                      <span className="text-xs text-white/70 font-medium hidden md:block">Auto-play</span>
                      <button className={`transition-colors ${autoPlay ? 'text-white' : 'text-gray-500'}`}>
                        {autoPlay ? <ToggleRight size={28} className="text-white" /> : <ToggleLeft size={28} />}
                      </button>
                    </div>

                    <button className="text-white hover:text-white transition-colors cursor-pointer" title="Subtitles/closed captions (c)">
                      <Subtitles size={20} />
                    </button>
                    
                    <div className="relative">
                      <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="text-white hover:text-white transition-colors rotate-0 hover:rotate-45 duration-300 cursor-pointer" title="Settings">
                        <Settings size={20} />
                      </button>
                      
                      {isSettingsOpen && (
                        <div className="absolute bottom-full right-0 mb-4 w-72 bg-black/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden z-[100] animate-in fade-in slide-in-from-bottom-2 duration-200" onClick={(e) => e.stopPropagation()}>
                          <div className="py-2 flex flex-col">
                            <button className="flex items-center justify-between px-4 py-3 hover:bg-white/10 transition-colors w-full text-sm">
                              <div className="flex items-center text-white font-medium"><MessageSquare size={18} className="mr-4 text-gray-300" /> Annotations</div>
                              <div className="w-10 h-5 bg-[#FF0000] rounded-full relative"><div className="w-5 h-5 bg-white rounded-full absolute right-0 shadow-sm border border-gray-400"></div></div>
                            </button>
                            <div className="w-full border-t border-white/10 my-1"></div>
                            <button className="flex items-center justify-between px-4 py-3 hover:bg-white/10 transition-colors w-full text-sm group/setting">
                              <div className="flex items-center text-white font-medium"><Subtitles size={18} className="mr-4 text-gray-300" /> Subtitles/CC</div>
                              <div className="flex items-center text-gray-300">Off <ChevronRight size={16} className="ml-1 opacity-70 group-hover/setting:text-white" /></div>
                            </button>
                            <button className="flex items-center justify-between px-4 py-3 hover:bg-white/10 transition-colors w-full text-sm group/setting" onClick={() => alert('Speed settings: 0.25x, 0.5x, Normal, 1.25x, 1.5x, 2x')}>
                              <div className="flex items-center text-white font-medium"><PlaySquare size={18} className="mr-4 text-gray-300" /> Playback speed</div>
                              <div className="flex items-center text-gray-300">Normal <ChevronRight size={16} className="ml-1 opacity-70 group-hover/setting:text-white" /></div>
                            </button>
                            <button className="flex items-center justify-between px-4 py-3 hover:bg-white/10 transition-colors w-full text-sm group/setting" onClick={() => alert('Quality settings: 144p, 360p, 480p, 720p, 1080p, 4K')}>
                              <div className="flex items-center text-white font-medium"><Settings size={18} className="mr-4 text-gray-300" /> Quality</div>
                              <div className="flex items-center text-gray-300">Auto (1080p) <ChevronRight size={16} className="ml-1 opacity-70 group-hover/setting:text-white" /></div>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <button className="text-white hover:text-white transition-colors cursor-pointer" title="Miniplayer (i)">
                      <MonitorPlay size={20} />
                    </button>
                    <button onClick={() => setIsTheaterMode(!isTheaterMode)} className="text-white hover:text-white transition-colors hidden md:block cursor-pointer" title="Theater mode (t)">
                      <RectangleHorizontal size={20} />
                    </button>
                    <button onClick={() => setIsFullscreen(!isFullscreen)} className="text-white hover:text-white transition-colors cursor-pointer" title="Full screen (f)">
                      {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h1>
              </div>

              <div className="flex flex-wrap gap-2 md:gap-3 mt-3 md:mt-0">
                <div className="flex items-center bg-white/10 rounded-full">
                  <button className="flex items-center px-4 py-2 hover:bg-white/20 rounded-l-full transition-colors text-sm font-medium border-r border-white/10">
                    <ThumbsUp size={18} className="mr-2" /> 125K
                  </button>
                  <button className="flex items-center px-4 py-2 hover:bg-white/20 rounded-r-full transition-colors text-sm font-medium">
                    <ThumbsDown size={18} />
                  </button>
                </div>
                <button className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-sm font-medium">
                  <Share2 size={18} className="mr-2" /> Share
                </button>
                <button className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-sm font-medium text-[#FF9933]">
                  <span className="font-bold mr-1">$</span> Thanks
                </button>
                <button className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-sm font-medium hidden sm:flex">
                  <ListPlus size={18} className="mr-2" /> Save
                </button>
                <button className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-sm font-medium hidden md:flex">
                  <Scissors size={18} className="mr-2" /> Clip
                </button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <img src={selectedVideo.avatar} className="w-12 h-12 rounded-full border-2 border-[#FF9933]" alt="" />
                <div>
                  <h3 className="font-bold text-lg text-white flex items-center">{selectedVideo.channel} <CheckCircle2 size={16} className="ml-1 text-gray-400" /></h3>
                  <p className="text-sm text-gray-400">4.5M Subscribers</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {isSubscribed ? (
                  <>
                    <button 
                      onClick={() => setIsSubscribed(false)}
                      className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-all"
                    >
                      Subscribed
                    </button>
                    <button 
                      onClick={() => setBellActive(!bellActive)}
                      className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
                    >
                      <Bell size={20} className={bellActive ? 'text-[#FF9933] animate-pulse' : ''} />
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setIsSubscribed(true)}
                    className="px-6 py-2 bg-gradient-to-r from-[#FF0000] to-[#FF9933] hover:opacity-90 text-white font-bold rounded-full shadow-[0_0_15px_rgba(255,153,51,0.4)] transition-all"
                  >
                    Subscribe
                  </button>
                )}
              </div>
            </div>

            {/* YouTube-like Description Box */}
            <div className="mt-4 p-4 bg-white/5 hover:bg-white/10 transition-colors border border-white/5 rounded-2xl cursor-pointer">
              <div className="flex flex-wrap items-center text-sm font-bold text-white mb-2 gap-y-1">
                <span>{selectedVideo.views} views</span>
                <span className="mx-2 text-gray-500">•</span>
                <span>{selectedVideo.time}</span>
                <span className="mx-2 text-gray-500">•</span>
                <span className="text-[#FF9933] flex items-center"><Sparkles size={14} className="mr-1" /> #Trending1</span>
                <span className="ml-2 text-blue-400 font-normal">#GlobalNet #Technology</span>
              </div>
              <p className="text-sm text-gray-300 line-clamp-2">
                Join us as we explore the incredible advancements happening in the tech world. This video covers everything from neural interfaces to fully immersive VR environments. Don't forget to like and subscribe to {selectedVideo.channel}!
              </p>
              <button className="text-sm font-bold text-white mt-2">Show more</button>
            </div>

            {/* AI Smart Summary */}
            <div className="mt-4 p-5 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/30 rounded-2xl backdrop-blur-md">
              <h3 className="text-sm font-bold text-indigo-300 flex items-center mb-3">
                <BrainCircuit size={18} className="mr-2" /> AI Smart Summary
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                This video explores the advancements in metaverse technologies specifically tailored for the Indian demographic by 2050. Key topics include neural-interface gaming, hyper-realistic VR marketplaces, and decentralized digital identities. 
                <br/><br/>
                <span className="text-[#FF9933] font-medium cursor-pointer hover:underline">View interactive mind-map ➔</span>
              </p>
            </div>

            {/* YouTube-like Comments Section */}
            <div className="mt-8 mb-4">
              <div className="flex items-center mb-6">
                <h3 className="text-xl font-bold text-white mr-6">1,245 Comments</h3>
                <button className="flex items-center text-sm text-gray-300 hover:text-white font-medium">
                  <ListPlus size={18} className="mr-2" /> Sort by
                </button>
              </div>
              
              <div className="flex items-start gap-4 mb-8">
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" className="w-10 h-10 rounded-full mt-1 border border-white/20 object-cover" alt="" />
                <div className="flex-1">
                  <input type="text" placeholder="Add a comment..." className="w-full bg-transparent border-b border-white/20 pb-2 outline-none text-white focus:border-white transition-colors" />
                  <div className="flex justify-between items-center mt-3">
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400">
                      <MessageSquare size={18} />
                    </button>
                    <div className="space-x-3 flex">
                      <button className="px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-full transition-colors">Cancel</button>
                      <button className="px-4 py-2 text-sm font-medium bg-white/10 text-gray-400 rounded-full cursor-not-allowed">Comment</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { user: '@tech_guru', time: '2 hours ago', text: 'The VR marketplace concept looks insane! Can\'t wait to try it.', likes: '2.4K', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
                  { user: '@neha_sharma22', time: '5 hours ago', text: 'Proud to see Indian tech ecosystem evolving so rapidly. GlobalNet is the future! 🚀', likes: '842', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
                  { user: '@cyber_punk', time: '1 day ago', text: 'That hologram UI at 4:20 is exactly what we need right now.', likes: '1.1K', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop' }
                ].map((comment, i) => (
                  <div key={i} className="flex gap-4">
                    <img src={comment.avatar} className="w-10 h-10 rounded-full border border-white/10 object-cover" alt="" />
                    <div>
                      <div className="flex items-center text-sm mb-1">
                        <span className="font-bold text-white mr-2">{comment.user}</span>
                        <span className="text-gray-400 text-xs">{comment.time}</span>
                      </div>
                      <p className="text-sm text-gray-200 mb-2 leading-relaxed">{comment.text}</p>
                      <div className="flex items-center text-gray-400 text-sm gap-4">
                        <button className="flex items-center hover:text-white transition-colors"><ThumbsUp size={14} className="mr-1.5" /> {comment.likes}</button>
                        <button className="hover:text-white transition-colors"><ThumbsDown size={14} /></button>
                        <button className="hover:text-white transition-colors font-medium text-xs ml-2">Reply</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {}
          <div className="w-full lg:w-[360px] flex flex-col space-y-6">
            
            {}
            <div className="bg-white/5 border border-[#138808]/30 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden group hover:shadow-[0_0_20px_rgba(19,136,8,0.2)] transition-shadow">
              <div className="absolute inset-0 bg-gradient-to-br from-[#138808]/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center">
                  <div className="p-2 bg-[#138808]/30 rounded-lg text-[#4ade80] mr-3 shadow-[0_0_10px_rgba(19,136,8,0.5)]">
                    <Languages size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Live AI Dubbing</h3>
                    <p className="text-xs text-[#4ade80] font-medium animate-pulse">Real-time Lip Sync Active</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 relative z-10">
                {['Hindi', 'Tamil', 'Telugu', 'Bengali'].map((lang, idx) => (
                  <button key={idx} className={`py-2 text-sm font-medium rounded-lg border transition-all shadow-sm ${idx === 0 ? 'bg-gradient-to-r from-[#138808] to-emerald-500 border-transparent text-white shadow-[0_0_15px_rgba(19,136,8,0.4)]' : 'border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/30'}`}>
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-[#FF9933]/20 rounded-lg text-[#FF9933] mr-3">
                    <ShoppingBag size={20} />
                  </div>
                  <h3 className="font-bold text-white text-sm">Shop the Video</h3>
                </div>
                <span className="text-xs text-[#FF9933] font-medium">3 items found</span>
              </div>
              <div className="flex space-x-3 overflow-x-auto hide-scrollbar">
                {[1, 2].map(item => (
                  <div key={item} className="min-w-[120px] bg-black/40 rounded-xl p-2 border border-white/5 hover:border-[#FF9933]/50 cursor-pointer transition-colors">
                    <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop" className="w-full h-16 object-cover rounded-lg mb-2" alt="product" />
                    <p className="text-xs font-medium text-white truncate">Cyber Watch v2</p>
                    <p className="text-xs text-[#FF9933]">₹4,999</p>
                  </div>
                ))}
              </div>
            </div>

            {}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
               <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 mr-3">
                    <Users size={20} />
                  </div>
                  <h3 className="font-bold text-white text-sm">Watch Squad</h3>
                </div>
                <button className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded hover:bg-blue-500/30">Invite</button>
              </div>
              <div className="flex items-center space-x-2">
                {['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop'].map((img, i) => (
                  <div key={i} className="relative">
                    <img src={img} className="w-10 h-10 rounded-full border-2 border-black" alt="friend" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></span>
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-400 text-xs hover:border-white hover:text-white cursor-pointer transition-colors">
                  +
                </div>
              </div>
              <div className="mt-3 bg-black/40 rounded-lg p-2 flex items-center text-xs text-gray-400 border border-white/5">
                <Mic size={14} className="mr-2" /> Voice chat enabled in lobby
              </div>
            </div>

            {}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center">
                  <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400 mr-3 shadow-[0_0_15px_rgba(6,182,212,0.4)] animate-pulse">
                    <Box size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Holo-Cast 3D</h3>
                    <p className="text-xs text-gray-400">Room Projection</p>
                  </div>
                </div>
                <div className="w-10 h-5 bg-cyan-500/20 border border-cyan-500/50 rounded-full flex items-center p-0.5 cursor-pointer relative shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan] transform translate-x-5 transition-transform"></div>
                </div>
              </div>
              <div className="relative h-16 rounded-lg border border-cyan-500/30 bg-black/50 overflow-hidden flex items-center justify-center shadow-[inset_0_0_20px_rgba(6,182,212,0.2)] group-hover:border-cyan-400/50 transition-colors">
                <div className="absolute inset-0 opacity-50" style={{
                  backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.4) 1px, transparent 1px)',
                  backgroundSize: '10px 10px',
                  transform: 'perspective(100px) rotateX(60deg) scale(2)',
                  transformOrigin: 'bottom',
                  animation: 'moveGrid 2s linear infinite'
                }}></div>
                <div className="absolute bottom-0 w-1/2 h-1/2 bg-cyan-400/30 blur-xl rounded-full"></div>
                <p className="text-xs text-cyan-300 font-bold z-10 tracking-wider animate-pulse">PROJECTING...</p>
              </div>
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes moveGrid {
                  0% { background-position: 0 0; }
                  100% { background-position: 0 10px; }
                }
              `}} />
            </div>

            {}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400 mr-3">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="font-bold text-white text-sm">AI Truth-Lens</h3>
                </div>
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-wider rounded-md font-bold border border-emerald-500/30">Verified</span>
              </div>
              <div className="w-full bg-black/40 rounded-full h-1.5 mb-3 border border-white/5 overflow-hidden relative">
                <div className="bg-gradient-to-r from-emerald-500 to-green-400 h-1.5 rounded-full w-[99.9%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-[30%] -translate-x-full animate-[shimmer_2s_infinite]"></div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-400 mt-2">
                <div className="flex items-center"><CheckCircle2 size={12} className="text-emerald-500 mr-1" /> High Trust Score</div>
                <div className="flex items-center"><CheckCircle2 size={12} className="text-emerald-500 mr-1" /> No Deepfakes</div>
              </div>
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes shimmer {
                  100% { transform: translateX(350%); }
                }
              `}} />
            </div>

            {}
            <div>
              <h3 className="font-bold text-white text-sm mb-3">Up Next</h3>
              <div className="flex flex-col space-y-3">
                {mockVideos.slice(0, 4).map(v => (
                  <div key={v.id} className="flex gap-3 cursor-pointer group" onClick={() => setSelectedVideo(v)}>
                    <div className="w-32 h-20 rounded-lg overflow-hidden relative shrink-0">
                      <img src={v.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="" />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-sm font-medium text-white line-clamp-2 group-hover:text-[#FF9933] transition-colors">{v.title}</h4>
                      <span className="text-xs text-gray-400 mt-1">{v.channel}</span>
                      <span className="text-xs text-gray-500">{v.views} views</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      );
    }

    if (activeTab === 'Play Shorts') {
      return (
        <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden flex justify-center">
          <div id="shorts-scroll-container" className="flex flex-col items-center w-full h-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar py-4 scroll-smooth">
            {mockShorts.map(short => (
              <div key={short.id} className="relative w-full max-w-sm h-[calc(100vh-100px)] shrink-0 snap-center snap-always rounded-2xl overflow-hidden group shadow-[0_0_15px_rgba(255,153,51,0.2)] border border-white/10 bg-black my-4">
                <img src={short.thumbnail} alt={short.title} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>
                
                <div className="absolute bottom-6 left-4 right-16">
                  <h3 className="text-white font-bold text-lg leading-tight mb-2">{short.title}</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF0000] to-[#FF9933] p-[2px]">
                      <div className="w-full h-full bg-black rounded-full"></div>
                    </div>
                    <span className="text-white text-sm font-medium">@creator</span>
                  </div>
                </div>

                <div className="absolute right-4 bottom-6 flex flex-col space-y-6 items-center">
                  <button className="p-3 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-[#FF0000] transition-colors shadow-lg">
                    <ThumbsUp size={24} className="fill-current" />
                  </button>
                  <span className="text-white text-xs font-bold -mt-4">{short.views}</span>
                  
                  <button className="p-3 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-[#FF9933] transition-colors shadow-lg">
                    <MessageSquare size={24} />
                  </button>
                  <span className="text-white text-xs font-bold -mt-4">12K</span>
                  
                  <button className="p-3 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-white transition-colors shadow-lg">
                    <Share2 size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Navigation Buttons */}
          <div className="hidden sm:flex flex-col space-y-4 absolute right-8 md:right-16 top-1/2 -translate-y-1/2 z-10">
            <button 
              onClick={() => document.getElementById('shorts-scroll-container').scrollBy({ top: -(window.innerHeight * 0.8), behavior: 'smooth' })}
              className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all group"
            >
              <ChevronUp size={28} className="group-hover:-translate-y-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById('shorts-scroll-container').scrollBy({ top: (window.innerHeight * 0.8), behavior: 'smooth' })}
              className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all group"
            >
              <ChevronDown size={28} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      );
    }

    if (activeTab === 'Dashboard') {
      return (
        <div className="p-6 md:p-10 w-full animate-in fade-in zoom-in duration-500 flex flex-col min-h-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <span className="bg-gradient-to-r from-[#FF0000] to-[#FF9933] text-transparent bg-clip-text">Creator</span>
              <span className="ml-2">Studio</span>
            </h2>
          </div>

          <div className="flex space-x-6 border-b border-white/10 mb-8 overflow-x-auto hide-scrollbar shrink-0">
            {['Dashboard', 'Content', 'Analytics', 'Earn'].map(tab => (
              <button 
                key={tab}
                onClick={() => setStudioTab(tab)}
                className={`pb-3 text-sm font-bold transition-all ${studioTab === tab ? 'text-[#FF9933] border-b-2 border-[#FF9933]' : 'text-gray-400 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {studioTab === 'Dashboard' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                  { label: 'Subscribers', value: '1.2M', increase: '+15K', icon: User, color: 'from-blue-500 to-cyan-400' },
                  { label: 'Views (28 days)', value: '14.5M', increase: '+2.1M', icon: Eye, color: 'from-[#FF0000] to-pink-500' },
                  { label: 'Revenue', value: '₹4.2L', increase: '+12%', icon: TrendingUp, color: 'from-[#138808] to-emerald-400' }
                ].map((stat, idx) => (
                  <div key={idx} className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-xl group">
                    <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${stat.color} rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`}></div>
                    <div className="flex justify-between items-start relative z-10">
                      <div>
                        <p className="text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                      </div>
                      <div className={`p-3 rounded-xl bg-white/5 text-white shadow-lg`}>
                        <stat.icon size={24} />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-[#138808] font-medium relative z-10">
                      <TrendingUp size={16} className="mr-1" />
                      {stat.increase} vs last month
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold text-white mb-6">Recent Videos</h3>
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 text-sm">
                        <th className="p-4 font-medium">Video</th>
                        <th className="p-4 font-medium">Date</th>
                        <th className="p-4 font-medium">Views</th>
                        <th className="p-4 font-medium">Likes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockVideos.slice(0, 3).map((video) => (
                        <tr key={video.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 flex items-center space-x-4">
                            <img src={video.thumbnail} alt={video.title} className="w-24 h-14 object-cover rounded-md shadow-md" />
                            <div>
                              <p className="text-white font-medium line-clamp-1">{video.title}</p>
                              <span className="text-xs text-gray-500">Public</span>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-gray-300">{video.time}</td>
                          <td className="p-4 text-sm text-gray-300">{video.views}</td>
                          <td className="p-4 text-sm text-gray-300">98%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {studioTab === 'Content' && (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Video size={48} className="mx-auto mb-4 text-gray-600" />
                <h3 className="text-xl font-bold text-white mb-2">Channel Content</h3>
                <p>Manage all your videos, shorts, and live streams here.</p>
              </div>
            </div>
          )}

          {studioTab === 'Analytics' && (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <TrendingUp size={48} className="mx-auto mb-4 text-gray-600" />
                <h3 className="text-xl font-bold text-white mb-2">Channel Analytics</h3>
                <p>Dive deep into your audience retention and real-time views.</p>
              </div>
            </div>
          )}

          {studioTab === 'Earn' && (
            <div className="max-w-3xl mx-auto w-full">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">PlayTube Partner Program</h3>
                <p className="text-gray-400 text-sm">Join the program to earn money, get creator support, and more.</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md mb-6">
                <h4 className="text-white font-bold mb-4">How do I join?</h4>
                <p className="text-gray-400 text-sm mb-6">Meet the requirements to apply</p>
                
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <h5 className="text-white font-medium">Subscribers</h5>
                        <p className="text-gray-400 text-xs">850 / 1,000</p>
                      </div>
                      <span className="text-xs text-gray-500">150 to go</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[85%] h-full bg-gradient-to-r from-[#FF0000] to-[#FF9933] rounded-full"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <h5 className="text-white font-medium">Public Watch Hours</h5>
                        <p className="text-gray-400 text-xs">3,400 / 4,000</p>
                      </div>
                      <span className="text-xs text-gray-500">600 to go</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[85%] h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center border-t border-white/10 pt-6">
                  <button className="px-6 py-3 bg-white/10 text-white/50 font-bold rounded-full cursor-not-allowed">Apply Now</button>
                  <p className="text-xs text-gray-500 mt-3">We'll send you an email when you're eligible.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                  <ShoppingBag size={24} className="text-[#FF9933] mb-3" />
                  <h5 className="text-white font-bold mb-1">Shopping</h5>
                  <p className="text-xs text-gray-400">Share products across your channel.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                  <Users size={24} className="text-blue-400 mb-3" />
                  <h5 className="text-white font-bold mb-1">Memberships</h5>
                  <p className="text-xs text-gray-400">Create a fan club with exclusive perks.</p>
                </div>
              </div>
            </div>
          )}

        </div>
      );
    }

    
    return (
      <div className="p-4 md:p-8">
        {}
        <div className="flex space-x-3 overflow-x-auto pb-4 mb-6 hide-scrollbar">
          {['All', 'Mixes', 'Music', 'Live', 'Regional Trends', 'Computer Programming', 'Podcasts', 'News', 'Space', 'Recently Uploaded'].map((tag) => (
            <button 
              key={tag} 
              onClick={() => setActiveCategory(tag)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeCategory === tag ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20 border border-white/5'}`}
            >
              {translate(tag)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredVideos().map((video) => (
            <div key={video.id} className="flex flex-col group cursor-pointer relative" onClick={() => setSelectedVideo(video)}>
              <div className={`relative w-full aspect-video rounded-xl overflow-hidden mb-3 ${video.isLive ? 'shadow-[0_0_15px_rgba(255,0,0,0.6)] border border-[#FF0000]' : ''}`}>
                <img src={video.thumbnailUrl || video.thumbnail} alt={video.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
                
                {video.isLive && (
                  <div className="absolute top-2 left-2 bg-[#FF0000] text-white text-[10px] font-bold px-2 py-1 rounded shadow-[0_0_10px_#FF0000] animate-pulse">
                    LIVE
                  </div>
                )}
                
                {}
                <button 
                  onClick={(e) => { e.stopPropagation(); setSummaryVideo(summaryVideo === video.id ? null : video.id); }}
                  className="absolute top-2 right-2 p-2 bg-black/60 backdrop-blur-md rounded-full text-indigo-400 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-all hover:bg-indigo-500 hover:text-white hover:scale-110 shadow-[0_0_10px_rgba(79,70,229,0.3)] z-10"
                  title="AI Smart Summary"
                >
                  <BrainCircuit size={18} />
                </button>
                
                {}
                <div className="absolute top-12 right-2 flex flex-col space-y-2 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 z-10">
                  <button className="p-2 bg-black/80 backdrop-blur-sm rounded-md text-white hover:bg-white/20 transition-colors" title="Watch Later" onClick={(e) => e.stopPropagation()}>
                    <Clock size={18} />
                  </button>
                  <button className="p-2 bg-black/80 backdrop-blur-sm rounded-md text-white hover:bg-white/20 transition-colors" title="Add to Queue" onClick={(e) => e.stopPropagation()}>
                    <ListPlus size={18} />
                  </button>
                </div>

                {}
                <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md font-medium transition-opacity duration-300 group-hover:opacity-0">
                  {video.isLive ? 'LIVE' : '14:20'}
                </div>
                
                {}
                {!video.isLive && (
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FF9933]/50 rounded-xl transition-colors duration-300 shadow-[inset_0_0_20px_rgba(255,153,51,0)] group-hover:shadow-[inset_0_0_20px_rgba(255,153,51,0.3)] pointer-events-none"></div>
                )}
                
                {}
                {summaryVideo === video.id && (
                  <div className="absolute inset-0 bg-black/85 backdrop-blur-md z-20 p-4 flex flex-col overflow-y-auto animate-in fade-in" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-indigo-400 font-bold text-sm flex items-center">
                        <BrainCircuit size={16} className="mr-2" /> AI Summary
                      </h4>
                      <button onClick={(e) => { e.stopPropagation(); setSummaryVideo(null); }} className="text-gray-400 hover:text-white p-1 bg-white/10 rounded-full">
                        <X size={14} />
                      </button>
                    </div>
                    <ul className="text-gray-300 text-xs space-y-2 list-disc pl-4 mt-2">
                      {video.summary?.map((point, i) => (
                        <li key={i}>{point}</li>
                      )) || <li>No summary available.</li>}
                    </ul>
                  </div>
                )}
              </div>
              <div className="flex space-x-3">
                <img src={video.avatar} alt={video.channel} className="w-9 h-9 rounded-full object-cover mt-1" />
                <div>
                  <h3 className="text-white font-medium text-sm md:text-base leading-snug line-clamp-2 group-hover:text-[#FF9933] transition-colors">{video.title}</h3>
                  <div className="flex items-center text-gray-400 text-xs md:text-sm mt-1">
                    <span>{video.channel}</span>
                    <CheckCircle2 size={12} className="ml-1 text-gray-500" />
                  </div>
                  <div className="text-gray-400 text-xs mt-0.5">
                    {video.views} views • {video.time}
                  </div>
                </div>
                <button className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-white hover:text-[#FF9933] p-1 h-fit" onClick={(e) => e.stopPropagation()}>
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#050505] text-white overflow-hidden font-sans selection:bg-[#FF9933]/30">
      {/* Mock Browser Header */}
      <div className="flex items-center space-x-4 p-2 bg-[#f1f3f4] border-b border-gray-300 shrink-0 z-[100] text-black w-full">
        <div className="flex space-x-2 text-gray-600">
          <button onClick={onBack} className="p-1 hover:bg-gray-200 rounded-full"><ArrowLeft size={20}/></button>
          <button className="p-1 hover:bg-gray-200 rounded-full opacity-50"><ArrowLeft size={20} className="transform rotate-180"/></button>
          <button className="p-1 hover:bg-gray-200 rounded-full"><RotateCw size={18}/></button>
        </div>
        <div className="flex-1">
          <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-1.5 shadow-inner max-w-2xl mx-auto cursor-text">
            <Lock size={14} className="text-gray-500 mr-2"/>
            <span className="text-sm">www.playtube.com</span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#FF9933] text-white flex items-center justify-center text-sm font-bold shadow-sm border border-[#FF0000]">U</div>
      </div>

      {}
      <header className="flex items-center justify-between px-4 h-16 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="flex items-center">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 mr-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none">
            <Menu size={24} />
          </button>
          
          {}
          <div className="flex items-center cursor-pointer select-none relative group">
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                if(selectedVideo) setSelectedVideo(null); 
                else onBack(); 
              }} 
              className="mr-2 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors" 
              title={selectedVideo ? "Back to Grid" : "Back to GlobalSearch"}
            >
              <ArrowLeft size={20} />
            </button>
            <div onClick={() => { setActiveTab('Home'); setSelectedVideo(null); }} className="flex items-center cursor-pointer">
              <PlayTubeLogo className="h-14 md:h-16 drop-shadow-[0_0_10px_rgba(255,153,51,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(255,153,51,0.8)] transition-all" />
              {isPremium && (
                <span className="ml-1 px-1.5 py-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-[10px] font-bold tracking-wider rounded-sm shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                  PREMIUM
                </span>
              )}
            </div>
          </div>
        </div>

        {}
        <div className="hidden md:flex flex-1 max-w-2xl px-8 relative">
          <div className="flex w-full relative group/search">
            <div className="flex-1 flex items-center bg-[#121212] border border-white/10 rounded-l-full px-4 py-2 focus-within:border-[#FF9933]/50 focus-within:shadow-[0_0_10px_rgba(255,153,51,0.1)] transition-all">
              <Search size={18} className="text-gray-500 mr-3" />
              <input 
                type="text" 
                placeholder="Search PlayTube" 
                className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500"
              />
            </div>
            <button className="bg-[#121212] border-y border-l border-white/10 px-4 py-2 hover:bg-white/10 transition-colors shadow-inner flex items-center justify-center text-gray-400 hover:text-white" title="Search Filters" onClick={(e) => { e.stopPropagation(); alert('Search Filters: Type, Date, Duration'); }}>
              <ListPlus size={18} />
            </button>
            <button className="bg-white/5 border border-l-0 border-white/10 rounded-r-full px-5 py-2 hover:bg-white/10 transition-colors shadow-inner flex items-center justify-center group">
              <Search size={20} className="text-gray-300 group-hover:text-white transition-colors" />
            </button>
          </div>
          <button className="ml-4 p-3 bg-[#121212] rounded-full hover:bg-white/10 transition-colors border border-white/5">
            <Mic size={20} className="text-white" />
          </button>
        </div>

        {}
        <div className="flex items-center space-x-2 sm:space-x-4">
          
          {}
          <div className="relative">
            <button 
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center text-gray-300 hover:text-white"
            >
              <Globe size={22} className={tubeLanguage !== 'English' ? 'text-[#FF9933]' : ''} />
              <span className="hidden sm:inline-block ml-1 text-xs font-bold">{tubeLanguage.slice(0,2).toUpperCase()}</span>
            </button>
            {isLanguageMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#121212]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200 py-2">
                {['English', 'Hindi', 'Punjabi', 'Tamil', 'Bangla', 'Telugu', 'Marathi'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => { setTubeLanguage(lang); setIsLanguageMenuOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${tubeLanguage === lang ? 'bg-[#FF9933]/10 text-[#FF9933] font-bold border-l-2 border-[#FF9933]' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button 
            onClick={() => {
              if(!isLoggedIn) { alert('Please Sign In to Create Content.'); return; }
              setIsCreateModalOpen(true);
            }}
            className="hidden sm:flex items-center space-x-2 p-2 px-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-medium"
          >
            <Video size={18} className="text-[#FF9933]" />
            <span className="hidden lg:inline">Create</span>
          </button>
          
          {isLoggedIn && (
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
              >
                <Bell size={24} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF0000] rounded-full shadow-[0_0_5px_#FF0000]"></span>
              </button>
              
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#121212]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-bold text-white">Notifications</h3>
                    <button className="text-xs text-blue-400 hover:text-blue-300">Mark all read</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto hide-scrollbar">
                    {[
                      { id: 1, text: 'TechWorld uploaded a new video: Exploring the Metaverse.', time: '2 min ago', unread: true },
                      { id: 2, text: 'Your video "Delhi 2050" reached 1M views!', time: '1 hour ago', unread: true },
                      { id: 3, text: 'GamerX is now LIVE: Epic BGMI Tournament.', time: '3 hours ago', unread: false },
                    ].map((notif) => (
                      <div key={notif.id} className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer flex gap-3 ${notif.unread ? 'bg-blue-900/10' : ''}`}>
                        <div className="w-8 h-8 rounded-full bg-[#FF9933]/20 flex items-center justify-center text-[#FF9933] shrink-0 mt-0.5">
                          <Bell size={14} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-200 leading-snug">{notif.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-white/10 text-center">
                    <button className="text-sm text-gray-400 hover:text-white">View All</button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="relative">
            {isLoggedIn ? (
              <div 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF9933] to-[#138808] p-[2px] cursor-pointer hover:shadow-[0_0_15px_rgba(255,153,51,0.5)] transition-shadow"
              >
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" alt="Profile" className="w-full h-full rounded-full border-2 border-black object-cover" />
              </div>
            ) : (
              <button 
                onClick={() => setIsLoggedIn(true)} 
                className="flex items-center px-4 py-1.5 border border-blue-500 text-blue-400 rounded-full hover:bg-blue-500/10 transition-colors font-medium text-sm"
              >
                <User size={18} className="mr-2" /> Sign In
              </button>
            )}

            {}
            {isProfileMenuOpen && isLoggedIn && (
              <div className="absolute right-0 mt-3 w-64 bg-[#121212]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-white/10 flex items-center space-x-3 bg-white/5">
                  <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" className="w-12 h-12 rounded-full border border-white/20" alt="Profile" />
                  <div>
                    <h3 className="text-white font-bold text-sm">Rahul Verma</h3>
                    <p className="text-xs text-gray-400">@rahul_v2050</p>
                  </div>
                </div>
                
                <div className="p-2 space-y-1">
                  <button 
                    onClick={() => { setActiveTab('Dashboard'); setIsProfileMenuOpen(false); }}
                    className="w-full flex items-center px-3 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white rounded-xl transition-colors"
                  >
                    <User size={18} className="mr-3" /> Your Channel
                  </button>
                  <button 
                    onClick={() => { setShowDigiLockerModal(true); setIsProfileMenuOpen(false); }}
                    className="w-full flex items-center px-3 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white rounded-xl transition-colors"
                  >
                    <ShieldCheck size={18} className="mr-3 text-emerald-400" /> DigiLocker Verified
                  </button>
                  <button 
                    onClick={() => { setShowSettingsModal(true); setIsProfileMenuOpen(false); }}
                    className="w-full flex items-center px-3 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white rounded-xl transition-colors"
                  >
                    <Settings size={18} className="mr-3" /> Studio Settings
                  </button>
                  
                  <div className="border-t border-white/10 my-1"></div>
                  
                  <button 
                    onClick={() => { 
                      setIsPremium(!isPremium); 
                      setIsProfileMenuOpen(false); 
                      if (!isPremium) {
                        setShowPremiumToast(true);
                        setTimeout(() => setShowPremiumToast(false), 3000);
                      }
                    }}
                    className="w-full flex items-center px-3 py-2.5 text-sm text-yellow-500 hover:bg-white/10 hover:text-yellow-400 rounded-xl transition-colors font-bold group/premium"
                  >
                    <Sparkles size={18} className="mr-3 group-hover/premium:animate-pulse" /> 
                    {isPremium ? 'Manage Premium' : 'Get PlayTube Premium'}
                  </button>
                </div>
                
                <div className="p-2 border-t border-white/10">
                  <button 
                    onClick={() => { setIsLoggedIn(false); setIsProfileMenuOpen(false); }}
                    className="w-full flex items-center px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors"
                  >
                    <LogOut size={18} className="mr-3" /> Sign Out (GlobalNet)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {}
        <aside className={`${isSidebarOpen ? 'w-64 absolute sm:relative z-40 bg-[#0a0a0a]/95 backdrop-blur-xl h-full shadow-2xl' : 'w-0 sm:w-20'} transition-all duration-300 flex flex-col border-r border-white/5 overflow-hidden`}>
          <div className="flex-1 py-4 flex flex-col gap-1 overflow-y-auto hide-scrollbar px-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.name && !selectedVideo;
              return (
                <button
                  key={item.name}
                  onClick={() => { 
                    setActiveTab(item.name); 
                    if (selectedVideo) {
                      setPipVideo(selectedVideo);
                      setSelectedVideo(null);
                    } else {
                      setSelectedVideo(null);
                    }
                  }}
                  className={`flex items-center w-full rounded-xl transition-all group ${
                    isSidebarOpen ? 'px-4 py-3 justify-start' : 'p-3 justify-center flex-col h-16'
                  } ${
                    isActive 
                      ? 'bg-gradient-to-r from-white/10 to-transparent text-white border-l-4 border-[#FF9933]' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                  title={!isSidebarOpen ? item.name : undefined}
                >
                  {item.name === 'Play Shorts' ? (
                    <div className={`${isSidebarOpen ? 'mr-4' : 'mb-1'} flex items-center justify-center relative`}>
                      <item.icon size={isSidebarOpen ? 22 : 24} className={`${isActive ? 'text-[#FF0000]' : 'text-gray-400 group-hover:text-white'} transition-colors relative z-10`} />
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#FF0000] to-[#FF9933] blur-md opacity-40 group-hover:opacity-80 transition-opacity rounded-full scale-150 pointer-events-none"></div>
                    </div>
                  ) : (
                    <item.icon size={isSidebarOpen ? 22 : 24} className={`${isActive ? 'text-[#FF9933]' : ''} ${isSidebarOpen ? 'mr-4' : 'mb-1'}`} />
                  )}
                  <span className={`${isSidebarOpen ? 'text-sm font-medium' : 'text-[10px]'} ${isActive ? 'font-semibold' : ''}`}>
                    {translate(item.name)}
                  </span>
                </button>
              );
            })}

            {isSidebarOpen && (
              <>
                <div className="my-4 border-t border-white/10"></div>
                <h3 className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">Explore</h3>
                <button className="flex items-center w-full px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all text-sm font-medium">
                  <Flame size={20} className="mr-4" /> Trending
                </button>
                <button className="flex items-center w-full px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all text-sm font-medium">
                  <PlaySquare size={20} className="mr-4" /> Music
                </button>
                <button className="flex items-center w-full px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all text-sm font-medium">
                  <svg className="w-5 h-5 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg> Science
                </button>
              </>
            )}
          </div>
        </aside>

        {}
        <main className="flex-1 overflow-y-auto bg-black bg-opacity-40 backdrop-blur-sm relative z-0 hide-scrollbar" onClick={() => { if(window.innerWidth < 640 && isSidebarOpen) setIsSidebarOpen(false) }}>
          {}
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#FF0000] rounded-full blur-[150px] opacity-[0.03] pointer-events-none"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-[#FF9933] rounded-full blur-[150px] opacity-[0.03] pointer-events-none"></div>
          
          {creationMode ? renderCreationStudio() : renderContent()}
        </main>
      </div>

      {}
      {showDigiLockerModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-[#121212] border border-emerald-500/30 rounded-3xl p-6 w-full max-w-sm shadow-[0_0_50px_rgba(16,185,129,0.15)] relative text-center">
             <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
               <ShieldCheck size={32} className="text-emerald-400" />
             </div>
             <h2 className="text-xl font-bold text-white mb-2">Identity Verified</h2>
             <p className="text-sm text-gray-400 mb-6">This account is officially linked and verified with GlobalNet DigiLocker. You have high trust score on the platform.</p>
             <button onClick={() => setShowDigiLockerModal(false)} className="w-full py-3 bg-emerald-500/20 text-emerald-400 font-bold rounded-xl hover:bg-emerald-500/30 transition-colors">
               Done
             </button>
          </div>
        </div>
      )}

      {}
      {showSettingsModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-[#121212] border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-[0_0_50px_rgba(255,255,255,0.05)] relative">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-bold text-white flex items-center"><Settings className="mr-3 text-[#FF9933]" size={24} /> Studio Settings</h2>
               <button onClick={() => setShowSettingsModal(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"><X size={20}/></button>
             </div>
             
             <div className="space-y-4">
               <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                 <div>
                   <h4 className="text-white font-bold text-sm">Dark Mode</h4>
                   <p className="text-gray-400 text-xs mt-1">Aesthetic cinematic theme</p>
                 </div>
                 <div className="w-12 h-6 bg-[#FF9933] rounded-full relative cursor-pointer"><div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div></div>
               </div>
               
               <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                 <div>
                   <h4 className="text-white font-bold text-sm">AI Auto-Dubbing</h4>
                   <p className="text-gray-400 text-xs mt-1">Translate videos automatically</p>
                 </div>
                 <div className="w-12 h-6 bg-[#FF9933] rounded-full relative cursor-pointer"><div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div></div>
               </div>
               
               <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                 <div>
                   <h4 className="text-white font-bold text-sm">Holo-Cast Enabled</h4>
                   <p className="text-gray-400 text-xs mt-1">Allow 3D room projection</p>
                 </div>
                 <div className="w-12 h-6 bg-[#FF9933] rounded-full relative cursor-pointer"><div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div></div>
               </div>
               
               <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs text-gray-500 font-mono">
                 GlobalNet System v10.4.2 (Secure Build)
               </div>
             </div>
          </div>
        </div>
      )}

      {}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300 p-4">
          <div className="bg-[#121212]/90 border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-[0_0_50px_rgba(255,153,51,0.15)] relative backdrop-blur-xl">
            <button 
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
              <Video size={24} className="text-[#FF9933] mr-3" />
              Create Content
            </h2>
            <p className="text-sm text-gray-400 mb-8">Choose a format to begin creating in Play Studio.</p>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 hide-scrollbar">
              {}
              <div 
                onClick={() => { setIsCreateModalOpen(false); setCreationMode('short'); }}
                className="group cursor-pointer p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-black/60 hover:border-[#FF0000]/50 transition-all flex items-start space-x-4"
              >
                <div className="p-3 bg-[#FF0000]/10 rounded-xl text-[#FF0000] group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,0,0,0.1)] group-hover:shadow-[0_0_20px_rgba(255,0,0,0.3)]">
                  <Flame size={28} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#FF0000] transition-colors">Play Short</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">Vertical format (up to 60s). Access AI auto-edit, smart lip-sync generation, and trending AR holographic filters.</p>
                </div>
              </div>

              {}
              <div 
                onClick={() => { setIsCreateModalOpen(false); setCreationMode('live'); }}
                className="group cursor-pointer p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-black/60 hover:border-red-500/50 transition-all flex items-start space-x-4"
              >
                <div className="p-3 bg-red-500/10 rounded-xl text-red-500 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(239,68,68,0.1)] group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <Video size={24} className="relative z-10" />
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1 group-hover:text-red-500 transition-colors">Go Live</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">Broadcast live to your audience. Setup stream keys, manage live chat, and monetize with Super Thanks in real-time.</p>
                </div>
              </div>

              {}
              <div 
                onClick={() => { setIsCreateModalOpen(false); setCreationMode('long'); }}
                className="group cursor-pointer p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-black/60 hover:border-[#FF9933]/50 transition-all flex items-start space-x-4"
              >
                <div className="p-3 bg-[#FF9933]/10 rounded-xl text-[#FF9933] group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,153,51,0.1)] group-hover:shadow-[0_0_20px_rgba(255,153,51,0.3)]">
                  <PlaySquare size={28} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#FF9933] transition-colors">Cinematic Video</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">High-fidelity 8K support. Features full Holo-Studio editing suite, multi-lingual auto-dubbing, and chapter generation.</p>
                </div>
              </div>

              {}
              <div 
                onClick={() => { setIsCreateModalOpen(false); setCreationMode('ai'); }}
                className="group cursor-pointer p-4 rounded-2xl border border-white/10 bg-gradient-to-r from-blue-900/10 to-purple-900/10 hover:from-blue-900/30 hover:to-purple-900/30 hover:border-blue-500/50 transition-all flex items-start space-x-4"
              >
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <BrainCircuit size={28} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors">AI Text-to-Video</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">Type a prompt to generate hyper-realistic video sequences directly via GlobalNet's advanced Sora-equivalent AI model.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {}
      {pipVideo && (
        <div className="fixed bottom-4 right-4 w-72 md:w-80 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden z-[120] group animate-in slide-in-from-bottom-10 fade-in">
          <div className="relative w-full aspect-video bg-black">
            <img src={pipVideo.thumbnail} alt={pipVideo.title} className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
              <button className="w-12 h-12 bg-[#FF9933]/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,153,51,0.6)]">
                <PlaySquare size={24} className="text-white ml-1" fill="currentColor" />
              </button>
            </div>
          </div>
          <div className="p-3 relative">
            <button 
              onClick={() => setPipVideo(null)}
              className="absolute -top-3 right-2 w-6 h-6 bg-black/80 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X size={14} />
            </button>
            <h4 className="text-white text-sm font-bold line-clamp-1 pr-6">{pipVideo.title}</h4>
            <p className="text-gray-400 text-xs mt-1">{pipVideo.channel}</p>
            <div className="mt-2 flex items-center justify-between">
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <div className="bg-[#FF9933] w-1/3 h-full rounded-full"></div>
              </div>
              <button 
                onClick={() => { setSelectedVideo(pipVideo); setPipVideo(null); }}
                className="ml-3 text-gray-400 hover:text-white" title="Expand"
              >
                <Maximize size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Premium Toast */}
      {showPremiumToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-md border border-yellow-500/50 rounded-full px-6 py-3 shadow-[0_0_20px_rgba(250,204,21,0.2)] z-[200] animate-in slide-in-from-bottom-10 fade-in duration-300 flex items-center space-x-3">
          <Sparkles size={20} className="text-yellow-500 animate-pulse" />
          <span className="text-white text-sm font-medium">Premium active: Ad-free & Background Play enabled</span>
        </div>
      )}
    </div>
  );
}
