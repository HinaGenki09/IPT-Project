const Reference = require("../models/Reference");
const Campaign = require("../models/Campaign");
const User = require("../models/User");


// ==========================
// CHECK CAMPAIGN ACCESS
// ==========================

async function checkCampaignAccess(campaignId, userId) {

    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
        return {
            campaign: null,
            role: null
        };
    }

    const member = campaign.members.find(
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

    const user = await User.findById(userId);

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
// GET REFERENCES
// ==========================

async function getReferences(req, res) {

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
                message: "You do not have access to this campaign."
            });
        }

        const references =
            await Reference.find({
                campaign: campaignId
            })
            .populate(
                "createdBy",
                "username email"
            )
            .sort({
                createdAt: 1
            });

        res.json(references);

    } catch (error) {

        console.error(
            "GET REFERENCES ERROR:",
            error
        );

        res.status(500).json({
            message: "Unable to load references."
        });
    }
}


// ==========================
// CREATE REFERENCE
// ==========================

async function createReference(req, res) {

    try {

        const { campaignId } = req.params;

        const {
            title,
            url
        } = req.body;

        if (!title || !url) {
            return res.status(400).json({
                message:
                    "Title and URL are required."
            });
        }

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

        const reference =
            await Reference.create({
                campaign: campaignId,
                title: title.trim(),
                url: url.trim(),
                createdBy: req.user.userId
            });

        const populatedReference =
            await Reference.findById(
                reference._id
            ).populate(
                "createdBy",
                "username email"
            );

        res.status(201).json(
            populatedReference
        );

    } catch (error) {

        console.error(
            "CREATE REFERENCE ERROR:",
            error
        );

        res.status(500).json({
            message:
                "Unable to create reference."
        });
    }
}


// ==========================
// DELETE REFERENCE
// ==========================

async function deleteReference(req, res) {

    try {

        const reference =
            await Reference.findById(
                req.params.id
            );

        if (!reference) {
            return res.status(404).json({
                message: "Reference not found."
            });
        }

        const access =
            await checkCampaignAccess(
                reference.campaign,
                req.user.userId
            );

        if (!access.role) {
            return res.status(403).json({
                message:
                    "You do not have access to this campaign."
            });
        }

        await Reference.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message:
                "Reference deleted successfully."
        });

    } catch (error) {

        console.error(
            "DELETE REFERENCE ERROR:",
            error
        );

        res.status(500).json({
            message:
                "Unable to delete reference."
        });
    }
}


module.exports = {
    getReferences,
    createReference,
    deleteReference
};