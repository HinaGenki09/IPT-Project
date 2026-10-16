const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign",
            required: true
        },

        type: {
            type: String,
            enum: [
                "Workflow",
                "Audit Log"
            ],
            default: "Workflow"
        },

        title: {
            type: String,
            required: true
        },

        message: {
            type: String,
            default: ""
        },

        isRead: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.model(
        "Notification",
        notificationSchema
    );