import React, { useState } from 'react';
import { ArrowLeft, Search, MapPin, ChevronDown, Clock, Star, Heart, ShoppingBag, Home, Compass, User, Bike, Sparkles, Plus, Flame } from 'lucide-react';

export default function CraveDrop({ onBack }) {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Pizza', icon: '🍕', color: 'from-orange-500/20 to-red-500/20', textColor: 'text-orange-500' },
    { name: 'Sushi', icon: '🍣', color: 'from-blue-500/20 to-cyan-500/20', textColor: 'text-blue-500' },
    { name: 'Burger', icon: '🍔', color: 'from-yellow-500/20 to-orange-500/20', textColor: 'text-yellow-500' },
    { name: 'Healthy', icon: '🥗', color: 'from-green-500/20 to-emerald-500/20', textColor: 'text-green-500' },
    { name: 'Dessert', icon: '🍰', color: 'from-pink-500/20 to-rose-500/20', textColor: 'text-pink-500' },
    { name: 'Coffee', icon: '☕', color: 'from-amber-500/20 to-orange-500/20', textColor: 'text-amber-500' },
  ];

  const featured = [
    {
      id: 1,
      name: 'Spice Symphony',
      tags: ['Indian', 'Curry', 'Spicy'],
      rating: 4.8,
      reviews: '1.2k',
      time: '25-35',
      distance: '1.2 km',
      deliveryFee: 'Free',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
      offer: '20% OFF up to ₹100'
    },
    {
      id: 2,
      name: 'The Burger Joint',
      tags: ['American', 'Fast Food'],
      rating: 4.5,
      reviews: '850',
      time: '15-25',
      distance: '2.5 km',
      deliveryFee: '₹40',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
      offer: 'Free Delivery'
    },
    {
      id: 3,
      name: 'Sushi Master',
      tags: ['Japanese', 'Seafood'],
      rating: 4.9,
      reviews: '2.1k',
      time: '35-45',
      distance: '4.0 km',
      deliveryFee: '₹60',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
      offer: 'Flat ₹150 OFF'
    },
    {
      id: 4,
      name: 'Green Bowl Salad',
      tags: ['Healthy', 'Vegan'],
      rating: 4.6,
      reviews: '520',
      time: '20-30',
      distance: '1.8 km',
      deliveryFee: '₹30',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
      offer: 'Buy 1 Get 1'
    }
  ];

  return (
    <div className="fixed inset-0 bg-[#0f0f11] text-white overflow-hidden flex flex-col font-sans z-[100] animate-in fade-in duration-500">
      
      {/* Background Ambient Effects */}
      <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-orange-600/20 via-orange-900/5 to-transparent pointer-events-none"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* Header */}
      <header className="px-6 py-4 flex flex-col z-20 shrink-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button onClick={onBack} className="p-2 mr-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <p className="text-xs text-orange-400 font-bold uppercase tracking-wider flex items-center mb-1">
                <MapPin className="w-3 h-3 mr-1" /> Delivering To
              </p>
              <div className="flex items-center cursor-pointer group">
                <h1 className="text-xl font-bold text-white group-hover:text-gray-200 transition-colors">Home - 402, Skyline Apts</h1>
                <ChevronDown className="w-5 h-5 ml-1 text-gray-400 group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>
          
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500/30 p-0.5">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="Profile" className="w-full h-full rounded-full object-cover" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all text-lg backdrop-blur-xl shadow-lg"
            placeholder="Search for restaurants, dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <button className="p-2 bg-orange-500 rounded-xl text-white hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30">
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 relative z-10 hide-scrollbar px-6">
        
        {/* Banner */}
        <div className="mt-2 mb-8 relative rounded-3xl overflow-hidden cursor-pointer group shadow-[0_0_30px_-5px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_-5px_rgba(249,115,22,0.5)] transition-all">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80" alt="Promo" className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 p-6 flex flex-col justify-center">
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-full w-max mb-3 flex items-center shadow-lg">
              <Flame className="w-3 h-3 mr-1" /> Trending
            </span>
            <h2 className="text-3xl font-extrabold text-white mb-2 leading-tight">Mega Craving<br/>Carnival</h2>
            <p className="text-gray-300 font-medium">Up to 60% OFF on premium dining</p>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white tracking-tight">Cravings</h3>
            <button className="text-orange-400 text-sm font-medium hover:text-orange-300">See All</button>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
            {categories.map((cat, index) => (
              <div key={index} className="flex flex-col items-center cursor-pointer group">
                <div className={`w-[72px] h-[72px] rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3 border border-white/5 group-hover:border-white/20 transition-all shadow-lg backdrop-blur-md group-hover:scale-105`}>
                  <span className="text-3xl">{cat.icon}</span>
                </div>
                <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Restaurants */}
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight mb-6">Featured Restaurants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((restaurant) => (
              <div key={restaurant.id} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden cursor-pointer group hover:bg-white/10 transition-all backdrop-blur-xl">
                <div className="relative h-48 overflow-hidden">
                  <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white flex items-center border border-white/10">
                    <Clock className="w-3.5 h-3.5 mr-1 text-orange-400" /> {restaurant.time} mins
                  </div>
                  <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/10">
                    <Heart className="w-5 h-5" />
                  </button>
                  {restaurant.offer && (
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-4 pt-12">
                      <span className="text-blue-400 font-bold text-sm bg-blue-500/20 px-2 py-1 rounded-md border border-blue-500/30">
                        {restaurant.offer}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-white truncate pr-4">{restaurant.name}</h4>
                    <div className="flex items-center bg-green-500/20 px-2 py-1 rounded-lg border border-green-500/30 shrink-0">
                      <span className="text-green-400 font-bold text-sm mr-1">{restaurant.rating}</span>
                      <Star className="w-3 h-3 text-green-400 fill-green-400" />
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 truncate">
                    {restaurant.tags.join(' • ')}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center text-gray-400 text-sm">
                      <Bike className="w-4 h-4 mr-1.5" />
                      <span>{restaurant.distance} • Delivery: <span className={restaurant.deliveryFee === 'Free' ? 'text-green-400 font-medium' : ''}>{restaurant.deliveryFee}</span></span>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 w-full bg-[#1a1a1c]/90 backdrop-blur-2xl border-t border-white/10 px-6 py-4 pb-safe z-30">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'home' ? 'text-orange-500' : 'text-gray-500 hover:text-gray-300'}`}>
            <Home className={`w-6 h-6 ${activeTab === 'home' ? 'fill-orange-500/20' : ''}`} />
            <span className="text-[10px] font-bold">Home</span>
          </button>
          <button onClick={() => setActiveTab('explore')} className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'explore' ? 'text-orange-500' : 'text-gray-500 hover:text-gray-300'}`}>
            <Compass className={`w-6 h-6 ${activeTab === 'explore' ? 'fill-orange-500/20' : ''}`} />
            <span className="text-[10px] font-bold">Explore</span>
          </button>
          <div className="relative -top-6">
            <button className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-[0_0_20px_-5px_rgba(249,115,22,0.8)] hover:scale-105 transition-transform">
              <ShoppingBag className="w-6 h-6" />
            </button>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black text-xs font-bold rounded-full flex items-center justify-center border-2 border-[#1a1a1c]">2</span>
          </div>
          <button onClick={() => setActiveTab('orders')} className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'orders' ? 'text-orange-500' : 'text-gray-500 hover:text-gray-300'}`}>
            <Clock className={`w-6 h-6 ${activeTab === 'orders' ? 'fill-orange-500/20' : ''}`} />
            <span className="text-[10px] font-bold">Orders</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'profile' ? 'text-orange-500' : 'text-gray-500 hover:text-gray-300'}`}>
            <User className={`w-6 h-6 ${activeTab === 'profile' ? 'fill-orange-500/20' : ''}`} />
            <span className="text-[10px] font-bold">Profile</span>
          </button>
        </div>
      </nav>

    </div>
  );
}
