const express = require("express");
require("dotenv").config();
const fileUpload = require("express-fileupload");

const mongooseClient = require("./mongooseConnection.config");
const recipe = require("./recipe/recipe-controller");

const RecipeModel = require("./recipe/recipe-model");
const { createRecipe, getAllRecipes, getRecipe, deleteRecipe, updateRecipe } =
  recipe(RecipeModel);
const {
  uploadFile,
  retrieveFile,
  deleteFile,
} = require("./external_api/fileHandling");

const app = express();
app.use(fileUpload());
app.use(express.json());

const port = process.env.PORT || 4040;

app.post("/image", async (req, res) => {
  res.send(await uploadFile(req.files.file));
});

app.get("/image/:imagePublicId", async (req, res) => {
  res.send(await retrieveFile(req.params.imagePublicId));
});

app.delete("/image/:imagePublicId", async (req, res) => {
  res.send(await deleteFile(req.params.imagePublicId));
});

app.post("/recipe", async (req, res) => {
  res.send(await createRecipe(req));
});

app.get("/recipes", async (req, res) => {
  res.send(await getAllRecipes());
});

app.get("/recipe/:recipeId", async (req, res) => {
  res.send(await getRecipe(req.params.recipeId));
});

app.delete("/recipe/:recipeId", async (req, res) => {
  res.send(await deleteRecipe(req.params.recipeId));
});

app.put("/recipe/:recipeId", async (req, res) => {
  res.send(await updateRecipe(req));
});
app.listen(port, () => console.log("listening on 4040"));
