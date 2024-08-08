const { login } = require("../models/login")

const loginController = async (req, res) => {
  try {
    const resLogin = await login(req.body)
    if (resLogin === 1) {
      return res.send({
        status: 204,
        message: "email belum terdaftar.",
      })
    }
    res.send({
      status: 201,
      message: "berhasil hit api",
    })
  } catch (error) {
    console.log("error db")
    res.send({
      status: 500,
      message: "error db",
    })
  }
}

module.exports = {
  loginController,
}
