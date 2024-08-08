const { getAllRecruiter } = require("../models/recruiter")

const getAllRecruiterController = async (req, res) => {
  try {
    const dev = await getAllRecruiter()
    res.json(dev)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllRecruiterController,
}
