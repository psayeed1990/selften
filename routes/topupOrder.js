const express = require('express');
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { getAllTopupOrders, updateTopupOrderById, createTopupOrder, deleteTopupOrderById, getTopupOrderById } = require('./../controllers/topupOrder');
const { userById } = require("../controllers/user");

router.post('/topup-orders/admin/:userId', requireSignin, isAuth, isAdmin, getAllTopupOrders);
router.post('/topup-orders/:userId/topup/:topupGameId', requireSignin, isAuth, createTopupOrder);
router.get('/topup-orders/single/:topupOrderId', getTopupOrderById);
router.patch('/topup-orders/:topupOrderId', updateTopupOrderById)
router.delete('/topup-orders/:topupOrderId', deleteTopupOrderById);

router.param("userId", userById);
router.param("topupId", getTopupOrderById);
module.exports = router;