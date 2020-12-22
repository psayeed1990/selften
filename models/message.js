const mongoose = require('mongoose');
const { model } = require('./topupOrder');
const schema = mongoose.Schema;

const messageSchema = new schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Message', messageSchema);