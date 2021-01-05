const formidable = require('formidable');
const fs = require('fs');
const Category = require('../models/category');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.categoryById = async (req, res, next, id) => {
    try{
        const category = await Category.findById(id);
    
        req.category = category;
        next();
    }catch(err){
        return res.status(400).json({
            error: 'Category does not exist'
        });
    }
    
};

exports.create = (req, res) => { 
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        // check for all fields
        const { name } = fields;

        if (!name) {
            return res.status(400).json({
                error: 'Name field is required'
            });
        }

        let category = new Category(fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            category.photo.data = fs.readFileSync(files.photo.path);
            category.photo.contentType = files.photo.type;
        }

        category.save((err, result) => {
            if (err) {
                console.log('Category CREATE ERROR ', err);
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.photo = (req, res, next) => {
    if (req.category.photo.data) {
        res.set('Content-Type', req.category.photo.contentType);
        return res.send(req.category.photo.data);
    }
    next();
};


exports.read = async (req, res) => {
    return res.json(req.category);
};

exports.update = (req, res) => {
    console.log('req.body', req.body);
    console.log('category update param', req.params.categoryId);

    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    const category = req.category;
    Product.find({ category }).exec((err, data) => {
        if (data.length >= 1) {
            return res.status(400).json({
                message: `Sorry. You cant delete ${category.name}. It has ${data.length} associated products.`
            });
        } else {
            category.remove((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json({
                    message: 'Category deleted'
                });
            });
        }
    });
};

exports.list = async (req, res) => {
    try{
        const data = await Category.find()
        res.json(data);
    }

    catch(err){
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
    
};
