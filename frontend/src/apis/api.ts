import axios from "axios";
import { IPostNewRecipeRequest } from '../apis/model';

const axiosInstance = axios.create({
  baseURL: "",
});

const getAllRecipes = () =>  axiosInstance.get('/recipes');
const createRecipe = (payload:IPostNewRecipeRequest) =>  axiosInstance.post('/recipe', payload);
const getRecipe = (recipeId: string) =>  axiosInstance.get(`/recipe/${recipeId}`);
const deleteRecipe = (recipeId: string) => axiosInstance.delete(`/recipe/${recipeId}`);
const updateRecipe = (recipeId: string, payload:IPostNewRecipeRequest) =>  axiosInstance.put(`/recipe/${recipeId}`, payload);

const uploadImage = (filePath:any) =>  axiosInstance.post('/image', filePath);
const removeImage = (imagePublicId: string) =>  axiosInstance.delete(`/image/${imagePublicId}`);

export { 
  getAllRecipes, 
  createRecipe, 
  getRecipe, 
  deleteRecipe, 
  updateRecipe,
  uploadImage,
  removeImage
};