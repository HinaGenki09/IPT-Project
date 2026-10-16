const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
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

        type: {
    type: String,
    enum: [
        "Content deadline",
        "Review deadline",
        "Posting date",
        "Campaign meeting",
        "Shoot",
        "Reminder"
    ],
    default: "Content deadline"
},

        description: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "Not Started",
                "In Progress",
                "Done"
            ],
            default: "Not Started"
        },

        dueDate: {
            type: String,
            default: ""
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        createdByRole: {
            type: String,
            enum: [
                "Solo Content Creator",
                "Lead",
                "Collaborator",
                "Client"
            ],
            required: true
        },

        reviewStatus: {
            type: String,
            enum: [
                "Not Required",
                "Pending Review",
                "Approved",
                "Rejected"
            ],
            default: "Not Required"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Task", taskSchema);