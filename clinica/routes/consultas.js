const express = require("express")
const router = express.Router()
const connection = require("../database/connection")


// =========================
// ➕ CADASTRAR CONSULTA
// =========================
router.post("/", (req, res) => {

    const {
        id_paciente,
        id_medico,
        data_consulta,
        status,
        observacoes
    } = req.body

    if (!id_paciente || !id_medico || !data_consulta) {

        return res.status(400).json({
            sucesso: false,
            erro: "Campos obrigatórios"
        })
    }

    const sql = `
        INSERT INTO consultas
        (
            id_paciente,
            id_medico,
            data_consulta,
            status,
            observacoes
        )
        VALUES (?, ?, ?, ?, ?)
    `

    connection.query(
        sql,
        [
            id_paciente,
            id_medico,
            data_consulta,
            status || "Agendada",
            observacoes || null
        ],
        (err, result) => {

            if (err) {

                console.log(err)

                return res.status(500).json({
                    sucesso: false
                })
            }

            res.json({
                sucesso: true,
                id: result.insertId
            })
        }
    )
})


// =========================
// 📋 LISTAR CONSULTAS
// =========================
router.get("/", (req, res) => {

    const sql = `
        SELECT
            c.*,
            p.nome AS paciente,
            m.nome AS medico
        FROM consultas c

        LEFT JOIN pacientes p
            ON c.id_paciente = p.id

        LEFT JOIN medicos m
            ON c.id_medico = m.id

        ORDER BY c.data_consulta DESC
    `

    connection.query(sql, (err, results) => {

        if (err) {

            console.log(err)

            return res.status(500).json([])
        }

        res.json(results)
    })
})


// =========================
// ✏️ EDITAR CONSULTA
// =========================
router.put("/:id", (req, res) => {

    const {
        id_paciente,
        id_medico,
        data_consulta,
        status,
        observacoes
    } = req.body

    const sql = `
        UPDATE consultas
        SET
            id_paciente = ?,
            id_medico = ?,
            data_consulta = ?,
            status = ?,
            observacoes = ?
        WHERE id = ?
    `

    connection.query(
        sql,
        [
            id_paciente,
            id_medico,
            data_consulta,
            status,
            observacoes,
            req.params.id
        ],
        (err) => {

            if (err) {

                console.log(err)

                return res.status(500).json({
                    sucesso: false
                })
            }

            res.json({
                sucesso: true
            })
        }
    )
})


// =========================
// 🗑️ EXCLUIR CONSULTA
// =========================
router.delete("/:id", (req, res) => {

    connection.query(
        "DELETE FROM consultas WHERE id = ?",
        [req.params.id],
        (err) => {

            if (err) {

                console.log(err)

                return res.status(500).json({
                    sucesso: false
                })
            }

            res.json({
                sucesso: true
            })
        }
    )
})


// =========================
// 🚀 EXPORTAR
// =========================
module.exports = router