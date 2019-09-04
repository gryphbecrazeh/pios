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
		type: String,
		required: true
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
	priceLocal: {
		type: Number
	},
	priceMap: {
		type: Number
	},
	salePrice: {
		type: Number
	},
	specialPrice: {
		type: Number
	},
	priceList: {
		type: Number
	},
	cost: {
		type: Number
	},
	costDaroma: {
		type: String
	},
	totalCost: {
		type: Number,
		required: true
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
	},
	sku: {
		type: String,
		required: true
	},
	shipmentStatus: {
		type: String,
		default: "Pending"
	},
	last_updated: {
		type: Date,
		default: Date.now()
	},
	sent_to: {
		type: String
	},
	sent_to_date: {
		type: Date
	},
	options: {
		type: String
	},
	received_date: {
		type: Date
	},
	received_quantity: {
		type: Number
	},
	inStock_date: {
		type: Date
	},
	inStock_quantity: {
		type: Number
	}
});

module.exports = OrderedSku = mongoose.model("orderedSku", OrderedSkuSchema);
