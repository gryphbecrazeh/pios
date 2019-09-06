const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Product Model
const Product = require("../../models/Product");

let cache = [];

// @route GET api/products
// @desc get ALL products
// @accesss PUBLIC
router.get("/", (req, res) => {
	if (!cache[req.url])
		Product.find()
			.sort({ date: -1 })
			.then(items => {
				// add filter of results here
				let results = items;
				cache[req.url] = results;
				return res.json(results);
			});
	else return res.json(cache[req.url]);
});
// @route POST api/products
// @desc create product
// @accesss Private
router.post("/", (req, res) => {
	let { sku } = req.body;
	let product = req.body;
	// Simple Validation
	if (!sku) {
		return res.status(400).json({ msg: "Please Enter ALL Required Fields" });
	}
	const newProduct = new Product(product);
	newProduct
		.save()
		.then(product => {
			cache = [];
			return res.json({
				item: product,
				success: true,
				msg: "Product Added to DB"
			});
		})
		.catch(err => res.json(err));
});

// @route PUT api/products:id
// @desc edit product
// @accesss Private
router.put("/:id", (req, res) => {
	const { product } = req.body;
	product.dateEditted = Date.now();
	Product.findByIdAndUpdate(product._id, product, { useFindAndModify: false })
		.then(res => {
			cache = [];
			return res.json({ success: true });
		})
		.catch(err => {
			res.json(err);
		});
});

// @route DELETE api/products:id
// @desc delete product
// @accesss Private
router.delete("/:id", auth, (req, res) => {
	Product.findById(req.params.id)
		.then(product =>
			product.remove().then(() => {
				cache = [];
				return res.json({ success: true });
			})
		)
		.catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
