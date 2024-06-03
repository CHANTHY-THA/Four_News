const express = require("express");
const tagRoutes = express.Router();
const tagController = require("../controllers/tagController");

tagRoutes.get("/tags", tagController.getTags);

tagRoutes.get("/tag/:id", tagController.getTagByID);

tagRoutes.get("/tags/filter", tagController.getTagByFilter);

tagRoutes.post("/tag", tagController.addTag);

tagRoutes.put("/tag", tagController.updateTag);

tagRoutes.delete("/tag/:id", tagController.deleteTag);

module.exports = tagRoutes;