import fs from "fs";
import express from "express";

const FILE_NAMES = ["allergens.json", "orders.json", "pizzas.json"];

const resetRouter = express.Router();

resetRouter.all("/", (req, res) => {
  for (let fileName of FILE_NAMES) {
    fs.copyFileSync(
      `./data-original/${fileName}`,
      `./data/${fileName}`,
      fs.constants.COPYFILE_FICLONE
    );
  }
  res.json({ status: "success" });
});

export { resetRouter };
