const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		require: true
	},
	register_date: {
		type: Date,
		default: Date.now
	},
	roles: {
		type: Array,
		default: ["Guest"]
	},
	permissions: {
		type: Array
	}
});

module.exports = User = mongoose.model("user", UserSchema);
