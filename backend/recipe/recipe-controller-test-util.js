const testInsertedModel = (req, expectedResult) => {
  const data = req.body;
  expect(expectedResult._id).toBeDefined();
  expect(expectedResult.title).toBe(data.title);
  expect(expectedResult.images.publicId).toBe(data.images.publicId);
  expect(expectedResult.images.publicUrl).toBe(data.images.publicUrl);
  for (let i in expectedResult.ingredients) {
    expect(expectedResult.ingredients[i].ingredient).toBe(
      data.ingredients[i].ingredient
    );
    expect(expectedResult.ingredients[i].amount).toBe(
      data.ingredients[i].amount
    );
    expect(expectedResult.ingredients[i]._id).toBeDefined();
  }

  for (let i in expectedResult.instructions) {
    expect(expectedResult.instructions[i]).toBe(data.instructions[i]);
  }
};

module.exports = { testInsertedModel };
