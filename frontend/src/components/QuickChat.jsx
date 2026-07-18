import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { ArrowLeft, Search, MoreVertical, Phone, Video, Paperclip, Smile, Mic, Send, ShieldCheck, Check, CheckCheck, Plus, X, UserPlus, IndianRupee, Languages, Calendar, AudioWaveform, Ghost, WifiOff, FileText, Zap, MapPin, Navigation2, CircleDashed, Users, MessageSquare, Camera, Image as ImageIcon, Type, Eye, ChevronUp, Brain, Radio, Edit, Info, Reply, SmilePlus, ChevronDown, Home, Compass, Clapperboard, Heart, SquarePlus, Menu, Settings, Moon, Sun, Trash2, Star, Lock, Key, Bell, Keyboard, HelpCircle, LogOut, Monitor, Smartphone, QrCode, RotateCw } from 'lucide-react';
import chatLogoImg from '../assets/quickchat_logo.png';

// --- QuickChat Security & Anti-Hack Engine ---
const scanForMaliciousContent = (text) => {
  if (!text) return { isMalicious: false, cleanText: text };
  // Detect raw IPv4 addresses (common in phishing/hacking)
  const ipPattern = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
  // Detect unverified http links or suspicious top-level domains
  const suspiciousLinkPattern = /(http:\/\/[^\s]+)|(https:\/\/[^\s]+\.(xyz|tk|ml|ga|cf|gq|club|win))/i;
  
  if (ipPattern.test(text) || suspiciousLinkPattern.test(text)) {
    return { isMalicious: true, cleanText: "⚠️ [Malicious Link Blocked for Your Security]" };
  }
  return { isMalicious: false, cleanText: text };
};

const encryptData = (payload) => {
  // Simulated Client-Side E2EE Encryption
  return {
    ...payload,
    text: payload.text, // Normally encrypted here
    _isE2EE: true,
    _securityHash: Math.random().toString(36).substring(2)
  };
};

