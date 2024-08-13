const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const validateEmailDomain = (email, role) => {
    const domain = email.split("@")[1];
    if (role === "student") {
        return domain === "gnu.ac.in";
    } else if (role === "professor" || role === "proctor" || role === "admin") {
        return domain === "ganpatuniversity.ac.in";
    }
    return false;
};

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

router.post("/register", [isAdmin], async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!validateEmailDomain(email, role)) {
            return res.status(400).json({ message: "Invalid email domain!" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use!" });
        }

        if (!["student", "professor", "proctor", "admin"].includes(role)) {
            return res.status(400).json({ message: "Invalid role!" });
        }

        const hashedPassword = await hashPassword(password);
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();
        res.status(201).json({ message: "Registration successful!" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/register-professor", [isProctorOrAdmin], async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!validateEmailDomain(email, "professor")) {
            return res.status(400).json({ message: "Invalid email domain!" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use!" });
        }

        const hashedPassword = await hashPassword(password);
        const user = new User({ name, email, password: hashedPassword, role: "professor" });
        await user.save();
        res.status(201).json({ message: "Professor registered successfully!" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/register-proctor", [isAdmin], async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!validateEmailDomain(email, "proctor")) {
            return res.status(400).json({ message: "Invalid email domain!" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use!" });
        }

        const hashedPassword = await hashPassword(password);
        const user = new User({ name, email, password: hashedPassword, role: "proctor" });
        await user.save();
        res.status(201).json({ message: "Proctor registered successfully!" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;