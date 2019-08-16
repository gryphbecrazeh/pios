const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item Model
const Shipment = require("../../models/Shipment");

// @route GET api/orders
// @desc Get ALL orders
// @accesss Private
router.get("/:id", auth, (req, res) => {
	Order.findById(req.params.id)
		.then(order => res.json(order))
		.catch(err => res.status(404).json({ success: false }));
});
// @route POST api/items
// @desc create item
// @accesss Private
router.post("/", auth, (req, res) => {
	const newItem = new Item({
		orderNum: req.body.orderNum,
		unpackagedSkus: req.body.unpackagedSkus
	});
	newItem.save().then(item => res.json(item));
});
// @route DELETE api/items:id
// @desc delete item
// @accesss Private
router.delete("/:id", auth, (req, res) => {
	Item.findById(req.params.id)
		.then(item => item.remove().then(() => res.json({ success: true })))
		.catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
