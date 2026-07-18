import React, { useState, useEffect } from 'react';
import { ArrowLeft, AlertTriangle, ShieldCheck, MapPin, Send, Camera, FileText, CheckCircle2, User, Landmark, HelpCircle, PhoneCall } from 'lucide-react';

export default function EGovernance({ onBack, initialQuery = '' }) {
  const [step, setStep] = useState(1);
  const [complaintType, setComplaintType] = useState('Roads & Infrastructure');
  const [description, setDescription] = useState(initialQuery);
  const [trackingId, setTrackingId] = useState('');
  
  const autoDetectType = () => {
    const q = initialQuery.toLowerCase();
    if (q.includes('paani') || q.includes('water') || q.includes('jal')) return 'Water Supply';
    if (q.includes('bijli') || q.includes('light') || q.includes('power')) return 'Electricity';
    if (q.includes('road') || q.includes('sadak') || q.includes('gaddha')) return 'Roads & Infrastructure';
    if (q.includes('kachra') || q.includes('garbage') || q.includes('clean')) return 'Sanitation';
    return 'Other';
  };

  useEffect(() => {
    if (initialQuery) {
      setComplaintType(autoDetectType());
      setDescription(initialQuery);
    }
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
    setTimeout(() => {
      setTrackingId(`GS-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="flex h-[100dvh] w-full bg-[#f8fafc] dark:bg-[#020817] text-gray-800 dark:text-gray-200 font-sans overflow-hidden relative transition-colors duration-300">
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-green-500/10 dark:bg-emerald-600/10 rounded-full blur-[100px]"></div>
      </div>

      <header className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-20 bg-white/50 dark:bg-black/50 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={22} className="text-gray-700 dark:text-gray-300" />
          </button>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF9933] via-white to-[#138808] p-[2px] shadow-lg mr-3">
               <div className="w-full h-full bg-white dark:bg-black rounded-lg flex items-center justify-center">
                 <Landmark size={20} className="text-blue-600 dark:text-blue-400" />
               </div>
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight text-gray-900 dark:text-white leading-tight">E-Mitra Portal</h1>
              <p className="text-xs text-gray-500 font-medium">Direct Grievance Redressal</p>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="hidden md:flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium rounded-full border border-blue-200 dark:border-blue-800">
            <HelpCircle size={16} className="mr-2" /> Schemes
          </button>
          <button className="flex items-center px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-medium rounded-full border border-red-200 dark:border-red-800">
            <PhoneCall size={16} className="mr-2" /> SOS
          </button>
        </div>
      </header>

      <main className="relative z-10 w-full h-full flex flex-col md:flex-row pt-24 px-4 md:px-8 pb-8 gap-6 max-w-7xl mx-auto overflow-y-auto hide-scrollbar">
        
        {/* Left Side: Context / Info */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="bg-white dark:bg-[#0f172a] rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-white/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <ShieldCheck size={100} />
             </div>
             <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2 relative z-10">AI Jan Sunwai</h2>
             <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 relative z-10">Your complaint will be directly routed to the District Magistrate's dashboard with an SLA of 48 hours.</p>
             
             <div className="space-y-4 relative z-10">
               <div className="flex items-center p-3 rounded-2xl bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/5">
                 <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3 shrink-0">
                   <User size={18} />
                 </div>
                 <div>
                   <p className="text-xs text-gray-500">Verified Citizen</p>
                   <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">Aadhaar Linked</p>
                 </div>
               </div>
               
               <div className="flex items-center p-3 rounded-2xl bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/5">
                 <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center mr-3 shrink-0">
                   <MapPin size={18} />
                 </div>
                 <div>
                   <p className="text-xs text-gray-500">Auto-Detected Location</p>
                   <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">Sector 62, Noida, UP</p>
                 </div>
               </div>
             </div>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 shadow-xl text-white relative overflow-hidden hidden md:block">
            <h3 className="font-bold text-lg mb-2">Govt. Scheme Matcher</h3>
            <p className="text-indigo-100 text-sm mb-4">Based on your profile, you are eligible for 3 local schemes.</p>
            <button className="w-full py-2.5 bg-white text-indigo-600 rounded-xl font-semibold text-sm hover:bg-indigo-50 transition-colors">
              Check Eligibility
            </button>
          </div>
        </div>

        {/* Right Side: Action Area */}
        <div className="w-full md:w-2/3 flex flex-col">
          <div className="bg-white dark:bg-[#0f172a] rounded-3xl shadow-xl border border-gray-100 dark:border-white/5 p-6 md:p-10 flex-1 flex flex-col">
            
            {step === 1 && (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col h-auto">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Register a Grievance</h2>
                  <p className="text-sm text-gray-500">We detected a potential complaint from your search.</p>
                </div>

                <div className="space-y-6 flex-1">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
                    <select 
                      value={complaintType}
                      onChange={(e) => setComplaintType(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-[#020817] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none"
                    >
                      <option>Water Supply</option>
                      <option>Electricity</option>
                      <option>Roads & Infrastructure</option>
                      <option>Sanitation</option>
                      <option>Law & Order</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                    <textarea 
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="w-full bg-gray-50 dark:bg-[#020817] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                      placeholder="Describe the issue in detail..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Attach Evidence (Optional)</label>
                    <div className="flex gap-4">
                      <button type="button" className="flex-1 py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-xl flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors bg-gray-50 dark:bg-black/20">
                        <Camera size={24} className="mb-2" />
                        <span className="text-xs font-medium">Take Photo</span>
                      </button>
                      <button type="button" className="flex-1 py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-xl flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors bg-gray-50 dark:bg-black/20">
                        <FileText size={24} className="mb-2" />
                        <span className="text-xs font-medium">Upload File</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button type="submit" className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center">
                    Submit to Administration <Send size={20} className="ml-2" />
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <div className="flex-1 flex flex-col items-center justify-center h-full">
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-blue-600 dark:border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Routing to Department...</h3>
                <p className="text-gray-500 dark:text-gray-400">Analyzing via AI and assigning to the concerned local officer.</p>
              </div>
            )}

            {step === 3 && (
              <div className="flex-1 flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={48} className="text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Complaint Registered</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">Your issue has been forwarded directly to the municipal dashboard. You will receive an SMS update shortly.</p>
                
                <div className="bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-2xl p-6 w-full max-w-sm mb-8">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Tracking ID</p>
                  <p className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400 tracking-widest">{trackingId}</p>
                </div>
                
                <button onClick={onBack} className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-opacity">
                  Return to Search
                </button>
              </div>
            )}
            
          </div>
        </div>
      </main>
    </div>
  );
}
