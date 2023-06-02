const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser, register, login } = require('../controllers/appUsersController');
const authenticateToken = require('../middlewares/authenticate');

// Routes publiques
router.post('/register',register);
router.post('/login',authenticateToken, login);
router.get('/login',authenticateToken, login);

// Routes protégées (authentification requise)
router.get('/profile', authenticateToken, getAllUsers);
router.delete('/profile/:id', authenticateToken, deleteUser);

module.exports = router;
