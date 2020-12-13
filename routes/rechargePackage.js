const express = require('express');
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { getRechargePackageByGameId, getAllRechargePackages, updateRechargePackageById, createRechargePackage, deleteRechargePackageById, getRechargePackageById } = require('./../controllers/rechargePackage');
const { userById } = require("../controllers/user");

router.get('/recharge-package', getAllRechargePackages);
router.get('/recharge-package/get-by-game/:gameId', getRechargePackageByGameId);
router.post('/recharge-package/:userId', requireSignin, isAuth, isAdmin, createRechargePackage);
router.get('/recharge-package/:userId', getRechargePackageById);
router.patch('/recharge-package/:userId', updateRechargePackageById)
router.delete('/recharge-package/:userId', deleteRechargePackageById);

router.param("userId", userById);
router.param("RechargePackageId", getRechargePackageById);
module.exports = router;