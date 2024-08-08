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
    if (resLogin === 2) {
      return res.send({
        status: 204,
        message: "password yang anda masukkan salah",
      })
    }
    if (resLogin === 3) {
      return res.send({
        status: 204,
        message:
          "akun anda belum melakukan aktivisi, silahkan cek email anda untuk aktivasi",
      })
    }
    return res.send({
      status: 201,
      message: "berhasil login",
      token: resLogin,
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
