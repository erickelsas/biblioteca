const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();

const { admin, authenticateToken } = require('../utils/authMiddleware')

router.get('/books', admin, bookController.getBooks);
router.get('/books/active', authenticateToken, bookController.getActiveBooks)

module.exports = router;