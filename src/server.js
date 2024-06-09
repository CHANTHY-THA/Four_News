const express = require("express");
const dotenv = require("dotenv");
const categoryRoute = require("./routes/categoryRoutes");
const tagRoute = require("./routes/tagRoutes");
const authorRoute = require("./routes/authorRoutes");
const newsRoutes = require("./routes/newsRoutes");
const userRoute = require("./routes/userRoutes");


const router = express();
router.use(express.json());

dotenv.config({ path: __dirname + "/../.env" });


router.use("/api",categoryRoute);
router.use("/api",tagRoute);
router.use("/api",authorRoute);
router.use("/api",newsRoutes);
router.use("/api", userRoute);

router.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
})