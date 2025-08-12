const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  status: String,
  contact: String,
  date: { type: Date, default: Date.now }
});

const Item = mongoose.model("Item", itemSchema);

router.post("/", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json({ message: "Item added" });
});

router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

module.exports = router;