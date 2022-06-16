const mongoose = require("mongoose")
const schema = mongoose.Schema

const usersInfoSchema = new schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  roleId: {
    type: mongoose.Types.ObjectId,
    ref: "roles",
  },
  groupsId: [
    {
      type: mongoose.Types.ObjectId,
      ref: "groups",
    },
  ],
})

const usersInfo = mongoose.model("usersInfo", usersInfoSchema)

module.exports = usersInfo
