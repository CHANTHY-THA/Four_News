const express = require("express");
const userRoutes = express.Router();
const UserController = require("../controllers/userController");

userRoutes.get("/users", UserController.getUsers);

userRoutes.get("/user/:id", UserController.getUserByID);

userRoutes.get("/users/filter", UserController.getUserByFilter);

userRoutes.post("/user", UserController.addUser);

userRoutes.patch("/username/:id", UserController.updateUsername);

userRoutes.patch("/password/:id", UserController.updatePassword);

userRoutes.delete("/user/:id", UserController.deleteUser);

module.exports = userRoutes;