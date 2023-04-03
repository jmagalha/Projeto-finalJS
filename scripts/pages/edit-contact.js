import { Header } from "../components/header.component.js"
import { editContactService, getContactService} from "../services/contact.service.js"

const root = document.querySelector('#root')
const editContact = document.createElement('form')
editContact.setAttribute('id', 'p-add-contact')

const eventos = () => {
    const url = new URL(window.location.href)
    const params = url.searchParams
    const idContato = params.get('id-contact')
    
    function handleOptions(tipo) {
        switch(tipo) {
            case 'casa':
                return (`
                <option selected value="casa">Casa</option>
                <option value="trabalho">Trabalho</option>
                <option value="celular">Celular</option>
                `)
            case 'trabalho':
                return (`
                <option value="casa">Casa</option>
                <option selected value="trabalho">Trabalho</option>
                <option value="celular">Celular</option>
                `)
            case 'celular':
                return (`
                <option value="casa">Casa</option>
                <option value="trabalho">Trabalho</option>
                <option selected value="celular">Celular</option>
                `)
            default:
                return (`
                <option value="casa">Casa</option>
                <option value="trabalho">Trabalho</option>
                <option value="celular">Celular</option>
                `)
        } 
    }

    getContactService(idContato)
        .then(({ data }) => {
            editContact.innerHTML += `
                <fieldset>
                    <legend>Dados pessoais</legend>
                    <input value="${data.nome}" placeholder="Nome"  name="nome" type="text" required/>
                    <input value="${data.apelido}" placeholder="Apelido" name="apelido" type="text" />
                    <input value="${data.email}" placeholder="E-mail" name="email" type="email" />
                    <textarea placeholder="Nota" name="notas" />${data.notas}</textarea>
                </fieldset>
                <fieldset>
                    <legend>Endereço</legend>
                    <input value="${data.endereco.logradouro}" placeholder="Logradouro" name="logradouro" type="text" />
                    <input value="${data.endereco.cidade}" placeholder="Cidade" name="cidade" type="text" />
                    <input value="${data.endereco.estado}" placeholder="Estado" name="estado" type="text" />
                    <input value="${data.endereco.cep}" placeholder="CEP" name="cep" type="text" />
                    <input value="${data.endereco.pais}" placeholder="País" name="pais" type="text" />
                </fieldset>
                `
                const telefone1 = data.telefones[0] ? data.telefones[0].numero : ""
                const telefone2 = data.telefones[1] ? data.telefones[1].numero : ""
                const telefone3 = data.telefones[2] ? data.telefones[2].numero : ""
                
                const selected1 = data.telefones[0] ? handleOptions(data.telefones[0].tipo) :
                `<option value="casa">Casa</option>
                <option value="trabalho">Trabalho</option>
                <option value="celular">Celular</option>`
                const selected2 = data.telefones[1] ? handleOptions(data.telefones[1].tipo) :
                `<option value="casa">Casa</option>
                <option value="trabalho">Trabalho</option>
                <option value="celular">Celular</option>`
                const selected3 = data.telefones[2] ? handleOptions(data.telefones[2].tipo) :
                `<option value="casa">Casa</option>
                <option value="trabalho">Trabalho</option>
                <option value="celular">Celular</option>`

                editContact.innerHTML += `
                <fieldset>
                    <legend>Telefones</legend>
                    <select name="tipo-telefone-1">
                        ${selected1}
                    </select>
                    <input value="${telefone1}" name="numero-1" placeholder="Insira o número aqui..." type="phone" />

                    <select name="tipo-telefone-2">
                        ${selected2}
                    </select>            
                    <input value="${telefone2}" name="numero-2" placeholder="Insira o número aqui..." type="phone" />

                    <select name="tipo-telefone-3">
                        ${selected3}
                    </select>
                    <input value="${telefone3}" name="numero-3" placeholder="Insira o número aqui..." type="phone" />
                </fieldset>
                <button>Atualizar</button>
            `
            console.log(data)
        })
        .catch((e) => {
            console.log(e)
        })

    editContact.addEventListener('submit', (e) => {
        e.preventDefault()
        
        const fd = new FormData(editContact)
        const dadosDoFormulario = Object.fromEntries(fd)

        // cria o atributo "telefones" no objeto dadosDoFormulario
        dadosDoFormulario.telefones = [
            { tipo: dadosDoFormulario['tipo-telefone-1'], numero: dadosDoFormulario['numero-1'] },
            { tipo: dadosDoFormulario['tipo-telefone-2'], numero: dadosDoFormulario['numero-2'] },
            { tipo: dadosDoFormulario['tipo-telefone-3'], numero: dadosDoFormulario['numero-3'] }
        ]

        // filtrei apenas os telefones que têm número
        dadosDoFormulario.telefones = dadosDoFormulario.telefones.filter((telefone) => {
            return telefone.numero !== ''
        })

        delete dadosDoFormulario['tipo-telefone-1']
        delete dadosDoFormulario['tipo-telefone-2']
        delete dadosDoFormulario['tipo-telefone-3']
        delete dadosDoFormulario['numero-1']
        delete dadosDoFormulario['numero-2']
        delete dadosDoFormulario['numero-3']

        // cria o atributo "endereco" no objeto dadosDoFormulario
        dadosDoFormulario.endereco = {
            logradouro: dadosDoFormulario['logradouro'],
            cidade: dadosDoFormulario['cidade'],
            estado: dadosDoFormulario['estado'],
            cep: dadosDoFormulario['cep'],
            pais: dadosDoFormulario['pais'],
        }

        delete dadosDoFormulario['logradouro']
        delete dadosDoFormulario['cidade']
        delete dadosDoFormulario['estado']
        delete dadosDoFormulario['cep']
        delete dadosDoFormulario['pais']

        dadosDoFormulario.idContato = idContato
        console.log(dadosDoFormulario)
        editContactService(dadosDoFormulario)
            .then(({ data }) => {
                window.alert(`contato ${data.nome} editado com sucesso!`)
                window.open('/#contacts', '_self')
            })
            .catch((erro) => {
                console.error(erro)
            })
    })
}

export const EditContact = () => {
    const componenteHeader = Header()
    root.append(componenteHeader)

    editContact.innerHTML = `
        <div id="cabecalho">
            <h1>Editar contato</h1>
            <a href="/?#contacts">Voltar para contatos</a>
        </div>
    `

    eventos()

    return editContact
}