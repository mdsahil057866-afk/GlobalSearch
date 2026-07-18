import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, IndianRupee, Send, QrCode, History, ShieldCheck, Wallet, 
  ArrowDownLeft, ArrowUpRight, Smartphone, Zap, MonitorPlay, Home, 
  CreditCard, Landmark, CircleDollarSign, Shield, Activity, Plane, 
  Train, Bus, Gem, PiggyBank, Briefcase, Car, Building2, Ticket,
  CheckCircle2, Loader2, Delete, Fingerprint, User, LogOut, Mic, PieChart, TrendingUp as TrendingUpIcon, AlertTriangle
} from 'lucide-react';
import SwiftPayLogo from './SwiftPayLogo';

export default function SwiftPay({ onBack }) {
  const [currentFlow, setCurrentFlow] = useState('login');
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isVoiceUpiActive, setIsVoiceUpiActive] = useState(false);

  // Bank & Payment states
  const [isBankLinked, setIsBankLinked] = useState(false);
  const [linkedBank, setLinkedBank] = useState('');
  const [activeAction, setActiveAction] = useState(null);
  const [balance, setBalance] = useState(124500);
  
  // Form states
  const [pin, setPin] = useState('');
  const [targetInput, setTargetInput] = useState('');
  const [amountInput, setAmountInput] = useState('');
  
  // Verification simulation
  const [verificationStep, setVerificationStep] = useState(0);

  const transactions = [
    { id: 1, name: 'Rahul Sharma', amount: '₹500', type: 'sent', time: 'Today, 2:30 PM' },
    { id: 2, name: 'Coffee Shop', amount: '₹120', type: 'sent', time: 'Yesterday' },
    { id: 3, name: 'Salary (TechCorp)', amount: '₹85,000', type: 'received', time: 'Oct 1st' },
    { id: 4, name: 'Zomato', amount: '₹345', type: 'sent', time: 'Sep 30th' },
  ];

  
  const profileMenuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsBankLinked(false);
    setLinkedBank('');
    setMobileNumber('');
    setOtpInput('');
    setPin('');
    setShowProfileMenu(false);
    setCurrentFlow('login');
  };

  const handleActionClick = (action) => {
    if (!isBankLinked) {
      setCurrentFlow('addBank');
    } else {
      setActiveAction(action);
      if (action.label === 'Check Balance') {
        setCurrentFlow('enterPin');
      } else {
        setTargetInput('');
        setAmountInput('');
        setCurrentFlow('actionInput');
      }
    }
  };

  const selectBank = (bankName) => {
    setLinkedBank(bankName);
    setCurrentFlow('verifyingBank');
    setVerificationStep(0);
  };

  useEffect(() => {
    if (currentFlow === 'verifyingBank') {
      const timer1 = setTimeout(() => setVerificationStep(1), 2000);
      const timer2 = setTimeout(() => setVerificationStep(2), 4000);
      const timer3 = setTimeout(() => setCurrentFlow('setPin'), 5500);
      return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
    }
  }, [currentFlow]);

  const handlePinInput = (digit) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      
      if (newPin.length === 4) {
        setTimeout(() => {
          if (currentFlow === 'setPin') {
            setIsBankLinked(true);
            setCurrentFlow('dashboard');
            setPin('');
          } else if (currentFlow === 'enterPin') {
            if (activeAction?.label === 'Check Balance') {
              setCurrentFlow('checkBalance');
            } else {
              setCurrentFlow('success');
              setBalance(prev => prev - (parseInt(amountInput) || 0));
            }
            setPin('');
          }
        }, 500);
      }
    }
  };

  const handleDeletePin = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const renderKeypad = () => (
    <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto mt-8">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
        <button key={num} onClick={() => handlePinInput(num.toString())} className="w-16 h-16 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-2xl font-medium transition-colors mx-auto">
          {num}
        </button>
      ))}
      <button className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-medium mx-auto">
        {/* Empty space */}
      </button>
      <button onClick={() => handlePinInput('0')} className="w-16 h-16 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-2xl font-medium transition-colors mx-auto">
        0
      </button>
      <button onClick={handleDeletePin} className="w-16 h-16 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-xl transition-colors mx-auto text-gray-400">
        <Delete size={24} />
      </button>
    </div>
  );

  

  const LoginView = () => (
    <div className="flex-1 p-6 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 relative">
      <div className="absolute top-10 left-0 w-full flex justify-center opacity-10 blur-xl pointer-events-none">
         <div className="w-64 h-64 rounded-full bg-[#138808]"></div>
         <div className="w-64 h-64 rounded-full bg-[#FF9933] -ml-20"></div>
      </div>
      
      <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-xl backdrop-blur-md">
        <Smartphone size={40} className="text-[#FF9933]" />
      </div>
      
      <h2 className="text-3xl font-bold mb-2 text-center text-white">Welcome to SwiftPay</h2>
      <p className="text-gray-400 text-center mb-10 max-w-sm">Enter your mobile number to login or create a new account securely.</p>
      
      <div className="w-full max-w-sm space-y-6 z-10">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <span className="text-gray-400 font-medium">+91</span>
            <div className="h-5 w-px bg-white/20 mx-3"></div>
          </div>
          <input 
            type="tel" 
            maxLength="10"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
            placeholder="Mobile Number"
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-20 pr-4 py-4 text-xl font-medium text-white focus:outline-none focus:border-[#FF9933]/50 transition-colors tracking-widest"
          />
        </div>
        
        <button 
          disabled={mobileNumber.length !== 10}
          onClick={() => setCurrentFlow('otp')}
          className="w-full py-4 bg-gradient-to-r from-[#FF9933] to-[#138808] text-white rounded-xl font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(19,136,8,0.3)]"
        >
          Proceed
        </button>
      </div>
    </div>
  );

  const OTPView = () => (
    <div className="flex-1 p-6 flex flex-col items-center justify-center animate-in fade-in slide-in-from-right-8 relative">
      <div className="w-20 h-20 rounded-3xl bg-[#138808]/10 border border-[#138808]/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(19,136,8,0.2)]">
        <ShieldCheck size={40} className="text-[#4ade80]" />
      </div>
      
      <h2 className="text-2xl font-bold mb-2 text-center text-white">Verify Mobile Number</h2>
      <p className="text-gray-400 text-center mb-2">We've sent a 6-digit OTP to</p>
      <p className="text-white font-bold text-lg mb-10 tracking-wider">+91 {mobileNumber}</p>
      
      <div className="w-full max-w-sm space-y-6 z-10">
        <input 
          type="text" 
          maxLength="6"
          value={otpInput}
          onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
          placeholder="Enter 6-digit OTP"
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-4 text-center text-2xl font-bold text-white focus:outline-none focus:border-[#138808]/50 transition-colors tracking-[0.5em]"
        />
        
        <button 
          disabled={otpInput.length !== 6}
          onClick={() => {
            setIsLoggedIn(true);
            setCurrentFlow('dashboard');
          }}
          className="w-full py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verify & Login
        </button>
        
        <div className="flex justify-between items-center px-2">
          <button onClick={() => setCurrentFlow('login')} className="text-sm text-gray-500 hover:text-white transition-colors">Change Number</button>
          <button className="text-sm text-[#FF9933] hover:underline transition-colors">Resend OTP</button>
        </div>
      </div>
    </div>
  );

  

  const AddBankView = () => (
    <div className="flex-1 p-6 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4">
      <Landmark size={48} className="text-[#138808] mb-6" />
      <h2 className="text-2xl font-bold mb-2">Add Bank Account</h2>
      <p className="text-gray-400 text-center mb-8">Select your bank. We will verify it securely using your mobile number <span className="font-bold text-white">+91 {mobileNumber}</span></p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-lg">
        {['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Punjab National Bank', 'Kotak Mahindra Bank'].map(bank => (
          <button 
            key={bank} 
            onClick={() => selectBank(bank)}
            className="bg-[#1a1a1a] border border-white/10 hover:border-[#FF9933]/50 p-4 rounded-2xl flex flex-col items-center text-center transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Landmark className="text-gray-300" />
            </div>
            <span className="text-sm font-medium text-gray-200">{bank}</span>
          </button>
        ))}
      </div>
      <button onClick={() => setCurrentFlow('dashboard')} className="mt-8 text-gray-400 hover:text-white">Cancel</button>
    </div>
  );

  const VerifyingBankView = () => (
    <div className="flex-1 p-6 flex flex-col items-center justify-center animate-in fade-in">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full border-4 border-white/10 flex items-center justify-center">
          {verificationStep < 2 ? (
            <Loader2 size={40} className="text-[#138808] animate-spin" />
          ) : (
            <CheckCircle2 size={48} className="text-[#4ade80]" />
          )}
        </div>
        {verificationStep < 2 && (
          <div className="absolute inset-0 rounded-full border-t-4 border-[#FF9933] animate-spin" style={{ animationDuration: '2s' }}></div>
        )}
      </div>
      
      <h2 className="text-xl font-bold mb-4 text-center">
        {verificationStep === 0 && `Sending SMS from +91 ${mobileNumber}...`}
        {verificationStep === 1 && `Finding ${linkedBank} accounts linked to your number...`}
        {verificationStep === 2 && `${linkedBank} Account Found!`}
      </h2>
      <p className="text-gray-400">Secure connection established via Quantum Network.</p>
    </div>
  );

  const SetPinView = () => (
    <div className="flex-1 p-6 flex flex-col items-center justify-center animate-in fade-in slide-in-from-right-8">
      <ShieldCheck size={48} className="text-[#4ade80] mb-6" />
      <h2 className="text-2xl font-bold mb-2 text-center">Set UPI PIN</h2>
      <p className="text-gray-400 text-center mb-8">Create a 4-digit secure PIN for your {linkedBank} account.</p>
      
      <div className="flex gap-4 mb-8">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={`w-4 h-4 rounded-full ${pin.length > i ? 'bg-white' : 'bg-white/20'}`}></div>
        ))}
      </div>
      
      {renderKeypad()}
    </div>
  );

  const ActionInputView = () => {
    const Icon = activeAction?.icon || Send;
    return (
      <div className="flex-1 p-6 flex flex-col items-center justify-center animate-in fade-in slide-in-from-right-8">
        <div className={`w-20 h-20 rounded-3xl ${activeAction?.bgClass || 'bg-white/10'} flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,153,51,0.2)]`}>
          <Icon size={40} className={activeAction?.colorClass || 'text-white'} />
        </div>
        <h2 className="text-2xl font-bold mb-8">{activeAction?.label}</h2>
        
        <div className="w-full max-w-md space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Target Details (Mobile/Biller/ID)</label>
            <input 
              type="text" 
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder="Enter details..."
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#FF9933]/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Amount (₹)</label>
            <input 
              type="number" 
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              placeholder="0.00"
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-4 text-3xl font-bold text-white focus:outline-none focus:border-[#138808]/50 transition-colors"
            />
          </div>
          <button 
            disabled={!targetInput || !amountInput}
            onClick={() => setCurrentFlow('enterPin')}
            className="w-full py-4 bg-gradient-to-r from-[#FF9933] to-[#138808] text-white rounded-xl font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-[0_0_20px_rgba(19,136,8,0.3)]"
          >
            Proceed to Pay
          </button>
          <button onClick={() => setCurrentFlow('dashboard')} className="w-full py-4 text-gray-400 hover:text-white transition-colors">Cancel</button>
        </div>
      </div>
    );
  };

  const EnterPinView = () => (
    <div className="flex-1 p-6 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-8">
      <Fingerprint size={48} className="text-[#FF9933] mb-6" />
      <h2 className="text-2xl font-bold mb-2 text-center">Enter UPI PIN</h2>
      <p className="text-gray-400 text-center mb-8">
        {activeAction?.label === 'Check Balance' 
          ? `Enter PIN to check balance for ${linkedBank}` 
          : `Paying ₹${amountInput} securely via ${linkedBank}`}
      </p>
      
      <div className="flex gap-4 mb-8">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={`w-4 h-4 rounded-full ${pin.length > i ? 'bg-white' : 'bg-white/20'}`}></div>
        ))}
      </div>
      
      {renderKeypad()}
      <button onClick={() => { setCurrentFlow('dashboard'); setPin(''); }} className="mt-8 text-gray-400 hover:text-white">Cancel Transaction</button>
    </div>
  );

  const SuccessView = () => (
    <div className="flex-1 p-6 flex flex-col items-center justify-center animate-in zoom-in-95 duration-500">
      <div className="w-32 h-32 rounded-full bg-[#138808]/20 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(19,136,8,0.4)]">
        <CheckCircle2 size={64} className="text-[#4ade80]" />
      </div>
      <h2 className="text-3xl font-bold mb-2 text-center text-white">Payment Successful</h2>
      <p className="text-xl text-gray-300 text-center mb-8">₹{amountInput} paid to {targetInput}</p>
      
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-sm mb-8 space-y-3 text-sm">
        <div className="flex justify-between"><span className="text-gray-400">Transaction ID</span><span className="font-mono">BHRT{Math.floor(Math.random()*1000000000)}</span></div>
        <div className="flex justify-between"><span className="text-gray-400">Date & Time</span><span>{new Date().toLocaleString()}</span></div>
        <div className="flex justify-between"><span className="text-gray-400">Paid from</span><span>{linkedBank}</span></div>
      </div>
      
      <button onClick={() => setCurrentFlow('dashboard')} className="w-full max-w-sm py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors">
        Done
      </button>
    </div>
  );

  const CheckBalanceView = () => (
    <div className="flex-1 p-6 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-8">
      <div className="w-24 h-24 rounded-full bg-[#4285F4]/20 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(66,133,244,0.3)]">
        <Landmark size={48} className="text-[#4285F4]" />
      </div>
      <p className="text-gray-400 text-center mb-2">{linkedBank} Account Balance</p>
      <h2 className="text-5xl font-bold mb-12 text-white">₹{balance.toLocaleString('en-IN')}<span className="text-2xl text-gray-500">.00</span></h2>
      
      <button onClick={() => setCurrentFlow('dashboard')} className="w-full max-w-sm py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors">
        Done
      </button>
    </div>
  );

  

  const ActionButton = ({ icon: Icon, label, colorClass, bgClass, glowColor }) => (
    <button onClick={() => handleActionClick({ icon: Icon, label, colorClass, bgClass })} className="flex flex-col items-center group relative w-full">
      <div className={`absolute inset-0 bg-${glowColor}-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${bgClass} flex items-center justify-center mb-2 sm:mb-3 group-hover:-translate-y-1 transition-all shadow-lg border border-white/10 z-10`}>
        {Icon && <Icon size={28} className={colorClass} />}
      </div>
      <span className="text-[10px] sm:text-xs font-medium text-center text-gray-300 group-hover:text-white transition-colors leading-tight">{label}</span>
    </button>
  );

  const Section = ({ title, children }) => (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-5 sm:p-6 mb-6 shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      <h3 className="text-lg font-bold mb-5 flex items-center text-gray-100 relative z-10">{title}</h3>
      <div className="grid grid-cols-4 gap-y-6 gap-x-2 sm:gap-x-4 relative z-10">{children}</div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen w-full bg-[#050505] text-white font-sans overflow-hidden">
      <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-white/5 border-b border-white/10 shrink-0 z-50 backdrop-blur-md">
        <div className="flex items-center">
          <button onClick={() => { 
            if(currentFlow !== 'dashboard' && currentFlow !== 'login' && currentFlow !== 'otp') setCurrentFlow('dashboard'); 
            else onBack(); 
          }} className="mr-3 p-2 rounded-full hover:bg-white/10 transition-colors">
            <ArrowLeft size={20} className="text-gray-400" />
          </button>
          <SwiftPayLogo className="h-10 w-auto -ml-2" />
        </div>
        <div className="flex items-center space-x-3">
          {isLoggedIn && (
            <div className="relative" ref={profileMenuRef}>
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
              >
                <User size={16} className="text-white" />
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 origin-top-right">
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-sm font-medium text-white">My Profile</p>
                    <p className="text-xs text-gray-400 font-mono">+91 {mobileNumber}</p>
                  </div>
                  {isBankLinked && (
                    <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                      <p className="text-xs text-gray-400 mb-1">Primary Bank</p>
                      <p className="text-sm text-[#4ade80] font-medium flex items-center"><Landmark size={12} className="mr-1" /> {linkedBank}</p>
                    </div>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5 flex items-center transition-colors"
                  >
                    <LogOut size={16} className="mr-2" /> Log Out
                  </button>
                </div>
              )}
            </div>
          )}
          {(!isLoggedIn || currentFlow === 'login' || currentFlow === 'otp') ? (
             <div className="flex items-center bg-[#138808]/20 px-3 py-1.5 rounded-full border border-[#138808]/50 shadow-[0_0_10px_rgba(19,136,8,0.2)]">
               <ShieldCheck size={14} className="text-[#4ade80] mr-1.5" />
               <span className="text-[#4ade80] text-[10px] sm:text-xs font-bold tracking-wider">SECURE</span>
             </div>
          ) : (
             <div className="flex items-center bg-[#138808]/20 px-3 py-1.5 rounded-full border border-[#138808]/50 shadow-[0_0_10px_rgba(19,136,8,0.2)] cursor-pointer hover:bg-[#138808]/30 transition-colors">
               <ShieldCheck size={14} className="text-[#4ade80] mr-1.5" />
               <span className="text-[#4ade80] text-[10px] sm:text-xs font-bold tracking-wider">QUANTUM SECURE</span>
             </div>
          )}
        </div>
      </header>

      {currentFlow === 'login' && <LoginView />}
      {currentFlow === 'otp' && <OTPView />}

      {currentFlow === 'dashboard' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10 relative z-10 hide-scrollbar pb-24 animate-in fade-in">
          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
            
            {}
            <div className="relative w-full aspect-[2/1] sm:aspect-[2.5/1] rounded-3xl overflow-hidden p-5 sm:p-7 flex flex-col justify-between shadow-[0_20px_50px_rgba(255,153,51,0.15)] border border-white/20 group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF9933] via-gray-900 to-[#138808] opacity-90"></div>
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
              
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <p className="text-white/70 text-xs sm:text-sm font-medium tracking-wider mb-1">BHARAT WALLET BALANCE</p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-md tracking-tight">₹{balance.toLocaleString('en-IN')}<span className="text-xl sm:text-2xl text-white/50">.00</span></h2>
                </div>
                <div className="flex gap-2">
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 rounded-xl transition-colors" title="Scan QR">
                    <QrCode size={22} className="text-white" />
                  </button>
                  <button 
                    onClick={() => setIsVoiceUpiActive(!isVoiceUpiActive)}
                    className={`backdrop-blur-md p-2 rounded-xl transition-all shadow-lg ${isVoiceUpiActive ? 'bg-[#FF0000]/80 shadow-[0_0_15px_rgba(255,0,0,0.6)] animate-pulse' : 'bg-white/20 hover:bg-white/30'}`} 
                    title="Voice-Activated UPI"
                  >
                    <Mic size={22} className="text-white" />
                  </button>
                </div>
              </div>
              
              {isVoiceUpiActive && (
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center z-20 pointer-events-none">
                  <div className="bg-black/80 backdrop-blur-md px-6 py-3 rounded-full border border-[#FF0000]/50 shadow-[0_0_20px_rgba(255,0,0,0.5)]">
                    <p className="text-white text-sm font-medium flex items-center">
                      <Mic size={16} className="text-[#FF0000] mr-2 animate-pulse" />
                      Listening for voice command... "Pay Rahul 500"
                    </p>
                  </div>
                </div>
              )}
              
              <div className="relative z-10 flex justify-between items-end">
                <div>
                  <p className="text-white/60 text-[10px] sm:text-xs mb-1">BHARAT UPI ID</p>
                  <p className="text-white font-mono tracking-widest text-sm sm:text-lg">{mobileNumber}@bharat</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-8 px-3 rounded bg-white/20 backdrop-blur-md flex items-center justify-center text-xs font-bold shadow-[0_0_10px_rgba(255,255,255,0.1)] cursor-pointer hover:bg-white/30 transition-colors">
                    Receive
                  </div>
                </div>
              </div>
            </div>

            {}
            <Section title="Transfer Money">
              <ActionButton icon={Smartphone} label="To Mobile" colorClass="text-[#FF9933]" bgClass="bg-[#FF9933]/10" glowColor="orange" />
              <ActionButton icon={Landmark} label="To Bank/UPI" colorClass="text-[#4285F4]" bgClass="bg-[#4285F4]/10" glowColor="blue" />
              <ActionButton icon={CircleDollarSign} label="To Self" colorClass="text-purple-400" bgClass="bg-purple-500/10" glowColor="purple" />
              <ActionButton icon={Wallet} label="Check Balance" colorClass="text-[#138808]" bgClass="bg-[#138808]/10" glowColor="green" />
            </Section>

            {}
            <Section title="Recharge & Pay Bills">
              <ActionButton icon={Smartphone} label="Mobile Recharge" colorClass="text-blue-400" bgClass="bg-blue-500/10" glowColor="blue" />
              <ActionButton icon={MonitorPlay} label="DTH" colorClass="text-orange-400" bgClass="bg-orange-500/10" glowColor="orange" />
              <ActionButton icon={Zap} label="Electricity" colorClass="text-yellow-400" bgClass="bg-yellow-500/10" glowColor="yellow" />
              <ActionButton icon={CreditCard} label="Credit Card" colorClass="text-pink-400" bgClass="bg-pink-500/10" glowColor="pink" />
              <ActionButton icon={Home} label="Rent" colorClass="text-teal-400" bgClass="bg-teal-500/10" glowColor="teal" />
              <ActionButton icon={Building2} label="Loan" colorClass="text-indigo-400" bgClass="bg-indigo-500/10" glowColor="indigo" />
              <ActionButton icon={PiggyBank} label="Education" colorClass="text-[#FF9933]" bgClass="bg-[#FF9933]/10" glowColor="orange" />
              <ActionButton icon={Ticket} label="View All" colorClass="text-gray-300" bgClass="bg-gray-700/50" glowColor="gray" />
            </Section>

            {}
            <Section title="Insurance">
              <ActionButton icon={Car} label="Bike/Car" colorClass="text-blue-400" bgClass="bg-blue-500/10" glowColor="blue" />
              <ActionButton icon={Activity} label="Health" colorClass="text-red-400" bgClass="bg-red-500/10" glowColor="red" />
              <ActionButton icon={Plane} label="Travel" colorClass="text-teal-400" bgClass="bg-teal-500/10" glowColor="teal" />
              <ActionButton icon={Shield} label="Life" colorClass="text-purple-400" bgClass="bg-purple-500/10" glowColor="purple" />
            </Section>

            {}
            <Section title="AI Financial Health">
              <div className="col-span-4 bg-black/40 rounded-2xl p-5 border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-2xl rounded-full group-hover:bg-blue-500/20 transition-all"></div>
                <div className="flex flex-col md:flex-row gap-6 relative z-10">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mr-3 border border-blue-500/30">
                        <PieChart size={20} className="text-blue-400" />
                      </div>
                      <div>
                         <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Health Score</p>
                         <h4 className="text-2xl font-bold text-white flex items-center">850 <span className="text-xs text-green-400 ml-2 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">Excellent</span></h4>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed mb-4">Your spending is well optimized. AI predicts you will save ₹12,000 more this month compared to last month.</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <TrendingUpIcon size={16} className="text-green-400 mr-2" />
                        <span className="text-gray-300">Investments up 12%</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <AlertTriangle size={16} className="text-[#FF9933] mr-2" />
                        <span className="text-gray-300">High expenditure on Zomato</span>
                      </div>
                    </div>
                  </div>
                  
                  {}
                  <div className="flex-1 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-xl p-4 flex flex-col justify-between">
                     <div>
                       <h5 className="text-sm font-bold text-indigo-300 flex items-center mb-2">
                         <Zap size={14} className="mr-1.5" /> AI Suggestion
                       </h5>
                       <p className="text-xs text-indigo-100">Automatically move ₹5,000 to your emergency fund based on your recent salary credit?</p>
                     </div>
                     <button className="mt-3 w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg transition-colors shadow-md">
                       Auto-Invest Now
                     </button>
                  </div>
                </div>
              </div>
            </Section>

            {}
            <Section title="Travel & Bookings">
              <ActionButton icon={Plane} label="Flights" colorClass="text-blue-400" bgClass="bg-blue-500/10" glowColor="blue" />
              <ActionButton icon={Train} label="Trains" colorClass="text-orange-400" bgClass="bg-orange-500/10" glowColor="orange" />
              <ActionButton icon={Bus} label="Bus" colorClass="text-green-400" bgClass="bg-green-500/10" glowColor="green" />
              <ActionButton icon={Home} label="Hotels" colorClass="text-purple-400" bgClass="bg-purple-500/10" glowColor="purple" />
            </Section>

            {}
            <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center text-gray-100">
                  <History size={20} className="mr-2 text-[#FF9933]" /> Recent Transactions
                </h3>
                <button className="text-sm text-[#FF9933] hover:underline">View All</button>
              </div>
              
              <div className="space-y-4">
                {transactions.map(t => (
                  <div key={t.id} className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-white/20 transition-all hover:bg-black/60 group">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 shadow-inner ${t.type === 'sent' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-[#138808]/10 text-[#4ade80] border border-[#138808]/20'}`}>
                        {t.type === 'sent' ? <ArrowUpRight size={22} /> : <ArrowDownLeft size={22} />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-200 group-hover:text-white transition-colors">{t.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{t.time}</p>
                      </div>
                    </div>
                    <span className={`font-bold text-lg tracking-tight ${t.type === 'sent' ? 'text-white' : 'text-[#4ade80]'}`}>
                      {t.type === 'sent' ? '-' : '+'}{t.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {currentFlow === 'addBank' && <AddBankView />}
      {currentFlow === 'verifyingBank' && <VerifyingBankView />}
      {currentFlow === 'setPin' && <SetPinView />}
      {currentFlow === 'actionInput' && <ActionInputView />}
      {currentFlow === 'enterPin' && <EnterPinView />}
      {currentFlow === 'success' && <SuccessView />}
      {currentFlow === 'checkBalance' && <CheckBalanceView />}

    </div>
  );
}
