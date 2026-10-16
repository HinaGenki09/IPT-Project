const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const {
    getCalendarNotes,
    createCalendarNote,
    reviewCalendarNote,
    deleteCalendarNote
} = require("../controllers/calendarController");

router.put(
    "/:id/review",
    authMiddleware,
    reviewCalendarNote
);

router.get(
    "/campaign/:campaignId",
    authMiddleware,
    getCalendarNotes
);


router.post(
    "/campaign/:campaignId",
    authMiddleware,
    createCalendarNote
);


router.delete(
    "/:id",
    authMiddleware,
    deleteCalendarNote
);


module.exports = router;