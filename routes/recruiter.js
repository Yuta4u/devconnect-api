const express = require("express")
const { getAllRecruiterController } = require("../controllers/recruiter")

const router = express.Router()

router.get("/", getAllRecruiterController)

module.exports = router
