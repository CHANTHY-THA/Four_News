const Response = require("../responseBody/Response");
const { PrismaClient } = require("@prisma/client");
const dayjs = require("dayjs");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const salt = 10;

const getUsers = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        // let limit = parseInt(process.env.PAGESIZE);
        let limit = parseInt(req.query.itemPerPage);
        let result = [];
        let recordSkip = (page - 1) * limit;

        const totalRecord = await prisma.users.findMany({
            where: {
                status: 1,
            },
        });

        const totalRecordPerPage = await prisma.users.findMany({
            where: {
                status: 1,
                AND: [
                    {

                        NOT: {
                            role: 'superAdmin'
                        }
                    },
                    {

                        NOT: {
                            ID: parseInt(req.user.ID)
                        }
                    },
                ]

            },
            skip: recordSkip,
            take: limit,
            orderBy: { ID: "desc" },
        });

        totalRecordPerPage.forEach((user) => {
            const createdAtFormat = dayjs(user.created_at);
            const updatedAtFormat = dayjs(user.updated_at);
            user.created_at = createdAtFormat.format("DD-MMM-YYYY h:mm A");
            user.updated_at = updatedAtFormat.format("DD-MMM-YYYY h:mm A");
            user.profile = `http://localhost:${process.env.PORT}/api/image/${getProfile(user.profile)}`
            delete user.password;
            result.push(user);
        });

        const total_page = Math.ceil(totalRecord.length / limit);
        const pagination = {
            total_record: totalRecord.length,
            limit: limit,
            current_page: page,
            total_page: total_page,
            has_next: page < total_page,
        };
        return new Response(res)
            .setResponse({ users: result, pagination: pagination })
            .setID(1)
            .send();
    } catch (err) {
        console.log("Error getUsers:" + err.message);
        return new Response(res)
            .setID(0)
            .setStatusCode(500)
            .setMessage("Something went wrong.")
            .send();
    }
};

const getCountUser = async (req, res) => {
    try {
        const countUser = await prisma.users.count({
            where: {
                status: 1,
            },
        });

        return new Response(res).setResponse(countUser).setID(1).send();
    } catch (error) {
        console.log("Error getUsers:" + err.message);
        return new Response(res)
            .setID(0)
            .setStatusCode(500)
            .setMessage("Something went wrong.")
            .send();
    }
};

const getUserByID = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        const foundUser = await prisma.users.findFirst({
            where: {
                ID: id,
                status: 1,
            },
        });

        if (isNaN(id)) {
            return new Response(res)
                .setID(0)
                .setStatusCode(400)
                .setMessage("ID must be a number.")
                .send();
        }

        if (!foundUser) {
            return new Response(res)
                .setID(0)
                .setStatusCode(404)
                .setMessage("No data found.")
                .send();
        }
        const createdAtFormat = dayjs(foundUser.created_at);
        const updatedAtFormat = dayjs(foundUser.updated_at);
        foundUser.created_at = createdAtFormat.format("DD-MMM-YYYY h:mm A");
        foundUser.updated_at = updatedAtFormat.format("DD-MMM-YYYY h:mm A");
        foundUser.profile = `http://localhost:${process.env.PORT}/api/image/${getProfile(foundUser.profile)}`
        delete foundUser.password;
        return new Response(res).setResponse(foundUser).setID(1).send();
    } catch (err) {
        console.log("Error getUserByID:" + err.message);
        return new Response(res)
            .setID(0)
            .setStatusCode(500)
            .setMessage("Something went wrong.")
            .send();
    }
};

