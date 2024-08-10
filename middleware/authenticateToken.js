const jwt = require("jsonwebtoken")

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    res.send({
      status: 403,
      message: "Unauthorized",
    })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.send({
        status: 403,
        message: "jwt expired",
      })
    req.user = user
    next()
  })
}

module.exports = {
  authenticateToken,
}
