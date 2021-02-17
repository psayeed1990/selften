const mongoose = require('mongoose');
const schema = mongoose.Schema;

const manualSchema = new schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	transactionId: {
		type: String,
		required: true,
	},

	status: {
		type: String,
		enum: ['pending, approved, cancelled'],
		default: 'pending',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('PaymentRequest', manualSchema);
