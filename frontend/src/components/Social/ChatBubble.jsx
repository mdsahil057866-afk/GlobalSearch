import React, { useState, useEffect, useRef } from 'react';
import { useSocial } from '../../context/SocialContext';
import { X, Send, Image as ImageIcon, Smile, Phone, Video } from 'lucide-react';

const ChatBubble = ({ contact }) => {
  const { user, closeChat, chatMessages, sendMessage } = useSocial();
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);

  const messages = chatMessages[contact.id] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(contact.id, text);
    setText('');
  };

  return (
    <div className="w-[330px] h-[450px] bg-white dark:bg-[#242526] rounded-t-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col pointer-events-auto">
      
      {/* Chat Header */}
      <div className="h-12 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#3A3B3C] rounded-t-xl transition-colors">
        <div className="flex items-center gap-2">
          <div className="relative">
            <img src={contact.img || 'https://via.placeholder.com/150'} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-[#242526]"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 leading-tight">{contact.name}</span>
            <span className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">Active Now</span>
          </div>
        </div>
        <div className="flex items-center text-blue-600 dark:text-blue-400 gap-1">
          <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"><Phone className="w-4 h-4" /></button>
          <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"><Video className="w-4 h-4" /></button>
          <button onClick={() => closeChat(contact.id)} className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors text-gray-500"><X className="w-4 h-4" /></button>
        </div>
      </div>

      {}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 custom-scrollbar bg-white dark:bg-[#242526]">
        {messages.length === 0 ? (
           <div className="text-center text-xs text-gray-400 mt-10">
             <img src={contact.img || 'https://via.placeholder.com/150'} alt="" className="w-16 h-16 rounded-full mx-auto mb-2" />
             <p className="font-semibold text-gray-900 dark:text-gray-100">{contact.name}</p>
             <p>You are now connected on Pixora.</p>
           </div>
        ) : (
          messages.map((msg, idx) => {
            const isMe = msg.sender === user.id;
            return (
              <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-full`}>
                <div className={`px-3 py-2 text-[15px] rounded-2xl max-w-[75%] break-words ${isMe ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-[#E4E6EB] dark:bg-[#3A3B3C] text-gray-900 dark:text-gray-100 rounded-bl-sm'}`}>
                  {msg.text}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {}
      <div className="p-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#242526]">
        <div className="flex items-center gap-1">
          <button className="p-1.5 text-blue-600 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] rounded-full transition-colors">
            <ImageIcon className="w-5 h-5" />
          </button>
          <form onSubmit={handleSend} className="flex-1 flex items-center bg-[#F0F2F5] dark:bg-[#3A3B3C] rounded-full px-3 py-1.5">
            <input 
              type="text" 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Aa" 
              className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 outline-none"
            />
            <button type="button" className="text-blue-600">
              <Smile className="w-5 h-5" />
            </button>
          </form>
          <button onClick={handleSend} disabled={!text.trim()} className={`p-1.5 rounded-full transition-colors ${text.trim() ? 'text-blue-600 hover:bg-gray-100 dark:hover:bg-[#3A3B3C]' : 'text-gray-400'}`}>
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default ChatBubble;
