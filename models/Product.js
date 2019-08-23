const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
	dateEditted: {
		type: Date
	},
	sku: {
		type: String,
		required: true
	},
	manufacturer: {
		type: String,
		required: true
	},
	manufacturerSku: {
		type: String,
		required: true
	},
	cost: {
		type: Number,
		required: true
	},
	weight: {
		type: Number,
		required: true
	},
	distributer: {
		type: String
	},
	brand: {
		type: String
	}
});

module.exports = Product = mongoose.model("product", ProductSchema);
