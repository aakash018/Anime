const mongoose = require("mongoose");

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
    type: Buffer,
    required: true,
  },

  coverImageType: {
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

  rating: {
    type: Number,
    required: true,
  },
});

moviesSchema.virtual("coverImagePath").get(function () {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data: ${
      this.coverImageType
    }; charset = utf-8; base64, ${this.coverImage.toString("base64")}`;
  }
});

module.exports = mongoose.model("Movies", moviesSchema);
