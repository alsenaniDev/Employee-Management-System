const express = require("express");
const rolesRouter = express.Router();
const {
    showRoles,
    getCount,
    addRoles,
    deleteRoles,
    updateRoles,
    getRoleById
} = require("../controllers/roleControllers");
const AuthorizationsRole = require("../middleware/AuthorizationsRole")

rolesRouter.post("/add", addRoles);

rolesRouter.get("/show/:id", showRoles);
rolesRouter.get("/show/:id", getRoleById);
rolesRouter.get("/getCount", getCount);

rolesRouter.delete("/delete/:id", deleteRoles);

rolesRouter.put("/update/:id", updateRoles);

module.exports = rolesRouter;