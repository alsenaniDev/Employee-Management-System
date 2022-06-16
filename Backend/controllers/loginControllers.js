const users = require("../models/users")
const usersInfo = require("../models/usersInfo")
const Jwt = require("jsonwebtoken")

const login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body
    const user = await users.findOne({
      email
    })

    if (!user) return res.status(404).json("You have to Registers")
    const passwordFound = user.password != password
    if (passwordFound) return res.status(401).json("Incorrect password")
    // const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "16d" })
    // res.json({token : token})

    let userId = user._id
    console.log(userId)
    let response = await usersInfo.findOne({
      userId
    }).populate({
      path: "userId",
    }).populate({
      path: "roleId",
    }).populate({
      path: "groupsId",
    })


    res.json({
      data: {
        userId: response.userId._id,
        fullName: response.userId.firstName + " " + response.userId.lastName,
        role: response.roleId.name,
        groups: response.groupsId.map((groupName) => groupName.name)
      }
    })

  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}

module.exports = {
  login
}