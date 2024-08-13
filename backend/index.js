const express = require("express")
const { connectToDatabase } = require("./database")
const path = require("path")
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

// Serve static files from the React app's "public" folder
app.use(express.static(path.join(__dirname, "../frontend/public")))

// Connect to the database
connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log('Server is running on port', port)
    })
}).catch((error) => {
    console.error("Failed to start the server", error)
})

// Serve the React App from the "src" directory
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/public", "index.html"))
})

module.exports = app
