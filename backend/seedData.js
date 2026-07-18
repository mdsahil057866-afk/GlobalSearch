const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const SearchData = require('./models/SearchData');
const Video = require('./models/Video');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Database already has users, skipping seed.');
      return;
    }

    console.log('Seeding dummy data...');

    
    const usersData = [
      {
        _id: new mongoose.Types.ObjectId('645be21c905b2a0012345678'),
        name: 'Bharat User',
        email: 'bharat@example.com',
        password: 'password123',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
        bio: 'Hello, I am testing Pixora!'
      },
      {
        name: 'Karan Mehra',
        email: 'karan@example.com',
        password: 'password123',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      },
      {
        name: 'Sneha Patel',
        email: 'sneha@example.com',
        password: 'password123',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      }
    ];

    const users = await User.create(usersData);
    const mainUser = users[0];
    const karan = users[1];
    const sneha = users[2];

    
    
    

    
    mainUser.connections = [karan._id, sneha._id];
    karan.connections = [mainUser._id];
    sneha.connections = [mainUser._id];
    
    await mainUser.save();
    await karan.save();
    await sneha.save();

    
    const samplePosts = [
      {
        author: karan._id,
        content: 'Just finished setting up my new workspace! 🚀 What do you guys think?',
        mediaUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80',
        mediaType: 'image',
        likes: [mainUser._id, sneha._id],
      },
      {
        author: sneha._id,
        content: 'Enjoying a beautiful sunset in Mumbai today. The weather is perfect! 🌅✨',
        mediaUrl: 'https://images.unsplash.com/photo-1506765515384-028b60a970df?w=800&q=80',
        mediaType: 'image',
        likes: [mainUser._id],
      },
      {
        author: mainUser._id,
        content: 'Excited to try out Pixora! The interface is so smooth. Hello world!',
        mediaType: 'none',
        likes: [karan._id],
      }
    ];

    
    
    
    await Post.create(samplePosts);

    // Seed Videos
    const existingVideos = await Video.countDocuments();
    if (existingVideos === 0) {
      await Video.create({
        title: 'Big Buck Bunny (Sample)',
        description: 'A classic open-source 3D animation video for testing.',
        videoUrl: '/uploads/videos/sample.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop',
        channelName: 'Test Channel',
        views: 1042,
        category: 'All',
        isShort: false,
        duration: '00:10'
      });
      console.log('Seeded 1 sample video');
    }

    console.log('Database seeded successfully! Main User ID:', mainUser._id.toString());
    
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};

module.exports = seedDatabase;
