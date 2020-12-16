const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const { errorHandler } = require('../helpers/dbErrorHandler');
const AdminBalance = require('./../models//adminBalance');

//@GET all topup thumbs
exports.showBalance = (req, res, next)=>{
    AdminBalance.find().exec((err, balance) => {
        if (err) {
            return res.status(400).json({
                error: 'topupOrder thumbs not found'
            });
        }
        res.json(balance);
    });
    
}
exports.addUpdateBalance = (req, res, next) => {
        const { userId } = req.params;
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        
        form.parse(req, (err, fields, files) => {
            
            if (err) {
                
                return res.status(400).json({
                    error: 'Error: balance was not added'
                });
            }
            
            AdminBalance.find().then(prevbalance=>{
                const { balance } = fields;

                if(!balance){
                    return res.status(400).json({
                        error: 'Password Type field is required'
                    });
                }

                if(prevbalance){
                    
                    const newbBalance = prevbalance[0].balance + balance;
                    AdminBalance.findByIdAndUpdate(prevbalance[0].id, {balance: newbBalance});
                }

                if(!prevbalance){
                    const newBalance = new AdminBalance({
                        balance,
                        updatedBy: userId,
                    })

                    newBalance.save().exec((err, data)=>{
                        if (err) {
                            return res.status(400).json({
                                error: 'Balance could not add',
                            });
                        }
                        res.json(data);
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


