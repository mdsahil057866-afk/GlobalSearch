const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  mediaUrl: { type: String },
  mediaType: { type: String, enum: ['image', 'video', 'none'], default: 'none' },
  languageTags: [{ type: String }], 
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });


postSchema.index({ createdAt: -1 });
postSchema.index({ author: 1 });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
