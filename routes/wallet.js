const express = require('express');
const router = express.Router();
const { getWallet } = require('./../controllers/wallet');

router.get('/wallet/:userId', getWallet);

module.exports = router;