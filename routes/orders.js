import fs from "fs";
import express from "express";

const ordersRouter = express.Router();

ordersRouter.get("/", (req, res) => {
  let orders = JSON.parse(fs.readFileSync("./data/orders.json"));

  // filtering

  if (req.query["completed"] === "true") {
    orders = orders.filter((order) => order.completed);
  }
  if (req.query["completed"] === "false") {
    orders = orders.filter((order) => !order.completed);
  }

  res.json(orders);
});

ordersRouter.get("/:id", (req, res) => {
  const orders = JSON.parse(fs.readFileSync("./data/orders.json"));
  const orderFromId = orders.find(
    (order) => order.id.toString() === req.params.id
  );
  res.json(orderFromId);
});

ordersRouter.post("/", (req, res) => {
  const newOrder = req.body;
  const orders = JSON.parse(fs.readFileSync("./data/orders.json"));
  let maxId = 0;
  for (let order of orders) {
    maxId = Math.max(maxId, order.id);
  }
  newOrder.id = maxId + 1;
  fs.writeFileSync(
    "./data/orders.json",
    JSON.stringify([...orders, newOrder], undefined, 2)
  );
  res.json({ status: "success" });
});

ordersRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const orders = JSON.parse(fs.readFileSync(".data/orders.json"));
  const newOrders = orders.filter((order) => order.id !== id);

  fs.writeFileSync(
    "./data/orders.json",
    JSON.stringify(newOrders, undefined, 2)
  );
  res.json({ status: "success" });
});

ordersRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const newOrder = req.body;
  const orders = JSON.parse(fs.readFileSync("./data/orders.json"));
  const index = orders.findIndex((order) => order.id === id);
  orders[index] = newOrder;

  fs.writeFileSync("./data/orders.json", JSON.stringify(orders, undefined, 2));
  res.json({ status: "success" });
});

ordersRouter.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const newData = req.body;
  const orders = JSON.parse(fs.readFileSync("./data/orders.json"));
  const newOrders = orders.map((order) =>
    order.id === id ? { ...order, ...newData } : order
  );

  fs.writeFileSync("data/orders.json", JSON.stringify(newOrders, undefined, 2));
  res.json({ status: "success" });
});

export { ordersRouter };
