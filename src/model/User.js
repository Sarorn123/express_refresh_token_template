const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    full_name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    image_url: {
        type: String,
        default: "",
    },

    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "songs",
            required: true,
            default: [],
        },
    ],

    created_at: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});

module.exports = mongoose.model("users", UserSchema);