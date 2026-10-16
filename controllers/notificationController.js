const Notification =
    require("../models/Notification");


// ==========================
// GET NOTIFICATIONS
// ==========================

exports.getNotifications =
    async (req, res) => {

        try {

            const filter = {
                recipient:
                    req.user.userId
            };


            // ==========================
            // CAMPAIGN FILTER
            // ==========================

            if (req.query.campaignId) {

                filter.campaign =
                    req.query.campaignId;

            }


            const notifications =
                await Notification.find(
                    filter
                )
                    .sort({
                        createdAt: -1
                    });


            res.json(
                notifications
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
// MARK NOTIFICATION AS READ
// ==========================


exports.markAsRead =
    async (req, res) => {

        try {

            const { id } =
                req.params;

            const notification =
                await Notification.findOneAndUpdate(
                    {
                        _id: id,
                        recipient: req.user.userId
                    },
                    {
                        isRead: true
                    },
                    {
                        returnDocument: "after"
                    }
                );

            if (!notification) {

                return res.status(404).json({
                    message: "Notification not found."
                });

            }

            res.json({
                message: "Notification marked as read.",
                notification: notification
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message: "Server error."
            });

        }

    };