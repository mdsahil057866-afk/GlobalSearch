const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['like', 'comment', 'friend_request', 'friend_accept'], required: true },
  read: { type: Boolean, default: false },
  relatedPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
}, { timestamps: true });

notificationSchema.index({ recipient: 1, read: 1 });

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
