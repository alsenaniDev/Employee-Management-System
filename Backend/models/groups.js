const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupsSchema = new Schema({
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

const Groups = mongoose.model("groups", groupsSchema);
module.exports = Groups;