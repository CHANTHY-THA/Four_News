const express = require("express");
const newsTagRoutes = express.Router();
const newstagController = require("../controllers/newstagController");
const authMiddleware = require("../middlewares/authMiddleware");

newsTagRoutes.get("/newstag", newstagController.getNewsTag);

newsTagRoutes.get("/newstag/:id", newstagController.getNewsTagByID);

newsTagRoutes.post("/newstag", authMiddleware, newstagController.addNewsTag);

newsTagRoutes.put("/newstag", authMiddleware, newstagController.updateNewsTag);

newsTagRoutes.delete("/newstag/:id", authMiddleware, newstagController.deleteNewsTag);

module.exports = newsTagRoutes;