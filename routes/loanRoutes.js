const express = require('express');
const loanController = require('../controllers/loanController');
const router = express.Router();

const { admin, authenticateToken } = require('../utils/authMiddleware')

router.get('/loans/:id/return', admin, loanController.returnBook);

router.get('/loans/:id', admin, loanController.getLoanById);

router.get('/loans/active', authenticateToken, loanController.getActiveLoans);

router.get('/loans', admin, loanController.getLoans);

router.post('/loans', admin, loanController.createLoan);

router.put('/loans/:id', admin, loanController.updateLoan);

router.delete('/loans/:id', admin, loanController.deleteLoan);

module.exports = router;