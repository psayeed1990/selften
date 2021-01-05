const formidable = require('formidable');
const Slider = require("../models/Slider")
const fs = require('fs');


exports.createSlider = (req, res) => {
        
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        
        form.parse(req, (err, fields, files) => {
            
            if (err) {
                
                return res.status(400).json({
                    error: 'Image could not be uploaded'
                });
            }
            // check for all fields
            const { title } = fields;
            
            if (!title ) {
                
                return res.status(400).json({
                    error: 'Title field is required'
                });
            }
            
            
            let slider = new Slider(fields);
    
            // 1kb = 1000
            // 1mb = 1000000
            
            if (files.photo) {
                // console.log("FILES PHOTO: ", files.photo);
                if (files.photo.size > 1000000) {
                    return res.status(400).json({
                        error: 'Image should be less than 1mb in size'
                    });
                }
                slider.photo.data = fs.readFileSync(files.photo.path);
                slider.photo.contentType = files.photo.type;
            }
    
            slider.save((err, result) => {
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


exports.slider = async (req, res,next)=> {
    try{
        const sliders = await Slider.find();

        res.status(200).json(sliders);
    }catch(err){
        console.log(err);
    }
}

exports.photo = async (req, res, next) => {
    if (req.slider.photo.data) {
        await res.set('Content-Type', req.slider.photo.contentType);
        return res.send(req.slider.photo.data);
    }
    next();
};

exports.getSliderById = async (req, res, next, id) => {
    try{
        const slider = await Slider.findById(id)
            
        req.slider = slider;
        next();
    }
    catch(err){
        return res.status(400).json({
             error: 'Slider not found'
        });
    }
        
};
