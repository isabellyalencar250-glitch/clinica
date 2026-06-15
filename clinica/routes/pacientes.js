const express = require("express")
const router = express.Router()
const connection = require("../database/connection")

// =========================
// 📋 LISTAR
// =========================
router.get("/", (req, res) => {
    connection.query("SELECT * FROM pacientes", (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ sucesso: false })
        }

        res.json(results)
    })
})

// =========================
// ➕ CADASTRAR
// =========================
router.post("/", (req, res) => {

    const { nome, data_nascimento, telefone, endereco, cpf } = req.body

    if (!nome || !data_nascimento || !cpf) {
        return res.status(400).json({
            sucesso: false,
            erro: "Campos obrigatórios"
        })
    }

    const sql = `
        INSERT INTO pacientes
        (nome, data_nascimento, telefone, endereco, cpf)
        VALUES (?, ?, ?, ?, ?)
    `

    connection.query(
        sql,
        [nome, data_nascimento, telefone || null, endereco || null, cpf],
        (err, result) => {

            if (err) {
                console.log(err)
                return res.status(500).json({ sucesso: false })
            }

            res.json({
                sucesso: true,
                id: result.insertId
            })
        }
    )
})

// =========================
// ✏️ EDITAR
// =========================
router.put("/:id", (req, res) => {

    const { id } = req.params
    const { nome, cpf } = req.body

    const sql = `
        UPDATE pacientes
        SET nome = ?, cpf = ?
        WHERE id = ?
    `

    connection.query(sql, [nome, cpf, id], (err) => {

        if (err) {
            console.log(err)
            return res.status(500).json({ sucesso: false })
        }

        res.json({ sucesso: true })
    })
})

// =========================
// ❌ EXCLUIR
// =========================
router.delete("/:id", (req, res) => {

    connection.query(
        "DELETE FROM pacientes WHERE id = ?",
        [req.params.id],
        (err) => {

            if (err) {
                console.log(err)
                return res.status(500).json({ sucesso: false })
            }

            res.json({ sucesso: true })
        }
    )
})

module.exports = router