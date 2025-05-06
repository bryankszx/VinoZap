"use scrict"

let numeroAtual = ''
let contatoAtual = null

async function carregarConversas() {
    numeroAtual = document.getElementById('numeroUsuario').value.trim()
    if (!numeroAtual) {
        alert('Digite um número válido')
        return
    }

    try {
        const resposta = await fetch(`http://localhost:8080/v1/whatssap/usuario/conversas/${numeroAtual}`)
        const dados = await resposta.json()

        mostrarContatos(dados)
        document.getElementById('mensagens').replaceChildren("")
        contatoAtual = null
        document.getElementById('mensagemInput').disabled = true
        document.getElementById('btnEnviar').disabled = true
    } catch (erro) {
        alert('Erro ao buscar as conversas')
        console.error(erro)
    }
}

function mostrarContatos(conversas) {
    const lista = document.getElementById('listaContatos')
    lista.replaceChildren("")

    conversas.forEach(contato => {
        const div = document.createElement('div')
        div.className = 'contato'
        div.textContent = contato.nome
        div.onclick = () => {
            mostrarMensagens(contato)
            contatoAtual = contato.nome
            document.getElementById('mensagemInput').disabled = false
            document.getElementById('btnEnviar').disabled = false
        }
        lista.appendChild(div)
    })
}

function mostrarMensagens(contato) {
    const mensagensDiv = document.getElementById('mensagens')
    mensagensDiv.replaceChildren("")

    contato.conversas.forEach(msg => {
        const p = document.createElement('p')
        p.textContent = `[${msg.time}] ${msg.content}`
        mensagensDiv.appendChild(p)
    })
}

carregarConversas()