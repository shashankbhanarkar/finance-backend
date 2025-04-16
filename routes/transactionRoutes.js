const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// GET all
router.get("/", async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.json(transactions);
});

// GET one
router.get("/:id", async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  res.json(transaction);
});

// POST new
router.post("/", async (req, res) => {
  const newTx = new Transaction(req.body);
  const saved = await newTx.save();
  res.json(saved);
});

// PUT edit
router.put("/:id", async (req, res) => {
  const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
