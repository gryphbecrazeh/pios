const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ChangeSchema = new Schema({
	previous: {
		type: Object,
		required: true
	},
	current: {
		type: Object,
		required: true
	},
	change_date: {
		type: Date,
		default: Date.now
	},
	user: {
		type: String,
		required: true
	},
	customer_order: {
		type: String,
		required: true
	},
	order_number: {
		type: String,
		required: true
	}
});

module.exports = Change = mongoose.model("change", ChangeSchema);
