const Response = require("../responseBody/Response");
const role = require("../file/role/role.json")

const getSetting = async (req, res) => {
    try {


        let setting = {
            role: role
        }

        return new Response(res)
            .setResponse(setting)
            .setID(1)
            .setStatusCode(201)
            .setMessage("success")
            .send();

    } catch (err) {
        console.log("Error addNewsTag:" + err.message);
        return new Response(res)
            .setID(0)
            .setStatusCode(500)
            .setMessage("Something went wrong.")
            .send();
    }
};

module.exports = {
    getSetting,

};