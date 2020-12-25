const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const TopupOrder = require('../models/topupOrder');
const Wallet = require('../models/wallet');
const RechargePackage = require('../models/rechargePackage');
const { errorHandler } = require('../helpers/dbErrorHandler');
const Topup = require('./../models/topup');
const Message = require('../models/message');
const MessagePair = require('../models/messagePair');
const User = require('../models/user');


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


exports.createTopupOrder = (req, res, next) => {
        const adminId = '5fdadfe6cc7fc11b2772b5e0';
        const { userId, topupGameId } = req.params;
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
                
            if (topup && topup.type === 'inGame') {
                const { accountType, gmailOrFacebook, password, securityCode, selectRecharge } = fields;
                
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
                
    
                //get price
                RechargePackage.findById(selectRecharge)
                    .then(package => {
                        let topuporder = new TopupOrder(fields);
                        topuporder.topupGameId = topupGameId;
                        topuporder.user = userId;
                        const price = Number(package.packageAmount);
                        topuporder.price = price;
    
                        // check user wallet and deduct price
                        Wallet.findOne({ user: userId }).then(userWallet => {
                            if (price > Number(userWallet.amount)) {
                                return res.status(400).json({
                                    error: "User wallet is insufficient",
                                });
                            } else {
                                const leftAmount = Number(userWallet.amount) - Number(price);
                                Wallet.findByIdAndUpdate(userWallet.id, { amount: leftAmount }).then(wallet => {
                                    topuporder.save((err, result) => {
                                        if (err) {
                                            console.log('Topup Order CREATE ERROR ', err);
                                            return res.status(400).json({
                                                error: errorHandler(err)
                                            });
                                        }

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
                            
                            
                        
                    })
            }
                

                if(topup && topup.type === 'codeId'){
                    
                    const { gameUserId, password, selectRecharge } = fields;
                
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
    
                }
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