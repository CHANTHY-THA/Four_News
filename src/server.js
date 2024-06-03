const express = require("express");
const dotenv = require("dotenv");
const categoryRoute = require("./routes/categoryRoutes");
const tagRoute = require("./routes/tagRoutes");


const router = express();
router.use(express.json());

dotenv.config({path: __dirname + "/../.env"});


router.use("/api",categoryRoute);
router.use("/api",tagRoute);

router.listen(process.env.PORT, ()=>{
    console.log(`Server running at http://localhost:${process.env.PORT}`)
})