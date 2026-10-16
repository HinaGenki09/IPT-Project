const express =
    require("express");

const router =
    express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const {
    getAssets,
    getAsset,
    createAsset,
    addComment,
    getComments,
    approveAsset,
    requestChanges,
    createVersion,
    getVersions,
    deleteAsset
} =
    require(
        "../controllers/assetController"
    );


// ==========================
// CAMPAIGN ASSETS
// ==========================

router.get(
    "/campaign/:campaignId",
    authMiddleware,
    getAssets
);


// ==========================
// CREATE ASSET
// ==========================

router.post(
    "/campaign/:campaignId",
    authMiddleware,
    createAsset
);


// ==========================
// SINGLE ASSET
// ==========================

router.get(
    "/:id",
    authMiddleware,
    getAsset
);


// ==========================
// COMMENTS
// ==========================

router.get(
    "/:id/comments",
    authMiddleware,
    getComments
);

router.post(
    "/:id/comments",
    authMiddleware,
    addComment
);


// ==========================
// APPROVAL
// ==========================

router.put(
    "/:id/approve",
    authMiddleware,
    approveAsset
);

router.put(
    "/:id/approve",
    authMiddleware,
    approveAsset
);

router.put(
    "/:id/request-changes",
    authMiddleware,
    requestChanges
);

// ==========================
// VERSION HISTORY
// ==========================

router.get(
    "/:id/versions",
    authMiddleware,
    getVersions
);

router.post(
    "/:id/versions",
    authMiddleware,
    createVersion
);


// ==========================
// DELETE
// ==========================

router.delete(
    "/:id",
    authMiddleware,
    deleteAsset
);


module.exports =
    router;