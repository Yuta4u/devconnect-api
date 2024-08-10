const pool = require("../config/pool")

const getAllPost = async () => {
  const q = `SELECT p.* AS post, json_build_object(
    'id', r.recruiter_id,
    'email', r.email,
    'profile_img', r.profile_img,
    'description', r.description,
    'company_name', r.company_name,
    'employee', r.employee,
    'member_since', r.created_at
  ) AS recruiter 
  FROM post p JOIN recruiter r ON p.recruiter_id = r.recruiter_id`
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
