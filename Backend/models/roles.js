const mongoose = require("mongoose")
const Schema = mongoose.Schema

const rolesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  createBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
})

const Roles = mongoose.model("roles", rolesSchema)
module.exports = Roles
