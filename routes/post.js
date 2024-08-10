const express = require("express")
const {
  getAllPostController,
  createPostController,
} = require("../controllers/post")
const { authenticateToken } = require("../middleware/authenticateToken")

const router = express.Router()

router.get("/", getAllPostController)
router.post("/", authenticateToken, createPostController)

module.exports = router
