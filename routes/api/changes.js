const express = require("express");
const router = express.Router();

// Change Model
const Change = require("../../models/Change");
// @route GET api/changes
// @desc get ALL changes
// @accesss PUBLIC
router.get("/", (req, res) => {
	Change.find()
		.sort({ date: -1 })
		.then(changes => {
			return res.json(changes);
		});
});
// @route GET api/changes
// @desc get ALL changes for specific order
// @accesss PUBLIC
router.get("/:id", (req, res) => {
	Change.find()
		.sort({ date: -1 })
		.then(changes => {
			return res.json(
				changes.filter(change => change.order_number === req.params.id)
			);
		});
});
// @route DELETE api/change:id
// @desc delete change
// @accesss Private
router.delete("/:id", (req, res) => {
	Change.findById(req.params.id)
		.then(change => change.remove().then(() => res.json({ success: true })))
		.catch(err => res.status(404).json({ success: false }));
});

// @route PUT api/changes:id
// @desc edit change
// @accesss Private
router.put("/:id", (req, res) => {});

// @route POST api/changes
// @desc make new change
// @accesss Private
router.post("/", (req, res) => {
	const { customer_order, order_number, user, previous, current } = req.body;
	// Simple Validation
	if (!customer_order || !order_number || !previous || !current) {
		return res.status(400).json({ msg: "Please Enter All Fields" });
	}
	if (!user) {
		return res
			.status(400)
			.json({ msg: "You must be logged in to make changes to an order" });
	}
	let newChange = new Change(req.body);
	newChange
		.save()
		.then(item => {
			return res.json({
				item: item,
				success: true,
				msg: "Change Made"
			});
		})
		.catch(err => console.log(err));
});

module.exports = router;
