const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
    {
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign",
            required: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        fileUrl: {
            type: String,
            required: true
        },

        fileType: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "Pending Review",
                "Reviewed",
                "Approved",
                "Revision Requested"
            ],
            default: "Pending Review"
        },

        currentVersion: {
            type: Number,
            default: 1
        },

        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.model(
        "Asset",
        assetSchema
    );