const Groups = require("../models/groups")

const addGroups = (req, res) => {
  const newGroup = new Groups({
    name: req.body.name,
    createBy: req.userId,
  })

  newGroup
    .save()
    .then(result =>
      res.json({
        result: result,
      })
    )
    .catch(err => console.log(err))
}

const showGroups = (req, res) => {
  res.json(Groups)
}

const getGroupsCount = (req, res) => {
  res.json(Groups.length)
}

module.exports = {
  showGroups,
  getGroupsCount,
  addGroups,
}
