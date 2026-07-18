import React, { useState } from 'react';
import { X, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
      {/* Animated Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white/90 dark:bg-gray-900/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] ring-1 ring-white/50 dark:ring-white/10 backdrop-blur-2xl animate-in zoom-in-95 duration-400 flex flex-col">
        
        {/* Top Decorative Gradient */}
        <div className="absolute top-0 left-0 right-0 h-[6px] bg-gradient-to-r from-[#FF9933] via-[#ffffff] to-[#138808]" />

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 transition-all hover:rotate-90 duration-300 z-10"
        >
          <X size={18} strokeWidth={2.5} />
        </button>
        
        <div className="px-8 pt-10 pb-6 flex flex-col items-center mt-2">
          {/* Logo / Icon Area */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/30 flex items-center justify-center mb-6 transform transition-transform hover:scale-110 duration-300">
            <ShieldCheck className="text-white w-8 h-8" />
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium text-center">
            {isSignUp ? (
              <>Join the secure <span className="text-blue-600 dark:text-blue-400">INDIMail</span> ecosystem</>
            ) : (
              <>Sign in to access your secure <span className="text-blue-600 dark:text-blue-400">INDIMail</span></>
            )}
          </p>
        </div>

        {/* Form Area */}
        <div className="px-8 pb-10">
          <form onSubmit={(e) => { e.preventDefault(); onLogin(email || (isSignUp ? 'newuser@globalsearch.in' : 'user@globalsearch.in')); setEmail(''); }} className="space-y-5">
            
            {isSignUp && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-600 text-gray-400">
                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Arjun Kumar" 
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50/80 dark:bg-black/30 border-2 border-gray-100 dark:border-gray-800 rounded-2xl focus:bg-white dark:focus:bg-black/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm font-medium text-gray-900 dark:text-gray-100 placeholder-gray-400 shadow-inner" 
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-600 text-gray-400">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@globalsearch.in" 
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50/80 dark:bg-black/30 border-2 border-gray-100 dark:border-gray-800 rounded-2xl focus:bg-white dark:focus:bg-black/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm font-medium text-gray-900 dark:text-gray-100 placeholder-gray-400 shadow-inner" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Password</label>
                {!isSignUp && <a href="#" className="text-[11px] font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline">FORGOT?</a>}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-600 text-gray-400">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••" 
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50/80 dark:bg-black/30 border-2 border-gray-100 dark:border-gray-800 rounded-2xl focus:bg-white dark:focus:bg-black/50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm font-bold text-gray-900 dark:text-gray-100 placeholder-gray-400 tracking-widest shadow-inner" 
                />
              </div>
            </div>

            <div className="pt-3">
              <button 
                type="submit" 
                className="group relative w-full bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold text-sm py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 overflow-hidden flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center">
                  {isSignUp ? "Create Account" : "Sign In"} 
                  <ArrowRight size={16} className="ml-2 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
                </span>
                {/* Shine effect */}
                <div className="absolute top-0 -left-[100%] h-full w-[50%] bg-gradient-to-r from-transparent via-white/20 dark:via-black/10 to-transparent skew-x-[20deg] group-hover:left-[200%] transition-all duration-700 ease-out" />
              </button>
            </div>
            
          </form>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50/50 dark:bg-black/30 py-5 text-center border-t border-gray-100 dark:border-gray-800 backdrop-blur-sm">
          <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400">
            {isSignUp ? (
              <>Already have an account? <button type="button" onClick={() => setIsSignUp(false)} className="text-blue-600 dark:text-blue-400 font-bold hover:underline transition-colors focus:outline-none">Sign in</button></>
            ) : (
              <>Don't have an account? <button type="button" onClick={() => setIsSignUp(true)} className="text-blue-600 dark:text-blue-400 font-bold hover:underline transition-colors focus:outline-none">Create one</button></>
            )}
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginModal;
