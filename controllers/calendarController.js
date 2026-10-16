const CalendarNote = require("../models/CalendarNote");
const Campaign = require("../models/Campaign");
const User = require("../models/User");

const {
    getCampaignRecipients,
    createWorkflowNotifications
} = require("../utils/notificationHelper");


// ==========================
// CHECK CAMPAIGN ACCESS
// ==========================
async function checkCampaignAccess(campaignId, userId) {

    const campaign =
        await Campaign.findById(campaignId);

    if (!campaign) {
        return {
            campaign: null,
            role: null
        };
    }

    const member =
        campaign.members.find(
            member =>
                member.user &&
                member.user.toString() === userId
        );

    if (member) {
        return {
            campaign,
            role: member.role
        };
    }

    const user =
        await User.findById(userId);

    if (
        user &&
        user.username === campaign.owner
    ) {
        return {
            campaign,
            role:
                campaign.members.length === 0
                    ? "Solo Content Creator"
                    : "Lead"
        };
    }

    return {
        campaign,
        role: null
    };
}


// ==========================
// GET CALENDAR NOTES
// ==========================
exports.getCalendarNotes = async (req, res) => {

    try {

        const { campaignId } = req.params;

        const access =
            await checkCampaignAccess(
                campaignId,
                req.user.userId
            );

        if (!access.campaign) {
            return res.status(404).json({
                message: "Campaign not found."
            });
        }

        if (!access.role) {
            return res.status(403).json({
                message:
                    "You do not have access to this campaign."
            });
        }

        const notes =
            await CalendarNote.find({
                campaign: campaignId
            })
                .populate(
                    "createdBy",
                    "username email"
                )
                .sort({
                    date: 1,
                    createdAt: 1
                });

        res.json(notes);

    } catch (error) {

        console.error(
            "GET CALENDAR NOTES ERROR:",
            error
        );

        res.status(500).json({
            message: "Server error."
        });
    }
};


// ==========================
// CREATE CALENDAR NOTE
// ==========================
exports.createCalendarNote = async (req, res) => {

    try {

        const { campaignId } = req.params;

        const {
            title,
            details,
            date
        } = req.body;


        if (!title) {
            return res.status(400).json({
                message:
                    "Note title is required."
            });
        }


        if (!date) {
            return res.status(400).json({
                message:
                    "Note date is required."
            });
        }


        const access =
            await checkCampaignAccess(
                campaignId,
                req.user.userId
            );


        if (!access.campaign) {
            return res.status(404).json({
                message:
                    "Campaign not found."
            });
        }


        if (!access.role) {
            return res.status(403).json({
                message:
                    "You do not have access to this campaign."
            });
        }


        // ==========================
        // REVIEW STATUS
        // ==========================

        let reviewStatus =
            "Not Required";


        // Client notes need Lead review
        if (
            access.role === "Client"
        ) {
            reviewStatus =
                "Pending Review";
        }


        const note =
            await CalendarNote.create({

                campaign:
                    campaignId,

                title:
                    title,

                details:
                    details || "",

                date:
                    date,

                createdBy:
                    req.user.userId,

                createdByRole:
                    access.role,

                reviewStatus:
                    reviewStatus

            });


        // ==========================
        // NOTIFY LEAD
        // ==========================

        if (
            access.role === "Client"
        ) {

            const lead =
                await User.findOne({
                    username:
                        access.campaign.owner
                });


            if (lead) {

                const Notification =
                    require(
                        "../models/Notification"
                    );


                await Notification.create({

                    recipient:
                        lead._id,

                    campaign:
                        campaignId,

                    type:
                        "Workflow",

                    title:
                        "Client submitted a calendar note",

                    message:
                        `${req.user.username || "A client"} submitted "${title}" for your review.`,

                    isRead:
                        false
                });

            }

        }


        const populatedNote =
            await CalendarNote.findById(
                note._id
            ).populate(
                "createdBy",
                "username email"
            );


        res.status(201).json({

            message:
                access.role === "Client"
                    ? "Calendar note submitted for Lead review."
                    : "Calendar note created successfully.",

            note:
                populatedNote

        });


    } catch (error) {

        console.error(
            "CREATE CALENDAR NOTE ERROR:",
            error
        );

        res.status(500).json({
            message:
                "Server error."
        });

    }
};


// ==========================
// REVIEW CALENDAR NOTE
// ==========================

exports.reviewCalendarNote = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            reviewStatus
        } = req.body;


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


        const note =
            await CalendarNote.findById(id);


        if (!note) {

            return res.status(404).json({
                message:
                    "Calendar note not found."
            });

        }


        const access =
            await checkCampaignAccess(
                note.campaign,
                req.user.userId
            );


        if (!access.role) {

            return res.status(403).json({
                message:
                    "Access denied."
            });

        }


        // Only Lead can review
        if (
            access.role !== "Lead"
        ) {

            return res.status(403).json({
                message:
                    "Only the Lead can review calendar notes."
            });

        }


        // Only Client notes require review
        if (
            note.createdByRole !==
            "Client"
        ) {

            return res.status(400).json({
                message:
                    "Only client calendar notes require review."
            });

        }


        note.reviewStatus =
            reviewStatus;


        await note.save();


        // ==========================
        // NOTIFY CLIENT
        // ==========================

        const recipients =
            await getCampaignRecipients(
                note.campaign,
                req.user.userId,
                ["Client"]
            );

        await createWorkflowNotifications({

            campaignId:
                note.campaign,

            actorId:
                req.user.userId,

            recipientIds:
                recipients,

            title:
                `Calendar note ${reviewStatus.toLowerCase()}`,

            message:
                `"${note.title}" was ${reviewStatus.toLowerCase()} by the Lead.`

        });


        res.json({

            message:
                `Calendar note ${reviewStatus.toLowerCase()} successfully.`,

            note:
                note

        });


    } catch (error) {

        console.error(
            "REVIEW CALENDAR NOTE ERROR:",
            error
        );

        res.status(500).json({
            message:
                "Server error."
        });

    }
};


// ==========================
// DELETE CALENDAR NOTE
// ==========================
exports.deleteCalendarNote = async (req, res) => {

    try {

        const { id } = req.params;

        const note =
            await CalendarNote.findById(id);

        if (!note) {
            return res.status(404).json({
                message:
                    "Calendar note not found."
            });
        }

        const access =
            await checkCampaignAccess(
                note.campaign,
                req.user.userId
            );

        if (!access.role) {
            return res.status(403).json({
                message:
                    "Access denied."
            });
        }

        if (
            access.role !== "Lead" &&
            access.role !== "Solo Content Creator"
        ) {
            return res.status(403).json({
                message:
                    "Only the Content Creator can delete calendar notes."
            });
        }

        await CalendarNote.findByIdAndDelete(id);

        res.json({
            message:
                "Calendar note deleted successfully."
        });

    } catch (error) {

        console.error(
            "DELETE CALENDAR NOTE ERROR:",
            error
        );

        res.status(500).json({
            message: "Server error."
        });
    }
};