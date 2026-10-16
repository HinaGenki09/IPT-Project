const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const {
    getReferences,
    createReference,
    deleteReference
} = require("../controllers/referenceController");


// Get campaign references
router.get(
    "/campaign/:campaignId",
    authMiddleware,
    getReferences
);


// Add reference
router.post(
    "/campaign/:campaignId",
    authMiddleware,
    createReference
);


// Delete reference
router.delete(
    "/:id",
    authMiddleware,
    deleteReference
);


module.exports = router;