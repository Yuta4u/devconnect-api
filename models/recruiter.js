const pool = require("../config/pool")

const getAllRecruiter = async () => {
  const q = "SELECT * FROM recruiter"
  const result = await pool.query(q)
  return result.rows
}

module.exports = {
  getAllRecruiter,
}
