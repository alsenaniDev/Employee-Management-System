const users = require("../DB/UsersDB")
const usersInfo = require("../DB/UsersInfoDB")
const roles = require("../DB/RolesDB")
const groups = require("../DB/GroupsDB")

const showUsersData = (req, res) => {
  let response = usersInfo.map(userIds => {
    let user = users.find(user => user.userId == userIds.userId)
    let userGroups = groups.filter(group => userIds.groups.includes(group.id))
      .map(item => {
        return item.name
      })
    let userRoles = roles.find(role => role.id == userIds.role)?.name
    return {
      userId: user.userId,
      CreatedAt: user.CreatedAt,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      CreatedBy: user.CreatedBy,
      password: user.password,
      groups: userGroups,
      role: userRoles,
    }
  })
  res.json(response)
}

module.exports = { showUsersData }
