// =========================
// 🔥 FORMATA DATA
// =========================
function formatarData(dataISO){

    if(!dataISO) return ""

    const data = new Date(dataISO)

    return data.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    })
}


// =========================
// 📊 DASHBOARD
// =========================
async function carregarDashboard(){

    try {

        const pacientesRes = await fetch("/pacientes")
        const listaPacientes = await pacientesRes.json()

        document.getElementById("totalPacientes").innerText =
            listaPacientes.length || 0


        const medicosRes = await fetch("/medicos")
        const listaMedicos = await medicosRes.json()

        document.getElementById("totalMedicos").innerText =
            listaMedicos.length || 0


        const consultasRes = await fetch("/consultas")
        const listaConsultas = await consultasRes.json()

        document.getElementById("totalConsultas").innerText =
            listaConsultas.length || 0

    } catch (erro) {

        console.error("Erro dashboard:", erro)
    }
}

carregarDashboard()


// =========================
// 🔎 PESQUISA
// =========================
function pesquisarTabela(){

    const input =
        document.getElementById("pesquisa")

    const filtro =
        input.value.toLowerCase()

    const linhas =
        document.querySelectorAll("#corpoTabela tr")

    linhas.forEach(linha => {

        const texto =
            linha.innerText.toLowerCase()

        linha.style.display =
            texto.includes(filtro)
            ? ""
            : "none"
    })
}


// =========================
// 👤 PACIENTES
// =========================
async function mostrarPacientes(){

    try {

        const resposta = await fetch("/pacientes")
        const pacientes = await resposta.json()

        document.getElementById("tabelaArea").style.display =
            "block"

        document.getElementById("tituloTabela").innerText =
            "Lista de Pacientes"

        document.getElementById("cabecalho").innerHTML =
        `
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Ações</th>
        `

        let linhas = ""

        pacientes.forEach(p => {

            linhas += `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.nome}</td>
                    <td>${p.cpf}</td>

                    <td>

                        <button
                            class="editar"
                            onclick="editarPaciente(${p.id}, '${p.nome}', '${p.cpf}')"
                        >
                            ✏️
                        </button>

                        <button
                            class="excluir"
                            onclick="excluirPaciente(${p.id})"
                        >
                            🗑️
                        </button>

                    </td>
                </tr>
            `
        })

        document.getElementById("corpoTabela").innerHTML =
            linhas

    } catch (erro) {

        console.error("Erro pacientes:", erro)
    }
}


// =========================
// 🩺 MÉDICOS
// =========================
async function mostrarMedicos(){

    try {

        const resposta = await fetch("/medicos")
        const medicos = await resposta.json()

        document.getElementById("tabelaArea").style.display =
            "block"

        document.getElementById("tituloTabela").innerText =
            "Lista de Médicos"

        document.getElementById("cabecalho").innerHTML =
        `
            <th>ID</th>
            <th>Nome</th>
            <th>Especialidade</th>
            <th>Ações</th>
        `

        let linhas = ""

        medicos.forEach(m => {

            linhas += `
                <tr>
                    <td>${m.id}</td>
                    <td>${m.nome}</td>
                    <td>${m.especialidade}</td>

                    <td>

                        <button
                            class="editar"
                            onclick="editarMedico(${m.id}, '${m.nome}', '${m.especialidade}')"
                        >
                            ✏️
                        </button>

                        <button
                            class="excluir"
                            onclick="excluirMedico(${m.id})"
                        >
                            🗑️
                        </button>

                    </td>
                </tr>
            `
        })

        document.getElementById("corpoTabela").innerHTML =
            linhas

    } catch (erro) {

        console.error("Erro médicos:", erro)
    }
}


// =========================
// 📋 CONSULTAS
// =========================
async function mostrarConsultas(){

    try {

        const resposta = await fetch("/consultas")
        const consultas = await resposta.json()

        document.getElementById("tabelaArea").style.display =
            "block"

        document.getElementById("tituloTabela").innerText =
            "Lista de Consultas"

        document.getElementById("cabecalho").innerHTML =
        `
            <th>ID</th>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Data</th>
            <th>Status</th>
            <th>Ações</th>
        `

        let linhas = ""

        consultas.forEach(c => {

            linhas += `
                <tr>
                    <td>${c.id}</td>

                    <td>
                        ${c.paciente || "Não encontrado"}
                    </td>

                    <td>
                        ${c.medico || "Não encontrado"}
                    </td>

                    <td>
                        ${formatarData(c.data_consulta)}
                    </td>

                    <td>
                        ${c.status}
                    </td>

                    <td>

                        <button
                            class="editar"
                            onclick="editarConsulta(${c.id}, '${c.status}')"
                        >
                            ✏️
                        </button>

                        <button
                            class="excluir"
                            onclick="excluirConsulta(${c.id})"
                        >
                            🗑️
                        </button>

                    </td>
                </tr>
            `
        })

        document.getElementById("corpoTabela").innerHTML =
            linhas

    } catch (erro) {

        console.error("Erro consultas:", erro)
    }
}


