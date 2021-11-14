const RecipeModel = require("./recipe-model.js");
const {
  validRecipeData,
  invalidRecipeData,
  noTitleRecipe,
  updatedValidRecipeData,
} = require("./recipe-sample-data");
const recipe = require("./recipe-controller");
const { testInsertedModel } = require("./recipe-controller-test-util");

const mongoose = require("mongoose");

describe("Recipe Test", () => {
  const { createRecipe, getAllRecipes, getRecipe, deleteRecipe, updateRecipe } =
    recipe(RecipeModel);
  let savedRecipe;
  let firstRecipeId;
  let secondRecipeId;
  beforeAll(async () => {
    await mongoose.connect(
      global.__MONGO_URI__,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  afterAll((done) => {
    mongoose.connection.close();
    done();
  });

  it("should create and save new recipe successfully", async () => {
    savedRecipe = await createRecipe(validRecipeData);
    firstRecipeId = savedRecipe._id;
    testInsertedModel(validRecipeData, savedRecipe);
  });

  //TEST SCHEMA
  it("should insert recipe successfully, but the field does not defined in schema should be undefined", async () => {
    const savedInvalidRecipe = await createRecipe(invalidRecipeData);
    secondRecipeId = savedInvalidRecipe._id;
    expect(secondRecipeId).toBeDefined();
    expect(savedInvalidRecipe.author).toBeUndefined();
  });

  //TEST VALIDATION
  it("should fail if create recipe without required field", async () => {
    let err;
    try {
      const savedUserWithoutRequiredField = await createRecipe(noTitleRecipe);
      error = savedUserWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.title).toBeDefined();
  });

  it("should read all recipe data from the same schema", async () => {
    const allRecipes = await getAllRecipes();
    expect(allRecipes.length).toBe(2);
  });

  it("should read the specified object from the schema", async () => {
    const recipe = await getRecipe(firstRecipeId);
    expect(recipe._id).toStrictEqual(firstRecipeId);
  });

  it("should delete the specified object from the schema", async () => {
    await deleteRecipe(firstRecipeId);
    const getRecipeAttempt = await getRecipe(firstRecipeId);
    expect(getRecipeAttempt).toBe(null);
  });

  it("should update the specified object from the schema", async () => {
    const updatedRecipe = await updateRecipe({
      params: {
        recipeId: secondRecipeId,
      },
      ...updatedValidRecipeData,
    });
    testInsertedModel(updatedValidRecipeData, updatedRecipe);
  });
});
