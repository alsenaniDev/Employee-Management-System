const roles = require('../DB/RolesDB');

const showRoles = (req, res) => {
    res.json(roles);
};

const getCount = (req, res) => {
    res.json(roles.length);
};

module.exports = {
    showRoles,
    getCount
};