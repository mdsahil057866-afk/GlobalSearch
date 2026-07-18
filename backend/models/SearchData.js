const mongoose = require('mongoose');

const searchDataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    enum: ['English', 'Hindi', 'Hinglish', 'Punjabi', 'Bengali', 'Tamil', 'Telugu'],
    default: 'English',
  },
  district: {
    type: String,
    required: true,
  },
  keywords: [{
    type: String
  }]
}, {
  timestamps: true,
});


searchDataSchema.index({ title: 'text', snippet: 'text', keywords: 'text' });

module.exports = mongoose.model('SearchData', searchDataSchema);
