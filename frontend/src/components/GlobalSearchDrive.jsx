import React, { useState, useMemo, useRef } from 'react';
import { 
  Search, 
  Plus, 
  Menu, 
  Settings, 
  HelpCircle,
  Grid,
  List as ListIcon,
  Info,
  Clock,
  Star,
  Trash2,
  HardDrive,
  Users,
  Folder,
  FileText,
  Image as ImageIcon,
  Video,
  FileSpreadsheet,
  FileCode,
  MoreVertical,
  UploadCloud,
  X,
  File,
  ArrowLeft,
  Sparkles,
  ShieldCheck
} from 'lucide-react';


const MOCK_FOLDERS = [
  { id: 'f1', name: 'Work Documents', date: 'Oct 12, 2025' },
  { id: 'f2', name: 'Personal', date: 'Nov 5, 2025' },
  { id: 'f3', name: 'Projects', date: 'Jan 10, 2026' },
  { id: 'f4', name: 'Photos', date: 'Mar 22, 2026' },
];

const INITIAL_FILES = [
  { id: '1', name: 'Q1_Financial_Report.xlsx', type: 'sheet', size: '2.4 MB', date: 'Today', starred: false, owner: 'Me' },
  { id: '2', name: 'Aadhaar_Card.pdf', type: 'pdf', size: '1.1 MB', date: 'Yesterday', starred: true, owner: 'Me' },
  { id: '3', name: 'Family_Trip_Goa.jpg', type: 'image', size: '4.5 MB', date: 'Last Week', starred: false, owner: 'Me' },
  { id: '4', name: 'Project_Alpha_Code.zip', type: 'archive', size: '45.8 MB', date: 'May 1, 2026', starred: false, owner: 'Rahul K.' },
  { id: '5', name: 'Meeting_Recording.mp4', type: 'video', size: '128 MB', date: 'May 10, 2026', starred: false, owner: 'Me' },
  { id: '6', name: 'Startup_Pitch_Deck.pptx', type: 'presentation', size: '15.2 MB', date: 'Today', starred: true, owner: 'Me' },
  { id: '7', name: 'Taxes_2025.pdf', type: 'pdf', size: '3.3 MB', date: 'Mar 15, 2026', starred: false, owner: 'Me' },
];

const getFileIcon = (type) => {
  switch(type) {
    case 'pdf': return <FileText className="text-red-400 w-10 h-10" />;
    case 'sheet': return <FileSpreadsheet className="text-green-500 w-10 h-10" />;
    case 'image': return <ImageIcon className="text-blue-400 w-10 h-10" />;
    case 'video': return <Video className="text-purple-400 w-10 h-10" />;
    case 'archive': return <FileCode className="text-gray-400 w-10 h-10" />;
    case 'presentation': return <FileText className="text-yellow-500 w-10 h-10" />;
    default: return <File className="text-blue-500 w-10 h-10" />;
  }
};

const getSmallFileIcon = (type) => {
  switch(type) {
    case 'pdf': return <FileText className="text-red-400 w-5 h-5" />;
    case 'sheet': return <FileSpreadsheet className="text-green-500 w-5 h-5" />;
    case 'image': return <ImageIcon className="text-blue-400 w-5 h-5" />;
    case 'video': return <Video className="text-purple-400 w-5 h-5" />;
    case 'archive': return <FileCode className="text-gray-400 w-5 h-5" />;
    case 'presentation': return <FileText className="text-yellow-500 w-5 h-5" />;
    default: return <File className="text-blue-500 w-5 h-5" />;
  }
};

