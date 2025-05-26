const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  bio: String,
  password: String  // <-- add password field for authentication
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
