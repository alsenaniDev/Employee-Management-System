const express = require("express")

const userInfoRouter = express.Router()
const {
  // getUsers,
  getUserById,
  deleteUser,
  addUser,
  updateUser,
  deleteSelectedUsers,
  getGroupsByUserId,
  getRoleByUserId,
  getUsersPagination,
  getUsersRolesCount,
  getUsersGroupsCount
} = require("../controllers/usersInfoControllers")
const AuthorizationsRole = require("../middleware/AuthorizationsRole")

// userInfoRouter.get("/show/:id", getUsers)
userInfoRouter.get("/showUserById/:id", getUserById)
userInfoRouter.get("/getGroupsByUserId/:id", getGroupsByUserId)
userInfoRouter.get("/getRoleByUserId/:id", getRoleByUserId)

userInfoRouter.post("/add", addUser)

userInfoRouter.put("/update/:id", updateUser)

userInfoRouter.delete("/delete/:id", deleteUser)
userInfoRouter.delete("/deleteSelcted", deleteSelectedUsers)

userInfoRouter.post("/paganition/:id", getUsersPagination)

userInfoRouter.get("/usersRoles", getUsersRolesCount)
userInfoRouter.get("/usersGroups", getUsersGroupsCount)


module.exports = userInfoRouter
