const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();

const { admin, authenticateToken } = require('../utils/authMiddleware')

router.get('/books', admin, bookController.getBooks);

router.get('/books/active', authenticateToken, bookController.getActiveBooks);

router.get('/books/:id', admin, bookController.getBookById);

router.post('/books', admin, bookController.createBook);

router.put('/books/:id', admin, bookController.updateBook);

router.delete('/books/:id', admin, bookController.deleteBook);

module.exports = router;