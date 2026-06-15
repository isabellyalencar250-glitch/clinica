const express = require("express")
const router = express.Router()
const connection = require("../database/connection")

// =========================
// 📋 LISTAR MÉDICOS
// =========================
router.get("/", (req, res) => {

    connection.query(
        "SELECT * FROM medicos",
        (err, results) => {

            if(err){

                console.log(err)

                return res.status(500).json({
                    sucesso: false
                })
            }

            res.json(results)
        }
    )
})


// =========================
// ➕ CADASTRAR MÉDICO
// =========================
router.post("/", (req, res) => {

    const {
        nome,
        especialidade
    } = req.body

    if(!nome || !especialidade){

        return res.status(400).json({
            sucesso: false,
            erro: "Campos obrigatórios"
        })
    }

    const sql = `
        INSERT INTO medicos
        (
            nome,
            especialidade
        )
        VALUES (?, ?)
    `

    connection.query(
        sql,
        [
            nome,
            especialidade
        ],
        (err, result) => {

            if(err){

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
// ✏️ EDITAR MÉDICO
// =========================
router.put("/:id", (req, res) => {

    const { id } = req.params

    const {
        nome,
        especialidade
    } = req.body

    const sql = `
        UPDATE medicos
        SET
            nome = ?,
            especialidade = ?
        WHERE id = ?
    `

    connection.query(
        sql,
        [
            nome,
            especialidade,
            id
        ],
        (err) => {

            if(err){

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
// 🗑️ EXCLUIR MÉDICO
// =========================
router.delete("/:id", (req, res) => {

    const { id } = req.params

    // 🔥 EXCLUI CONSULTAS PRIMEIRO
    const sqlConsultas = `
        DELETE FROM consultas
        WHERE id_medico = ?
    `

    connection.query(
        sqlConsultas,
        [id],
        (err) => {

            if(err){

                console.log(err)

                return res.status(500).json({
                    sucesso: false
                })
            }

            // 🔥 AGORA EXCLUI MÉDICO
            const sqlMedico = `
                DELETE FROM medicos
                WHERE id = ?
            `

            connection.query(
                sqlMedico,
                [id],
                (err) => {

                    if(err){

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
        }
    )
})


// =========================
// 🚀 EXPORTAR
// =========================
module.exports = router