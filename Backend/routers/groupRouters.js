const express = require("express")
const groupsRouter = express.Router()
const {
    showGroups,
    getGroupsCount,
    addGroups,
    deleteGroups,
    updateGroups
} = require("../controllers/groupControllers")
const {
    Authorization
} = require("../middleware/Authorizations")
const AuthorizationsRole = require("../middleware/AuthorizationsRole")

groupsRouter.post("/add", AuthorizationsRole, addGroups)
groupsRouter.get("/show", showGroups)
groupsRouter.delete("/delete/:id", AuthorizationsRole, deleteGroups)
groupsRouter.put("/update/:id", AuthorizationsRole, updateGroups)
groupsRouter.get("/getCount", getGroupsCount)

module.exports = groupsRouter