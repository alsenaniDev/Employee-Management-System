const Groups = require("../models/groups")

const addGroups = async (req, res) => {
  const newGroup = new Groups({
    name: req.body.name,
    createBy: req.userId,
  })
  const groupFound = await Groups.findOne({ name: newGroup.name })
  if (groupFound) return res.status(404).send("The Group is Already Exist")
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
  Groups.find({}, (err, group) => {
    res.json(group)
  }).populate({
    path: "createBy",
    select: "_id firstName lastName email phoneNumber",
  })
}

const getGroupsCount = (req, res) => {
  Groups.find({}, (err, group) => {
    res.json({
      data: group.length,
    })
  })
}

const getGroupById = (req, res) => {
  Groups.findOne(
    {
      _id: req.params.id,
    },
    (err, group) => {
      res.json({
        result: group,
      })
    }
  ).populate({
    path: "createBy",
    select: "_id firstName lastName email phoneNumber",
  })
}

const deleteGroups = (req, res) => {
  Groups.deleteOne(
    {
      _id: req.params.id,
    },
    (err, group) => {
      res.json({
        result: "Delete Group successfully",
      })
    }
  )
}

const updateGroups = (req, res) => {
  Groups.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    {
      name: req.body.name,
    },
    (err, group) => {
      res.json({
        result: group,
      })
    }
  )
}

module.exports = {
  showGroups,
  getGroupsCount,
  addGroups,
  deleteGroups,
  updateGroups,
  getGroupById,
}
