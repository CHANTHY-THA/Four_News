const express = require("express");
const dotenv = require("dotenv");
const categoryRoutes = require("./routes/categoryRoutes");
const tagRoutes = require("./routes/tagRoutes");
const authorRoutes = require("./routes/authorRoutes");
const newsRoutes = require("./routes/newsRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const newsTagRoutes = require("./routes/newstagRoutes");
const imageRoutes = require("./routes/imageRoutes");
var cors = require('cors');


const router = express();
router.use(express.json());


dotenv.config({ path: __dirname + "/../.env" });

router.use(cors({
    origin: '*'
}));

router.use("/api", categoryRoutes);
router.use("/api", tagRoutes);
router.use("/api", authorRoutes);
router.use("/api", newsRoutes);
router.use("/api", newsTagRoutes);
router.use("/api", userRoutes);
router.use("/api", authRoutes);
router.use("/api", imageRoutes);





router.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
})