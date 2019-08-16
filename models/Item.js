const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
	date: {
		type: Date,
		required: true
	},
	orderNum: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	st: {
		type: String,
		required: false
	},
	mfr: {
		type: String,
		required: false
	},
	sentTo: {
		type: String,
		required: false
	},
	custDue: {
		type: Number,
		required: false
	},
	custPaidDate: {
		type: Date,
		required: false
	},
	netDue: {
		type: Number,
		required: false
	},
	netPaidDate: {
		type: Date,
		required: false
	},
	disclaim: {
		type: String,
		required: false
	},
	addrCheck: {
		type: String,
		required: false
	},
	rcvd: {
		type: String,
		required: false
	},
	ship: {
		type: String,
		required: false
	},
	shipped: {
		type: Date,
		required: false
	},
	total: {
		type: Number,
		required: false
	},
	nysTax: {
		type: Number,
		required: false
	},
	caTax: {
		type: Number,
		required: false
	},
	net: {
		type: Number,
		required: false
	},
	netCrate: {
		type: Number,
		required: false
	},
	netFreight: {
		type: Number,
		required: false
	},
	notes: {
		type: String,
		required: false
	}
});

module.exports = Item = mongoose.model("item", ItemSchema);
