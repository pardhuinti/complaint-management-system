const express = require('express');
const router = express.Router();
const {
  registerStudent,
  loginStudent,
  loginAdmin,
  getProfile,
  forgotPassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerStudent);
router.post('/login', loginStudent);
router.post('/admin-login', loginAdmin);
router.post('/forgot-password', forgotPassword);
router.get('/profile', protect, getProfile);

module.exports = router;
