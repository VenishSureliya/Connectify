const express = require("express")
const router = express.Router()
const user = require("../models/user")
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