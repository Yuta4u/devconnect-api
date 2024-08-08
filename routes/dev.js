const express = require("express")
const {
  getAllDevController,
  createDevController,
  activateAccountController,
} = require("../controllers/dev")

const router = express.Router()

router.get("/", getAllDevController)
router.post("/", createDevController)
router.get("/activate/:token", activateAccountController)

module.exports = router
