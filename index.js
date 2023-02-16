import fs from "fs";
import express from "express";
import cors from "cors";

import { allergensRouter } from "./routes/allergens.js";
import { ordersRouter } from "./routes/orders.js";
import { pizzasRouter } from "./routes/pizzas.js";

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const homePage = fs.readFileSync("home.html", { encoding: "utf-8" });
  res.send(homePage);
});

app.use("/api/allergens", allergensRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/pizzas", pizzasRouter);

app.listen(PORT);
