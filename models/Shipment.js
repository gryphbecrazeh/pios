const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShipmentSchema = new Schema({
	date_created: {
		type: Date,
		default: Date.now()
	},
	order_number: {
		type: String,
		required: true
	},
	customer_order: {
		type: String,
		required: true
	},
	tracking_number: {
		type: String,
		required: true
	},
	carrier: {
		type: String,
		required: true
	},
	weight_ship: {
		type: Number,
		required: true
	},
	shipping_eta: {
		type: Date
	},
	cost_crate: {
		type: Number
	},
	cost_freight: {
		type: Number
	},
	shipped_skus: {
		type: Array
	},
	lift_gate: {
		type: Number
	},
	recipient_name: {
		type: String
	},
	recipient_address: {
		type: String
	},
	recipient_state: {
		type: String
	},
	recipient_zip: {
		type: String
	},
	cod_amount: {
		type: Number
	},
	recipient_attention: {
		type: String
	},
	notes: {
		type: String
	}
});

module.exports = Shipment = mongoose.model("shipment", ShipmentSchema);
