const validRecipeData = {
  body: {
    title: "burger",
    images: {
      publicId: "burger",
      publicUrl: "http://burger.jpg",
    },
    ingredients: [
      {
        ingredient: "bread",
        amount: "2 pieces",
      },
      {
        ingredient: "patty",
        amount: "1",
      },
    ],
    instructions: ["fry the patties", "Put the patty within the bread"],
  },
};

const invalidRecipeData = {
  body: {
    ...validRecipeData.body,
    author: "Jack Sparrow",
  },
};

const noTitleRecipe = {
  body: {
    ...validRecipeData.body,
    title: undefined,
  },
};

const updatedValidRecipeData = {
  body: {
    title: "fish and chips",
    images: {
      publicId: "fishandchips",
      publicUrl: "http://fishandchips.jpg",
    },
    ingredients: [
      {
        ingredient: "fish",
        amount: "2 pieces",
      },
      {
        ingredient: "chips",
        amount: "plenty",
      },
    ],
    instructions: ["Deep fry the fish", "Deep fry the fries"],
  },
};

module.exports = {
  validRecipeData,
  invalidRecipeData,
  noTitleRecipe,
  updatedValidRecipeData,
};
