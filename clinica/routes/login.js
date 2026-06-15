const express = require("express")
const router = express.Router()

const usuarioRepository = require("../repositories/usuarioRepository")

router.post("/login", async (req,res)=>{

    const {usuario, senha} = req.body

    const resultado = await usuarioRepository.buscarUsuario(usuario,senha)

    if(resultado.length > 0){

        req.session.usuario = resultado[0]

        res.json({
            sucesso:true,
            tipo:resultado[0].tipo
        })

    }else{

        res.json({
            sucesso:false
        })

    }

})

module.exports = router