async function login(){

    const usuario = document.getElementById("usuario").value
    const senha = document.getElementById("senha").value

    const resposta = await fetch("/login",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            usuario,
            senha
        })

    })

    const dados = await resposta.json()

    if(dados.sucesso){

        if(dados.tipo === "admin"){
            window.location = "/home/admin"
        }

    }else{

        alert("Usuário ou senha inválidos")

    }
  
}
