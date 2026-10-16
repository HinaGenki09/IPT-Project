const Asset =
    require("../models/Asset");

const AssetVersion =
    require("../models/AssetVersion");

const AssetComment =
    require("../models/AssetComment");

const Campaign =
    require("../models/Campaign");

const User =
    require("../models/User");

const AuditLog =
    require("../models/AuditLog");

const {
    getCampaignRecipients,
    createWorkflowNotifications
} = require("../utils/notificationHelper");


// ==========================
// GET CAMPAIGN ASSETS
// ==========================

exports.getAssets =
    async (req, res) => {

        try {

            const { campaignId } =
                req.params;

            const assets =
                await Asset.find({
                    campaign:
                        campaignId
                })
                    .populate(
                        "uploadedBy",
                        "username email"
                    )
                    .sort({
                        createdAt: -1
                    });

            res.json(
                assets
            );

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message:
                    "Server error."
            });

        }

    };


// ==========================
// GET SINGLE ASSET
// ==========================

exports.getAsset =
    async (req, res) => {

        try {

            const { id } =
                req.params;

            const asset =
                await Asset.findById(id)
                    .populate(
                        "uploadedBy",
                        "username email"
                    );

            if (!asset) {

                return res.status(404).json({
                    message:
                        "Asset not found."
                });

            }

            res.json(
                asset
            );

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message:
                    "Server error."
            });

        }

    };


// ==========================
// CREATE ASSET
// ==========================

