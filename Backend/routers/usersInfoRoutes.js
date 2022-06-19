const express = require("express")

const userInfoRouter = express.Router()
const {
  getUsers,
  getUserById,
  deleteUser,
  addUser,
  updateUser,
  deleteSelectedUsers,
  getGroupsByUserId,
  getRoleByUserId
} = require("../controllers/usersInfoControllers")
const AuthorizationsRole = require("../middleware/AuthorizationsRole")

userInfoRouter.get("/show/:id", getUsers)
userInfoRouter.get("/showUserById/:id", getUserById)
userInfoRouter.get("/getGroupsByUserId/:id", getGroupsByUserId)
userInfoRouter.get("/getRoleByUserId/:id", getRoleByUserId)

userInfoRouter.post("/add", addUser)

userInfoRouter.put("/update/:id", AuthorizationsRole, updateUser)

userInfoRouter.delete("/delete/:id", AuthorizationsRole, deleteUser)
userInfoRouter.delete("/deleteSelcted", AuthorizationsRole, deleteSelectedUsers)

module.exports = userInfoRouter