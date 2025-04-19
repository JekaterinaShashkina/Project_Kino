const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.post('/add-role', authController.addRoleToUser);
router.post('/remove-role', authController.removeRoleFromUser);



module.exports = router;