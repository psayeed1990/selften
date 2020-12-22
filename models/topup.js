const mongoose = require('mongoose');
const schema = mongoose.Schema;

const topupSchema = new schema({
    title: {
        type: String,
        required: [true, 'New top up system needs a title']
    },

    thumb:{
        data: Buffer,
        contentType: String
    },
    type: {
        type: String,
        enum: ['inGame', 'idCode']
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Topup', topupSchema);