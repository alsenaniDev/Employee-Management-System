const express = require("express")
const groupsRouter = express.Router()
const {
    showGroups,
    getGroupsCount,
    addGroups,
    deleteGroups,
    updateGroups,
    getGroupById,
} = require("../controllers/groupControllers")
const {
    Authorization
} = require("../middleware/Authorizations")
const AuthorizationsRole = require("../middleware/AuthorizationsRole")

groupsRouter.post("/add", addGroups)

groupsRouter.get("/show/:id", showGroups)
groupsRouter.get("/show/:id", getGroupById)
groupsRouter.get("/getCount", getGroupsCount)

groupsRouter.delete("/delete/:id", deleteGroups)

groupsRouter.put("/update/:id", updateGroups)

module.exports = groupsRouter