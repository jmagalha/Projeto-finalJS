import { Header } from "../components/header.component.js"
import { addContactService } from "../services/contact.service.js"

const root = document.querySelector('#root')
const addContact = document.createElement('form')
addContact.setAttribute('id', 'p-add-contact')

const eventos = () => {
    addContact.addEventListener('submit', (e) => {
        e.preventDefault()

        const fd = new FormData(addContact)
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

        console.log(dadosDoFormulario)
        addContactService(dadosDoFormulario)
            .then(({ data }) => {
                window.alert(`contato ${data.nome} criado com sucesso!`)
                window.open('/#contacts', '_self')
            })
            .catch((erro) => {
                console.error(erro)
            })
    })
}

export const AddContact = () => {
    const componenteHeader = Header()
    root.append(componenteHeader)

    addContact.innerHTML = `
        <div id="cabecalho">
            <h1>Novo contato</h1>
            <a href="/?#contacts">Voltar para contatos</a>
        </div>

        <fieldset>
            <legend>Dados pessoais</legend>
            <input placeholder="Nome" name="nome" type="text" required/>
            <input placeholder="Apelido" name="apelido" type="text" />
            <input placeholder="E-mail" name="email" type="email" />
            <textarea placeholder="Nota" name="notas" /></textarea>
        </fieldset>
        <fieldset>
            <legend>Endereço</legend>
            <input placeholder="Logradouro" name="logradouro" type="text" />
            <input placeholder="Cidade" name="cidade" type="text" />
            <input placeholder="Estado" name="estado" type="text" />
            <input placeholder="CEP" name="cep" type="text" />
            <input placeholder="País" name="pais" type="text" />
        </fieldset>
            
        <fieldset>
            <legend>Telefones</legend>
            <select name="tipo-telefone-1">
                <option value="casa">Casa</option>
                <option value="trabalho">Trabalho</option>
                <option value="celular">Celular</option>
            </select>
            <input name="numero-1" placeholder="Insira o número aqui..." type="phone" />

            <select name="tipo-telefone-2">
                <option value="casa">Casa</option>
                <option value="trabalho">Trabalho</option>
                <option value="celular">Celular</option>
            </select>            
            <input name="numero-2" placeholder="Insira o número aqui..." type="phone" />

            <select name="tipo-telefone-3">
                <option value="casa">Casa</option>
                <option value="trabalho">Trabalho</option>
                <option value="celular">Celular</option>
            </select>
            <input name="numero-3" placeholder="Insira o número aqui..." type="phone" />
        </fieldset>

        <button>Cadastrar</button>
    `

    eventos()
    return addContact
}