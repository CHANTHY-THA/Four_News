const express = require("express");
const userRoutes = express.Router();
const UserController = require("../controllers/userController");

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

const authMiddleware = require("../middlewares/authMiddleware");
userRoutes.get("/users", authMiddleware, UserController.getUsers);

userRoutes.get("/user/:id", authMiddleware, UserController.getUserByID);

userRoutes.get("/users/filter", authMiddleware, UserController.getUserByFilter);

userRoutes.post("/user", authMiddleware, UserController.addUser);

userRoutes.patch(
  "/username/:id",
  authMiddleware,
  UserController.updateUsername
);

userRoutes.patch("/user/:id", authMiddleware, UserController.updateUser);

userRoutes.patch("/password", authMiddleware, UserController.updatePassword);

userRoutes.delete("/user/:id", authMiddleware, UserController.deleteUser);

userRoutes.patch("/profile", authMiddleware, upload.single('file'), UserController.changeProfile)

module.exports = userRoutes;
