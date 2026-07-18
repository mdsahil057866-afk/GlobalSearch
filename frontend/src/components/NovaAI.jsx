import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Mic, Send, BrainCircuit, Globe2, BookOpen, Tractor, Cpu, Sparkles, User } from 'lucide-react';
import aiLogoImg from '../assets/novaai_logo.png';

export default function NovaAI({ onBack }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    try {
      const textLower = currentInput.toLowerCase();
      let responseText = '';

      // Hardcoded intents for personality
      if (textLower.includes('name')) {
        responseText = 'मेरा नाम भारत एआई (Bharat AI) है। मैं एक स्वदेशी, उन्नत कृत्रिम बुद्धिमत्ता हूँ जिसे भारतनेट इकोसिस्टम के लिए बनाया गया है। (My name is Bharat AI. I am a sovereign, advanced AI built for the CoreNet ecosystem.)';
      } else if (textLower.includes('hello') || textLower.includes('hi') || textLower.includes('namaste')) {
        responseText = 'नमस्ते! मैं भारत एआई हूँ। मैं आपकी कैसे मदद कर सकता हूँ? (Namaste! I am Bharat AI. How can I help you?)';
      } else if (textLower.includes('khana') || textLower.includes('food')) {
        responseText = 'मुझे खाना खाने की जरूरत नहीं है, लेकिन मैं आपको बेहतरीन भारतीय व्यंजनों की रेसिपी दे सकता हूँ! आप क्या बनाना चाहते हैं?';
      } else if (textLower.includes('farmer') || textLower.includes('crop')) {
        responseText = 'सैटेलाइट डेटा के अनुसार, महाराष्ट्र में इस मौसम के लिए सोयाबीन और कपास सबसे अच्छे विकल्प हैं। मिट्टी की नमी 45% है, जो बुवाई के लिए अनुकूल है।';
      } else {
        
        const hiRes = await fetch(`https://hi.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=3&exlimit=1&generator=search&gsrsearch=${encodeURIComponent(currentInput)}&gsrlimit=1&explaintext=1&format=json&origin=*`);
        const hiData = await hiRes.json();
        
        if (hiData.query && hiData.query.pages) {
          const pageId = Object.keys(hiData.query.pages)[0];
          responseText = hiData.query.pages[pageId].extract;
        } else {
          
          const enRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=3&exlimit=1&generator=search&gsrsearch=${encodeURIComponent(currentInput)}&gsrlimit=1&explaintext=1&format=json&origin=*`);
          const enData = await enRes.json();
          
          if (enData.query && enData.query.pages) {
            const pageId = Object.keys(enData.query.pages)[0];
            responseText = enData.query.pages[pageId].extract;
          }
        }
      }

      if (!responseText) {
        responseText = 'क्षमा करें, मुझे इस प्रश्न का सटीक उत्तर नहीं मिल रहा है। (Sorry, I cannot find an exact answer for this. Note: I am a prototype running without a full backend API.)';
      }

      const aiMsg = { 
        id: Date.now() + 1, 
        text: responseText, 
        sender: 'ai' 
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now(), text: 'नेटवर्क त्रुटि (Network error occurred while fetching information).', sender: 'ai' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePromptClick = (text) => {
    setInput(text);
    
  };
  
  return (
    <div className="flex h-screen w-full bg-[#020202] text-white font-sans overflow-hidden relative">
      
      {}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#FF9933]/10 via-[#ffffff]/5 to-[#138808]/10 rounded-full blur-[100px]"></div>
      </div>

      {}
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
        <div className="flex items-center cursor-pointer" onClick={onBack}>
          <button className="mr-3 p-2 rounded-full hover:bg-white/10 transition-colors bg-black/40 backdrop-blur-md">
            <ArrowLeft size={20} className="text-gray-300" />
          </button>
          <img src={aiLogoImg} alt="NovaAI Logo" className="w-12 h-12 mr-3 object-cover rounded-full drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] border border-white/20" />
          <span className="font-bold text-2xl tracking-tight text-white drop-shadow-md">Bharat<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] to-[#138808]">AI</span></span>
        </div>
        
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md text-sm font-medium hover:bg-white/10 transition-colors flex items-center">
            <Globe2 size={16} className="mr-2" /> Hindi (HI)
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-[#FF9933]/20 to-[#138808]/20 border border-white/10 rounded-full backdrop-blur-md text-sm font-medium hover:brightness-125 transition-all flex items-center text-white">
             <Cpu size={16} className="mr-2" /> Quantum Core Active
          </button>
        </div>
      </header>

      {}
      <div className="flex-1 flex flex-col relative z-10 w-full pt-20 pb-24 h-full">
        
        {messages.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center mb-12">
              <div className="absolute inset-0 rounded-full border border-[#FF9933]/30 animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-4 rounded-full border-2 border-dashed border-white/20 animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="absolute inset-8 rounded-full border border-[#138808]/30 animate-[spin_8s_linear_infinite]"></div>
              <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full bg-black flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.2)] border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF9933] via-white to-[#138808] opacity-20 rounded-full blur-xl"></div>
                <BrainCircuit size={64} className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] relative z-10 animate-pulse" />
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">
              How can I help you today?
            </h1>
            <p className="text-gray-400 text-center mb-12 max-w-lg px-4">
              I am NovaAI, your advanced sovereign assistant. Ask me anything in your regional language.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full px-6 mb-8">
              <div onClick={() => handlePromptClick("What is the optimal crop rotation for Maharashtra this season based on satellite weather data?")} className="bg-white/5 border border-white/10 hover:border-[#138808]/50 p-4 rounded-2xl cursor-pointer backdrop-blur-md transition-colors group">
                <div className="flex items-center text-[#138808] mb-2 font-semibold">
                  <Tractor size={18} className="mr-2" /> Farmer Mode
                </div>
                <p className="text-sm text-gray-300">"What is the optimal crop rotation for Maharashtra this season based on satellite weather data?"</p>
              </div>
              <div onClick={() => handlePromptClick("Explain quantum mechanics concepts in simple Hindi for my 12th board exams.")} className="bg-white/5 border border-white/10 hover:border-[#FF9933]/50 p-4 rounded-2xl cursor-pointer backdrop-blur-md transition-colors group">
                <div className="flex items-center text-[#FF9933] mb-2 font-semibold">
                  <BookOpen size={18} className="mr-2" /> Student Mode
                </div>
                <p className="text-sm text-gray-300">"Explain quantum mechanics concepts in simple Hindi for my 12th board exams."</p>
              </div>
            </div>
          </div>
        ) : (
                    <div className="flex-1 overflow-y-auto px-4 md:px-20 lg:px-40 hide-scrollbar flex flex-col space-y-6 pb-10">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'ai' && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9933] to-[#138808] flex items-center justify-center mr-4 shrink-0 shadow-[0_0_15px_rgba(255,153,51,0.3)]">
                    <BrainCircuit size={20} className="text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.sender === 'user' 
                    ? 'bg-white/10 border border-white/20 text-white rounded-tr-sm' 
                    : 'bg-black/40 border border-[#138808]/30 text-gray-200 rounded-tl-sm shadow-[inset_0_0_20px_rgba(19,136,8,0.05)]'
                }`}>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center ml-4 shrink-0">
                    <User size={20} className="text-gray-400" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex w-full justify-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9933] to-[#138808] flex items-center justify-center mr-4 shrink-0 shadow-[0_0_15px_rgba(255,153,51,0.3)]">
                  <BrainCircuit size={20} className="text-white animate-pulse" />
                </div>
                <div className="max-w-[80%] rounded-2xl p-4 bg-black/40 border border-[#138808]/30 text-gray-200 rounded-tl-sm flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#FF9933] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-[#138808] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-6 z-20">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FF9933]/30 via-white/10 to-[#138808]/30 rounded-full blur opacity-50"></div>
          <form onSubmit={handleSend} className="relative flex items-center bg-[#0a0a0a] border border-white/20 rounded-full px-2 py-2 shadow-2xl">
            <button type="button" className="p-3 rounded-full hover:bg-white/10 text-gray-400 transition-colors">
              <Mic size={22} className="text-[#138808]" />
            </button>
            <input 
              type="text" 
              placeholder="Message NovaAI..." 
              className="flex-1 bg-transparent border-none outline-none px-4 text-white placeholder-gray-500 text-lg"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className={`p-3 rounded-full transition-all ${input.trim() ? 'bg-gradient-to-r from-[#FF9933] to-[#138808] text-white shadow-[0_0_15px_rgba(255,153,51,0.5)]' : 'bg-white/5 text-gray-500'}`}>
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
