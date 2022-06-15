const express = require("express");
const rolesRouter = express.Router();
const {
    showRoles,
    getCount,
    addRoles,
    deleteRoles,
    updateRoles
} = require("../controllers/roleControllers");
const AuthorizationsRole = require("../middleware/AuthorizationsRole")

rolesRouter.post("/add", AuthorizationsRole, addRoles);
rolesRouter.get("/show", showRoles);
rolesRouter.delete("/delete/:id", AuthorizationsRole, deleteRoles)
rolesRouter.put("/update/:id", AuthorizationsRole, updateRoles)
rolesRouter.get("/getCount", getCount);

module.exports = rolesRouter;