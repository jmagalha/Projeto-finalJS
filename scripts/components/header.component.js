const header = document.createElement('header')
header.setAttribute('id', 'c-header')

const eventos = () => {
    const sair = header.querySelector('a')

    sair.addEventListener('click', (e) => {
        e.preventDefault()
        sessionStorage.removeItem('@token')
        sessionStorage.removeItem('@user')
        window.location.href = '/#login'
        window.location.reload()
    })
}

export const Header = () => {
    const usuario = JSON.parse(sessionStorage.getItem('@user'))

    header.innerHTML = `
        <span>${usuario?.nome}</span>
        <a href="/#login">Sair</a>
    `

    eventos()
    return header
}