const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  setUserPreferences,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/preferences', protect, setUserPreferences);

module.exports = router;
