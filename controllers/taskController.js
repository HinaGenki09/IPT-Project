const Task = require("../models/Task");
const Campaign = require("../models/Campaign");
const User = require("../models/User");
const AuditLog = require("../models/AuditLog");

const {
    getCampaignRecipients,
    createWorkflowNotifications
} = require("../utils/notificationHelper");


// ==========================
// GET TASKS
// ==========================
exports.getTasks = async (req, res) => {
    try {
        const { campaignId } = req.params;

        const campaign =
            await Campaign.findById(campaignId);

        if (!campaign) {
            return res.status(404).json({
                message: "Campaign not found."
            });
        }

        const tasks =
            await Task.find({
                campaign: campaignId
            })
                .populate(
                    "createdBy",
                    "username email"
                )
                .sort({
                    createdAt: 1
                });

        res.json(tasks);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error."
        });
    }
};


// ==========================
// CREATE TASK
// ==========================
exports.createTask = async (req, res) => {
    try {
        const { campaignId } = req.params;

        const {
            name,
            description,
            dueDate
        } = req.body;

        // Check task name
        if (!name) {
            return res.status(400).json({
                message:
                    "Task name is required."
            });
        }

        // Get campaign
        const campaign =
            await Campaign.findById(campaignId)
                .populate(
                    "members.user",
                    "username email"
                );

        if (!campaign) {
            return res.status(404).json({
                message:
                    "Campaign not found."
            });
        }

        // Find logged-in user in campaign members
        const currentMember =
            campaign.members.find(
                member =>
                    member.user &&
                    member.user._id.toString() ===
                    req.user.userId
            );

        let userRole = null;


        // ==========================
        // CHECK OWNER
        // ==========================

        if (!currentMember) {

            const user =
                await User.findById(
                    req.user.userId
                );

            if (
                user &&
                user.username ===
                    campaign.owner
            ) {

                // Owner with no members
                // = Solo Content Creator
                if (
                    campaign.members.length === 0
                ) {
                    userRole =
                        "Solo Content Creator";
                }

                // Owner with members
                // = Lead
                else {
                    userRole = "Lead";
                }
            }
        }


        // ==========================
        // CHECK MEMBER ROLE
        // ==========================

        if (currentMember) {
            userRole =
                currentMember.role;
        }


        // ==========================
        // NO ACCESS
        // ==========================

        if (!userRole) {
            return res.status(403).json({
                message:
                    "You do not have access to this campaign."
            });
        }


        // ==========================
        // COLLABORATOR CANNOT ADD
        // ==========================

        if (
            userRole ===
            "Collaborator"
        ) {
            return res.status(403).json({
                message:
                    "Collaborators cannot add tasks."
            });
        }


        // ==========================
        // CLIENT REVIEW
        // ==========================

        let reviewStatus =
            "Not Required";

        if (
            userRole === "Client"
        ) {
            reviewStatus =
                "Pending Review";
        }


        // ==========================
        // CREATE TASK
        // ==========================

        const task =
            new Task({
                campaign:
                    campaignId,

                name:
                    name,

                description:
                    description || "",

                dueDate:
                    dueDate || "",

                createdBy:
                    req.user.userId,

                createdByRole:
                    userRole,

                reviewStatus:
                    reviewStatus
            });


        await task.save();


        // ==========================
        // NOTIFY PARTICIPANTS
        // ==========================

        let notificationRecipients = [];

        if (userRole === "Client") {

            notificationRecipients =
                await getCampaignRecipients(
                    campaignId,
                    req.user.userId,
                    ["Lead"]
                );

        } else {

            notificationRecipients =
                await getCampaignRecipients(
                    campaignId,
                    req.user.userId,
                    ["Client"]
                );

        }


        await createWorkflowNotifications({

            campaignId:

                campaignId,

            actorId:
                req.user.userId,

            recipientIds:
                notificationRecipients,

            title:
                userRole === "Client"
                    ? "Client submitted a task for review"
                    : "New task added",

            message:
                userRole === "Client"
                    ? `${req.user.username || "A client"} submitted "${task.name}" for your review.`
                    : `${req.user.username || "A campaign member"} added task "${task.name}".`

        });


        // Audit Log
        await AuditLog.create({
            user:
                req.user.userId,

            campaign:
                campaignId,

            action:
                "Task Created",

            description:
                `Created task "${task.name}".`
        });


        // Get populated task
        const populatedTask =
            await Task.findById(
                task._id
            )
                .populate(
                    "createdBy",
                    "username email"
                );


        res.status(201).json({
            message:
                userRole === "Client"
                    ? "Task submitted for Lead review."
                    : "Task created successfully.",

            task:
                populatedTask
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message:
                "Server error."
        });
    }
};


