document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("formMedico")

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const medico = {
        nome: document.getElementById("nome").value,
        especialidade: document.getElementById("especialidade").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value
    }

    try {
        const res = await fetch("/medicos", { // 🔥 CORRIGIDO AQUI
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(medico)
        })

        const dados = await res.json()

        if (dados.sucesso) {
            alert("Médico cadastrado!")
            form.reset()
        } else {
            alert("Erro ao cadastrar")
        }

    } catch (erro) {
        console.error(erro)
        alert("Erro no servidor")
    }
})

})