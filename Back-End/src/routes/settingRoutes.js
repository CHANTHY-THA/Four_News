const express = require("express");
const settingRoutes = express.Router();
const SettingController = require("../controllers/settingController");
settingRoutes.get("/setting", SettingController.getSetting);

module.exports = settingRoutes;