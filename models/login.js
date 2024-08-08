const pool = require("../config/pool")
const bcrypt = require("bcrypt")

const login = async ({ email, password }) => {
  console.log(email, password)

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
  console.log(isValidPassword)
  //   if (result.rowCount) {
  //     const userLogin = result.rows[0]
  //     const isValidPassword = bcrypt.compareSync(password, userLogin.password)
  //     if (!isValidPassword) {
  //       return 2
  //     }
  //     if (!userLogin.is_active) {
  //       return 3
  //     }
  //     const token = jwt.sign(
  //       {
  //         id: userLogin.dev_id,
  //         username: userLogin.username,
  //         email: userLogin.email,
  //         role: userLogin.role,
  //         skill: userLogin.skill,
  //         linkedin: userLogin.linkedin,
  //         profile_img: userLogin.profile_img,
  //       },
  //       process.env.JWT_SECRET,
  //       {
  //         expiresIn: "1h",
  //       }
  //     )
  //     return token
  //   } else {
  //     return 1
  //   }
}

module.exports = {
  login,
}
