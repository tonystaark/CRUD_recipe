const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  images: {
    publicId: { type: String, required: true },
    publicUrl: { type: String, required: true },
  },
  ingredients: [
    {
      ingredient: { type: String, required: true },
      amount: { type: String, required: true },
    },
  ],
  instructions: [String],
});

const recipeModel = new mongoose.model("Recipe", recipeSchema);

module.exports = recipeModel;
