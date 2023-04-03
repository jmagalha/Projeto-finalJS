import { Header } from "../components/header.component.js"
import { getContactService } from "../services/contact.service.js"

const root = document.querySelector('#root')
const contactDetails = document.createElement('div')
contactDetails.setAttribute('id', 'p-contact-details')

const eventos = () => {
    const url = new URL(window.location.href)
    const params = url.searchParams
    const idContato = params.get('id-contact')

    getContactService(idContato)
        .then(({ data }) => {
            contactDetails.innerHTML += `
                <h2>${data.nome}</h2>
                <p>Apelido: ${data.apelido}</p>
                <p>Email: ${data.email}</p>
                <p>Observação: ${data.notas}</p>

                <hr/>
                <h3>Endereço</h3>
                <p>Logradouro: ${data.endereco.logradouro}</p>
                
                <hr/>
                <h3>Telefone</h3>
            `

            data.telefones.forEach((telefone) => {
                contactDetails.innerHTML += `
                    <p>Tipo: ${telefone.tipo}</p>
                    <p>Numero: ${telefone.numero}</p>
                    <br>
                `
            })
            console.log(data)
        })
        .catch((e) => {
            console.log(e)
        })
}

export const ContactDetails = () => {
    const componenteHeader = Header()
    root.append(componenteHeader)

    contactDetails.innerHTML = `
        <div id="cabecalho">
            <h1>Detalhes do contato</h1>
            <a href="/#contacts">Voltar para contatos</a>
        </div>
    `

    eventos()
    return contactDetails
}