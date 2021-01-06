const User = require('../models/user');
const { Order } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');
const Message = require('../models/message');
const MessagePair = require('../models/messagePair');
const formidable = require('formidable');

exports.getUserById = async (req, res, next)=>{
    const {userId} = req.params;

    try{
        const user = await User.findById(userId);
        return res.json(user);
    }catch(err){
        console.log(err);
    }
}

exports.profileUpdate = async (req, res, next)=>{
    
    try{
        const {userId} = req.params;
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        
        form.parse(req, async (err, fields) => {
            
            const {name, email, phone, address, postCode, city, about } = fields;
            
            // if(!name || !email || !phone || !address || !postCode || !city || !about ){
            //     return res.status(400).json({
            //         error: 'All field required',
            //     });
            // }

            
            const user = await User.findById(userId);
            console.log(user);
            if(name){
                user.name = name;
            }
            if(email){
                user.email = email
            }

            if(phone){
                user.phone = phone
            }

            if(address){
                user.address = address
            }
             if(postCode){
                 user.postCode = postCode
             }
             if(city){
                 user.city = city
             }
             if(about){
                 user.about = about
             }
              

            const updatedUser = await user.save();
            console.log(updatedUser);
            return res.json(updatedUser);
        
        })

    }catch(err){
        return res.status(400).json({
            error: 'Profile could not update'
        });
    }
}

exports.userById = async (req, res, next, id) => {
    try{
        const user = await User.findById(id);
            
        
        req.profile = user;
        next();
    }
        catch(err){
            return res.status(400).json({
                error: 'User not found'
            });
        }
    
};

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

// exports.update = (req, res) => {
//     console.log('user update', req.body);
//     req.body.role = 0; // role will always be 0
//     User.findOneAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true }, (err, user) => {
//         if (err) {
//             return res.status(400).json({
//                 error: 'You are not authorized to perform this action'
//             });
//         }
//         user.hashed_password = undefined;
//         user.salt = undefined;
//         res.json(user);
//     });
// };

exports.update = (req, res) => {
    // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
    const { name, password } = req.body;

    User.findOne({ _id: req.profile._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        if (!name) {
            return res.status(400).json({
                error: 'Name is required'
            });
        } else {
            user.name = name;
        }

        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    error: 'Password should be min 6 characters long'
                });
            } else {
                user.password = password;
            }
        }

        user.save((err, updatedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'User update failed'
                });
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;
            res.json(updatedUser);
        });
    });
};

exports.addOrderToUserHistory = (req, res, next) => {
    let history = [];

    req.body.order.products.forEach(item => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        });
    });

    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { history: history } }, { new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update user purchase history'
            });
        }
        next();
    });
};

exports.purchaseHistory = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate('user', '_id name')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(orders);
        });
};

exports.sendMessagesByPair = (req, res) => {
    const { userId, receiverId, pairId } = req.params;
    let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        
    form.parse(req, (err, fields, files) => {
            const { message } = fields;

            const newMessage = new Message({
            user: userId,
            receiver: receiverId,
            message,
        });

        newMessage.save().then(msg => {
            MessagePair.findById(pairId).then(pair => {
                
                pair.message.push(msg);
                pair.save()
                                
                res.json({message: 'message sent'})
            })
        })
     })

    
  

    
}

exports.getUnseenMessagesByReceiver = (req, res) => {
        const { userId } = req.params; 
        Message.find({receiver: userId, seen: false}).exec((err, messages) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(messages);
        });
}

exports.getMessagesByUser = async (req, res) => {
    try{
        const { userId } = req.params; 
        const messages = await MessagePair.find({ $or:[ {'user':userId}, {'receiver':userId}]}).populate('user').populate('receiver').populate('message')
        res.json(messages); 
            
    }catch(err){
        return res.status(400).json({
            error: errorHandler(err)
        });
    }

}

exports.getMessagesByPair = async (req, res) => {
    try{
        const { pairId, userId } = req.params;

        const messages = await MessagePair.findById(pairId).populate('user').populate('receiver').populate(
        {
            path:'message',
            options: {
                limit: 20

            }
        })
        
        
        const unSeenMsg = await messages.message.filter((mail) => {
            
            return mail.seen === false
        });
        for (msg in unSeenMsg){
            if(unSeenMsg[msg].receiver = userId){
                
                unSeenMsg[msg].seen = true;
                unSeenMsg[msg].save()
                .then(m=>{
                    //
                })

            }
        }
        
        res.json(messages);
    }catch(err){
        return res.status(400).json({
            error: errorHandler(err)
        });
    }

}

exports.getChat = async (req, res) => {
    try{
        const { userId, receiverId } = req.params;
        const messages = await Message.find({user: userId, receiver: receiverId })
        res.json(messages);
    }
    

    catch(err){
        return res.status(400).json({
                    error: errorHandler(err)
                });
    }
        
}

exports.addChat = async (req, res) => {
    try{
        const { userId, receiverId } = req.params;
        const newMessage = new Message({
            user: userId,
            receiver: receiverId,
            message: req.body.message
        })

        const messages = await newMessage.save()
        res.json(messages);
    }
    catch(err){
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
        
}

//get all admins
exports.gerAllAdmins = async (req, res)=>{
    try{
        const admins = await User.find({role: 1})
        res.json(admins);
    }catch(err){
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
    
    
}