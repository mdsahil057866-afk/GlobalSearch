import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Navigation, Bike, Car, Package, Shield, Camera, IndianRupee, Zap, CheckCircle2, ChevronRight, X, User as UserIcon, Star, Info, MessageSquare, Mic } from 'lucide-react';
import ZygoLogo from './ZygoLogo';

export default function Zygo({ onBack }) {
  const [pickup, setPickup] = useState('My Current Location');
  const [dropoff, setDropoff] = useState('');
  const [rideState, setRideState] = useState('search'); // search, selecting, negotiating, searching_driver, tracking, ar_view
  
  const [selectedVehicle, setSelectedVehicle] = useState('ev_bike');
  const [womenOnly, setWomenOnly] = useState(false);
  
  const [showNegotiation, setShowNegotiation] = useState(false);
  const [proposedFare, setProposedFare] = useState('');
  const [driverCounterOffer, setDriverCounterOffer] = useState(null);

  const vehicles = [
    { id: 'bike', name: 'Zygo Bike', time: '2 min', price: 45, icon: Bike, eco: false },
    { id: 'ev_bike', name: 'Eco Bike (EV)', time: '3 min', price: 40, icon: Zap, eco: true },
    { id: 'auto', name: 'Auto', time: '5 min', price: 80, icon: Car, eco: false },
    { id: 'mini', name: 'Mini Cab', time: '7 min', price: 150, icon: Car, eco: false },
    { id: 'delivery', name: 'Package Drop', time: '10 min', price: 60, icon: Package, eco: false },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (dropoff.trim()) {
      setRideState('selecting');
    }
  };

  const handleBook = () => {
    setRideState('searching_driver');
    setTimeout(() => {
      setRideState('tracking');
    }, 3000);
  };

  const handleNegotiateSubmit = () => {
    setDriverCounterOffer(null);
    // Simulate driver counter-offer
    setTimeout(() => {
      setDriverCounterOffer(parseInt(proposedFare) + 15);
    }, 2000);
  };

  const acceptCounterOffer = () => {
    setShowNegotiation(false);
    handleBook();
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50 relative overflow-hidden font-sans">
      
      {/* Background Map Simulation */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop" 
          alt="Map" 
          className="w-full h-full object-cover filter brightness-[0.85] contrast-125 grayscale-[20%]"
        />
        {/* Map Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-gray-900/30"></div>
        
        {/* Animated Map Markers Simulation */}
        {rideState !== 'ar_view' && (
          <>
            <div className="absolute top-[40%] left-[50%] w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10 animate-pulse"></div>
            <div className="absolute top-[35%] left-[45%] w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce transition-all duration-1000" style={{ transform: 'translate(10px, 20px)' }}>
               <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            </div>
            <div className="absolute top-[45%] left-[55%] w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce transition-all duration-1000 delay-300" style={{ transform: 'translate(-20px, -10px)' }}>
               <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            </div>
          </>
        )}
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-4 pt-6 pb-4 bg-gradient-to-b from-gray-900/80 to-transparent">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 mr-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors shadow-lg">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
            <ZygoLogo className="w-6 h-6 mr-2" />
            <span className="font-bold text-white tracking-wide">Zygo</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-emerald-400 overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.3)] bg-white">
          <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative z-20 flex-1 flex flex-col justify-end pointer-events-none">
        
        {rideState === 'search' && (
          <div className="bg-white rounded-t-[2rem] p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] pointer-events-auto transition-transform duration-500 transform translate-y-0 w-full max-w-lg mx-auto">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 tracking-tight">Where to?</h2>
            
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative flex items-center">
                <div className="absolute left-4 w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="absolute left-[21px] top-8 bottom-[-16px] w-0.5 bg-gray-200"></div>
                <input 
                  type="text" 
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full bg-gray-100 border border-transparent focus:bg-white focus:border-blue-500 rounded-xl py-3.5 pl-12 pr-4 text-gray-800 font-medium outline-none transition-all"
                />
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-4 w-3 h-3 bg-emerald-500 rounded-sm"></div>
                <input 
                  type="text" 
                  placeholder="Enter destination"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  autoFocus
                  className="w-full bg-gray-100 border border-transparent focus:bg-white focus:border-emerald-500 rounded-xl py-3.5 pl-12 pr-4 text-gray-800 font-medium outline-none transition-all shadow-sm"
                />
              </div>
              
              <div className="flex space-x-3 pt-2">
                <button type="button" className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors">
                  <MapPin size={16} className="mr-2 text-gray-500" /> Home
                </button>
                <button type="button" className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors">
                  <MapPin size={16} className="mr-2 text-gray-500" /> Work
                </button>
              </div>

              <button 
                type="submit" 
                disabled={!dropoff.trim()}
                className={`w-full py-4 rounded-xl font-bold text-white mt-4 transition-all ${dropoff.trim() ? 'bg-black hover:bg-gray-800 shadow-xl' : 'bg-gray-300'}`}
              >
                Find Rides
              </button>
            </form>
          </div>
        )}

        {rideState === 'selecting' && (
          <div className="bg-white rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] pointer-events-auto flex flex-col max-h-[85vh] w-full max-w-lg mx-auto">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0">
              <button onClick={() => setRideState('search')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft size={20} className="text-gray-800" />
              </button>
              <div className="text-center flex-1">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dropoff</div>
                <div className="font-semibold text-gray-800 truncate px-4">{dropoff}</div>
              </div>
              <div className="w-10"></div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar">
              {/* Women Only Toggle */}
              <div className="bg-pink-50 border border-pink-100 rounded-xl p-3 flex items-center justify-between mb-4">
                <div className="flex items-center text-pink-700">
                  <Shield size={20} className="mr-3" />
                  <div>
                    <div className="font-bold text-sm">Women-Only Safe Mode</div>
                    <div className="text-xs opacity-80">Strictly female drivers only</div>
                  </div>
                </div>
                <button 
                  onClick={() => setWomenOnly(!womenOnly)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${womenOnly ? 'bg-pink-500' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${womenOnly ? 'translate-x-6' : ''}`}></div>
                </button>
              </div>

              {vehicles.map(v => (
                <div 
                  key={v.id} 
                  onClick={() => setSelectedVehicle(v.id)}
                  className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center ${selectedVehicle === v.id ? 'border-emerald-500 bg-emerald-50/50 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mr-4 ${v.eco ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}>
                    <v.icon size={28} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center font-bold text-lg text-gray-800">
                      {v.name}
                      {v.eco && <span className="ml-2 px-2 py-0.5 bg-emerald-500 text-white text-[10px] uppercase tracking-wider rounded-full flex items-center"><Zap size={10} className="mr-1"/> Eco</span>}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center mt-0.5">
                      {v.time} away • {womenOnly ? 'Female Driver' : 'Any Driver'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-xl text-gray-900 flex items-center justify-end">
                      <IndianRupee size={18} className="mr-0.5" />{v.price}
                    </div>
                    {v.eco && <div className="text-xs text-emerald-600 font-medium">+10 Zygo Tokens</div>}
                  </div>
                  
                  {selectedVehicle === v.id && (
                    <div className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-1 shadow-md">
                      <CheckCircle2 size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border-t border-gray-100 shrink-0 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowNegotiation(true)}
                  className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors text-sm flex items-center justify-center"
                >
                  <IndianRupee size={16} className="mr-1" /> Offer Fare
                </button>
                <button 
                  onClick={handleBook}
                  className="flex-[2] py-4 bg-black hover:bg-gray-800 text-white font-bold rounded-xl transition-all shadow-xl flex items-center justify-center text-lg"
                >
                  Book {vehicles.find(v => v.id === selectedVehicle)?.name}
                  <ChevronRight size={20} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Negotiation Modal Overlay */}
        {showNegotiation && (
          <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end justify-center pointer-events-auto">
            <div className="bg-white w-full max-w-lg rounded-t-[2rem] p-6 animate-in slide-in-from-bottom">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Propose Your Fare</h3>
                <button onClick={() => setShowNegotiation(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                  <X size={20} />
                </button>
              </div>
              
              <div className="text-center mb-8">
                <div className="text-sm text-gray-500 mb-2">Recommended Fare</div>
                <div className="text-3xl font-extrabold text-gray-900 flex items-center justify-center">
                  <IndianRupee size={28} /> {vehicles.find(v => v.id === selectedVehicle)?.price}
                </div>
              </div>

              {!driverCounterOffer ? (
                <>
                  <div className="relative mb-6">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                      <IndianRupee size={24} />
                    </div>
                    <input 
                      type="number" 
                      placeholder="Enter your offer"
                      value={proposedFare}
                      onChange={(e) => setProposedFare(e.target.value)}
                      className="w-full text-center text-3xl font-bold bg-gray-50 border-2 border-gray-200 focus:border-emerald-500 rounded-2xl py-6 outline-none transition-colors"
                    />
                  </div>
                  <button 
                    onClick={handleNegotiateSubmit}
                    disabled={!proposedFare}
                    className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all ${proposedFare ? 'bg-emerald-500 hover:bg-emerald-600 shadow-lg' : 'bg-gray-300'}`}
                  >
                    Send Offer to Drivers
                  </button>
                </>
              ) : (
                <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 text-center animate-in zoom-in">
                  <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 shadow-md flex items-center justify-center overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" alt="Driver" className="w-full h-full object-cover" />
                  </div>
                  <div className="font-bold text-lg text-gray-800">Rahul M. countered your offer!</div>
                  <div className="flex items-center justify-center text-orange-600 font-extrabold text-4xl my-4">
                    <IndianRupee size={32} /> {driverCounterOffer}
                  </div>
                  <div className="flex space-x-3 mt-6">
                    <button onClick={() => setDriverCounterOffer(null)} className="flex-1 py-3 bg-white text-gray-800 font-bold border-2 border-gray-200 rounded-xl hover:bg-gray-50">
                      Decline
                    </button>
                    <button onClick={acceptCounterOffer} className="flex-[2] py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg">
                      Accept & Book
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {rideState === 'searching_driver' && (
          <div className="bg-white rounded-t-[2rem] shadow-2xl p-8 pointer-events-auto text-center w-full max-w-lg mx-auto">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Navigation size={32} className="text-emerald-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Finding your captain...</h2>
            <p className="text-gray-500">Contacting nearby drivers for your {vehicles.find(v => v.id === selectedVehicle)?.name}</p>
          </div>
        )}

        {rideState === 'tracking' && (
          <div className="bg-white rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] pointer-events-auto p-6 w-full max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Arriving in 3 mins</h2>
                <p className="text-gray-500 font-medium">MH 12 AB 3456 • White Honda Activa</p>
              </div>
              <div className="bg-gray-100 rounded-lg px-3 py-1 text-center border border-gray-200">
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-0.5">PIN</div>
                <div className="text-xl font-extrabold text-black tracking-widest">4821</div>
              </div>
            </div>

            <div className="flex items-center bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
              <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 shadow-sm border-2 border-white">
                <img src={womenOnly ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" : "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"} alt="Driver" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg text-gray-800">{womenOnly ? 'Priya S.' : 'Rahul M.'}</div>
                <div className="flex items-center text-sm text-gray-600 font-medium">
                  4.9 <Star size={14} className="mx-1 text-yellow-500 fill-yellow-500" /> • 1,200 rides
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="w-10 h-10 bg-white shadow-sm border border-gray-200 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
                  <MessageSquare size={18} />
                </button>
                <button className="w-10 h-10 bg-green-100 shadow-sm border border-green-200 rounded-full flex items-center justify-center text-green-700 hover:bg-green-200 transition-colors">
                  <Mic size={18} />
                </button>
              </div>
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={() => setRideState('ar_view')}
                className="flex-[2] py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center text-lg"
              >
                <Camera size={20} className="mr-2" /> AR Pickup Radar
              </button>
              <button 
                onClick={() => {
                  setRideState('search');
                  setDropoff('');
                }}
                className="flex-1 py-4 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition-colors text-sm border border-red-100">
                Cancel
              </button>
            </div>
          </div>
        )}

      </div>

      {/* AR View Fullscreen Overlay */}
      {rideState === 'ar_view' && (
        <div className="absolute inset-0 z-50 bg-black flex flex-col pointer-events-auto">
          {/* Simulated Camera Feed */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1512101918386-3023e387dfcb?q=80&w=1000&auto=format&fit=crop" 
              alt="Camera Feed" 
              className="w-full h-full object-cover filter brightness-75"
            />
            {/* AR Elements Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            
            {/* AR Target Box */}
            <div className="absolute top-[40%] left-[30%] w-[120px] h-[120px] border-2 border-emerald-400 bg-emerald-500/10 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.5)] animate-pulse flex items-center justify-center">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap flex items-center">
                <Bike size={14} className="mr-1" /> Rahul is here (15m)
              </div>
              <div className="w-4 h-4 border-t-2 border-l-2 border-emerald-400 absolute top-0 left-0"></div>
              <div className="w-4 h-4 border-t-2 border-r-2 border-emerald-400 absolute top-0 right-0"></div>
              <div className="w-4 h-4 border-b-2 border-l-2 border-emerald-400 absolute bottom-0 left-0"></div>
              <div className="w-4 h-4 border-b-2 border-r-2 border-emerald-400 absolute bottom-0 right-0"></div>
            </div>
            
            {/* HUD Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/20 rounded-full flex items-center justify-center pointer-events-none">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            </div>
          </div>

          <div className="relative z-10 p-6 flex justify-between items-start">
            <button onClick={() => setRideState('tracking')} className="p-3 bg-black/50 backdrop-blur-md rounded-full text-white border border-white/20">
              <X size={24} />
            </button>
            <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center text-emerald-400 font-mono text-sm">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mr-2"></div>
              SCANNING ENVIRONMENT
            </div>
          </div>

          <div className="mt-auto relative z-10 p-6">
            <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-2 tracking-wide">AR Radar Active</h3>
              <p className="text-gray-300 text-sm mb-6">Point your camera around to spot your captain through the crowd.</p>
              <div className="flex items-center justify-center space-x-2 text-emerald-400 font-bold bg-emerald-500/20 py-3 rounded-xl border border-emerald-500/30">
                <Navigation size={18} />
                <span>Turn Left • 15 meters</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
