const express = require("express")

const userInfoRouter = express.Router()
const { showUsersData } = require("../controllers/usersInfoControllers")

userInfoRouter.get("/show", showUsersData)

module.exports = userInfoRouter
