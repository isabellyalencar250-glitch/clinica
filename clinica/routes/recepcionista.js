const express = require("express")
const router = express.Router()
const connection = require("../database/connection")
const bcrypt = require("bcrypt")

// =========================
// ➕ CADASTRAR RECEPCIONISTA
// =========================
router.post("/register", async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const senhaHash = await bcrypt.hash(senha, 10)

        const sql = "INSERT INTO recepcionistas (nome, email, senha) VALUES (?, ?, ?)"

        connection.query(sql, [nome, email, senhaHash], (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({ sucesso: false })
            }

            res.json({ sucesso: true, id: result.insertId })
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ sucesso: false })
    }
})


// =========================
// 🔐 LOGIN RECEPCIONISTA
// =========================
router.post("/login", (req, res) => {
    const { email, senha } = req.body

    const sql = "SELECT * FROM recepcionistas WHERE email=?"

    connection.query(sql, [email], async (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ sucesso: false })
        }

        if (result.length === 0) {
            return res.status(401).json({ sucesso: false })
        }

        const usuario = result[0]

        const senhaValida = await bcrypt.compare(senha, usuario.senha)

        if (!senhaValida) {
            return res.status(401).json({ sucesso: false })
        }

        req.session.usuario = usuario
        req.session.tipo = "recepcionista"

        res.json({ sucesso: true })
    })
})


// =========================
// 🚪 LOGOUT
// =========================
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login-recepcionista.html")
    })
})

module.exports = router