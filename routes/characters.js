const express = require("express");
const router = express.Router();
const Character = require("../models/character");
const Movies = require("../models/movies");
// All Character
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const characters = await Character.find(searchOptions);
    res.render("characters/index", {
      characters: characters,
      searchOptions: req.query,
    });
  } catch {
    res.render("/");
  }
});

// New Character
router.get("/new", (req, res) => {
  res.render("characters/new", { character: new Character() });
});

// Creat
router.post("/", async (req, res) => {
  const character = new Character({
    name: req.body.name,
  });

  try {
    const newCharacter = await character.save();
    res.redirect(`/characters/${newCharacter.id}`);
    res.redirect("/characters");
  } catch {
    res.render("characters/new", {
      character: character,
      errorMessage: "Error Creating",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    const movies = await Movies.find({ character: character.id })
      .limit(10)
      .exec();
    res.render("characters/show", {
      character: character,
      movieByCharacter: movies,
    });
  } catch {}
});

router.get("/:id/edit", async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    res.render("characters/edit", { character: character });
  } catch {
    res.redirect("/index");
  }
});
router.put("/:id", async (req, res) => {
  let character;
  try {
    character = await Character.findById(req.params.id);
    character.name = req.body.name;
    await character.save();
    res.redirect(`/characters/${character.id}`);
  } catch {
    if (character == null) {
      res.redirect("/");
    } else {
      res.render("characters/edit", {
        character: character,
        errorMessage: "Error Updating",
      });
    }
  }
});

router.delete("/:id", async (req, res) => {
  let character;
  try {
    character = await Character.findById(req.params.id);
    await character.remove();
    res.redirect("/characters");
  } catch {
    if (character == null) {
      res.redirect("/");
    } else {
      res.redirect(`/characters/${character.id}`);
    }
  }
});

module.exports = router;
