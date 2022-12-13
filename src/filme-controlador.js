import {model} from './card-model.js'
import {Server} from './server.js'
import { criaItem, pegaFavoritos, pegaItem } from './armazenamento.js'
import { favoritar } from './favoritar.js'
const secaoFilmes = document.querySelector('.secao-cards')
const input = document.querySelector('input[type="search"]')
const checkbox = document.querySelector('input[type="checkbox"]')
const servidor = new Server()

secaoFilmes.addEventListener('click', e => favoritar(e))

checkbox.addEventListener('change', async function(){
    if(this.checked) {
        const listaFavoritos = pegaFavoritos()
        if(listaFavoritos.length === 0){
            secaoFilmes.innerHTML = 'Sem resultados'
        }else{
            secaoFilmes.innerHTML = ''
            listaFavoritos.map( async item => {
                const filme = await servidor.buscaPorID(item.chave)
                await exibeCard(filme)
            })
        }
    } else {
        await getFilmes()
    }
})
input.addEventListener('keypress', async e => {
    let keycode = e.keyCode
    if(keycode === 13){
        const filtro = e.target.value
        if(filtro === ''){
            await getFilmes()
        }else{
            const servidor = await new Server().buscaFilmes(filtro)
            const resultados = await servidor.results
            if(resultados.length === 0){
                secaoFilmes.innerHTML = 'Sem resultados'
            }else{
                resultados.map(async item => await criaItem(item))
                await exibeCards(resultados)
            }
        }
    }
})

async function getFilmes(){
    const servidor = await new Server().getFilmes()
    const resultados = await servidor.results
    resultados.map(async item => await criaItem(item))
    await exibeCards(resultados)
}

async function exibeCards(array){
    secaoFilmes.innerHTML = `
    ${await array?.map(filme => 
            model(
                filme.id,
                filme.poster_path,
                filme.original_title,
                filme.release_date.split('-')[0],
                filme.vote_average,
                filme.overview,
                pegaItem(filme.id)
            )
    ).join('')}`
}
async function exibeCard(filme){
    secaoFilmes.innerHTML += `
    ${model(
                filme.id,
                filme.poster_path,
                filme.original_title,
                filme.release_date.split('-')[0],
                filme.vote_average,
                filme.overview,
                pegaItem(filme.id)
            )
    }`
}

getFilmes()
