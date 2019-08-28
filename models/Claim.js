const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ClaimSchema = new Schema({
	creation_date: {
		type: Date,
		default: Date.now()
	},
	order_number: {
		type: String,
		required: true,
		unique: false
	},
	customer_order: {
		type: String,
		required: true,
		unique: false
	},
	subject: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	note: {
		type: String,
		required: true
	},
	user: {
		type: String,
		required: true
	},
	date_reported: {
		type: Date,
		required: true
	},
	date_responded: {
		type: Date
	},
	claim_status: {
		type: Array,
		default: ["Active"]
	},
	manufacturer: {
		type: String
	},
	vendor: {
		type: String
	},
	purchase_date: {
		type: Date,
		required: true
	},
	delivery_date: {
		type: Date
	},
	amount_claim: {
		type: Number
	},
	shipments: {
		type: Array
	},
	cost_freight: {
		type: Number
	},
	claimed_skus: {
		type: String
	},
	replacement_skus: {
		type: String
	}
});

module.exports = Claim = mongoose.model("claim", ClaimSchema);
