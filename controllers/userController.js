const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Rejestracja nowego użytkownika
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Sprawdź, czy użytkownik już istnieje
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('Użytkownik już istnieje');
  }

  // Utwórz nowego użytkownika
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),  
    });
  } else {
    res.status(400);
    throw new Error('Nieprawidłowe dane użytkownika');
  }
});


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;


  const user = await User.findOne({ email });


  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),  
    });
  } else {
    res.status(401);
    throw new Error('Nieprawidłowy e-mail lub hasło');
  }
});

// @desc    Pobierz profil użytkownika
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  // Pobierz dane użytkownika na podstawie tokenu JWT
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('Użytkownik nie znaleziony');
  }
});

// Eksportowanie kontrolerów
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
