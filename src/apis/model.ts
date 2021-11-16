export interface IIngredients {
  name: string;
  amount: string
}

export interface IImageAssets {
  publicId: string;
  publicUrl: string;
}

export interface IPostNewRecipeRequest {
  title: string;
  images: IImageAssets;
  ingredients: IIngredients[];
  instructions: string[]
}

export interface IPostNewRecipeResponse {
  title: string;
  images: IImageAssets;
  ingredients: IIngredients[];
  instructions: string[];
  _id: string;
  _v: number;
}