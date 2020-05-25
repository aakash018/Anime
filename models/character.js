const mongoose = require("mongoose");
const Movie = require("./movies");
const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

characterSchema.pre("remove", function (next) {
  Movie.find({ character: this.id }, (err, movies) => {
    if (err) {
      next(err);
    } else if (movies.length > 0) {
      next(new Error("This Lead has movies still"));
    } else {
      next();
    }
  });
});

module.exports = mongoose.model("Character", characterSchema);
