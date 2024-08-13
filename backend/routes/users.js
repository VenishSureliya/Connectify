const express = require("express")
const router = express.Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const validateEmailDomain = (email, role) => {
    const domain = email.split("@")[1]
    if (role === "student") {
        return domain === "gnu.ac.in"
    } else if (role === "professor" || role === "proctor" || role === "admin"){
        return domain === "ganpatuniversity.ac.in"
    }
    return false
}

router.post("/register", [isAdmin], async (req, res) => {
    try{
        const { name, email, password, role } = req.body

        if (!validateEmailDomain(email, role)) {
            return res.status(400).json({ message: "Invalid email domain!" })
        }

        const existingUser = await user.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use!" })
        }

        if(!["student", "professor", "proctor", "admin"].includes(role)) {
            return res.status(400).json({ message: "You don't have permission!" })
        }

        const user = new User({ name, email, password, role })
        await user.save()
        res.status(201).json({ message: "Registration successful!" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post("/register-professor", [isProctorOrAdmin], async (req, res) => {
    try {
        const { name, email, password } = req.body

        if(!validateEmailDomain(email, "professor")) {
            return res.status(400).json({ message: "Invalid email domain!" })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use!" })
        }

        const user = new User({ name, email, password, role: "professor" })
        await user.save()
        res.status(201).json({ message: "Profeesor registered successfully!" })
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
})

router.post("/register-proctor", [isAdmin], async (req, res) => {
    try{
        const { name, email, password } = req.body

        if(!validateEmailDomain(email, "proctor")) {
            return res.status(400).json({ message: "Invalid email domain!" })
        }

        const existingUser = await User.findOne({ email })
        if(existingUser){
            return res.status(400).json({ message: "Email already in use!" })
        }

        const user = new User({ name, email, password, role: "proctor" })
        await user.save()
        res.status(201).json({ message: "Proctor registered successfully!" })
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
})