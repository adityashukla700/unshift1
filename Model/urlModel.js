const mongoose=require('mongoose')

const UrlSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    origUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
    },
    date: {
      type: String,
      default: Date.now,
    },
  });
  
  module.exports.Url = mongoose.model('Url', UrlSchema);