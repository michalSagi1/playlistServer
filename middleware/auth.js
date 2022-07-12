const { validateToken } = require("../BL/jwt")
const userController = require('../DL/controllers/userController');


async function auth(req, res, next) {
    const token = req.headers.authorization
    try {
        const decode = validateToken(token)
        const user = await userController.readOne({ _id: decode.id })
        if (!user) throw ({ code: 503, message: "not auth" })
        next()

    } catch (error) {
        res.status(503).send({ message: "not auth" })
    }
}
module.exports = auth