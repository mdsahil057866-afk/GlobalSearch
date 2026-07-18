import React from 'react';
import { ArrowLeft, Radio, Sun, BatteryCharging, MessageSquare, MapPin, Wifi, Activity } from 'lucide-react';
import VillageInternetLogo from './VillageInternetLogo';

export default function VillageInternet({ onBack }) {
  const nodes = [
    { id: 1, name: 'Panchayat Node Alpha', status: 'Online', battery: '98%', solar: 'Charging', users: 124 },
    { id: 2, name: 'School Node Beta', status: 'Online', battery: '85%', solar: 'Discharging', users: 45 },
    { id: 3, name: 'Market Node Gamma', status: 'Low Power', battery: '15%', solar: 'Offline', users: 8 },
  ];

  const messages = [
    { id: 1, sender: 'Sarpanch', time: '10:00 AM', text: 'Panchayat meeting scheduled at 4 PM today.' },
    { id: 2, sender: 'Agri Bot (Local)', time: '09:30 AM', text: 'Rain expected tomorrow. Delay harvesting.' },
  ];

  return (
    <div className="flex flex-col h-screen w-full bg-[#1e231f] text-[#d4ebd4] font-mono overflow-hidden">
      
      {}
      <header className="h-16 flex items-center justify-between px-6 bg-[#111612] border-b border-[#2d4030] shrink-0">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4 p-2 rounded hover:bg-[#2d4030] transition-colors">
            <ArrowLeft size={20} className="text-[#4ade80]" />
          </button>
          <VillageInternetLogo className="w-8 h-8 mr-3" />
          <span className="font-bold text-xl tracking-wider uppercase text-[#4ade80]">GramNet<span className="text-[#FFD700]">OS</span></span>
        </div>
        
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center">
            <Wifi size={16} className="text-[#4ade80] mr-2" /> 
            <span className="text-[#4ade80]">Mesh Active</span>
          </div>
          <div className="flex items-center">
            <Sun size={16} className="text-[#FFD700] mr-2" /> 
            <span className="text-[#FFD700]">Solar Array: Nominal</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden p-6 gap-6">
        
        {}
        <div className="w-2/3 flex flex-col gap-6">
          
          {}
          <div className="flex-1 bg-[#111612] border border-[#2d4030] rounded-lg p-6 relative overflow-hidden">
            <h2 className="text-[#4ade80] uppercase text-xs font-bold mb-4 flex items-center">
              <Activity size={16} className="mr-2" /> Local Mesh Topology
            </h2>
            
            {}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
              <svg width="100%" height="100%">
                <line x1="30%" y1="40%" x2="50%" y2="50%" stroke="#2d4030" strokeWidth="2" strokeDasharray="5 5" />
                <line x1="70%" y1="40%" x2="50%" y2="50%" stroke="#2d4030" strokeWidth="2" strokeDasharray="5 5" />
                <line x1="50%" y1="80%" x2="50%" y2="50%" stroke="#2d4030" strokeWidth="2" strokeDasharray="5 5" />
              </svg>
            </div>
            
            <div className="relative w-full h-full">
               <div className="absolute top-[20%] left-[20%] text-center">
                 <div className="w-12 h-12 bg-[#1e231f] border-2 border-[#4ade80] rounded-full mx-auto flex items-center justify-center shadow-[0_0_15px_#4ade80]">
                    <Radio size={20} className="text-[#4ade80]" />
                 </div>
                 <p className="text-[10px] mt-2">Alpha</p>
               </div>
               
               <div className="absolute top-[20%] right-[20%] text-center">
                 <div className="w-12 h-12 bg-[#1e231f] border-2 border-[#4ade80] rounded-full mx-auto flex items-center justify-center">
                    <Radio size={20} className="text-[#4ade80]" />
                 </div>
                 <p className="text-[10px] mt-2">Beta</p>
               </div>
               
               <div className="absolute bottom-[10%] left-[45%] text-center">
                 <div className="w-12 h-12 bg-[#1e231f] border-2 border-red-500 rounded-full mx-auto flex items-center justify-center shadow-[0_0_15px_#ef4444]">
                    <Radio size={20} className="text-red-500" />
                 </div>
                 <p className="text-[10px] mt-2">Gamma</p>
               </div>
            </div>
          </div>

          {}
          <div className="bg-[#111612] border border-[#2d4030] rounded-lg p-4">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-[#4ade80] border-b border-[#2d4030]">
                  <th className="pb-2 font-normal">Node</th>
                  <th className="pb-2 font-normal">Status</th>
                  <th className="pb-2 font-normal">Battery</th>
                  <th className="pb-2 font-normal">Active Users</th>
                </tr>
              </thead>
              <tbody>
                {nodes.map(node => (
                  <tr key={node.id} className="border-b border-[#2d4030]/50">
                    <td className="py-3 flex items-center"><MapPin size={14} className="mr-2" /> {node.name}</td>
                    <td className={`py-3 ${node.status === 'Online' ? 'text-[#4ade80]' : 'text-red-400'}`}>{node.status}</td>
                    <td className="py-3 flex items-center">
                      <BatteryCharging size={14} className="mr-2" /> {node.battery}
                    </td>
                    <td className="py-3">{node.users}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {}
        <div className="w-1/3 bg-[#111612] border border-[#2d4030] rounded-lg flex flex-col overflow-hidden">
          <div className="p-4 border-b border-[#2d4030] bg-[#1a231c]">
            <h2 className="text-[#4ade80] uppercase text-xs font-bold flex items-center">
              <MessageSquare size={16} className="mr-2" /> Local Broadcasts (Offline)
            </h2>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className="bg-[#1e231f] border border-[#2d4030] p-3 rounded">
                <div className="flex justify-between text-[#4ade80] text-[10px] mb-2 uppercase">
                  <span>{msg.sender}</span>
                  <span>{msg.time}</span>
                </div>
                <p className="text-sm">{msg.text}</p>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-[#2d4030]">
            <div className="flex bg-[#1e231f] border border-[#4ade80] rounded p-1">
              <input type="text" placeholder="Broadcast to mesh..." className="flex-1 bg-transparent border-none outline-none px-2 text-sm text-[#4ade80] placeholder-[#4ade80]/30" />
              <button className="bg-[#4ade80] text-[#111612] px-4 py-1 text-sm font-bold rounded">SEND</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
