import React, { useState } from 'react';
import { 
  Mic, MicOff, Video, VideoOff, MonitorUp, PhoneOff, 
  Users, MessageSquare, Hand, LayoutGrid, Maximize, 
  Smile, Shield, ChevronUp, MoreHorizontal, X, Send,
  Info, Box, Languages, CheckCircle2
} from 'lucide-react';

export default function SyncMeet({ onBack }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState(null); 
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'AI Assistant', text: 'Welcome to SyncMeet!', time: '10:00 AM' },
    { sender: 'Priya Patel', text: 'Hello everyone!', time: '10:02 AM' }
  ]);
  
  
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [activeEmoji, setActiveEmoji] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [isHoloMode, setIsHoloMode] = useState(false);
  const [isTranslating, setIsTranslating] = useState(true);

  const participants = [
    { id: 1, name: 'AI Assistant (Host)', isSpeaking: true, avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop' },
    { id: 2, name: 'Rahul Sharma', isSpeaking: false, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' },
    { id: 3, name: 'Priya Patel', isSpeaking: false, avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop' },
    { id: 4, name: 'You', isSpeaking: !isMuted, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop', isYou: true },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      setMessages([...messages, { sender: 'You', text: chatMessage, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
      setChatMessage('');
    }
  };

  const handleEmojiClick = (emoji) => {
    setActiveEmoji(emoji);
    setShowReactions(false);
    setTimeout(() => {
      setActiveEmoji(null);
    }, 4000); // Clear emoji after 4 seconds
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#111111] text-white font-sans overflow-hidden relative">
      
      {/* Invite Modal */}
      {showInviteModal && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 w-[90%] max-w-[400px] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Invite People</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"><X size={20} /></button>
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-400 mb-2 block">Meeting Link</label>
              <div className="flex bg-[#2a2a2a] p-2 rounded items-center border border-white/5">
                <span className="flex-1 text-sm text-white overflow-hidden text-ellipsis whitespace-nowrap">https://syncmeet.in/m/proj-sync-xyz</span>
                <button className="bg-[#4285F4] hover:bg-[#3367d6] text-white text-xs px-3 py-1.5 rounded transition-colors shadow-sm font-medium">Copy Link</button>
              </div>
            </div>
            <div className="mb-5">
              <label className="text-sm text-gray-400 mb-2 block">Invite by Email</label>
              <input type="email" placeholder="Enter email address..." className="w-full bg-[#2a2a2a] border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#4285F4] transition-colors" />
            </div>
            <button className="w-full py-2 bg-[#4285F4] hover:bg-[#3367d6] rounded font-medium transition-colors shadow-md" onClick={() => setShowInviteModal(false)}>
              Send Invitation
            </button>
          </div>
        </div>
      )}

      {/* Top Bar (Overlay) */}
      <div className="absolute top-4 left-4 z-20 flex items-center bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
        <Shield size={16} className="text-green-500 mr-2" />
        <span className="font-semibold text-sm tracking-tight mr-2">
          Bharat<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] to-[#138808]">Meet</span>
        </span>
        <span className="bg-red-500/20 text-red-500 text-xs px-1.5 py-0.5 rounded font-bold tracking-wider mr-2 animate-pulse">REC</span>
        <span className="text-xs text-gray-300">00:45:22</span>
        <button onClick={onBack} className="ml-4 text-xs text-gray-400 hover:text-white flex items-center bg-white/10 px-2 py-1 rounded transition-colors">
          Leave
        </button>
      </div>

      <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
         <button className="flex items-center bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors text-sm shadow-lg">
           <LayoutGrid size={16} className="mr-2" /> View
         </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative pb-20">
        
        {/* Video Grid */}
        <div className={`flex-1 p-4 sm:p-8 flex items-center justify-center transition-all duration-300 ${activeSidebar ? 'pr-0 hidden md:flex' : 'flex'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full h-full max-w-5xl max-h-[80vh]">
            {participants.map(p => (
              <div key={p.id} className={`relative rounded-xl overflow-hidden bg-[#222] border-2 transition-all duration-500 group ${p.isSpeaking ? 'border-[#138808] shadow-[0_0_15px_rgba(19,136,8,0.2)]' : 'border-[#333]'} ${isHoloMode ? 'shadow-[inset_0_0_50px_rgba(6,182,212,0.5)] border-cyan-500/50' : ''}`}>
                
                {isHoloMode && (
                  <div className="absolute inset-0 z-10 pointer-events-none opacity-40 mix-blend-screen" style={{ backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.4) 1px, transparent 1px)', backgroundSize: '20px 20px', transform: 'perspective(500px) rotateX(15deg) scale(1.1)' }}></div>
                )}
                {isHoloMode && (
                   <div className="absolute inset-0 z-10 pointer-events-none border-[4px] border-cyan-400/30 animate-pulse box-border"></div>
                )}

                {(!p.isYou || !isVideoOff) ? (
                  <img src={p.avatar} alt={p.name} className={`w-full h-full object-cover transition-all duration-500 ${isHoloMode ? 'sepia-[0.3] hue-rotate-[180deg] contrast-150 opacity-80 mix-blend-luminosity' : ''}`} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center text-3xl font-bold">
                      {p.name.charAt(0)}
                    </div>
                  </div>
                )}
                
                {}
                {p.isYou && activeEmoji && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <span className="text-6xl animate-bounce drop-shadow-xl">{activeEmoji}</span>
                  </div>
                )}

                {}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                  {p.isYou && isHandRaised && (
                    <div className="bg-[#4285F4] p-1.5 rounded-full shadow-lg border border-white/20 animate-in fade-in zoom-in">
                      <Hand size={16} className="text-white" />
                    </div>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 flex items-center bg-black/60 backdrop-blur-sm px-2 py-1 rounded z-10">
                  {(p.isYou && isMuted) ? (
                    <MicOff size={14} className="text-red-500 mr-2" />
                  ) : (
                    <Mic size={14} className={`mr-2 ${p.isSpeaking ? 'text-green-400' : 'text-gray-300'}`} />
                  )}
                  <span className="text-xs font-medium text-white shadow-sm">
                    {p.name} {p.isYou && '(You)'}
                  </span>
                </div>
                
                {}
                {p.isSpeaking && isTranslating && p.name !== 'You' && (
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl border border-[#FF9933]/50 z-20 shadow-xl max-w-[80%]">
                    <p className="text-sm font-medium text-white flex items-start">
                      <Languages size={14} className="text-[#FF9933] mr-2 shrink-0 mt-0.5 animate-pulse" />
                      "Yes, the new AI capabilities are functioning optimally..."
                    </p>
                  </div>
                )}

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button className="p-1.5 bg-black/60 rounded backdrop-blur-sm hover:bg-black/80 text-white">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {}
        {activeSidebar && (
          <div className="w-full md:w-[320px] bg-[#1a1a1a] border-l border-white/10 flex flex-col h-full z-10 transition-all duration-300 shrink-0 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="font-semibold">{activeSidebar === 'chat' ? 'Meeting Chat' : 'Participants'}</h2>
              <button onClick={() => setActiveSidebar(null)} className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
            
            {activeSidebar === 'chat' ? (
              <>
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                      <span className="text-[10px] text-gray-400 mb-1">{msg.sender} • {msg.time}</span>
                      <div className={`px-3 py-2 rounded-lg text-sm ${msg.sender === 'You' ? 'bg-[#138808] text-white' : 'bg-[#2a2a2a] text-gray-200'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-white/10 bg-[#1a1a1a]">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input 
                      type="text" 
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Type message here..." 
                      className="flex-1 bg-[#2a2a2a] border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#4285F4] text-white"
                    />
                    <button type="submit" className="p-2 bg-[#4285F4] rounded hover:bg-[#3367d6] disabled:opacity-50 transition-colors text-white" disabled={!chatMessage.trim()}>
                      <Send size={18} />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 p-2 overflow-y-auto">
                 {participants.map(p => (
                   <div key={p.id} className="flex items-center justify-between p-2 hover:bg-white/5 rounded transition-colors group">
                     <div className="flex items-center gap-3">
                       <img src={p.avatar} alt={p.name} className="w-8 h-8 rounded-full object-cover" />
                       <div className="flex flex-col">
                         <span className="text-sm flex items-center">
                           {p.name} 
                           {p.isYou && isHandRaised && <Hand size={12} className="ml-2 text-[#4285F4]" />}
                         </span>
                       </div>
                     </div>
                     <div className="flex gap-2 text-gray-400 opacity-80 group-hover:opacity-100 transition-opacity">
                       {(p.isYou && isMuted) ? <MicOff size={16} className="text-red-500" /> : <Mic size={16} className={p.isSpeaking ? 'text-green-500' : ''} />}
                       {(p.isYou && isVideoOff) ? <VideoOff size={16} className="text-red-500" /> : <Video size={16} />}
                     </div>
                   </div>
                 ))}
                 <div className="mt-4 px-2">
                   <button onClick={() => setShowInviteModal(true)} className="w-full py-2 bg-[#2a2a2a] hover:bg-[#333] rounded text-sm transition-colors text-white border border-white/10">
                     Invite Others
                   </button>
                 </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Controls (Zoom Style) */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-[#1a1a1a] border-t border-white/10 flex items-center justify-between px-2 sm:px-6 z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.5)]">
        
        {/* Left Controls */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <div className="flex items-center">
            <button 
              onClick={() => setIsMuted(!isMuted)} 
              className="flex flex-col items-center justify-center w-14 sm:w-16 h-14 rounded hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            >
              {isMuted ? <MicOff size={22} className="text-red-500 mb-1" /> : <Mic size={22} className="mb-1" />}
              <span className="text-[10px]">{isMuted ? 'Unmute' : 'Mute'}</span>
            </button>
            <button className="h-14 px-1 rounded hover:bg-white/10 text-gray-400 flex items-center justify-center transition-colors hidden sm:flex">
              <ChevronUp size={14} />
            </button>
          </div>
          
          <div className="flex items-center">
            <button 
              onClick={() => setIsVideoOff(!isVideoOff)} 
              className="flex flex-col items-center justify-center w-14 sm:w-16 h-14 rounded hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            >
              {isVideoOff ? <VideoOff size={22} className="text-red-500 mb-1" /> : <Video size={22} className="mb-1" />}
              <span className="text-[10px]">{isVideoOff ? 'Start Video' : 'Stop Video'}</span>
            </button>
            <button className="h-14 px-1 rounded hover:bg-white/10 text-gray-400 flex items-center justify-center transition-colors hidden sm:flex">
              <ChevronUp size={14} />
            </button>
          </div>
        </div>
        
        {}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button className="flex flex-col items-center justify-center w-14 sm:w-16 h-14 rounded hover:bg-white/10 text-gray-300 hover:text-white transition-colors hidden lg:flex">
            <Shield size={22} className="mb-1" />
            <span className="text-[10px]">Security</span>
          </button>
          
          <button 
            onClick={() => setActiveSidebar(activeSidebar === 'participants' ? null : 'participants')}
            className={`flex flex-col items-center justify-center w-14 sm:w-16 h-14 rounded transition-colors ${activeSidebar === 'participants' ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-gray-300 hover:text-white'}`}
          >
            <div className="relative mb-1">
              <Users size={22} />
              <span className="absolute -top-1 -right-2 bg-[#4285F4] text-white text-[9px] px-1 rounded-full">{participants.length}</span>
            </div>
            <span className="text-[10px]">Participants</span>
          </button>
          
          <button 
            onClick={() => setActiveSidebar(activeSidebar === 'chat' ? null : 'chat')}
            className={`flex flex-col items-center justify-center w-14 sm:w-16 h-14 rounded transition-colors ${activeSidebar === 'chat' ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-gray-300 hover:text-white'}`}
          >
            <MessageSquare size={22} className="mb-1" />
            <span className="text-[10px]">Chat</span>
          </button>
          
            <div className="flex items-center">
            <button className="flex flex-col items-center justify-center w-14 sm:w-16 h-14 rounded hover:bg-white/10 text-[#4ade80] hover:text-[#22c55e] transition-colors">
              <MonitorUp size={22} className="mb-1" />
              <span className="text-[10px]">Share Screen</span>
            </button>
            <button className="h-14 px-1 rounded hover:bg-white/10 text-[#4ade80] flex items-center justify-center transition-colors hidden sm:flex">
              <ChevronUp size={14} />
            </button>
          </div>
          
          {}
          <button 
            onClick={() => setIsHoloMode(!isHoloMode)}
            className={`flex flex-col items-center justify-center w-14 sm:w-16 h-14 rounded transition-colors hidden md:flex ${isHoloMode ? 'text-cyan-400 bg-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'hover:bg-white/10 text-gray-300 hover:text-white'}`}
          >
            <Box size={22} className={`mb-1 ${isHoloMode ? 'animate-pulse' : ''}`} />
            <span className="text-[10px]">{isHoloMode ? 'Holo: ON' : 'Holo: OFF'}</span>
          </button>
          
          <button 
            onClick={() => setIsTranslating(!isTranslating)}
            className={`flex flex-col items-center justify-center w-14 sm:w-16 h-14 rounded transition-colors hidden md:flex ${isTranslating ? 'text-[#FF9933] bg-[#FF9933]/10' : 'hover:bg-white/10 text-gray-300 hover:text-white'}`}
          >
            <Languages size={22} className="mb-1" />
            <span className="text-[10px]">Translate</span>
          </button>
          
          <button 
            onClick={() => setIsHandRaised(!isHandRaised)}
            className={`flex flex-col items-center justify-center w-14 sm:w-16 h-14 rounded transition-colors hidden md:flex ${isHandRaised ? 'text-[#4285F4] bg-white/10' : 'hover:bg-white/10 text-gray-300 hover:text-white'}`}
          >
            <Hand size={22} className="mb-1" />
            <span className="text-[10px]">{isHandRaised ? 'Lower Hand' : 'Raise Hand'}</span>
          </button>
          
          <div className="relative hidden lg:block">
            <button 
              onClick={() => setShowReactions(!showReactions)}
              className={`flex flex-col items-center justify-center w-14 sm:w-16 h-14 rounded transition-colors ${showReactions ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-gray-300 hover:text-white'}`}
            >
              <Smile size={22} className="mb-1" />
              <span className="text-[10px]">Reactions</span>
            </button>
            
            {showReactions && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#2a2a2a] border border-white/10 rounded-lg p-2 flex gap-2 shadow-2xl z-50 animate-in slide-in-from-bottom-2 duration-200">
                {['👍', '❤️', '😂', '😮', '🎉', '👏'].map(emoji => (
                  <button 
                    key={emoji}
                    onClick={() => handleEmojiClick(emoji)}
                    className="text-2xl hover:bg-white/10 p-2 rounded-lg transition-transform hover:scale-125 focus:outline-none"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {}
        <div className="flex items-center">
          <button onClick={onBack} className="px-4 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition-colors shadow-sm">
            End
          </button>
        </div>
      </div>
    </div>
  );
}
