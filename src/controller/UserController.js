const User = require("../model/User");
const multer = require("multer");
const bcrypt = require('bcrypt');

const userController = {

    getAllUsers: async (req, res) => {

        let params = {};
        if (req.query.address) params.address = req.query.address;
        if (req.query.gender) params.gender = req.query.gender;
        if (req.query.full_name) params.full_name = { $regex: '.*' + req.query.full_name + '.*' }
        if (req.query.created_at) params.created_at = { $eq: req.query.created_at }
        if (req.query.start_date && req.query.end_date) params.created_at = { $gte: req.query.start_date, $lt: req.query.end_date }

        const users = await User.find(params).populate("songs");
        res.json({ data: users, message: "OK" });
    },
    getSingleUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.json({ data: user });
        } catch (error) {
            res.json(error);
        }
    },
    addNewUser: async (req, res) => {

        const saltRounds = 10;
        bcrypt.hash(req.body.password, saltRounds, async (err, password) => {
            if (!err) {
                const newUser = new User({
                    full_name: req.body.full_name,
                    gender: req.body.gender,
                    address: req.body.address,
                    image_url: req.body.image_name,
                    email: req.body.email,
                    password: password,
                });
                try {
                    const user = await newUser.save();
                    res.json(user);
                } catch (error) {
                    res.json(error);
                }
            }
        });
    },
    editUser: async (req, res) => {
        const id = req.params.id;
        const data = {
            full_name: req.body.full_name,
            gender: req.body.gender,
            address: req.body.address,
        }
        try {
            await User.findByIdAndUpdate(id, data);
            const user = await User.findById(id);
            res.json({ data: user, message: "User Updated !" });
        } catch (error) {
            res.status(400).json(error.message);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(400).json({ message: "No Data Found!" })
        }
    },
    uploadImage: (req, res) => {

    }
}

module.exports = userController;

// CRUD

// create
// read
// update
// delete 