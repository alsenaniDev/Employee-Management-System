const Roles = require("../models/roles")

const showRoles = (req, res) => {
  Roles.find({}, (err, role) => {
    res.json(role)
  }).populate({
    path: "createBy",
    select: "_id firstName lastName email phoneNumber"
  })
}

const getCount = (req, res) => {
  Roles.find({}, (err, role) => {
    res.json({
      data: role.length
    })
  })
}

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

const deleteRoles = (req, res) => {
  Roles.deleteOne({
    _id: req.params.id
  }, (err, role) => {
    res.json({
      result: "Delete Role successfully"
    });
  });
}

const updateRoles = (req, res) => {
  Roles.findByIdAndUpdate({
      _id: req.params.id
    }, {
      name: req.body.name,
    },
    (err, role) => {
      res.json({
        result: role,
      });
    }
  );
}

const getRoleById = (req, res) => {
  Roles.findOne({
    _id: req.params.id
  }, (err, role) => {
    res.json({
      result: role
    });
  }).populate({
    path: "createBy",
    select: "_id firstName lastName email phoneNumber"
  });
}


module.exports = {
  showRoles,
  getCount,
  addRoles,
  deleteRoles,
  updateRoles,
  getRoleById
}