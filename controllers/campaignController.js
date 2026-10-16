const Campaign = require("../models/Campaign");
const User = require("../models/User");
const Task = require("../models/Task");
const AuditLog = require("../models/AuditLog");


// ==========================
// GET ALL CAMPAIGNS
// ==========================

exports.getCampaigns = async (req, res) => {

    try {

        const user =
            await User.findById(
                req.user.userId
            );

        if (!user) {
            return res.status(404).json({
                message:
                    "User not found."
            });
        }

        const campaigns =
            await Campaign.find({
                $or: [
                    {
                        owner:
                            user.username
                    },
                    {
                        "members.user":
                            user._id
                    }
                ]
            })
                .populate(
                    "members.user",
                    "username email accountType"
                )
                .sort({
                    createdAt: -1
                });

        for (
            const campaign of campaigns
        ) {

            const tasks =
                await Task.find({
                    campaign:
                        campaign._id
                });

            let newStatus =
                "Planning";

            if (tasks.length > 0) {

                const completed =
                    tasks.filter(
                        task =>
                            task.status ===
                            "Done"
                    ).length;

                if (
                    completed ===
                    tasks.length
                ) {
                    newStatus =
                        "Completed";
                } else {
                    newStatus =
                        "In Progress";
                }
            }

            if (
                campaign.status !==
                newStatus
            ) {
                campaign.status =
                    newStatus;
                await campaign.save();
            }
        }

        res.json(campaigns);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:
                "Server error."
        });
    }
};

// ==========================
// CREATE CAMPAIGN
// ==========================

exports.createCampaign = async (req, res) => {

    try {

        const {
            name,
            description,
            startDate,
            endDate,
            image,
            members
        } = req.body;

        if (
            !name ||
            !startDate ||
            !endDate
        ) {
            return res.status(400).json({
                message:
                    "Please complete all required fields."
            });
        }

        const creator =
            await User.findById(
                req.user.userId
            );

        if (!creator) {
            return res.status(404).json({
                message:
                    "Creator not found."
            });
        }

        const owner =
            creator.username;

        const campaignCount =
    await Campaign.countDocuments({
        owner: creator.username
    });

if (campaignCount >= 3) {
    return res.status(400).json({
        message:
            "You can only create up to 3 campaigns."
    });
}
        const campaignMembers =
            members || [];

        const memberIds =
            campaignMembers.map(
                member =>
                    member.user
            );

        const users =
            await User.find({
                _id: {
                    $in: memberIds
                }
            });

        if (
            users.length !==
            memberIds.length
        ) {
            return res.status(400).json({
                message:
                    "One or more selected users do not exist."
            });
        }

        // ==========================
        // AUTOMATIC ACCOUNT TYPE
        // ==========================

        for (const member of campaignMembers) {

            if (member.role === "Client") {

                await User.findByIdAndUpdate(
                    member.user,
                    {
                        accountType: "Client"
                    }
                );

            }

        }

        const campaign =
            new Campaign({
                name,
                description:
                    description || "",
                owner,
                startDate,
                endDate,
                image:
                    image || "",
                status:
                    "Planning",
                members:
                    campaignMembers
            });

        await campaign.save();

        await AuditLog.create({
            user:
                req.user.userId,
            campaign:
                campaign._id,
            action:
                "Campaign Created",
            description:
                `Created campaign "${campaign.name}".`
        });

        const populatedCampaign =
            await Campaign.findById(
                campaign._id
            )
                .populate(
                    "members.user",
                    "username email accountType"
                );

        res.status(201).json({
            message:
                "Campaign created successfully.",
            campaign:
                populatedCampaign
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
// UPDATE CAMPAIGN
// ==========================

exports.updateCampaign = async (req, res) => {
    try {

        const { id } =
            req.params;

        const {
            name,
            description,
            startDate,
            endDate,
            image,
            members
        } = req.body;

        const campaign =
            await Campaign.findById(id);

        if (!campaign) {
            return res.status(404).json({
                message:
                    "Campaign not found."
            });
        }

        // ==========================
        // CAMPAIGN MEMBERS
        // ==========================

        const campaignMembers =
            members || [];

        const memberIds =
            campaignMembers.map(
                member =>
                    member.user
            );

        const users =
            await User.find({
                _id: {
                    $in: memberIds
                }
            });

        if (
            users.length !==
            memberIds.length
        ) {
            return res.status(400).json({
                message:
                    "One or more selected users do not exist."
            });
        }

        // ==========================
        // AUTOMATIC ACCOUNT TYPE
        // ==========================

        for (const member of campaignMembers) {

            if (member.role === "Client") {

                await User.findByIdAndUpdate(
                    member.user,
                    {
                        accountType: "Client"
                    }
                );

            }

        }

        campaign.name =
            name;

        campaign.description =
            description || "";

        campaign.startDate =
            startDate;

        campaign.endDate =
            endDate;

        campaign.image =
            image || "";

        campaign.members =
            campaignMembers;

        await campaign.save();

        await AuditLog.create({
            user:
                req.user.userId,
            campaign:
                campaign._id,
            action:
                "Campaign Updated",
            description:
                `Updated campaign "${campaign.name}".`
        });

        const updatedCampaign =
            await Campaign.findById(id)
                .populate(
                    "members.user",
                    "username email accountType"
                );

        res.json({
            message:
                "Campaign updated successfully.",
            campaign:
                updatedCampaign
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
// DELETE CAMPAIGN
// ==========================

exports.deleteCampaign = async (req, res) => {
    try {

        const { id } =
            req.params;

        const campaign =
            await Campaign.findById(id);

        if (!campaign) {
            return res.status(404).json({
                message:
                    "Campaign not found."
            });
        }

        await Campaign.findByIdAndDelete(
            id
        );

        await AuditLog.create({
            user:
                req.user.userId,
            campaign:
                campaign._id,
            action:
                "Campaign Deleted",
            description:
                `Deleted campaign "${campaign.name}".`
        });

        res.json({
            message:
                "Campaign deleted successfully."
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
// UPDATE CAMPAIGN BRIEF
// ==========================

exports.updateCampaignBrief =
    async (req, res) => {

        try {

            const {
                objective,
                keyMessage,
                targetAudience
            } = req.body;

            const campaign =
                await Campaign.findById(
                    req.params.id
                );

            if (!campaign) {
                return res.status(404).json({
                    message:
                        "Campaign not found."
                });
            }

            const user =
                await User.findById(
                    req.user.userId
                );

            if (!user) {
                return res.status(404).json({
                    message:
                        "User not found."
                });
            }

            if (
                campaign.owner !==
                user.username
            ) {
                return res.status(403).json({
                    message:
                        "Only the campaign owner can edit the campaign brief."
                });
            }

            campaign.brief = {
                objective:
                    objective || "",
                keyMessage:
                    keyMessage || "",
                targetAudience:
                    targetAudience || ""
            };

            await campaign.save();

            res.json({
                message:
                    "Campaign brief saved successfully.",
                brief:
                    campaign.brief
            });

        } catch (error) {
            console.error(
                "Campaign brief error:",
                error
            );

            res.status(500).json({
                message:
                    "Server error."
            });
        }

    };