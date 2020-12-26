const { errorHandler } = require('../helpers/dbErrorHandler');
const AdminBalance = require('./../models//adminBalance');

//@GET balance
exports.showBalance = (req, res, next)=>{
    AdminBalance.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    })
    
}

exports.addUpdateBalance = (req, res, next) => {
        const { userId } = req.params;

        let { balance } = req.body;
        if(!balance){
            return res.status(400).json({
                error: 'Balance field is required'
            });
        }

        if(isNaN(balance)){
            return res.status(400).json({
                error: 'Please write digits only'
            });
        }

        AdminBalance.find().then(prevbalance=>{
            
            if(!prevbalance){
                const newBalance = new AdminBalance({
                    balance,
                    updatedBy: userId,
                })
                console.log(newBalance)
                newBalance.save().exec((err, data)=>{
                    if (err) {
                        return res.status(400).json({
                            error: 'Balance could not add',
                        });
                    }
                    res.json(data);
                })
                
            }

            if(prevbalance){
                let addBalance = Number(prevbalance[0].balance) + Number(balance);
                if (addBalance < 0){
                    addBalance = 0;
                }
                AdminBalance.findByIdAndUpdate(prevbalance[0].id, {balance: addBalance})
                .then(b=>{
                    res.json(b);
                })
            }

            
        })
}

exports.addUpdateDiamondValue = (req, res)=>{

        const { userId } = req.params;

        let { diamondValue } = req.body;
        if(!diamondValue){
            return res.status(400).json({
                error: 'Value field is required'
            });
        }

        if(isNaN(diamondValue)){
            return res.status(400).json({
                error: 'Please write digits only'
            });
        }

        AdminBalance.find().then(prevbalance=>{
            
            if(!prevbalance){
                const newBalance = new AdminBalance({
                    balance: 0,
                    updatedBy: userId,
                    takaPerDiamond: diamondValue,
                })
                newBalance.save().exec((err, data)=>{
                    if (err) {
                        return res.status(400).json({
                            error: 'Diamonds could not add',
                        });
                    }
                    res.json(data);
                })
                
            }

            if(prevbalance){
                
                
                prevbalance[0].takaPerDiamond = Number(diamondValue);
                prevbalance[0].save()
                .then(b=>{
                    res.json(b);
                }).catch(err=>{
                    console.log(err)
                })
            }

            
        })
}

