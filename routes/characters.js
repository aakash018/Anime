const express = require("express");
const router = express.Router();
const Character = require("../models/character");

// All Character
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const characters = await Character.find(searchOptions);
    console.log("1");
    console.log(characters);
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
    // res.redirect(`characters/${newCharacter.id}`)
    res.redirect("characters");
  } catch {
    res.render("characters/new", {
      character: character,
      errorMessage: "Error Creating",
    });
  }
});

module.exports = router;
