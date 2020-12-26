const formidable = require('formidable');
const user = require('../models/user');
const User = require('../models/user');
const Coupon  = require('./../models/coupon');


exports.getCouponsByUser = (req, res)=>{
    const {userId} = req.params;

    
    User.findById(userId).then(user=>{
        res.json(user);
    })
}

exports.collectCoupon = (req, res) =>{
    const { userId, couponId } = req.params;

    Coupon.findById(couponId).then(coupon=>{
        if(coupon){
            User.findById(userId).then(user=>{
                if(!user.coupon){
                    user.coupon = coupon;
                    user.save();
                    res.json(coupon)
                }
                if(user.coupon){
                    user.coupon.push(coupon);
                    user.save().then(user=>{
                        res.json(coupon);
                    }).catch(err=>{
                        console.log(err);
                    })
                }
            })
        }else{
            res.json({error: 'Invalid coupon id'})
        }
    })
}

exports.addCoupon = (req, res)=>{
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        
        form.parse(req, (err, fields, files) => {
            const { couponName, couponCode, shortDetails, diamonds, discounts} = fields;
            if( !couponName || !couponCode || !shortDetails || !diamonds || !discounts) {
                return res.status(400).json({
                    error: 'Some fields are missing'
                });
            }

            const newCoupon = Coupon({
                couponName, 
                couponCode, 
                shortDetails, 
                diamonds, 
                discounts
            });

            newCoupon.save().then(coupon=>{
                if(coupon){
                    res.json(coupon);
                }
                if(!coupon){
                    res.status(400).json({
                        error: 'Coupon was not created'
                    });
                }
                
            }).catch(err=>{
                console.log(err);
            })
        
        })
}
exports.showCoupon = (req, res)=>{
    Coupon.find().then(coupon=>{
        if(coupon) {
            res.json(coupon)
        }

        if(!coupon){
            res.status(400).json({
                error: 'Coupon could not found'
            });
        }
    }).catch(err=>{
        console.log(err);
    })
}