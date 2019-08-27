const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const NoteSchema = new Schema({
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
	subject: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	note: {
		type: String,
		required: true
	},
	user: {
		type: String,
		required: true
	}
});

module.exports = Note = mongoose.model("note", NoteSchema);
