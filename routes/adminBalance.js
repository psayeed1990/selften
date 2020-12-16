const express = require('express');
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { showBalance, addUpdateBalance } = require('./../controllers/adminBalance');
const { userById } = require("../controllers/user");

router.get('/topup-thumbs', showBalance);
router.post('/topup-thumbs/:userId', requireSignin, isAuth, isAdmin, addUpdateBalance);

router.param("userId", userById);
module.exports = router;