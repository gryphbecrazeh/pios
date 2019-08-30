const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item Model
const Item = require("../../models/Item");

// Cacheing
const cache = [];

// @route GET api/items
// @desc get ALL items
// @accesss PUBLIC
router.get("/", (req, res) => {
	let { filters } = req.body;
	Item.find()
		.sort({ date: -1 })
		.then(items => {
			// add filter of results here
			let results = items;
			return res.json(results);
		});
});
// @route POST api/items
// @desc create item
// @accesss Private
router.post("/", (req, res) => {
	let { name, orderNum, date } = req.body;
	// Simple Validation
	if (!name || !orderNum || !date) {
		return res.status(400).json({ msg: "Please Enter ALL Required Fields" });
	}
	const newItem = new Item({
		...req.body
	});
	newItem.save().then(item => {
		res.json({ item: item, success: true, msg: "Product Added to Order" });
	});
});

// @route PUT api/items:id
// @desc edit item
// @accesss Private
router.put("/:id", (req, res) => {
	const { order } = req.body;
	Item.findByIdAndUpdate(order._id, order, { useFindAndModify: false })
		.then(item => {
			res.json({ success: true, msg: "Save Successful" });
		})
		.catch(err => {
			res.json(err);
		});
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
