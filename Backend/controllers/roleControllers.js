const roles = require('../DB/RolesDB');

const showRoles = (req, res) => {
    res.json(roles);
};

module.exports = {
    showRoles,
};