import React from 'react';
import { ArrowLeft, HardDrive, Folder, FileText, Image as ImageIcon, Shield, Cloud, Activity, Search, UploadCloud } from 'lucide-react';
import CoreCloudLogo from './CoreCloudLogo';

export default function CoreCloud({ onBack }) {
  const files = [
    { id: 1, name: 'Project_Neon.psd', type: 'image', size: '2.4 GB', date: 'Oct 12' },
    { id: 2, name: 'Cyber_Security_Report.pdf', type: 'doc', size: '14 MB', date: 'Oct 10' },
    { id: 3, name: 'Hologram_Assets', type: 'folder', size: '18 GB', date: 'Oct 05' },
    { id: 4, name: 'AI_Training_Data.csv', type: 'doc', size: '1.2 GB', date: 'Oct 01' },
  ];

  return (
    <div className="flex flex-col h-screen w-full bg-[#030b14] text-white font-sans overflow-hidden">
      {}
      <header className="h-16 flex items-center justify-between px-6 bg-white/5 border-b border-blue-900/30 backdrop-blur-xl shrink-0 z-10">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-3 p-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={20} className="text-blue-400" />
          </button>
          <CoreCloudLogo className="w-8 h-8 mr-2 drop-shadow-[0_0_15px_rgba(0,123,255,0.6)]" />
          <span className="font-bold text-xl tracking-tight">Bharat<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#FF9933]">Cloud</span></span>
        </div>
        
        <div className="flex-1 max-w-xl mx-8 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500/50" />
          <input type="text" placeholder="Search encrypted files..." className="w-full bg-[#061428] border border-blue-900/50 rounded-full py-2 pl-10 pr-4 text-sm focus:border-blue-500/50 focus:shadow-[0_0_15px_rgba(0,123,255,0.2)] outline-none transition-all placeholder-blue-500/30" />
        </div>

        <button className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-full shadow-[0_0_15px_rgba(0,123,255,0.4)] transition-all font-medium text-sm">
          <UploadCloud size={18} className="mr-2" /> Upload
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(0, 123, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 123, 255, 0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-[150px] pointer-events-none"></div>

        {}
        <div className="w-64 border-r border-blue-900/30 p-6 flex flex-col z-10 bg-[#030b14]/80 backdrop-blur-md">
          <nav className="space-y-2 flex-1">
            {['My Drive', 'Shared with me', 'Recent', 'Starred', 'Trash'].map((item, i) => (
              <a key={i} href="#" className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${i === 0 ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-[inset_0_0_10px_rgba(0,123,255,0.2)]' : 'text-blue-200/50 hover:bg-white/5 hover:text-blue-200'}`}>
                {i === 0 ? <Cloud size={18} className="mr-3" /> : <Folder size={18} className="mr-3" />}
                {item}
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-blue-900/30">
            <div className="flex justify-between text-xs text-blue-300/70 mb-2">
              <span>Storage (India Region)</span>
              <span>85%</span>
            </div>
            <div className="h-2 w-full bg-[#061428] rounded-full overflow-hidden border border-blue-900/50">
              <div className="h-full bg-gradient-to-r from-blue-500 to-[#FF9933] w-[85%] shadow-[0_0_10px_rgba(255,153,51,0.8)]"></div>
            </div>
            <p className="text-xs text-blue-300/50 mt-2">8.5 TB of 10 TB used</p>
          </div>
        </div>

        {}
        <div className="flex-1 p-8 overflow-y-auto z-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            My Holographic Drive
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {files.map(file => (
              <div key={file.id} className="relative p-5 rounded-2xl bg-white/[0.02] border border-blue-500/20 hover:border-blue-400/60 backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,123,255,0.15)] group cursor-pointer">
                {}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${file.type === 'folder' ? 'bg-[#FF9933]/10 text-[#FF9933]' : 'bg-blue-500/10 text-blue-400'}`}>
                    {file.type === 'folder' ? <Folder size={24} /> : file.type === 'image' ? <ImageIcon size={24} /> : <FileText size={24} />}
                  </div>
                  <MoreHorizontalIcon className="text-blue-500/30 group-hover:text-blue-300" />
                </div>
                
                <h3 className="font-semibold text-sm text-blue-100 truncate mb-1">{file.name}</h3>
                <div className="flex justify-between text-xs text-blue-400/50">
                  <span>{file.size}</span>
                  <span>{file.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="w-72 border-l border-blue-900/30 p-6 z-10 bg-[#030b14]/80 backdrop-blur-md flex flex-col">
          <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-6 flex items-center">
            <Shield size={16} className="mr-2" /> Sovereign Security
          </h3>

          <div className="flex-1">
            <div className="relative aspect-square w-full rounded-full border border-blue-900/50 flex items-center justify-center mb-6">
              {}
              <div className="absolute inset-0 rounded-full bg-blue-500/5 border border-blue-500/30"></div>
              <div className="absolute w-1/2 h-1/2 bg-gradient-to-tr from-blue-500/20 to-transparent origin-bottom-left animate-spin" style={{ animationDuration: '3s' }}></div>
              <Shield size={40} className="text-[#FF9933] relative z-10 drop-shadow-[0_0_10px_rgba(255,153,51,0.8)]" />
              
              {}
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_#4ade80]"></div>
              <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_#4ade80]"></div>
              <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_#4ade80]"></div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#061428] p-3 rounded-lg border border-blue-900/50">
                <p className="text-xs text-blue-400/70 mb-1">Active Data Center</p>
                <p className="text-sm font-semibold text-blue-100 flex items-center"><Activity size={14} className="text-green-400 mr-2" /> Mumbai Node 01</p>
              </div>
              <div className="bg-[#061428] p-3 rounded-lg border border-blue-900/50">
                <p className="text-xs text-blue-400/70 mb-1">Encryption Status</p>
                <p className="text-sm font-semibold text-blue-100">Quantum Grade 256-bit</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const MoreHorizontalIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
);

