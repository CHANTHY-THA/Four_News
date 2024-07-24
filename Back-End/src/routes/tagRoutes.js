const express = require("express");
const tagRoutes = express.Router();
const tagController = require("../controllers/tagController");
const authMiddleware = require("../middlewares/authMiddleware");

tagRoutes.get("/tags", tagController.getTags);

tagRoutes.get("/tag/:id", tagController.getTagByID);

tagRoutes.get("/tags/filter", tagController.getTagByFilter);

tagRoutes.post("/tag", authMiddleware, tagController.addTag);

tagRoutes.put("/tag", authMiddleware, tagController.updateTag);

tagRoutes.delete("/tag/:id", authMiddleware, tagController.deleteTag);

module.exports = tagRoutes;