const express = require("express");
const router = express.Router();
const Movies = require("../models/movies");

router.get("/", async (req, res) => {
  let movies;
  try {
    movies = await Movies.find().sort({ createdDate: "desc" }).limit(10).exec();
  } catch {
    movies = [];
  }
  res.render("index", {
    movies: movies,
  });
});

module.exports = router;
