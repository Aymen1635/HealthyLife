const express = require("express");
const router = express.Router();
const db = require("../../db");

// GET: Fetch all news items
router.get("/", async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM news");
    res.status(200).json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Bir hata meydana geldi.",
    });
  }
});

// GET: Fetch news by ID
router.get("/:NewsID", async (req, res, next) => {
  try {
    const NewsId = req.params.NewsID;

    const result = await db.query("SELECT * FROM news WHERE id = ?", [NewsId]);

    if (result[0].length === 0) {
      res.status(404).json({});
    } else {
      res.status(200).json(result[0][0]); // Return the first object
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Bir hata meydana geldi.",
    });
  }
});

// GET: Fetch news sorted by date
router.get("/sort/:SortBy", async (req, res, next) => {
  try {
    if (req.params.SortBy === "date") {
      const result = await db.query("SELECT * FROM news ORDER BY date ASC");
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({
        message: "Böyle bir sıralama yok",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Bir hata meydana geldi.",
    });
  }
});

module.exports = router;
