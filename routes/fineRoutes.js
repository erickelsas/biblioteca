const express = require('express');
const fineController = require('../controllers/fineController');
const router = express.Router();

const { admin } = require('../utils/authMiddleware')

router.get('/fines/', admin, fineController.getFines);

router.get('/fines/notPaid', admin, fineController.getNotPaidFines);

router.get('/fines/:id', admin, fineController.getFineById);

router.get('/fines/user/:userId', admin, fineController.getFinesByUserId);

router.get('/fines/notPaid/user/:userId', admin, fineController.getNotPaidFinesByUserId);

router.post('/fines/', admin, fineController.createfine);

router.put('/fines/:id', admin, fineController.updateFine);

router.delete('/fines/:id', admin, fineController.deleteFine);

router.patch('/fines/:id/pay', admin, fineController.payFine);

module.exports = router;