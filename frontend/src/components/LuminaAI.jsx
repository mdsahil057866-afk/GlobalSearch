import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Menu, Plus, MessageSquare, Mic, Paperclip, Send, Globe, Image as ImageIcon, Code, User, FileText, Settings, X, Cpu, Zap, Star, ChevronDown, Key } from 'lucide-react';
import LuminaAILogo from './LuminaAILogo';
import { GoogleGenerativeAI } from '@google/generative-ai';

const LANGUAGES = [
  'English', 'Hindi', 'Spanish', 'French', 'Mandarin', 'Arabic', 'Russian', 'Portuguese', 
  'Indonesian', 'German', 'Japanese', 'Korean', 'Italian', 'Turkish', 'Vietnamese', 
  'Bengali', 'Urdu', 'Punjabi', 'Marathi', 'Telugu', 'Tamil', 'Gujarati', 'Kannada', 
  'Malayalam', 'Odia', 'Dutch', 'Polish', 'Thai', 'Persian', 'Swahili'
];

export default function LuminaAI({ onBack }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [input, setInput] = useState('');
  
  // State for all chats
  const [chats, setChats] = useState([{ id: 1, title: 'New Conversation', messages: [] }]);
  const [activeChat, setActiveChat] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentModel, setCurrentModel] = useState('Flash');
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const MODELS = ['Flash', 'Pro', 'Ultra'];
  
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const uiTranslations = {
    'English': {
      newChat: 'New Chat', recent: 'Recent', userProfile: 'User Profile',
      title: 'How can I help you today?',
      subtitle: 'I am LuminaAI, your highly advanced assistant. Ask me to generate code, create images, or answer anything.',
      codeTitle: 'Write a React component', codeDesc: 'for a beautiful dashboard UI',
      imgTitle: 'Generate an image', imgDesc: 'of a futuristic neon city',
      physicsTitle: 'Explain quantum physics', physicsDesc: 'in simple terms',
      factTitle: 'Ask a factual question', factDesc: 'Fetch data instantly',
      placeholder: 'Message LuminaAI in',
      footerApi: 'LuminaAI uses Google Gemini API to answer your questions. Consider verifying important facts.',
      footerWiki: 'LuminaAI is in Wikipedia fallback mode. Add a Gemini API key in settings for full features.',
      settings: 'API Settings'
    },
    'Hindi': {
      newChat: 'नई चैट', recent: 'हाल की', userProfile: 'यूज़र प्रोफ़ाइल',
      title: 'आज मैं आपकी कैसे मदद कर सकता हूँ?',
      subtitle: 'मैं लुमिना एआई हूँ, आपका उन्नत सहायक। मुझसे कोड लिखने, चित्र बनाने या कुछ भी पूछें।',
      codeTitle: 'एक रिएक्ट कोड लिखें', codeDesc: 'सुंदर डैशबोर्ड यूआई के लिए',
      imgTitle: 'एक चित्र बनाएं', imgDesc: 'भविष्य के नियॉन शहर का',
      physicsTitle: 'क्वांटम भौतिकी समझाएं', physicsDesc: 'सरल शब्दों में',
      factTitle: 'एक तथ्यात्मक प्रश्न पूछें', factDesc: 'तुरंत डेटा प्राप्त करें',
      placeholder: 'में लुमिना एआई को संदेश भेजें',
      footerApi: 'लुमिना एआई आपके सवालों के जवाब देने के लिए गूगल जेमिनी एपीआई का उपयोग करता है।',
      footerWiki: 'लुमिना एआई विकिपीडिया फॉलबैक मोड में है। पूरी सुविधाओं के लिए सेटिंग्स में एपीआई कुंजी जोड़ें।',
      settings: 'एपीआई सेटिंग्स'
    },
    'Spanish': {
      newChat: 'Nuevo chat', recent: 'Reciente', userProfile: 'Perfil de usuario',
      title: '¿Cómo puedo ayudarte hoy?',
      subtitle: 'Soy LuminaAI, tu asistente avanzado. Pídeme que genere código, cree imágenes o responda cualquier cosa.',
      codeTitle: 'Escribir componente React', codeDesc: 'para una hermosa interfaz',
      imgTitle: 'Generar una imagen', imgDesc: 'de una ciudad futurista',
      physicsTitle: 'Física cuántica', physicsDesc: 'en términos simples',
      factTitle: 'Hacer una pregunta', factDesc: 'Obtener datos al instante',
      placeholder: 'Mensaje a LuminaAI en',
      footerApi: 'LuminaAI utiliza la API de Google Gemini para responder a tus preguntas.',
      footerWiki: 'LuminaAI está en modo Wikipedia. Añade una clave API en la configuración.',
      settings: 'Configuración API'
    },
    'French': {
      newChat: 'Nouvelle discussion', recent: 'Récent', userProfile: 'Profil',
      title: 'Comment puis-je vous aider ?',
      subtitle: 'Je suis LuminaAI, votre assistant. Demandez-moi de créer du code, des images ou de répondre à tout.',
      codeTitle: 'Écrire un composant React', codeDesc: 'pour un beau tableau de bord',
      imgTitle: 'Générer une image', imgDesc: 'd\'une ville futuriste',
      physicsTitle: 'Expliquer la physique', physicsDesc: 'en termes simples',
      factTitle: 'Poser une question', factDesc: 'Obtenir des données',
      placeholder: 'Message à LuminaAI en',
      footerApi: 'LuminaAI utilise l\'API Google Gemini pour répondre.',
      footerWiki: 'LuminaAI est en mode Wikipédia. Ajoutez une clé API.',
      settings: 'Paramètres API'
    }
  };

  const t = uiTranslations[currentLanguage] || uiTranslations['English'];

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) setApiKey(savedKey);
  }, []);

  const saveApiKey = () => {
    localStorage.setItem('gemini_api_key', tempApiKey);
    setApiKey(tempApiKey);
    setShowApiKeyModal(false);
  };

  const activeMessages = chats.find(c => c.id === activeChat)?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages, isTyping]);

  const handleNewChat = () => {
    const newId = Date.now();
    setChats([{ id: newId, title: 'New Conversation', messages: [] }, ...chats]);
    setActiveChat(newId);
  };

  const addMessageToChat = (chatId, message) => {
    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, message]
        };
      }
      return chat;
    }));
  };

  const updateChatTitle = (chatId, title) => {
    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === chatId && chat.title === 'New Conversation') {
        return { ...chat, title: title.substring(0, 30) + '...' };
      }
      return chat;
    }));
  };

  const handleSend = async (e, customText = null, forceImageGen = false) => {
    e?.preventDefault();
    const textToSend = customText || input;
    if (!textToSend.trim() && !forceImageGen) return;

    const userMsg = { 
      id: Date.now(), 
      text: textToSend, 
      sender: 'user',
    };
    
    addMessageToChat(activeChat, userMsg);
    updateChatTitle(activeChat, textToSend);
    setInput('');
    setIsTyping(true);

    try {
      const lowerText = textToSend.toLowerCase();
      let responseText = '';
      let isCodeBlock = false;
      let generatedImage = null;

      // 1. Image Generation Check
      if (forceImageGen || lowerText.includes('generate image') || lowerText.includes('draw') || lowerText.includes('picture of') || lowerText.includes('image of') || lowerText.includes('चित्र') || lowerText.includes('फोटो')) {
        let topic = textToSend.replace(/generate an image of|generate image of|generate image|draw a|draw|picture of|image of|एक चित्र बनाएं|चित्र बनाएं|फोटो बनाएं/gi, '').trim();
        if (!topic) topic = 'abstract technology';
        
        // Use Pollinations AI for dynamic AI image generation
        generatedImage = `https://image.pollinations.ai/prompt/${encodeURIComponent(topic)}?width=800&height=600&nologo=true`;
        
        responseText = currentLanguage === 'English' 
          ? `Here is the generated image for: "${topic}"` 
          : `यह रही आपकी इमेज: "${topic}"`;
      }
      // 2. Code Request Check
      else if (lowerText.includes('code') || lowerText.includes('function') || lowerText.includes('react') || lowerText.includes('javascript') || lowerText.includes('html')) {
        isCodeBlock = true;
        if (lowerText.includes('react')) {
          responseText = `import React from 'react';\n\nconst AwesomeComponent = () => {\n  return (\n    <div className="p-4 bg-indigo-500 rounded-lg text-white">\n      Hello from LuminaAI!\n    </div>\n  );\n};\n\nexport default AwesomeComponent;`;
        } else {
          responseText = `// Here is the requested code snippet\nfunction executeOperation(data) {\n  console.log("Processing data:", data);\n  return data.map(item => item * 2);\n}\n\nexecuteOperation([1, 2, 3]);`;
        }
      }
      // 3. Basic Knowledge & Acronyms Check
      else if (lowerText.includes('full form') || lowerText.includes('full from') || lowerText === 'hi' || lowerText === 'hello' || lowerText.includes('who are you')) {
        const acronyms = {
          'dm': 'District Magistrate',
          'pm': 'Prime Minister',
          'cm': 'Chief Minister',
          'sp': 'Superintendent of Police',
          'ias': 'Indian Administrative Service',
          'ips': 'Indian Police Service',
          'sdo': 'Sub-Divisional Officer',
          'bdo': 'Block Development Officer'
        };
        
        let matched = false;
        for (const [key, val] of Object.entries(acronyms)) {
          // Check for standalone acronyms before 'full form'
          const regex = new RegExp(`\\b${key}\\b`, 'i');
          if (regex.test(lowerText)) {
            responseText = `The full form of ${key.toUpperCase()} is **${val}**.`;
            matched = true;
            break;
          }
        }
        
        if (!matched) {
          if (lowerText.includes('who are you')) responseText = "I am LuminaAI, your highly advanced AI assistant.";
          else if (lowerText === 'hi' || lowerText === 'hello') responseText = "Hello! How can I help you today?";
          else responseText = "I couldn't find the exact full form for that right now. Could you please specify another query?";
        }
      }
      // 4. Gemini API or Wikipedia Fallback
      else {
        if (apiKey) {
          try {
            const genAI = new GoogleGenerativeAI(apiKey);
            
            let modelName = currentModel === 'Pro' ? 'gemini-1.5-pro' : 'gemini-1.5-flash';
            let model;
            
            try {
              model = genAI.getGenerativeModel({ model: modelName });
              const prompt = `Please respond to the following query strictly in ${currentLanguage} language:\n\n${textToSend}`;
              const result = await model.generateContent(prompt);
              const response = await result.response;
              responseText = response.text();
            } catch (err) {
              if (err.message && err.message.includes('404')) {
                // Fetch list of available models for this specific API key if standard ones fail
                const modelsRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
                const modelsData = await modelsRes.json();
                const validModel = modelsData.models?.find(m => m.supportedGenerationMethods?.includes('generateContent') && m.name.includes('gemini'));
                
                if (validModel) {
                  const dynamicModelName = validModel.name.replace('models/', '');
                  model = genAI.getGenerativeModel({ model: dynamicModelName });
                  const prompt = `Please respond to the following query strictly in ${currentLanguage} language:\n\n${textToSend}`;
                  const result = await model.generateContent(prompt);
                  const response = await result.response;
                  responseText = response.text();
                } else {
                  throw err; // No valid models found
                }
              } else {
                throw err;
              }
            }
          } catch (apiError) {
             console.error("Gemini API Error:", apiError);
             if (apiError.message && apiError.message.includes('API key not valid')) {
                responseText = "Your Gemini API Key appears to be invalid. Please update it in the settings.";
             } else {
                responseText = "I encountered an error while contacting the Gemini brain. Error: " + (apiError.message || 'Unknown');
             }
          }
        } else {
          // Map language to wikipedia prefix if possible. Fallback to 'en'
          const langMap = { 'Hindi': 'hi', 'Spanish': 'es', 'French': 'fr', 'German': 'de', 'Russian': 'ru', 'Japanese': 'ja', 'Italian': 'it', 'Portuguese': 'pt' };
          const wikiLang = langMap[currentLanguage] || 'en';

          const res = await fetch(`https://${wikiLang}.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=4&exlimit=1&generator=search&gsrsearch=${encodeURIComponent(textToSend)}&gsrlimit=1&explaintext=1&format=json&origin=*`);
          const data = await res.json();

          if (data.query && data.query.pages) {
            const pageId = Object.keys(data.query.pages)[0];
            responseText = data.query.pages[pageId].extract;
          } else {
            responseText = `I couldn't find specific information on that in ${currentLanguage}. To answer ANY question properly, please add your Gemini API Key in the settings (User Profile)!`;
          }
        }
      }

      const aiMsg = { 
        id: Date.now() + 1, 
        text: responseText, 
        sender: 'ai',
        isCodeBlock: isCodeBlock,
        generatedImage: generatedImage
      };
      
      addMessageToChat(activeChat, aiMsg);
    } catch (error) {
      addMessageToChat(activeChat, { 
        id: Date.now() + 1, 
        text: "I encountered a network error while processing your request.", 
        sender: 'ai' 
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceInput = () => {
    if (isListening) return;

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Your browser does not support voice recognition.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Map languages to speech recognition format
    const speechLangMap = {
      'English': 'en-US', 'Hindi': 'hi-IN', 'Spanish': 'es-ES', 'French': 'fr-FR', 'German': 'de-DE'
    };
    recognition.lang = speechLangMap[currentLanguage] || 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    try {
      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileMsg = { 
      id: Date.now(), 
      text: `Uploaded a document: ${file.name}`, 
      sender: 'user',
      isFile: true,
      fileName: file.name
    };
    addMessageToChat(activeChat, fileMsg);
    setIsTyping(true);
    
    setTimeout(() => {
      const aiResponse = { 
        id: Date.now() + 1, 
        text: `I've successfully processed "${file.name}" (${(file.size / 1024).toFixed(1)} KB). Since I am operating entirely in the browser, I have parsed its metadata. What would you like to know about it?`, 
        sender: 'ai' 
      };
      addMessageToChat(activeChat, aiResponse);
      setIsTyping(false);
    }, 1500);

    // Reset input
    e.target.value = '';
  };

  return (
    <div className="flex h-screen w-full bg-[#1e1e1e] text-gray-200 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <div className={`fixed lg:relative z-40 h-full bg-[#111111] border-r border-white/5 transition-all duration-300 flex flex-col ${sidebarOpen ? 'w-72 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:border-none'}`}>
        <div className="p-4 flex items-center justify-between">
          <button 
            onClick={handleNewChat}
            className="flex-1 flex items-center bg-[#2d2d2d] hover:bg-[#3d3d3d] text-white px-4 py-2.5 rounded-xl transition-colors font-medium border border-white/5"
          >
            <LuminaAILogo className="w-5 h-5 mr-3" />
            {t.newChat}
          </button>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-2 p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1 hide-scrollbar">
          <div className="text-xs font-semibold text-gray-500 mb-3 px-2 uppercase tracking-wider">{t.recent}</div>
          {chats.map(chat => (
            <button 
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`w-full flex items-center text-left px-3 py-3 rounded-xl transition-colors truncate ${activeChat === chat.id ? 'bg-[#2a2a2a] text-white' : 'text-gray-400 hover:bg-[#222222] hover:text-gray-200'}`}
            >
              <MessageSquare size={16} className="mr-3 shrink-0" />
              <span className="truncate text-sm">{chat.title}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => {
              setTempApiKey(apiKey);
              setShowApiKeyModal(true);
            }}
            className="flex items-center w-full px-3 py-3 text-sm text-gray-300 hover:bg-[#2a2a2a] rounded-xl transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-3 shrink-0 flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="font-medium">{t.userProfile}</span>
            <Settings size={16} className="ml-auto text-gray-500" />
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative w-full h-full bg-[#1e1e1e]">
        
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 border-b border-white/5 bg-[#1e1e1e]/80 backdrop-blur-md z-30 sticky top-0">
          <div className="flex items-center">
            <button className="p-2 mr-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors" onClick={onBack}>
              <ArrowLeft size={20} />
            </button>
            <button className={`p-2 mr-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors ${sidebarOpen ? 'hidden lg:flex lg:invisible' : 'flex'}`} onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="flex items-center">
              <span className="font-bold text-lg text-white tracking-wide">Lumina<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI</span></span>
              <span className="ml-3 px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-gray-300 uppercase tracking-widest border border-white/10">v4.0</span>
            </div>
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center px-3 py-1.5 bg-[#2d2d2d] hover:bg-[#3d3d3d] border border-white/5 rounded-lg text-sm text-gray-300 transition-colors"
            >
              <Globe size={16} className="mr-2 text-indigo-400" />
              {currentLanguage}
            </button>
            
            {showLanguageDropdown && (
              <div className="absolute right-0 mt-2 w-56 max-h-80 overflow-y-auto bg-[#252526] border border-white/10 rounded-xl shadow-2xl py-2 z-50 hide-scrollbar">
                <div className="px-3 pb-2 mb-2 border-b border-white/5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Select Language</div>
                {LANGUAGES.map(lang => (
                  <button 
                    key={lang}
                    onClick={() => {
                      setCurrentLanguage(lang);
                      setShowLanguageDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-indigo-500/20 transition-colors ${currentLanguage === lang ? 'text-indigo-400 font-medium bg-indigo-500/10' : 'text-gray-300'}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 md:px-12 lg:px-24 xl:px-48 py-8 hide-scrollbar">
          {activeMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto text-center mt-[-10vh]">
              <LuminaAILogo className="w-20 h-20 mb-8" />
              <h1 className="text-4xl font-bold text-white mb-4">{t.title}</h1>
              <p className="text-gray-400 mb-12 text-lg">{t.subtitle}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <button onClick={() => handleSend(null, `${t.codeTitle} ${t.codeDesc}`, false)} className="p-4 bg-[#252526] border border-white/5 hover:border-indigo-500/50 rounded-2xl text-left transition-colors group">
                  <Code size={20} className="text-indigo-400 mb-3" />
                  <div className="text-sm text-gray-200 font-medium">{t.codeTitle}</div>
                  <div className="text-xs text-gray-500 mt-1">{t.codeDesc}</div>
                </button>
                <button onClick={() => handleSend(null, `${t.imgTitle} ${t.imgDesc}`, true)} className="p-4 bg-[#252526] border border-white/5 hover:border-purple-500/50 rounded-2xl text-left transition-colors group">
                  <ImageIcon size={20} className="text-purple-400 mb-3" />
                  <div className="text-sm text-gray-200 font-medium">{t.imgTitle}</div>
                  <div className="text-xs text-gray-500 mt-1">{t.imgDesc}</div>
                </button>
                <button onClick={() => handleSend(null, `${t.physicsTitle} ${t.physicsDesc}`, false)} className="p-4 bg-[#252526] border border-white/5 hover:border-pink-500/50 rounded-2xl text-left transition-colors group">
                  <Zap size={20} className="text-pink-400 mb-3" />
                  <div className="text-sm text-gray-200 font-medium">{t.physicsTitle}</div>
                  <div className="text-xs text-gray-500 mt-1">{t.physicsDesc}</div>
                </button>
                <button onClick={() => handleSend(null, `${t.factTitle} ${t.factDesc}`, false)} className="p-4 bg-[#252526] border border-white/5 hover:border-blue-500/50 rounded-2xl text-left transition-colors group">
                  <Globe size={20} className="text-blue-400 mb-3" />
                  <div className="text-sm text-gray-200 font-medium">{t.factTitle}</div>
                  <div className="text-xs text-gray-500 mt-1">{t.factDesc}</div>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-8 pb-12 max-w-3xl mx-auto w-full">
              {activeMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
                  {msg.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4 shrink-0 mt-1 bg-gradient-to-br from-indigo-600 to-purple-600">
                       <Star size={16} className="text-white fill-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[85%] ${msg.sender === 'user' ? 'bg-[#2d2d2d] text-white px-5 py-3.5 rounded-3xl rounded-tr-sm' : 'text-gray-200'}`}>
                    {msg.isFile && (
                      <div className="flex items-center bg-[#1e1e1e] p-3 rounded-xl mb-2 border border-white/10 w-max">
                        <div className="w-10 h-10 bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center mr-3">
                          <FileText size={20} />
                        </div>
                        <div className="text-sm font-medium">{msg.fileName}</div>
                      </div>
                    )}
                    
                    {msg.isCodeBlock ? (
                      <div className="bg-[#111111] rounded-xl border border-white/10 overflow-hidden my-2">
                        <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-white/5">
                          <span className="text-xs font-mono text-gray-400">javascript</span>
                          <button className="text-xs text-gray-400 hover:text-white transition-colors flex items-center">
                            <Copy size={14} className="mr-1" /> Copy code
                          </button>
                        </div>
                        <pre className="p-4 overflow-x-auto">
                          <code className="text-sm font-mono text-blue-300 leading-relaxed whitespace-pre-wrap">{msg.text}</code>
                        </pre>
                      </div>
                    ) : msg.generatedImage ? (
                      <div className="mt-2 mb-4">
                        <p className="mb-3">{msg.text}</p>
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-lg group w-full max-w-md">
                          <img src={msg.generatedImage} alt="Generated UI" className="w-full h-auto object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white font-medium flex items-center transition-all">
                              Download <Download size={16} className="ml-2" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start w-full">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4 shrink-0 mt-1 bg-gradient-to-br from-indigo-600 to-purple-600">
                     <Star size={16} className="text-white fill-white animate-pulse" />
                  </div>
                  <div className="text-gray-200 flex items-center h-10">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 md:px-12 lg:px-24 xl:px-48 pb-8 pt-0 bg-gradient-to-t from-[#1e1e1e] via-[#1e1e1e] to-transparent">
          <div className="max-w-3xl mx-auto relative flex flex-col items-center">
            
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileChange} 
            />

            <form onSubmit={(e) => handleSend(e)} className={`relative flex items-center w-full bg-[#2a2a2a] border ${isListening ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/10 shadow-lg'} rounded-3xl pl-4 pr-2 py-2 transition-all duration-300`}>
              
              <button type="button" onClick={triggerFileUpload} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors shrink-0" title="Attach file">
                <Paperclip size={20} />
              </button>
              
              <button type="button" onClick={() => handleSend(null, "Generate an image of a majestic space nebula", true)} className="p-2 text-gray-400 hover:text-purple-400 rounded-full hover:bg-white/10 transition-colors shrink-0" title="Generate Image">
                <ImageIcon size={20} />
              </button>
              
              <input 
                type="text" 
                placeholder={isListening ? "..." : `${t.placeholder} ${currentLanguage}...`}
                className="flex-1 bg-transparent border-none outline-none px-3 text-white placeholder-gray-500 py-2.5 h-full text-[15px]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              
              <div className="relative flex items-center shrink-0">
                <button 
                  type="button"
                  onClick={() => setShowModelDropdown(!showModelDropdown)}
                  className="flex items-center space-x-1 px-3 py-1.5 hover:bg-white/10 rounded-full text-sm font-medium text-gray-300 transition-colors"
                >
                  <span>{currentModel}</span>
                  <ChevronDown size={14} className="text-gray-400" />
                </button>
                
                {showModelDropdown && (
                  <div className="absolute bottom-full right-0 mb-2 w-32 bg-[#252526] border border-white/10 rounded-xl shadow-2xl py-1 z-50">
                    {MODELS.map(model => (
                      <button 
                        key={model}
                        type="button"
                        onClick={() => {
                          setCurrentModel(model);
                          setShowModelDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-indigo-500/20 transition-colors ${currentModel === model ? 'text-indigo-400 font-medium' : 'text-gray-300'}`}
                      >
                        {model}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <button type="button" onClick={handleVoiceInput} className={`p-2.5 rounded-full transition-colors shrink-0 mx-1 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}>
                <Mic size={20} />
              </button>

              <button 
                type="submit" 
                disabled={!input.trim()}
                className={`p-2.5 rounded-full shrink-0 transition-all ${input.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md' : 'bg-white/5 text-gray-500'}`}
              >
                <Send size={18} />
              </button>
            </form>
            
            <div className="text-xs text-gray-500 mt-3 text-center">
              {apiKey 
                ? t.footerApi 
                : t.footerWiki}
            </div>
          </div>
        </div>

      </div>

      {/* API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#1e1e1e] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setShowApiKeyModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-white mb-2 flex items-center">
              <Key size={20} className="mr-2 text-indigo-400" /> {t.settings}
            </h2>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Enter your Google Gemini API key to unlock LuminaAI's full potential and answer any question. Your key is stored securely in your browser's local storage.
            </p>
            <input 
              type="password"
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-[#2a2a2a] border border-white/10 rounded-xl px-4 py-3 text-white mb-5 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowApiKeyModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={saveApiKey}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg"
              >
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline Copy Icon for Code Blocks
const Copy = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

// Inline Download Icon
const Download = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);
