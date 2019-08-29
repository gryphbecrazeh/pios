const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
	dateEditted: {
		type: Date,
		default: Date.now()
	},
	status: {
		type: String
	},
	sku: {
		type: String,
		required: true
	},
	manufacturer: {
		type: String,
		required: false
	},
	manufacturerSku: {
		type: String,
		required: false
	},
	cost: {
		type: Number,
		required: false
	},
	costDaroma: {
		type: Number
	},
	weight: {
		type: Number,
		required: false
	},
	weightShip: {
		type: Number
	},
	distributer: {
		type: String
	},
	brand: {
		type: String
	},
	price: {
		type: Number
	},
	specialPrice: {
		type: Number
	},
	priceMap: {
		type: Number
	},
	priceLocal: {
		type: Number
	},
	priceList: {
		type: Number
	}
});

module.exports = Product = mongoose.model("product", ProductSchema);
