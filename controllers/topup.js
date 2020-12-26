const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Topup = require('../models/topup');

//@GET all topup thumbs
exports.getAllTopups = (req, res, next)=>{
    Topup.find().exec((err, topup) => {
        if (err) {
            return res.status(400).json({
                error: 'Topup thumbs not found'
            });
        }
        res.json(topup);
    });
    
}
exports.createTopup = (req, res) => {
        
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        
        form.parse(req, (err, fields, files) => {
            
            if (err) {
                
                return res.status(400).json({
                    error: 'Image could not be uploaded'
                });
            }
            // check for all fields
            const { title, type } = fields;
            
            if (!title ) {
                
                return res.status(400).json({
                    error: 'Title field is required'
                });
            }
            if (!type ) {
                
                return res.status(400).json({
                    error: 'Type field is required'
                });
            }
            
            
            let topup = new Topup(fields);
    
            // 1kb = 1000
            // 1mb = 1000000
            
            if (files.thumb) {
                // console.log("FILES PHOTO: ", files.photo);
                if (files.thumb.size > 1000000) {
                    return res.status(400).json({
                        error: 'Image should be less than 1mb in size'
                    });
                }
                topup.thumb.data = fs.readFileSync(files.thumb.path);
                topup.thumb.contentType = files.thumb.type;
            }
    
            topup.save((err, result) => {
                if (err) {
                    console.log('PRODUCT CREATE ERROR ', err);
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
      
                res.json(result);
            });
        });
    };


//photo
exports.thumb = (req, res, next) => {
    if (req.topup.thumb.data) {
        res.set('Content-Type', req.topup.thumb.contentType);
        return res.send(req.topup.thumb.data);
    }
    next();
};

exports.getTopupById = (req, res, next, id) => {
    Topup.findById(id)
        .exec((err, topup) => {
            if (err || !topup) {
                return res.status(400).json({
                    error: 'topup not found'
                });
            }
            req.topup = topup;
            next();
        });
};

exports.updateTopupById = async (req, res, next)=>{
    const topups = await Topup.find();
    res.json(topups);
}
exports.deleteTopupById = async (req, res, next)=>{
    const topups = await Topup.find();
    res.json(topups);
}