const express = require("express")
const {
  getAllDevController,
  createDevController,
  loginDevController,
} = require("../controllers/dev")

const router = express.Router()

router.get("/", getAllDevController)
router.post("/", createDevController)
router.post("/login", loginDevController)

module.exports = router
