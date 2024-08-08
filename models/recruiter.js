const pool = require("../config/pool")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { transporter } = require("../utils/transporter")

const getAllRecruiter = async () => {
  const q = "SELECT * FROM recruiter"
  const result = await pool.query(q)
  return result.rows
}

const createRecruiter = async ({ company_name, email, password }) => {
  const hashedPassword = bcrypt.hashSync(password, 10)

  // check, apakah email belum terdaftar
  const qEmail = `
    SELECT 1 FROM dev WHERE email = $1
    UNION
    SELECT 1 FROM recruiter WHERE email = $2
  `
  const isDuplicate = await pool.query(qEmail, [email, email])
  if (isDuplicate.rowCount) {
    return 1
  }

  const q =
    "INSERT INTO recruiter (company_name, email, password) VALUES ($1, $2, $3) RETURNING *"
  const result = await pool.query(q, [company_name, email, hashedPassword])

  const activateToken = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  })

  if (result.rows) {
    const url = `https://devconnect-api.vercel.app/api/dev/activate/${activateToken}`
    // const url = `https://localhost:6543/api/dev/activate/${activateToken}`
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify your email",
      text: `Click on this link to verify your email: ${url}`,
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return 2
      }
    })
    return result.rows[0]
  }
}

const activateAccount = async (token) => {
  const verifiyToken = jwt.verify(
    token,
    process.env.JWT_SECRET,
    async (err, decoded) => {
      if (err) {
        return 1
      }
      if (!decoded) {
        return 2
      }
      const q =
        "UPDATE recruiter SET is_active = 1 where email = $1 RETURNING *"
      const result = await pool.query(q, [decoded.email])
      return result.rows
    }
  )
  const res = await verifiyToken
  return res
}

module.exports = {
  getAllRecruiter,
  createRecruiter,
  activateAccount,
}
