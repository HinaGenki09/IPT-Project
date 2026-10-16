const express = require("express");

const router = express.Router();

const {
    getCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    updateCampaignBrief
} = require(
    "../controllers/campaignController"
);

const authMiddleware =
    require("../middleware/authMiddleware");


// GET ALL CAMPAIGNS

router.get(
    "/",
    authMiddleware,
    getCampaigns
);


// CREATE CAMPAIGN

router.post(
    "/",
    authMiddleware,
    createCampaign
);


// UPDATE CAMPAIGN

router.put(
    "/:id",
    authMiddleware,
    updateCampaign
);


// DELETE CAMPAIGN

router.delete(
    "/:id",
    authMiddleware,
    deleteCampaign
);

router.put(
    "/:id/brief",
    authMiddleware,
    updateCampaignBrief
);


module.exports = router;