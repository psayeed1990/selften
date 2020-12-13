const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const RechargePackage = require('../models/rechargePackage');

//@GET all RechargePackage thumbs
exports.getAllRechargePackages = (req, res, next)=>{
    RechargePackage.find().populate('topupGameName').exec((err, rechargePackage) => {
        if (err) {
            return res.status(400).json({
                error: 'RechargePackage not found'
            });
        }
        res.json(rechargePackage);
    });
    
}

exports.getRechargePackageByGameId = (req, res, next)=>{
    
    const {gameId} = req.params;
    console.log(gameId);
    RechargePackage.find({topupGameName: gameId}).populate('topupGameName').exec((err, rechargePackage) => {
        if (err) {
            return res.status(400).json({
                error: 'RechargePackage not found'
            });
        }
        res.json(rechargePackage);
    });
}

exports.createRechargePackage = (req, res) => {
        
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        
        form.parse(req, (err, fields) => {
            
            // check for all fields
            const { topupGameName, packageName, packageAmount } = fields;
            
            if ( !topupGameName ) {
                
                return res.status(400).json({
                    error: 'Game Name field is missing'
                });
            }
            if ( !packageAmount ) {
                
                return res.status(400).json({
                    error: 'Package amount is missing'
                });
            }
            if ( !packageName ) {
                
                return res.status(400).json({
                    error: 'Package Name field is missing'
                });
            }
            
            
            let rechargePackage = new RechargePackage(fields);
    
            // 1kb = 1000
            // 1mb = 1000000
            
            
    
            rechargePackage.save((err, result) => {
                if (err) {
                    console.log('Recharge Package CREATE ERROR ', err);
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                console.log(result);
                res.json(result);
            });
        });
    };




exports.getRechargePackageById = (req, res, next, id) => {
    RechargePackage.findById(id)
    .populate('topupGameName')
        .exec((err, rechargePackage) => {
            if (err || !rechargePackage) {
                return res.status(400).json({
                    error: 'Recharge Package not found'
                });
            }
            req.rechargePackage = rechargePackage;
            next();
        });
};

exports.updateRechargePackageById = async (req, res, next)=>{
    const rechargePackages = await RechargePackage.find();
    res.json(rechargePackages);
}
exports.deleteRechargePackageById = async (req, res, next)=>{
    const rechargePackages = await RechargePackage.find();
    res.json(rechargePackages);
}