const express = require("express");
const router = express.Router();

// Note Model
const Note = require("../../models/Note");

// @route GET api/notes
// @desc get ALL notes
// @accesss PUBLIC
router.get("/:id", (req, res) => {
	Note.find()
		.sort({ date: -1 })
		.then(notes => {
			return res.json(
				notes.filter(note => note.order_number === req.params.id)
			);
		});
});
// @route DELETE api/notes:id
// @desc delete note
// @accesss Private
router.delete("/:id", (req, res) => {
	Note.findById(req.params.id)
		.then(note => note.remove().then(() => res.json({ success: true })))
		.catch(err => res.status(404).json({ success: false }));
});

// @route PUT api/notes:id
// @desc edit note
// @accesss Private
router.put("/:id", (req, res) => {});

// @route POST api/notes
// @desc make new note
// @accesss Private
router.post("/", (req, res) => {
	const {
		customer_order,
		order_number,
		note,
		user,
		subject,
		category
	} = req.body;
	// Simple Validation
	if (!customer_order || !order_number || !note || !subject || !category) {
		return res.status(400).json({ msg: "Please Enter All Fields" });
	}
	if (!user) {
		return res
			.status(400)
			.json({ msg: "You must be logged in to create a note" });
	}
	let newNote = new Note(req.body);
	newNote
		.save()
		.then(item => {
			return res.json(item);
		})
		.catch(err => console.log(err));
});

module.exports = router;
