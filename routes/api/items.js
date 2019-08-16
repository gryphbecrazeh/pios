const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item Model
const Item = require("../../models/Item");

// @route GET api/items
// @desc get ALL items
// @accesss PUBLIC
router.get("/", (req, res) => {
	Item.find()
		.sort({ date: -1 })
		.then(items => res.json(items));
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
		name: req.body.name,
		orderNum: req.body.orderNum,
		date: req.body.date,
		st: req.body.st,
		mfr: req.body.mfr,
		sentTo: req.body.sentTo,
		custDue: req.body.custDue,
		custPaidDate: req.body.custPaidDate,
		netDue: req.body.netDue,
		netPaidDate: req.body.netPaidDate,
		disclaim: req.body.disclaim,
		addrCheck: req.body.addrCheck,
		rcvd: req.body.rcvd,
		ship: req.body.ship,
		shipped: req.body.shipped,
		total: req.body.total,
		nysTax: req.body.nysTax,
		caTax: req.body.caTax,
		net: req.body.net,
		netCrate: req.body.netCrate,
		netFreigt: req.body.netFreigt,
		notes: req.body.notes
	});
	newItem.save().then(item => res.json(item));
});

// @route PUT api/items:id
// @desc edit item
// @accesss Private
router.put("/:id", (req, res) => {
	const { order } = req.body;
	Item.findByIdAndUpdate(order._id, order, { useFindAndModify: false }).catch(
		err => {
			res.json(err);
			console.log(err);
		}
	);
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
