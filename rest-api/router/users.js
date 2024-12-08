const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils');

router.get('/profile', auth(),authController.getProfileInfo);
router.put('/profile', auth(),authController.editProfileInfo);

// Get Another User's Profile
router.get('/profile/:userId', auth(), authController.getProfileInfo);

module.exports = router