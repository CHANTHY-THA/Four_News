const express = require("express");
const newsRoutes = express.Router();
const newController = require("../controllers/newsController");

newsRoutes.get("/news", newController.getNews);

newsRoutes.get("/news/:id", newController.getNewsByID);

newsRoutes.get("/news/filter", newController.getNewsByFilter);

newsRoutes.post("/news", newController.addNews);

newsRoutes.put("/news", newController.updateNews);

newsRoutes.delete("/news/:id", newController.deleteNews);

module.exports = newsRoutes;