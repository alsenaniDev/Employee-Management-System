const users = require("../models/users")
const Jwt = require("jsonwebtoken")
const usersInfo = require("../models/usersInfo")

const AuthorizationsRole = async (req, res, next) => {
  try {
    const token = req.header("Authorization")
    if (!token) return res.status(401).send("You Need Token")
    const decrypted = Jwt.verify(token, process.env.JWT_SECRET_KEY)
    const userId = decrypted.id
    const user = await usersInfo.findOne({ userId }).populate("roleId")
    if (!user) return res.status(404).send("User not found")
    if (user.roleId.name !== "Admin" && user.roleId.name !== "Super-Admin")
      return res.status(403).json("Should be Admin to Action")
    req.userId = userId
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}

module.exports = AuthorizationsRole
