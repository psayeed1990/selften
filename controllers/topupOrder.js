const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const axios = require('axios');
const TopupOrder = require('../models/topupOrder');
const Wallet = require('../models/wallet');
const RechargePackage = require('../models/rechargePackage');
const { errorHandler } = require('../helpers/dbErrorHandler');
const Topup = require('./../models/topup');
const Message = require('../models/message');
const MessagePair = require('../models/messagePair');
const User = require('../models/user');
const AdminBalance = require('./../models/adminBalance');
const Diamonds = require('./../models/diamonds');
const {sslcommerz} = require('./sslCommerce');
const adminId = '5fdadfe6cc7fc11b2772b5e0';


//@GET all topup thumbs
exports.getAllTopupOrders = (req, res, next)=>{
    TopupOrder.find().populate('user').populate('topupGameId').populate('selectRecharge').populate('pair').populate('assignedTo').exec((err, topuporder) => {
        if (err) {
            return res.status(400).json({
                error: 'topupOrder thumbs not found'
            });
        }
        res.json(topuporder);
    });
    
}

exports.assignTopupOrder = (req, res)=>{
    console.log('hi')
    const {adminId, topupOrderId} = req.params;
    console.log(req.params)
    TopupOrder.findByIdAndUpdate(topupOrderId, {assignedTo: adminId}).then(data=>{
        if(data){
            res.json(data);
        }
    })
}

//get all assigned topup orders
exports.getAllAssignedTopupOrders = (req, res, next) => {
    const { userId } = req.params;
    TopupOrder.find({assignedTo: userId }).populate('user').populate('topupGameId').populate('selectRecharge').populate('pair').exec((err, topuporder) => {
        if (err) {
            return res.status(400).json({
                error: 'topup Orders not found'
            });
        }
        res.json(topuporder);
    });
    
}


exports.SSLComSuccess = (req, res)=>{
    const {transactionId} = req.params;
    console.log('ok')
    
        //validate transaction id
    sslcommerz.transaction_status_id(transactionId)
    .then(response=>{
        if(response.element[0].status === 'VALID' || response.element[0].status === 'VALIDATED'){
            TopupOrder.findById(transactionId)
            .then(data=>{
                
                //save order as paid
                data.paid = true;
                data.save();

                //deduct admin balance
                AdminBalance.find().then(bl=>{
                    if(bl){
                        if(Number(bl[0].balance) > Number(response.element[0].currency_amount)){
                            bl[0].balance = Number(bl[0].balance) - Number(response.element[0].currency_amount);
                            bl[0].save();
                        }

                        //create diamonds
                        const diamondAmount = parseInt(Number(response.element[0].currency_amount) / Number(bl[0].takaPerDiamond));
                        Diamonds.findOne({user: data.user})
                        .then(diamond=>{
                            if(!diamond){
                                const newDiamond = new Diamonds({
                                    user: data.user,
                                    amount: diamondAmount,
                                });
                                newDiamond.save();
                            }
                            if(diamond){
                                diamond.amount = Number(diamond.amount) + diamondAmount;
                                diamond.save();
                            }
                        })
                    }
                })
                
                //send message
                let newMessage = new Message({
                    user: adminId,
                    receiver: data.user,
                    message: `Your topup order no:- ${transactionId} has been created. Someone will start working on it in a moment`,
                });

                newMessage.save().then(message => {
                                            
                    MessagePair.findOne({ $or: [{ $and: [{ user: data.user }, { receiver: data.user }] }, { $and: [{ user: data.user }, { receiver: data.user }] }] })
                    .then(pair => {
                                                     
                        if (pair) {
                                                            
                                                            
                            pair.message.push(message);
                            pair.save();
                            //save pair id to topup order
                            data.pair = pair;
                            data.save();
                            
                            return res.redirect(`${process.env.SITE_URL}/topup-order/success/${transactionId}`);

                                                            
                        }
                        if (!pair) {
                            const msgId = message._id;



                            const newPair = new MessagePair({
                                user: adminId,
                                receiver: data.user,
                                message: [msgId],
                            });

                            newPair.save().then(newpair => {
                                //save pair id to topup order
                                data.pair = newpair;
                                data.save().then(newOrder=>{
                                    
                                    //redirect to success page
                                    return res.redirect(`${process.env.SITE_URL}/topup-order/success/${transactionId}`);
                                }).catch(err=>{
                                    console.log(err);
                                })
                                
                                
                            }).catch(err => {
                                console.log(err);
                            })
                        }
                    })
                })



                
                
                
            })
            
        }else{
            TopupOrder.findByIdAndDelete(transactionId).then(del=>{
                return res.redirect(`${process.env.SITE_URL}/topup-order/fail/${transactionId}`);
            }).catch(err=>{
                console.log(err);
            })
            
        }


        
    }).catch(err=>{
        console.log(err)
    })
}