// ==========================
// UPDATE TASK STATUS
// ==========================
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const { status } = req.body;


        // Find task
        const task =
            await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                message:
                    "Task not found."
            });
        }


        // Find campaign
        const campaign =
            await Campaign.findById(
                task.campaign
            );

        if (!campaign) {
            return res.status(404).json({
                message:
                    "Campaign not found."
            });
        }


        // Find member
        const currentMember =
            campaign.members.find(
                member =>
                    member.user &&
                    member.user.toString() ===
                    req.user.userId
            );

        let userRole = null;


        // ==========================
        // MEMBER ROLE
        // ==========================

        if (currentMember) {
            userRole =
                currentMember.role;
        }


        // ==========================
        // OWNER ROLE
        // ==========================

        if (!userRole) {

            const user =
                await User.findById(
                    req.user.userId
                );

            if (
                user &&
                user.username ===
                    campaign.owner
            ) {

                if (
                    campaign.members.length === 0
                ) {
                    userRole =
                        "Solo Content Creator";
                } else {
                    userRole =
                        "Lead";
                }
            }
        }


        // ==========================
        // NO ACCESS
        // ==========================

        if (!userRole) {
            return res.status(403).json({
                message:
                    "Access denied."
            });
        }


        // ==========================
        // UPDATE STATUS
        // ==========================

        const oldStatus =
            task.status;

        task.status =
            status;

        await task.save();


        if (oldStatus !== status) {

            await AuditLog.create({
                user:
                    req.user.userId,

                campaign:
                    task.campaign,

                action:
                    "Task Status Changed",

                description:
                    `Changed task "${task.name}" from ${oldStatus} to ${status}.`
            });


            // ==========================
            // NOTIFY PARTICIPANTS
            // ==========================

            let notificationRecipients = [];

            if (
                userRole === "Client"
            ) {

                notificationRecipients =
                    await getCampaignRecipients(
                        task.campaign,
                        req.user.userId,
                        ["Lead"]
                    );

            } else {

                notificationRecipients =
                    await getCampaignRecipients(
                        task.campaign,
                        req.user.userId,
                        ["Client"]
                    );

            }


            await createWorkflowNotifications({

                campaignId:
                    task.campaign,

                actorId:
                    req.user.userId,

                recipientIds:
                    notificationRecipients,

                title:
                    "Task status updated",

                message:
                    `${req.user.username || "A campaign member"} changed "${task.name}" from ${oldStatus} to ${status}.`

            });

        }


        res.json({
            message:
                "Task updated successfully.",

            task:
                task
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message:
                "Server error."
        });
    }
};


// ==========================
// REVIEW CLIENT TASK
// ==========================
exports.reviewTask = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            reviewStatus
        } = req.body;


        // Check review status
        if (
            ![
                "Approved",
                "Rejected"
            ].includes(
                reviewStatus
            )
        ) {
            return res.status(400).json({
                message:
                    "Review must be Approved or Rejected."
            });
        }


        // Find task
        const task =
            await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                message:
                    "Task not found."
            });
        }


        // Find campaign
        const campaign =
            await Campaign.findById(
                task.campaign
            );

        if (!campaign) {
            return res.status(404).json({
                message:
                    "Campaign not found."
            });
        }


        // Find current member
        const currentMember =
            campaign.members.find(
                member =>
                    member.user &&
                    member.user.toString() ===
                    req.user.userId
            );

        let userRole = null;


        // ==========================
        // MEMBER ROLE
        // ==========================

        if (currentMember) {
            userRole =
                currentMember.role;
        }


        // ==========================
        // OWNER ROLE
        // ==========================

        if (!userRole) {

            const user =
                await User.findById(
                    req.user.userId
                );

            if (
                user &&
                user.username ===
                    campaign.owner
            ) {

                // Owner becomes Lead
                // when campaign has members
                if (
                    campaign.members.length > 0
                ) {
                    userRole =
                        "Lead";
                }
            }
        }


        // ==========================
        // ONLY LEAD CAN REVIEW
        // ==========================

        if (
            userRole !== "Lead"
        ) {
            return res.status(403).json({
                message:
                    "Only the Lead can review client tasks."
            });
        }


        // ==========================
        // ONLY CLIENT TASKS
        // ==========================

        if (
            task.createdByRole !==
            "Client"
        ) {
            return res.status(400).json({
                message:
                    "Only client tasks require review."
            });
        }


        // ==========================
        // UPDATE REVIEW
        // ==========================

        task.reviewStatus =
            reviewStatus;


        // Rejected tasks return
        // to Not Started
        if (
            reviewStatus ===
            "Rejected"
        ) {
            task.status =
                "Not Started";
        }


        // Approved tasks become active
        if (
            reviewStatus ===
            "Approved"
        ) {
            task.status =
                "Not Started";
        }


        await task.save();


        // ==========================
        // NOTIFY CLIENT
        // ==========================

        const notificationRecipients =
            await getCampaignRecipients(
                task.campaign,
                req.user.userId,
                ["Client"]
            );


        await createWorkflowNotifications({

            campaignId:
                task.campaign,

            actorId:
                req.user.userId,

            recipientIds:
                notificationRecipients,

            title:
                `Task ${reviewStatus.toLowerCase()}`,

            message:
                `"${task.name}" was ${reviewStatus.toLowerCase()} by the Lead.`

        });


        res.json({
            message:
                `Task ${reviewStatus.toLowerCase()} successfully.`,

            task:
                task
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message:
                "Server error."
        });
    }
};


// ==========================
// DELETE TASK
// ==========================
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found."
            });
        }

        const campaign = await Campaign.findById(
            task.campaign
        );

        if (!campaign) {
            return res.status(404).json({
                message: "Campaign not found."
            });
        }

        const currentMember =
            campaign.members.find(
                member =>
                    member.user &&
                    member.user.toString() ===
                    req.user.userId
            );

        let userRole = null;

        if (currentMember) {
            userRole = currentMember.role;
        }

        if (!userRole) {
            const user = await User.findById(
                req.user.userId
            );

            if (
                user &&
                user.username === campaign.owner
            ) {
                if (campaign.members.length === 0) {
                    userRole = "Solo Content Creator";
                } else {
                    userRole = "Lead";
                }
            }
        }

        if (!userRole) {
            return res.status(403).json({
                message: "Access denied."
            });
        }

        await Task.findByIdAndDelete(id);


        await AuditLog.create({
            user:
                req.user.userId,

            campaign:
                task.campaign,

            action:
                "Task Deleted",

            description:
                `Deleted task "${task.name}".`
        });


        res.json({
            message:
                "Task deleted successfully."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error."
        });
    }
};