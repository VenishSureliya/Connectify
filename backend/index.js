const express = require("express")
const mongoose = require("mongoose")

mongoose.connect(
    "mongodb+srv://venishsureliya:capstonevenish@connectify01.qfoxi.mongodb.net/?retryWrites=true&w=majority&appName=Connectify01"
).then(
    () => {
        console.log("Connected!")
    }
).catch(
    () => {
        console.log("Failed!")
    }
)


const app = express()

app.get(
    "/",
    (req, res) => {
        res.send("I'm response!!")
    }
)

app.listen(
    5000,
    () => console.log("Backend is running!")
)