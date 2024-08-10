const { getAllPost, createPost } = require("../models/post")

const getAllPostController = async (req, res) => {
  try {
    const posts = await getAllPost()
    res.json({
      status: 201,
      message: "berhasil hit api, letsgow",
      data: posts,
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message,
    })
  }
}

const createPostController = async (req, res) => {
  try {
    const posts = await createPost({
      ...req.body,
      recruiter_id: req.user.recruiter_id,
    })
    return res.send({
      status: 201,
      message: "berhasil post data",
      data: posts || [],
    })
  } catch (error) {
    console.log(error, "ini error")
    res.send({
      status: 500,
      message: "error database",
    })
  }
}

module.exports = {
  getAllPostController,
  createPostController,
}
