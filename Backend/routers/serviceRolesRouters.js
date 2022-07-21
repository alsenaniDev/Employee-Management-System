const express = require("express")
const {
    getAllServiceRoles,
    addServiceRoles,
    deleteServiceRole,
    getServiceRoles
} = require("../controllers/serviceRolesControllers")
const serviceRolesRouter = express.Router()

serviceRolesRouter.get("/show", getAllServiceRoles)
serviceRolesRouter.post("/add", addServiceRoles)
serviceRolesRouter.delete("/deleteServiceRole/:serviceId/:roleId", deleteServiceRole)
serviceRolesRouter.get("/getServiceRoles/:serviceId", getServiceRoles)
// serviceRolesRouter.post("/IsServiceContainsRole", IsServiceContainsRole)

module.exports = serviceRolesRouter