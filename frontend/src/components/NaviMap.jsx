import React, { useState } from 'react';
import { ArrowLeft, Navigation, MapPin, Search, Compass, Layers, Satellite, Eye, ShieldAlert } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import mapLogoImg from '../assets/navimap_logo.png';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapUpdater({ center }) {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function NaviMap({ onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [center, setCenter] = useState([28.6139, 77.2090]); // New Delhi default coordinates
  const [locationName, setLocationName] = useState('Your Location');
  const [isSearching, setIsSearching] = useState(false);
  
  const [mapLayer, setMapLayer] = useState('satellite'); 
  const [pois, setPois] = useState([]);
  const [arMode, setArMode] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setPois([]); 
    try {
      const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(searchQuery)}&limit=1`);
      const data = await response.json();
      if (data && data.features && data.features.length > 0) {
        const feature = data.features[0];
        const [lon, lat] = feature.geometry.coordinates;
        setCenter([lat, lon]);
        
        const props = feature.properties;
        const name = props.name || props.city || props.state || 'Unknown Location';
        setLocationName(name);
      } else {
        alert('Location not found');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      alert('Failed to search location');
    } finally {
      setIsSearching(false);
    }
  };

  const fetchPOIs = async (category) => {
    setIsSearching(true);
    try {
      const queryStr = locationName === 'Your Location' ? category : `${category} in ${locationName}`;
      const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(queryStr)}&lat=${center[0]}&lon=${center[1]}&limit=15`);
      const data = await response.json();
      if (data && data.features && data.features.length > 0) {
        const newPois = data.features.map((f, index) => ({
          id: f.properties.osm_id || index,
          lat: f.geometry.coordinates[1],
          lon: f.geometry.coordinates[0],
          name: f.properties.name || category,
          details: f.properties.street || f.properties.city || ''
        }));
        setPois(newPois);
      } else {
        alert(`No ${category} found in ${locationName}`);
      }
    } catch (error) {
      console.error('Error fetching POIs:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleRecenter = React.useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setCenter([lat, lon]);
        
        try {
          const res = await fetch(`https://photon.komoot.io/reverse?lon=${lon}&lat=${lat}`);
          const data = await res.json();
          if (data && data.features && data.features.length > 0) {
            const props = data.features[0].properties;
            setLocationName(props.city || props.district || props.state || props.name || 'Your Location');
          } else {
            setLocationName('Your Location');
          }
        } catch (e) {
          setLocationName('Your Location');
        }
        setPois([]);
      }, () => {
        setCenter([28.6139, 77.2090]);
        setLocationName('New Delhi');
        setPois([]);
      });
    } else {
      setCenter([28.6139, 77.2090]);
      setLocationName('New Delhi');
      setPois([]);
    }
  }, []);

  React.useEffect(() => {
    handleRecenter();
  }, [handleRecenter]);

  return (
    <div className="flex flex-col h-screen w-full bg-[#0a1128] text-white font-sans overflow-hidden relative">
      {}
      <div className="absolute inset-0 z-0">
        <MapContainer 
          center={center} 
          zoom={18} 
          maxZoom={22}
          style={{ height: '100%', width: '100%', backgroundColor: '#0a1128' }}
          zoomControl={false}
        >
          {mapLayer === 'street' && (
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap'
              maxNativeZoom={19}
              maxZoom={22}
            />
          )}
          {mapLayer === 'satellite' && (
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; Esri World Imagery'
              maxNativeZoom={17}
              maxZoom={22}
            />
          )}
          {mapLayer === 'terrain' && (
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenTopoMap'
              maxNativeZoom={17}
              maxZoom={22}
            />
          )}
          <MapUpdater center={center} />
          
          <Marker position={center}>
            <Popup>
              <strong>{locationName}</strong>
            </Popup>
          </Marker>
          
          {pois.map(poi => (
            <Marker key={poi.id} position={[poi.lat, poi.lon]}>
              <Popup>
                <strong>{poi.name}</strong><br/>
                <span className="text-xs text-gray-700">{poi.details}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        {}
        {arMode && (
          <div className="absolute inset-0 z-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-overlay"></div>
        )}
        {arMode && (
          <div className="absolute inset-0 z-10 pointer-events-none border-[8px] border-[#138808]/40 animate-pulse box-border"></div>
        )}
      </div>

      {}
      <header className="h-20 flex items-center px-6 shrink-0 z-10 bg-gradient-to-b from-[#0a1128] to-transparent pointer-events-none">
        <div className="flex items-center pointer-events-auto mr-6">
          <button onClick={onBack} className="p-3 rounded-full hover:bg-white/10 transition-colors backdrop-blur-md bg-white/5 mr-4 border border-white/10 shadow-lg">
            <ArrowLeft size={24} className="text-white" />
          </button>
          <img src={mapLogoImg} alt="NaviMap Logo" className="h-12 w-12 object-cover rounded-full drop-shadow-lg border border-white/10" />
          <span className="ml-3 font-bold text-xl tracking-tight text-white drop-shadow-md">Bharat<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] to-[#138808]">Maps</span></span>
        </div>
        
        <div className="flex-1 max-w-2xl relative shadow-2xl pointer-events-auto">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search NaviMap (e.g. Gateway of India, Taj Mahal)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-[#111827]/90 border border-white/20 rounded-full py-4 pl-12 pr-4 text-white focus:border-[#FF9933] focus:shadow-[0_0_15px_rgba(255,153,51,0.3)] outline-none transition-all backdrop-blur-xl" 
          />
          <button 
            onClick={handleSearch}
            disabled={isSearching}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-[#FF9933] to-[#138808] rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform shadow-[0_0_10px_rgba(19,136,8,0.5)] disabled:opacity-50">
            <Navigation size={18} className="rotate-45 -ml-0.5" />
          </button>
        </div>
      </header>

      {}
      <div className="absolute right-6 top-28 flex flex-col space-y-4 z-10 pointer-events-none">
        <button onClick={() => setMapLayer(mapLayer === 'terrain' ? 'street' : 'terrain')} className={`pointer-events-auto w-12 h-12 bg-[#111827]/90 border ${mapLayer === 'terrain' ? 'border-[#FF9933]' : 'border-white/20'} rounded-xl flex items-center justify-center backdrop-blur-md hover:bg-white/10 transition-colors shadow-xl`} title="Terrain Layer">
          <Layers size={22} className="text-[#FF9933]" />
        </button>
        <button onClick={() => setMapLayer(mapLayer === 'satellite' ? 'street' : 'satellite')} className={`pointer-events-auto w-12 h-12 bg-[#111827]/90 border ${mapLayer === 'satellite' ? 'border-blue-400' : 'border-white/20'} rounded-xl flex items-center justify-center backdrop-blur-md hover:bg-white/10 transition-colors shadow-xl`} title="Satellite View">
          <Satellite size={22} className="text-blue-400" />
        </button>
        <button onClick={handleRecenter} className="pointer-events-auto w-12 h-12 bg-[#111827]/90 border border-white/20 rounded-xl flex items-center justify-center backdrop-blur-md hover:bg-white/10 transition-colors shadow-xl" title="Re-center">
          <Compass size={22} className="text-[#138808]" />
        </button>
        <button onClick={() => setArMode(!arMode)} className={`pointer-events-auto w-12 h-12 bg-[#111827]/90 border ${arMode ? 'border-[#FF9933] bg-[#FF9933]/20' : 'border-white/20'} rounded-xl flex items-center justify-center backdrop-blur-md hover:bg-white/10 transition-colors shadow-xl`} title="AR Navigation Overlay">
          <Eye size={22} className={arMode ? "text-[#FF9933]" : "text-white/70"} />
        </button>
      </div>

      {}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-3xl z-10 pointer-events-none">
        <div className="bg-[#111827]/80 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl pointer-events-auto">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center">
                {locationName} 
                <span className="ml-3 px-2 py-0.5 bg-[#138808]/20 text-[#4ade80] text-xs rounded-full border border-[#138808]/50">LIVE TRAFFIC</span>
                <span className="ml-2 px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/50 flex items-center"><ShieldAlert size={12} className="mr-1" /> SAFETY: 98%</span>
              </h2>
              <p className="text-gray-400 mt-1">{arMode ? 'Augmented Reality Navigation Active' : 'Sovereign 3D Holographic View Active'}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-[#FF9933]">32°C</p>
              <p className="text-sm text-gray-400">Clear Sky</p>
            </div>
          </div>
          <div className="flex space-x-4 overflow-x-auto hide-scrollbar pb-2">
            {['Restaurants', 'EV Charging', 'Hospitals', 'Metro Stations', 'ATMs'].map((item, i) => (
              <button key={i} onClick={() => fetchPOIs(item)} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 transition-colors whitespace-nowrap">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
