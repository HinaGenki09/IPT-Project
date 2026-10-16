const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        username: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        accountType: {
    type: String,
    enum: ["", "Content Creator", "Client"],
    default: ""
},
    },

    {
        timestamps: true
    }
);

module.exports =
    mongoose.model(
        "User",
        userSchema
    );