// =========================
// ✏️ EDITAR PACIENTE
// =========================
async function editarPaciente(id, nomeAtual, cpfAtual){

    const novoNome =
        prompt("Novo nome:", nomeAtual)

    if(!novoNome) return

    const novoCpf =
        prompt("Novo CPF:", cpfAtual)

    if(!novoCpf) return

    try {

        const resposta =
            await fetch(`/pacientes/${id}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    nome: novoNome,
                    cpf: novoCpf
                })
            })

        const dados =
            await resposta.json()

        if(dados.sucesso){

            alert("Paciente atualizado!")

            await mostrarPacientes()
            await carregarDashboard()

        } else {

            alert("Erro ao atualizar")
        }

    } catch (erro) {

        console.error(erro)
    }
}


// =========================
// 🗑️ EXCLUIR PACIENTE
// =========================
async function excluirPaciente(id){

    const confirmar =
        confirm("Deseja excluir este paciente?")

    if(!confirmar) return

    try {

        const resposta =
            await fetch(`/pacientes/${id}`, {
                method: "DELETE"
            })

        const dados =
            await resposta.json()

        if(dados.sucesso){

            alert("Paciente excluído!")

            await mostrarPacientes()
            await carregarDashboard()

        } else {

            alert("Erro ao excluir")
        }

    } catch (erro) {

        console.error(erro)
    }
}


// =========================
// ✏️ EDITAR MÉDICO
// =========================
async function editarMedico(id, nomeAtual, especialidadeAtual){

    const novoNome =
        prompt("Novo nome:", nomeAtual)

    if(!novoNome) return

    const novaEspecialidade =
        prompt(
            "Nova especialidade:",
            especialidadeAtual
        )

    if(!novaEspecialidade) return

    try {

        const resposta =
            await fetch(`/medicos/${id}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    nome: novoNome,
                    especialidade: novaEspecialidade
                })
            })

        const dados =
            await resposta.json()

        if(dados.sucesso){

            alert("Médico atualizado!")

            await mostrarMedicos()
            await carregarDashboard()

        } else {

            alert("Erro ao atualizar")
        }

    } catch (erro) {

        console.error(erro)
    }
}


// =========================
// 🗑️ EXCLUIR MÉDICO
// =========================
async function excluirMedico(id){

    const confirmar =
        confirm("Deseja excluir este médico?")

    if(!confirmar) return

    try {

        const resposta =
            await fetch(`/medicos/${id}`, {
                method: "DELETE"
            })

        const dados =
            await resposta.json()

        if(dados.sucesso){

            alert("Médico excluído!")

            await mostrarMedicos()
            await carregarDashboard()

        } else {

            alert(
                "Não é possível excluir médico com consultas"
            )
        }

    } catch (erro) {

        console.error(erro)
    }
}


// =========================
// ✏️ EDITAR CONSULTA
// =========================
async function editarConsulta(id, statusAtual){

    const novoStatus =
        prompt(
            "Novo status:",
            statusAtual
        )

    if(!novoStatus) return

    try {

        const consultasRes =
            await fetch("/consultas")

        const consultas =
            await consultasRes.json()

        const consulta =
            consultas.find(c => c.id == id)

        const resposta =
            await fetch(`/consultas/${id}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    id_paciente:
                        consulta.id_paciente,

                    id_medico:
                        consulta.id_medico,

                    data_consulta:
                        consulta.data_consulta,

                    observacoes:
                        consulta.observacoes,

                    status:
                        novoStatus
                })
            })

        const dados =
            await resposta.json()

        if(dados.sucesso){

            alert("Consulta atualizada!")

            await mostrarConsultas()
            await carregarDashboard()

        } else {

            alert("Erro ao atualizar")
        }

    } catch (erro) {

        console.error(erro)
    }
}


// =========================
// 🗑️ EXCLUIR CONSULTA
// =========================
async function excluirConsulta(id){

    const confirmar =
        confirm(
            "Deseja excluir esta consulta?"
        )

    if(!confirmar) return

    try {

        const resposta =
            await fetch(`/consultas/${id}`, {
                method: "DELETE"
            })

        const dados =
            await resposta.json()

        if(dados.sucesso){

            alert("Consulta excluída!")

            await mostrarConsultas()
            await carregarDashboard()

        } else {

            alert("Erro ao excluir")
        }

    } catch (erro) {

        console.error(erro)
    }
}


// =========================
// 🚪 LOGOUT
// =========================
async function logout(){

    try {

        await fetch("/logout")

        window.location.href =
            "/index.html"

    } catch (erro) {

        console.error("Erro logout:", erro)

        alert("Erro ao sair")
    }
}