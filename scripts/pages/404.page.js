const notFound = document.createElement('div')
notFound.setAttribute('id', 'p-not-found')

export const NotFound = () => {
    notFound.innerHTML = `
        <h1>Página não encontrada :(</h1>
        <a href="/#login">Ir para o início</a>
    `

    window.location.href = '/#404'
    return notFound
}
