const request = require("supertest");
const express = require("express");
const recipeRoute = require("../api/routes/recipeRoute");

const app = express();
app.use(express.json());
app.use("/recipes", recipeRoute);

// Mock database
const mockDb = {
  query: jest.fn(),
};

// Use a factory function to mock the database module
jest.mock("../db", () => ({
  query: (...args) => mockDb.query(...args),
}));

describe("Recipe Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /recipes", () => {
    it("should fetch all recipes", async () => {
      const mockRecipes = [
        { recipeID: 1, name: "Recipe 1", ingredients: "Ingredient 1", steps: "Step 1", prepTime: "10 min", cookTime: "20 min" },
        { recipeID: 2, name: "Recipe 2", ingredients: "Ingredient 2", steps: "Step 2", prepTime: "15 min", cookTime: "25 min" },
      ];
      mockDb.query.mockResolvedValueOnce([mockRecipes]);

      const response = await request(app).get("/recipes");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        count: 2,
        recipes: mockRecipes.map((recipe) => ({
          id: recipe.recipeID,
          name: recipe.name,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          prepTime: recipe.prepTime,
          cookTime: recipe.cookTime,
        })),
      });
    });

    it("should return 404 if no recipes are found", async () => {
      mockDb.query.mockResolvedValueOnce([[]]);

      const response = await request(app).get("/recipes");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "No recipes found." });
    });

    it("should handle database errors", async () => {
      mockDb.query.mockRejectedValueOnce(new Error("Database error"));

      const response = await request(app).get("/recipes");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "An error occurred while fetching recipes." });
    });
  });

  describe("GET /recipes/:RecipeID", () => {
    it("should fetch a recipe by ID", async () => {
      const mockRecipe = [{ recipeID: 1, name: "Recipe 1", ingredients: "Ingredient 1", steps: "Step 1", prepTime: "10 min", cookTime: "20 min" }];
      mockDb.query.mockResolvedValueOnce([mockRecipe]);

      const response = await request(app).get("/recipes/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        count: 1,
        recipes: mockRecipe.map((recipe) => ({
          id: recipe.recipeID,
          name: recipe.name,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          prepTime: recipe.prepTime,
          cookTime: recipe.cookTime,
        })),
      });
    });

    it("should return 404 if recipe is not found", async () => {
      mockDb.query.mockResolvedValueOnce([[]]);

      const response = await request(app).get("/recipes/999");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "No recipe found with ID 999." });
    });

    it("should handle database errors", async () => {
      mockDb.query.mockRejectedValueOnce(new Error("Database error"));

      const response = await request(app).get("/recipes/1");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "An error occurred while fetching the recipe." });
    });
  });
});
