const express = require("express");
const imageRoutes = express.Router();
const imageController = require("../controllers/imageController");


imageRoutes.get("/image/*", imageController.getImage);


module.exports = imageRoutes;