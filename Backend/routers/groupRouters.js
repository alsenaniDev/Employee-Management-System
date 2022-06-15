const express = require("express")
const groupsRouter = express.Router()
const { showGroups, getGroupsCount, addGroups } = require("../controllers/groupControllers")
const { Authorization } = require("../middleware/Authorizations")
const AuthorizationsRole = require("../middleware/AuthorizationsRole")

groupsRouter.post("/add", AuthorizationsRole, addGroups)
groupsRouter.get("/show", showGroups)
groupsRouter.get("/getCount", getGroupsCount)

module.exports = groupsRouter
