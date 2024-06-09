const express = require("express");
const authorRoutes = express.Router();
const authorController = require("../controllers/authorController");

authorRoutes.get("/authors", authorController.getAuthors);

authorRoutes.get("/author/:id", authorController.getAuthorByID);

authorRoutes.get("/authors/filter", authorController.getAuthorByFilter);

authorRoutes.post("/author", authorController.addAuthor);

authorRoutes.put("/author", authorController.updateAuthor);

authorRoutes.delete("/author/:id", authorController.deleteAuthor);

module.exports = authorRoutes;