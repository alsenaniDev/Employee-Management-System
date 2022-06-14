const express = require("express");
const rolesRouter = express.Router();
const {
    showRoles,
} = require("../controllers/roleControllers");

rolesRouter.get("/show", showRoles);

module.exports = rolesRouter;