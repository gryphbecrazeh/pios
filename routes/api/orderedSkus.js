const express = require("express");
const router = express.Router();

// OrderedSku Model
const OrderedSku = require("../../models/OrderedSku");

// @route GET api/orderedSkus
// @desc get ALL orderedSkus for an order
// @accesss PUBLIC
router.get("/:id", (req, res) => {
	OrderedSku.find()
		.sort({ date: -1 })
		.then(orderedSku => {
			if (req.params.id) {
				return res.json(
					orderedSku.filter(
						orderedSku => orderedSku.order_number === req.params.id
					)
				);
			} else {
				return res.json(orderedSku);
			}
		});
});
// @route DELETE api/orderedSkus:id
// @desc delete orderedSku
// @accesss Private
router.delete("/:id", (req, res) => {
	OrderedSku.findById(req.params.id)
		.then(orderedSku =>
			orderedSku.remove().then(() => res.json({ success: true }))
		)
		.catch(err => res.status(404).json({ success: false }));
});

// @route PUT api/orderedSkus:id
// @desc edit orderedSku
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
		order_placed,
		skus_quantity
	} = req.body;
	// Simple Validation
	if (!customer_order || !order_number || !order_placed || !skus_quantity) {
		return res.status(400).json({ msg: "Please Enter All Fields" });
	}
	if (!user) {
		return res.status(400).json({
			msg: "You must be logged in to add a product to a customer order"
		});
	}
	let newOrderedSku = new OrderedSku(req.body);
	newOrderedSku
		.save()
		.then(item => {
			return res.json(item);
		})
		.catch(err => console.log(err));
});

module.exports = router;
