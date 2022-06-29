const express = require("express")
const { getAllServices, addMainService } = require("../controllers/serviceControllers")
const serviceRouter = express.Router()

serviceRouter.get("/", getAllServices)

serviceRouter.post("/add", addMainService)

module.exports = serviceRouter
