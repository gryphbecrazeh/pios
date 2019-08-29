const express = require("express");
const router = express.Router();

// Claim Model
const Claim = require("../../models/Claim");

// @route GET api/claims
// @desc get ALL claims for an order
// @accesss PUBLIC
router.get("/:id", (req, res) => {
	Claim.find()
		.sort({ date: -1 })
		.then(claims => {
			if (req.params.id) {
				return res.json(
					claims.filter(claim => claim.order_number === req.params.id)
				);
			} else {
				return res.json(claims);
			}
		});
});
// @route DELETE api/claims:id
// @desc delete claim
// @accesss Private
router.delete("/:id", (req, res) => {
	Claim.findById(req.params.id)
		.then(claim => claim.remove().then(() => res.json({ success: true })))
		.catch(err => res.status(404).json({ success: false }));
});

// @route PUT api/claims:id
// @desc edit claim
// @accesss Private
router.put("/:id", (req, res) => {});

// @route POST api/claims
// @desc make new claim
// @accesss Private
router.post("/", (req, res) => {
	const {
		customer_order,
		order_number,
		user,
		subject,
		category,
		date_reported,
		date_purchased,
		body
	} = req.body;
	// Simple Validation
	if (
		!customer_order ||
		!order_number ||
		!subject ||
		!category ||
		!date_reported ||
		!date_purchased ||
		!body
	) {
		return res.status(400).json({ msg: "Please Enter All Fields" });
	}
	if (!user) {
		return res
			.status(400)
			.json({ msg: "You must be logged in to create a claim" });
	}
	let newClaim = new Claim(req.body);
	newClaim
		.save()
		.then(item => {
			return res.json(item);
		})
		.catch(err => console.log(err));
});

module.exports = router;
