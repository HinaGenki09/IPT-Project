const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                userId: user._id.toString()
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.json({
            message: "Login successful.",
            token: token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                accountType: user.accountType
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error."
        });
    }
};


// SIGN UP
exports.signup = async (req, res) => {
    try {
        const {
            email,
            username,
            password
        } = req.body;

        // Check required fields
        if (!email || !username || !password) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        // Check password length
        if (password.length < 8) {
            return res.status(400).json({
                message:
                    "Password must be at least 8 characters."
            });
        }

        // Check if email or username already exists
        const existingUser = await User.findOne({
            $or: [
                {
                    email: email.toLowerCase()
                },
                {
                    username: username
                }
            ]
        });

        if (existingUser) {
            if (
                existingUser.email ===
                email.toLowerCase()
            ) {
                return res.status(400).json({
                    message:
                        "Email is already registered."
                });
            }

            if (
                existingUser.username ===
                username
            ) {
                return res.status(400).json({
                    message:
                        "Username is already taken."
                });
            }
        }

        // Hash password
        const hashedPassword =
            await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            email: email.toLowerCase(),
            username: username,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message:
                "Account created successfully."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error."
        });
    }
};


// GET USERS
exports.getUsers = async (req, res) => {
    try {
        const users =
            await User.find()
                .select(
                    "_id username email accountType"
                )
                .sort({
                    username: 1
                });

        res.json(users);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error."
        });
    }
};


exports.setAccountType = async (req, res) => {
    try {
        const { accountType } = req.body;

        if (
            accountType !== "Content Creator" &&
            accountType !== "Client"
        ) {
            return res.status(400).json({
                message: "Invalid account type."
            });
        }

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        if (user.accountType) {
            return res.status(400).json({
                message: "Account type has already been selected."
            });
        }

        user.accountType = accountType;

        await user.save();

        res.json({
            message: "Account type saved successfully.",
            accountType: user.accountType
        });

    } catch (error) {
        console.error("SET ACCOUNT TYPE ERROR:", error);

        res.status(500).json({
            message: "Server error."
        });
    }
};