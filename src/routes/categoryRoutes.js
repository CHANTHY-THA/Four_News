const express = require("express");
const categoryRoutes = express.Router();
const categoryController = require("../controllers/categoryController");

categoryRoutes.get("/categories", categoryController.getCategories);

categoryRoutes.get("/category/:id", categoryController.getCategoryByID);

categoryRoutes.get("/categories/filter", categoryController.getCategoryByFilter);

categoryRoutes.post("/category", categoryController.addCategory);

categoryRoutes.put("/category", categoryController.updateCategory);

categoryRoutes.delete("/category/:id", categoryController.deleteCategory);

module.exports = categoryRoutes;