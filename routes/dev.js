const express = require("express")
const {
  getAllDevController,
  createDevController,
  loginDevController,
  activateAccountController,
} = require("../controllers/dev")

const router = express.Router()

router.get("/", getAllDevController)
router.post("/", createDevController)
router.post("/login", loginDevController)
router.get("/activate/:token", activateAccountController)

module.exports = router
