const express = require("express");
const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const {
    login,
    signup,
    getUsers,
    setAccountType
} = require("../controllers/authController");


router.post(
    "/login",
    login
);


router.post(
    "/signup",
    signup
);


router.get(
    "/users",
    authMiddleware,
    getUsers
);


router.put(
    "/account-type",
    authMiddleware,
    setAccountType
);


module.exports = router;