import React, { useState, useEffect } from 'react';
import { Share2, MapPin, Clock, Info } from 'lucide-react';

const FoodWidget = ({ district }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [claimingId, setClaimingId] = useState(null);

  const fetchFood = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/food?district=${district}`);
      const data = await response.json();
      if (data.success) {
        setFoodItems(data.foodList);
      }
    } catch (error) {
      console.error('Error fetching food:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFood();
  }, [district]);

  const handleClaim = async (id) => {
    const ngoName = prompt("Enter NGO Name to claim this surplus food:");
    if (!ngoName) return;

    setClaimingId(id);
    try {
      const response = await fetch(`/api/food/claim/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ngoName })
      });
      const data = await response.json();
      
      if (data.success) {
        setFoodItems(foodItems.filter(item => item._id !== id));
        alert('Food claimed successfully by ' + ngoName);
      } else {
        alert('Failed to claim food: ' + data.message);
      }
    } catch (error) {
      console.error('Error claiming food:', error);
      alert('An error occurred while claiming.');
    } finally {
      setClaimingId(null);
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-background mb-6">
      {}
      <div className="px-4 py-4 flex justify-between items-start">
        <div>
          <h2 className="text-2xl text-foreground font-normal mb-1">Surplus Food Hub</h2>
          <span className="text-sm text-foreground/60">{district === 'All' ? 'Local Area' : district}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full hover:bg-accent text-foreground/60 transition-colors">
            <Share2 size={18} />
          </button>
        </div>
      </div>
      
      {}
      <div className="grid grid-cols-2 gap-1 px-4 mb-4">
        <div className="h-24 bg-green-500/20 rounded-l-lg flex items-center justify-center">
          <span className="text-green-700/50 font-medium text-xs">Zero Waste</span>
        </div>
        <div className="h-24 bg-blue-500/20 rounded-r-lg flex items-center justify-center">
          <span className="text-blue-700/50 font-medium text-xs">Community</span>
        </div>
      </div>

      <div className="px-4 pb-4">
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          The Surplus Food Hub connects local restaurants with excess edible food to verified NGOs in the area to minimize food waste and support the community.
        </p>

        <div className="border-t border-border pt-4">
          <h3 className="text-base font-medium mb-3 flex items-center">
            Available Listings <Info size={14} className="ml-1 text-foreground/40" />
          </h3>
          
          {isLoading ? (
            <div className="text-sm text-foreground/50 py-2">Loading local listings...</div>
          ) : foodItems.length === 0 ? (
            <div className="text-sm text-foreground/50 py-2">No surplus food reported nearby right now.</div>
          ) : (
            <div className="space-y-4">
              {foodItems.map((item) => {
                const timeLeft = Math.max(0, Math.floor((new Date(item.expiryTime) - new Date()) / (1000 * 60)));
                const hours = Math.floor(timeLeft / 60);
                const mins = timeLeft % 60;

                return (
                  <div key={item._id} className="text-sm">
                    <div className="font-medium text-primary mb-1">{item.restaurantName}</div>
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-foreground/80">{item.items}</span>
                      <span className="font-medium bg-accent px-2 rounded ml-2 whitespace-nowrap">{item.quantity}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-xs text-orange-600 font-medium">
                        <Clock size={12} className="mr-1" />
                        Expires in {hours}h {mins}m
                      </div>
                      <button 
                        onClick={() => handleClaim(item._id)}
                        disabled={claimingId === item._id}
                        className="text-primary hover:underline font-medium text-xs disabled:opacity-50"
                      >
                        {claimingId === item._id ? 'Claiming...' : 'Claim for NGO'}
                      </button>
                    </div>
                    <div className="border-b border-border mt-3"></div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-2 flex items-center text-xs text-foreground/50">
          <MapPin size={12} className="mr-1" /> Based on your location settings
        </div>
      </div>
    </div>
  );
};

export default FoodWidget;
