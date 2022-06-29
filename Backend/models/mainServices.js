const mongoose = require("mongoose")
const schema = mongoose.Schema

const serviceSchema = new schema({
  serviceCode: Number,
  name: String,
  parentId: Number,
  child: [],
})

const mainServices = mongoose.model("Mainservice", serviceSchema)

module.exports = mainServices
