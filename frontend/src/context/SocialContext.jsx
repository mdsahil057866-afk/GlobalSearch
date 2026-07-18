import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const SocialContext = createContext();

export const useSocial = () => useContext(SocialContext);

export const SocialProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '645be21c905b2a0012345678', 
    name: 'Bharat User',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
    coverPhoto: 'https://images.unsplash.com/photo-1506744626753-1fa7604eb821?w=1200&q=80',
    bio: 'Hello, I am testing Pixora!',
    worksAt: 'GlobalSearch Technologies',
    studiedAt: 'Indian Institute of Technology',
    livesIn: 'Mumbai, India',
    languagePreference: 'en'
  });
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [feed, setFeed] = useState([]);
  const [activeChats, setActiveChats] = useState([]); 
  const [chatMessages, setChatMessages] = useState({}); 

  useEffect(() => {
    
    const newSocket = io(import.meta.env.VITE_BACKEND_URL || '');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket && user) {
      socket.emit('join_room', user.id);

      socket.on('new_notification', (notification) => {
        setNotifications((prev) => [notification, ...prev]);
        
      });

      socket.on('receive_message', (message) => {
        setChatMessages((prev) => {
          const senderId = message.sender;
          return {
            ...prev,
            [senderId]: [...(prev[senderId] || []), message]
          };
        });
      });
    }
  }, [socket, user]);

  const updateProfile = async (formData) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL || ''}/api/social/profile`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'x-user-id': user.id 
        }
      });
      
      setUser((prev) => ({ ...prev, ...res.data }));
      
      
      setFeed((prev) => prev.map(post => {
        if (post.author?._id === user.id || post.author?.id === user.id) {
          return { ...post, author: { ...post.author, name: res.data.name, avatar: res.data.avatar } };
        }
        return post;
      }));

    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const fetchFeed = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL || ''}/api/social/feed`, {
        headers: { 'x-user-id': user.id }
      });
      setFeed(res.data);
    } catch (error) {
      console.error('Error fetching feed:', error);
    }
  };

  const createPost = async (formData) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL || ''}/api/social/post`, formData, {
        headers: {
          'x-user-id': user.id,
          'Content-Type': 'multipart/form-data'
        }
      });
      setFeed((prev) => [res.data, ...prev]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const toggleLike = async (postId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL || ''}/api/social/post/${postId}/like`, {}, {
        headers: { 'x-user-id': user.id }
      });
      setFeed((prev) => prev.map(post => post._id === postId ? res.data : post));
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const addComment = async (postId, text) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL || ''}/api/social/post/${postId}/comment`, { text }, {
        headers: { 'x-user-id': user.id }
      });
      setFeed((prev) => prev.map(post => {
        if (post._id === postId) {
          return { ...post, comments: [...post.comments, res.data] };
        }
        return post;
      }));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL || ''}/api/social/messages/${userId}`, {
        headers: { 'x-user-id': user.id }
      });
      setChatMessages((prev) => ({
        ...prev,
        [userId]: res.data
      }));
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (recipientId, text) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL || ''}/api/social/messages`, { recipientId, text }, {
        headers: { 'x-user-id': user.id }
      });
      
      const newMsg = res.data;
      setChatMessages((prev) => ({
        ...prev,
        [recipientId]: [...(prev[recipientId] || []), newMsg]
      }));
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const openChat = (contactUser) => {
    if (!activeChats.find(c => c.id === contactUser.id)) {
      setActiveChats([...activeChats, contactUser]);
      fetchMessages(contactUser.id);
    }
  };

  const closeChat = (userId) => {
    setActiveChats(activeChats.filter(c => c.id !== userId));
  };

  return (
    <SocialContext.Provider value={{ 
      user, setUser, socket, notifications, feed, 
      fetchFeed, createPost, toggleLike, addComment, updateProfile,
      activeChats, chatMessages, fetchMessages, sendMessage, openChat, closeChat
    }}>
      {children}
    </SocialContext.Provider>
  );
};
