const serviceRoles = require("../models/serviceRoles")

const getAllServiceRoles = async (req, res) => {
    try {
        let serviceRole = await serviceRoles.find()
            .populate("serviceId")
            .populate("rolesIds")

        res.json(serviceRole)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const addServiceRoles = async (req, res) => {
    const newServiceRoles = new serviceRoles({
        serviceId: req.body.serviceId,
        rolesIds: req.body.rolesIds,
    })

    newServiceRoles
        .save()
        .then(result =>
            res.json(result)
        )
        .catch(err => console.log(err))
}

module.exports = {
    getAllServiceRoles,
    addServiceRoles
}