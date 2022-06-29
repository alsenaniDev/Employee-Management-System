const mongoose = require("mongoose")
const schema = mongoose.Schema

const serviceSchema = new schema({
  serviceCode: Number,
  name: String,
  parentId: Number,
  child: [{
    type : mongoose.Types.ObjectId
  }],
})

const childServices = mongoose.model("Mainservice", serviceSchema)

module.exports = childServices
