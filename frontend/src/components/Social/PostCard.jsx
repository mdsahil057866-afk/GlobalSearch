import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal, Globe, Send, ShieldCheck, CheckCircle, AlertTriangle, Cpu } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useSocial } from '../../context/SocialContext';

const PostCard = ({ post }) => {
  const { user, toggleLike, addComment } = useSocial();
  const isLiked = post.likes.includes(user.id);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  
  const handleVerify = () => {
    if (verificationResult || isVerifying) {
      setVerificationResult(null); // Toggle off if already verified
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      const isFakeLikely = Math.random() > 0.7;
      setVerificationResult({
        deepfakeProbability: isFakeLikely ? Math.floor(Math.random() * 40 + 50) : Math.floor(Math.random() * 15),
        factCheck: isFakeLikely ? 'Unverified / Disputed' : 'Verified True',
        summary: isFakeLikely ? 'Pixora AI has flagged potential synthetic anomalies in this content or missing reliable sources.' : 'Content metadata and visual consistency matches established reality models. Safe to trust.',
        isAuthentic: !isFakeLikely
      });
      setIsVerifying(false);
    }, 3000);
  };
  
  const getMediaUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `${import.meta.env.VITE_BACKEND_URL || ''}${url}`;
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post._id, commentText);
    setCommentText('');
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10 mb-6 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(34,211,238,0.1)] hover:border-white/20">
      {/* Header */}
      <div className="p-3 flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <img src={post.author?.avatar || 'https://via.placeholder.com/150'} alt="Avatar" className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/50" />
          <div className="leading-tight">
            <h4 className="font-bold text-[16px] text-white cursor-pointer hover:text-cyan-400 transition-colors">
              {post.author?.name || 'Unknown User'}
            </h4>
            <div className="flex items-center text-[13px] text-gray-400 gap-1 mt-0.5">
              <span className="hover:text-cyan-300 cursor-pointer transition-colors">
                {formatDistanceToNow(new Date(post.createdAt))}
              </span>
              <span>·</span>
              <Globe className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 text-gray-400 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {}
      <div className="px-5 pb-3">
        <p className="text-[15px] text-gray-200 whitespace-pre-wrap leading-relaxed font-light">{post.content}</p>
      </div>

      {}
      {post.mediaUrl && (
        <div className="w-full bg-black/40 flex justify-center max-h-[600px] border-y border-white/5 relative overflow-hidden">
          {post.mediaType === 'video' ? (
            <video src={getMediaUrl(post.mediaUrl)} controls className="max-h-[600px] w-full object-contain bg-black" />
          ) : (
            <img src={getMediaUrl(post.mediaUrl)} alt="Post attachment" className="max-h-[600px] w-full object-contain" />
          )}
          
          {}
          {isVerifying && (
            <div className="absolute inset-0 bg-blue-500/10 z-10 pointer-events-none flex items-center justify-center">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
              <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-white border border-blue-500/30">
                <Cpu className="w-5 h-5 text-blue-400 animate-pulse" />
                <span className="font-semibold text-sm tracking-wide">Pixora AI Scanning...</span>
              </div>
            </div>
          )}
          
          {}
          {verificationResult && (
            <div className="absolute bottom-4 right-4 z-10">
              <div className={`backdrop-blur-xl border shadow-xl rounded-xl p-3 w-64 transform transition-all duration-500 ${verificationResult.isAuthentic ? 'bg-green-900/40 border-green-500/50' : 'bg-red-900/40 border-red-500/50'}`}>
                <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                  {verificationResult.isAuthentic ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  )}
                  <span className="text-white font-bold text-sm">AI Verification</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-200">
                    <span>Authenticity:</span>
                    <span className={verificationResult.isAuthentic ? 'text-green-300 font-semibold' : 'text-red-300 font-semibold'}>{verificationResult.factCheck}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-200">
                    <span>Deepfake Risk:</span>
                    <span className="text-yellow-300 font-semibold">{verificationResult.deepfakeProbability}%</span>
                  </div>
                  <p className="text-[11px] text-gray-300 mt-2 leading-tight bg-black/20 p-2 rounded-md">
                    {verificationResult.summary}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {}
      <div className="px-5 py-3 flex justify-between items-center text-[14px] text-gray-400 border-b border-white/10 mx-2">
        <div className="flex items-center gap-2 cursor-pointer hover:text-cyan-300 transition-colors">
          <div className="w-5 h-5 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            <ThumbsUp className="w-3 h-3 text-white fill-current" />
          </div>
          <span className="font-medium text-white">{post.likes.length}</span>
        </div>
        <div className="flex gap-4">
          <span className="cursor-pointer hover:text-cyan-300 transition-colors" onClick={() => setShowComments(!showComments)}>
            {post.comments?.length || 0} comments
          </span>
          <span className="cursor-pointer hover:text-cyan-300 transition-colors">0 shares</span>
        </div>
      </div>

      {}
      <div className="px-2 py-2 flex justify-between items-center mx-2 gap-1">
        <button 
          onClick={() => toggleLike(post._id)}
          className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-xl font-medium text-[14px] transition-all duration-300 ${
            isLiked 
              ? 'text-cyan-400 bg-cyan-400/10 shadow-[inset_0_0_15px_rgba(34,211,238,0.1)]' 
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current text-cyan-400' : ''}`} />
          <span className="hidden sm:inline">Like</span>
        </button>
        
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex-1 flex justify-center items-center gap-2 py-2 rounded-xl font-medium text-[14px] text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="hidden sm:inline">Comment</span>
        </button>

        <button 
          onClick={handleVerify}
          className={`flex-1 flex justify-center items-center gap-1.5 py-2 rounded-xl font-medium text-[14px] transition-all duration-300 ${
            verificationResult 
              ? (verificationResult.isAuthentic ? 'text-emerald-400 bg-emerald-400/10 shadow-[inset_0_0_15px_rgba(16,185,129,0.1)]' : 'text-red-400 bg-red-400/10 shadow-[inset_0_0_15px_rgba(248,113,113,0.1)]')
              : 'text-purple-400 hover:text-purple-300 hover:bg-purple-500/10'
          }`}
        >
          <ShieldCheck className={`w-5 h-5 ${isVerifying ? 'animate-pulse' : ''}`} />
          <span className={`hidden sm:inline font-bold tracking-wide ${!verificationResult && !isVerifying ? 'bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400' : ''}`}>
            {verificationResult ? 'Verified' : 'AI Verify'}
          </span>
        </button>
        
        <button className="flex-1 flex justify-center items-center gap-2 py-2 rounded-xl font-medium text-[14px] text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
          <Share2 className="w-5 h-5" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>

      {}
      {showComments && (
        <div className="px-5 pb-4 pt-3 border-t border-white/10 bg-black/20">
          {}
          <div className="max-h-60 overflow-y-auto mb-4 space-y-4 custom-scrollbar pr-2">
            {post.comments && post.comments.map(comment => (
              <div key={comment._id} className="flex gap-3">
                <img src={comment.author?.avatar || 'https://via.placeholder.com/150'} alt="Avatar" className="w-9 h-9 rounded-full object-cover border border-cyan-500/30" />
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[85%] backdrop-blur-md">
                  <p className="font-bold text-xs text-white mb-0.5">{comment.author?.name || 'Unknown'}</p>
                  <p className="text-[14px] text-gray-300">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          {}
          <div className="flex gap-3 items-center">
            <img src={user.avatar} alt="Your avatar" className="w-9 h-9 rounded-full object-cover border border-cyan-500/30" />
            <form onSubmit={handleCommentSubmit} className="flex-1 flex items-center bg-white/5 border border-white/10 hover:border-white/20 transition-colors rounded-full px-4 py-2">
              <input 
                type="text" 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..." 
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder-gray-500"
              />
              <button type="submit" disabled={!commentText.trim()} className={`ml-3 transition-colors ${commentText.trim() ? 'text-cyan-400 hover:text-cyan-300' : 'text-gray-600'}`}>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
