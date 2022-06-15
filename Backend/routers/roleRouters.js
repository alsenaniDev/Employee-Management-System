const express = require("express");
const rolesRouter = express.Router();
const {
    showRoles,
    getCount,
    addRoles
} = require("../controllers/roleControllers");

rolesRouter.post("/add", addRoles);
rolesRouter.get("/show", showRoles);
rolesRouter.get("/getCount", getCount);

module.exports = rolesRouter;