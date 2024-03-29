const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// User Model
const User = require("../../models/User");

// @route POST api/auth
// @desc Auth User
// @accesss PUBLIC
router.post("/", (req, res) => {
	const { email, password } = req.body;

	// Simple Validation
	if (!email || !password) {
		return res.status(400).json({ msg: "Please Enter All Fields" });
	}
	// Check Existing User
	User.findOne({ email }).then(user => {
		if (!user) return res.status(400).json({ msg: "User does not exist" });

		// Validate password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });
			jwt.sign(
				{ id: user.id },
				config.get("jwtSecret"),
				// { expiresIn: 3600 },
				(err, token) => {
					if (err) throw err;
					delete user.password;
					res.json({
						token,
						user: {
							...user._doc
						}
					});
				}
			);
		});
	});
});
// @route GET api/auth/user
// @desc Get User data
// @accesss Private
router.get("/user", auth, (req, res) => {
	User.findById(req.user.id)
		.select("-password")
		.then(user => res.json(user));
});
module.exports = router;
