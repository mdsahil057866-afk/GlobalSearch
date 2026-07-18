const mongoose = require('mongoose');
const mongooseFieldEncryption = require('mongoose-field-encryption').fieldEncryption;
require('dotenv').config();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: 'https://via.placeholder.com/150' },
  coverPhoto: { type: String, default: 'https://images.unsplash.com/photo-1506744626753-1fa7604eb821?w=1200&q=80' },
  bio: { type: String, default: '' },
  worksAt: { type: String, default: '' },
  studiedAt: { type: String, default: '' },
  livesIn: { type: String, default: '' },
  languagePreference: { type: String, default: 'en' },
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });




const secret = process.env.ENCRYPTION_KEY || 'default_secret_key_for_development_must_be_32_chars!';

userSchema.plugin(mongooseFieldEncryption, { 
    fields: ['bio'], 
    secret: secret 
});

const User = mongoose.model('User', userSchema);
module.exports = User;
