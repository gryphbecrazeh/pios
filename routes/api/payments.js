const express = require("express");
const router = express.Router();

// Payment Model
const Payment = require("../../models/Payment");
// @route GET api/payments
// @desc get ALL payments
// @accesss PUBLIC
router.get("/:id", (req, res) => {
	Payment.find()
		.sort({ date: -1 })
		.then(payments => {
			console.log(
				payments.filter(
					payment => payment.order_number === req.params.id,
					req.params.id
				)
			);
			return res.json(
				payments.filter(payment => payment.order_number === req.params.id)
			);
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
		customer_order,
		order_number,
		payment_type,
		payment_date,
		total_due,
		total_paid,
		user
	} = req.body;
	// Simple Validation
	if (
		!customer_order ||
		!order_number ||
		!payment_type ||
		!payment_date ||
		!total_due ||
		!total_paid ||
		!user
	) {
		console.log("failed to save payment, missing credentials");
		return res.status(400).json({ msg: "Please Enter All Fields" });
	}
	let newPayment = new Payment(req.body);
	newPayment
		.save()
		.then(item => {
			return res.json(item);
		})
		.catch(err => console.log(err));
});

module.exports = router;
