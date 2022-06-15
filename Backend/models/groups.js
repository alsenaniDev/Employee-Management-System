const mongoose = require("mongoose")
const Schema = mongoose.Schema

const groupsSchema = new Schema({
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

const Groups = mongoose.model("groups", groupsSchema)
module.exports = Groups
