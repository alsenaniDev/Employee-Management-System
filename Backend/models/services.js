const mongoose = require("mongoose")
const schema = mongoose.Schema

const serviceSchema = new schema({
  code: Number,
  name: String,
  parentCode: Number,
})

const services = mongoose.model("services", serviceSchema)

module.exports = services