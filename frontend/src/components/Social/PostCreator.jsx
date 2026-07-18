import React, { useState } from 'react';
import { useSocial } from '../../context/SocialContext';
import { Image, Video, Send } from 'lucide-react';

const PostCreator = () => {
  const { user, createPost } = useSocial();
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() && !media) return;

    const formData = new FormData();
    formData.append('content', content);
    if (media) {
      formData.append('media', media);
      formData.append('mediaType', media.type.startsWith('video') ? 'video' : 'image');
    }
    formData.append('languageTags', JSON.stringify([user.languagePreference]));

    createPost(formData);
    setContent('');
    setMedia(null);
    setMediaPreview(null);
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 p-5 mb-6">
      <div className="flex gap-3 mb-4">
        <img src={user.avatar || 'https://via.placeholder.com/150'} alt="Avatar" className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/50" />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`What's on your mind, ${user.name?.split(' ')[0]}?`}
          className="flex-1 bg-white/5 hover:bg-white/10 focus:bg-white/15 border border-white/5 focus:border-white/20 text-white placeholder-gray-400 rounded-full px-5 py-2.5 outline-none transition-all"
        />
      </div>

      {mediaPreview && (
        <div className="relative mb-4 rounded-xl overflow-hidden border border-white/10 shadow-lg">
          {media?.type.startsWith('video') ? (
            <video src={mediaPreview} controls className="w-full max-h-[400px] object-cover bg-black" />
          ) : (
            <img src={mediaPreview} alt="Preview" className="w-full max-h-[400px] object-cover bg-black/50" />
          )}
          <button 
            onClick={() => { setMedia(null); setMediaPreview(null); }}
            className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors border border-white/20"
          >
            ✕
          </button>
        </div>
      )}

      <div className="border-t border-white/10 pt-4 flex items-center justify-between">
        <div className="flex flex-1 gap-2">
          <label onClick={() => alert('Live Video feature is coming soon!')} className="flex-1 flex items-center justify-center gap-2 py-2.5 hover:bg-white/10 rounded-xl cursor-pointer text-sm font-semibold text-gray-300 transition-colors">
            <Video className="w-6 h-6 text-[#F3425F]" fill="currentColor" />
            <span>Live video</span>
          </label>
          <label className="flex-1 flex items-center justify-center gap-2 py-2.5 hover:bg-white/10 rounded-xl cursor-pointer text-sm font-semibold text-gray-300 transition-colors">
            <Image className="w-6 h-6 text-[#45BD62]" fill="currentColor" />
            <span>Photo/video</span>
            <input type="file" accept="image/*,video/*" className="hidden" onChange={handleMediaChange} />
          </label>
        </div>
        
        {(content.trim() || media) && (
           <button 
             onClick={handleSubmit}
             className="ml-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white px-6 py-2.5 rounded-xl font-bold transition-opacity shadow-[0_0_15px_rgba(34,211,238,0.4)]"
           >
             Post
           </button>
        )}
      </div>
    </div>
  );
};

export default PostCreator;
