const mongoose = require("mongoose")
const schema = mongoose.Schema

const usersInfoSchema = new schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  groupsId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "groups",
  }],
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "roles",
  },
})

const usersInfo = mongoose.model("usersInfo", usersInfoSchema)

module.exports = usersInfo