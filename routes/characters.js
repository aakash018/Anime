const express = require("express");
const router = express.Router();
const Character = require("../models/character");

// All Character
router.get("/", (req, res) => {
  res.render("characters/index");
});

// New Character
router.get("/new", (req, res) => {
  res.render("characters/new", { character: new Character() });
});

// Creat
router.post("/", (req, res) => {
  res.send(req.body.name);
});

module.exports = router;
