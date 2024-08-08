const express = require("express")
const {
  getAllRecruiterController,
  createRecruiterController,
  activateAccountController,
} = require("../controllers/recruiter")

const router = express.Router()

router.get("/", getAllRecruiterController)
router.post("/", createRecruiterController)
router.get("/activate/:token", activateAccountController)

module.exports = router
