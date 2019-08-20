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

sortByDate = item => {
	return item.sort((a, b) => {
		return this.state.sort === false
			? new Date(a.date) - new Date(b.date)
			: new Date(b.date) - new Date(a.date);
	});
};
sortByTarget = item => {
	return item.sort((a, b) => {
		return this.state.sort === false
			? a[this.state.sortTarget] - b[this.state.sortTarget]
			: b[this.state.sortTarget] - a[this.state.sortTarget];
	});
};
onChangeDate = (target, e) => {
	if (target === "start") {
		this.setState({ startDate: new Date(e) });
	} else {
		this.setState({ endDate: new Date(e) });
	}
};
filterByDateRange = (item, range1, range2) => {
	let arrangeDates = new Date(range2) > new Date(range1);
	let start = arrangeDates === true ? new Date(range1) : new Date(range2);
	let end = arrangeDates === true ? new Date(range2) : new Date(range1);
	return item.filter(
		item => new Date(item.date) >= start && new Date(item.date) <= end
	);
};
toggleSort = e => {
	this.setState({
		sort: !this.state.sort,
		sortTarget: e.target.name
	});
};
onChangeSearch = e => {
	this.setState({
		searchQuery: e.target.value ? e.target.value : false
	});
};
onChangeSeachCriteria = e => {
	let critera = this.props.keys.dbKeysList.filter(
		item => item.value === e.target.value
	)[0];
	this.setState({
		searchTarget: critera.value,
		searchTargetLabel: critera
	});
};
search = item => {
	return item.filter(order =>
		order[this.state.searchTarget].match(
			new RegExp(
				`${this.state.searchQuery === false ? ".+" : this.state.searchQuery}`,
				"gmi"
			)
		)
	);
};
