const {
  createRecruiter,
  getAllRecruiter,
  activateAccount,
} = require("../models/recruiter")

const getAllRecruiterController = async (req, res) => {
  try {
    const recruiter = await getAllRecruiter()
    res.json(recruiter)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createRecruiterController = async (req, res) => {
  try {
    const recruiter = await createRecruiter(req.body)
    // hanlde duplicate email
    if (recruiter === 1) {
      return res.json({
        status: 200,
        message: "Email sudah terdaftar",
      })
    }
    // handle error kirim email
    else if (recruiter === 2) {
      return res.json({
        status: 402,
        message: "Gagal mengirim email",
      })
    }
    return res.json({
      status: 201,
      message:
        "Pendaftaran berhasil, silahkan cek email anda untuk verifikasi.",
      data: recruiter,
    })
  } catch (error) {
    console.log("error cuy", error)
    res.status(500).json({ error: error.message })
  }
}

const activateAccountController = async (req, res) => {
  try {
    const recruiter = await activateAccount(req.params.token)
    if (recruiter === 1 || recruiter === 2) {
      return res.status(400).json({
        status: 402,
        message: "Invalid Token",
      })
    }

    return res.status(200).json({
      status: 201,
      message: `${recruiter[0].email} akun anda telah aktif.`,
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
