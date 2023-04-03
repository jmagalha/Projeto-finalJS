import { signupService } from "../services/user.service.js"

const signup = document.createElement('form')
signup.setAttribute('id', 'p-signup')

const eventos = () => {
    signup.addEventListener('submit', (e) => {
        e.preventDefault()

        const spanMensagem = signup.querySelector('span')

        const fd = new FormData(signup)
        const dadosDoFormulario = Object.fromEntries(fd)

        signupService(dadosDoFormulario)
            .then((resposta) => {

                if(resposta.status === 409) {
                    spanMensagem.innerText = resposta.mensagem

                    setTimeout(() => {
                        spanMensagem.innerText = null
                    }, 3000)
                }
                else if(resposta.status === 200) {
                    window.location.href = '/#login'
                }
            })
            .catch((erro) => {
                spanMensagem.innerText = 'Erro interno, tente novamente mais tarde!'
                console.error(erro)
            })
    })
}

export const Signup = () => {
    signup.innerHTML = `
        <a href="/#login">Já possui conta? Entre aqui!</a>
        <br>
        
        <label for="nome">Nome completo</label>
        <input type="nome" name="nome" required>

        <label for="email">E-mail</label>
        <input type="email" name="email" required>

        <label for="senha">Senha</label>
        <input type="password" name="senha" required>

        <button type="submit">Cadastrar</button>
        <span></span>
    `

    eventos()
    return signup
}
