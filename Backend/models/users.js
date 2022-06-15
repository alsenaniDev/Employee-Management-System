const mongoose = require("mongoose")
const schema = mongoose.Schema

const usersSchema = new schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phoneNumber: Number,
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
  CreatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
})

const users = mongoose.model("users", usersSchema)

module.exports = users
