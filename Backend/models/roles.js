const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rolesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        required: true
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Roles = mongoose.model("roles", rolesSchema);
module.exports = Roles;