const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const GlobalSearchDrive = ({ onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('My Drive');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAppGrid, setShowAppGrid] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  
  const [files, setFiles] = useState(INITIAL_FILES);
  const [pendingUploadFile, setPendingUploadFile] = useState(null);
  
  const fileInputRef = useRef(null);

  
  const filteredFolders = useMemo(() => {
    return MOCK_FOLDERS.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const filteredFiles = useMemo(() => {
    let currentFiles = files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (activeTab === 'Starred') currentFiles = currentFiles.filter(f => f.starred);
    if (activeTab === 'Shared with me') currentFiles = currentFiles.filter(f => f.owner !== 'Me');
    if (activeTab === 'Recent') currentFiles = currentFiles.filter(f => f.date === 'Today' || f.date === 'Yesterday');
    return currentFiles;
  }, [searchQuery, activeTab, files]);

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
    setPendingUploadFile(null);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPendingUploadFile(file);
      simulateUpload(file);
    }
  };

  const simulateUpload = (file) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    
    let type = 'default';
    if (file.type.includes('pdf')) type = 'pdf';
    else if (file.type.includes('image')) type = 'image';
    else if (file.type.includes('video')) type = 'video';
    else if (file.name.endsWith('.xlsx') || file.name.endsWith('.csv')) type = 'sheet';
    else if (file.name.endsWith('.zip') || file.name.endsWith('.rar')) type = 'archive';
    else if (file.name.endsWith('.pptx')) type = 'presentation';

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            
            const newFile = {
              id: Date.now().toString(),
              name: file.name,
              type: type,
              size: formatBytes(file.size),
              date: 'Today',
              starred: false,
              owner: 'Me'
            };
            setFiles([newFile, ...files]);
            
            setIsUploading(false);
            setIsUploadModalOpen(false);
            setUploadProgress(0);
            setPendingUploadFile(null);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#202124] text-[#e8eaed] font-sans relative z-50 fixed inset-0">
      
      {}
      <header className="flex items-center justify-between px-4 py-2 border-b border-[#3c4043]">
        <div className="flex items-center gap-4 w-64">
          <button onClick={onBack} className="p-2 hover:bg-[#3c4043] rounded-full transition-colors" title="Back to Search">
            <ArrowLeft className="w-5 h-5 text-[#9aa0a6]" />
          </button>
          <div className="flex items-center gap-2 cursor-pointer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/17/Ashoka_Chakra.svg" alt="Logo" className="w-8 h-8 opacity-90" />
            <span className="text-xl font-medium text-[#e8eaed]">Drive</span>
          </div>
        </div>

        {}
        <div className="flex-1 max-w-3xl px-4 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-20 group-focus-within:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center bg-[#171717] rounded-full px-5 py-3 border border-white/10 focus-within:border-blue-500/50 shadow-inner transition-all group">
            <Sparkles className="w-5 h-5 text-blue-400 mr-3 animate-pulse" />
            <input 
              type="text" 
              placeholder="Ask AI to find a file... (e.g., 'that receipt from my trip to Goa')" 
              className="bg-transparent border-none outline-none w-full text-white placeholder-gray-500 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <X className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" onClick={() => setSearchQuery('')} />
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 px-2 relative">
          <button onClick={() => { setShowHelp(!showHelp); setShowSettings(false); setShowAppGrid(false); setShowProfile(false); }} className="p-2 hover:bg-[#3c4043] rounded-full transition-colors relative">
            <HelpCircle className="w-6 h-6 text-[#9aa0a6]" />
            {showHelp && (
              <div className="absolute right-0 top-12 mt-2 w-64 bg-[#2d2e30] border border-[#5f6368] rounded-xl shadow-2xl z-50 p-4 text-left">
                <h3 className="text-white font-bold mb-3 border-b border-[#5f6368] pb-2">Help Center</h3>
                <ul className="space-y-2 text-sm text-[#e8eaed]">
                  <li className="hover:bg-[#3c4043] p-2 rounded cursor-pointer">Training & Tutorials</li>
                  <li className="hover:bg-[#3c4043] p-2 rounded cursor-pointer">Updates & Release Notes</li>
                  <li className="hover:bg-[#3c4043] p-2 rounded cursor-pointer">Send Feedback</li>
                </ul>
              </div>
            )}
          </button>
          
          <button onClick={() => { setShowSettings(!showSettings); setShowHelp(false); setShowAppGrid(false); setShowProfile(false); }} className="p-2 hover:bg-[#3c4043] rounded-full transition-colors relative">
            <Settings className="w-6 h-6 text-[#9aa0a6]" />
            {showSettings && (
              <div className="absolute right-0 top-12 mt-2 w-72 bg-[#2d2e30] border border-[#5f6368] rounded-xl shadow-2xl z-50 p-4 text-left">
                <h3 className="text-white font-bold mb-3 border-b border-[#5f6368] pb-2">Settings</h3>
                <ul className="space-y-2 text-sm text-[#e8eaed]">
                  <li className="flex justify-between items-center hover:bg-[#3c4043] p-2 rounded cursor-pointer">
                    <span>Dark Mode</span>
                    <div className="w-8 h-4 bg-blue-500 rounded-full relative">
                      <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                  </li>
                  <li className="hover:bg-[#3c4043] p-2 rounded cursor-pointer">Storage Management</li>
                  <li className="hover:bg-[#3c4043] p-2 rounded cursor-pointer">Keyboard Shortcuts</li>
                </ul>
              </div>
            )}
          </button>

          <button onClick={() => { setShowAppGrid(!showAppGrid); setShowHelp(false); setShowSettings(false); setShowProfile(false); }} className="p-2 hover:bg-[#3c4043] rounded-full transition-colors relative">
            <Grid className="w-6 h-6 text-[#9aa0a6]" />
            {showAppGrid && (
              <div className="absolute right-0 top-12 mt-2 w-80 bg-[#2d2e30] border border-[#5f6368] rounded-2xl shadow-2xl z-50 p-4 text-left">
                <h3 className="text-white font-bold mb-3 text-center border-b border-[#5f6368] pb-2">GlobalSearch Apps</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: 'Search', icon: '🔍', color: 'text-blue-400', view: 'search' },
                    { name: 'Mail', icon: '✉️', color: 'text-red-400', view: 'mail' },
                    { name: 'Maps', icon: '🗺️', color: 'text-green-400', view: 'navimap' },
                    { name: 'Tube', icon: '▶️', color: 'text-red-500', view: 'playtube' },
                    { name: 'Meet', icon: '📹', color: 'text-blue-500', view: 'syncmeet' },
                    { name: 'Pay', icon: '₹', color: 'text-green-500', view: 'swiftpay' }
                  ].map(app => (
                    <div 
                      key={app.name} 
                      onClick={() => onNavigate && onNavigate(app.view)}
                      className="flex flex-col items-center justify-center p-3 hover:bg-[#3c4043] rounded-xl cursor-pointer transition-colors"
                    >
                      <div className={`text-2xl mb-1 ${app.color}`}>{app.icon}</div>
                      <span className="text-xs text-[#e8eaed]">{app.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </button>

          <div className="relative">
            <div 
              onClick={() => { setShowProfile(!showProfile); setShowHelp(false); setShowSettings(false); setShowAppGrid(false); }} 
              className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium cursor-pointer ml-2 border border-[#3c4043] hover:ring-2 hover:ring-blue-400 transition-all"
            >
              U
            </div>
            {showProfile && (
              <div className="absolute right-0 top-12 mt-2 w-72 bg-[#2d2e30] border border-[#5f6368] rounded-2xl shadow-2xl z-50 p-5 text-left flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-2xl mb-3 shadow-inner">
                  U
                </div>
                <h3 className="text-white font-bold text-lg">User Account</h3>
                <p className="text-[#9aa0a6] text-sm mb-4">user@globalsearch.com</p>
                <button className="w-full py-2 rounded-full border border-[#5f6368] text-white hover:bg-[#3c4043] transition-colors mb-4 text-sm font-medium">
                  Manage your GlobalSearch Account
                </button>
                <div className="w-full h-px bg-[#5f6368] mb-4"></div>
                <button className="py-2 px-6 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 transition-colors text-sm font-bold w-full">
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {}
        <aside className="w-[256px] flex flex-col py-3 px-3 bg-[#202124]">
          <button 
            onClick={handleUploadClick}
            className="flex items-center gap-3 bg-[#202124] hover:bg-[#2d2e30] text-[#e8eaed] border border-[#5f6368] rounded-2xl py-3 px-5 w-[140px] mb-4 shadow-sm transition-all"
          >
            <Plus className="w-6 h-6 text-blue-400" />
            <span className="font-medium text-sm">New</span>
          </button>

          <nav className="flex-1 flex flex-col gap-1 pr-2 overflow-y-auto">
            {[
              { name: 'My Drive', icon: <HardDrive className="w-5 h-5" /> },
              { name: 'Computers', icon: <Menu className="w-5 h-5" /> },
              { name: 'Shared with me', icon: <Users className="w-5 h-5" /> },
              { name: 'Recent', icon: <Clock className="w-5 h-5" /> },
              { name: 'Starred', icon: <Star className="w-5 h-5" /> },
              { name: 'Trash', icon: <Trash2 className="w-5 h-5" /> },
            ].map(item => (
              <button 
                key={item.name}
                onClick={() => { setActiveTab(item.name); setSelectedItem(null); }}
                className={`flex items-center gap-4 px-4 py-2 rounded-r-full font-medium transition-colors ${
                  activeTab === item.name 
                    ? 'bg-[#41331c] text-[#f29900]' 
                    : 'text-[#e8eaed] hover:bg-[#3c4043]'
                }`}
              >
                {React.cloneElement(item.icon, { className: `w-5 h-5 ${activeTab === item.name ? 'text-[#f29900]' : 'text-[#9aa0a6]'}` })}
                <span className="text-sm">{item.name}</span>
              </button>
            ))}
            {}
            <div className="mt-6 px-4">
              <button className="flex items-center justify-between w-full p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/20 transition-all group">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-100 group-hover:text-white">DigiLocker Sync</span>
                </div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(52,211,153,0.8)]"></div>
              </button>
            </div>

            <div className="mt-8 px-4">
              <div className="flex items-center gap-4 text-[#e8eaed] font-medium mb-3">
                <Cloud className="w-5 h-5 text-[#9aa0a6]" />
                <span className="text-sm">Storage</span>
              </div>
              <div className="w-full bg-[#3c4043] rounded-full h-1.5 mb-2">
                <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-xs text-[#9aa0a6]">4.5 GB of 15 GB used</p>
              <button className="mt-3 text-blue-400 text-sm font-medium hover:text-blue-300 border border-[#5f6368] rounded-md px-4 py-1.5 w-full hover:bg-[#3c4043] transition-colors">
                Get more storage
              </button>
            </div>
          </nav>
        </aside>

        {}
        <main className="flex-1 flex flex-col bg-[#171717] rounded-tl-2xl overflow-hidden shadow-[inset_1px_1px_0_rgba(255,255,255,0.1)]">
          {}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#3c4043]">
            <h1 className="text-2xl text-[#e8eaed] font-normal">{activeTab}</h1>
            <div className="flex items-center gap-3">
              <div className="flex bg-[#202124] border border-[#5f6368] rounded-md overflow-hidden">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 ${viewMode === 'list' ? 'bg-[#41331c] text-[#f29900]' : 'bg-[#202124] text-[#9aa0a6] hover:bg-[#3c4043]'}`}
                >
                  <ListIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 ${viewMode === 'grid' ? 'bg-[#41331c] text-[#f29900]' : 'bg-[#202124] text-[#9aa0a6] hover:bg-[#3c4043]'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
              </div>
              <button className="p-1.5 text-[#9aa0a6] hover:bg-[#3c4043] rounded-full"><Info className="w-5 h-5" /></button>
            </div>
          </div>

          {}
          <div className="flex-1 overflow-y-auto p-6" onClick={() => setSelectedItem(null)}>
            
            {['My Drive'].includes(activeTab) && filteredFolders.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-medium text-[#9aa0a6] mb-4">Folders</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredFolders.map(folder => (
                    <div 
                      key={folder.id} 
                      onClick={(e) => { e.stopPropagation(); setSelectedItem(folder.id); }}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedItem === folder.id ? 'bg-[#303f5f] border-[#8ab4f8]' : 'bg-[#202124] border-[#5f6368] hover:bg-[#2d2e30]'
                      }`}
                    >
                      <Folder className={`w-6 h-6 ${selectedItem === folder.id ? 'text-[#8ab4f8]' : 'text-[#9aa0a6]'}`} />
                      <span className={`text-sm font-medium truncate ${selectedItem === folder.id ? 'text-[#8ab4f8]' : 'text-[#e8eaed]'}`}>
                        {folder.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-sm font-medium text-[#9aa0a6] mb-4">Files</h2>
              
              {filteredFiles.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-[#9aa0a6]">
                  <div className="w-32 h-32 mb-4 opacity-30"><Folder className="w-full h-full text-[#9aa0a6]" /></div>
                  <p className="text-lg">No files match your search.</p>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredFiles.map(file => (
                    <div 
                      key={file.id} 
                      onClick={(e) => { e.stopPropagation(); setSelectedItem(file.id); }}
                      className={`flex flex-col rounded-lg border overflow-hidden cursor-pointer transition-colors ${
                        selectedItem === file.id ? 'bg-[#303f5f] border-[#8ab4f8]' : 'bg-[#202124] border-[#5f6368] hover:bg-[#2d2e30]'
                      }`}
                    >
                      <div className={`flex-1 min-h-[140px] flex items-center justify-center border-b ${selectedItem === file.id ? 'bg-[#202a40] border-[#303f5f]' : 'bg-[#28292c] border-[#3c4043]'}`}>
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex items-center p-3 gap-3">
                        {getSmallFileIcon(file.type)}
                        <span className={`text-sm font-medium truncate flex-1 ${selectedItem === file.id ? 'text-[#8ab4f8]' : 'text-[#e8eaed]'}`}>
                          {file.name}
                        </span>
                        <MoreVertical className="w-5 h-5 text-[#9aa0a6] hover:text-[#e8eaed]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="min-w-full">
                  <div className="grid grid-cols-12 gap-4 border-b border-[#3c4043] pb-2 text-sm font-medium text-[#9aa0a6]">
                    <div className="col-span-6">Name</div>
                    <div className="col-span-2">Owner</div>
                    <div className="col-span-2">Last modified</div>
                    <div className="col-span-2">File size</div>
                  </div>
                  {filteredFiles.map(file => (
                    <div 
                      key={file.id} 
                      onClick={(e) => { e.stopPropagation(); setSelectedItem(file.id); }}
                      className={`grid grid-cols-12 gap-4 py-3 border-b border-[#3c4043] cursor-pointer items-center transition-colors ${
                        selectedItem === file.id ? 'bg-[#303f5f]' : 'hover:bg-[#2d2e30]'
                      }`}
                    >
                      <div className="col-span-6 flex items-center gap-3">
                        {getSmallFileIcon(file.type)}
                        <span className={`text-sm font-medium truncate ${selectedItem === file.id ? 'text-[#8ab4f8]' : 'text-[#e8eaed]'}`}>{file.name}</span>
                      </div>
                      <div className="col-span-2 text-sm text-[#9aa0a6]">{file.owner}</div>
                      <div className="col-span-2 text-sm text-[#9aa0a6]">{file.date}</div>
                      <div className="col-span-2 text-sm text-[#9aa0a6]">{file.size}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm">
          <div className="bg-[#202124] border border-[#5f6368] rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-[#3c4043] flex justify-between items-center bg-[#171717]">
              <h3 className="text-lg font-medium text-[#e8eaed]">Upload to GlobalSearch Drive</h3>
              <button onClick={() => !isUploading && setIsUploadModalOpen(false)} className="text-[#9aa0a6] hover:text-[#e8eaed]">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex flex-col items-center justify-center">
              {!isUploading ? (
                <>
                  <div className="w-20 h-20 bg-[#303f5f] rounded-full flex items-center justify-center mb-4 border-2 border-dashed border-[#8ab4f8]">
                    <UploadCloud className="w-10 h-10 text-[#8ab4f8]" />
                  </div>
                  <h4 className="text-base font-medium text-[#e8eaed] mb-1">Select a file to upload</h4>
                  <p className="text-sm text-[#9aa0a6] mb-6 text-center">Your files will be securely encrypted and stored on our indigenous servers.</p>
                  
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileSelect} 
                    className="hidden" 
                  />
                  
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors w-full"
                  >
                    Browse Files
                  </button>
                </>
              ) : (
                <div className="w-full py-4">
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span className="text-[#e8eaed] truncate max-w-[200px]">Uploading {pendingUploadFile?.name}...</span>
                    <span className="text-blue-400">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-[#3c4043] rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-blue-500 h-2.5 rounded-full transition-all duration-200 ease-out" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-[#9aa0a6] mt-3 text-center">Encrypting with Zero-Knowledge Protocol...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const Cloud = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </svg>
);

export default GlobalSearchDrive;
