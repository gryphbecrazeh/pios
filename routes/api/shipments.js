const express = require("express");
const router = express.Router();

// Shipment Model
const Shipment = require("../../models/Shipment");

// Cache
let cache = [];

// @route GET api/shipments
// @desc Get all shipments
// @access PUBLIC
router.get("/", (req, res) => {
	Shipment.find()
		.sort({ date: -1 })
		.then(shipments => {
			res.json({
				shipments: shipments,
				msg: "Success",
				success: true
			});
		})
		.catch(err => res.json({ success: false, msg: err, err: err }));
});
// @route POST api/shipments
// @desc Add new shipment
// @access PUBLIC

router.post("/", (req, res) => {
	cache = [];
	let {
		order_number,
		customer_order,
		tracking_number,
		carrier,
		weight_ship
	} = req.body;
	if (
		!order_number ||
		!customer_order ||
		!tracking_number ||
		!carrier ||
		!weight_ship
	)
		res.status(400).json({ msg: "Please enter all fields" });
	const newShipment = new Shipment({ ...req.body });
	newShipment
		.save()
		.then(item => {
			res.json({
				shipment: item,
				success: true,
				msg: "Shipment Successfully Created"
			});
		})
		.catch(err => res.json({ success: false, msg: err, err: err }));
});

// @route PUT api/shipments
// @desc Edit Shipment
// @access PUBLIC
router.put("/:id", (req, res) => {
	cache = [];
	const updatedShipment = req.body;
	Shipment.findByIdAndUpdate(updatedShipment._id, updatedShipment, {
		useFindAndModify: false
	})
		.then(item => {
			res.json({ success: true, msg: "Shipment Successfully Updated" });
		})
		.catch(err => res.json({ success: false, msg: err, err: err }));
});

// @route DELETE api/shipments
// @desc Delete Specific shipment
// @access PUBLIC
router.put("/:id", (req, res) => {
	cache = [];
	Shipment.findById(req.params.id)
		.then(item =>
			item
				.remove()
				.then(() =>
					res.json({ success: true, msg: "Shipment Successfully Deleted" })
				)
		)
		.catch(err =>
			res
				.status(404)
				.json({ success: false, msg: "Shipment Not Found", err: err })
		);
});

module.exports = router;
