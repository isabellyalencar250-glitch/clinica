// =========================
// 🔥 ELEMENTOS
// =========================
const selectPaciente = document.getElementById("paciente")
const selectMedico = document.getElementById("medico")


// =========================
// 👤 CARREGAR PACIENTES
// =========================
async function carregarPacientes() {

    try {

        const resposta = await fetch("/pacientes")

        // 🔒 NÃO AUTENTICADO
        if (resposta.status === 401) {

            alert("Faça login novamente")
            window.location.href = "/index.html"
            return
        }

        const pacientes = await resposta.json()

        selectPaciente.innerHTML = `
            <option value="">Selecione um paciente</option>
        `

        pacientes.forEach(p => {

            selectPaciente.innerHTML += `
                <option value="${p.id}">
                    ${p.nome}
                </option>
            `
        })

    } catch (erro) {

        console.error("Erro pacientes:", erro)
    }
}


// =========================
// 🩺 CARREGAR MÉDICOS
// =========================
async function carregarMedicos() {

    try {

        const resposta = await fetch("/medicos")

        // 🔒 NÃO AUTENTICADO
        if (resposta.status === 401) {

            alert("Faça login novamente")
            window.location.href = "/index.html"
            return
        }

        const medicos = await resposta.json()

        selectMedico.innerHTML = `
            <option value="">Selecione um médico</option>
        `

        medicos.forEach(m => {

            selectMedico.innerHTML += `
                <option value="${m.id}">
                    ${m.nome} - ${m.especialidade}
                </option>
            `
        })

    } catch (erro) {

        console.error("Erro médicos:", erro)
    }
}


// =========================
// 📋 CADASTRAR CONSULTA
// =========================
document
    .getElementById("formConsulta")
    .addEventListener("submit", async (e) => {

        e.preventDefault()

        const id_paciente =
            document.getElementById("paciente").value

        const id_medico =
            document.getElementById("medico").value

        const data =
            document.getElementById("data").value

        const hora =
            document.getElementById("hora").value

        const observacoes =
            document.getElementById("observacoes").value

        const data_consulta = `${data} ${hora}:00`

        try {

            const resposta = await fetch("/consultas", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    id_paciente,
                    id_medico,
                    data_consulta,
                    status: "Agendada",
                    observacoes
                })
            })

            // 🔒 NÃO AUTENTICADO
            if (resposta.status === 401) {

                alert("Faça login novamente")
                window.location.href = "/index.html"
                return
            }

            const dados = await resposta.json()

            if (dados.sucesso) {

                alert("Consulta agendada!")

                document
                    .getElementById("formConsulta")
                    .reset()

            } else {

                alert("Erro ao agendar")
            }

        } catch (erro) {

            console.error("Erro consulta:", erro)
        }
    })


// =========================
// 🚀 INICIAR
// =========================
carregarPacientes()
carregarMedicos()