exports.SSLComFail = (req, res)=>{
    const {transactionId} = req.params;
    TopupOrder.findByIdAndDelete(transactionId).then(del=>{
        res.redirect(`${process.env.SITE_URL}/topup-order/fail/${transactionId}`);
    })
}

exports.createTopupOrder = (req, res, next) => {
        
        const { userId, topupGameId, withSSLCommerz } = req.params;
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        
    form.parse(req, (err, fields, files) => {
            
        if (err) {
                
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
            
        Topup.findById(topupGameId).then(topup => {
            
            if (!topup) {
                return res.status(400).json({
                    error: 'Game invalid'
                });
            }
            
            const { gameUserId, accountType, gmailOrFacebook, password, securityCode, selectRecharge } = fields;
            
            

            if (topup && topup.type === 'inGame') {
                

                if (!accountType) {
                        
                    return res.status(400).json({
                        error: 'Account Type field is required'
                    });
                }
                if (!gmailOrFacebook) {
                        
                    return res.status(400).json({
                        error: 'Gmail or Facebook number field is required'
                    });
                }
                if (!password) {
                        
                    return res.status(400).json({
                        error: 'Password Type field is required'
                    });
                }
                if (accountType === 'gmail' && !securityCode) {
                        
                    return res.status(400).json({
                        error: 'Security Code Type field is required for gmail'
                    });
                }
                if (!selectRecharge) {
                        
                    return res.status(400).json({
                        error: 'Recharge Package field is required'
                    });
                }
                if (!topupGameId) {
                        
                    return res.status(400).json({
                        error: 'You are in a wrong url'
                    });
                }
            }

            if(topup && topup.type === 'codeId'){

                    if (!gameUserId ) {
                        
                        return res.status(400).json({
                            error: 'Account Type field is required'
                        });
                    }
                    if (!password ) {
                        
                        return res.status(400).json({
                            error: 'Password Type field is required'
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
                }
                
                
                //get price
                RechargePackage.findById(selectRecharge)
                    .then(package => {
                        let topuporder = new TopupOrder(fields);
                        topuporder.topupGameId = topupGameId;
                        topuporder.user = userId;
                        const price = Number(package.packageAmount);
                        topuporder.price = price;
                        
                        // if ssl commerce pays
                        if(withSSLCommerz === 'y'){
                             console.log('hi')
                            topuporder.save((err, result) => {
                                if (err) {
                                            console.log('Topup Order CREATE ERROR ', err);
                                            return res.status(400).json({
                                                error: errorHandler(err)
                                            });
                                        }
                                
                                // ssl commerce data map
                                User.findById(userId).then(user=>{
                                    const data = {
                                        currency: "BDT",
                                        product_name: package.packageName,
                                        total_amount: price,
                                        tran_id: result._id,
                                        product_category: "Topup",
                                        success_url: `${req.protocol}://${req.get('host')}/api/topup-order/success/${result._id}`,
                                        fail_url: `${req.protocol}://${req.get('host')}/api/topup-order/fail/${result._id}`,
                                        cancel_url: `${req.protocol}://${req.get('host')}/api/topup-order/cancell/${result._id}`,
                                        cus_name: user.name,
                                        cus_email: user.email,
                                        cus_add1: user.address,
                                        cus_city: user.city,
                                        cus_postcode: user.postCode,
                                        cus_country: "Bangladesh",
                                        cus_phone: user.phone,
                                        shipping_method: 'NO',
                                        ipn_url: "http://localhost:3000/pay",
                                        num_of_item: 1,
                                        value_a: result._id,
                                        GatewayPageURL: "http://localhost:3000/pay",
                                        emi_option: 0,
                                        product_profile: "non-physical-goods",
                                    }
                                   
                                    sslcommerz.init_transaction(data).then(response => {
                                        if(response.status === 'success'){
                                            result.sslComSessionKey = response.sessionkey;
                                            result.save();
                                        }
                                        return res.json(response);
                                    }).catch(error => {
                                        return console.log(error);
                                    })
                                    
                                })

                            })
                        }

                        // if paid by wallet
                        if(withSSLCommerz === 'n'){
                            // check user wallet and deduct price
                            Wallet.findOne({ user: userId }).then(userWallet => {
                                if (price > Number(userWallet.amount)) {
                                    return res.status(400).json({
                                        error: "User wallet is insufficient",
                                    });
                                } else {
                                    

                                    const leftAmount = Number(userWallet.amount) - Number(price);
                                    userWallet.amount = leftAmount;
                                    userWallet.save()
                                    .then(wallet => {
                                        
                                        
                                        //mark paid as true
                                        topuporder.paid = true;
                                        topuporder.save((err, result) => {
                                            if (err) {
                                                console.log('Topup Order CREATE ERROR ', err);
                                                return res.status(400).json({
                                                    error: errorHandler(err)
                                                });
                                            }

                                            //deduct admin balance
                                            AdminBalance.find().then(bl=>{
                                                if(bl){
                                                    if(Number(bl[0].balance) > Number(price)){
                                                        bl[0].balance = Number(bl[0].balance) - Number(price);
                                                        bl[0].save();
                                                    }

                                                    //create diamonds
                                                    const diamondAmount = parseInt(Number(price) / Number(bl[0].takaPerDiamond));
                                                    Diamonds.findOne({user: userId})
                                                    .then(diamond=>{
                                                        if(!diamond){
                                                            const newDiamond = new Diamonds({
                                                                user: userId,
                                                                amount: diamondAmount,
                                                            });
                                                            newDiamond.save();
                                                        }
                                                        if(diamond){
                                                            diamond.amount = Number(diamond.amount) + diamondAmount;
                                                            diamond.save();
                                                        }
                                                    })
                                                }
                                            })
                                            

                                            //send message
                                            let newMessage = new Message({
                                                user: adminId,
                                                receiver: userId,
                                                message: `Your topup order no:- ${result._id} has been created. Someone will start working on it in a moment`,
                                            });

                                            newMessage.save().then(message => {
                                                
                                                MessagePair.findOne({ $or: [{ $and: [{ user: userId }, { receiver: userId }] }, { $and: [{ user: userId }, { receiver: userId }] }] })
                                                    .then(pair => {
                                                        
                                                        if (pair) {
                                                            
                                                            
                                                            pair.message.push(message);
                                                            pair.save()
                                                                //save pair id to topup order
                                                                result.pair = pair;
                                                                result.save();
                                                                res.json({ message: 'updated' })
                                                            
                                                            
                                                        }
                                                        if (!pair) {
                                                            const msgId = message._id;



                                                            const newPair = new MessagePair({
                                                                user: adminId,
                                                                receiver: userId,
                                                                message: [msgId],
                                                            });

                                                            newPair.save().then(newpair => {
                                                                //save pair id to topup order
                                                                result.pair = newpair;
                                                                result.save();
                                                                res.json(result);
                                                            }).catch(err => {
                                                                console.log(err);
                                                            })
                                                        }
                                                    })
                                            })
                                                
                                        })
                                    })
                                }
        
                                    
        
                            })
                        }
                            
                            
                        
                    })
            
                
                
                // check for all fields
                

            }).catch(err=>{
                return res.status(400).json({
                    error: 'Game invalid'
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
 
exports.updateTopupOrderById = (req, res, next) => {
    const { userId, topupOrderId, status, customerId } = req.params;
    TopupOrder.findByIdAndUpdate(topupOrderId, { status: status })
        .then(topupOrder => {

            //send message
            let newMessage = new Message({
                user: userId,
                receiver: customerId,
                message: `Your topup order no:- ${topupOrderId} has been ${status}`,
            });

            newMessage.save().then(message => {
                
                MessagePair.findOne({ $or: [{ $and: [{ user: userId }, { receiver: customerId }] }, { $and: [{ user: customerId }, { receiver: userId }] }] })
                    .then(pair => {
                        
                        if (pair) {
                            
                            const msgId = message._id;
                            pair.message.push(message);
                            pair.save()
                            
                            res.json({message: 'updated'})
                            
                        }
                        if (!pair) {
                            const msgId = message._id;



                            const newPair = new MessagePair({
                                user: userId,
                                receiver: customerId,
                                message: [msgId],
                            });

                            newPair.save().then(newpair => {
                                res.json({message: 'updated'})
                            }).catch(err => {
                                console.log(err);
                            })
                        }
                })
                
            })

            
        }).catch(err => {
            res.json(err);
        })
}
exports.deleteTopupOrderById = async (req, res, next)=>{
    const topups = await TopupOrder.find();
    res.json(topups);
}