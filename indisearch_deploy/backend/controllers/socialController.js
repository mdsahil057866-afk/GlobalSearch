const User = require('../models/User');
const Post = require('../models/Post');
const Notification = require('../models/Notification');
const Comment = require('../models/Comment');




exports.getFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const connectionIds = user.connections;
    
    const posts = await Post.find({
      author: { $in: [...connectionIds, req.user.id] }
    })
      .sort({ createdAt: -1 })
      .populate('author', 'name avatar')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'name avatar' }
      })
      .limit(20);

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feed' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { content, mediaType, languageTags } = req.body;
    let mediaUrl = '';
    if (req.file) {
      // Logic for saving file path if using local multer or s3
      mediaUrl = `/uploads/${req.file.filename}`;
    }

    const post = new Post({
      author: req.user.id,
      content,
      mediaUrl,
      mediaType: mediaType || 'none',
      languageTags: languageTags ? JSON.parse(languageTags) : ['en']
    });

    await post.save();
    
    
    await post.populate('author', 'name avatar');
    
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const { name, bio, worksAt, studiedAt, livesIn } = req.body;
    let updates = {};
    if (name) updates.name = name;
    if (bio !== undefined) updates.bio = bio; 
    if (worksAt !== undefined) updates.worksAt = worksAt;
    if (studiedAt !== undefined) updates.studiedAt = studiedAt;
    if (livesIn !== undefined) updates.livesIn = livesIn;

    if (req.files) {
      if (req.files['avatar'] && req.files['avatar'][0]) {
        updates.avatar = `/uploads/${req.files['avatar'][0].filename}`;
      }
      if (req.files['coverPhoto'] && req.files['coverPhoto'][0]) {
        updates.coverPhoto = `/uploads/${req.files['coverPhoto'][0].filename}`;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, select: '-password' } 
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      avatar: updatedUser.avatar,
      coverPhoto: updatedUser.coverPhoto,
      bio: updatedUser.bio,
      worksAt: updatedUser.worksAt,
      studiedAt: updatedUser.studiedAt,
      livesIn: updatedUser.livesIn,
      languagePreference: updatedUser.languagePreference
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const userId = req.user.id;
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
      
      if (post.author.toString() !== userId) {
         const notification = new Notification({
           recipient: post.author,
           sender: userId,
           type: 'like',
           relatedPost: post._id
         });
         await notification.save();
         
         if(req.io) {
             req.io.to(post.author.toString()).emit('new_notification', notification);
         }
      }
    }
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle like' });
  }
};

exports.sendFriendRequest = async (req, res) => {
  try {
    const { recipientId } = req.body;
    const recipient = await User.findById(recipientId);
    if (!recipient) return res.status(404).json({ error: 'User not found' });

    if (!recipient.friendRequests.includes(req.user.id) && !recipient.connections.includes(req.user.id)) {
      recipient.friendRequests.push(req.user.id);
      await recipient.save();

      const notification = new Notification({
        recipient: recipientId,
        sender: req.user.id,
        type: 'friend_request'
      });
      await notification.save();

      if(req.io) {
          req.io.to(recipientId).emit('new_notification', notification);
      }
    }
    res.json({ message: 'Friend request sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send friend request' });
  }
};

exports.acceptFriendRequest = async (req, res) => {
    try {
      const { senderId } = req.body;
      const user = await User.findById(req.user.id);
      const sender = await User.findById(senderId);
  
      if (user.friendRequests.includes(senderId)) {
        user.friendRequests.pull(senderId);
        user.connections.push(senderId);
        sender.connections.push(req.user.id);
        
        await user.save();
        await sender.save();
  
        const notification = new Notification({
          recipient: senderId,
          sender: req.user.id,
          type: 'friend_accept'
        });
        await notification.save();
  
        if(req.io) {
            req.io.to(senderId).emit('new_notification', notification);
        }
      }
      res.json({ message: 'Friend request accepted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to accept friend request' });
    }
};

exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const comment = new Comment({
      post: postId,
      author: req.user.id,
      text
    });

    await comment.save();
    
    
    post.comments.push(comment._id);
    await post.save();

    await comment.populate('author', 'name avatar');

    
    if (post.author.toString() !== req.user.id) {
       const notification = new Notification({
         recipient: post.author,
         sender: req.user.id,
         type: 'comment',
         relatedPost: post._id
       });
       await notification.save();
       if(req.io) {
           req.io.to(post.author.toString()).emit('new_notification', notification);
       }
    }

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;
    
    const messages = await Message.find({
      $or: [
        { sender: currentUserId, recipient: userId },
        { sender: userId, recipient: currentUserId }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { recipientId, text } = req.body;
    const currentUserId = req.user.id;

    const message = new Message({
      sender: currentUserId,
      recipient: recipientId,
      text
    });

    await message.save();

    
    if(req.io) {
      req.io.to(recipientId).emit('receive_message', message);
    }

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('connections', 'name avatar');
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Format contacts for QuickChat
    const contacts = user.connections.map(conn => ({
      id: conn._id,
      name: conn.name,
      avatar: conn.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
      time: 'Recently',
      lastMsg: 'Tap to chat',
      unread: 0,
      activeStatus: 'Active now'
    }));
    
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

exports.addContact = async (req, res) => {
  try {
    const { identifier } = req.body;
    const currentUserId = req.user.id;

    if (!identifier) {
      return res.status(400).json({ error: 'Please provide a name or email to search.' });
    }

    // Search by email (exact) or name (case-insensitive)
    const targetUser = await User.findOne({
      $or: [
        { email: identifier },
        { name: new RegExp(`^${identifier}$`, 'i') }
      ]
    });

    if (!targetUser) {
      return res.status(404).json({ error: 'User not found. Check the name or email.' });
    }

    if (targetUser._id.toString() === currentUserId) {
      return res.status(400).json({ error: 'You cannot add yourself as a contact.' });
    }

    const currentUser = await User.findById(currentUserId);
    
    if (currentUser.connections.includes(targetUser._id)) {
      return res.status(400).json({ error: 'User is already in your contacts.' });
    }

    // Add mutually
    currentUser.connections.push(targetUser._id);
    targetUser.connections.push(currentUser._id);

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({
      message: 'Contact added successfully',
      contact: {
        id: targetUser._id,
        name: targetUser.name,
        avatar: targetUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
        time: 'Just now',
        lastMsg: 'Say hi to your new contact!',
        unread: 0,
        activeStatus: 'Active now'
      }
    });

  } catch (error) {
    console.error('Error adding contact:', error);
    res.status(500).json({ error: 'Failed to add contact.' });
  }
};
