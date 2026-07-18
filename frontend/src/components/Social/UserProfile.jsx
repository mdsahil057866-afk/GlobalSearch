import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import PostCard from './PostCard';
import PostCreator from './PostCreator';
import EditProfileModal from './EditProfileModal';
import { Camera, MapPin, Briefcase, GraduationCap, Clock } from 'lucide-react';

const UserProfile = () => {
  const { user, feed } = useSocial();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('Posts');

  
  const userPosts = feed.filter(post => 
    post.author?._id === user.id || post.author?.id === user.id
  );

  const tabs = ['Posts', 'About', 'Friends', 'Photos', 'Videos', 'Reels'];

  return (
    <div className="w-full max-w-[1000px] mx-auto pb-20">
      
      {}
      <div className="bg-white dark:bg-[#242526] shadow-sm rounded-b-xl overflow-hidden mb-6 border border-gray-200 dark:border-gray-700">
        
        {}
        <div className="relative w-full h-[350px] bg-gradient-to-r from-blue-500 to-indigo-600">
          <img 
            src={user.coverPhoto || "https://images.unsplash.com/photo-1506744626753-1fa7604eb821?w=1200&q=80"} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          <button onClick={() => setIsEditing(true)} className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/60 hover:bg-white dark:hover:bg-black text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm backdrop-blur-sm">
            <Camera className="w-5 h-5" />
            <span className="hidden sm:inline">Edit Cover Photo</span>
          </button>
        </div>

        {}
        <div className="px-8 pb-4 relative">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between -mt-10 md:-mt-20 z-10 relative gap-4">
            
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
              {}
              <div className="relative">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-40 h-40 rounded-full border-4 border-white dark:border-[#242526] object-cover bg-white dark:bg-[#242526] shadow-md"
                />
                <button 
                  onClick={() => setIsEditing(true)}
                  className="absolute bottom-2 right-2 w-10 h-10 bg-[#E4E6EB] hover:bg-[#D8DADF] dark:bg-[#3A3B3C] dark:hover:bg-[#4E4F50] rounded-full flex items-center justify-center transition-colors border-2 border-white dark:border-[#242526]"
                >
                  <Camera className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                </button>
              </div>

              {}
              <div className="text-center md:text-left mb-2 md:mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{user.name}</h1>
                <p className="text-gray-500 font-medium cursor-pointer hover:underline">1.2K Friends</p>
                {}
                <div className="flex justify-center md:justify-start -space-x-2 mt-2">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop" className="w-8 h-8 rounded-full border-2 border-white dark:border-[#242526]" alt="Friend" />
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop" className="w-8 h-8 rounded-full border-2 border-white dark:border-[#242526]" alt="Friend" />
                  <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=50&h=50&fit=crop" className="w-8 h-8 rounded-full border-2 border-white dark:border-[#242526]" alt="Friend" />
                </div>
              </div>
            </div>

            {}
            <div className="flex gap-2 mb-2 md:mb-6">
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' /%3E%3C/svg%3E" alt="Edit" className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>
          
          <div className="w-full border-b border-gray-200 dark:border-gray-700 mt-4 mb-1"></div>
          
          {}
          <div className="flex gap-1 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-semibold transition-colors whitespace-nowrap ${activeTab === tab ? 'text-blue-600 border-b-[3px] border-blue-600 rounded-b-none' : 'text-gray-500 hover:bg-[#F0F2F5] dark:hover:bg-[#3A3B3C] rounded-lg'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {}
      {activeTab === 'Posts' ? (
        <div className="flex flex-col lg:flex-row gap-4 px-4 sm:px-0">
          
          {}
          <div className="w-full lg:w-[360px] flex-shrink-0 flex flex-col gap-4">
            
            <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h2 className="text-xl font-bold mb-4">Intro</h2>
              <div className="text-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <p className="text-[15px] font-medium">{user.bio || 'Add a bio to tell people more about yourself.'}</p>
                <button onClick={() => setIsEditing(true)} className="w-full mt-3 bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#D8DADF] dark:hover:bg-[#4E4F50] text-gray-900 dark:text-gray-100 font-semibold py-1.5 rounded-lg transition-colors">
                  Edit Bio
                </button>
              </div>

              <div className="space-y-4 text-[15px] text-gray-900 dark:text-gray-100">
                {user.worksAt && (
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    <span>Works at <strong>{user.worksAt}</strong></span>
                  </div>
                )}
                {user.studiedAt && (
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-gray-400" />
                    <span>Studied at <strong>{user.studiedAt}</strong></span>
                  </div>
                )}
                {user.livesIn && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span>Lives in <strong>{user.livesIn}</strong></span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span>Joined May 2026</span>
                </div>
              </div>

              <button onClick={() => setIsEditing(true)} className="w-full mt-4 bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#D8DADF] dark:hover:bg-[#4E4F50] text-gray-900 dark:text-gray-100 font-semibold py-1.5 rounded-lg transition-colors">
                Edit Details
              </button>
            </div>

            <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-xl font-bold">Photos</h2>
                <button onClick={() => setActiveTab('Photos')} className="text-blue-600 hover:bg-[#F0F2F5] dark:hover:bg-[#3A3B3C] p-2 rounded-lg transition-colors">See All Photos</button>
              </div>
              <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden mt-3">
                <img src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=200&h=200&fit=crop" alt="Gallery" className="w-full aspect-square object-cover" />
                <img src="https://images.unsplash.com/photo-1506765515384-028b60a970df?w=200&h=200&fit=crop" alt="Gallery" className="w-full aspect-square object-cover" />
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop" alt="Gallery" className="w-full aspect-square object-cover" />
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop" alt="Gallery" className="w-full aspect-square object-cover" />
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop" alt="Gallery" className="w-full aspect-square object-cover" />
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop" alt="Gallery" className="w-full aspect-square object-cover" />
              </div>
            </div>
          </div>

          {}
          <div className="flex-1 max-w-full lg:max-w-[calc(100%-376px)]">
            <PostCreator />
            
            <div className="bg-white dark:bg-[#242526] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-3 mb-4 flex justify-between items-center">
              <h3 className="font-bold text-xl">Posts</h3>
              <button className="bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#D8DADF] dark:hover:bg-[#4E4F50] px-4 py-1.5 rounded-lg font-semibold flex items-center gap-2 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/></svg>
                Filters
              </button>
            </div>

            <div className="space-y-4">
              {userPosts.length === 0 ? (
                <div className="bg-white dark:bg-[#242526] rounded-xl p-8 text-center shadow-sm border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-500 font-medium">You haven't posted anything yet.</p>
                </div>
              ) : (
                userPosts.map(post => (
                  <PostCard key={post._id} post={post} />
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#242526] rounded-xl p-12 text-center shadow-sm border border-gray-200 dark:border-gray-700 mx-4 sm:mx-0">
          <h2 className="text-2xl font-bold mb-4 capitalize">{activeTab}</h2>
          <p className="text-gray-500 font-medium">This section is currently under development.</p>
        </div>
      )}

      {isEditing && <EditProfileModal onClose={() => setIsEditing(false)} />}
    </div>
  );
};

export default UserProfile;
