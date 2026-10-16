const mongoose = require("mongoose");

const calendarNoteSchema = new mongoose.Schema(
    {
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        details: {
            type: String,
            default: ""
        },

        date: {
            type: String,
            required: true
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

module.exports =
    mongoose.model(
        "CalendarNote",
        calendarNoteSchema
    );