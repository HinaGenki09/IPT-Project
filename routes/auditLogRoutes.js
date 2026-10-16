const express =
    require("express");

const router =
    express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const {
    getAuditLogs
} =
    require(
        "../controllers/auditLogController"
    );


router.get(
    "/",
    authMiddleware,
    getAuditLogs
);


module.exports =
    router;