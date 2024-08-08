const { Pool } = require("pg")
require("dotenv").config()

const pool = new Pool({
  connectionString: "postgresql://postgres.jgtqqzpmncchmkkqqoql:Tomzriderx02@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres",
})

pool.connect((err) => {
  if (err) {
    console.error("Gagal connect database: " + err)
    return
  }
  console.log("Connected to database")
})

module.exports = pool
