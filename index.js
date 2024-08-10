// app.js
require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const serverless = require("serverless-http")

// routes
const devRoutes = require("./routes/dev")
const recruiterRoutes = require("./routes/recruiter")
const loginRoutes = require("./routes/login")
const postRoutes = require("./routes/post")
const app = express()

// set up
app.use(bodyParser.json())
app.use(cors())
app.options("*", cors())

app.use("/api/login", loginRoutes)
app.use("/api/dev", devRoutes)
app.use("/api/recruiter", recruiterRoutes)
app.use("/api/post", postRoutes)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app
module.exports.handler = serverless(app)
