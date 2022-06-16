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

rolesRouter.post("/add", AuthorizationsRole, addRoles);

rolesRouter.get("/show", showRoles);
rolesRouter.get("/show/:id", getRoleById);
rolesRouter.get("/getCount", getCount);

rolesRouter.delete("/delete/:id", AuthorizationsRole, deleteRoles);

rolesRouter.put("/update/:id", AuthorizationsRole, updateRoles);

module.exports = rolesRouter;