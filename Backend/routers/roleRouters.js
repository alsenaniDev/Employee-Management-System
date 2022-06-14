const express = require("express");
const rolesRouter = express.Router();
const {
    showRoles,
    getCount,
} = require("../controllers/roleControllers");

rolesRouter.get("/show", showRoles);
rolesRouter.get("/getCount", getCount);

module.exports = rolesRouter;