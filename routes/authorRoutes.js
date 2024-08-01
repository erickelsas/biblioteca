const express = require('express');
const authorController = require('../controllers/authorController');
const router = express.Router();

const { admin } = require('../utils/authMiddleware')

router.get('/authors/', admin, authorController.getAuthors);

router.get('/authors/:id', admin, authorController.getAuthorById);

router.post('/authors/', admin, authorController.createAuthor);

router.delete('/authors/:id', admin, authorController.deleteAuthor);

router.put('/authors/:id', admin, authorController.updateAuthor);

module.exports = router;