const express = require("express");
const router = express.Router();
const db = require("../../db");

// Utility function to format food data
const formatFoodData = (foods) => ({
  "Listelenen girdi sayısı": foods.length,
  Yemekler: foods.map((food) => ({
    "Yemek-İsmi": food.Name,
    "Kalori miktar": food.Calories,
    Tip: food.Type,
    Yağ: food.Fat,
    "Karbonhidrat-Oranı": food.Carbohydrate,
    "Protein-miktarı": food.Protein,
    "Doğrulanmış-Ürün-Mü": food.IsApproved,
  })),
});

// GET: Fetch all foods
router.get("/", async (req, res) => {
  try {
    const [foods] = await db.query("SELECT * FROM foods");
    res.status(200).json(formatFoodData(foods));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Bir hata meydana geldi." });
  }
});

// GET: Fetch food by ID from request body
router.get("/by-body", async (req, res) => {
  try {
    const { FoodID } = req.body;
    const [foods] = await db.query("SELECT * FROM foods WHERE FoodID = ?", [FoodID]);

    if (foods.length === 0) {
      return res.status(404).json({ message: "Yemek bulunamadı." });
    }

    res.status(200).json(formatFoodData(foods));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Bir hata meydana geldi." });
  }
});

// GET: Fetch food by ID from URL
router.get("/:FoodID", async (req, res) => {
  try {
    const { FoodID } = req.params;
    const [foods] = await db.query("SELECT * FROM foods WHERE FoodID = ?", [FoodID]);

    if (foods.length === 0) {
      return res.status(404).json({ message: "Yemek bulunamadı." });
    }

    res.status(200).json(formatFoodData(foods));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Bir hata meydana geldi." });
  }
});

// POST: Create a new food
router.post("/", async (req, res) => {
  try {
    const { IsApproved, Type, Name, Calories, Fat, Protein, Carbohydrate } = req.body;

    const query =
      "INSERT INTO foods (IsApproved, Type, Name, Calories, Fat, Protein, Carbohydrate) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [IsApproved, Type, Name, Calories, Fat, Protein, Carbohydrate];
    const nonNull = values.map((value) => (value !== undefined ? value : null));

    await db.execute(query, nonNull);
    res.status(201).json({ message: "Başarıyla oluşturuldu." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Bir hata meydana geldi." });
  }
});

// PATCH: Update food by ID
router.patch("/:FoodID", async (req, res) => {
  try {
    const { FoodID } = req.params;
    const { IsApproved, Type, Name, Calories, Fat, Protein, Carbohydrate } = req.body;

    const query =
      "UPDATE foods SET IsApproved = ?, Type = ?, Name = ?, Calories = ?, Fat = ?, Protein = ?, Carbohydrate = ? WHERE FoodID = ?";
    const values = [IsApproved, Type, Name, Calories, Fat, Protein, Carbohydrate, FoodID];
    const nonNull = values.map((value) => (value !== undefined ? value : null));

    await db.execute(query, nonNull);
    res.status(200).json({ message: "Başarıyla güncellendi." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Bir hata meydana geldi." });
  }
});

// DELETE: Delete food by ID
router.delete("/:FoodID", async (req, res) => {
  try {
    const { FoodID } = req.params;

    await db.execute("DELETE FROM foods WHERE FoodID = ?", [FoodID]);
    res.status(200).json({ message: "Başarıyla silindi." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Bir hata meydana geldi." });
  }
});

module.exports = router;
