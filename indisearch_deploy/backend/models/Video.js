const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String, default: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop' },
  channel: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  channelName: { type: String, default: 'Unknown Channel' },
  channelAvatar: { type: String, default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' },
  views: { type: Number, default: 0 },
  category: { type: String, default: 'All' },
  isLive: { type: Boolean, default: false },
  isShort: { type: Boolean, default: false },
  duration: { type: String, default: '00:00' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  summary: [{ type: String }]
}, { timestamps: true });

videoSchema.index({ createdAt: -1 });

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
