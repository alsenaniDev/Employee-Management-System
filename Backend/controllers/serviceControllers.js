const services = require("../models/services")


const getAllServices = async (req, res) => {
  try {
    let service = await services.find()
    res.json(service)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const addService = async (req, res) => {
  const newService = new services({
    code: req.body.code,
    name: req.body.name,
    parentCode: req.body.parentCode,
  })

  const serviceFound = await services.findOne({
    code: newService.code
  })

  if (serviceFound) return res.status(404).send("The Service is Already Exist")

  newService
    .save()
    .then(result =>
      res.json(result)
    )
    .catch(err => console.log(err))
}

const updateService = (req, res) => {
  services.findByIdAndUpdate({
      _id: req.params.id,
    }, {
      code: req.body.code,
      name: req.body.name,
      parentCode: req.body.parentCode,
    },
    (err, service) => {
      res.json(service)
    }
  )
}

const getServicesByParentCode = (req, res) => {
  services.find({
      parentCode: req.params.code,
    },
    (err, service) => {
      res.json(service)
    }
  )
}

module.exports = {
  getAllServices,
  addService,
  updateService,
  getServicesByParentCode
}