const groups = require('../DB/GroupsDB');

const showGroups = (req, res) => {
    res.json(groups);
};

const getGroupsCount = (req, res) => {
    res.json(groups.length);
};

module.exports = {
    showGroups,
    getGroupsCount
};