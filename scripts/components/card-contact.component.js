import { deleteContactService } from "../services/contact.service.js"

const cardContact = document.createElement('div')
cardContact.classList.add('c-card-contact')

const eventos = (contato) => {
    // é clonado o elemento inicial para gerar uma instancia independente 
    // dentro da função eventos é utilizado apenas o clone!
    const cardContactClone = cardContact.cloneNode(true)

    const [anchorDelete] = cardContactClone.querySelectorAll('a')
    
    anchorDelete.addEventListener('click', (e) => {
        e.preventDefault()
        
        const confirmacao = window.confirm(`Deseja deletar o contato ${contato.nome}?`)

        // só deleta se confirmar que quer deletar
        if(confirmacao === true) {
            deleteContactService(contato.id)
                .then(({data}) => {
                    window.alert(data?.msg)
                    window.location.reload()
                })
                .catch((erro) => {
                    console.error(erro)
                })
        }

    })

    // por fim, eventos retorna o clone do elemento com os eventos adicionados
    return cardContactClone
}

export const CardContact = (contato) => {
    cardContact.innerHTML = `
        <p>${contato.nome}</p>
        
        <a href="/#contacts">Deletar</a>
        <a href="/?id-contact=${contato.id}#edit-contact">Editar</a>
        <a href="/?id-contact=${contato.id}#contact-details">Visualizar</a>
    `

    // chama a função eventos, porém, dessa vez ela retorna um novo elemento clonado,
    // sendo esse uma nova instancia independente
    const cardContactClone = eventos(contato)

    // retorna o clone, como estava sendo feito antes, porém agora vem do eventos
    return cardContactClone
}