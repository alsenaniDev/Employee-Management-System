const express = require("express")

const userInfoRouter = express.Router()
const {
  getUsers,
  getUserById,
  deleteUser,
  addUser,
  updateUser,
  deleteSeleectedUsers,
} = require("../controllers/usersInfoControllers")
const AuthorizationsRole = require("../middleware/AuthorizationsRole")

userInfoRouter.get("/show", getUsers)
userInfoRouter.get("/show/:id", getUserById)
userInfoRouter.post("/add", AuthorizationsRole, addUser)
userInfoRouter.put("/update/:id", AuthorizationsRole, updateUser)
userInfoRouter.delete("/delete/:id", AuthorizationsRole, deleteUser)
userInfoRouter.delete("/deleteSelcted", AuthorizationsRole, deleteSeleectedUsers)

module.exports = userInfoRouter
