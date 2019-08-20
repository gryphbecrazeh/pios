const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
	creation_date: {
		type: Date,
		default: Date.now
	},
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
	custPaid: {
		type: Number,
		required: false,
		default: 0.0
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
		type: Boolean,
		required: false,
		default: false
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
	nysTaxPaid: {
		type: Number,
		required: false,
		default: 0
	},
	nysTaxPaidDate: {
		type: Date,
		required: false
	},
	caTax: {
		type: Number,
		required: false
	},
	caTaxPaid: {
		type: Number,
		required: false,
		default: 0
	},
	caTaxPaidDate: {
		type: Date,
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
	},
	lastUpdated: {
		type: String,
		default: "Order has never been editted"
	},
	orderSkus: {
		type: Array,
		required: false
	},
	billToAddress: {
		type: String,
		required: false
	},
	shipToAddress: {
		type: String,
		required: false
	},
	billToState: {
		type: String,
		required: false
	},
	billToZip: {
		type: String,
		required: false
	},
	shipToZip: {
		type: String,
		required: false
	},
	netPaid: {
		type: Number,
		required: false,
		default: 0.0
	}
});

module.exports = Item = mongoose.model("item", ItemSchema);
