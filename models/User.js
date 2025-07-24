const mongoose = require('mongoose');

// Define the schema for the User collection
const UserSchema = new mongoose.Schema({
username: {
type: String,
required: [true, 'Please provide a username'], // The username is required
unique: true // Each username must be unique
},
password: {
type: String,
required: [true, 'Please provide a password'] // The password is required
}
}, {
// Add timestamps for 'createdAt' and 'updatedAt' fields
timestamps: true
});

// Create and export the User model
// Mongoose will create a collection named 'users' based on this model
module.exports = mongoose.model('User', UserSchema);