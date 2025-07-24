const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header is present and formatted correctly
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token from the "Bearer <token>" string
      token = req.headers.authorization.split(' ')[1];

      // Verify the token's authenticity using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user associated with the token's ID and attach them to the request object
      // We exclude the password field for security
      req.user = await User.findById(decoded.id).select('-password');

      // Continue to the next part of the request pipeline
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token is found in the header
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };