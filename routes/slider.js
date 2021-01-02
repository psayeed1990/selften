const express = require('express');
const router = express.Router();
const {createSlider, slider, photo} = require('../controllers/slider');
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get('/slider', slider);
router.get('/slider/:userId', requireSignin, isAuth, isAdmin, createSlider);
router.get("/slider/photo", photo);
router.param("userId", userById);

module.exports = router;