exports.createAsset =
    async (req, res) => {

        try {

            const {
                name,
                description,
                fileUrl,
                fileType
            } = req.body;

            const { campaignId } =
                req.params;


            if (
                !name ||
                !fileUrl
            ) {

                return res.status(400).json({
                    message:
                        "Asset name and file URL are required."
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


            const asset =
                new Asset({

                    campaign:
                        campaignId,

                    name,

                    description:
                        description || "",

                    fileUrl,

                    fileType:
                        fileType || "",

                    status:
                        "Pending Review",

                    currentVersion:
                        1,

                    uploadedBy:
                        req.user.userId

                });


            await asset.save();


            // ==========================
            // CREATE VERSION 1
            // ==========================

            await AssetVersion.create({

                asset:
                    asset._id,

                version:
                    1,

                fileUrl,

                uploadedBy:
                    req.user.userId,

                notes:
                    "Initial asset submission."

            });


            // ==========================
            // AUDIT LOG
            // ==========================

            await AuditLog.create({

                user:
                    req.user.userId,

                campaign:
                    campaignId,

                action:
                    "Asset Submitted",

                description:
                    `Submitted asset "${asset.name}".`

            });


            // ==========================
            // NOTIFY CLIENT
            // ==========================

            const recipients =
                await getCampaignRecipients(
                    campaignId,
                    req.user.userId,
                    ["Client"]
                );

            await createWorkflowNotifications({

                campaignId,

                actorId:
                    req.user.userId,

                recipientIds:
                    recipients,

                title:
                    "New asset submitted",

                message:
                    `${req.user.username || "A campaign member"} submitted "${asset.name}" for review.`

            });


            const populatedAsset =
                await Asset.findById(
                    asset._id
                )
                    .populate(
                        "uploadedBy",
                        "username email"
                    );


            res.status(201).json({

                message:
                    "Asset submitted successfully.",

                asset:
                    populatedAsset

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
// ADD COMMENT
// ==========================

exports.addComment =
    async (req, res) => {

        try {

            const { id } =
                req.params;

            const { comment } =
                req.body;


            if (!comment || !comment.trim()) {

                return res.status(400).json({
                    message:
                        "Comment cannot be empty."
                });

            }


            const asset =
                await Asset.findById(id);


            if (!asset) {

                return res.status(404).json({
                    message:
                        "Asset not found."
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


            // ==========================
            // ALL CAMPAIGN MEMBERS CAN COMMENT
            // ==========================

            const newComment =
                await AssetComment.create({

                    asset:
                        asset._id,

                    user:
                        user._id,

                    comment:
                        comment.trim()

                });


            // ==========================
            // AUTOMATICALLY REVIEWED
            // ==========================

            if (
                asset.status ===
                "Pending Review"
            ) {

                asset.status =
                    "Reviewed";

                await asset.save();

            }


            // ==========================
            // AUDIT LOG
            // ==========================

            await AuditLog.create({

                user:
                    user._id,

                campaign:
                    asset.campaign,

                action:
                    "Asset Comment Added",

                description:
                    `Commented on asset "${asset.name}".`

            });


            // ==========================
            // NOTIFY OTHER CAMPAIGN MEMBERS
            // ==========================

            const recipients =
                await getCampaignRecipients(
                    asset.campaign,
                    user._id,
                    [
                        "Lead",
                        "Client",
                        "Collaborator"
                    ]
                );


            await createWorkflowNotifications({

                campaignId:
                    asset.campaign,

                actorId:
                    user._id,

                recipientIds:
                    recipients,

                title:
                    "Asset comment added",

                message:
                    `${user.username} commented on "${asset.name}".`

            });


            const populatedComment =
                await AssetComment.findById(
                    newComment._id
                )
                    .populate(
                        "user",
                        "username email"
                    );


            res.status(201).json({

                message:
                    "Comment added successfully.",

                comment:
                    populatedComment

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
// GET COMMENTS
// ==========================

exports.getComments =
    async (req, res) => {

        try {

            const { id } =
                req.params;

            const comments =
                await AssetComment.find({
                    asset:
                        id
                })
                    .populate(
                        "user",
                        "username email"
                    )
                    .sort({
                        createdAt: 1
                    });

            res.json(
                comments
            );

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message:
                    "Server error."
            });

        }

    };


// ==========================
// APPROVE ASSET
// ==========================

exports.approveAsset =
    async (req, res) => {

        try {

            const { id } =
                req.params;


            const asset =
                await Asset.findById(id);


            if (!asset) {

                return res.status(404).json({
                    message:
                        "Asset not found."
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


            // ==========================
            // CLIENT ONLY
            // ==========================

            if (
                user.accountType !==
                "Client"
            ) {

                return res.status(403).json({
                    message:
                        "Only clients can approve assets."
                });

            }


            asset.status =
                "Approved";


            await asset.save();


            await AuditLog.create({

                user:
                    user._id,

                campaign:
                    asset.campaign,

                action:
                    "Asset Approved",

                description:
                    `Approved asset "${asset.name}".`

            });


            // ==========================
            // NOTIFY LEAD
            // ==========================

            const recipients =
                await getCampaignRecipients(
                    asset.campaign,
                    user._id,
                    ["Lead"]
                );


            await createWorkflowNotifications({

                campaignId:
                    asset.campaign,

                actorId:
                    user._id,

                recipientIds:
                    recipients,

                title:
                    "Asset approved",

                message:
                    `${user.username} approved "${asset.name}".`

            });


            res.json({

                message:
                    "Asset approved successfully.",

                asset:
                    asset

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
// REQUEST ASSET CHANGES
// ==========================

exports.requestChanges =
    async (req, res) => {

        try {

            const { id } =
                req.params;

            const { comment } =
                req.body;


            if (
                !comment ||
                !comment.trim()
            ) {

                return res.status(400).json({
                    message:
                        "Please provide a reason for the requested changes."
                });

            }


            const asset =
                await Asset.findById(id);


            if (!asset) {

                return res.status(404).json({
                    message:
                        "Asset not found."
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


            // ==========================
            // CLIENT ONLY
            // ==========================

            if (
                user.accountType !==
                "Client"
            ) {

                return res.status(403).json({
                    message:
                        "Only clients can request changes."
                });

            }


            // ==========================
            // CHANGE STATUS
            // ==========================

            asset.status =
                "Revision Requested";

            await asset.save();


            // ==========================
            // SAVE COMMENT
            // ==========================

            await AssetComment.create({

                asset:
                    asset._id,

                user:
                    user._id,

                comment:
                    comment.trim()

            });


            // ==========================
            // AUDIT LOG
            // ==========================

            await AuditLog.create({

                user:
                    user._id,

                campaign:
                    asset.campaign,

                action:
                    "Asset Revision Requested",

                description:
                    `Requested changes for asset "${asset.name}".`

            });


            // ==========================
            // NOTIFY LEAD
            // ==========================

            const recipients =
                await getCampaignRecipients(
                    asset.campaign,
                    user._id,
                    ["Lead"]
                );


            await createWorkflowNotifications({

                campaignId:
                    asset.campaign,

                actorId:
                    user._id,

                recipientIds:
                    recipients,

                title:
                    "Asset revision requested",

                message:
                    `${user.username} requested changes to "${asset.name}".`

            });


            res.json({

                message:
                    "Revision requested successfully.",

                asset:
                    asset

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
// CREATE NEW VERSION
// ==========================

exports.createVersion =
    async (req, res) => {

        try {

            const { id } =
                req.params;

            const {
                fileUrl,
                notes
            } = req.body;


            if (!fileUrl) {

                return res.status(400).json({
                    message:
                        "File URL is required."
                });

            }


            const asset =
                await Asset.findById(id);


            if (!asset) {

                return res.status(404).json({
                    message:
                        "Asset not found."
                });

            }


            const newVersion =
                asset.currentVersion + 1;


            const version =
                await AssetVersion.create({

                    asset:
                        asset._id,

                    version:
                        newVersion,

                    fileUrl,

                    uploadedBy:
                        req.user.userId,

                    notes:
                        notes || ""

                });


            asset.currentVersion =
                newVersion;

            asset.fileUrl =
                fileUrl;

            asset.status =
                "Pending Review";


            await asset.save();


            await AuditLog.create({

                user:
                    req.user.userId,

                campaign:
                    asset.campaign,

                action:
                    "Asset Revision Submitted",

                description:
                    `Submitted version ${newVersion} of asset "${asset.name}".`

            });


            // ==========================
            // NOTIFY CLIENT
            // ==========================

            const recipients =
                await getCampaignRecipients(
                    asset.campaign,
                    req.user.userId,
                    ["Client"]
                );


            await createWorkflowNotifications({

                campaignId:
                    asset.campaign,

                actorId:
                    req.user.userId,

                recipientIds:
                    recipients,

                title:
                    "New asset version submitted",

                message:
                    `${req.user.username || "A campaign member"} submitted version ${newVersion} of "${asset.name}".`

            });


            res.status(201).json({

                message:
                    "New asset version submitted.",

                version:
                    version,

                asset:
                    asset

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
// GET REVISION HISTORY
// ==========================

exports.getVersions =
    async (req, res) => {

        try {

            const { id } =
                req.params;

            const versions =
                await AssetVersion.find({
                    asset:
                        id
                })
                    .populate(
                        "uploadedBy",
                        "username email"
                    )
                    .sort({
                        version: -1
                    });

            res.json(
                versions
            );

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message:
                    "Server error."
            });

        }

    };


// ==========================
// DELETE ASSET
// ==========================

exports.deleteAsset =
    async (req, res) => {

        try {

            const { id } =
                req.params;


            const asset =
                await Asset.findById(id);


            if (!asset) {

                return res.status(404).json({
                    message:
                        "Asset not found."
                });

            }


            await AssetComment.deleteMany({
                asset:
                    asset._id
            });


            await AssetVersion.deleteMany({
                asset:
                    asset._id
            });


            await Asset.findByIdAndDelete(
                id
            );


            await AuditLog.create({

                user:
                    req.user.userId,

                campaign:
                    asset.campaign,

                action:
                    "Asset Deleted",

                description:
                    `Deleted asset "${asset.name}".`

            });


            // ==========================
            // NOTIFY OTHER CAMPAIGN MEMBERS
            // ==========================

            const recipients =
                await getCampaignRecipients(
                    asset.campaign,
                    req.user.userId,
                    [
                        "Lead",
                        "Client",
                        "Collaborator"
                    ]
                );


            await createWorkflowNotifications({

                campaignId:
                    asset.campaign,

                actorId:
                    req.user.userId,

                recipientIds:
                    recipients,

                title:
                    "Asset deleted",

                message:
                    `${req.user.username || "A campaign member"} deleted "${asset.name}".`

            });


            res.json({

                message:
                    "Asset deleted successfully."

            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message:
                    "Server error."
            });

        }

    };