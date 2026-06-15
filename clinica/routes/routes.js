const express = require("express")
const router = express.Router()

const login = require("./login")
const home = require("./home")
const logout = require("./logout")
const pacientes = require("./paciente")
const medicos = require("./medicos")
const consultas = require("./consultas")
const recepcionista = require("./recepcionista")

// 🔥 ROTAS DE API (com prefixo)
router.use("/pacientes", pacientes)
router.use("/medicos", medicos)
router.use("/consultas", consultas)

// 🔥 OUTRAS ROTAS
router.use(recepcionista)
router.use(login)
router.use(logout)
router.use(home) // sempre por último

module.exports = router