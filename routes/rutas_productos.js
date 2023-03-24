const express = require("express");
const router_products = express.Router();

const productos = require("../models").productos;

// Sync productos database
router_products.use(async (req, res, next) => {
  await productos.sync();
  next();
});

//Se importan las constantes de controller
const {
  getall,
  getone,
  create_product,
  delete_product,
} = require("../controllers/controllers");

//Rutas
router_products.get("/", getall);
router_products.get("/:id", getone);
router_products.post("/create", create_product);
router_products.delete("/delete/:id", delete_product);

module.exports = router_products;
