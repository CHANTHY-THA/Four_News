const express = require("express");
const authorRoutes = express.Router();
const authorController = require("../controllers/authorController");
const authMiddleware = require("../middlewares/authMiddleware");

authorRoutes.get("/authors", authorController.getAuthors);

authorRoutes.get("/allUsers", authorController.getAllUsers);

authorRoutes.get("/author/:id", authorController.getAuthorByID);

authorRoutes.get("/authors/filter", authorController.getAuthorByFilter);

authorRoutes.post("/author", authMiddleware, authorController.addAuthor);

authorRoutes.put("/author", authMiddleware, authorController.updateAuthor);

authorRoutes.delete(
  "/author/:id",
  authMiddleware,
  authorController.deleteAuthor
);

module.exports = authorRoutes;
