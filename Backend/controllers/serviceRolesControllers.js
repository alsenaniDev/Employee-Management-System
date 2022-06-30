const serviceRoles = require("../models/serviceRoles")

const getAllServiceRoles = async (req, res) => {
    try {
        let serviceRole = await serviceRoles.find()
            .populate({
                path: "serviceId"
            })
            .populate({
                path: "rolesIds",
                select: "-CreatedAt -CreateBy -createAt -__v"
            })

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

// const CheckServiceRole = async (req , res) => {
//     try {
//         const serviceRoleFound = await serviceRoles.findOne()
//         res.json(serviceRoleFound)
//     } catch (error) {
//         res.status(500).json(error.message)
//     }
// }

module.exports = {
    getAllServiceRoles,
    addServiceRoles
}