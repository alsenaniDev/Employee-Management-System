const express = require("express");
const groupsRouter = express.Router();
const {
    showGroups,
    getGroupsCount,
    addGroups
} = require("../controllers/groupControllers");

groupsRouter.post("/add", addGroups);
groupsRouter.get("/show", showGroups);
groupsRouter.get("/getCount", getGroupsCount);

module.exports = groupsRouter;