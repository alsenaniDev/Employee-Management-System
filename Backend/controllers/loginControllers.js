const users = require("../models/users")
const Jwt = require("jsonwebtoken")

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await users.findOne({ email })
    if (!user) return res.status(404).json("You have to Registeres")
    const passwordFound = user.password != password
    if (passwordFound) return res.status(401).json("Incorrect password")
    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "16d" })
    res.json({token : token})
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}

module.exports = { login }
