const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// get all notes
router.get("/", async (req, res) => {
  const notes = await Note.find().sort({ updatedAt: -1 });
  res.json(notes);
});

// get single note
router.get("/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.json(note);
});

// create note
router.post("/", async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
});

// update note
router.put("/:id", async (req, res) => {
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(note);
});

// delete note
router.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
