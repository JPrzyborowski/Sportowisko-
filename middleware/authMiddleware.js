
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = await User.findById(decoded.id).select('-password');  // Pomijamy hasło w wynikach

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Nieautoryzowany dostęp, nieprawidłowy token');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Brak tokenu, nieautoryzowany dostęp');
  }
});

module.exports = { protect };
