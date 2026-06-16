const express = require("express")
const path = require("path")
const session = require("express-session")

const homeRoutes = require("./routes/home")

const connection = require("./database/connection")

const consultasRoutes = require("./routes/consultas")
const pacientesRoutes = require("./routes/pacientes")
const medicosRoutes = require("./routes/medicos")

const app = express()

// =========================
// 🔥 MIDDLEWARES
// =========================
app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))

// =========================
// 🔥 SESSÃO
// =========================
app.use(session({
    secret: "segredo",
    resave: false,
    saveUninitialized: false
}))

// =========================
// 🔒 VERIFICAR LOGIN
// =========================
function verificarLogin(req, res, next) {

    if (req.session.usuario) {
        return next()
    }

    return res.status(401).json({
        sucesso: false,
        erro: "Não autenticado"
    })
}
// =========================
// 🔥 ARQUIVOS ESTÁTICOS
// =========================
app.use(express.static(
    path.join(__dirname, "public")
))

// =========================
// 🔥 ROTAS API
// =========================
app.use(
    "/consultas",
    verificarLogin,
    consultasRoutes
)

app.use(
    "/pacientes",
    verificarLogin,
    pacientesRoutes
)

app.use(
    "/medicos",
    verificarLogin,
    medicosRoutes
)

// =========================
// 🔥 HOME ROUTES
// =========================
app.use(homeRoutes)

// =========================
// 🔐 LOGIN
// =========================
app.post("/login", (req, res) => {

    const { usuario, senha } = req.body

    const sql = `
        SELECT *
        FROM usuarios
        WHERE usuario = ?
        AND senha = ?
    `

    connection.query(
        sql,
        [usuario, senha],
        (err, results) => {

            if (err) {

                console.log(err)

                return res.status(500).json({
                    sucesso: false
                })
            }

            if (results.length > 0) {

                req.session.usuario = results[0]

                return res.json({
                    sucesso: true,
                    tipo: results[0].tipo
                })
            }

            return res.status(401).json({
                sucesso: false
            })
        }
    )
})

// =========================
// 🚪 LOGOUT
// =========================
app.get("/logout", (req, res) => {

    req.session.destroy(() => {

        res.redirect("/index.html")

    })
})

// =========================
// 📄 PÁGINAS
// =========================
app.get("/admin.html", verificarLogin, (req, res) => {

    res.sendFile(
        path.join(__dirname, "public/admin.html")
    )
})

app.get("/consultas.html", verificarLogin, (req, res) => {

    res.sendFile(
        path.join(__dirname, "public/Consultas.html")
    )
})

app.get("/paciente.html", verificarLogin, (req, res) => {

    res.sendFile(
        path.join(__dirname, "public/Paciente.html")
    )
})

app.get("/medicos.html", verificarLogin, (req, res) => {

    res.sendFile(
        path.join(__dirname, "public/medicos.html")
    )
})

// =========================
// 🚀 INICIAR SERVIDOR
// =========================
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`🚀 Rodando na porta ${PORT}`)
})