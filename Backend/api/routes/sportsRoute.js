const express = require("express");
const router = express.Router();
const db = require("../../db");

// Get all sports
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM sports");
    if (result[0].length === 0) {
      return res.status(404).json({ message: "No sports found." });
    }
    res.status(200).json({ count: result[0].length, sports: result[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching sports." });
  }
});

// Get sport by SportsID
router.get("/SportsID/:SportsID", async (req, res) => {
  try {
    const { SportsID } = req.params;
    const result = await db.query("SELECT * FROM sports WHERE SportsID = ?", [SportsID]);
    if (result[0].length === 0) {
      return res.status(404).json({ message: `No sport found with ID ${SportsID}.` });
    }
    res.status(200).json(result[0][0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching the sport." });
  }
});

// Get sports by Type
router.get("/type/:Type", async (req, res) => {
  try {
    const { Type } = req.params;
    const result = await db.query("SELECT * FROM sports WHERE Type = ?", [Type]);
    if (result[0].length === 0) {
      return res.status(404).json({ message: `No sports found for type ${Type}.` });
    }
    res.status(200).json({ count: result[0].length, sports: result[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching sports by type." });
  }
});

module.exports = router;
