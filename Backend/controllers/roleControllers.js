const Roles = require("../models/roles")

const addRoles = (req, res) => {
  const newRole = new Roles({
    name: req.body.name,
    createBy: req.userId,
  })

  newRole
    .save()
    .then(result =>
      res.json({
        result: result,
      })
    )
    .catch(err => console.log(err))
}

const showRoles = (req, res) => {
  res.json(Roles)
}

const getCount = (req, res) => {
  res.json(Roles.length)
}

module.exports = {
  showRoles,
  getCount,
  addRoles,
}
