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
// @route DELETE api/items:id
// @desc delete item
// @accesss Private
router.delete("/:id", auth, (req, res) => {
	Item.findById(req.params.id)
		.then(item => item.remove().then(() => res.json({ success: true })))
		.catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
