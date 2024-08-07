const express = require("express");
const userRoutes = express.Router();
const UserController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
userRoutes.get("/users", authMiddleware, UserController.getUsers);

userRoutes.get("/user/:id", authMiddleware, UserController.getUserByID);

userRoutes.get("/users/filter", authMiddleware, UserController.getUserByFilter);

userRoutes.post("/user", authMiddleware, UserController.addUser);

userRoutes.patch("/username/:id", authMiddleware, UserController.updateUsername);

userRoutes.patch("/user/:id", authMiddleware, UserController.updateUser);

userRoutes.patch("/password/:id", authMiddleware, UserController.updatePassword);

userRoutes.delete("/user/:id", authMiddleware, UserController.deleteUser);

module.exports = userRoutes;