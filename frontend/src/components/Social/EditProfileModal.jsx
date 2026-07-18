import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { X, Upload, Check, Camera } from 'lucide-react';

const EditProfileModal = ({ onClose }) => {
  const { user, updateProfile } = useSocial();
  const [name, setName] = useState(user.name || '');
  const [bio, setBio] = useState(user.bio || '');
  const [worksAt, setWorksAt] = useState(user.worksAt || '');
  const [studiedAt, setStudiedAt] = useState(user.studiedAt || '');
  const [livesIn, setLivesIn] = useState(user.livesIn || '');
  
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const [avatarFile, setAvatarFile] = useState(null);
  
  const [coverPreview, setCoverPreview] = useState(user.coverPhoto);
  const [coverFile, setCoverFile] = useState(null);
  
  const [isSaving, setIsSaving] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('worksAt', worksAt);
    formData.append('studiedAt', studiedAt);
    formData.append('livesIn', livesIn);
    
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }
    if (coverFile) {
      formData.append('coverPhoto', coverFile);
    }

    try {
      await updateProfile(formData);
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#242526] w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 animate-in fade-in zoom-in duration-200 my-8">
        
        {}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-[#242526] z-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Edit Profile</h2>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] flex items-center justify-center hover:bg-[#D8DADF] dark:hover:bg-[#4E4F50] transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {}
        <form onSubmit={handleSave} className="p-4 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          
          {}
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 dark:text-gray-100">Cover Photo</h3>
            <div className="relative w-full h-40 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden group">
              <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <label className="bg-white/90 text-gray-900 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 cursor-pointer shadow-lg hover:bg-white transition-colors">
                  <Camera className="w-5 h-5" />
                  Edit Cover Photo
                  <input type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
                </label>
              </div>
            </div>
          </div>

          {}
          <div className="space-y-2 flex flex-col items-center">
             <h3 className="font-bold text-gray-900 dark:text-gray-100 self-start">Profile Picture</h3>
            <div className="relative group mt-2">
              <img 
                src={avatarPreview} 
                alt="Profile Preview" 
                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-[#242526] shadow-md bg-white"
              />
              <label className="absolute bottom-0 right-0 w-10 h-10 bg-[#E4E6EB] hover:bg-[#D8DADF] dark:bg-[#3A3B3C] dark:hover:bg-[#4E4F50] rounded-full flex items-center justify-center cursor-pointer border-2 border-white dark:border-[#242526] transition-colors text-gray-800 dark:text-gray-200 shadow-lg">
                <Camera className="w-5 h-5" />
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
            </div>
          </div>

          {}
          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F0F2F5] dark:bg-[#3A3B3C] border border-transparent focus:border-blue-500 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2.5 outline-none transition-colors"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Bio</label>
              <textarea 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="2"
                className="w-full bg-[#F0F2F5] dark:bg-[#3A3B3C] border border-transparent focus:border-blue-500 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2.5 outline-none transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Works at</label>
                <input 
                  type="text" 
                  value={worksAt}
                  onChange={(e) => setWorksAt(e.target.value)}
                  className="w-full bg-[#F0F2F5] dark:bg-[#3A3B3C] border border-transparent focus:border-blue-500 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2.5 outline-none transition-colors"
                  placeholder="e.g. GlobalSearch"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Studied at</label>
                <input 
                  type="text" 
                  value={studiedAt}
                  onChange={(e) => setStudiedAt(e.target.value)}
                  className="w-full bg-[#F0F2F5] dark:bg-[#3A3B3C] border border-transparent focus:border-blue-500 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2.5 outline-none transition-colors"
                  placeholder="e.g. IIT Bombay"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Lives in</label>
                <input 
                  type="text" 
                  value={livesIn}
                  onChange={(e) => setLivesIn(e.target.value)}
                  className="w-full bg-[#F0F2F5] dark:bg-[#3A3B3C] border border-transparent focus:border-blue-500 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2.5 outline-none transition-colors"
                  placeholder="e.g. Mumbai, India"
                />
              </div>
            </div>
          </div>
          
        </form>
        
        {}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-3 bg-white dark:bg-[#242526]">
          <button 
            type="button" 
            onClick={onClose}
            className="flex-1 bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#D8DADF] dark:hover:bg-[#4E4F50] text-gray-900 dark:text-gray-100 font-semibold py-2.5 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSaving ? 'Saving...' : <><Check className="w-5 h-5" /> Save Changes</>}
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditProfileModal;
