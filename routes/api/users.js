const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/User");
// @route GET api/users
// @desc get ALL users
// @accesss PUBLIC
router.get("/", (req, res) => {
	User.find()
		.sort({ date: -1 })
		.then(users => res.json(users));
});
// @route DELETE api/users:id
// @desc delete user
// @accesss Private
router.delete("/:id", (req, res) => {
	User.findById(req.params.id)
		.then(user => user.remove().then(() => res.json({ success: true })))
		.catch(err => res.status(404).json({ success: false }));
});
// @route EDIT api/users:id
// @desc edit user
// @accesss Private
router.delete("/:id", (req, res) => {
	User.findById(req.params.id)
		.then(user => user.remove().then(() => res.json({ success: true })))
		.catch(err => res.status(404).json({ success: false }));
});

// @route POST api/Users
// @desc Register New User
// @accesss Private
router.post("/", (req, res) => {
	const { name, email, password } = req.body;

	// Simple Validation
	if (!name || !email || !password) {
		return res.status(400).json({ msg: "Please Enter All Fields" });
	}

	// Check Existing User
	User.findOne({ email }).then(user => {
		if (user) return res.status(400).json({ msg: "User already exists" });

		const newUser = new User({
			name,
			email,
			password
		});

		// Create salt & hash
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser.save().then(user => {
					jwt.sign(
						{ id: user.id },
						config.get("jwtSecret"),
						{ expiresIn: 3600 },
						(err, token) => {
							if (err) throw err;
							res.json({
								token,
								user: {
									id: user.id,
									name: user.name,
									email: user.email
								}
							});
						}
					);
				});
			});
		});
	});
});

module.exports = router;
