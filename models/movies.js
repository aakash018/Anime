const mongoose = require("mongoose");
const path = require("path");
const coverImgBasePath = "uploads/movieCovers";

const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  coverImage: {
    type: String,
    required: true,
  },
  character: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Character",
  },

  duration: {
    type: Number,
  },
});

moviesSchema.virtual("coverImagePath").get(function () {
  if (this.coverImage != null) {
    return path.join("/", coverImgBasePath, this.coverImage);
  }
});

module.exports = mongoose.model("Movies", moviesSchema);
module.exports.coverImgBasePath = coverImgBasePath;
