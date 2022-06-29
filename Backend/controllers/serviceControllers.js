const mainServices = require("../models/mainServices")


const getAllServices = async (req, res) => {
  try {
    let service = await mainServices.find()
    res.json(service)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const addMainService = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json(error.message)
  }
}

// const addChildService = async (req, res) => {
//   try {
//     const { serviceCode, name, parentId } = req.body
//     let serviceFind = await 
//   } catch (error) {
//     res.status(500).json(error.message)
//   }
// }

module.exports = { getAllServices, addMainService }
