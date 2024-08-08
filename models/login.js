const pool = require("../config/pool")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async ({ email, password }) => {
  // Check if email already exists
  const qDev = "SELECT * FROM dev WHERE email = $1"
  const qRecruiter = "SELECT * FROM recruiter where email = $1"

  const checkFromDev = await pool.query(qDev, [email])
  const checkFromRecruiter = await pool.query(qRecruiter, [email])

  //
  if (!checkFromDev.rowCount && !checkFromRecruiter.rowCount) {
    return 1
  }

  const userLogin = checkFromDev.rows[0] || checkFromRecruiter.rows[0]
  const isValidPassword = bcrypt.compareSync(password, userLogin.password)

  if (!isValidPassword) {
    return 2
  } else {
    if (!userLogin.is_active) {
      return 3
    }
    const undisplayedData = [
      "is_active",
      "password",
      "created_at",
      "updated_at",
    ]
    let displayedData = {}
    Object.entries(userLogin).forEach((el) => {
      if (!undisplayedData.includes(el[0])) {
        displayedData[el[0]] = el[1]
      }
    })
    const token = jwt.sign(displayedData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })
    return token
  }
}

module.exports = {
  login,
}
