import React, { useState } from 'react';
import { 
  Cloud, 
  Search, 
  Upload, 
  Bell, 
  Settings, 
  Folder, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  ShieldCheck, 
  Database,
  Lock,
  Globe,
  MoreVertical,
  Star,
  Users,
  ArrowLeft
} from 'lucide-react';



const BharatDrive = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('My Drive');

  const navItems = [
    { name: 'My Drive', icon: <Cloud size={20} /> },
    { name: 'DigiLocker Sync', icon: <ShieldCheck size={20} /> },
    { name: 'Shared with me', icon: <Users size={20} /> },
    { name: 'Starred', icon: <Star size={20} /> },
    { name: 'Recent', icon: <Folder size={20} /> },
    { name: 'Decentralized Grid', icon: <Database size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> },
  ];

  const recentFiles = [
    { name: 'Aadhaar_Card.pdf', size: '2.4 MB', date: 'Today', type: 'pdf', icon: <FileText size={40} className="text-red-500" /> },
    { name: 'Q1_Tax_Returns.xlsx', size: '1.8 MB', date: 'Yesterday', type: 'sheet', icon: <FileText size={40} className="text-green-500" /> },
    { name: 'Diwali_Family.jpg', size: '4.2 MB', date: 'Last Week', type: 'image', icon: <ImageIcon size={40} className="text-blue-500" /> },
    { name: 'Startup_Pitch.pptx', size: '12.5 MB', date: 'Last Week', type: 'presentation', icon: <FileText size={40} className="text-orange-500" /> },
    { name: 'Project_Code.zip', size: '45.1 MB', date: '2 Weeks Ago', type: 'archive', icon: <Folder size={40} className="text-purple-500" /> },
  ];

  return (
    <div className="flex h-screen w-full bg-[#050a15] text-white overflow-hidden font-sans relative z-50 fixed inset-0">
      
      {}
      <aside className="w-[280px] h-full border-r border-white/10 flex flex-col p-6 bg-gradient-to-b from-[#050a15] to-[#0b1324] z-20">
        <div className="flex items-center gap-3 mb-10">
          <button onClick={onBack} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors mr-2">
            <ArrowLeft size={20} />
          </button>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.3)]">
            <Cloud size={24} color="white" />
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            BharatDrive
          </div>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => (
            <button 
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all text-left ${
                activeTab === item.name 
                  ? 'bg-white/5 text-blue-400 border border-white/10 shadow-[inset_0_0_20px_rgba(14,165,233,0.2)]' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto p-5 rounded-xl bg-[#0ea5e9]/5 border border-[#0ea5e9]/10">
          <div className="flex justify-between mb-3 text-sm text-gray-400">
            <span>Storage Usage (India Region)</span>
            <span className="text-blue-400">65%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full w-[65%]"></div>
          </div>
          <p className="mt-3 text-xs text-gray-400">65 GB used of 100 GB</p>
          <div className="mt-3 flex items-center gap-2 text-xs text-green-500 font-medium">
            <Lock size={12} /> E2E Encrypted
          </div>
        </div>
      </aside>

      {}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {}
        <div className="absolute -top-[200px] -right-[200px] w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px] pointer-events-none z-0"></div>

        {}
        <header className="flex justify-between items-center px-10 py-6 border-b border-white/10 bg-[#050a15]/80 backdrop-blur-md z-20">
          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-[400px] focus-within:border-blue-500 focus-within:shadow-[0_0_0_2px_rgba(14,165,233,0.2)] transition-all">
            <Search size={20} className="text-gray-400" />
            <input 
              type="text" 
              className="bg-transparent border-none text-white p-2 w-full outline-none" 
              placeholder="Search files, folders, or tags... (English / हिंदी)" 
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 bg-gradient-to-br from-blue-500 to-sky-600 text-white px-5 py-3 rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(14,165,233,0.4)] transition-all">
              <Upload size={18} />
              <span>Secure Upload</span>
            </button>
            
            <div className="flex items-center gap-4 text-gray-400">
              <Globe size={20} className="cursor-pointer hover:text-white transition-colors" />
              <Bell size={20} className="cursor-pointer hover:text-white transition-colors" />
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center text-white font-bold cursor-pointer border-2 border-white/10 ml-2">
                JD
              </div>
            </div>
          </div>
        </header>

        {}
        <div className="p-10 flex-1 overflow-y-auto z-10">
          <h1 className="text-3xl font-bold mb-8 text-white">{activeTab}</h1>
          
          {activeTab === 'My Drive' && (
            <>
              <div className="grid grid-cols-4 gap-6 mb-10">
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:-translate-y-1 transition-transform flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-blue-500">
                    <Folder size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 font-medium mb-1">Total Folders</h4>
                    <div className="text-2xl font-bold">124</div>
                  </div>
                </div>
                
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:-translate-y-1 transition-transform flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-orange-500">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 font-medium mb-1">Total Files</h4>
                    <div className="text-2xl font-bold">1,482</div>
                  </div>
                </div>
                
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:-translate-y-1 transition-transform flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-green-500">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 font-medium mb-1">DPDP Compliance</h4>
                    <div className="text-2xl font-bold">100%</div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:-translate-y-1 transition-transform flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white">
                    <Database size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-400 font-medium mb-1">Mumbai Server Ping</h4>
                    <div className="text-2xl font-bold">12ms</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Recent Files</h3>
                <a href="#" className="text-blue-400 text-sm font-medium hover:underline">View All</a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {recentFiles.map((file, index) => (
                  <div key={index} className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all cursor-pointer flex flex-col">
                    <div className="h-24 bg-black/20 rounded-xl mb-4 flex items-center justify-center">
                      {file.icon}
                    </div>
                    <div>
                      <h5 className="text-sm font-medium mb-1 truncate">{file.name}</h5>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-400">{file.size} • {file.date}</p>
                        <MoreVertical size={14} className="text-gray-400 hover:text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab !== 'My Drive' && (
            <div className="p-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-center text-gray-400">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                {navItems.find(item => item.name === activeTab)?.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{activeTab} Content Area</h3>
              <p className="max-w-md mx-auto">
                This module is fully encrypted using zero-knowledge architecture. Content is synced securely with Indian localized servers.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BharatDrive;
