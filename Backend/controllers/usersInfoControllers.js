// const usersInfo = require("../DB/UsersInfoDB")
const roles = require("../DB/RolesDB")
const groups = require("../DB/GroupsDB")
const usersInfo = require("../models/usersInfo")
const users = require("../models/users")
const Groups = require("../models/groups")
ObjectId = require("mongodb").ObjectID
class PagedResult {
  totalRecords
  result
}

const getUsers = async (req, res) => {
  let userFound = await usersInfo.findOne({ userId: req.params.id }).populate("roleId").populate("groupsId")
  let GroupsIds = userFound.groupsId.map(group => group.name)

  // return console.log(GroupsIds)
  let userData = await usersInfo
    .find({
      userId: {
        $ne: req.params.id,
      },
    })
    .populate({
      path: "userId",
    })
    .populate("roleId")
    .populate("groupsId")

  let response = userData.map(user => {
    return {
      userId: user.userId._id,
      CreatedAt: user.userId.CreatedAt,
      email: user.userId.email,
      firstName: user.userId.firstName,
      lastName: user.userId.lastName,
      phoneNumber: user.userId.phoneNumber,
      CreatedBy: user.userId.CreatedBy,
      password: user.userId.password,
      groups: user.groupsId.map(group => group.name),
      role: user.roleId.name,
    }
  })
  if (userFound.roleId.name == "Admin") {
    res.json(response)
  } else {
    let user = response.filter(u => u.role == userFound.roleId.name || u.groups.find(g => GroupsIds.includes(g)))
    res.json(user)
    console.log(user)
  }
}

