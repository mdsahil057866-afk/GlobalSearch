import React, { useState } from 'react';
import { MoreVertical, ArrowUpRight, Zap, ShieldAlert, Code, Video, ChevronDown, Sparkles } from 'lucide-react';
import { useSearchLabs } from '../context/SearchLabsContext';

import PlayTubeLogo from './PlayTubeLogo';
import QuickChatLogo from './QuickChatLogo';
import PixoraLogo from './PixoraLogo';
import CoreCloudLogo from './CoreCloudLogo';
import NovaAILogo from './NovaAILogo';
import VillageInternetLogo from './VillageInternetLogo';
import CoreNetLogo from './CoreNetLogo';

import AIOverview from './AIOverview';

const SearchResults = ({ results, isLoading, query, onLaunchApp }) => {
  const { isFeatureEnabled } = useSearchLabs();
  const [expandedSummary, setExpandedSummary] = useState(null);
  
  const hasEcosystemApp = results && results.some(r => r?.isEcosystemApp);
  if (isLoading) {
    return (
      <div className="w-full space-y-8 mt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center mb-1">
              <div className="w-6 h-6 rounded-full bg-border mr-3"></div>
              <div className="h-4 bg-border rounded w-48"></div>
            </div>
            <div className="h-6 bg-border rounded w-3/4 mb-2 mt-2"></div>
            <div className="h-4 bg-border rounded w-full mb-1"></div>
            <div className="h-4 bg-border rounded w-5/6"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="mt-8 text-foreground">
        <p>Your search did not match any documents.</p>
        <p className="mt-4">Suggestions:</p>
        <ul className="list-disc pl-8 mt-2 space-y-1">
          <li>Make sure all words are spelled correctly.</li>
          <li>Try different keywords.</li>
          <li>Try more general keywords.</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="w-full">
      {}
      {!hasEcosystemApp && isFeatureEnabled('sge') && <AIOverview query={query} />}

      {}
      {isFeatureEnabled('code-tips') && (query?.toLowerCase()?.includes('code') || query?.toLowerCase()?.includes('react') || query?.toLowerCase()?.includes('python') || query?.toLowerCase()?.includes('js')) && (
        <div className="mt-6 border border-orange-500/30 bg-orange-500/5 rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center px-4 py-2 bg-orange-500/10 border-b border-orange-500/20">
            <Code size={16} className="text-orange-500 mr-2" />
            <span className="text-sm font-bold text-orange-600 dark:text-orange-400">Developer Code Tips</span>
          </div>
          <div className="p-4 bg-[#1e1e1e] font-mono text-sm overflow-x-auto text-green-400">
            <span className="text-pink-500">const</span> <span className="text-blue-400">optimizeQuery</span> = (<span className="text-orange-300">query</span>) =&gt; {'{'}<br/>
            &nbsp;&nbsp;<span className="text-gray-500"></span><br/>
            &nbsp;&nbsp;<span className="text-pink-500">return</span> query.trim().toLowerCase();<br/>
            {'}'};
          </div>
        </div>
      )}

      {}
      {(query?.toLowerCase().includes('pay') || query?.toLowerCase().includes('send money') || query?.toLowerCase().includes('bill')) && (
        <div className="mt-6 border border-[#138808]/30 bg-[#138808]/5 rounded-2xl p-6 shadow-[0_0_20px_rgba(19,136,8,0.1)] mb-8 relative overflow-hidden group transition-all hover:border-[#138808]/50">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#138808]/10 rounded-full blur-3xl group-hover:bg-[#138808]/20 transition-colors pointer-events-none"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <div className="flex items-center mb-2 text-[#138808]">
                <Zap size={14} className="mr-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Direct-Do Action</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Instant Transfer via SwiftPay</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Secure, zero-fee transfer without leaving search.</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-2 shadow-sm border border-gray-100">
              <span className="font-bold text-[#138808]">₹</span>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 relative z-10">
            <input type="text" placeholder="Enter UPI ID or Mobile Number" className="flex-1 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-[#138808]/50 shadow-inner" />
            <input type="number" placeholder="₹ Amount" className="w-full sm:w-32 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-[#138808]/50 shadow-inner" />
            <button className="bg-gradient-to-r from-[#138808] to-emerald-600 hover:scale-105 transition-transform text-white px-8 py-3 rounded-xl font-bold shadow-[0_0_15px_rgba(19,136,8,0.4)] whitespace-nowrap">Pay Now</button>
          </div>
        </div>
      )}

      {}
      {(query?.toLowerCase().includes('taj mahal') || query?.toLowerCase().includes('heart') || query?.toLowerCase().includes('3d')) && (
        <div className="mt-6 border border-[#FF9933]/30 bg-[#FF9933]/5 rounded-2xl p-1 shadow-[0_0_20px_rgba(255,153,51,0.1)] mb-8 overflow-hidden group">
           <div className="px-5 pt-4 pb-2 flex items-center text-[#FF9933]">
              <Sparkles size={14} className="mr-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Holographic 3D Result</span>
           </div>
           <div className="relative w-full h-[300px] bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/5 cursor-move">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 {}
                 <div className="relative w-32 h-32 group-hover:scale-110 transition-transform duration-[2000ms] perspective-1000">
                    <div className="absolute inset-0 border-2 border-[#FF9933]/50 rounded-lg animate-[spin_8s_linear_infinite] shadow-[0_0_30px_rgba(255,153,51,0.2)]" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(45deg)' }}></div>
                    <div className="absolute inset-0 border-2 border-[#138808]/50 rounded-full animate-[spin_12s_linear_infinite_reverse] shadow-[0_0_30px_rgba(19,136,8,0.2)]" style={{ transformStyle: 'preserve-3d', transform: 'rotateY(60deg)' }}></div>
                    <div className="absolute inset-0 border border-white/20 rounded-md animate-[spin_15s_linear_infinite]" style={{ transformStyle: 'preserve-3d', transform: 'rotateZ(30deg)' }}></div>
                 </div>
                 <p className="mt-12 text-[#FF9933]/80 text-xs tracking-widest font-mono animate-pulse">RENDERING HOLOGRAPHIC MESH...</p>
              </div>
              <div className="absolute bottom-4 left-4 z-10 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                 <h3 className="text-white font-bold text-sm">Interactive Model</h3>
                 <p className="text-[10px] text-gray-400">Drag to rotate • Pinch to zoom</p>
              </div>
           </div>
        </div>
      )}

      {}
      {query?.toLowerCase().includes('logo') && (
        <div className="mt-6 border border-blue-500/30 bg-blue-500/5 rounded-2xl p-6 shadow-[0_0_20px_rgba(59,130,246,0.1)] mb-8 overflow-hidden flex flex-col items-center justify-center relative">
           <div className="w-full flex items-start justify-between mb-6">
              <div className="flex items-center text-blue-600 dark:text-blue-400">
                <Sparkles size={16} className="mr-2" />
                <span className="text-xs font-bold uppercase tracking-wider">High-Res Logo Extractor</span>
              </div>
           </div>
           {(() => {
             let brandName = query.toLowerCase()
                .replace('logo', '')
                .replace('ka', '')
                .replace('search', '')
                .replace('karo', '')
                .replace('show', '')
                .replace('me', '')
                .trim();
             
             if (!brandName) brandName = 'google';
             
             const domain = `${brandName.replace(/\s+/g, '')}.com`;
             const logoUrl = `https://logo.clearbit.com/${domain}?size=500`;
             
             return (
               <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm w-full max-w-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                  <div className="w-48 h-48 flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl mb-6 relative group border border-gray-100 dark:border-gray-700">
                    <img 
                      src={logoUrl} 
                      alt={`${brandName} logo`} 
                      className="max-w-full max-h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${brandName}&background=random&size=256&font-size=0.33`;
                      }}
                    />
                  </div>
                  <h3 className="text-2xl font-bold capitalize text-gray-800 dark:text-gray-100">{brandName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{domain}</p>
                  
                  <div className="mt-6 flex space-x-4 w-full">
                    <a href={logoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors text-center shadow-md hover:shadow-lg flex items-center justify-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      Download PNG
                    </a>
                  </div>
               </div>
             );
           })()}
        </div>
      )}
      
      <div className="space-y-8 mt-6">
      {results.map((result, index) => {
        if (result.isEcosystemApp) {
          const appDetails = getAppDetails(result.appId);
          return (
            <div key="ecosystem-app" className="mb-10 w-full font-sans text-gray-900 dark:text-gray-100 mt-2">
              <div className="flex items-center space-x-4 mb-5">
                <div className="w-12 h-12 flex-shrink-0">
                  {appDetails.logo}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-normal text-gray-800 dark:text-gray-100">{appDetails.name}</h2>
                  <p className="text-[13px] text-gray-600 dark:text-gray-400 mt-0.5">{appDetails.subtitle || 'Official application platform'}</p>
                </div>
              </div>

              <div className="flex space-x-2 mb-8 overflow-x-auto hide-scrollbar pb-2">
                <button className="px-5 py-1.5 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-[13px] font-medium transition-colors bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800">Overview</button>
                <button className="px-5 py-1.5 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-[13px] font-medium transition-colors">Services</button>
                <button className="px-5 py-1.5 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-[13px] font-medium transition-colors">History</button>
                <button className="px-5 py-1.5 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-[13px] font-medium transition-colors">Support</button>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-1.5 cursor-pointer" onClick={() => onLaunchApp(result.appId)}>
                  <div className="w-5 h-5 mr-2.5 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center p-0.5">
                    {appDetails.logo}
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-gray-800 dark:text-gray-200">{appDetails.name}</div>
                    <div className="text-gray-500 dark:text-gray-400">https://www.{appDetails.name.toLowerCase()}.in</div>
                  </div>
                </div>
                
                <h3 className="text-xl text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer font-medium mb-1.5" onClick={() => onLaunchApp(result.appId)}>
                  {appDetails.name}
                </h3>
                <p className="text-[14px] text-gray-600 dark:text-gray-300 max-w-[650px] leading-relaxed">
                  {appDetails.desc}
                </p>
              </div>

              {appDetails.sitelinks && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 max-w-[800px] mt-8 pl-4">
                  {appDetails.sitelinks.map((link, i) => (
                    <div key={i}>
                      <h4 className="text-[16px] text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer mb-1" onClick={() => onLaunchApp(result.appId)}>
                        {link.title}
                      </h4>
                      <p className="text-[13px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {link.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }

        
        let domain = result.url;
        try {
          const urlObj = new URL(result.url);
          domain = urlObj.hostname;
        } catch (e) {}

        return (
          <div key={result._id || index} className="group glass-panel p-5 rounded-2xl mb-4 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)] border-l-4 border-l-transparent hover:border-l-[#FF9933]">
            <div className="flex items-center text-sm text-[var(--url-green)] mb-2">
              {}
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center mr-3 border border-border shadow-sm">
                <span className="text-[12px] font-bold text-foreground/70">{domain.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-foreground font-medium text-sm">{domain}</span>
                <span className="text-xs opacity-70">{result.url}</span>
              </div>
              <div className="ml-auto p-2 rounded-full hover:bg-accent cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical size={16} className="text-foreground/60" />
              </div>
            </div>
            
            <a 
              href={result.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block w-fit group/link"
              onClick={(e) => {
                if (result.url.toLowerCase().includes('playtube.com') || result.url.toLowerCase().includes('playtube.in')) {
                  e.preventDefault();
                  onLaunchApp('playtube');
                } else if (result.url.toLowerCase().includes('quickchat.com') || result.url.toLowerCase().includes('quickchat.in') || result.url.toLowerCase().includes('quickchat.globalsearch.com')) {
                  e.preventDefault();
                  onLaunchApp('quickchat');
                }
              }}
            >
              <h3 className="text-[22px] leading-tight font-semibold text-primary group-hover/link:underline mb-2 flex items-center transition-colors">
                {result.title}
                {}
                {isFeatureEnabled('deepfake-detector') && result.title?.includes('News') && (
                  <span className="ml-3 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800 border border-green-200" title="INDIShield AI has verified this source">
                    <ShieldAlert size={12} className="mr-1" /> Verified Source
                  </span>
                )}
              </h3>
            </a>
            
            <p className="text-sm text-foreground/80 leading-relaxed mt-2 max-w-[650px]">
              {result.snippet}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-2.5 py-1 rounded-md bg-accent text-[11px] font-medium text-foreground/60 uppercase tracking-wider">
                {result.language} • {result.district}
              </span>
            </div>
            
            {}
            {isFeatureEnabled('video-summary') && index === 2 && (
              <div className="mt-3">
                <button 
                  onClick={() => setExpandedSummary(expandedSummary === index ? null : index)}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-100 text-xs font-bold"
                >
                  <Video size={14} />
                  <span>AI Video Summary</span>
                  <ChevronDown size={14} className={`transform transition-transform ${expandedSummary === index ? 'rotate-180' : ''}`} />
                </button>
                
                {expandedSummary === index && (
                  <div className="mt-2 p-3 bg-red-50/50 rounded-xl border border-red-100 text-sm text-gray-700 animate-in slide-in-from-top-2">
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>0:00</strong> - Introduction to the topic.</li>
                      <li><strong>1:24</strong> - Main concepts explained clearly.</li>
                      <li><strong>3:45</strong> - Conclusion and summary of {query}.</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
      </div>
    </div>
  );
};

function getAppDetails(appId) {
  switch (appId) {
    case 'playtube': return { 
      name: 'PlayTube', 
      subtitle: 'Online video platform',
      desc: 'Enjoy the videos and music you love, upload original content and share it all with friends, family and the world on PlayTube.', 
      logo: <PlayTubeLogo />,
      sitelinks: [
        { title: 'Gaming', desc: 'Top live games auto-generated by PlayTube\'s algorithms and trending globally.' },
        { title: 'PlayTube Music', desc: 'With the PlayTube Music app, enjoy over 100 million songs at your fingertips, plus live performances.' },
        { title: 'Music', desc: 'Visit the PlayTube Music Channel to find today\'s top talent, featured artists, and playlists.' },
        { title: 'History', desc: 'View your watch history and revisit your favorite videos on PlayTube.' },
        { title: 'Movies', desc: 'Find the latest and greatest movies and shows all available on PlayTube.' },
        { title: 'PlayTube TV', desc: 'Stream live TV from top networks and local channels in your region seamlessly.' }
      ]
    };
    case 'quickchat': return { 
      name: 'QuickChat', 
      subtitle: 'Instant messaging app',
      desc: 'End-to-end encrypted messaging with real-time AI translation, voice calls, and seamless media sharing across devices.', 
      logo: <QuickChatLogo />,
      sitelinks: [
        { title: 'Web App', desc: 'Use QuickChat directly from your browser to stay connected while working.' },
        { title: 'Download', desc: 'Get QuickChat for iOS, Android, Mac, or Windows PC for free.' },
        { title: 'Features', desc: 'Explore group chats, HD video calling, and vanishing messages.' },
        { title: 'Privacy', desc: 'Learn how your data is secured with state-of-the-art quantum encryption.' }
      ]
    };
    case 'pixora': return { 
      name: 'Pixora', 
      subtitle: 'Social networking service',
      desc: 'Connect with friends, family, and the world. Share your photos, thoughts, and discover what\'s trending locally and globally.', 
      logo: <PixoraLogo />,
      sitelinks: [
        { title: 'Log In', desc: 'Sign in to your Pixora account to see what your friends are up to.' },
        { title: 'Sign Up', desc: 'Create a new account for free and start connecting with the world.' },
        { title: 'Marketplace', desc: 'Buy and sell items locally with people in your community securely.' },
        { title: 'Groups', desc: 'Find communities that share your interests and passions.' }
      ]
    };
    case 'CoreCloud': return { name: 'CoreCloud', subtitle: 'Cloud storage service', desc: 'Secure holographic data storage backed by India-based sovereign data center nodes.', logo: <CoreCloudLogo /> };
    case 'novaai': return { name: 'NovaAI', subtitle: 'Artificial Intelligence Interface', desc: 'Advanced humanoid AI interface capable of localized regional language processing.', logo: <NovaAILogo /> };
    case 'village': return { name: 'GramNetOS', subtitle: 'Rural connectivity platform', desc: 'Offline-first, solar-powered local mesh network dashboard for rural connectivity.', logo: <VillageInternetLogo /> };
    case 'navimap': return { name: 'NaviMap', subtitle: 'Mapping service', desc: 'Real-time 3D terrain and navigation mapped specifically for Indian infrastructure.', logo: <CoreNetLogo /> }; 
    case 'swiftpay': return { name: 'SwiftPay', subtitle: 'Digital wallet platform', desc: 'Zero-fee quantum-secured unified payment interface with instant settlements.', logo: <CoreNetLogo /> }; 
    case 'syncmeet': return { name: 'SyncMeet', subtitle: 'Video conferencing platform', desc: 'Immersive holographic video conferencing platform for teams and remote collaboration.', logo: <CoreNetLogo /> }; 
    case 'mail': return { name: 'SwiftMail', subtitle: 'Email service provider', desc: 'Smart inbox with AI summarization and categorization.', logo: <CoreNetLogo /> }; 
    default: return { name: 'Bharat App', subtitle: 'Digital platform', desc: 'Launch the requested CoreNet platform.', logo: <CoreNetLogo /> };
  }
}

export default SearchResults;

