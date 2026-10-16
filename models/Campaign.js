const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        description: {
            type: String,
            default: ""
        },

        brief: {
    objective: {
        type: String,
        default: ""
    },

    keyMessage: {
        type: String,
        default: ""
    },

    targetAudience: {
        type: String,
        default: ""
    }
},

        owner: {
            type: String,
            required: true
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            required: true
        },

        image: {
            type: String,
            default: ""
        },

        status: {
            type: String,

            enum: [
                "Planning",
                "In Progress",
                "Completed"
            ],

            default: "Planning"
        },

        members: [
            {
                user: {
                    type:
                        mongoose.Schema.Types.ObjectId,

                    ref: "User"
                },

                role: {
                    type: String,

                    enum: [
                        "Lead",
                        "Collaborator",
                        "Client"
                    ],

                    required: true
                }
            }
        ]
    },

    {
        timestamps: true
    }
);

module.exports =
    mongoose.model(
        "Campaign",
        campaignSchema
    );