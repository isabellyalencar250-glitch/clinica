const mysql = require("mysql2")

const connection = mysql.createConnection({
    // Se o .env falhar por qualquer motivo, o código usa os dados públicos do Railway após o ||
    host: process.env.DB_HOST || "thomas.proxy.rlwy.net",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "HAYizMFXWRXCcyiiFwzewwZIaVZHMPzz",
    database: process.env.DB_NAME || "railway",
    port: process.env.DB_PORT || 48338
})

connection.connect((err) => {
    if(err){
        console.log("Erro ao conectar no banco Railway:")
        console.log(err)
    }else{
        console.log("🚀 CONECTADO AO MYSQL DO RAILWAY COM SUCESSO!")
    }
})

module.exports = connection