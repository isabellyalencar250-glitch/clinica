const connection = require("../database/connection")

function buscarUsuario(usuario, senha){

    return new Promise((resolve, reject)=>{

        const sql = "SELECT * FROM usuarios WHERE usuario = ? AND senha = ?"

        connection.query(sql,[usuario,senha],(err,result)=>{

            if(err){
                reject(err)
            }

            resolve(result)

        })

    })

}

module.exports = {
    buscarUsuario
}