const express = require("express");
const newsRoutes = express.Router();
const newController = require("../controllers/newsController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        console.log("🚀 ~ file:", file)
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

newsRoutes.get("/news", newController.getNews);

newsRoutes.get("/countNews", newController.getCountNews);

newsRoutes.get("/singlenews/:id", newController.getNewsByID);

newsRoutes.get("/news/filter", newController.getNewsByFilter);

newsRoutes.post("/news", authMiddleware, newController.addNews);

newsRoutes.post("/uploadImage", authMiddleware, upload.single('file'), newController.uploadImage);

newsRoutes.put("/news", authMiddleware, newController.updateNews);

newsRoutes.delete("/news/:id", authMiddleware, newController.deleteNews);

module.exports = newsRoutes;