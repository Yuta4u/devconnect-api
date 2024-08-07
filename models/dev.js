const pool = require("../config/pool")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { transporter } = require("../utils/transporter")

const getAllDev = async () => {
  const q = "SELECT * FROM dev"
  const result = await pool.query(q)
  return result.rows
}

const createDev = async ({ username, email, password }) => {
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
    "INSERT INTO dev (username, email, password) VALUES ($1, $2, $3) RETURNING *"
  const result = await pool.query(q, [username, email, hashedPassword])

  if (result.rows) {
    const url = `www.google.com`
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

const login = async ({ email, password }) => {
  const q = "SELECT * FROM dev WHERE email = $1"
  const result = await pool.query(q, [email])
  if (result.rowCount) {
    const userLogin = result.rows[0]
    const isValidPassword = bcrypt.compareSync(password, userLogin.password)
    if (!isValidPassword) {
      return 2
    }
    if (!userLogin.is_active) {
      return 3
    }
    const token = jwt.sign(
      {
        id: userLogin.dev_id,
        username: userLogin.username,
        email: userLogin.email,
        role: userLogin.role,
        skill: userLogin.skill,
        linkedin: userLogin.linkedin,
        profile_img: userLogin.profile_img,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    )
    return token
  } else {
    return 1
  }
}

module.exports = {
  getAllDev,
  createDev,
  login,
}
