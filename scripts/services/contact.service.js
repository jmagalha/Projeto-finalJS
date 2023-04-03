const urlBase = "http://localhost:5000/v1/"

const headers = new Headers()
headers.set('Content-Type', 'application/json')

export const getAllContactsService = async () => {
    const url = urlBase + 'contact'
    headers.set('Authorization', `${sessionStorage.getItem('@token')}`)

    const resposta = await fetch(url, {
        headers,
        method: 'GET'
    })

    return await resposta.json()
}

export const getContactService = async (id) => {
    const url = urlBase + `contact/${id}`
    headers.set('Authorization', sessionStorage.getItem('@token'))

    const resposta = await fetch(url, {
        headers,
        method: 'GET'
    })

    return await resposta.json()
}

export const deleteContactService = async (idContato) => {
    const url = urlBase + `contact`
    headers.set('Authorization', sessionStorage.getItem('@token'))

    const resposta = await fetch(url, {
        headers,
        method: 'DELETE',
        body: JSON.stringify({ idContato })
    })

    return await resposta.json()
}

export const addContactService = async (dados) => {
    const url = urlBase + `contact`
    headers.set('Authorization', sessionStorage.getItem('@token'))

    const resposta = await fetch(url, {
        headers,
        method: 'POST',
        body: JSON.stringify(dados)
    })

    return await resposta.json()
}

export const editContactService = async (dados) => {
    const url = urlBase + `contact`
    headers.set('Authorization', sessionStorage.getItem('@token'))

    const resposta = await fetch(url, {
        headers,
        method: 'PATCH',
        body: JSON.stringify(dados)
    })

    return await resposta.json()
}