const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const {
    getTasks,
    createTask,
    updateTask,
    reviewTask,
    deleteTask
} = require("../controllers/taskController");

router.get(
    "/campaign/:campaignId",
    authMiddleware,
    getTasks
);

router.post(
    "/campaign/:campaignId",
    authMiddleware,
    createTask
);

router.put(
    "/:id",
    authMiddleware,
    updateTask
);

router.put(
    "/:id/review",
    authMiddleware,
    reviewTask
);

router.delete(
    "/:id",
    authMiddleware,
    deleteTask
);

module.exports = router;