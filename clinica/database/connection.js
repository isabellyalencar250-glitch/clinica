const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",   // senha vazia local
    database: process.env.DB_NAME || "clinica",
    port: process.env.DB_PORT || 3306
})

connection.connect((err) => {
    if(err){
        console.log("Erro ao conectar no banco")
        console.log(err)
    }else{
        console.log("Conectado ao MySQL!")
    }
})

module.exports = connection