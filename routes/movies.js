const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Movies = require("../models/movies");
const Character = require("../models/character");
const uploadPath = path.join("public", Movies.coverImgBasePath);
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
  },
});

// All Movies
router.get("/", async (req, res) => {
  let searchOptions = {};
  console.log(req.query.name);
  if (req.query.name != null && req.query.name !== "") {
    console.log("1");
    searchOptions.title = new RegExp(req.query.name, "i");
  }
  try {
    const movies = await Movies.find(searchOptions);
    console.log(searchOptions);
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
router.post("/", upload.single("cover"), async (req, res) => {
  const filename = req.file != null ? req.file.filename : null;
  const movie = new Movies({
    title: req.body.title,
    description: req.body.description,
    character: req.body.character,
    duration: req.body.duration,
    coverImage: filename,
    releaseDate: new Date(req.body.releaseDate),
  });
  try {
    const newMovie = await movie.save();
    // res.redirect(`characters/${newCharacter.id}`)
    res.redirect("movies");
  } catch {
    if (filename != null) {
      removeMovieCovers(movie.coverImage);
    }
    renderNewPage(res, movie, true);
  }
});

async function renderNewPage(res, movie, hasError = false) {
  try {
    const characters = await Character.find({});
    const parms = {
      characters: characters,
      movie: movie,
    };
    if (hasError) parms.errorMessage = "Error Creating";
    res.render("movies/new", parms);
  } catch {
    res.redirect("/movies");
  }
}

function removeMovieCovers(fileName) {
  fs.unlink(path.join(uploadPath, fileName), (err) => {
    if (err) console.log(err);
  });
}

module.exports = router;
