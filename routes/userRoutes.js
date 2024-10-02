
const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/profile').get(protect, getUserProfile);

router.post('/register', registerUser); 
router.post('/login', loginUser);        

module.exports = router;
