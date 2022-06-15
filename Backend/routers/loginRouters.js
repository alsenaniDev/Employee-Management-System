const express = require("express")
const { login } = require("../controllers/loginControllers")
const loginRouters = express.Router()

loginRouters.post("/", login)

module.exports = loginRouters
