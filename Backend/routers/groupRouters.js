const express = require("express");
const groupsRouter = express.Router();
const {
    showGroups,
    getGroupsCount
} = require("../controllers/groupControllers");

groupsRouter.get("/show", showGroups);
groupsRouter.get("/getCount", getGroupsCount);

module.exports = groupsRouter;