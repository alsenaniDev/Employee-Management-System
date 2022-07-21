const serviceRoles = require("../models/serviceRoles")

const getAllServiceRoles = async (req, res) => {
    try {
        let serviceRole = await serviceRoles.find()
            .populate({
                path: "serviceId"
            })

        res.json(serviceRole)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getServiceRoles = async (req, res) => {
    try {
        let serviceRole = await serviceRoles.findOne({
            serviceId: req.params.serviceId
        }).select('rolesIds')

        res.json(serviceRole)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const addServiceRoles = async (req, res) => {
    try {
        let service = await serviceRoles.findOne({
            serviceId: req.body.serviceId,
        })

        let newRolesIds = service.rolesIds.concat(req.body.rolesIds);

        serviceRoles.findOneAndUpdate({
                serviceId: req.body.serviceId,
            }, {
                rolesIds: newRolesIds,
            },
            (err, role) => {
                res.json({
                    result: role,
                })
            }
        )
    } catch (error) {
        res.send("Error: No such service")
    }
}

const deleteServiceRole = async (req, res) => {
    let service = await serviceRoles.findOne({
        serviceId: req.params.serviceId,
    })

    let roles = service.rolesIds.filter((role) => role != req.params.roleId)

    serviceRoles.findOneAndUpdate({
            serviceId: req.params.serviceId,
        }, {
            rolesIds: roles,
        },
        (err, role) => {
            res.json({
                result: role,
            })
        }
    )
}

module.exports = {
    getAllServiceRoles,
    addServiceRoles,
    deleteServiceRole,
    getServiceRoles
}