require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    fullName: {
        type: String,
        default: ""
    },

    course: {
        type: String,
        default: ""
    },

    yearLevel: {
        type: String,
        default: ""
    },

    about: {
        type: String,
        default: ""
    },

    skills: {
        type: String,
        default: ""
    },

    profilePicture: {
        type: String,
        default: "hagok.jpg"
    }
});

const User = mongoose.model("User", userSchema);

// Test route
app.get("/api/health", (req, res) => {
    res.json({
        message: "Student Profile API is running."
    });
});

// Register
app.post("/api/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required."
            });
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                message: "Username already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username: username,
            password: hashedPassword,
            fullName: "Paul Rey A. Ysug",
            course: "BS Information Technology",
            yearLevel: "3",
            about: "BSIT-3 student at Xavier Ateneo de Cagayan University.",
            skills: "HTML & CSS, JavaScript, Java, SQL/MySQL, Problem Solving",
            profilePicture: "hagok.jpg"
        });

        await user.save();

        res.status(201).json({
            message: "Registration successful."
        });

    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            message: "Server error during registration."
        });
    }
});

// Login
app.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required."
            });
        }

        const user = await User.findOne({
            username: username
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid username or password."
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid username or password."
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username
            },
            JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login successful.",
            token: token,
            user: {
                id: user._id,
                username: user.username,
                fullName: user.fullName,
                course: user.course,
                yearLevel: user.yearLevel,
                about: user.about,
                skills: user.skills,
                profilePicture: user.profilePicture
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Server error during login."
        });
    }
});

// Authentication
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Access denied. No token provided."
        });
    }

    jwt.verify(token, JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(403).json({
                message: "Invalid or expired token."
            });
        }

        req.user = user;
        next();
    });
}

// Get profile
app.get("/api/profile", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(
            req.user.userId
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.json(user);

    } catch (error) {
        console.error("Profile error:", error);

        res.status(500).json({
            message: "Server error while loading profile."
        });
    }
});

// Update profile
app.put("/api/profile", authenticateToken, async (req, res) => {
    try {
        const {
            fullName,
            course,
            yearLevel,
            about,
            skills,
            profilePicture
        } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.userId,
            {
                fullName: fullName,
                course: course,
                yearLevel: yearLevel,
                about: about,
                skills: skills,
                profilePicture: profilePicture
            },
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.json({
            message: "Profile updated successfully.",
            user: user
        });

    } catch (error) {
        console.error("Update profile error:", error);

        res.status(500).json({
            message: "Server error while updating profile."
        });
    }
});

// Start server
async function startServer() {
    try {
        await mongoose.connect(MONGODB_URI);

        console.log("Connected to MongoDB.");

       app.listen(PORT, "0.0.0.0", () => {
    console.log(`API running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error);
    }
}

startServer();