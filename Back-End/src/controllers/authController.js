const Response = require("../responseBody/Response");
const { PrismaClient } = require('@prisma/client');
const dayjs = require('dayjs');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwtLib = require("../libs/jwt");
const salt = 10;


const login = async (req, res) => {
    try {

        const { username, password } = req.body || {};
        console.log("🚀 ~ authRoutes.post ~ req.body:", req.body)

        if (!username || !password) {
            return res.status(400).send({ message: "Username and password required" });
        }

        const foundUser = await prisma.users.findFirst({ where: { username: username } });

        if (!foundUser || !bcrypt.compareSync(password, foundUser.password)) {
            return res.status(401).send({ statusCode: 401, message: "User or password incorrect" });
        }
        const user = {
            ID: foundUser.ID,
            username: foundUser.username,
            role: foundUser.role
        }
        const result = {
            token: jwtLib.generateToken(user),
            data: user
        }

        return res.status(200).send({ statusCode: 200, result: result, message: "Login successful" });
    } catch (err) {
        console.log("Error loginUser:" + err.message);
        return new Response(res).setID(0).setStatusCode(500).setMessage("Something went wrong.").send();
    }


};



const getUser = async (req, res) => {


    try {
        const loginId = req.user.ID;
        const foundUser = await prisma.users.findUnique({
            where: { ID: loginId }
        });
        const dateFormat = dayjs(foundUser.created);
        foundUser.created = dateFormat.format("DD-MMM-YYYY")
        foundUser.profile = `http://localhost:${process.env.PORT}/api/image/${getProfile(foundUser.profile)}`
        const { password: _, ...noPassUserData } = foundUser;

        return res.status(200).send({ result: noPassUserData, message: "found user" });

    } catch (err) {
        console.log("Error getUser:" + err.message);
        return new Response(res).setID(0).setStatusCode(500).setMessage("Something went wrong.").send();

    }
};


function getProfile(profile) {

    if (profile === null) {
        return "default-profile.jpg";
    } else {
        return profile;
    }
}


const addDummySuperAdmin = async (req, res) => {
    try {
        const password = "123"
        const adminPayload = {
            username: "admin",
            password: bcrypt.hashSync(password, salt),
            role: "superAdmin",
        }

        await prisma.users.create({
            data: adminPayload
        });
        adminPayload.password = password;
        return new Response(res)
            .setResponse(adminPayload)
            .setID(1)
            .setStatusCode(201)
            .setMessage("Super admin user create successfully.")
            .send();

    } catch (err) {
        console.log("Error addUser:" + err.message);
        return new Response(res)
            .setID(0)
            .setStatusCode(500)
            .setMessage("Something went wrong.")
            .send();
    }
};





module.exports = {
    login,
    getUser,
    addDummySuperAdmin
};