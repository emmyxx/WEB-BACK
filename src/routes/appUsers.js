const express = require('express');
const router = express.Router();
const {getAllUsers,deleteUser,register,login} = require('../controllers/appUsersController');
const { authenticateToken } = require('../middlewares/authenticate');

//Routes publiques
router.post('/register',register);
router.post('/login', login);

// Routes protégées (authentification requise)
router.get('/profile', getAllUsers);
router.delete('/profile/:id', deleteUser);

module.exports = router;
