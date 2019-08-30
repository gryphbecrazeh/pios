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
	let { sendFilters } = req.query;
	let getReqFilters = JSON.parse(sendFilters) || null;
	filterDate = array => {
		if (array) {
			let range1 = getReqFilters.sortStart;
			let range2 = getReqFilters.sortEnd;
			let arrangeDates = range2 > range1;
			let start = arrangeDates === true ? range1 : range2;
			let end = arrangeDates === true ? range2 : range1;
			// Determine if show all is active, if it is, return the unfiltered result
			let result = !getReqFilters.showAll
				? array.filter(
						item =>
							new Date(item.date) >= new Date(start) &&
							new Date(item.date) <= new Date(end)
				  )
				: array;
			return result;
		}
		return array;
	};
	filterQuery = array => {
		if (array) {
			let result = array.filter(
				item =>
					item.name.match(new RegExp(getReqFilters.searchQuery, "gmi")) ||
					item.orderNum.match(new RegExp(getReqFilters.searchQuery, "gmi"))
			);
			return getReqFilters.searchQuery !== null || "" ? result : array;
		}
		return array;
	};
	getAllItems = () => {
		Item.find()
			.sort({ date: -1 })
			.then(items => {
				return res.json({
					items: items
				});
			});
	};
	getFilteredItems = () => {
		if (cache[req.url]) {
			return res.json(cache[req.url]);
		}

		Item.find()
			.sort({ date: -1 })
			.then(items => {
				// add filter of results here
				let results = filterQuery(filterDate(items));
				let response = {
					items: items,
					filteredResults: results
				};
				cache[req.url] = response;
				return res.json(response);
			});
	};
	getReqFilters ? getFilteredItems() : getAllItems();
	// getAllItems();
});
// @route POST api/items
// @desc create item
// @accesss Private
router.post("/", (req, res) => {
	cache = [];
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
	cache = [];
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
	cache = [];
	Item.findById(req.params.id)
		.then(item => item.remove().then(() => res.json({ success: true })))
		.catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
