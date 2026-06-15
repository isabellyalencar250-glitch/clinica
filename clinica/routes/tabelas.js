async function carregarPacientes() {

    const resposta = await fetch("/pacientes")
    const pacientes = await resposta.json()

    let linhas = ""

    pacientes.forEach(p => {
        linhas += `
        <tr>
            <td>${p.id}</td>
            <td>${p.nome}</td>
            <td>${p.cpf}</td>
            <td>${p.telefone}</td>
            <td>${p.email || "-"}</td>
        </tr>
        `
    })

    document.getElementById("corpoPacientes").innerHTML = linhas
}


async function carregarMedicos() {

    const resposta = await fetch("/medicos")
    const medicos = await resposta.json()

    let linhas = ""

    medicos.forEach(m => {
        linhas += `
        <tr>
            <td>${m.id}</td>
            <td>${m.nome}</td>
            <td>${m.especialidade}</td>
            <td>${m.telefone || "-"}</td>
            <td>${m.email || "-"}</td>
        </tr>
        `
    })

    document.getElementById("corpoMedicos").innerHTML = linhas
}


carregarPacientes()
carregarMedicos()