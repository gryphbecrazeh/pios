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
	body: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	note: {
		type: String
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
		default: ["Pending"]
	},
	manufacturer: {
		type: String
	},
	vendor: {
		type: String
	},
	date_purchased: {
		type: Date,
		required: true
	},
	date_delivered: {
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
	},
	sku_condition: {
		type: String
	},
	sku_tracking_number: {
		type: String
	},
	skus_quantity: {
		type: Number
	},
	claim_action: {
		type: String
	}
});

module.exports = Claim = mongoose.model("claim", ClaimSchema);
