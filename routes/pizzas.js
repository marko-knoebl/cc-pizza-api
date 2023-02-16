import fs from "fs";
import express from "express";

const pizzasRouter = express.Router();

pizzasRouter.get("/", (req, res) => {
  let results = JSON.parse(fs.readFileSync("./data/pizzas.json"));

  // filtering

  if (req.query["name"] !== undefined) {
    const name = req.query["name"];
    results = results.filter((pizza) =>
      pizza.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  if (req.query["avoid-allergen"] !== undefined) {
    const allergen = req.query["avoid-allergen"];
    results = results.filter((pizza) => !pizza.allergens.includes(allergen));
  }
  if (req.query["max-price"] !== undefined) {
    const maxPrice = parseInt(req.query["max-price"]);
    results = results.filter((pizza) => pizza.price <= maxPrice);
  }
  if (req.query["avoid-allergen-by-name"] !== undefined) {
    const allergenName = req.query["avoid-allergen-by-name"];
    const allergens = JSON.parse(fs.readFileSync("./data/allergens.json"));
    const allergen = allergens.find(
      (a) => a.name.toLowerCase() === allergenName.toLowerCase()
    );
    results = results.filter(
      (pizza) => !pizza.allergens.includes(allergen.letter)
    );
  }

  // sorting

  if (req.query["sort-asc"] !== undefined) {
    const sortAsc = req.query["sort-asc"];
    results.sort((a, b) => {
      if (a[sortAsc] > b[sortAsc]) {
        return 1;
      } else if (a[sortAsc] < b[sortAsc]) {
        return -1;
      }
      return 0;
    });
  }
  if (req.query["sort-desc"] !== undefined) {
    const sortDesc = req.query["sort-desc"];
    results.sort((a, b) => {
      if (a[sortDesc] > b[sortDesc]) {
        return -1;
      } else if (a[sortDesc] < b[sortDesc]) {
        return 1;
      }
      return 0;
    });
  }

  res.json(results);
});

pizzasRouter.get("/:id", (req, res) => {
  const pizzas = JSON.parse(fs.readFileSync("./data/pizzas.json"));
  const pizzaFromId = pizzas.find(
    (pizza) => pizza.id.toString() === req.params.id
  );
  res.json(pizzaFromId);
});

pizzasRouter.post("/", (req, res) => {
  const newPizza = req.body;
  const pizzas = JSON.parse(fs.readFileSync("./data/pizzas.json"));
  let maxId = 0;
  for (let pizza of pizzas) {
    maxId = Math.max(maxId, pizza.id);
  }
  newPizza.id = maxId + 1;
  pizzas.push(newPizza);
  fs.writeFileSync("data/pizzas.json", JSON.stringify(pizzas, undefined, 2));
  res.json({ status: "success" });
});

export { pizzasRouter };
