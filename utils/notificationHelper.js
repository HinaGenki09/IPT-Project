const Notification = require("../models/Notification");
const Campaign = require("../models/Campaign");
const User = require("../models/User");

async function getCampaignRecipients(
    campaignId,
    actorId,
    roles = ["Lead"]
) {
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
        return [];
    }

    const recipients = [];

    // Get campaign owner
    const owner = await User.findOne({
        username: campaign.owner
    });

    if (
        owner &&
        owner._id.toString() !== actorId.toString()
    ) {
        recipients.push(owner._id);
    }

    // Get campaign members with the required roles
    for (const member of campaign.members || []) {
        if (
            member.user &&
            roles.includes(member.role) &&
            member.user.toString() !== actorId.toString()
        ) {
            recipients.push(member.user);
        }
    }

    // Remove duplicate users
    return [
        ...new Map(
            recipients.map(id => [
                id.toString(),
                id
            ])
        ).values()
    ];
}

async function createWorkflowNotifications({
    campaignId,
    actorId,
    recipientIds = [],
    title,
    message
}) {
    const uniqueRecipients = [
        ...new Map(
            recipientIds
                .filter(
                    id =>
                        id &&
                        id.toString() !==
                            actorId.toString()
                )
                .map(id => [
                    id.toString(),
                    id
                ])
        ).values()
    ];

    if (!uniqueRecipients.length) {
        return;
    }

    await Notification.insertMany(
        uniqueRecipients.map(recipientId => ({
            recipient: recipientId,
            campaign: campaignId,
            type: "Workflow",
            title,
            message,
            isRead: false
        }))
    );
}

module.exports = {
    getCampaignRecipients,
    createWorkflowNotifications
};