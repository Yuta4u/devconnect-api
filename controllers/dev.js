const { getAllDev, createDev, login } = require("../models/dev")

const getAllDevController = async (req, res) => {
  try {
    const dev = await getAllDev()
    res.json(dev)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createDevController = async (req, res) => {
  try {
    const dev = await createDev(req.body)
    // hanlde duplicate email
    if (dev === 1) {
      return res.json({
        status: 200,
        message: "Email sudah terdaftar",
      })
    }
    // handle error kirim email
    else if (dev === 2) {
      return res.json({
        status: 402,
        message: "Gagal mengirim email",
      })
    }
    return res.json({
      status: 201,
      message:
        "Pendaftaran berhasil, silahkan cek email anda untuk verifikasi.",
      data: dev,
    })
  } catch (error) {
    console.log("error cuy", error)
    res.status(500).json({ error: error.message })
  }
}

const loginDevController = async (req, res) => {
  try {
    const dev = await login(req.body)
    if (dev === 1) {
      res.json({
        status: 200,
        message: "Email yang anda masukkan belum terdaftar.",
      })
    } else if (dev === 2) {
      res.json({
        status: 204,
        message: "Password yang anda masukkan salah.",
      })
    } else if (dev === 3) {
      res.json({
        status: 204,
        message: "Akun anda belum melakukan aktivasi, silahkan cek email anda.",
      })
    }
    res.json({
      status: 200,
      message: "Berhasil login",
      token: dev,
    })
  } catch (error) {
    console.log("error login dev")
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllDevController,
  createDevController,
  loginDevController,
}
