const mysql = require("mysql2")

const connection = mysql.createConnection({

    host: "127.0.0.1",
    user: "root",
    password: "",   // senha vazia
    database: "clinica",
    port: 3306

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