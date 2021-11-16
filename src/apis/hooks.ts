
import { useQuery, useMutation, UseQueryResult } from 'react-query';
import { 
  getAllRecipes, 
  getRecipe, 
  createRecipe, 
  deleteRecipe,
  updateRecipe,
  removeImage
} from './api';
import QUERY_KEYS from  './keys';
import { IPostNewRecipeResponse,IPostNewRecipeRequest } from '../apis/model';


const useGetAllRecipes = (): UseQueryResult<IPostNewRecipeResponse[]> => 
    useQuery(QUERY_KEYS.GET_ALL_RECIPES, () => getAllRecipes().then(res => res.data), {
      refetchOnWindowFocus: false
    });
    
const useGetRecipe = (recipeId: string): UseQueryResult<IPostNewRecipeResponse> => 
  useQuery([QUERY_KEYS.GET_RECIPE,recipeId], () => getRecipe(recipeId).then(res => res.data), {
    refetchOnWindowFocus: false
  });

const useDeleteRecipe = (
  onSuccess?: (res:any) => void,
  onError?: (err:any) => void,
  onSettled?: (res: any) => void
) =>  
  useMutation(
    [QUERY_KEYS.GET_ALL_RECIPES], 
    (recipeId: string) =>  deleteRecipe(recipeId), 
    {
      onSuccess,
      onError,
      onSettled,
    }
);

const useCreateRecipe = (
  onSuccess?: (res:any) => void,
  onError?: (err:any) => void,
  onSettled?: (res: any) => void
) =>  
  useMutation(
    QUERY_KEYS.CREATE_RECIPE, 
    (recipePayload: IPostNewRecipeRequest) =>  createRecipe(recipePayload), 
    {
      onSuccess,
      onError,
      onSettled,
    }
);

const useUpdateRecipe = (
  recipeId: string, 
  onSuccess?: (res:any) => void,
  onError?: (err:any) => void,
  onSettled?: (res: any) => void
) =>  
  useMutation(
    [QUERY_KEYS.UPDATE_RECIPE, recipeId] ,
    (recipePayload: IPostNewRecipeRequest) =>  updateRecipe(recipeId, recipePayload), 
    {
      onSuccess,
      onError,
      onSettled,
    }
);

export {
  useGetAllRecipes,
  useDeleteRecipe,
  useGetRecipe,
  useCreateRecipe,
  useUpdateRecipe
}