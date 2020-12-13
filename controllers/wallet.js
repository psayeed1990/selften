const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Wallet = require('../models/wallet');

exports.getWallet = (req, res, next)=>{
    const {userId} = req.params;
    Wallet.findOne({user: userId}).exec((err, wallet) => {
        if (err) {
            return res.status(400).json({
                error: 'RechargePackage not found'
            });
        }
        res.json(wallet);
    });
}