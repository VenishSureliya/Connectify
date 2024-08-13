const express = require("express")
const { connectToDatabase } = require("./database")
const path = require("path")
// const mongoose = require("mongoose")

// mongoose.connect(
//     "mongodb+srv://venishsureliya:capstonevenish@connectify01.qfoxi.mongodb.net/?retryWrites=true&w=majority&appName=Connectify01"
// ).then(
//     () => {
//         console.log("Connected!")
//     }
// ).catch(
//     () => {
//         console.log("Failed!")
//     }
// )


const app = express()
const port = process.env.PORT || 6000

app.use(express.json())
app.use(express.static(path.join(__dirname, "../frontend/src")))

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log('Server is running on port', port)
    })
}).catch((error) => {
    console.error("Failed to start the server", error)
})

app.get("/", (req, res) => {
    res.send("HELLOOO")
})