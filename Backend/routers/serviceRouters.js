const express = require("express")
const {
    getAllServices,
    addService,
    updateService,
    getServicesByParentCode
} = require("../controllers/serviceControllers")
const serviceRouter = express.Router()

serviceRouter.get("/show", getAllServices)
serviceRouter.get("/showByParentCode/:code", getServicesByParentCode)

serviceRouter.post("/add", addService)
serviceRouter.put("/update/:id", updateService)

module.exports = serviceRouter