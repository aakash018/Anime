const express = require("express");
const router = express.Router();
const Movies = require("../models/character");

// All Movies
router.get("/", async (req, res) => {
  res.render("movies/index");
});

// New Character
router.get("/new", (req, res) => {
  res.render("movies/new");
});

// Creat
router.post("/", async (req, res) => {
  res.send("Creat");
});

module.exports = router;
