const express = require("express");
const router = express.Router();

// Payment Model
const Payment = require("../../models/Payment");
// @route GET api/payments
// @desc get ALL payments
// @accesss PUBLIC
router.get("/", (req, res) => {
	Payment.find()
		.sort({ date: -1 })
		.then(payments => {
			return res.json(payments);
		});
});
// @route DELETE api/payments:id
// @desc delete payment
// @accesss Private
router.delete("/:id", (req, res) => {
	Payment.findById(req.params.id)
		.then(user => user.remove().then(() => res.json({ success: true })))
		.catch(err => res.status(404).json({ success: false }));
});

// @route PUT api/payments:id
// @desc edit payment
// @accesss Private
router.put("/:id", (req, res) => {});

// @route POST api/payments
// @desc make new payment
// @accesss Private
router.post("/", (req, res) => {
	const {
		order_id,
		order_number,
		payment_type,
		payment_date,
		total_due,
		total_paid,
		user
	} = req.body;
	// Simple Validation
	if (
		!order_id ||
		!order_number ||
		!payment_type ||
		!payment_date ||
		!total_due ||
		!total_paid ||
		!user
	) {
		return res.status(400).json({ msg: "Please Enter All Fields" });
	}
	let newPayment = new Payment(req.body);
	console.log("req.body", req.body);
	console.log("newPayment", newPayment);
	newPayment.save().then(item => {
		console.log("item", item);
		return res.json(item);
	});
});

module.exports = router;
