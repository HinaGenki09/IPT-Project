require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

let connectionPromise;

async function connectDB() {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (!connectionPromise) {
        connectionPromise = mongoose
            .connect(process.env.MONGODB_URI)
            .catch((error) => {
                connectionPromise = null;
                throw error;
            });
    }

    try {
        await connectionPromise;
    } catch (error) {
        connectionPromise = null;
        throw error;
    }
}

app.use(express.json());
app.use(express.static("public"));

const authRoutes = require("./routes/authRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const auditLogRoutes = require("./routes/auditLogRoutes");
const taskRoutes = require("./routes/taskRoutes");
const assetRoutes = require("./routes/assetRoutes");
const calendarRoutes = require("./routes/calendarRoutes");
const referenceRoutes = require("./routes/referenceRoutes");

app.use("/api", async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error(
            "MongoDB connection error:",
            error.message
        );

        res.status(503).json({
            message: "Database temporarily unavailable. Please try again."
        });
    }
});


app.use("/api/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/audit-logs", auditLogRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/references", referenceRoutes);

console.log("MONGODB_URI exists:", Boolean(process.env.MONGODB_URI));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});