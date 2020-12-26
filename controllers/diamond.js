const Diamonds = require('./../models/diamonds');

exports.getDiamonds = (req, res)=>{
    const {userId } = req.params;

    Diamonds.findOne({user: userId}).then(diamond=>{
        if(diamond){
            res.json(diamond);

        }
        if(!diamond){
            res.json({error: "No diamonds found"})
        }
    })

}