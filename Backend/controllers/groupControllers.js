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

const getGroupById = (req, res) => {
  Groups.findOne({
    _id: req.params.id
  }, (err, group) => {
    res.json({
      result: group
    });
  }).populate({
    path: "createBy",
    select: "_id firstName lastName email phoneNumber"
  });
}

const deleteGroups = (req, res) => {
  Groups.deleteOne({
    _id: req.params.id
  }, (err, group) => {
    res.json({
      result: "Delete Group successfully"
    });
  });
}

const updateGroups = (req, res) => {
  Groups.findByIdAndUpdate({
      _id: req.params.id
    }, {
      name: req.body.name,
    },
    (err, group) => {
      res.json({
        result: group,
      });
    }
  );
};


module.exports = {
  showGroups,
  getGroupsCount,
  addGroups,
  deleteGroups,
  updateGroups,
  getGroupById
}