const getUserByFilter = async (req, res) => {
    try {
        const result = [];
        const username = req.query.username;
        // const created_by = req.query.created_by;
        // const description = req.query.description;

        // pagination
        let page = parseInt(req.query.page) || 1;
        // let limit = parseInt(process.env.PAGESIZE);
        let limit = parseInt(req.query.itemPerPage);
        // console.log("🚀 ~ file: userController.js:111 ~ getUserByFilter ~ req.query.itemsPerPage:", req.query.itemPerPage)
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const userList = await prisma.users.findMany({
            where: {
                username: { contains: username },
                // created_by: created_by,
                // description: { contains: description },
                status: 1,
                NOT: {
                    role: 'superAdmin'
                }
            },
        });

        // if (userList.length == 0) {
        //     return new Response(res)
        //         .setID(0)
        //         .setStatusCode(404)
        //         .setMessage("No data found.")
        //         .send();
        // }
        const users = userList.slice(startIndex, endIndex);

        users.forEach((user) => {
            const createdAtFormat = dayjs(user.created_at);
            const updatedAtFormat = dayjs(user.updated_at);
            user.created_at = createdAtFormat.format("DD-MMM-YYYY h:mm A");
            user.updated_at = updatedAtFormat.format("DD-MMM-YYYY h:mm A");
            user.profile = `http://localhost:${process.env.PORT}/api/image/${getProfile(user.profile)}`
            delete user.password;
            result.push(user);
        });

        const total_page = Math.ceil(userList.length / limit);
        const pagination = {
            total_record: userList.length,
            limit: limit,
            current_page: page,
            total_page: total_page,
            has_next: page < total_page,
        };
        return new Response(res)
            .setResponse({ users: result, pagination: pagination })
            .setID(1)
            .send();
    } catch (err) {
        console.log("Error getUserByFilter:" + err.message);
        return new Response(res)
            .setID(0)
            .setStatusCode(500)
            .setMessage("Something went wrong.")
            .send();
    }
};

