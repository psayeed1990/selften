const mongoose = require('mongoose');
const { stringify } = require('uuid');
const schema = mongoose.Schema;

const topupOrderSchema = new schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    topup: {
        type: mongoose.Schema.ObjectId,
        ref: 'Topup',
        required: true,
    },
    paidAmount: {
        type: String,
        required: true,
    },
    requestedTopupForGame: {
        type: String,
    },
    status: {
        enum: ['cancelled', 'pending', 'completed']
    },
    assignedTo:{
        type: mongoose.Schema.ObjectId,
        
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }

})

module.exports = mongoose.model("TopupOrder", topupOrderSchema);