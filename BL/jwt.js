const jwt = require("jsonwebtoken")
const secret = "1234"

function createToken(id) {
    const token = jwt.sign({ id }, secret, { expiresIn: "1h" })
    return token
}
// console.log(createToken("00001"));

function validateToken(token) {
    return jwt.verify(token, secret)
}
// console.log(validateToken(""))

module.exports = { createToken, validateToken }