const addUser = async (req, res) => {
    try {
        const body = req.body;

        const { username, password, role } = body;

        if (!username) {
            return new Response(res)
                .setID(0)
                .setStatusCode(400)
                .setMessage("Username is required.")
                .send();
        }

        if (!password) {
            return new Response(res)
                .setID(0)
                .setStatusCode(400)
                .setMessage("Password is required.")
                .send();
        }

        if (!role) {
            return new Response(res)
                .setID(0)
                .setStatusCode(400)
                .setMessage("Role is required.")
                .send();
        }
        const foundUser = await prisma.users.findFirst({
            where: { username: username },
        });
        console.log("🚀 ~ file: userController.js:184 ~ addUser ~ foundUser:", foundUser)
        if (!foundUser) {
            await prisma.users.create({
                data: {
                    username: username,
                    password: bcrypt.hashSync(password, salt),
                    role: role,
                },
            });
            return new Response(res)
                .setID(1)
                .setStatusCode(201)
                .setMessage("User created successfully.")
                .send();
        }
        return new Response(res)
            .setID(0)
            .setStatusCode(400)
            .setMessage("User already exist.")
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

const updateUsername = async (req, res) => {
    try {
        const body = req.body;
        let id = parseInt(req.params.id);
        const { username } = body;

        if (isNaN(id)) {
            return new Response(res)
                .setID(0)
                .setStatusCode(400)
                .setMessage("ID must be a number.")
                .send();
        }

        if (!username) {
            return new Response(res)
                .setID(0)
                .setStatusCode(400)
                .setMessage("Username is required.")
                .send();
        }

        const foundUser = await prisma.users.findFirst({
            where: { ID: id, status: 1 },
        });
        if (!foundUser) {
            return new Response(res)
                .setID(0)
                .setStatusCode(404)
                .setMessage("No data found.")
                .send();
        }

        const checkRecordExist = await prisma.users.findFirst({
            where: { username: username },
        });

        if (checkRecordExist && checkRecordExist?.ID != id) {
            return new Response(res)
                .setID(0)
                .setStatusCode(400)
                .setMessage("Username already exist.")
                .send();
        } else {
            await prisma.users.update({
                where: { ID: id },
                data: {
                    username: username,
                },
            });
            return new Response(res)
                .setID(1)
                .setMessage("Username updated successfully.")
                .send();
        }
    } catch (err) {
        console.log("Error updateUsername:" + err.message);
        return new Response(res)
            .setID(0)
            .setStatusCode(500)
            .setMessage("Something went wrong.")
            .send();
    }
};

const updateUser = async (req, res) => {
    try {
        const body = req.body;
        let id = parseInt(req.params.id);
        const { username, role } = body;

        if (isNaN(id)) {
            return new Response(res)
                .setID(0)
                .setStatusCode(400)
                .setMessage("ID must be a number.")
                .send();
        }

        if (!username) {
            return new Response(res)
                .setID(0)
                .setStatusCode(400)
                .setMessage("Username is required.")
                .send();
        }

        const foundUser = await prisma.users.findFirst({
            where: { ID: id, status: 1 },
        });
        if (!foundUser) {
            return new Response(res)
                .setID(0)
                .setStatusCode(404)
                .setMessage("No data found.")
                .send();
        }

        const checkRecordExist = await prisma.users.findFirst({
            where: { username: username },
        });

        if (checkRecordExist && checkRecordExist?.ID != id) {
            return new Response(res)
                .setID(0)
                .setStatusCode(400)
                .setMessage("Username already exist.")
                .send();
        } else {
            await prisma.users.update({
                where: { ID: id },
                data: {
                    username: username,
                    role: role
                },
            });
            return new Response(res)
                .setID(1)
                .setMessage("User updated successfully.")
                .send();
        }
    } catch (err) {
        console.log("Error updateUser:" + err.message);
        return new Response(res)
            .setID(0)
            .setStatusCode(500)
            .setMessage("Something went wrong.")
            .send();
    }
};

const updatePassword = async (req, res) => {
    try {
        const body = req.body;
        let id = parseInt(req.user.ID);
        const { newPassword, confirmPassword, currentPassword } = body;
        if (isNaN(id)) {
            return new Response(res)
                .setID(0)
                .setStatusCode(400)
                .setMessage("ID must be a number.")
                .send();
        }

        if (!newPassword) {
            return new Response(res)
                .setID(0)
                .setStatusCode(400)
                .setMessage("New password is required.")
                .send();
        }

        if (!confirmPassword) {
            return new Response(res)
                .setID(0)
                .setStatusCode(400)
                .setMessage("Confrim password is required.")
                .send();
        }


        if (!currentPassword) {
            return new Response(res)
                .setID(0)
                .setStatusCode(400)
                .setMessage("Current password is required.")
                .send();
        }


        if (newPassword != confirmPassword) {
            return new Response(res)
                .setID(0)
                .setStatusCode(400)
                .setMessage("New password and confirm password must be the same.")
                .send();
        }

        const foundUser = await prisma.users.findFirst({
            where: { ID: id, status: 1 },
        });
        if (!foundUser) {
            return new Response(res)
                .setID(0)
                .setStatusCode(404)
                .setMessage("No data found.")
                .send();
        }

        if (!bcrypt.compareSync(currentPassword, foundUser.password)) {
            return new Response(res)
                .setID(0)
                .setStatusCode(400)
                .setMessage("Current password incorrect.")
                .send();
        } else {
            await prisma.users.update({
                where: { ID: id },
                data: {
                    password: bcrypt.hashSync(newPassword, salt),
                },
            });
            return new Response(res)
                .setID(1)
                .setMessage("Password updated successfully.")
                .send();
        }
    } catch (err) {
        console.log("Error updatePassword:" + err.message);
        return new Response(res)
            .setID(0)
            .setStatusCode(500)
            .setMessage("Something went wrong.")
            .send();
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return new Response(res)
                .setID(0)
                .setStatusCode(400)
                .setMessage("ID must be a number.")
                .send();
        }
        const foundUser = await prisma.users.findFirst({
            where: { ID: id, status: 1 },
        });

        if (!foundUser) {
            return new Response(res)
                .setID(0)
                .setStatusCode(404)
                .setMessage("No data found.")
                .send();
        }
        await prisma.users.update({
            where: { ID: id },
            data: {
                status: 0,
            },
        });
        return new Response(res)
            .setID(1)
            .setMessage("User deleted successfully.")
            .send();
    } catch (err) {
        console.log("Error deleteUser:" + err.message);
        return new Response(res)
            .setID(0)
            .setStatusCode(500)
            .setMessage("Something went wrong.")
            .send();
    }
};

function getProfile(profile) {

    if (profile === null) {
        return "default-profile.jpg";
    } else {
        return profile;
    }
}

const changeProfile = async (req, res) => {

    try {

        const id = req.user.ID;
        await prisma.users.update({
            where: { ID: id },
            data: {
                profile: req.file.filename,
            },
        });

        return new Response(res)
            .setID(1)
            .setMessage("Profile updated successfully.")
            .send();
    } catch (error) {

        return new Response(res)
            .setID(0)
            .setStatusCode(500)
            .setMessage("Profile updated failed.")
            .send();


    }
}

module.exports = {
    getUsers,
    getCountUser,
    addUser,
    updateUsername,
    updatePassword,
    getUserByID,
    deleteUser,
    getUserByFilter,
    updateUser,
    changeProfile

};
