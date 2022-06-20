const express = require("express")
const profileRouter = express.Router()
const {
    updateUserInfo,
    updateUserPassword,
    getUserData
} = require("../controllers/profileControllers")

profileRouter.get("/getUserData/:id", getUserData)

profileRouter.put("/updateUserInfo/:id", updateUserInfo)
profileRouter.put("/updateUserPassword/:id", updateUserPassword)

module.exports = profileRouter