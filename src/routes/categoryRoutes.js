const express = require("express");
const categoryRoutes = express.Router();
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middlewares/authMiddleware");

categoryRoutes.get("/categories", categoryController.getCategories);

categoryRoutes.get("/category/:id", categoryController.getCategoryByID);

categoryRoutes.get("/categories/filter", categoryController.getCategoryByFilter);

categoryRoutes.post("/category", authMiddleware, categoryController.addCategory);

categoryRoutes.put("/category", authMiddleware, categoryController.updateCategory);

categoryRoutes.delete("/category/:id", authMiddleware, categoryController.deleteCategory);

module.exports = categoryRoutes;