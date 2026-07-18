import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Search, ShoppingBag, Heart, Menu, Grid, Bell, Star, Filter, Home, Compass, User, CreditCard, ChevronRight } from 'lucide-react';

export default function ShopNova({ onBack }) {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Apparel', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80' },
    { name: 'Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
    { name: 'Watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80' },
    { name: 'Gadgets', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80' },
  ];

  const products = [
    {
      id: 1,
      name: 'Sony WH-1000XM5',
      brand: 'Sony',
      price: '₹29,990',
      oldPrice: '₹34,990',
      rating: 4.9,
      reviews: 1240,
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80',
      tag: 'Sale',
      tagColor: 'bg-red-500'
    },
    {
      id: 2,
      name: 'Nike Air Max 270',
      brand: 'Nike',
      price: '₹12,495',
      oldPrice: null,
      rating: 4.7,
      reviews: 856,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      tag: 'New',
      tagColor: 'bg-blue-500'
    },
    {
      id: 3,
      name: 'MacBook Air M2',
      brand: 'Apple',
      price: '₹1,14,900',
      oldPrice: null,
      rating: 4.9,
      reviews: 3200,
      image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80',
      tag: 'Trending',
      tagColor: 'bg-purple-500'
    },
    {
      id: 4,
      name: 'Ray-Ban Wayfarer',
      brand: 'Ray-Ban',
      price: '₹8,500',
      oldPrice: '₹10,000',
      rating: 4.5,
      reviews: 420,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
      tag: 'Sale',
      tagColor: 'bg-red-500'
    }
  ];

  return (
    <div className="fixed inset-0 bg-[#f8f9fa] dark:bg-[#0f0f11] text-gray-900 dark:text-white overflow-hidden flex flex-col font-sans z-[100] animate-in fade-in duration-500">
      
      {/* Background Ambience (Dark Mode) */}
      <div className="hidden dark:block absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="hidden dark:block absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between z-20 shrink-0 bg-white/80 dark:bg-[#0f0f11]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 sticky top-0">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 mr-3 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400">
            ShopNova.
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-[#0f0f11] rounded-full"></span>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 relative z-10 hide-scrollbar">
        
        {/* Search & Filter */}
        <div className="px-6 py-4 flex items-center space-x-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full py-3.5 pl-12 pr-4 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all shadow-sm"
              placeholder="Find products, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-3.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Banner */}
        <div className="px-6 mb-8">
          <div className="relative w-full h-[220px] rounded-3xl overflow-hidden cursor-pointer shadow-xl group">
            <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80" alt="Sale Banner" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-900/50 to-transparent"></div>
            <div className="absolute inset-0 p-8 flex flex-col justify-center max-w-[70%]">
              <span className="text-purple-300 font-bold tracking-widest text-xs uppercase mb-2">Season Sale</span>
              <h2 className="text-3xl font-black text-white mb-4 leading-tight">Up to 50% Off<br/>on Electronics</h2>
              <button className="bg-white text-purple-900 font-bold px-6 py-2.5 rounded-full w-max text-sm hover:bg-gray-100 transition-colors shadow-lg">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="px-6 flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold tracking-tight">Categories</h3>
            <button className="text-purple-600 dark:text-purple-400 text-sm font-semibold flex items-center">
              See All <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="flex space-x-4 overflow-x-auto px-6 pb-4 hide-scrollbar">
            {categories.map((cat, index) => (
              <div key={index} className="flex flex-col items-center cursor-pointer group shrink-0">
                <div className="w-[80px] h-[80px] rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-purple-500 transition-all shadow-md p-1 bg-white dark:bg-[#1a1a1c]">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Products */}
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold tracking-tight">Trending Now</h3>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 transition-colors"><ArrowLeft className="w-4 h-4" /></button>
              <button className="p-2 rounded-full bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 transition-colors"><ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden cursor-pointer group hover:shadow-xl transition-all">
                <div className="relative h-48 bg-gray-100 dark:bg-black/50 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500" />
                  
                  {product.tag && (
                    <span className={`absolute top-3 left-3 ${product.tagColor} text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-md`}>
                      {product.tag}
                    </span>
                  )}
                  
                  <button className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md text-gray-600 dark:text-white hover:text-red-500 dark:hover:text-red-400 transition-colors shadow-sm">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{product.rating}</span>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                  
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{product.brand}</p>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{product.name}</h4>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-lg font-black text-gray-900 dark:text-white mr-2">{product.price}</span>
                      {product.oldPrice && (
                        <span className="text-xs font-medium text-gray-400 line-through">{product.oldPrice}</span>
                      )}
                    </div>
                    <button className="w-8 h-8 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-110 transition-transform shadow-md">
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 w-full bg-white/90 dark:bg-[#1a1a1c]/90 backdrop-blur-2xl border-t border-gray-200 dark:border-white/10 px-6 py-4 pb-safe z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-none">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'home' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}>
            <Home className={`w-6 h-6 ${activeTab === 'home' ? 'fill-purple-600/20 dark:fill-purple-400/20' : ''}`} />
            <span className="text-[10px] font-bold">Home</span>
          </button>
          <button onClick={() => setActiveTab('discover')} className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'discover' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}>
            <Compass className={`w-6 h-6 ${activeTab === 'discover' ? 'fill-purple-600/20 dark:fill-purple-400/20' : ''}`} />
            <span className="text-[10px] font-bold">Discover</span>
          </button>
          <div className="relative -top-6">
            <button className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(147,51,234,0.5)] hover:scale-105 transition-transform">
              <ShoppingBag className="w-6 h-6" />
            </button>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-[#1a1a1c]">3</span>
          </div>
          <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'wallet' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}>
            <CreditCard className={`w-6 h-6 ${activeTab === 'wallet' ? 'fill-purple-600/20 dark:fill-purple-400/20' : ''}`} />
            <span className="text-[10px] font-bold">Wallet</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'profile' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}>
            <User className={`w-6 h-6 ${activeTab === 'profile' ? 'fill-purple-600/20 dark:fill-purple-400/20' : ''}`} />
            <span className="text-[10px] font-bold">Profile</span>
          </button>
        </div>
      </nav>

    </div>
  );
}
