require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const opinionRoutes = require("./routes/opinion")

//middleware
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`))

const connection = require('./db')
connection()

// routes
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

app.use("/api/opinion", opinionRoutes)