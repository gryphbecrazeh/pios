const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderedSkuSchema = new Schema({
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
	order_placed: {
		type: Date,
		required: true
	},
	category: {
		type: String
	},
	note: {
		type: String
	},
	user: {
		type: String,
		required: true
	},
	manufacturer: {
		type: String
	},
	vendor: {
		type: String
	},
	brand: {
		type: String
	},
	sku_condition: {
		type: String
	},
	skus_quantity: {
		type: Number,
		required: true,
		default: 1
	},
	price: {
		type: Number
	},
	localPrice: {
		type: Number
	},
	mapPrice: {
		type: Number
	},
	salePrice: {
		type: Number
	},
	Cost: {
		type: Number
	},
	weight: {
		type: Number
	},
	shippingWeight: {
		type: Number
	},
	dim_width: {
		type: Number
	},
	dim_depth: {
		type: Number
	},
	dim_height: {
		type: Number
	},
	ship_dim_width: {
		type: Number
	},
	ship_dim_depth: {
		type: Number
	},
	ship_dim_height: {
		type: Number
	}
});

module.exports = OrderedSku = mongoose.model("orderedSku", OrderedSkuSchema);