const decryptData = (payload) => {
  // Simulated Client-Side E2EE Decryption
  return payload;
};
// ----------------------------------------------
export default function QuickChat({ onBack }) {
  const [socket, setSocket] = useState(null);
  const [currentUserId, setCurrentUserId] = useState('default_user_id');
  const [activeChat, setActiveChat] = useState(1);
  const [message, setMessage] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [callType, setCallType] = useState('audio');
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);
  const [ghostMode, setGhostMode] = useState(false);
  const [meshMode, setMeshMode] = useState(false);
  const [aiGuardian, setAiGuardian] = useState(true);
  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [slashCommandActive, setSlashCommandActive] = useState(null);
  const [isThoughtMode, setIsThoughtMode] = useState(false);
  const [isScanningBrain, setIsScanningBrain] = useState(false);
  const [sidebarTab, setSidebarTab] = useState('chats');
  const [isAddingStatus, setIsAddingStatus] = useState(false);
  const [isAddingToGroup, setIsAddingToGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupMemberInput, setGroupMemberInput] = useState('');
  const [isViewingStatus, setIsViewingStatus] = useState(null);
  const [statusUploadType, setStatusUploadType] = useState(null);
  const [newStatusContent, setNewStatusContent] = useState('');
  const [newStatusBgColor, setNewStatusBgColor] = useState('bg-gradient-to-br from-blue-500 to-purple-600');
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');
  const [newGroupIcon, setNewGroupIcon] = useState(null);
  
  const [sidebarWidth, setSidebarWidth] = useState(380);
  const [isResizing, setIsResizing] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [aiSummary, setAiSummary] = useState(null);
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [draggedChatIndex, setDraggedChatIndex] = useState(null);
  
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentNote, setPaymentNote] = useState('');
  
  const [isSidebarMenuOpen, setIsSidebarMenuOpen] = useState(false);
  
  const [isSelectingChats, setIsSelectingChats] = useState(false);
  const [selectedChats, setSelectedChats] = useState([]);
  const [isViewingStarred, setIsViewingStarred] = useState(false);
  const [isViewingSettings, setIsViewingSettings] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState('main');
  const [profilePhoto, setProfilePhoto] = useState("https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop");
  const [starredMessages, setStarredMessages] = useState([]);
  const [isAppLocked, setIsAppLocked] = useState(false);
  const [appPin, setAppPin] = useState('');
  const [enteredPin, setEnteredPin] = useState('');
  const [isSettingPin, setIsSettingPin] = useState(false);
  const [isChatMenuOpen, setIsChatMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [isPromoVisible, setIsPromoVisible] = useState(false);
  const [loginStep, setLoginStep] = useState('qr_interface');
  const [browserUrlInput, setBrowserUrlInput] = useState('');
  const [loginOtp, setLoginOtp] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  
  // Linked Devices States
  const [isViewingLinkedDevices, setIsViewingLinkedDevices] = useState(false);
  const [isScanningQR, setIsScanningQR] = useState(false);
  const [linkedDevices, setLinkedDevices] = useState([
    { id: 1, name: 'Windows PC', os: 'Windows 11', browser: 'IndiBrowser', lastActive: 'Active now', location: 'Mumbai, India', type: 'desktop' },
    { id: 2, name: 'MacBook Pro', os: 'macOS', browser: 'Safari', lastActive: 'Yesterday, 10:45 AM', location: 'Delhi, India', type: 'laptop' }
  ]);

  // Active Chat Menu States
  const [isContactInfoOpen, setIsContactInfoOpen] = useState(false);
  const [isChatSearchOpen, setIsChatSearchOpen] = useState(false);
  const [chatSearchQuery, setChatSearchQuery] = useState('');
  const [isSelectingMessages, setIsSelectingMessages] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isMuteModalOpen, setIsMuteModalOpen] = useState(false);
  const [isDisappearingModalOpen, setIsDisappearingModalOpen] = useState(false);
  const [isAddToListModalOpen, setIsAddToListModalOpen] = useState(false);
  const [isCallLinkModalOpen, setIsCallLinkModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  
  const messagesEndRef = useRef(null);
  const profilePhotoInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const statusFileInputRef = useRef(null);
  const groupIconInputRef = useRef(null);

  useEffect(() => {
    const newSocket = io((import.meta.env.VITE_BACKEND_URL || ''));
    setSocket(newSocket);
    
    newSocket.emit('join_room', currentUserId);

    const initChat = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL || ''}/api/social/contacts`, { withCredentials: true });
        if (res.data && res.data.length > 0) {
          setChats([chatsData[0], ...res.data]);
        }
      } catch (err) {
        console.error('Error fetching contacts:', err);
      }
    };
    initChat();

    return () => newSocket.close();
  }, [currentUserId]);

  useEffect(() => {
    if (!socket) return;
    
    socket.on('receive_message', (message) => {
      const decryptedMsg = decryptData(message);
      const senderId = decryptedMsg.sender;
      
      setMessageThreads(prev => {
        const currentThread = prev[senderId] || [];
        if (currentThread.find(m => m.id === decryptedMsg._id)) return prev;
        
        const scanResult = scanForMaliciousContent(decryptedMsg.text);
        
        return {
          ...prev,
          [senderId]: [...currentThread, {
            id: decryptedMsg._id,
            text: scanResult.cleanText,
            isMalicious: scanResult.isMalicious,
            time: new Date(decryptedMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sender: 'them'
          }]
        };
      });
      
      if (activeChat !== senderId) {
        setChats(prev => prev.map(c => c.id === senderId ? { ...c, unread: (c.unread || 0) + 1, lastMsg: decryptedMsg.text } : c));
      }
    });

    return () => socket.off('receive_message');
  }, [socket, activeChat]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeChat || activeChat === 1) return;
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL || ''}/api/social/messages/${activeChat}`, { withCredentials: true });
        const formatted = res.data.map(msg => {
          const decryptedMsg = decryptData(msg);
          const scanResult = scanForMaliciousContent(decryptedMsg.text);
          return {
            id: decryptedMsg._id,
            text: scanResult.cleanText,
            isMalicious: scanResult.isMalicious,
            time: new Date(decryptedMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sender: decryptedMsg.sender === currentUserId ? 'me' : 'them'
          };
        });
        if (formatted.length > 0) {
          setMessageThreads(prev => ({ ...prev, [activeChat]: formatted }));
        }
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };
    fetchMessages();
  }, [activeChat, currentUserId]);

  const chatsData = [
    { id: 1, name: 'AI Assistant (Bharat)', time: '10:45 AM', lastMsg: 'I have scheduled your meeting.', unread: 0, isAi: true, avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop', activeStatus: 'Active now', hasGreenDot: true },
    { id: 2, name: 'itz shayari', time: '36m', lastMsg: 'Rukiye ammi ha', unread: 0, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop', activeStatus: 'Active 35m ago', hasGreenDot: false },
    { id: 3, name: 'Tech Team Alpha', time: 'Yesterday', lastMsg: 'Priya: The new server is up.', unread: 0, avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop', activeStatus: 'Active 2h ago', hasGreenDot: false },
    { id: 4, name: 'Mom', time: 'Yesterday', lastMsg: 'Did you eat?', unread: 0, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', activeStatus: 'Active 5h ago', hasGreenDot: false },
    { id: 5, name: 'Bharat Dev Team 🇮🇳', time: '11:58 AM', lastMsg: 'Harpreet: ਹਾਂਜੀ, ਸਭ...', unread: 6, isGroup: true, avatar: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=100&h=100&fit=crop', activeStatus: 'Active now', hasGreenDot: true }
  ];

  const notesData = [
    { id: 1, name: 'Er. sahil shaikh', note: 'Gaadi Paac...', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop' },
    { id: 2, name: 'itz shayari', note: 'Lat Lag Ga...', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
    { id: 3, name: 'Naved', note: 'Kiye Duniya', avatar: 'https://ui-avatars.com/api/?name=Naved&background=random' }
  ];

  const [chats, setChats] = useState(chatsData);

  const initialStatusData = [
    { id: 1, name: 'My Status', time: 'Tap to add status update', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop', isMine: true },
    { id: 2, name: 'Priya (Tech)', time: '10 minutes ago', avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop', hasUpdate: true },
    { id: 3, name: 'Mom', time: 'Today, 8:30 AM', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', hasUpdate: true }
  ];
  
  const [statuses, setStatuses] = useState(initialStatusData);

  const initialCommunitiesData = [
    { id: 1, name: 'Bharat Developers Network', desc: '15.2k members', avatar: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&h=100&fit=crop', chatId: 5 },
    { id: 2, name: 'AI & Quantum Enthusiasts', desc: '8.4k members', avatar: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=100&h=100&fit=crop', chatId: 3 }
  ];
  
  const [communities, setCommunities] = useState(initialCommunitiesData);

  const callHistoryData = [
    { id: 1, name: 'Rahul Sharma', time: 'Today, 10:45 AM', type: 'holographic', incoming: true, missed: false, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop', chatId: 2 },
    { id: 2, name: 'Tech Team Alpha', time: 'Yesterday, 6:00 PM', type: 'audio', incoming: false, missed: false, avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop', chatId: 3 },
    { id: 3, name: 'Mom', time: 'Yesterday, 2:30 PM', type: 'video', incoming: true, missed: true, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', chatId: 4 }
  ];

  const initialMessages = {
    1: [
      { id: 1, text: 'Hello! How can I assist you today?', time: '10:40 AM', sender: 'ai' },
      { id: 2, text: 'Can you summarize my unread emails?', time: '10:42 AM', sender: 'me' },
      { id: 3, text: 'You have 3 unread emails. 2 from work and 1 from Amazon regarding your delivery.', time: '10:43 AM', sender: 'ai' },
      { id: 4, text: 'Great, schedule a meeting with Rahul at 5 PM.', time: '10:44 AM', sender: 'me' },
      { id: 5, text: 'I have scheduled your meeting.', time: '10:45 AM', sender: 'ai' },
      { id: 6, text: 'धन्यवाद! क्या आप मुझे आज का मौसम बता सकते हैं?', time: '10:46 AM', sender: 'them', originalLang: 'hi' }
    ],
    2: [
      { id: 1, text: 'Nahi', time: '09:25 AM', sender: 'them' },
      { id: 2, text: 'Fir mujhse baat nahi kar paya ga', time: '09:28 AM', sender: 'them' },
      { id: 3, text: 'Acha', time: '09:30 AM', sender: 'them' },
      { id: 4, text: 'Thik hai', time: '09:32 AM', sender: 'them' },
      { id: 5, text: 'You started an audio call', time: '09:35 AM', isSystem: true },
      { id: 6, text: 'Audio call ended', time: '09:45 AM', isSystem: true },
      { id: 7, text: 'Rukiye ammi ha', time: '36m', sender: 'them' }
    ],
    3: [
      { id: 1, text: 'Priya: The new server is up.', time: 'Yesterday', sender: 'them' }
    ],
    4: [
      { id: 1, text: 'Did you eat?', time: 'Yesterday', sender: 'them' }
    ],
    5: [
      { id: 1, text: 'Arjun: Hey team, build deployed successfully.', time: '11:45 AM', sender: 'them', originalLang: 'en' },
      { id: 2, text: 'Priya: गज़ब! मैंने API endpoints भी टेस्ट कर लिए हैं। सब परफेक्ट चल रहा है।', time: '11:48 AM', sender: 'them', originalLang: 'hi' },
      { id: 3, text: 'Surya: வணக்கம்! UI ரெஸ்பான்சிவ் ஆக இருக்கிறதா என்று சோதித்தீர்களா?', time: '11:50 AM', sender: 'them', originalLang: 'ta' },
      { id: 4, text: 'Rahul: হ্যা, আমি মোবাইল ভিউ চেক করেছি। দারুন লাগছে!', time: '11:55 AM', sender: 'them', originalLang: 'bn' },
      { id: 5, text: 'Harpreet: ਹਾਂਜੀ, ਸਭ ਕੁਝ ਵਧੀਆ ਕੰਮ ਕਰ ਰਿਹਾ ਹੈ।', time: '11:58 AM', sender: 'them', originalLang: 'pa' },
    ]
  };

  const smartReplies = {
    1: ['Show me my schedule', 'Read the Amazon email', 'Thanks!'],
    2: ['On my way!', 'Running 5 mins late', 'Can\'t make it today'],
    3: ['Great work!', 'Is the database synced?', 'Acknowledge'],
    4: ['Yes, just ate.', 'Not yet', 'Eating now!']
  };

  const [messageThreads, setMessageThreads] = useState(initialMessages);
  const currentMessages = messageThreads[activeChat] || [];
  const activeChatData = chats.find(c => c.id === activeChat) || chats[0];
  const currentSmartReplies = smartReplies[activeChat] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageThreads, activeChat]);

  const emojis = ['😀', '😂', '🥰', '😎', '🙏', '🔥', '🚀', '✨', '👍', '❤️'];

  const handleMessageChange = (e) => {
    const val = e.target.value;
    setMessage(val);
    
    
    if (val === '/aadhaar') setSlashCommandActive('aadhaar');
    else if (val === '/pan') setSlashCommandActive('pan');
    else if (val === '/pay') setSlashCommandActive('pay');
    else setSlashCommandActive(null);
  };

  const handleSaveContact = async () => {
    const identifier = newContactNumber || newContactName;
    if (!identifier.trim()) return;
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL || ''}/api/social/contacts/add`, { identifier }, { withCredentials: true });
      if (res.data && res.data.contact) {
        const newChat = res.data.contact;
        setChats([newChat, ...chats]);
        setMessageThreads(prev => ({ ...prev, [newChat.id]: [] }));
        setIsAddingContact(false);
        setNewContactName('');
        setNewContactNumber('');
        setActiveChat(newChat.id);
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add contact');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newMsg = {
      id: currentMessages.length + 1,
      text: `Sent an attachment: ${file.name}`,
      isImage: file.type.startsWith('image/'),
      imageUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me'
    };
    
    setMessageThreads(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMsg]
    }));
  };

  const handleLocationSend = () => {
    const newMsg = {
      id: currentMessages.length + 1,
      isLocation: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me'
    };
    
    setMessageThreads(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMsg]
    }));
  };

  const sendSmartReply = (reply) => {
    setMessage(reply);
    handleSendMessage(null, reply);
  };

  const executeSlashCommand = (cmd) => {
    let newMsg = {
      id: currentMessages.length + 1,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me'
    };

    if (cmd === 'aadhaar') {
      newMsg.text = '';
      newMsg.isDoc = true;
      newMsg.docTitle = 'Aadhaar Card (Verified via DigiLocker)';
      newMsg.docColor = 'bg-blue-900/40 border-blue-500/50';
    } else if (cmd === 'pan') {
      newMsg.text = '';
      newMsg.isDoc = true;
      newMsg.docTitle = 'PAN Card (Verified via DigiLocker)';
      newMsg.docColor = 'bg-orange-900/40 border-orange-500/50';
    } else if (cmd === 'pay') {
      newMsg.text = '₹500';
      newMsg.paymentNote = 'From Slash Command';
      newMsg.isPayment = true;
    }

    setMessageThreads(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMsg]
    }));
    setMessage('');
    setSlashCommandActive(null);
  };

  const handleSendPayment = () => {
    if (!paymentAmount.trim()) return;
    
    let newMsg = {
      id: currentMessages.length + 1,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
      isPayment: true,
      text: `₹${paymentAmount}`,
      paymentNote: paymentNote
    };

    setMessageThreads(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMsg]
    }));
    
    setIsPaymentModalOpen(false);
    setPaymentAmount('');
    setPaymentNote('');
  };

  const handleVoiceNote = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
      // Simulate sending a live translated voice note
      const newMsg = {
        id: currentMessages.length + 1,
        text: 'Voice Note (Translated to Tamil)',
        isVoice: true,
        duration: '0:12',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'me'
      };
      setMessageThreads(prev => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), newMsg]
      }));
    }
  };

  const handleThoughtToText = () => {
    if (!isThoughtMode) {
      setIsThoughtMode(true);
      setIsScanningBrain(true);
      setTimeout(() => {
        setIsScanningBrain(false);
        setMessage("Let's schedule a meeting with the tech team tomorrow.");
      }, 2500);
    } else {
      setIsThoughtMode(false);
      setIsScanningBrain(false);
      setMessage("");
    }
  };

  const handleUploadStatus = () => {
    setStatuses(prev => prev.map(s => 
      s.isMine ? { 
        ...s, 
        time: 'Just now', 
        hasUpdate: true, 
        statusImage: (statusUploadType === 'image' || statusUploadType === 'video') ? newStatusContent : null,
        statusText: statusUploadType === 'text' ? newStatusContent : null,
        statusBgColor: statusUploadType === 'text' ? newStatusBgColor : null,
        statusContentType: statusUploadType
      } : s
    ));
    setIsAddingStatus(false);
    setStatusUploadType(null);
    setNewStatusContent('');
  };

  const handleStatusFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewStatusContent(URL.createObjectURL(file));
      if (file.type.startsWith('video/')) {
        setStatusUploadType('video');
      } else {
        setStatusUploadType('image');
      }
    }
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;
    
    const newChatId = chats.length + 1;
    const newChat = {
      id: newChatId,
      name: newGroupName,
      time: 'Just now',
      lastMsg: 'Group created.',
      unread: 0,
      isGroup: true,
      avatar: newGroupIcon || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop'
    };
    setChats(prev => [newChat, ...prev]);

    const newGroup = {
      id: communities.length + 1,
      name: newGroupName,
      desc: newGroupDesc || 'New community',
      avatar: newGroupIcon || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
      chatId: newChatId
    };
    
    setCommunities(prev => [newGroup, ...prev]);
    setIsCreatingGroup(false);
    setNewGroupName('');
    setNewGroupDesc('');
    setNewGroupIcon(null);
    
    setActiveChat(newChatId);
    setSidebarTab('chats');
  };

  const handleGroupIconSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewGroupIcon(URL.createObjectURL(file));
    }
  };

  const handleStatusClick = (status) => {
    if (status.isMine) {
      if (status.hasUpdate) {
        setIsViewingStatus(status);
      } else {
        setIsAddingStatus(true);
      }
    } else {
      setIsViewingStatus(status);
    }
  };

  const handleSendMessage = (e, forcedText = null) => {
    if (e) e.preventDefault();
    const textToSend = forcedText || message;
    
    if (slashCommandActive) {
      executeSlashCommand(slashCommandActive);
      return;
    }

    if (!textToSend.trim()) return;
    
    const scanResult = scanForMaliciousContent(textToSend);
    
    const newMsg = {
      id: currentMessages.length + 1,
      text: scanResult.cleanText,
      isMalicious: scanResult.isMalicious,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me'
    };
    
    setMessageThreads(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMsg]
    }));
    setMessage('');
    setShowEmojis(false);
    
    if (activeChat !== 1) {
      const encryptedPayload = encryptData({
        recipientId: activeChat,
        text: textToSend
      });
      axios.post(`${import.meta.env.VITE_BACKEND_URL || ''}/api/social/messages`, encryptedPayload, { withCredentials: true })
        .catch(err => console.error('Failed to send message:', err));
    }
    
    if (activeChat === 1) {
      setTimeout(() => {
        setMessageThreads(prev => ({
          ...prev,
          1: [...(prev[1] || []), {
            id: (prev[1] || []).length + 1,
            text: 'I have processed your request. Is there anything else?',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sender: 'ai'
          }]
        }));
      }, 1000);
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    const newWidth = e.clientX - 60; // 60px is the width of the leftmost navigation
    if (newWidth >= 280 && newWidth <= 600) {
      setSidebarWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleGenerateSummary = () => {
    setIsSummarizing(true);
    setTimeout(() => {
      setAiSummary("AI Summary: The team successfully deployed the new build and confirmed API stability and mobile UI responsiveness.");
      setIsSummarizing(false);
    }, 1500);
  };

  const handleDeleteContact = (e, id) => {
    e.stopPropagation();
    const updatedChats = chats.filter(c => c.id !== id);
    setChats(updatedChats);
    if (activeChat === id) {
      setActiveChat(updatedChats[0]?.id || null);
    }
    const newThreads = { ...messageThreads };
    delete newThreads[id];
    setMessageThreads(newThreads);
  };

  const handleDragStart = (e, index) => {
    setDraggedChatIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    setTimeout(() => {
      e.target.style.opacity = '0.5';
    }, 0);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedChatIndex === null || draggedChatIndex === dropIndex) return;
    
    const newChats = [...chats];
    const draggedItem = newChats[draggedChatIndex];
    newChats.splice(draggedChatIndex, 1);
    newChats.splice(dropIndex, 0, draggedItem);
    
    setChats(newChats);
    setDraggedChatIndex(null);
  };
  
  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedChatIndex(null);
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (loginPhone.trim()) {
      setLoginStep('otp');
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (loginOtp.trim()) {
      setLoginStep('verifying');
      setTimeout(() => {
        setIsLoggedIn(true);
        setLoginStep('phone');
      }, 2000);
    }
  };

  const handleDownloadClick = () => {
    setIsDownloading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        clearInterval(interval);
        setDownloadProgress(100);
        setTimeout(() => {
          setIsPromoVisible(false);
          setIsDownloading(false);
          setDownloadProgress(0);
        }, 800);
      } else {
        setDownloadProgress(progress);
      }
    }, 300);
  };

  if (!isLoggedIn) {

    if (loginStep === 'qr_interface') {
      return (
        <div className="flex flex-col h-screen w-full bg-[#f8f7f3] font-sans text-[#111b21] relative overflow-hidden">
          <div className="flex items-center space-x-4 p-2 bg-[#f1f3f4] border-b border-gray-300 shrink-0 absolute top-0 left-0 right-0 z-10">
            <div className="flex space-x-2 text-gray-600">
              <button onClick={onBack} className="p-1 hover:bg-gray-200 rounded-full"><ArrowLeft size={20}/></button>
              <button className="p-1 hover:bg-gray-200 rounded-full opacity-50"><ArrowLeft size={20} className="transform rotate-180"/></button>
              <button className="p-1 hover:bg-gray-200 rounded-full"><RotateCw size={18}/></button>
            </div>
            <div className="flex-1">
              <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-1.5 shadow-inner max-w-2xl mx-auto cursor-text">
                <Lock size={14} className="text-gray-500 mr-2"/>
                <span className="text-sm">web.quickchat.in</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">U</div>
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col items-center pt-24 pb-12 px-4 relative bg-[#f8f7f3]">
            <div className="w-full max-w-[1000px]">
              <div className="bg-white rounded-2xl border border-gray-300 p-6 flex items-center justify-between mb-8 shadow-sm">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-10 flex items-center justify-center relative">
                    <Monitor size={36} className="text-[#3b4a54]" />
                    <div className="absolute -bottom-1.5 -right-1.5 bg-gradient-to-r from-green-500 to-emerald-600 p-1 rounded-full border-2 border-white">
                      <Phone size={10} className="text-white" fill="white"/>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-[#111b21] mb-1">Download QuickChat for Desktop</h2>
                    <p className="text-sm text-[#3b4a54]">Get extra features like holographic calling, brain-sync and more.</p>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium px-6 py-2.5 rounded-full flex items-center space-x-2 transition-all shadow-md hover:shadow-lg">
                  <span>Download</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-300 p-12 shadow-sm relative overflow-hidden">
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="max-w-[480px] pr-8">
                    <h1 className="text-3xl font-light text-[#111b21] mb-10">Scan to log in</h1>
                    
                    <ol className="space-y-6 text-[#3b4a54] text-[17px] list-none relative mb-8">
                      <li className="flex items-start">
                        <span className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-sm mr-5 shrink-0 mt-0.5 font-medium">1</span>
                        <span>Scan the QR code with your phone's camera</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-sm mr-5 shrink-0 mt-0.5 font-medium">2</span>
                        <span>Tap the link to open QuickChat <span className="inline-flex bg-gradient-to-r from-green-500 to-emerald-600 rounded-full p-0.5 ml-1"><Phone size={12} fill="white" className="text-white"/></span></span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-sm mr-5 shrink-0 mt-0.5 font-medium">3</span>
                        <span>Scan the QR code again to link to your account</span>
                      </li>
                    </ol>

                    <div className="mt-8">
                      <a href="#" className="text-emerald-600 hover:underline font-medium text-[15px] flex items-center">
                        Need help? <svg className="w-3.5 h-3.5 ml-1 transform -rotate-45 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </a>
                    </div>
                  </div>

                  <div className="mt-10 lg:mt-0 flex flex-col items-center justify-center">
                    <div className="relative p-2 cursor-pointer group" onClick={() => {
                        setLoginStep('qr_verifying');
                        setTimeout(() => {
                          setIsLoggedIn(true);
                          setLoginStep('qr_interface');
                        }, 2000);
                      }}>
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=264x264&data=QuickChat_Secure_Login_Demo" alt="QR Code" className="w-[264px] h-[264px] object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white p-1 rounded-full shadow-md">
                          <img src={chatLogoImg} className="w-12 h-12 rounded-full" alt="logo" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-16 flex items-center justify-between">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className="w-5 h-5 rounded bg-emerald-600 flex items-center justify-center text-white">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-[#3b4a54] text-[15px] font-medium">Stay logged in on this browser</span>
                    <Info size={16} className="text-gray-400 group-hover:text-gray-500" />
                  </label>
                  
                  <button onClick={() => setLoginStep('phone')} className="text-emerald-600 hover:underline font-medium text-[15px] transition-colors flex items-center space-x-1">
                    <span>Log in with phone number</span>
                    <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
              
              <div className="text-center mt-12 text-[#54656f] text-[15px]">
                Don't have a QuickChat account? <button onClick={() => setLoginStep('phone')} className="text-emerald-600 hover:underline font-medium ml-1 flex items-center justify-center mx-auto mt-1">Get started <svg className="w-4 h-4 ml-1 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (isPromoVisible) {
      return (
        <div className={`flex flex-col items-center justify-center h-screen w-full transition-colors duration-300 ${isDarkMode ? 'bg-[#111b21] text-[#e9edef]' : 'bg-[#f0f2f5] text-[#111b21]'}`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF9933] via-[#ffffff] to-[#138808]"></div>
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="relative mb-8">
              <img src={chatLogoImg} alt="QuickChat Logo" className="w-32 h-32 drop-shadow-2xl rounded-full" />
            </div>
            
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-700">quickChat</h1>
            <h2 className="text-2xl font-bold mb-6 opacity-90">Chat. Call. Share. Secure.</h2>
            
            <div className="flex flex-col items-center space-y-2 mb-12">
              <p className="font-medium text-lg text-[#00a884]">Made in India 🇮🇳 | Made for the World 🌍</p>
              <p className="text-sm opacity-70">Har Dil Ko Jode. 🚀</p>
            </div>
            
            {isDownloading ? (
              <div className="w-full max-w-xs flex flex-col items-center">
                <p className="text-sm font-medium mb-3 opacity-80">Downloading from GlobalSearch App Store...</p>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-[#00a884] transition-all duration-300 ease-out"
                    style={{ width: `${downloadProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs font-bold text-[#00a884]">{downloadProgress}% {downloadProgress >= 100 && '- Installing...'}</p>
              </div>
            ) : (
              <button 
                onClick={handleDownloadClick}
                className="px-10 py-4 rounded-full font-bold text-lg text-white shadow-[0_0_20px_rgba(0,168,132,0.4)] transition-all hover:scale-105 active:scale-95 bg-gradient-to-r from-green-500 to-emerald-600 flex items-center space-x-2"
              >
                <span>Download Now</span>
                <ShieldCheck size={20} />
              </button>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className={`flex flex-col h-screen w-full transition-colors duration-300 relative ${isDarkMode ? 'bg-[#111b21] text-[#e9edef]' : 'bg-[#f0f2f5] text-[#111b21]'}`}>
        {/* Mock Browser Header */}
        <div className="flex items-center space-x-4 p-2 bg-[#f1f3f4] border-b border-gray-300 shrink-0 absolute top-0 left-0 right-0 z-10 text-black">
          <div className="flex space-x-2 text-gray-600">
            <button onClick={() => setLoginStep('qr_interface')} className="p-1 hover:bg-gray-200 rounded-full"><ArrowLeft size={20}/></button>
            <button className="p-1 hover:bg-gray-200 rounded-full opacity-50"><ArrowLeft size={20} className="transform rotate-180"/></button>
            <button className="p-1 hover:bg-gray-200 rounded-full"><RotateCw size={18}/></button>
          </div>
          <div className="flex-1">
            <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-1.5 shadow-inner max-w-2xl mx-auto cursor-text">
              <Lock size={14} className="text-gray-500 mr-2"/>
              <span className="text-sm">web.quickchat.in/login</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">U</div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center pt-14">
          <div className={`p-8 rounded-3xl shadow-2xl flex flex-col items-center border ${isDarkMode ? 'bg-[#202c33] border-[#222d34]' : 'bg-white border-gray-100'} w-96 max-w-[90vw] relative overflow-hidden`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF9933] via-[#ffffff] to-[#138808]"></div>
          <img src={chatLogoImg} alt="QuickChat Logo" className="w-20 h-20 mb-6 drop-shadow-md rounded-full" />
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-700">QuickChat</h1>
          
          {loginStep === 'phone' && (
            <>
              <p className="text-sm opacity-70 mb-8 text-center px-4">Bas apna mobile number daaliye aur kuch seconds mein login kijiye.</p>
              <form className="w-full" onSubmit={handlePhoneSubmit}>
                <div className="mb-6 relative">
                  <Phone size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input 
                    type="tel" 
                    placeholder="Enter Mobile Number" 
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all ${isDarkMode ? 'bg-[#111b21] border-[#222d34] focus:border-[#00a884]' : 'bg-gray-50 border-gray-200 focus:border-green-500'} focus:ring-2 focus:ring-[#00a884]/20 text-center font-medium tracking-wider`}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full py-3 rounded-xl font-bold text-white shadow-lg shadow-green-500/30 transition-all hover:scale-[1.02] active:scale-95 bg-gradient-to-r from-green-500 to-emerald-600 mb-4"
                >
                  Send OTP
                </button>
              </form>
            </>
          )}

          {loginStep === 'otp' && (
            <>
              <p className="text-sm opacity-70 mb-8 text-center px-4">Fast OTP verification ke saath secure login.</p>
              <form className="w-full" onSubmit={handleOtpSubmit}>
                <div className="mb-6 relative">
                  <Lock size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input 
                    type="text" 
                    placeholder="Enter 6-digit OTP" 
                    value={loginOtp}
                    onChange={(e) => setLoginOtp(e.target.value)}
                    maxLength={6}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all ${isDarkMode ? 'bg-[#111b21] border-[#222d34] focus:border-[#00a884]' : 'bg-gray-50 border-gray-200 focus:border-green-500'} focus:ring-2 focus:ring-[#00a884]/20 text-center font-bold tracking-widest`}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full py-3 rounded-xl font-bold text-white shadow-lg shadow-green-500/30 transition-all hover:scale-[1.02] active:scale-95 bg-gradient-to-r from-green-500 to-emerald-600 mb-4"
                >
                  Verify
                </button>
                <div className="text-center">
                  <button type="button" onClick={() => setLoginStep('phone')} className="text-[#00a884] hover:underline text-sm font-medium">Change Number</button>
                </div>
              </form>
            </>
          )}

          {loginStep === 'verifying' && (
            <div className="w-full flex flex-col items-center justify-center py-6">
              <div className="w-12 h-12 border-4 border-[#00a884] border-t-transparent rounded-full animate-spin mb-6"></div>
              <p className="font-bold text-lg">Auto Verifying OTP...</p>
              <p className="text-sm opacity-70 mt-2">Securing your connection</p>
            </div>
          )}

          {loginStep === 'qr_verifying' && (
            <div className="w-full flex flex-col items-center justify-center py-6">
              <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-6"></div>
              <p className="font-bold text-lg">Linking Device...</p>
              <p className="text-sm opacity-70 mt-2">End-to-end encrypting your connection</p>
            </div>
          )}
        </div>
        </div>
      </div>
    );
  }

  if (isViewingLinkedDevices) {
    return (
      <div className={`flex flex-col h-screen w-full transition-colors duration-300 ${isDarkMode ? 'bg-[#111b21] text-[#e9edef]' : 'bg-[#f0f2f5] text-[#111b21]'}`}>
        {/* Header */}
        <div className={`h-16 flex items-center px-4 shadow-sm shrink-0 ${isDarkMode ? 'bg-[#202c33]' : 'bg-[#00a884] text-white'}`}>
          <button onClick={() => setIsViewingLinkedDevices(false)} className="p-2 -ml-2 mr-2 rounded-full transition-colors hover:bg-black/10">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Linked devices</h1>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col items-center py-10 px-4">
          <div className="w-full max-w-2xl">
            {/* Link a Device Section */}
            <div className={`mb-8 p-8 rounded-3xl border flex flex-col items-center justify-center text-center ${isDarkMode ? 'bg-[#202c33] border-[#222d34]' : 'bg-white border-gray-100 shadow-md'}`}>
              <div className={`p-4 rounded-full mb-4 ${isDarkMode ? 'bg-[#00a884]/20 text-[#00a884]' : 'bg-green-100 text-[#00a884]'}`}>
                <QrCode size={48} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Use QuickChat on other devices</h2>
              <p className="text-sm opacity-70 mb-6 max-w-sm">Link up to 4 devices to your account. Your messages remain end-to-end encrypted across all linked devices.</p>
              
              <button 
                onClick={() => setIsScanningQR(true)}
                className="px-8 py-3 rounded-full font-bold text-white shadow-lg shadow-green-500/30 transition-all hover:scale-[1.02] active:scale-95 bg-gradient-to-r from-green-500 to-emerald-600"
              >
                Link a device
              </button>
            </div>

            {/* Device List */}
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 opacity-60 px-2">Device Status</h3>
            <div className={`rounded-3xl border overflow-hidden ${isDarkMode ? 'bg-[#202c33] border-[#222d34]' : 'bg-white border-gray-100 shadow-sm'}`}>
              {linkedDevices.map((device, idx) => (
                <div key={device.id} className={`flex items-center p-5 ${idx !== linkedDevices.length - 1 ? (isDarkMode ? 'border-b border-[#222d34]' : 'border-b border-gray-100') : ''}`}>
                  <div className={`p-3 rounded-full mr-4 ${isDarkMode ? 'bg-[#111b21]' : 'bg-[#f0f2f5]'}`}>
                    <Monitor size={24} className="text-[#00a884]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-base">{device.name}</h4>
                    <p className="text-sm opacity-70">{device.browser} • {device.os}</p>
                    <p className={`text-xs mt-1 ${device.lastActive === 'Active now' ? 'text-[#00a884] font-medium' : 'opacity-60'}`}>
                      {device.lastActive} • {device.location}
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      if(window.confirm(`Log out from ${device.name}?`)) {
                        setLinkedDevices(prev => prev.filter(d => d.id !== device.id));
                      }
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${isDarkMode ? 'border-red-900/50 text-red-400 hover:bg-red-900/20' : 'border-red-200 text-red-600 hover:bg-red-50'}`}
                  >
                    Log out
                  </button>
                </div>
              ))}
              
              {linkedDevices.length === 0 && (
                <div className="p-8 text-center opacity-70">
                  <Monitor size={32} className="mx-auto mb-3 opacity-50" />
                  <p>No other devices are currently linked to your account.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* QR Scanner Modal Overlay */}
        {isScanningQR && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className={`w-full max-w-md p-6 rounded-3xl flex flex-col items-center ${isDarkMode ? 'bg-[#202c33]' : 'bg-white'}`}>
              <div className="w-full flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Scan QR Code</h3>
                <button onClick={() => setIsScanningQR(false)} className="p-2 rounded-full hover:bg-black/10 transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <p className="text-sm text-center opacity-80 mb-6">Go to quickchat.globalsearch.com on your computer and scan the QR code to link your device.</p>
              
              {/* Simulated Scanner */}
              <div className="relative w-64 h-64 border-2 border-[#00a884] rounded-2xl overflow-hidden mb-6 flex items-center justify-center bg-black/5">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#00a884] shadow-[0_0_15px_#00a884] animate-[scan_2s_ease-in-out_infinite]"></div>
                <QrCode size={120} className="opacity-20" />
                <div className="absolute inset-0 border-[20px] border-black/40 mix-blend-overlay pointer-events-none"></div>
              </div>
              
              <button onClick={() => setIsScanningQR(false)} className="text-[#00a884] font-medium hover:underline">Cancel</button>
              <style>{`
                @keyframes scan {
                  0%, 100% { top: 0; }
                  50% { top: 100%; }
                }
              `}</style>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (isAppLocked) {
    return (
      <div className={`flex flex-col items-center justify-center h-screen w-full transition-colors duration-300 ${isDarkMode ? 'bg-[#111b21] text-[#e9edef]' : 'bg-[#f0f2f5] text-[#111b21]'}`}>
        <div className={`p-8 rounded-3xl shadow-2xl flex flex-col items-center border ${isDarkMode ? 'bg-[#202c33] border-[#222d34]' : 'bg-white border-gray-100'} w-96 max-w-[90vw]`}>
          <div className={`p-5 rounded-full mb-6 ${isDarkMode ? 'bg-[#00a884]/20 text-[#00a884]' : 'bg-green-100 text-[#00a884]'}`}>
            <Lock size={48} />
          </div>
          <h1 className="text-2xl font-bold mb-2">QuickChat Lock</h1>
          <p className="text-sm opacity-70 mb-8 text-center px-4">
            {isSettingPin ? 'Set a new 4-digit PIN to secure your chats.' : 'Enter your 4-digit PIN to unlock.'}
          </p>
          <div className="flex gap-6 mb-10">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={`w-4 h-4 rounded-full ${enteredPin.length > i ? (isDarkMode ? 'bg-[#00a884]' : 'bg-[#00a884]') : (isDarkMode ? 'bg-[#374045]' : 'bg-gray-200')} transition-colors duration-200`}></div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-6 w-full px-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'OK'].map(key => (
              <button 
                key={key}
                onClick={() => {
                  if (key === 'C') setEnteredPin('');
                  else if (key === 'OK') {
                    if (isSettingPin) {
                      if (enteredPin.length === 4) {
                        setAppPin(enteredPin);
                        setIsSettingPin(false);
                        setEnteredPin('');
                        setIsAppLocked(false);
                      } else {
                        alert('Please enter a 4-digit PIN.');
                      }
                    } else {
                      if (enteredPin === appPin || (appPin === '' && enteredPin === '1234')) {
                        setIsAppLocked(false);
                        setEnteredPin('');
                      } else {
                        alert('Incorrect PIN');
                        setEnteredPin('');
                      }
                    }
                  }
                  else if (enteredPin.length < 4) setEnteredPin(prev => prev + key);
                }}
                className={`h-16 rounded-full text-2xl font-medium flex items-center justify-center transition-colors ${isDarkMode ? 'bg-[#2a3942] hover:bg-[#374045] text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-800'} active:scale-95 ${key === 'OK' ? 'text-sm font-bold text-[#00a884]' : ''} ${key === 'C' ? 'text-sm font-bold text-red-500' : ''}`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`flex h-screen w-full font-sans overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[#111b21] text-[#e9edef] selection:bg-[#005c4b]' : 'bg-[#f0f2f5] text-[#111b21] selection:bg-green-200'}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      
      {}
      <div className={`hidden md:flex flex-col w-[60px] border-r shrink-0 py-3 items-center justify-between z-50 ${isDarkMode ? 'bg-[#202c33] border-[#222d34]' : 'bg-[#f0f2f5] border-gray-300'}`}>
        <div className="flex flex-col space-y-4 w-full items-center">
          <button className={`p-2.5 rounded-full transition-colors relative ${isDarkMode ? 'bg-[#374045] text-[#e9edef]' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`} title="Chats">
            <MessageSquare size={22} className="fill-current" />
            <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#f0f2f5]"></div>
          </button>
          <button className={`p-2.5 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-[#374045]' : 'text-gray-500 hover:bg-gray-200'}`} title="Calls">
            <Phone size={22} />
          </button>
          <button onClick={() => setIsAddingStatus(true)} className={`p-2.5 rounded-full transition-colors relative ${isDarkMode ? 'text-gray-400 hover:bg-[#374045]' : 'text-gray-500 hover:bg-gray-200'}`} title="Status">
            <CircleDashed size={22} />
            <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#f0f2f5]"></div>
          </button>
          <button className={`p-2.5 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-[#374045]' : 'text-gray-500 hover:bg-gray-200'}`} title="Channels">
            <Radio size={22} />
          </button>
          <button onClick={() => setIsCreatingGroup(true)} className={`p-2.5 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-[#374045]' : 'text-gray-500 hover:bg-gray-200'}`} title="Communities">
            <Users size={22} />
          </button>
        </div>
        <div className="flex flex-col space-y-4 w-full items-center">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2.5 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-[#374045]' : 'text-gray-500 hover:bg-gray-200'}`}
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          <button onClick={() => setIsViewingSettings(true)} className={`p-2.5 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-[#374045]' : 'text-gray-500 hover:bg-gray-200'}`} title="Settings">
            <Settings size={22} />
          </button>
          <img onClick={() => setIsViewingSettings(true)} src={profilePhoto} className={`w-8 h-8 rounded-full object-cover cursor-pointer border ${isDarkMode ? 'border-[#222d34]' : 'border-gray-300'}`} alt="Profile" />
        </div>
      </div>

      {}
      <div 
        className={`flex flex-col border-r shrink-0 z-20 ${isDarkMode ? 'bg-[#111b21] border-[#222d34]' : 'bg-white border-gray-300'}`}
        style={{ width: `${sidebarWidth}px`, minWidth: '280px', maxWidth: '600px' }}
      >
        
        {}
        {isSelectingChats ? (
          <div className={`h-16 flex items-center justify-between px-4 shrink-0 relative ${isDarkMode ? 'bg-[#202c33]' : 'bg-[#00a884] text-white'}`}>
            <div className="flex items-center">
              <button onClick={() => { setIsSelectingChats(false); setSelectedChats([]); }} className="p-2 -ml-2 mr-2 rounded-full transition-colors hover:bg-black/10">
                <X size={20} />
              </button>
              <h1 className="font-semibold text-[17px]">{selectedChats.length} Selected</h1>
            </div>
            {selectedChats.length > 0 && (
              <button 
                onClick={() => {
                  setChats(prev => prev.filter(c => !selectedChats.includes(c.id)));
                  setIsSelectingChats(false);
                  setSelectedChats([]);
                }}
                className="p-2 rounded-full transition-colors hover:bg-black/10" title="Delete selected chats"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
        ) : (
          <div className={`h-16 flex items-center justify-between px-4 shrink-0 relative ${isDarkMode ? 'bg-[#202c33]' : 'bg-white'}`}>
            <div className="flex items-center">
              <a href="/" className={`p-2 -ml-2 mr-1 rounded-full transition-colors ${isDarkMode ? 'text-[#aebac1] hover:bg-[#374045]' : 'text-gray-500 hover:bg-gray-100'}`} title="Back to Main">
                <ArrowLeft size={20} />
              </a>
              <h1 className={`font-extrabold text-[23px] tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${isDarkMode ? 'from-[#FF9933] via-white to-[#138808]' : 'from-[#FF9933] via-[#000080] to-[#138808]'} drop-shadow-sm`}>QuickChat</h1>
            </div>
            <div className="flex items-center space-x-1">
              <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-[#aebac1] hover:bg-[#374045]' : 'text-gray-500 hover:bg-gray-100'}`} title="Status" onClick={() => setIsAddingStatus(true)}>
                <CircleDashed size={20} />
              </button>
              <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-[#aebac1] hover:bg-[#374045]' : 'text-gray-500 hover:bg-gray-100'}`} title="Add Contact" onClick={() => setIsAddingContact(true)}>
                <UserPlus size={20} />
              </button>
              <div className="relative">
                <button 
                  className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-[#aebac1] hover:bg-[#374045]' : 'text-gray-500 hover:bg-gray-100'}`} 
                  title="Menu"
                  onClick={() => setIsSidebarMenuOpen(!isSidebarMenuOpen)}
                >
                  <MoreVertical size={20} />
                </button>
                
                {isSidebarMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsSidebarMenuOpen(false)}></div>
                    <div className={`absolute right-0 top-12 w-48 rounded-md shadow-lg z-50 py-2 border ${isDarkMode ? 'bg-[#233138] border-[#222d34]' : 'bg-white border-gray-100'} animate-in fade-in zoom-in-95 duration-200`}>
                      <button onClick={() => { setIsSidebarMenuOpen(false); setIsCreatingGroup(true); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-[#d1d7db] hover:bg-[#182229]' : 'text-gray-700 hover:bg-gray-50'}`}>New group</button>
                      <button onClick={() => { setIsSidebarMenuOpen(false); setIsViewingStarred(true); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-[#d1d7db] hover:bg-[#182229]' : 'text-gray-700 hover:bg-gray-50'}`}>Starred messages</button>
                      <button onClick={() => { setIsSidebarMenuOpen(false); setIsViewingLinkedDevices(true); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-[#d1d7db] hover:bg-[#182229]' : 'text-gray-700 hover:bg-gray-50'}`}>Linked devices</button>
                      <button onClick={() => { setIsSidebarMenuOpen(false); setIsSelectingChats(!isSelectingChats); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-[#d1d7db] hover:bg-[#182229]' : 'text-gray-700 hover:bg-gray-50'}`}>Select chats</button>
                      <button onClick={() => { setIsSidebarMenuOpen(false); setChats(prev => prev.map(c => ({...c, unread: 0}))); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-[#d1d7db] hover:bg-[#182229]' : 'text-gray-700 hover:bg-gray-50'}`}>Mark all as read</button>
                      <button onClick={() => { setIsSidebarMenuOpen(false); setIsSettingPin(true); setIsAppLocked(true); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-[#d1d7db] hover:bg-[#182229]' : 'text-gray-700 hover:bg-gray-50'}`}>App lock</button>
                      <button onClick={() => { setIsSidebarMenuOpen(false); setIsLoggedIn(false); setLoginPassword(''); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-[#d1d7db] hover:bg-[#182229]' : 'text-gray-700 hover:bg-gray-50'}`}>Log out</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {}
        <div className="flex-1 flex flex-col overflow-hidden">
          {}
          <div className="px-4 py-2">
            <div className={`flex items-center rounded-lg px-4 py-1.5 border-b-2 border-transparent transition-all ${isDarkMode ? 'bg-[#202c33] focus-within:bg-[#111b21] focus-within:border-[#00a884]' : 'bg-[#f0f2f5] focus-within:bg-white focus-within:border-green-500 focus-within:shadow-sm'}`}>
              <Search size={18} className={`${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'} mr-3`} />
              <input type="text" placeholder="Search or start a new chat" className={`bg-transparent border-none outline-none w-full text-sm placeholder-gray-500 ${isDarkMode ? 'text-[#e9edef]' : 'text-[#111b21]'}`} />
            </div>
          </div>
          
          {}
          <div className={`px-4 pb-2 flex space-x-2 overflow-x-auto hide-scrollbar border-b ${isDarkMode ? 'border-[#222d34]' : 'border-gray-200'}`}>
            <button className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${isDarkMode ? 'bg-[#0a332c] text-[#00a884]' : 'bg-green-100 text-green-800'}`}>All</button>
            <button className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${isDarkMode ? 'bg-[#202c33] text-[#8696a0] hover:bg-[#374045]' : 'bg-[#f0f2f5] text-gray-600 hover:bg-gray-200'}`}>Unread 7</button>
            <button className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${isDarkMode ? 'bg-[#202c33] text-[#8696a0] hover:bg-[#374045]' : 'bg-[#f0f2f5] text-gray-600 hover:bg-gray-200'}`}>Favourites</button>
            <button className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${isDarkMode ? 'bg-[#202c33] text-[#8696a0] hover:bg-[#374045]' : 'bg-[#f0f2f5] text-gray-600 hover:bg-gray-200'}`}>Groups 3</button>
          </div>

          {}
          <div className={`flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent pr-0.5 ${isDarkMode ? 'bg-[#111b21] [&::-webkit-scrollbar-thumb]:bg-[#374045] hover:[&::-webkit-scrollbar-thumb]:bg-[#8696a0]' : 'bg-white [&::-webkit-scrollbar-thumb]:bg-gray-300 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400'}`}>
            {chats.map((chat, index) => (
              <div 
                key={chat.id} 
                draggable={!isSelectingChats}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  if (isSelectingChats) {
                    setSelectedChats(prev => prev.includes(chat.id) ? prev.filter(id => id !== chat.id) : [...prev, chat.id]);
                  } else {
                    setActiveChat(chat.id);
                  }
                }}
                className={`group relative flex items-center p-3 cursor-pointer transition-all duration-200 hover:-translate-y-[1px] hover:shadow-sm ${activeChat === chat.id ? (isDarkMode ? 'bg-[#2a3942]' : 'bg-[#f0f2f5]') : (isDarkMode ? 'hover:bg-[#202c33]' : 'hover:bg-[#f5f6f6]')}`}
              >
                {isSelectingChats && (
                  <div className="mr-3 ml-2 flex items-center h-full">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${selectedChats.includes(chat.id) ? 'bg-[#00a884] border-[#00a884]' : (isDarkMode ? 'border-[#8696a0]' : 'border-gray-300')}`}>
                      {selectedChats.includes(chat.id) && <Check size={14} className="text-white font-bold" />}
                    </div>
                  </div>
                )}
                <div className="relative mr-3 shrink-0 ml-1">
                  <img src={chat.avatar} alt={chat.name} className={`w-[48px] h-[48px] rounded-full object-cover`} draggable="false" />
                </div>
                
                <div className={`flex-1 min-w-0 border-b pb-3 pt-1 ${isDarkMode ? 'border-[#222d34]' : 'border-gray-100'}`}>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className={`text-[16px] truncate ${chat.unread ? 'font-semibold' : ''} ${isDarkMode ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>{chat.name}</h3>
                    <span className={`text-xs shrink-0 ${chat.unread ? 'text-[#00a884] font-medium' : (isDarkMode ? 'text-[#8696a0]' : 'text-gray-500')}`}>{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center min-w-0 pr-2">
                      {chat.id !== 1 && !chat.unread && (
                        <CheckCheck size={16} className={`mr-1 shrink-0 ${isDarkMode ? 'text-[#53bdeb]' : 'text-[#53bdeb]'}`} />
                      )}
                      <p className={`text-[14px] truncate ${chat.unread ? (isDarkMode ? 'font-semibold text-[#e9edef]' : 'font-semibold text-[#111b21]') : (isDarkMode ? 'text-[#8696a0]' : 'text-gray-500')}`}>
                        {chat.lastMsg}
                      </p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="shrink-0 ml-2 flex items-center">
                        <span className="bg-[#00a884] text-[#111b21] text-[11px] font-bold px-1.5 py-0.5 rounded-full flex items-center justify-center min-w-[20px] h-[20px]">
                          {chat.unread}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <button 
                  onClick={(e) => handleDeleteContact(e, chat.id)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${isDarkMode ? 'text-red-400 hover:bg-[#374045]' : 'text-red-500 hover:bg-gray-200'}`}
                  title="Delete Contact"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {}
      <div 
        className="hidden md:block w-1 cursor-col-resize hover:bg-[#25d366]/50 active:bg-[#25d366] transition-colors z-30 shrink-0"
        onMouseDown={handleMouseDown}
      />

      {}
      <div className={`hidden md:flex flex-1 flex-col relative ${isDarkMode ? 'bg-[#0b141a]' : 'bg-[#efeae2]'}`}>
        
        {}
        <div className={`h-[60px] flex items-center justify-between px-4 border-l shrink-0 z-50 ${isDarkMode ? 'bg-[#202c33] border-[#222d34]' : 'bg-[#f0f2f5] border-gray-300'}`}>
          <div className="flex items-center cursor-pointer">
            <img src={activeChatData.avatar} alt="" className="w-10 h-10 rounded-full object-cover mr-4" />
            <div className="flex flex-col justify-center">
              <h2 className={`text-[16px] font-medium leading-5 ${isDarkMode ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>{activeChatData.name}</h2>
              <p className={`text-[13px] ${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'}`}>
                last seen today at 1:34 pm
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-gray-500 mr-2">
            <button 
              onClick={() => setIsTranslated(!isTranslated)}
              className={`transition-colors flex items-center gap-1 ${isTranslated ? (isDarkMode ? 'text-[#00a884]' : 'text-emerald-600') : (isDarkMode ? 'text-[#aebac1] hover:text-[#d1d7db]' : 'hover:text-gray-700')}`}
              title="Translate Chat"
            >
              <Languages size={20} />
            </button>
            <button className={`transition-colors ${isDarkMode ? 'text-[#aebac1] hover:text-[#d1d7db]' : 'hover:text-gray-700'}`}>
              <Video size={22} />
            </button>
            <button className={`transition-colors ${isDarkMode ? 'text-[#aebac1] hover:text-[#d1d7db]' : 'hover:text-gray-700'}`}>
              <Phone size={20} />
            </button>
            <div className={`w-px h-6 mx-1 ${isDarkMode ? 'bg-[#222d34]' : 'bg-gray-300'}`}></div>
            <button 
              onClick={handleGenerateSummary}
              className={`transition-colors relative group ${isSummarizing ? 'text-green-500 animate-pulse' : (isDarkMode ? 'text-[#aebac1] hover:text-green-500' : 'hover:text-green-600')}`}
              title="AI Chat Summary"
            >
              <Brain size={22} />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75 group-hover:hidden"></div>
            </button>
            <button 
              onClick={() => setIsChatSearchOpen(!isChatSearchOpen)}
              className={`transition-colors ${isDarkMode ? 'text-[#aebac1] hover:text-[#d1d7db]' : 'hover:text-gray-700'}`}
            >
              <Search size={20} />
            </button>
            <div className="relative">
              <button 
                onClick={() => setIsChatMenuOpen(!isChatMenuOpen)}
                className={`transition-colors flex items-center ${isDarkMode ? 'text-[#aebac1] hover:text-[#d1d7db]' : 'hover:text-gray-700'}`}
              >
                <MoreVertical size={22} />
              </button>
              {isChatMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsChatMenuOpen(false)}></div>
                  <div className={`absolute right-0 top-10 w-56 rounded-md shadow-lg z-50 py-2 border ${isDarkMode ? 'bg-[#233138] border-[#222d34]' : 'bg-white border-gray-100'} animate-in fade-in zoom-in-95 duration-200`}>
                    <button onClick={() => { setIsChatMenuOpen(false); setIsContactInfoOpen(!isContactInfoOpen); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-[#d1d7db] hover:bg-[#182229]' : 'text-gray-700 hover:bg-gray-50'}`}>Contact info</button>
                    <button onClick={() => { setIsChatMenuOpen(false); setIsSelectingMessages(true); setSelectedMessages([]); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-[#d1d7db] hover:bg-[#182229]' : 'text-gray-700 hover:bg-gray-50'}`}>Select messages</button>
                    <button onClick={() => { setIsChatMenuOpen(false); setIsMuteModalOpen(true); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-[#d1d7db] hover:bg-[#182229]' : 'text-gray-700 hover:bg-gray-50'}`}>Mute notifications</button>
                    <button onClick={() => { setIsChatMenuOpen(false); setIsDisappearingModalOpen(true); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-[#d1d7db] hover:bg-[#182229]' : 'text-gray-700 hover:bg-gray-50'}`}>Disappearing messages</button>
                    <button onClick={() => { setIsChatMenuOpen(false); setChats(prev => prev.map(c => c.id === activeChat ? {...c, isFavourite: !c.isFavourite} : c)); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-[#d1d7db] hover:bg-[#182229]' : 'text-gray-700 hover:bg-gray-50'}`}>{activeChatData?.isFavourite ? 'Remove from favourites' : 'Add to favourites'}</button>
                    <button onClick={() => { setIsChatMenuOpen(false); setIsAddToListModalOpen(true); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-[#d1d7db] hover:bg-[#182229]' : 'text-gray-700 hover:bg-gray-50'}`}>Add to list</button>
                    <button onClick={() => { setIsChatMenuOpen(false); setActiveChat(null); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-[#d1d7db] hover:bg-[#182229]' : 'text-gray-700 hover:bg-gray-50'}`}>Close chat</button>
                    <button onClick={() => { setIsChatMenuOpen(false); setIsCallLinkModalOpen(true); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-[#d1d7db] hover:bg-[#182229]' : 'text-gray-700 hover:bg-gray-50'}`}>Send call link</button>
                    <div className={`my-1 h-px w-full ${isDarkMode ? 'bg-[#222d34]' : 'bg-gray-100'}`}></div>
                    <button onClick={() => { setIsChatMenuOpen(false); setIsReportModalOpen(true); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-[#d1d7db] hover:bg-[#182229]' : 'text-gray-700 hover:bg-gray-50'}`}>Report</button>
                    <button onClick={() => { setIsChatMenuOpen(false); setIsBlockModalOpen(true); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-[#d1d7db] hover:bg-[#182229]' : 'text-gray-700 hover:bg-gray-50'}`}>Block</button>
                    <button onClick={() => { setIsChatMenuOpen(false); setMessageThreads(prev => ({...prev, [activeChat]: []})); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-[#d1d7db] hover:bg-[#182229]' : 'text-gray-700 hover:bg-gray-50'}`}>Clear chat</button>
                    <button onClick={() => { setIsChatMenuOpen(false); handleDeleteContact({stopPropagation:()=>{}}, activeChat); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${isDarkMode ? 'text-red-400 hover:bg-[#182229]' : 'text-red-500 hover:bg-gray-50'}`}>Delete chat</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Chat Search Header */}
        {isChatSearchOpen && (
          <div className={`flex items-center px-4 py-2 border-b shrink-0 z-10 animate-in slide-in-from-top-2 fade-in duration-200 ${isDarkMode ? 'bg-[#202c33] border-[#222d34]' : 'bg-white border-gray-200'}`}>
            <div className={`flex items-center w-full rounded-lg px-4 py-1.5 transition-all ${isDarkMode ? 'bg-[#111b21]' : 'bg-[#f0f2f5]'}`}>
              <button onClick={() => { setIsChatSearchOpen(false); setChatSearchQuery(''); }} className={`mr-4 transition-colors ${isDarkMode ? 'text-[#8696a0] hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}>
                <ArrowLeft size={18} />
              </button>
              <input 
                type="text" 
                placeholder="Search messages..." 
                value={chatSearchQuery}
                onChange={(e) => setChatSearchQuery(e.target.value)}
                className={`bg-transparent border-none outline-none w-full text-sm ${isDarkMode ? 'text-[#e9edef] placeholder-[#8696a0]' : 'text-[#111b21] placeholder-gray-500'}`} 
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Select Messages Header */}
        {isSelectingMessages && (
          <div className={`flex items-center justify-between px-6 py-3 border-b shrink-0 z-10 animate-in slide-in-from-top-2 fade-in duration-200 ${isDarkMode ? 'bg-[#202c33] border-[#222d34] text-white' : 'bg-[#00a884] text-white border-[#00a884]'}`}>
            <div className="flex items-center">
              <button onClick={() => { setIsSelectingMessages(false); setSelectedMessages([]); }} className="mr-4 p-2 rounded-full hover:bg-black/10 transition-colors">
                <X size={20} />
              </button>
              <span className="font-medium">{selectedMessages.length} Selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className={`p-2 rounded-full transition-colors ${selectedMessages.length > 0 ? 'hover:bg-black/10 opacity-100' : 'opacity-50 cursor-not-allowed'}`}>
                <Star size={20} />
              </button>
              <button 
                onClick={() => {
                  const updatedThread = messageThreads[activeChat].filter(msg => !selectedMessages.includes(msg.id));
                  setMessageThreads(prev => ({...prev, [activeChat]: updatedThread}));
                  setIsSelectingMessages(false);
                  setSelectedMessages([]);
                }}
                disabled={selectedMessages.length === 0}
                className={`p-2 rounded-full transition-colors ${selectedMessages.length > 0 ? 'hover:bg-black/10 opacity-100' : 'opacity-50 cursor-not-allowed'}`}
              >
                <Trash2 size={20} />
              </button>
              <button className={`p-2 rounded-full transition-colors ${selectedMessages.length > 0 ? 'hover:bg-black/10 opacity-100' : 'opacity-50 cursor-not-allowed'}`}>
                <Reply size={20} />
              </button>
            </div>
          </div>
        )}

        {}
        {aiSummary && (
          <div className="absolute top-16 left-0 w-full z-20 px-4 py-3 animate-in slide-in-from-top-4 fade-in duration-300">
            <div className={`rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.1)] border-l-4 border-green-500 p-3 flex items-start justify-between ${isDarkMode ? 'bg-[#202c33]' : 'bg-white'}`}>
              <div className="flex items-start">
                <Brain size={18} className="text-green-500 mt-0.5 mr-3 shrink-0" />
                <p className="text-sm text-gray-700 leading-relaxed font-medium">{aiSummary}</p>
              </div>
              <button onClick={() => setAiSummary(null)} className="text-gray-400 hover:text-gray-600 p-1 shrink-0 ml-2">
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {}
        <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${isDarkMode ? 'opacity-10 bg-[#0b141a]' : 'opacity-[0.06]'}`} style={{ backgroundImage: 'url("https://static.whatsapp.net/rsrc.php/v3/yl/r/gi_DckOUM5a.png")', backgroundRepeat: 'repeat', backgroundSize: '400px' }}></div>


        {}
        <div className="flex-1 overflow-y-auto p-6 z-10 space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-black/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-black/30 pr-2">
          
          {/* E2EE Indicator */}
          <div className="flex justify-center mb-4 mt-2">
            <div className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[11.5px] font-medium max-w-md text-center ${isDarkMode ? 'bg-[#005c4b]/30 text-[#00a884] border border-[#00a884]/20' : 'bg-[#e4fdf1] text-[#008069] border border-[#008069]/20'}`}>
              <Lock size={14} className="shrink-0" />
              <span>Messages and calls are end-to-end encrypted. No one outside of this chat, not even QuickChat, can read or listen to them.</span>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-500 font-medium">Today</span>
          </div>

          {currentMessages.length === 0 && (
            <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
              Send a message to start the conversation!
            </div>
          )}
          
          {currentMessages.map((msg) => (
            msg.isSystem ? (
              <div key={msg.id} className="flex justify-center my-6 animate-in fade-in">
                <span className="text-xs font-semibold text-gray-400">{msg.text}</span>
              </div>
            ) : (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} items-center animate-in slide-in-from-bottom-2 fade-in duration-300 group mb-1 ${isSelectingMessages ? 'cursor-pointer hover:bg-black/5' : ''}`} onClick={() => {
              if (isSelectingMessages) {
                setSelectedMessages(prev => prev.includes(msg.id) ? prev.filter(id => id !== msg.id) : [...prev, msg.id]);
              }
            }}>
              
              {isSelectingMessages && msg.sender === 'me' && (
                <div className="mr-3 ml-2 flex items-center h-full">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${selectedMessages.includes(msg.id) ? 'bg-[#00a884] border-[#00a884]' : (isDarkMode ? 'border-[#8696a0]' : 'border-gray-300')}`}>
                    {selectedMessages.includes(msg.id) && <Check size={14} className="text-white font-bold" />}
                  </div>
                </div>
              )}

              {!isSelectingMessages && msg.sender === 'me' && (
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity mr-3 space-x-3 text-gray-500">
                  <button 
                    onClick={() => setStarredMessages(prev => prev.includes(msg.id) ? prev.filter(id => id !== msg.id) : [...prev, msg.id])}
                    className="hover:text-white transition-colors"
                    title="Star message"
                  >
                    <Star size={16} className={starredMessages.includes(msg.id) ? 'fill-yellow-400 text-yellow-400' : ''} />
                  </button>
                  <button className="hover:text-white transition-colors"><Reply size={16} /></button>
                  <button className="hover:text-white transition-colors"><Smile size={16} /></button>
                  <button className="hover:text-white transition-colors"><MoreVertical size={16} /></button>
                </div>
              )}

              <div className={`max-w-[65%] rounded-lg px-2.5 pt-1.5 pb-2 relative text-[14.2px] shadow-sm ${ghostMode ? 'blur-[3px] hover:blur-none transition-all duration-300 select-none' : ''} ${
                msg.sender === 'me' 
                  ? (isDarkMode ? 'bg-[#005c4b] text-[#e9edef] rounded-tr-none' : 'bg-[#d9fdd3] text-[#111b21] rounded-tr-none')
                  : (isDarkMode ? 'bg-[#202c33] text-[#e9edef] rounded-tl-none' : 'bg-white text-[#111b21] rounded-tl-none')
              }`}>
                {msg.isImage && (
                  <div className="mb-2">
                    <img src={msg.imageUrl} alt="attachment" className="max-w-full rounded-lg max-h-48 object-cover border border-white/20" />
                  </div>
                )}
                
                {msg.isDoc && (
                  <div className={`flex items-center gap-3 p-3 rounded-lg border mb-2 ${msg.docColor}`}>
                    <div className="bg-white/10 p-2 rounded-lg"><FileText size={24} className="text-white" /></div>
                    <div>
                      <p className="font-semibold text-sm">{msg.docTitle}</p>
                      <p className="text-xs text-white/70">Verified by Gov. of India</p>
                    </div>
                  </div>
                )}

                {msg.isVoice && (
                  <div className="flex items-center gap-3 bg-white/10 rounded-full py-2 px-4 mb-2">
                    <button className="text-white"><Phone size={16} className="rotate-90 fill-white" /></button>
                    <div className="w-32 h-1 bg-white/30 rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-white"></div>
                    </div>
                    <span className="text-xs font-mono">{msg.duration}</span>
                  </div>
                )}

                {msg.isLocation && (
                  <div className="w-64 h-48 rounded-xl overflow-hidden relative border border-emerald-500/30 mb-2">
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="Map" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-12 h-12 bg-[#138808]/20 rounded-full flex items-center justify-center animate-pulse relative shadow-[0_0_15px_rgba(19,136,8,0.5)]">
                        <div className="absolute inset-0 rounded-full border-2 border-[#138808] animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                        <Navigation2 size={24} className="text-[#138808] fill-[#138808] rotate-45" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-3 right-3 flex justify-between items-end">
                      <div>
                        <p className="text-white font-bold text-sm leading-tight drop-shadow-md">Live Location</p>
                        <p className="text-[#FF9933] text-[10px] font-bold">NaviMap™</p>
                      </div>
                      <div className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-1 rounded-md border border-emerald-500/50 backdrop-blur-sm">
                        Sharing...
                      </div>
                    </div>
                  </div>
                )}
                {msg.isPayment && (
                  <div className={`w-64 rounded-xl overflow-hidden mb-2 border ${isDarkMode ? 'border-[#00a884]/30 bg-[#111b21]' : 'border-emerald-500/30 bg-emerald-50'}`}>
                    <div className={`p-4 ${isDarkMode ? 'bg-[#005c4b]/20' : 'bg-emerald-100/50'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-[#00a884]/20' : 'bg-emerald-200'}`}>
                          <IndianRupee size={20} className={`${isDarkMode ? 'text-[#00a884]' : 'text-emerald-700'}`} />
                        </div>
                        <div className="bg-emerald-500/20 text-emerald-600 text-[10px] px-2 py-1 rounded-md font-bold flex items-center">
                          <Check size={12} className="mr-1" /> Secure UPI
                        </div>
                      </div>
                      <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-[#e9edef]' : 'text-gray-800'}`}>{msg.text}</h3>
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>To: {activeChatData.name}</p>
                    </div>
                    {msg.paymentNote && (
                      <div className={`px-4 py-2 border-t text-sm italic ${isDarkMode ? 'border-[#222d34] text-gray-300' : 'border-emerald-200 text-gray-600'}`}>
                        "{msg.paymentNote}"
                      </div>
                    )}
                    <div className="px-4 py-2 bg-[#138808] flex justify-center items-center">
                      <span className="text-white text-xs font-bold tracking-widest flex items-center">
                        <ShieldCheck size={12} className="mr-1" /> BHARATPAY
                      </span>
                    </div>
                  </div>
                )}
                
                {msg.text && !msg.isPayment && (
                  <div className={`text-sm leading-relaxed ${msg.isMalicious ? 'text-red-500 font-bold flex items-center gap-2' : ''}`}>
                    {msg.isMalicious ? (
                      <>
                        <ShieldCheck size={16} />
                        <span>{msg.text}</span>
                      </>
                    ) : (msg.sender === 'ai' || msg.sender === 'them') && isTranslated && activeChat === 5 ? (
                      <>
                        <p className={`mb-1 ${isDarkMode ? 'text-white/90' : 'text-gray-800'}`}>
                          {msg.id === 1 ? 'Arjun: Hey team, build deployed successfully.' :
                           msg.id === 2 ? 'Priya: Awesome! I have also tested the API endpoints. Everything is running perfectly.' :
                           msg.id === 3 ? 'Surya: Greetings! Did you check if the UI is responsive?' :
                           msg.id === 4 ? 'Rahul: Yes, I checked the mobile view. Looks great!' : 
                           msg.id === 5 ? 'Harpreet: Yes, everything is working great.' : msg.text}
                        </p>
                        <p className={`text-[10px] uppercase font-bold tracking-wider opacity-80 border-t pt-1 mt-1 inline-flex items-center gap-1 ${isDarkMode ? 'text-[#00a884] border-[#00a884]/20' : 'text-emerald-700 border-emerald-700/20'}`}>
                          <ShieldCheck size={10} /> Bharat AI Translated from {msg.originalLang === 'hi' ? 'Hindi' : msg.originalLang === 'ta' ? 'Tamil' : msg.originalLang === 'bn' ? 'Bengali' : msg.originalLang === 'pa' ? 'Punjabi' : 'English'}
                        </p>
                      </>
                    ) : (msg.sender === 'ai' || msg.sender === 'them') && isTranslated ? (
                       <>
                         <p className={`mb-1 ${isDarkMode ? 'text-white/90' : 'text-gray-800'}`}>
                           {msg.text === 'Hello! How can I assist you today?' ? 'नमस्ते! मैं आज आपकी कैसे सहायता कर सकता हूँ?' :
                            msg.text === 'You have 3 unread emails. 2 from work and 1 from Amazon regarding your delivery.' ? 'आपके पास 3 अपठित ईमेल हैं। 2 काम से और 1 अमेज़न से।' :
                            msg.text === 'I have scheduled your meeting.' ? 'मैंने आपकी मीटिंग तय कर दी है।' :
                            msg.text === 'धन्यवाद! क्या आप मुझे आज का मौसम बता सकते हैं?' ? 'Thank you! Can you tell me today\'s weather?' :
                            msg.text === 'I have processed your request. Is there anything else?' ? 'मैंने आपके अनुरोध को प्रोसेस कर दिया है। क्या कुछ और है?' :
                            msg.text === 'Did you eat?' ? 'क्या तुमने खाना खा लिया?' :
                            msg.text === 'Priya: The new server is up.' ? 'प्रिया: नया सर्वर चालू हो गया है।' :
                            msg.text === 'Rukiye ammi ha' ? 'रुकिए अम्मी हैं' :
                            msg.text === 'Nahi' ? 'नहीं' :
                            msg.text === 'Fir mujhse baat nahi kar paya ga' ? 'फिर मुझसे बात नहीं कर पाएगा' :
                            msg.text === 'Acha' ? 'अच्छा' :
                            msg.text === 'Thik hai' ? 'ठीक है' :
                            msg.text + ' (अनुवादित)'}
                         </p>
                         <p className={`text-[10px] uppercase font-bold tracking-wider opacity-80 border-t pt-1 mt-1 inline-flex items-center gap-1 ${isDarkMode ? 'text-[#00a884] border-[#00a884]/20' : 'text-emerald-700 border-emerald-700/20'}`}>
                           <ShieldCheck size={10} /> Bharat AI Translated {msg.text === 'धन्यवाद! क्या आप मुझे आज का मौसम बता सकते हैं?' ? 'from Hindi' : 'from English'}
                         </p>
                       </>
                     ) :
                     msg.text}
                  </div>
                )}
                <div className={`flex items-center justify-end mt-0.5 space-x-1 float-right ml-3 pt-2 text-[11px] text-gray-500`}>
                  <span className="mt-[2px]">{msg.time}</span>
                  {msg.sender === 'me' && (
                    ghostMode ? <Ghost size={12} className="text-gray-400" /> : <CheckCheck size={14} className="text-[#53bdeb]" />
                  )}
                </div>
              </div>

              {!isSelectingMessages && msg.sender === 'them' && (
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity ml-3 space-x-3 text-gray-500">
                  <button className="hover:text-gray-700 transition-colors"><Smile size={16} /></button>
                  <button className="hover:text-gray-700 transition-colors"><Reply size={16} /></button>
                  <button className="hover:text-gray-700 transition-colors"><MoreVertical size={16} /></button>
                </div>
              )}

              {isSelectingMessages && msg.sender === 'them' && (
                <div className="ml-3 mr-2 flex items-center h-full">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${selectedMessages.includes(msg.id) ? 'bg-[#00a884] border-[#00a884]' : (isDarkMode ? 'border-[#8696a0]' : 'border-gray-300')}`}>
                    {selectedMessages.includes(msg.id) && <Check size={14} className="text-white font-bold" />}
                  </div>
                </div>
              )}
            </div>
            )
          ))}
          <div ref={messagesEndRef} />
        </div>

        {}
        {currentSmartReplies.length > 0 && !slashCommandActive && !message && (
          <div className="w-full px-4 pb-2 z-20 flex space-x-2 overflow-x-auto hide-scrollbar bg-gradient-to-t from-[#050505] to-transparent pt-4">
            <span className="px-2 py-2 flex items-center justify-center bg-blue-500/10 rounded-full border border-blue-500/30 text-blue-400">
              <Zap size={14} />
            </span>
            {currentSmartReplies.map((reply, i) => (
              <button 
                key={i} 
                onClick={() => sendSmartReply(reply)}
                className="px-4 py-2 rounded-full bg-[#1a1a1a] border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/10 hover:text-white transition-all whitespace-nowrap shrink-0 shadow-sm"
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        {}
        {slashCommandActive && (
          <div className="absolute bottom-20 left-4 bg-[#1a1a1a] border border-[#FF9933]/50 rounded-xl p-4 shadow-[0_0_15px_rgba(255,153,51,0.2)] z-40 w-80 animate-in fade-in slide-in-from-bottom-2">
            <h4 className="text-[#FF9933] text-xs font-bold uppercase tracking-wider mb-2 flex items-center">
              <ShieldCheck size={14} className="mr-1" /> DigiLocker Integration
            </h4>
            <div 
              className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
              onClick={() => executeSlashCommand(slashCommandActive)}
            >
              <FileText size={24} className={slashCommandActive === 'aadhaar' ? 'text-blue-400' : 'text-orange-400'} />
              <div>
                <p className="text-sm font-medium text-white">Attach {slashCommandActive.toUpperCase()}</p>
                <p className="text-xs text-gray-400">Fetch securely and send</p>
              </div>
            </div>
          </div>
        )}

        {}
        <form onSubmit={handleSendMessage} className={`px-4 py-3 z-30 flex items-center space-x-4 relative border-l ${isDarkMode ? 'bg-[#202c33] border-[#222d34]' : 'bg-[#f0f2f5] border-gray-300'}`}>
          
          <div className="flex items-center space-x-3 text-gray-500 shrink-0">
            <button type="button" onClick={() => setShowEmojis(!showEmojis)} className="hover:text-gray-700 transition-colors">
              <Smile size={26} />
            </button>
            <button type="button" onClick={() => fileInputRef.current?.click()} className="hover:text-gray-700 transition-colors">
              <Plus size={26} />
            </button>
            <button type="button" onClick={handleLocationSend} className="hover:text-gray-700 transition-colors text-blue-500 bg-blue-100/50 rounded-full p-1" title="Share Location">
              <MapPin size={22} />
            </button>
            <button type="button" onClick={() => setIsPaymentModalOpen(true)} className="hover:text-gray-700 transition-colors text-emerald-600 bg-emerald-100/50 rounded-full p-1" title="SwiftPay">
              <IndianRupee size={22} />
            </button>
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} accept="image/*,video/*,.pdf" />
          </div>

          <div className={`flex-1 rounded-lg flex items-center px-4 min-h-[44px] shadow-sm relative ${isDarkMode ? 'bg-[#2a3942]' : 'bg-white'}`}>
            {showEmojis && (
              <div className={`absolute bottom-14 left-0 border rounded-lg p-3 shadow-lg flex flex-wrap gap-2 w-56 z-50 ${isDarkMode ? 'bg-[#202c33] border-[#222d34]' : 'bg-white border-gray-200'}`}>
                {emojis.map(e => (
                  <button key={e} type="button" onClick={() => setMessage(prev => prev + e)} className="text-2xl hover:scale-110 transition-transform w-8 h-8 flex items-center justify-center">{e}</button>
                ))}
              </div>
            )}
            <input 
              type="text" 
              placeholder="Type a message"
              className={`w-full bg-transparent border-none outline-none text-[15px] py-2.5 ${isDarkMode ? 'text-[#e9edef]' : 'text-[#111b21]'}`}
              value={message}
              onChange={handleMessageChange}
            />
          </div>
          
          <div className="flex items-center text-gray-500 shrink-0 pl-2">
            {message.trim() || slashCommandActive ? (
              <button type="submit" className="hover:text-gray-700 transition-colors">
                <Send size={24} />
              </button>
            ) : (
              <button type="button" onClick={handleVoiceNote} className={`hover:text-gray-700 transition-colors ${isRecording ? 'text-red-500 animate-pulse' : ''}`}>
                <Mic size={24} />
              </button>
            )}
          </div>
        </form>

      </div>

      {/* Contact Info Right Sidebar */}
      {isContactInfoOpen && activeChatData && (
        <div className={`hidden md:flex flex-col w-[350px] border-l shrink-0 transition-all duration-300 z-20 shadow-[-10px_0_20px_rgba(0,0,0,0.05)] ${isDarkMode ? 'bg-[#111b21] border-[#222d34]' : 'bg-[#f0f2f5] border-gray-200'}`}>
          <div className={`h-[60px] flex items-center px-6 shrink-0 border-b ${isDarkMode ? 'bg-[#202c33] border-[#222d34] text-[#e9edef]' : 'bg-[#f0f2f5] border-gray-300 text-gray-800'}`}>
            <button onClick={() => setIsContactInfoOpen(false)} className={`mr-6 transition-colors ${isDarkMode ? 'hover:text-[#aebac1]' : 'hover:text-gray-500'}`}>
              <X size={20} />
            </button>
            <h2 className="text-[16px] font-medium">Contact info</h2>
          </div>
          
          <div className={`flex-1 overflow-y-auto ${isDarkMode ? 'bg-[#0b141a]' : 'bg-[#efeae2]'}`}>
            {/* Profile Info */}
            <div className={`flex flex-col items-center py-8 px-4 mb-2 shadow-sm ${isDarkMode ? 'bg-[#111b21]' : 'bg-white'}`}>
              <img src={activeChatData.avatar} alt={activeChatData.name} className="w-48 h-48 rounded-full object-cover mb-6 shadow-md" />
              <h2 className={`text-2xl font-normal mb-1 ${isDarkMode ? 'text-[#e9edef]' : 'text-gray-900'}`}>{activeChatData.name}</h2>
              <p className={`text-lg mb-6 ${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'}`}>+91 98765 43210</p>
              
              <div className="flex gap-8 w-full justify-center">
                <button onClick={() => setIsCalling(true)} className={`flex flex-col items-center p-3 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-[#202c33] text-[#00a884]' : 'hover:bg-gray-50 text-green-600'}`}>
                  <Phone size={24} className="mb-2" />
                  <span className="text-sm">Audio</span>
                </button>
                <button onClick={() => { setCallType('video'); setIsCalling(true); }} className={`flex flex-col items-center p-3 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-[#202c33] text-[#00a884]' : 'hover:bg-gray-50 text-green-600'}`}>
                  <Video size={24} className="mb-2" />
                  <span className="text-sm">Video</span>
                </button>
                <button onClick={() => setIsChatSearchOpen(true)} className={`flex flex-col items-center p-3 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-[#202c33] text-[#00a884]' : 'hover:bg-gray-50 text-green-600'}`}>
                  <Search size={24} className="mb-2" />
                  <span className="text-sm">Search</span>
                </button>
              </div>
            </div>
            
            {/* Bio */}
            <div className={`p-5 mb-2 shadow-sm ${isDarkMode ? 'bg-[#111b21]' : 'bg-white'}`}>
              <h3 className={`text-sm mb-1 ${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'}`}>About</h3>
              <p className={`text-[15px] ${isDarkMode ? 'text-[#e9edef]' : 'text-gray-900'}`}>Available on CoreNet.</p>
            </div>
            
            {/* Media/Links/Docs */}
            <div className={`p-5 mb-2 shadow-sm cursor-pointer transition-colors flex justify-between items-center ${isDarkMode ? 'bg-[#111b21] hover:bg-[#202c33]' : 'bg-white hover:bg-gray-50'}`}>
              <span className={`text-[15px] ${isDarkMode ? 'text-[#e9edef]' : 'text-gray-900'}`}>Media, links and docs</span>
              <div className="flex items-center text-gray-500 text-sm">
                <span>12</span>
                <ChevronDown size={16} className="-rotate-90 ml-2" />
              </div>
            </div>
            
            {/* Actions */}
            <div className={`flex flex-col py-2 mb-2 shadow-sm ${isDarkMode ? 'bg-[#111b21]' : 'bg-white'}`}>
              <button onClick={() => { setIsMuteModalOpen(true); }} className={`flex items-center px-5 py-4 transition-colors ${isDarkMode ? 'hover:bg-[#202c33] text-[#e9edef]' : 'hover:bg-gray-50 text-gray-900'}`}>
                <div className="w-10 text-gray-500"><Radio size={20} /></div>
                <span className="text-[15px]">Mute notifications</span>
              </button>
              <button onClick={() => { setIsDisappearingModalOpen(true); }} className={`flex items-center px-5 py-4 transition-colors ${isDarkMode ? 'hover:bg-[#202c33] text-[#e9edef]' : 'hover:bg-gray-50 text-gray-900'}`}>
                <div className="w-10 text-gray-500"><Settings size={20} /></div>
                <span className="text-[15px]">Disappearing messages</span>
              </button>
            </div>
            
            {/* Danger Actions */}
            <div className={`flex flex-col py-2 mb-8 shadow-sm ${isDarkMode ? 'bg-[#111b21]' : 'bg-white'}`}>
              <button onClick={() => { setIsBlockModalOpen(true); }} className={`flex items-center px-5 py-4 transition-colors ${isDarkMode ? 'hover:bg-[#202c33] text-red-400' : 'hover:bg-gray-50 text-red-500'}`}>
                <div className="w-10"><X size={20} /></div>
                <span className="text-[15px]">Block {activeChatData.name}</span>
              </button>
              <button onClick={() => { setIsReportModalOpen(true); }} className={`flex items-center px-5 py-4 transition-colors ${isDarkMode ? 'hover:bg-[#202c33] text-red-400' : 'hover:bg-gray-50 text-red-500'}`}>
                <div className="w-10"><Info size={20} /></div>
                <span className="text-[15px]">Report {activeChatData.name}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dropdown Modals */}
      {isMuteModalOpen && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={`rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl ${isDarkMode ? 'bg-[#202c33] text-[#e9edef]' : 'bg-white text-gray-800'}`}>
            <div className="p-6">
              <h3 className="text-xl font-medium mb-4">Mute notifications</h3>
              <p className={`text-sm mb-6 ${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'}`}>Other participants will not see that you muted this chat. You will still be notified if you are mentioned.</p>
              <div className="space-y-4 mb-6">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="mute" className="mr-3 w-4 h-4 text-[#00a884] bg-transparent border-gray-500 focus:ring-[#00a884]" />
                  <span>8 hours</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="mute" className="mr-3 w-4 h-4 text-[#00a884] bg-transparent border-gray-500 focus:ring-[#00a884]" />
                  <span>1 week</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="mute" defaultChecked className="mr-3 w-4 h-4 text-[#00a884] bg-transparent border-gray-500 focus:ring-[#00a884]" />
                  <span>Always</span>
                </label>
              </div>
            </div>
            <div className={`p-4 flex justify-end space-x-3 bg-opacity-50 ${isDarkMode ? 'bg-[#111b21]' : 'bg-gray-50'}`}>
              <button onClick={() => setIsMuteModalOpen(false)} className={`px-4 py-2 rounded-full font-medium transition-colors ${isDarkMode ? 'hover:bg-[#2a3942] text-[#00a884]' : 'hover:bg-gray-200 text-[#00a884]'}`}>Cancel</button>
              <button onClick={() => setIsMuteModalOpen(false)} className="px-4 py-2 rounded-full font-medium bg-[#00a884] text-white hover:bg-emerald-600 transition-colors shadow-sm">Mute</button>
            </div>
          </div>
        </div>
      )}

      {isDisappearingModalOpen && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={`rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl ${isDarkMode ? 'bg-[#202c33] text-[#e9edef]' : 'bg-white text-gray-800'}`}>
            <div className="p-6 text-center flex flex-col items-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDarkMode ? 'bg-[#111b21]' : 'bg-gray-100'}`}>
                <Settings size={32} className="text-[#00a884]" />
              </div>
              <h3 className="text-xl font-medium mb-2">Disappearing messages</h3>
              <p className={`text-sm mb-6 ${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'}`}>Make messages in this chat disappear for everyone after they are sent.</p>
              
              <div className="w-full text-left space-y-4 mb-2">
                <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-black/5">
                  <span>24 hours</span>
                  <input type="radio" name="disappear" className="w-4 h-4 text-[#00a884] focus:ring-[#00a884]" />
                </label>
                <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-black/5">
                  <span>7 days</span>
                  <input type="radio" name="disappear" className="w-4 h-4 text-[#00a884] focus:ring-[#00a884]" />
                </label>
                <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-black/5">
                  <span>90 days</span>
                  <input type="radio" name="disappear" className="w-4 h-4 text-[#00a884] focus:ring-[#00a884]" />
                </label>
                <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-black/5">
                  <span>Off</span>
                  <input type="radio" name="disappear" defaultChecked className="w-4 h-4 text-[#00a884] focus:ring-[#00a884]" />
                </label>
              </div>
            </div>
            <div className={`p-4 flex justify-end space-x-3 bg-opacity-50 ${isDarkMode ? 'bg-[#111b21]' : 'bg-gray-50'}`}>
              <button onClick={() => setIsDisappearingModalOpen(false)} className={`px-4 py-2 rounded-full font-medium transition-colors ${isDarkMode ? 'hover:bg-[#2a3942] text-[#00a884]' : 'hover:bg-gray-200 text-[#00a884]'}`}>Cancel</button>
              <button onClick={() => setIsDisappearingModalOpen(false)} className="px-4 py-2 rounded-full font-medium bg-[#00a884] text-white hover:bg-emerald-600 transition-colors shadow-sm">Save</button>
            </div>
          </div>
        </div>
      )}

      {isAddToListModalOpen && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={`rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl ${isDarkMode ? 'bg-[#202c33] text-[#e9edef]' : 'bg-white text-gray-800'}`}>
            <div className="p-6">
              <h3 className="text-xl font-medium mb-4">Add to list</h3>
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                <label className="flex items-center cursor-pointer p-3 rounded-lg hover:bg-black/5 transition-colors">
                  <input type="checkbox" className="mr-4 w-5 h-5 rounded border-gray-400 text-[#00a884] focus:ring-[#00a884]" />
                  <span className="font-medium">Family</span>
                </label>
                <label className="flex items-center cursor-pointer p-3 rounded-lg hover:bg-black/5 transition-colors">
                  <input type="checkbox" className="mr-4 w-5 h-5 rounded border-gray-400 text-[#00a884] focus:ring-[#00a884]" />
                  <span className="font-medium">Work</span>
                </label>
                <label className="flex items-center cursor-pointer p-3 rounded-lg hover:bg-black/5 transition-colors">
                  <input type="checkbox" className="mr-4 w-5 h-5 rounded border-gray-400 text-[#00a884] focus:ring-[#00a884]" />
                  <span className="font-medium">Friends</span>
                </label>
              </div>
              <button className={`w-full py-3 flex items-center justify-center border-t transition-colors ${isDarkMode ? 'border-[#222d34] hover:bg-[#111b21] text-[#00a884]' : 'border-gray-200 hover:bg-gray-50 text-[#00a884]'}`}>
                <Plus size={18} className="mr-2" /> Create new list
              </button>
            </div>
            <div className={`p-4 flex justify-end space-x-3 bg-opacity-50 ${isDarkMode ? 'bg-[#111b21]' : 'bg-gray-50'}`}>
              <button onClick={() => setIsAddToListModalOpen(false)} className={`px-4 py-2 rounded-full font-medium transition-colors ${isDarkMode ? 'hover:bg-[#2a3942] text-[#00a884]' : 'hover:bg-gray-200 text-[#00a884]'}`}>Cancel</button>
              <button onClick={() => setIsAddToListModalOpen(false)} className="px-4 py-2 rounded-full font-medium bg-[#00a884] text-white hover:bg-emerald-600 transition-colors shadow-sm">Save</button>
            </div>
          </div>
        </div>
      )}

      {isCallLinkModalOpen && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={`rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl ${isDarkMode ? 'bg-[#202c33] text-[#e9edef]' : 'bg-white text-gray-800'}`}>
            <div className="p-6 text-center flex flex-col items-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDarkMode ? 'bg-[#111b21]' : 'bg-green-100'}`}>
                <Phone size={32} className="text-[#00a884]" />
              </div>
              <h3 className="text-xl font-medium mb-2">Send call link</h3>
              <p className={`text-sm mb-6 ${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'}`}>Anyone with QuickChat can use this link to join this call. Only share it with people you trust.</p>
              
              <div className={`w-full p-3 rounded-lg mb-6 flex justify-between items-center ${isDarkMode ? 'bg-[#111b21]' : 'bg-gray-100'}`}>
                <span className="text-sm truncate text-[#00a884]">https://quickchat.com/call/abc-xyz-123</span>
              </div>
            </div>
            <div className={`p-4 flex justify-center space-x-3 bg-opacity-50 ${isDarkMode ? 'bg-[#111b21]' : 'bg-gray-50'}`}>
              <button onClick={() => setIsCallLinkModalOpen(false)} className={`flex-1 py-2 rounded-full font-medium transition-colors border ${isDarkMode ? 'border-[#8696a0] hover:bg-[#2a3942]' : 'border-gray-300 hover:bg-gray-100'}`}>Close</button>
              <button onClick={() => setIsCallLinkModalOpen(false)} className="flex-1 py-2 rounded-full font-medium bg-[#00a884] text-white hover:bg-emerald-600 transition-colors shadow-sm">Copy Link</button>
            </div>
          </div>
        </div>
      )}

      {isReportModalOpen && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={`rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl ${isDarkMode ? 'bg-[#202c33] text-[#e9edef]' : 'bg-white text-gray-800'}`}>
            <div className="p-6">
              <h3 className="text-xl font-medium mb-4 text-red-500 flex items-center"><Info size={24} className="mr-2" /> Report contact</h3>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'}`}>
                The last 5 messages from this contact will be forwarded to QuickChat. If you block this contact and delete the chat, messages will only be removed from this device and your devices on the newer versions of QuickChat.
              </p>
              <label className="flex items-center cursor-pointer mb-2">
                <input type="checkbox" defaultChecked className="mr-3 w-5 h-5 rounded border-gray-400 text-[#00a884] focus:ring-[#00a884]" />
                <span className="text-sm font-medium">Block contact and delete chat</span>
              </label>
            </div>
            <div className={`p-4 flex justify-end space-x-3 bg-opacity-50 ${isDarkMode ? 'bg-[#111b21]' : 'bg-gray-50'}`}>
              <button onClick={() => setIsReportModalOpen(false)} className={`px-4 py-2 rounded-full font-medium transition-colors ${isDarkMode ? 'hover:bg-[#2a3942] text-[#00a884]' : 'hover:bg-gray-200 text-[#00a884]'}`}>Cancel</button>
              <button onClick={() => { setIsReportModalOpen(false); handleDeleteContact({stopPropagation:()=>{}}, activeChat); }} className="px-4 py-2 rounded-full font-medium bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm">Report</button>
            </div>
          </div>
        </div>
      )}

      {isBlockModalOpen && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={`rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl ${isDarkMode ? 'bg-[#202c33] text-[#e9edef]' : 'bg-white text-gray-800'}`}>
            <div className="p-6">
              <h3 className="text-xl font-medium mb-4 flex items-center"><X size={24} className="mr-2 text-red-500" /> Block contact?</h3>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'}`}>
                Blocked contacts will no longer be able to call you or send you messages. This contact will not be notified.
              </p>
              <label className="flex items-center cursor-pointer mb-2">
                <input type="checkbox" className="mr-3 w-5 h-5 rounded border-gray-400 text-[#00a884] focus:ring-[#00a884]" />
                <span className="text-sm font-medium">Report contact</span>
              </label>
              <p className={`text-xs ml-8 ${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'}`}>The last 5 messages from this contact will be forwarded to QuickChat.</p>
            </div>
            <div className={`p-4 flex justify-end space-x-3 bg-opacity-50 ${isDarkMode ? 'bg-[#111b21]' : 'bg-gray-50'}`}>
              <button onClick={() => setIsBlockModalOpen(false)} className={`px-4 py-2 rounded-full font-medium transition-colors ${isDarkMode ? 'hover:bg-[#2a3942] text-[#00a884]' : 'hover:bg-gray-200 text-[#00a884]'}`}>Cancel</button>
              <button onClick={() => { setIsBlockModalOpen(false); handleDeleteContact({stopPropagation:()=>{}}, activeChat); }} className="px-4 py-2 rounded-full font-medium bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm">Block</button>
            </div>
          </div>
        </div>
      )}
      {isCalling && (
        <div className="fixed inset-0 z-[120] bg-[#050505]/95 backdrop-blur-3xl flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500 overflow-hidden" style={{ perspective: '1000px' }}>
          {}
          <div className="absolute inset-0 z-0 flex items-center justify-center" style={{ perspective: '1000px' }}>
            <div className="w-[200vw] h-[200vh] border-t border-[#FF9933]/20 absolute bottom-[-50vh] opacity-40 animate-[pulse_4s_ease-in-out_infinite]"
                 style={{
                   transform: 'rotateX(60deg)',
                   backgroundImage: 'linear-gradient(transparent 95%, rgba(19,136,8,0.2) 100%), linear-gradient(90deg, transparent 95%, rgba(255,153,51,0.2) 100%)',
                   backgroundSize: '40px 40px'
                 }}
            ></div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#FF9933]/10 via-transparent to-[#138808]/10 rounded-full blur-[80px] animate-[spin_10s_linear_infinite]"></div>
          
          <div className="relative z-10 flex flex-col items-center" style={{ transformStyle: 'preserve-3d' }}>
            {}
            <div className="relative w-56 h-56 mb-12">
               {}
               <div className="absolute inset-[-20px] rounded-full border border-[#FF9933]/40 border-t-transparent animate-[spin_3s_linear_infinite]"></div>
               <div className="absolute inset-[-40px] rounded-full border border-[#138808]/40 border-b-transparent animate-[spin_4s_linear_infinite_reverse]"></div>
               <div className="absolute inset-[-10px] rounded-full border-2 border-white/10 border-dashed animate-[spin_10s_linear_infinite]"></div>
               
               {}
               <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#138808]/50 shadow-[0_0_50px_rgba(19,136,8,0.4)] backdrop-blur-sm mix-blend-screen animate-pulse">
                 <img src={activeChatData.avatar} alt="Calling" className="w-full h-full object-cover opacity-80" />
                 {}
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent h-10 w-full animate-[bounce_2s_infinite]"></div>
               </div>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{activeChatData.name}</h2>
            <p className="text-[#FF9933] text-sm font-bold mb-12 tracking-[0.3em] flex items-center bg-[#FF9933]/10 px-4 py-2 rounded-full border border-[#FF9933]/30 shadow-[0_0_15px_rgba(255,153,51,0.2)]">
              <ShieldCheck size={16} className="mr-2" /> 
              {callType === 'video' ? 'HOLO-LINK ESTABLISHED...' : 'SECURE AUDIO LINK...'}
            </p>
            
            <div className="flex space-x-8">
              <button className="w-16 h-16 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <Mic size={28} className="text-white" />
              </button>
              <button onClick={() => setIsCalling(false)} className="w-16 h-16 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all hover:scale-110 border border-red-400">
                <Phone size={28} className="rotate-[135deg] text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      {isAddingContact && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={`border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl ${isDarkMode ? 'bg-[#111111] border-[#222d34]' : 'bg-white border-gray-200'}`}>
            <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-[#222d34] bg-[#202c33]' : 'border-gray-200 bg-[#f0f2f5]'}`}>
              <h3 className={`text-lg font-bold flex items-center ${isDarkMode ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>
                <UserPlus size={20} className="mr-2 text-[#00a884]" /> Add New Contact
              </h3>
              <button onClick={() => setIsAddingContact(false)} className={`transition-colors ${isDarkMode ? 'text-[#8696a0] hover:text-[#e9edef]' : 'text-gray-500 hover:text-gray-700'}`}>
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-xs font-medium mb-1 uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Bharat ID / Phone Number</label>
                <input 
                  type="text" 
                  placeholder="+91 98765 43210" 
                  value={newContactNumber}
                  onChange={(e) => setNewContactNumber(e.target.value)}
                  className={`w-full border rounded-lg p-3 outline-none transition-all ${isDarkMode ? 'bg-[#1a1a1a] border-[#222d34] text-[#e9edef] focus:border-[#00a884]' : 'bg-white border-gray-300 text-[#111b21] focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884]'}`} 
                />
              </div>
              <div>
                <label className={`block text-xs font-medium mb-1 uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Contact Name</label>
                <input 
                  type="text" 
                  placeholder="Enter name" 
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  className={`w-full border rounded-lg p-3 outline-none transition-all ${isDarkMode ? 'bg-[#1a1a1a] border-[#222d34] text-[#e9edef] focus:border-[#00a884]' : 'bg-white border-gray-300 text-[#111b21] focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884]'}`} 
                />
              </div>
            </div>
            
            <div className={`p-4 border-t flex justify-end space-x-3 ${isDarkMode ? 'border-[#222d34] bg-[#202c33]' : 'border-gray-200 bg-[#f0f2f5]'}`}>
              <button onClick={() => setIsAddingContact(false)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDarkMode ? 'hover:bg-[#374045] text-[#8696a0]' : 'hover:bg-gray-200 text-gray-600'}`}>Cancel</button>
              <button onClick={handleSaveContact} className="px-6 py-2 rounded-lg text-sm font-bold bg-[#00a884] text-white hover:bg-[#008f6f] transition-colors shadow-lg">Save Contact</button>
            </div>
          </div>
        </div>
      )}

      {/* Starred Messages Sidebar */}
      {isViewingStarred && (
        <div className={`absolute inset-y-0 left-[60px] z-[100] flex flex-col border-r transition-all duration-300 shadow-2xl ${isDarkMode ? 'bg-[#111b21] border-[#222d34]' : 'bg-white border-gray-200'}`} style={{ width: sidebarWidth }}>
          <div className={`h-[108px] flex items-end px-6 pb-4 shrink-0 ${isDarkMode ? 'bg-[#202c33] text-[#e9edef]' : 'bg-[#00a884] text-white'}`}>
            <div className="flex items-center">
              <button onClick={() => setIsViewingStarred(false)} className={`mr-6 transition-colors ${isDarkMode ? 'hover:text-[#aebac1]' : 'hover:text-gray-200'}`}>
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-[19px] font-medium">Starred messages</h2>
            </div>
          </div>
          <div className={`flex-1 overflow-y-auto ${isDarkMode ? 'bg-[#0b141a]' : 'bg-[#efeae2]'}`}>
            {starredMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-8 text-gray-500">
                <div className="w-32 h-32 rounded-full bg-black/5 flex items-center justify-center mb-6">
                  <Star size={64} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No starred messages</h3>
                <p className="text-sm">Hover over any message in a chat and click the star to save it here.</p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {starredMessages.map(msgId => {
                  let msgText = 'Message';
                  let msgTime = '';
                  let msgSender = '';
                  let chatName = '';
                  
                  Object.entries(messageThreads).forEach(([cId, thread]) => {
                    const msg = thread.find(m => m.id === msgId);
                    if (msg) {
                      msgText = msg.text || 'Attachment/Media';
                      msgTime = msg.time;
                      msgSender = msg.sender === 'me' ? 'You' : (chats.find(c => c.id == cId)?.name || 'Them');
                      chatName = chats.find(c => c.id == cId)?.name || 'Unknown Chat';
                    }
                  });
                  
                  return (
                    <div key={msgId} className={`p-3 rounded-lg shadow-sm ${isDarkMode ? 'bg-[#202c33] text-white' : 'bg-white text-black'}`}>
                      <div className="flex justify-between items-center mb-2 border-b pb-2 border-black/5 dark:border-white/5">
                        <span className="text-sm font-semibold flex items-center gap-2"><UserPlus size={14}/> {chatName}</span>
                        <span className="text-xs text-gray-500">{msgTime}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-1">{msgSender}:</span>
                        <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>{msgText}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Settings Sidebar */}
      {isViewingSettings && (
        <div className={`absolute inset-y-0 left-[60px] z-[100] flex flex-col border-r transition-all duration-300 shadow-2xl ${isDarkMode ? 'bg-[#111b21] border-[#222d34]' : 'bg-white border-gray-200'}`} style={{ width: sidebarWidth }}>
          <div className={`h-[108px] flex items-end px-6 pb-4 shrink-0 ${isDarkMode ? 'bg-[#202c33] text-[#e9edef]' : 'bg-white text-[#111b21]'}`}>
            <div className="flex items-center">
              <button onClick={() => { if(activeSettingsTab === 'main') setIsViewingSettings(false); else setActiveSettingsTab('main'); }} className={`mr-6 transition-colors ${isDarkMode ? 'hover:text-[#aebac1]' : 'hover:text-gray-500'}`}>
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-[19px] font-medium">
                 {activeSettingsTab === 'main' ? 'mdsahil057866' : 
                  activeSettingsTab === 'account' ? 'Account' : 
                  activeSettingsTab === 'privacy' ? 'Privacy' : 
                  activeSettingsTab === 'chats' ? 'Chats' : 
                  activeSettingsTab === 'notifications' ? 'Notifications' : 
                  activeSettingsTab === 'keyboard' ? 'Keyboard shortcuts' : 
                  'Help and feedback'}
              </h2>
            </div>
          </div>
          <div className={`flex-1 overflow-y-auto ${isDarkMode ? 'bg-[#111b21]' : 'bg-white'}`}>
            
            {activeSettingsTab === 'main' && (
              <>
            {/* Search Bar */}
            <div className="px-4 py-2 mt-2">
              <div className={`flex items-center rounded-lg px-4 py-1.5 border-b-2 border-transparent transition-all ${isDarkMode ? 'bg-[#202c33] focus-within:bg-[#111b21] focus-within:border-[#00a884]' : 'bg-[#f0f2f5] focus-within:bg-white focus-within:border-green-500 focus-within:shadow-sm'}`}>
                <Search size={18} className={`${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'} mr-3`} />
                <input type="text" placeholder="Search" className={`bg-transparent border-none outline-none w-full text-sm placeholder-gray-500 ${isDarkMode ? 'text-[#e9edef]' : 'text-[#111b21]'}`} />
              </div>
            </div>

            {/* Large Profile Picture */}
            <div className="flex flex-col items-center justify-center py-6 border-b border-black/5 dark:border-white/5">
              <div className="relative group cursor-pointer" onClick={() => profilePhotoInputRef.current?.click()}>
                <img src={profilePhoto} className="w-40 h-40 rounded-full object-cover shadow-sm transition-transform duration-300 group-hover:scale-[1.02]" alt="Profile" />
                <div className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={28} className="text-white mb-2" />
                  <span className="text-white text-xs uppercase tracking-widest font-medium text-center leading-tight">Change<br/>Profile Photo</span>
                </div>
                <input 
                  type="file" 
                  ref={profilePhotoInputRef} 
                  onChange={handleProfilePhotoChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
            </div>
            
            {/* Settings Options */}
            <div className="flex flex-col mt-2">
              {[
                { id: 'account', icon: <Key size={20} />, title: 'Account', desc: 'Security notifications, account info' },
                { id: 'privacy', icon: <Lock size={20} />, title: 'Privacy', desc: 'Blocked contacts, disappearing messages' },
                { id: 'chats', icon: <MessageSquare size={20} />, title: 'Chats', desc: 'Theme, wallpaper, chat settings' },
                { id: 'notifications', icon: <Bell size={20} />, title: 'Notifications', desc: 'Messages, groups, sounds' },
                { id: 'keyboard', icon: <Keyboard size={20} />, title: 'Keyboard shortcuts', desc: 'Quick actions' },
                { id: 'help', icon: <HelpCircle size={20} />, title: 'Help and feedback', desc: 'Help centre, contact us, privacy policy' },
              ].map((item, i) => (
                <div key={i} onClick={() => setActiveSettingsTab(item.id)} className={`flex items-center px-6 py-4 cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-[#202c33]' : 'hover:bg-gray-50'}`}>
                  <div className={`mr-6 ${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'}`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 border-b border-gray-100 dark:border-[#222d34] pb-4 -mb-4">
                    <h3 className={`text-[16px] mb-1 ${isDarkMode ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>{item.title}</h3>
                    <p className={`text-[13px] ${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
              <div 
                onClick={() => window.location.href = '/'}
                className={`flex items-center px-6 py-4 cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-[#202c33]' : 'hover:bg-gray-50'}`}
              >
                <div className="mr-6 text-red-500">
                  <LogOut size={20} />
                </div>
                <div className="flex-1 pb-4 -mb-4 border-b border-transparent">
                  <h3 className="text-[16px] mb-1 text-red-500">Log out</h3>
                </div>
              </div>
            </div>
            </>
            )}

            {activeSettingsTab === 'account' && (
               <div className="flex flex-col mt-2">
                 {[
                   { icon: <ShieldCheck size={20} />, title: 'Security notifications' },
                   { icon: <Lock size={20} />, title: 'Passkeys' },
                   { icon: <FileText size={20} />, title: 'Request account info' },
                   { icon: <Trash2 size={20} className="text-red-500" />, title: <span className="text-red-500">Delete account</span> },
                 ].map((item, i) => (
                   <div key={i} className={`flex items-center px-6 py-4 cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-[#202c33]' : 'hover:bg-gray-50'}`}>
                     <div className={`mr-6 ${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'}`}>{item.icon}</div>
                     <div className="flex-1 border-b border-gray-100 dark:border-[#222d34] pb-4 -mb-4"><h3 className={`text-[16px] ${isDarkMode ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>{item.title}</h3></div>
                   </div>
                 ))}
               </div>
            )}

            {activeSettingsTab === 'privacy' && (
               <div className="flex flex-col">
                 {/* Security Shield Animation block */}
                 <div className={`p-6 border-b flex flex-col items-center justify-center text-center ${isDarkMode ? 'border-[#222d34] bg-[#202c33]/50' : 'border-gray-100 bg-green-50/50'}`}>
                   <div className="relative mb-4">
                     <div className="absolute inset-0 bg-[#00a884] rounded-full blur-xl opacity-30 animate-[pulse_2s_ease-in-out_infinite]"></div>
                     <div className={`w-20 h-20 rounded-full flex items-center justify-center relative shadow-[0_0_15px_rgba(0,168,132,0.4)] ${isDarkMode ? 'bg-[#00a884]/20' : 'bg-green-100'}`}>
                       <ShieldCheck size={40} className="text-[#00a884]" />
                     </div>
                   </div>
                   <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>Advanced Security</h3>
                   <p className={`text-sm max-w-xs font-medium ${isDarkMode ? 'text-[#00a884]' : 'text-emerald-700'}`}>Advanced security aur privacy ke saath aapka data surakshit.</p>
                 </div>
                 <div className={`px-6 py-4 text-sm font-medium ${isDarkMode ? 'text-[#00a884]' : 'text-[#008069]'}`}>Who can see my personal info</div>
                 {[
                   { title: 'Last seen and online', value: 'Nobody' },
                   { title: 'Profile photo', value: 'My contacts' },
                   { title: 'About', value: 'Everyone' },
                   { title: 'Status', value: 'My contacts' },
                 ].map((item, i) => (
                   <div key={i} className={`flex flex-col px-6 py-4 cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-[#202c33]' : 'hover:bg-gray-50'}`}>
                     <h3 className={`text-[16px] mb-1 ${isDarkMode ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>{item.title}</h3>
                     <p className={`text-[14px] ${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'}`}>{item.value}</p>
                   </div>
                 ))}
                 <div className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-[#202c33]' : 'hover:bg-gray-50'}`}>
                   <div className="flex-1 pr-4">
                     <h3 className={`text-[16px] mb-1 ${isDarkMode ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>Read receipts</h3>
                     <p className={`text-[14px] ${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'}`}>If turned off, you won't send or receive Read receipts. Read receipts are always sent for group chats.</p>
                   </div>
                   <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-400 text-[#00a884] focus:ring-[#00a884]" />
                 </div>

                 {/* Advanced Anti-Spy Features */}
                 <div className={`px-6 py-4 mt-2 text-sm font-medium flex items-center gap-2 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>
                   <Lock size={16} /> Anti-Spyware Tools
                 </div>
                 
                 <div className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-[#202c33]' : 'hover:bg-gray-50'}`}>
                   <div className="flex-1 pr-4">
                     <h3 className={`text-[16px] mb-1 font-medium ${isDarkMode ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>Screen Security</h3>
                     <p className={`text-[14px] ${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'}`}>Block screenshots in the recent apps list and inside the app.</p>
                   </div>
                   <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-400 text-[#00a884] focus:ring-[#00a884]" />
                 </div>

                 <div className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-[#202c33]' : 'hover:bg-gray-50'}`}>
                   <div className="flex-1 pr-4">
                     <h3 className={`text-[16px] mb-1 font-medium ${isDarkMode ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>Incognito Keyboard</h3>
                     <p className={`text-[14px] ${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'}`}>Request keyboard to disable personalized learning.</p>
                   </div>
                   <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-400 text-[#00a884] focus:ring-[#00a884]" />
                 </div>
               </div>
            )}

            {activeSettingsTab === 'chats' && (
               <div className="flex flex-col">
                 <div className={`px-6 py-4 text-sm font-medium ${isDarkMode ? 'text-[#00a884]' : 'text-[#008069]'}`}>Display</div>
                 <div onClick={() => setIsDarkMode(!isDarkMode)} className={`flex flex-col px-6 py-4 cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-[#202c33]' : 'hover:bg-gray-50'}`}>
                   <h3 className={`text-[16px] mb-1 ${isDarkMode ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>Theme</h3>
                   <p className={`text-[14px] ${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'}`}>{isDarkMode ? 'Dark' : 'Light'}</p>
                 </div>
                 <div className={`flex flex-col px-6 py-4 cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-[#202c33]' : 'hover:bg-gray-50'}`}>
                   <h3 className={`text-[16px] mb-1 ${isDarkMode ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>Chat wallpaper</h3>
                 </div>
                 
                 <div className={`px-6 py-4 mt-2 text-sm font-medium ${isDarkMode ? 'text-[#00a884]' : 'text-[#008069]'}`}>Chat settings</div>
                 <div className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-[#202c33]' : 'hover:bg-gray-50'}`}>
                   <div className="flex-1 pr-4">
                     <h3 className={`text-[16px] mb-1 ${isDarkMode ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>Enter is send</h3>
                     <p className={`text-[14px] ${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'}`}>Enter key will send your message</p>
                   </div>
                   <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-400 text-[#00a884] focus:ring-[#00a884]" />
                 </div>
               </div>
            )}

            {activeSettingsTab === 'notifications' && (
               <div className="flex flex-col">
                 <div className={`px-6 py-4 text-sm font-medium ${isDarkMode ? 'text-[#00a884]' : 'text-[#008069]'}`}>Messages</div>
                 {[
                   { title: 'Message notifications', desc: 'Show notifications for new messages' },
                   { title: 'Show previews', desc: 'Show message text in new message notifications' },
                   { title: 'Show reaction notifications', desc: 'Show notifications for reactions to messages you send' },
                 ].map((item, i) => (
                   <div key={i} className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-[#202c33]' : 'hover:bg-gray-50'}`}>
                     <div className="flex-1 pr-4">
                       <h3 className={`text-[16px] mb-1 ${isDarkMode ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>{item.title}</h3>
                       <p className={`text-[14px] ${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'}`}>{item.desc}</p>
                     </div>
                     <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-400 text-[#00a884] focus:ring-[#00a884]" />
                   </div>
                 ))}
               </div>
            )}

            {activeSettingsTab === 'keyboard' && (
               <div className="flex flex-col p-6 space-y-6">
                 {[
                   { label: 'Mark as unread', key: 'Ctrl + Shift + U' },
                   { label: 'Archive chat', key: 'Ctrl + Shift + E' },
                   { label: 'Pin chat', key: 'Ctrl + Shift + P' },
                   { label: 'Search chat', key: 'Ctrl + Shift + F' },
                   { label: 'New group', key: 'Ctrl + Shift + N' },
                   { label: 'Settings', key: 'Ctrl + ,' },
                   { label: 'Mute', key: 'Ctrl + Shift + M' },
                   { label: 'Delete chat', key: 'Ctrl + Shift + D' },
                   { label: 'Search', key: 'Ctrl + F' },
                   { label: 'New chat', key: 'Ctrl + N' },
                 ].map((item, i) => (
                   <div key={i} className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-4">
                     <span className={`text-[15px] ${isDarkMode ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>{item.label}</span>
                     <span className={`px-2 py-1 rounded text-[13px] ${isDarkMode ? 'bg-[#2a3942] text-[#8696a0]' : 'bg-gray-100 text-gray-600'}`}>{item.key}</span>
                   </div>
                 ))}
               </div>
            )}

            {activeSettingsTab === 'help' && (
               <div className="flex flex-col mt-2">
                 {[
                   { icon: <HelpCircle size={20} />, title: 'Help centre', desc: 'Get help, contact us' },
                   { icon: <FileText size={20} />, title: 'Terms and Privacy Policy' },
                   { icon: <Info size={20} />, title: 'Channel info' },
                 ].map((item, i) => (
                   <div key={i} className={`flex items-center px-6 py-4 cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-[#202c33]' : 'hover:bg-gray-50'}`}>
                     <div className={`mr-6 ${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'}`}>{item.icon}</div>
                     <div className="flex-1 border-b border-gray-100 dark:border-[#222d34] pb-4 -mb-4">
                       <h3 className={`text-[16px] ${item.desc ? 'mb-1' : ''} ${isDarkMode ? 'text-[#e9edef]' : 'text-[#111b21]'}`}>{item.title}</h3>
                       {item.desc && <p className={`text-[13px] ${isDarkMode ? 'text-[#8696a0]' : 'text-gray-500'}`}>{item.desc}</p>}
                     </div>
                   </div>
                 ))}
               </div>
            )}

          </div>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#050505]/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="relative w-full max-w-md">
            {}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-[#138808] to-teal-500 rounded-3xl blur-xl opacity-50 animate-[pulse_3s_ease-in-out_infinite]"></div>
            
            <div className={`relative rounded-3xl w-full overflow-hidden shadow-[0_0_50px_rgba(19,136,8,0.2)] border ${isDarkMode ? 'bg-[#0b141a]/95 border-emerald-500/30' : 'bg-white/95 border-emerald-200'} backdrop-blur-xl`}>
              
              {}
              <div className="flex items-center justify-between p-5 border-b border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-transparent">
                <h3 className={`text-xl font-extrabold flex items-center tracking-tight ${isDarkMode ? 'text-white' : 'text-[#111b21]'}`}>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-[#138808] flex items-center justify-center mr-3 shadow-lg shadow-emerald-500/30">
                    <IndianRupee size={16} className="text-white" />
                  </div>
                  SwiftPay
                </h3>
                <button onClick={() => setIsPaymentModalOpen(false)} className="text-gray-400 hover:text-emerald-500 transition-colors p-2 rounded-full hover:bg-emerald-500/10">
                  <X size={24} />
                </button>
              </div>
              
              {}
              <div className="p-8 flex flex-col items-center justify-center relative">
                
                {}
                <div className="relative mb-6 group">
                  <div className="absolute inset-0 bg-[#138808] rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity animate-pulse"></div>
                  <img src={activeChatData.avatar} alt="Contact" className="relative w-24 h-24 rounded-full object-cover border-4 border-[#138808] shadow-xl z-10" />
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1.5 border-2 border-white shadow-lg z-20">
                    <ShieldCheck size={16} />
                  </div>
                </div>
                
                <h4 className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-[#111b21]'}`}>{activeChatData.name}</h4>
                <p className={`text-sm font-medium tracking-widest uppercase mb-8 ${isDarkMode ? 'text-emerald-400/80' : 'text-emerald-600/80'}`}>UPI: {activeChatData.name.toLowerCase().replace(/ /g, '')}@bharat</p>

                {/* Amount Input */}
                <div className="w-full relative group mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500`}></div>
                  <span className={`absolute left-6 top-1/2 -translate-y-1/2 text-4xl font-light ${isDarkMode ? 'text-emerald-500' : 'text-emerald-600'}`}>₹</span>
                  <input 
                    type="number" 
                    placeholder="0" 
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className={`w-full rounded-2xl p-6 pl-14 text-5xl font-black text-center outline-none transition-all bg-transparent border-2 ${isDarkMode ? 'border-emerald-500/30 text-white focus:border-emerald-500' : 'border-emerald-200 text-[#111b21] focus:border-emerald-500 focus:bg-emerald-50/50'}`} 
                    autoFocus
                  />
                </div>

                {/* Note Input */}
                <div className="w-full">
                  <input 
                    type="text" 
                    placeholder="What's this for?" 
                    value={paymentNote}
                    onChange={(e) => setPaymentNote(e.target.value)}
                    className={`w-full rounded-xl p-4 outline-none transition-all text-center border font-medium ${isDarkMode ? 'bg-black/20 border-emerald-500/20 text-white focus:border-emerald-500/50' : 'bg-gray-50 border-gray-200 text-[#111b21] focus:border-emerald-300 focus:bg-white'}`} 
                  />
                </div>
              </div>
              
              {/* Footer / Action */}
              <div className="p-6 pt-2">
                <button 
                  onClick={handleSendPayment} 
                  disabled={!paymentAmount || Number(paymentAmount) <= 0}
                  className={`relative w-full py-4 rounded-xl text-lg font-bold text-white transition-all overflow-hidden flex justify-center items-center group ${paymentAmount && Number(paymentAmount) > 0 ? 'bg-gradient-to-r from-[#138808] to-emerald-500 hover:scale-[1.02] shadow-[0_10px_20px_rgba(19,136,8,0.3)]' : 'bg-gray-500/50 cursor-not-allowed text-gray-300'}`}
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative z-10 flex items-center">
                    <ShieldCheck size={24} className="mr-2" /> Pay Securely
                  </span>
                </button>
                <p className="text-center text-[10px] uppercase tracking-widest text-emerald-500/60 mt-4 font-bold flex justify-center items-center">
                  <Check size={12} className="mr-1" /> 100% Secure by CoreNet
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Status Modal */}
      {isAddingStatus && (
        <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <h3 className="text-lg font-bold flex items-center text-white">
                <CircleDashed size={20} className="mr-2 text-[#FF9933]" /> Create Status Update
              </h3>
              <button onClick={() => setIsAddingStatus(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 flex flex-col items-center justify-center space-y-6">
               {(statusUploadType === 'image' || statusUploadType === 'video') && newStatusContent ? (
                 <div className="relative w-full h-[400px] rounded-xl overflow-hidden border border-white/20 bg-black flex items-center justify-center shadow-[0_0_20px_rgba(19,136,8,0.3)]">
                   {statusUploadType === 'video' ? (
                     <video src={newStatusContent} autoPlay loop muted playsInline className="w-full h-full object-contain" />
                   ) : (
                     <img src={newStatusContent} alt="Preview" className="w-full h-full object-contain" />
                   )}
                   <button onClick={() => { setStatusUploadType(null); setNewStatusContent(''); }} className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/90 rounded-full text-white backdrop-blur-md transition-colors shadow-lg z-10">
                     <X size={16} />
                   </button>
                 </div>
               ) : statusUploadType === 'text' ? (
                 <div className="w-full flex flex-col space-y-4">
                   <div className={`relative w-full aspect-[9/16] max-h-[300px] rounded-xl overflow-hidden border border-white/20 flex items-center justify-center shadow-lg transition-colors ${newStatusBgColor}`}>
                     <textarea 
                       autoFocus
                       value={newStatusContent}
                       onChange={(e) => setNewStatusContent(e.target.value)}
                       placeholder="Type a status..." 
                       className="w-full h-full bg-transparent text-white placeholder-white/50 text-center text-2xl font-bold outline-none resize-none p-6 flex items-center justify-center"
                     />
                     <button onClick={() => { setStatusUploadType(null); setNewStatusContent(''); }} className="absolute top-3 right-3 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-md transition-colors shadow-lg">
                       <X size={16} />
                     </button>
                   </div>
                   <div className="flex justify-center space-x-3">
                     {['bg-gradient-to-br from-blue-500 to-purple-600', 'bg-gradient-to-br from-[#FF9933] to-red-500', 'bg-gradient-to-br from-[#138808] to-teal-500', 'bg-gray-800'].map((bg, i) => (
                       <button key={i} onClick={() => setNewStatusBgColor(bg)} className={`w-8 h-8 rounded-full border-2 ${newStatusBgColor === bg ? 'border-white scale-110' : 'border-transparent'} ${bg} transition-all`}></button>
                     ))}
                   </div>
                 </div>
               ) : (
                 <div className="flex space-x-6">
                   <button onClick={() => alert("Camera API not connected in this demo")} className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-white/5 border border-white/10 hover:border-[#138808] hover:bg-[#138808]/10 transition-all group">
                     <Camera size={32} className="text-gray-400 group-hover:text-[#138808] mb-2" />
                     <span className="text-xs text-gray-300">Camera</span>
                   </button>
                   <button onClick={() => statusFileInputRef.current?.click()} className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500 hover:bg-blue-500/10 transition-all group">
                     <ImageIcon size={32} className="text-gray-400 group-hover:text-blue-500 mb-2" />
                     <span className="text-xs text-gray-300">Gallery</span>
                   </button>
                   <input type="file" ref={statusFileInputRef} onChange={handleStatusFileSelect} accept="image/*,video/*" className="hidden" />
                   <button onClick={() => { setStatusUploadType('text'); setNewStatusContent(''); }} className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF9933] hover:bg-[#FF9933]/10 transition-all group">
                     <Type size={32} className="text-gray-400 group-hover:text-[#FF9933] mb-2" />
                     <span className="text-xs text-gray-300">Text</span>
                   </button>
                 </div>
               )}
               
               <p className="text-xs text-gray-500 text-center max-w-xs">
                 Status updates are end-to-end encrypted and will disappear after 24 hours.
               </p>
            </div>
            
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end space-x-3">
              <button onClick={() => { setIsAddingStatus(false); setStatusUploadType(null); setNewStatusContent(''); }} className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">Cancel</button>
              <button onClick={handleUploadStatus} disabled={!newStatusContent} className={`px-6 py-2 rounded-lg text-sm font-bold text-white transition-colors shadow-lg ${newStatusContent ? 'bg-[#138808] hover:bg-emerald-600' : 'bg-gray-600 cursor-not-allowed opacity-50'}`}>Upload to CoreNet</button>
            </div>
          </div>
        </div>
      )}

      {/* Add to Group Modal */}
      {isAddingToGroup && selectedGroup && (
        <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <h3 className="text-lg font-bold flex items-center text-white">
                <UserPlus size={20} className="mr-2 text-[#FF9933]" /> Add to Group
              </h3>
              <button onClick={() => setIsAddingToGroup(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center p-3 bg-white/5 rounded-xl border border-white/10 mb-4">
                <img src={selectedGroup.avatar} alt="Group" className="w-10 h-10 rounded-lg object-cover mr-3" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Adding to</p>
                  <p className="font-bold text-white text-sm">{selectedGroup.name}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Bharat ID / Phone Number</label>
                <input 
                  type="text" 
                  placeholder="+91 98765 43210 or @bharatID" 
                  value={groupMemberInput}
                  onChange={(e) => setGroupMemberInput(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white focus:border-[#138808] focus:shadow-[0_0_10px_rgba(19,136,8,0.2)] outline-none transition-all" 
                />
              </div>
            </div>
            
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end space-x-3">
              <button onClick={() => { setIsAddingToGroup(false); setGroupMemberInput(''); }} className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">Cancel</button>
              <button onClick={() => { setIsAddingToGroup(false); setGroupMemberInput(''); }} className="px-6 py-2 rounded-lg text-sm font-bold bg-gradient-to-r from-[#FF9933] to-[#138808] text-white hover:scale-105 transition-transform shadow-lg">Add Member</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Group Modal */}
      {isCreatingGroup && (
        <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <h3 className="text-lg font-bold flex items-center text-white">
                <Users size={20} className="mr-2 text-[#138808]" /> Create Community
              </h3>
              <button onClick={() => { setIsCreatingGroup(false); setNewGroupIcon(null); }} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-center mb-6 relative">
                 <div onClick={() => groupIconInputRef.current?.click()} className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors group overflow-hidden">
                    {newGroupIcon ? (
                      <img src={newGroupIcon} alt="Group Icon" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <Camera size={24} className="text-gray-400 group-hover:text-white mb-1" />
                        <span className="text-[10px] text-gray-500 uppercase">Add Icon</span>
                      </>
                    )}
                 </div>
                 <input type="file" ref={groupIconInputRef} onChange={handleGroupIconSelect} accept="image/*" className="hidden" />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Group Name *</label>
                <input 
                  type="text" 
                  autoFocus
                  placeholder="e.g. Crypto Investors India" 
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white focus:border-[#138808] focus:shadow-[0_0_10px_rgba(19,136,8,0.2)] outline-none transition-all" 
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Description (Optional)</label>
                <textarea 
                  placeholder="What is this community about?" 
                  value={newGroupDesc}
                  onChange={(e) => setNewGroupDesc(e.target.value)}
                  className="w-full h-24 bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white focus:border-[#FF9933] focus:shadow-[0_0_10px_rgba(255,153,51,0.2)] outline-none transition-all resize-none" 
                />
              </div>
            </div>
            
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end space-x-3">
              <button onClick={() => { setIsCreatingGroup(false); setNewGroupIcon(null); }} className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">Cancel</button>
              <button onClick={handleCreateGroup} disabled={!newGroupName.trim()} className={`px-6 py-2 rounded-lg text-sm font-bold text-white transition-all shadow-lg ${newGroupName.trim() ? 'bg-gradient-to-r from-[#FF9933] to-[#138808] hover:scale-105' : 'bg-gray-600 cursor-not-allowed opacity-50'}`}>Create Group</button>
            </div>
          </div>
        </div>
      )}

      {/* View Status Modal */}
      {isViewingStatus && (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col animate-in fade-in zoom-in-95 duration-300">
          <div className="absolute top-0 left-0 w-full p-4 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center">
              <button onClick={() => setIsViewingStatus(null)} className="mr-3 text-white hover:bg-white/20 p-2 rounded-full transition-colors">
                <ArrowLeft size={24} />
              </button>
              <img src={isViewingStatus.avatar} className="w-10 h-10 rounded-full border-2 border-[#138808] mr-3" />
              <div>
                <p className="text-white font-bold text-sm">{isViewingStatus.name}</p>
                <p className="text-white/70 text-xs">{isViewingStatus.time}</p>
              </div>
            </div>
            <MoreVertical size={24} className="text-white cursor-pointer" />
          </div>
          
          <div className="flex-1 flex items-center justify-center relative bg-black/95">
            <div className="absolute top-4 left-0 right-0 flex justify-center z-20 pointer-events-none">
               <div className="w-full max-w-md px-2 flex space-x-1">
                 <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                   <div className="h-full bg-white w-1/3 animate-[pulse_1s_ease-in-out_infinite]"></div>
                 </div>
               </div>
            </div>
            
            <div className={`w-full max-w-md h-full relative flex items-center justify-center overflow-hidden shadow-2xl ${isViewingStatus.statusText ? isViewingStatus.statusBgColor : 'bg-black'}`}>
              {isViewingStatus.statusText ? (
                <h2 className="text-white text-3xl font-bold text-center px-8 leading-relaxed drop-shadow-lg">{isViewingStatus.statusText}</h2>
              ) : isViewingStatus.statusContentType === 'video' ? (
                <video src={isViewingStatus.statusImage} autoPlay loop playsInline className="w-full h-full object-contain" />
              ) : (
                <img src={isViewingStatus.statusImage || isViewingStatus.avatar} className="w-full h-full object-contain" alt="Status content" />
              )}
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 pb-8 flex flex-col items-center bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            {isViewingStatus.isMine ? (
              <div className="flex flex-col items-center cursor-pointer group hover:-translate-y-1 transition-transform">
                <ChevronUp size={24} className="text-white animate-bounce mb-2 group-hover:text-[#FF9933] transition-colors" />
                <div className="flex items-center space-x-2 text-white bg-black/40 px-5 py-2 rounded-full backdrop-blur-md border border-white/20 shadow-lg">
                  <Eye size={18} className="text-[#FF9933]" />
                  <span className="font-bold text-sm">42 Views</span>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-md bg-white/10 border border-white/20 rounded-full flex items-center px-4 py-3 backdrop-blur-md">
                 <input type="text" placeholder="Reply..." className="bg-transparent border-none outline-none text-white w-full text-sm" />
                 <button className="text-[#FF9933] font-bold text-sm ml-2">Send</button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
