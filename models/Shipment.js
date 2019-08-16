const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ShipmentSchema = new Schema({
	date: {
		type: Date,
		default: Date.now
	},
	orderNum: {
		type: String,
		required: true
	},
	unpackagedSkus: {
		type: String,
		required: true
	}
});

module.exports = User = mongoose.model("user", UserSchema);
