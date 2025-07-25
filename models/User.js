const mongoose = require('mongoose');

// Define the schema for the User collection
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password']
  },
  // Add the new role field
  role: {
    type: String,
    enum: ['user', 'admin'], // The role can only be one of these values
    default: 'user' // By default, any new user is a 'user'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);