const express = require("express")
const {
    getAllServiceRoles,
    addServiceRoles
} = require("../controllers/serviceRolesControllers")
const serviceRolesRouter = express.Router()

serviceRolesRouter.get("/show", getAllServiceRoles)
serviceRolesRouter.post("/add", addServiceRoles)

module.exports = serviceRolesRouter