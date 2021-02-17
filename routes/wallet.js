const express = require('express');
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const {
	success,
	fail,
	getWallet,
	addWallet,
	manualPaymentRequest,
	manualPaymentUpdateStatus,
} = require('./../controllers/wallet');
const { userById } = require('../controllers/user');

//manual payment
router.post(
	'/wallet/manual-payment-request/:userId/:amount/:phone/:transactionId',
	requireSignin,
	isAuth,
	manualPaymentRequest
);

router.post(
	'/wallet/manual-payment-request/update-status/:userId/:paymentReqId/:status',
	requireSignin,
	isAuth,
	isAdmin,
	manualPaymentUpdateStatus
);

// wallet
router.post('/wallet/success/:transactionId', success);
router.post('/wallet/fail/:transactionId', fail);
router.post('/wallet/cancell/:transactionId', fail);
router.get('/wallet/:userId', requireSignin, isAuth, getWallet);
router.post('/wallet/add/:userId', requireSignin, isAuth, addWallet);
router.param('userId', userById);

module.exports = router;
