const pool = require("../config/pool")

const getAllPost = async () => {
  const q = "SELECT * FROM post"
  const result = await pool.query(q)
  return result.rows
}

const createPost = async (data) => {
  const entriesData = Object.entries(data)
  let column = []
  let columVal = []
  entriesData.forEach((_) => {
    column.push(_[0])
    columVal.push(_[1])
  })
  const q = `INSERT INTO post (${column.join(",")}) VALUES (${column.map(
    (_, index) => `$${index + 1}`
  )}) RETURNING *`
  const result = await pool.query(q, columVal)
  return result.rows[0]
}

module.exports = {
  getAllPost,
  createPost,
}
