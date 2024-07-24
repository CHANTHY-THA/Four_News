const express = require("express");
const newsRoutes = express.Router();
const newController = require("../controllers/newsController");
const authMiddleware = require("../middlewares/authMiddleware");

newsRoutes.get("/news", newController.getNews);

newsRoutes.get("/singlenews/:id", newController.getNewsByID);

newsRoutes.get("/news/filter", newController.getNewsByFilter);

newsRoutes.post("/news", authMiddleware, newController.addNews);

newsRoutes.put("/news", authMiddleware, newController.updateNews);

newsRoutes.delete("/news/:id", authMiddleware, newController.deleteNews);

module.exports = newsRoutes;