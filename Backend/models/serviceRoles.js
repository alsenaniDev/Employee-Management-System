const mongoose = require("mongoose")
const schema = mongoose.Schema

const serviceRolesSchema = new schema({
    serviceId: {
        type: mongoose.Types.ObjectId,
        ref: "services",
    },
    rolesIds: [{
        type: mongoose.Types.ObjectId,
        ref: "roles",
    }]
})

const serviceRoles = mongoose.model("serviceRoles", serviceRolesSchema)

module.exports = serviceRoles