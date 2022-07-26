const { validateToken } = require("../BL/jwt")
const userController = require('../DL/controllers/userController');


const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) throw { code: 503, message: "No authentication is sent" };
        const token = authHeader.split(" ")[1];
        const decode = validateToken(token);
        const user = await userController.readOne({ _id: decode.id });
        if (!user) throw { code: 503, message: "not auth" };
        req.user = user;
        next();
    } catch (error) {
        res.status(503).send(error.message);
    }
};
module.exports = auth