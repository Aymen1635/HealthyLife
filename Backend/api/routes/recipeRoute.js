const express = require("express");
const router = express.Router();
const db = require("../../db");

// Utility function to format recipe data
const formatRecipeData = (recipes) => ({
  count: recipes.length,
  recipes: recipes.map((recipe) => ({
    id: recipe.recipeID,
    name: recipe.name,
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
  })),
});

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const [recipes] = await db.query("SELECT * FROM recipes");
    if (recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found." });
    }
    res.status(200).json(formatRecipeData(recipes));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching recipes." });
  }
});

// Get recipe by ID
router.get("/:RecipeID", async (req, res) => {
  try {
    const RecipeID = req.params.RecipeID;
    const [recipes] = await db.query("SELECT * FROM recipes WHERE recipeID = ?", [RecipeID]);
    if (recipes.length === 0) {
      return res.status(404).json({ message: `No recipe found with ID ${RecipeID}.` });
    }
    res.status(200).json(formatRecipeData(recipes));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching the recipe." });
  }
});

module.exports = router;
