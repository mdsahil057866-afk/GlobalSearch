import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useSocial } from '../../context/SocialContext';

const NotificationDropdown = () => {
  const { notifications } = useSocial();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications?.filter(n => !n.read)?.length || 0;

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full h-full flex items-center justify-center outline-none"
      >
        <Bell className="w-5 h-5 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-rose-600 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(244,63,94,0.8)] border border-[#0A0F1C]">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-80 bg-[#0A0F1C]/90 backdrop-blur-2xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden z-50 transform origin-top-right transition-all">
          <div className="p-4 border-b border-white/10 font-bold text-white bg-white/5 flex justify-between items-center">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-md border border-emerald-500/30">
                {unreadCount} New
              </span>
            )}
          </div>
          <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
            {!notifications || notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-400 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 border border-white/5">
                  <Bell className="w-5 h-5 text-gray-500" />
                </div>
                <p className="text-sm font-medium">No new notifications</p>
                <p className="text-xs mt-1 text-gray-500">When you get notifications, they'll show up here.</p>
              </div>
            ) : (
              notifications.map((notif, idx) => (
                <div key={idx} className={`p-4 border-b border-white/5 hover:bg-white/10 cursor-pointer transition-colors flex items-start gap-3 ${!notif.read ? 'bg-emerald-500/10' : ''}`}>
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                    <img src={notif.sender?.avatar || 'https://via.placeholder.com/40'} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 leading-tight">
                      <span className="font-semibold text-white">{notif.sender?.name || 'Someone'}</span> 
                      {notif.type === 'like' && ' liked your post.'}
                      {notif.type === 'comment' && ' commented on your post.'}
                      {notif.type === 'friend_request' && ' sent you a friend request.'}
                    </p>
                    <span className="text-xs text-gray-500 mt-1 block">Just now</span>
                  </div>
                  {!notif.read && <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] mt-2 flex-shrink-0"></div>}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
