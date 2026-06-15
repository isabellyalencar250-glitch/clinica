document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("formPaciente")

// =========================
// 💾 CADASTRAR
// =========================
form.addEventListener("submit", async (e) => {

    e.preventDefault()

    const paciente = {
        nome: document.getElementById("nome").value,
        data_nascimento: document.getElementById("nascimento").value,
        cpf: document.getElementById("cpf").value,
        telefone: document.getElementById("telefone").value,
        endereco: document.getElementById("endereco").value
    }

    const res = await fetch("/pacientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paciente)
    })

    if (!res.ok) {
        alert("Erro (login ou servidor)")
        return
    }

    const dados = await res.json()

    if (dados.sucesso) {
        alert("Paciente cadastrado!")
        form.reset()
        carregar()
    } else {
        alert(dados.erro || "Erro")
    }
})

// =========================
// 📋 LISTAR
// =========================
async function carregar() {

    const res = await fetch("/pacientes")

    if (!res.ok) return

    const lista = await res.json()

    const tabela = document.getElementById("listaPacientes")

    tabela.innerHTML = ""

    lista.forEach(p => {
        tabela.innerHTML += `
            <tr>
                <td>${p.nome}</td>
                <td>${p.cpf}</td>
                <td>${p.telefone || ""}</td>
            </tr>
        `
    })
}

carregar()

})