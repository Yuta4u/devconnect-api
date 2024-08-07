const { Pool } = require("pg")
require("dotenv").config()

const pool = new Pool({
  connectionString: process.env.PG_CONNECTION,
})

pool.connect((err) => {
  if (err) {
    console.error("Gagal connect database: " + err)
    return
  }
  console.log("Connected to database")
})

module.exports = pool
