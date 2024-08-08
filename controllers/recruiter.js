const {
  createRecruiter,
  getAllRecruiter,
  activateAccount,
} = require("../models/recruiter")

const getAllRecruiterController = async (req, res) => {
  try {
    const dev = await getAllRecruiter()
    res.json(dev)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createRecruiterController = async (req, res) => {
  try {
    const dev = await createRecruiter(req.body)
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

const activateAccountController = async (req, res) => {
  try {
    const dev = await activateAccount(req.params.token)
    if (dev === 1 || dev === 2) {
      return res.status(400).json({
        status: 402,
        message: "Invalid Token",
      })
    }

    return res.status(200).json({
      status: 201,
      message: `${dev[0].username} akun anda telah aktif.`,
    })
  } catch (error) {
    console.log("error")
    res.status(500).json({
      error: error.message,
    })
  }
}

module.exports = {
  getAllRecruiterController,
  createRecruiterController,
  activateAccountController,
}
