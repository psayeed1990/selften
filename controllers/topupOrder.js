const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const TopupOrder = require('../models/topupOrder');
const Wallet = require('../models/wallet');
const RechargePackage = require('../models/rechargePackage');
const { errorHandler } = require('../helpers/dbErrorHandler');

//@GET all topup thumbs
exports.getAllTopupOrders = (req, res, next)=>{
    TopupOrder.find().populate('user').populate('topupGameId').populate('selectRecharge').exec((err, topuporder) => {
        if (err) {
            return res.status(400).json({
                error: 'topupOrder thumbs not found'
            });
        }
        res.json(topuporder);
    });
    
}
exports.createTopupOrder = (req, res, next) => {
        const { userId, topupGameId } = req.params;
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        
        form.parse(req, (err, fields, files) => {
            
            if (err) {
                
                return res.status(400).json({
                    error: 'Image could not be uploaded'
                });
            }
            // check for all fields
            const { accountType, gmailOrFacebook, password, securityCode, selectRecharge } = fields;
            
            if (!accountType ) {
                
                return res.status(400).json({
                    error: 'Account Type field is required'
                });
            }
            if (!gmailOrFacebook ) {
                
                return res.status(400).json({
                    error: 'Gmail or Facebook number field is required'
                });
            }
            if (!password ) {
                
                return res.status(400).json({
                    error: 'Password Type field is required'
                });
            }
            if (accountType === 'gmail' && !securityCode ) {
                
                return res.status(400).json({
                    error: 'Security Code Type field is required for gmail'
                });
            }
            if (!selectRecharge ) {
                
                return res.status(400).json({
                    error: 'Recharge Package field is required'
                });
            }
            if (!topupGameId ) {
                
                return res.status(400).json({
                    error: 'You are in a wrong url'
                });
            }
           

            //get price
            RechargePackage.findById(selectRecharge)
            .then(package=>{
                let topuporder = new TopupOrder(fields);
                topuporder.topupGameId = topupGameId;
                topuporder.user = userId;
                const price = Number(package.packageAmount);
                topuporder.price = price;

                // check user wallet and deduct price
                Wallet.findOne({user: userId}).then(userWallet=>{
                    if(price > Number(userWallet.amount)){
                        return res.status(400).json({
                            error: "User wallet is insufficient",
                        });
                    }else{
                        const leftAmount = Number(userWallet.amount) - Number(price);
                        Wallet.findByIdAndUpdate(userWallet.id, {amount: leftAmount}).then(wallet=>{
                            topuporder.save((err, result) => {
                                if (err) {
                                    console.log('Topup Order CREATE ERROR ', err);
                                    return res.status(400).json({
                                        error: errorHandler(err)
                                    });
                                }
                                console.log(result);
                                res.json(result);
                            }).catch(err=>{
                                return res.status(400).json({
                                    error: errorHandler(err)
                                });
                            })
                        })

                        

                    }
                    
                    
                })
            }).catch(err=>{
                return res.status(400).json({
                    error: errorHandler(err)
                });
            })
            
            
    

        });
    };



exports.getTopupOrderById = (req, res, next, id) => {
    TopupOrder.findById(id)
        .exec((err, topupOrder) => {
            if (err || !topupOrder) {
                return res.status(400).json({
                    error: 'Topup Order not found'
                });
            }
            req.topupOrder = topupOrder;
            next();
        });
};

exports.updateTopupOrderById = async (req, res, next)=>{
    const topups = await TopupOrder.find();
    res.json(topups);
}
exports.deleteTopupOrderById = async (req, res, next)=>{
    const topups = await TopupOrder.find();
    res.json(topups);
}