const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

const { admin, authenticateToken } = require('../utils/authMiddleware')

router.get('/users/', authenticateToken, userController.getUsers);

router.get('/users/:id', authenticateToken, userController.getUserById);

router.post('/users', admin, userController.createUser);

router.delete('/users/:id', admin, userController.deleteUser);

router.put('/users/:id', authenticateToken, userController.updateUser);

module.exports = router;