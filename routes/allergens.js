import fs from "fs";
import express from "express";

const allergensRouter = express.Router();

allergensRouter.get("/", (req, res) => {
  const allergens = JSON.parse(fs.readFileSync("./data/allergens.json"));
  res.json(allergens);
});

allergensRouter.get("/:id", (req, res) => {
  const allergens = JSON.parse(fs.readFileSync("./data/allergens.json"));
  const allergenWithId = allergens.find(
    (allergen) => allergen.letter.toLowerCase() === req.params.id.toLowerCase()
  );
  res.json(allergenWithId);
});

export { allergensRouter };
