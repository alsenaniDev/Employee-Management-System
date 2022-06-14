const groups = require('../DB/GroupsDB');

const showGroups = (req, res) => {
    res.json(groups);
};

module.exports = {
    showGroups,
};