const users = require("../models/users")
const Jwt = require("jsonwebtoken")

const Authorization = async (req, res, next) => {
  try {
    const token = req.header("Authorization")
    if (!token) return res.status(401).send("You Need Token")
    const decrypted = Jwt.verify(token, process.env.JWT_SECRET_KEY)
    const userId = decrypted.id
    const user = await users.findById(userId)
    if (!user) return res.status(404).send("User not found")
    req.userId = userId
    next()
  } catch (error) {
    res.status(500).json(error.message)
  }
}
module.exports = { Authorization }
