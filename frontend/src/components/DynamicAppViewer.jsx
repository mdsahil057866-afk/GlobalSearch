import React, { useState, useEffect } from 'react';
import { ArrowLeft, Shield, Cpu, Activity, Zap, Server, Globe, Users, BarChart3, Settings, X } from 'lucide-react';

export default function DynamicAppViewer({ appId, onBack }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  // Interactive States
  const [activeTab, setActiveTab] = useState('24h');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  
  // Chart Data
  const chartDataMap = {
    '24h': [40, 70, 45, 90, 65, 85, 55, 100, 75, 60, 80, 50],
    '7d': [200, 150, 300, 250, 400, 350, 500, 450, 600, 550, 700, 650],
    '30d': [1200, 1500, 1300, 1800, 1600, 2100, 1900, 2400, 2200, 2700, 2500, 3000]
  };

  const currentChartData = chartDataMap[activeTab];
  
  const appName = appId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-[200]">
        <div className="w-24 h-24 bg-blue-600/20 text-blue-500 rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_50px_-10px_rgba(59,130,246,0.5)] animate-pulse">
          <Cpu className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Initializing Sandbox</h2>
        <p className="text-gray-400 mb-8">Deploying {appName} in a secure isolated container...</p>
        
        <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-200"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-blue-400 text-sm mt-4 font-mono">{progress}%</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#0a0a0c] min-h-screen text-white animate-in fade-in duration-700">
      {/* App Header */}
      <header className="h-16 border-b border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="p-2 mr-4 rounded-full hover:bg-white/10 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="font-bold text-white text-sm">{appName.charAt(0)}</span>
            </div>
            <h1 className="font-bold text-lg tracking-wide">{appName}</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
            <Shield className="w-3.5 h-3.5 mr-1.5" />
            Secure Sandbox
          </div>
          <button onClick={() => setIsSettingsOpen(true)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </header>

      {/* App Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
        {isRunning ? (
          <div className="absolute inset-0 bg-black/90 p-8 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
            <div className="w-32 h-32 mb-8">
              <Cpu className="w-full h-full text-blue-500 animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">{appName} is currently executing...</h2>
            <p className="text-gray-400 mb-8 max-w-lg text-center leading-relaxed">
              The application logic is currently running in the active sandbox environment. To access the dashboard metrics, you must stop the current execution.
            </p>
            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mb-8">
              <div className="h-full bg-blue-500 w-full animate-[pulse_1.5s_ease-in-out_infinite]"></div>
            </div>
            <button 
              onClick={() => setIsRunning(false)} 
              className="px-8 py-3 rounded-full bg-red-600/20 text-red-500 border border-red-500/50 hover:bg-red-600/40 font-bold transition-all"
            >
              Stop Execution
            </button>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Welcome Banner */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 p-8 md:p-12">
            <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
              <Cpu className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Welcome to {appName}
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mb-8 leading-relaxed">
                Your application has been successfully deployed within the GlobalSearch ecosystem. 
                It is running in an isolated, high-performance container with zero-trust security architecture.
              </p>
              <div className="flex space-x-4">
                <button onClick={() => setIsRunning(true)} className="px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors shadow-lg">
                  Get Started
                </button>
                <button onClick={() => setIsDocsOpen(true)} className="px-6 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 border border-white/20 transition-colors">
                  View Documentation
                </button>
              </div>
            </div>
          </div>

          {/* Dummy Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-green-400 text-sm font-medium flex items-center">
                  +12.5% <Activity className="w-3 h-3 ml-1" />
                </span>
              </div>
              <h3 className="text-gray-400 font-medium text-sm mb-1">Active Users</h3>
              <p className="text-2xl font-bold text-white">24,592</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-green-400 text-sm font-medium flex items-center">
                  +5.2% <Activity className="w-3 h-3 ml-1" />
                </span>
              </div>
              <h3 className="text-gray-400 font-medium text-sm mb-1">API Requests</h3>
              <p className="text-2xl font-bold text-white">1.2M</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl">
                  <Server className="w-6 h-6" />
                </div>
                <span className="text-gray-400 text-sm font-medium flex items-center">
                  Stable
                </span>
              </div>
              <h3 className="text-gray-400 font-medium text-sm mb-1">Server Load</h3>
              <p className="text-2xl font-bold text-white">24%</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-pink-500/20 text-pink-400 rounded-xl">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-green-400 text-sm font-medium flex items-center">
                  +18.1% <Activity className="w-3 h-3 ml-1" />
                </span>
              </div>
              <h3 className="text-gray-400 font-medium text-sm mb-1">Global Reach</h3>
              <p className="text-2xl font-bold text-white">42 Regions</p>
            </div>
          </div>

          {/* Activity Chart Placeholder */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white">System Activity</h3>
              <div className="flex space-x-2">
                <button onClick={() => setActiveTab('24h')} className={`px-3 py-1 rounded-lg text-sm transition-colors ${activeTab === '24h' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400'}`}>24h</button>
                <button onClick={() => setActiveTab('7d')} className={`px-3 py-1 rounded-lg text-sm transition-colors ${activeTab === '7d' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400'}`}>7d</button>
                <button onClick={() => setActiveTab('30d')} className={`px-3 py-1 rounded-lg text-sm transition-colors ${activeTab === '30d' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400'}`}>30d</button>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {/* Dummy Bars */}
              {currentChartData.map((height, i) => {
                const max = Math.max(...currentChartData);
                const percent = (height / max) * 100;
                return (
                  <div key={i} className="w-full bg-blue-500/20 hover:bg-blue-500/40 rounded-t-lg transition-all duration-500 relative group" style={{ height: `${percent}%` }}>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {height > 100 ? (height / 1000).toFixed(1) + 'k' : height}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          </div>
        )}
      </main>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4" onClick={() => setIsSettingsOpen(false)}>
          <div className="bg-[#1a1a1c] border border-white/10 rounded-3xl w-full max-w-lg p-8 shadow-2xl animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Container Settings</h3>
              <button onClick={() => setIsSettingsOpen(false)} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white mb-1">Sandbox Isolation</h4>
                  <p className="text-sm text-gray-400">Strictly isolate app processes</p>
                </div>
                <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white mb-1">External API Access</h4>
                  <p className="text-sm text-gray-400">Allow outbound network requests</p>
                </div>
                <div className="w-12 h-6 bg-white/20 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white mb-1">Resource Auto-scaling</h4>
                  <p className="text-sm text-gray-400">Dynamically adjust RAM and CPU</p>
                </div>
                <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </div>
              </div>
            </div>
            <button onClick={() => setIsSettingsOpen(false)} className="w-full mt-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Docs Modal */}
      {isDocsOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] flex justify-end" onClick={() => setIsDocsOpen(false)}>
          <div className="bg-[#1a1a1c] border-l border-white/10 w-full max-w-md h-full shadow-2xl animate-in slide-in-from-right duration-300 p-8 flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">Documentation</h3>
              <button onClick={() => setIsDocsOpen(false)} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-6 text-gray-300">
              <section>
                <h4 className="text-white font-bold mb-2">Getting Started</h4>
                <p className="text-sm leading-relaxed">This container utilizes GlobalSearch's zero-knowledge runtime environment. Your application has been successfully packaged and deployed.</p>
              </section>
              <section>
                <h4 className="text-white font-bold mb-2">Architecture</h4>
                <p className="text-sm leading-relaxed">The application leverages isolated memory heaps and secure IPC channels to ensure complete data sovereignty and protection against unauthorized external access.</p>
              </section>
              <section>
                <h4 className="text-white font-bold mb-2">API Documentation</h4>
                <div className="bg-black/50 p-4 rounded-lg font-mono text-xs border border-white/10">
                  <span className="text-blue-400">GET</span> /api/v1/status<br/><br/>
                  Returns the health check and current operational state of {appName}.
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
