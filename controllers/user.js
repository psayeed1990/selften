const User = require('../models/user');
const { Order } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');
const Message = require('../models/message');
const MessagePair = require('../models/messagePair');
const formidable = require('formidable');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
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

exports.getMessagesByUser = (req, res) => {
    const { userId } = req.params; 
    MessagePair.find({ $or:[ {'user':userId}, {'receiver':userId}]}).populate('user').populate('receiver').limit(1).populate('message').exec((err, messages) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(messages);
        });
}

exports.getMessagesByPair = (req, res) => {
        const { pairId } = req.params; 
    MessagePair.findById(pairId).populate('user').populate('receiver').populate('message').exec((err, messages) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(messages);
        });
}

exports.getChat = (req, res) => {
    const { userId, receiverId } = req.params;
    Message.find({user: userId, receiver: receiverId }).exec((err, messages) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(messages);
        });
}

exports.addChat = (req, res) => {
    const { userId, receiverId } = req.params;
    const newMessage = new Message({
        user: userId,
        receiver: receiverId,
        message: req.body.message
    })

    Message.save().exec((err, messages) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(messages);
        });
}