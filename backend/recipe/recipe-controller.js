const recipe = (RecipeModel) => ({
  createRecipe: (req) => new RecipeModel(req.body).save(),
  getAllRecipes: () => RecipeModel.find({}),
  getRecipe: (id) => RecipeModel.findById(id),
  deleteRecipe: (id) => RecipeModel.findByIdAndDelete(id),
  updateRecipe: (req) =>
    RecipeModel.findByIdAndUpdate(req.params.recipeId, req.body, { new: true }),
});

module.exports = recipe;
