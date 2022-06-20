const users = require("../models/users")
const usersInfo = require("../models/usersInfo")
ObjectId = require("mongodb").ObjectID

const updateUserInfo = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
        } = req.body

        const userData = await users.findByIdAndUpdate(
            req.params.id, {
                $set: {
                    firstName,
                    lastName,
                    email,
                    phoneNumber
                },
            }, {
                new: true
            }
        )

        if (!userData) return res.status(404).json("User not found")
        res.json(userData)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const updateUserPassword = async (req, res) => {
    try {
        const {
            password
        } = req.body

        const userData = await users.findByIdAndUpdate(
            req.params.id, {
                $set: {
                    password
                },
            }, {
                new: true
            }
        )

        if (!userData) return res.status(404).json("User not found")
        res.json(userData)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getUserData = async (req, res) => {
    try {
        var userInfo = await usersInfo
            .findOne({
                userId: req.params.id
            })
            .populate("userId")
            .populate("roleId")
            .populate("groupsId")
        var response = {
            userId: userInfo.userId._id,
            CreatedAt: userInfo.userId.CreatedAt,
            email: userInfo.userId.email,
            firstName: userInfo.userId.firstName,
            lastName: userInfo.userId.lastName,
            phoneNumber: userInfo.userId.phoneNumber,
            CreatedBy: userInfo.userId.CreatedBy,
            password: userInfo.userId.password,
            groups: userInfo.groupsId.map(group => group.name),
            role: userInfo.roleId.name,
        }
        res.json(response)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {
    updateUserInfo,
    updateUserPassword,
    getUserData
}