const getUserById = async (req, res) => {
  try {
    var userInfo = await usersInfo
      .findOne({
        userId: req.params.id,
      })
      .populate("userId")
      .populate("roleId")
      .populate("groupsId")
    var response = {
      userId: userInfo.userId._id,
      CreatedAt: userInfo.userId.CreatedAt,
      email: userInfo.userId.email,
      firstName: userInfo.userId.firstName,
      lastName: userInfo.userId.lastName,
      phoneNumber: userInfo.userId.phoneNumber,
      CreatedBy: userInfo.userId.CreatedBy,
      password: userInfo.userId.password,
      groups: userInfo.groupsId.map(group => group.name),
      role: userInfo.roleId.name,
    }
    res.json(response)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, roleId, groupsId, CreatedBy } = req.body
    const newUser = new users({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      CreatedBy,
    })
    const userIds = new usersInfo({
      userId: newUser._id,
      roleId,
      groupsId,
    })

    const findUserEmail = await users.findOne({ email: newUser.email })
    if (findUserEmail) return res.status(404).send("The User is Already Exist")
    const findUserPhone = await users.findOne({ phoneNumber: newUser.phoneNumber })
    if (findUserPhone) return res.status(404).send("The Phone Number is Exist")
    await newUser.save()
    await userIds.save()
    res.json({ message: "the user is Added" })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const deleteUser = async (req, res) => {
  try {
    const userData = await users.findById(req.params.id)
    const userIds = await usersInfo.findOne({
      userId: req.params.id,
    })
    if (!userData || !userIds) return res.status(404).send("User not found")
    await users.findByIdAndDelete(userData._id)
    await usersInfo.findOneAndDelete({
      userId: req.params.id,
    })
    res.json("The User is Delete")
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const deleteSelectedUsers = async (req, res) => {
  const { usersSelect } = req.body
  await users.deleteMany({
    _id: {
      $in: usersSelect,
    },
  })
  await usersInfo.deleteMany({
    userId: {
      $in: usersSelect,
    },
  })
  res.json({ message: "the users is deleted" })
}

const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, roleId, groupsId } = req.body
    const userData = await users.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
        },
      },
      {
        new: true,
      }
    )
    const userIds = await usersInfo
      .findOneAndUpdate(
        {
          userId: req.params.id,
        },
        {
          $set: {
            roleId,
            groupsId,
          },
        },
        {
          new: true,
        }
      )
      .populate("roleId")
      .populate("groupsId")

    if (!userData || !userIds) return res.status(404).json("User not found")
    res.json(userIds)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const getGroupsByUserId = async (req, res) => {
  try {
    var userInfo = await usersInfo
      .findOne({
        userId: req.params.id,
      })
      .populate("groupsId")
    res.json(userInfo.groupsId)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const getRoleByUserId = async (req, res) => {
  try {
    var userInfo = await usersInfo
      .findOne({
        userId: req.params.id,
      })
      .populate("roleId")
    res.json(userInfo.roleId)
    res.json(response)
  } catch (error) {
    res.status(500).json(error.message)
  }
}
const getUsersPagination = async (req, res) => {
  let countRecord
  const { role, groups } = req.body.request
  const usersCount = await usersInfo.count()

  let usersRolesOrGroupsCount = await usersInfo
    .find({
      userId: { $ne: req.params.id },
      $or: [{ roleId: role }, { groupsId: { $in: groups } }],
    })
    .count()

  let usersRolesAndGroupsCount = await usersInfo
    .find({
      userId: { $ne: req.params.id },
      roleId: role,
      groupsId: { $in: groups },
    })
    .count()

  console.log("users Roles or Groups Count :" + usersRolesOrGroupsCount)
  offset = req.body.request.pageNum > 0 ? (req.body.request.pageNum - 1) * req.body.request.pageLimit : 0

  let userDataInfo = await usersInfo
    .find({ userId: { $ne: req.params.id } })
    .sort({ _id: 1 })
    .skip(offset)
    .limit(req.body.request.pageLimit)
    .populate({
      path: "userId",
    })
    .populate("roleId")
    .populate("groupsId")

  let getUserDataByRoleOrGroup = await usersInfo
    .find({ userId: { $ne: req.params.id }, $or: [{ roleId: role }, { groupsId: { $in: groups } }] })
    .sort({ _id: 1 })
    .skip(offset)
    .limit(req.body.request.pageLimit)
    .populate({
      path: "userId",
    })
    .populate("roleId")
    .populate("groupsId")

  let getUserDataByRoleAndGroup = await usersInfo
    .find({ userId: { $ne: req.params.id }, roleId: role, groupsId: { $in: groups } })
    .sort({ _id: 1 })
    .skip(offset)
    .limit(req.body.request.pageLimit)
    .populate({
      path: "userId",
    })
    .populate("roleId")
    .populate("groupsId")

  if (req.body.request.role && req.body.request.groups && req.body.request.groups.length > 0) {
    userData = getUserDataByRoleAndGroup
    countRecord = usersRolesAndGroupsCount
  } else if ((req.body.request.role) || (req.body.request.groups && req.body.request.groups?.length > 0)) {
    userData = getUserDataByRoleOrGroup
    countRecord = usersRolesOrGroupsCount
  } else {
    userData = userDataInfo
    countRecord = usersCount
  }

  let usersInformation = userData.map(user => {
    return {
      userId: user.userId._id,
      CreatedAt: user.userId.CreatedAt,
      email: user.userId.email,
      firstName: user.userId.firstName,
      lastName: user.userId.lastName,
      phoneNumber: user.userId.phoneNumber,
      CreatedBy: user.userId.CreatedBy,
      password: user.userId.password,
      groups: user.groupsId.map(group => group.name),
      role: user.roleId.name,
    }
  })
  var response = new PagedResult()
  response.result = usersInformation
  response.totalRecords = countRecord

  res.json(response)

  // DB layer:
  // offset = req.query.pageNum > 0 ? (req.query.pageNum - 1) * req.query.pageLimit : 0
  // const userPaganition = await users.find().sort({ _id: 1 }).skip(offset).limit(req.query.pageLimit)
  // const coundRecord = await users.count()
  // // handler layer
  // var response = new PagedResult()
  // response.result = userPaganition
  // response.totalRecords = coundRecord
  // res.json(response)
}

module.exports = {
  getUsers,
  getUserById,
  deleteUser,
  addUser,
  updateUser,
  deleteSelectedUsers,
  getGroupsByUserId,
  getRoleByUserId,
  getUsersPagination,
}
