const AuditLog =
    require("../models/AuditLog");

const Campaign =
    require("../models/Campaign");

const User =
    require("../models/User");


// ==========================
// GET AUDIT LOGS
// ==========================

exports.getAuditLogs =
    async (req, res) => {

        try {

            const { campaignId } =
                req.query;

            if (!campaignId) {

                return res.status(400).json({
                    message:
                        "Campaign ID is required."
                });

            }


            const campaign =
                await Campaign.findById(
                    campaignId
                );

            if (!campaign) {

                return res.status(404).json({
                    message:
                        "Campaign not found."
                });

            }


            // ==========================
            // GET CURRENT USER
            // ==========================

            const currentUser =
                await User.findById(
                    req.user.userId
                );

            if (!currentUser) {

                return res.status(404).json({
                    message:
                        "User not found."
                });

            }


            // ==========================
            // CHECK CAMPAIGN ACCESS
            // ==========================

            const isOwner =
                campaign.owner ===
                currentUser.username;

            const currentMember =
                campaign.members.find(
                    member =>
                        member.user &&
                        member.user.toString() ===
                            req.user.userId.toString()
                );

            if (
                !isOwner &&
                !currentMember
            ) {

                return res.status(403).json({
                    message:
                        "You do not have access to this campaign."
                });

            }


            // ==========================
            // GET CAMPAIGN LOGS
            // ==========================

            const logs =
                await AuditLog.find({
                    campaign:
                        campaignId
                })
                    .populate(
                        "user",
                        "username email"
                    )
                    .populate(
                        "campaign",
                        "name"
                    )
                    .sort({
                        createdAt: -1
                    });


            // ==========================
            // FILTER LOGS
            // ==========================
            //
            // Client can see:
            // 1. Their own actions
            // 2. Lead actions involving Assets
            // 3. Lead actions involving Calendar
            //
            // They cannot see:
            // - CC Task actions
            // - Collaborator actions
            // - Other campaigns
            //

            const filteredLogs =
                logs.filter(log => {

                    if (!log.user) {
                        return false;
                    }


                    const actorId =
                        log.user._id.toString();

                    const currentUserId =
                        req.user.userId.toString();


                    // --------------------------
                    // CURRENT USER'S OWN ACTION
                    // --------------------------

                    if (
                        actorId ===
                        currentUserId
                    ) {

                        return true;

                    }


                    // --------------------------
                    // FIND ACTOR'S CAMPAIGN ROLE
                    // --------------------------

                    let actorRole = null;


                    if (
                        campaign.owner ===
                        log.user.username
                    ) {

                        actorRole =
                            "Lead";

                    } else {

                        const member =
                            campaign.members.find(
                                member =>
                                    member.user &&
                                    member.user.toString() ===
                                        actorId
                            );

                        if (member) {

                            actorRole =
                                member.role;

                        }

                    }


                    // --------------------------
                    // ONLY LEAD ACTIONS
                    // --------------------------

                    if (
                        actorRole !==
                        "Lead"
                    ) {

                        return false;

                    }


                    // --------------------------
                    // ONLY ASSETS + CALENDAR
                    // --------------------------

                    const actionText =
                        `${log.action} ${log.description}`
                            .toLowerCase();


                    const isAssetAction =
                        actionText.includes(
                            "asset"
                        );


                    const isCalendarAction =
                        actionText.includes(
                            "calendar"
                        ) ||
                        actionText.includes(
                            "calendar note"
                        );


                    return (
                        isAssetAction ||
                        isCalendarAction
                    );

                });


            res.json(
                filteredLogs
            );


        } catch (error) {

            console.error(error);

            res.status(500).json({
                message:
                    "Server error."
            });

        }

    };