const express = require("express");
const router = express.Router();
const Movies = require("../models/movies");
const Character = require("../models/character");
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

// All Movies
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.title = new RegExp(req.query.name, "i");
  }
  try {
    const movies = await Movies.find(searchOptions);
    res.render("movies/index", {
      movies: movies,
      searchOptions: req.query.name,
    });
  } catch {
    res.render("/");
  }
});

// New Movie
router.get("/new", async (req, res) => {
  renderNewPage(res, new Movies());
});

// Creat
router.post("/", async (req, res) => {
  const movie = new Movies({
    title: req.body.title,
    description: req.body.description,
    character: req.body.character,
    duration: req.body.duration,
    rating: req.body.rating,
    releaseDate: new Date(req.body.releaseDate),
  });

  saveCover(movie, req.body.cover);

  try {
    const newMovie = await movie.save();
    // res.redirect(`characters/${newCharacter.id}`)
    res.redirect("movies");
  } catch {
    renderNewPage(res, movie, true);
  }
});

async function renderNewPage(res, movie, hasError = false) {
  try {
    const characters = await Character.find({});
    const params = {
      characters: characters,
      movie: movie,
    };
    if (hasError) params.errorMessage = "Error Creating";
    res.render("movies/new", params);
  } catch {
    res.redirect("/movies");
  }
}

function saveCover(movie, coverIncoded) {
  try {
    const cover = JSON.parse(coverIncoded);
    if (cover != null && imageMimeTypes.includes(cover.type)) {
      movie.coverImage = new Buffer.from(cover.data, "base64");
      movie.coverImageType = cover.type;
    }
  } catch {
    return;
  }
}

module.exports = router;
