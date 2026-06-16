const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "clinic_medica",
  port: process.env.DB_PORT || 3306
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar:", err);
    return;
  }
  console.log("Conectado ao MySQL!");
});

module.exports = connection;