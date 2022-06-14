const express = require("express");
const groupsRouter = express.Router();
const {
    showGroups,
} = require("../controllers/groupControllers");

groupsRouter.get("/show", showGroups);

module.exports = groupsRouter;