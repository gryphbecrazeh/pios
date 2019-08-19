const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PaymentSchema = new Schema({
	order_number: {
		type: String,
		required: true
	},
	order_id: {
		type: String,
		required: true,
		unique: true
	},
	payment_type: {
		type: String,
		require: true
	},
	payment_date: {
		type: Date,
		default: Date.now
    },
    total_due:{
        type:Number,
        required:true
    },
    total_paid:{
        type:Number,
        required:true
    },
    remaining_balance:{
        type:Number,
        required:true
    },
    note:{
        type:String,
        required:false
    },
    user:{
        type:String,
        required:true
    }
});

module.exports = Payment = mongoose.model("payment", PaymentSchema);