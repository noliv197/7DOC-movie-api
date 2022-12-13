import { atualizaItem } from "./armazenamento.js"
import { atribuiFavorito } from "./card-model.js"

export function favoritar(evento){
    evento.preventDefault()
    let ehBotaoCurtida = evento.target.id === 'curtir'
    if (ehBotaoCurtida) {
        const card = evento.target.closest('[data-id]')
        let favorito = evento.target.closest('[data-id] div span')
        let chave = parseInt(card.dataset.id)

 
        if(parseInt(favorito.dataset.favorito) === 0){
            favorito.dataset.favorito = 1
            favorito.innerHTML = atribuiFavorito(1)
        }else{
            favorito.dataset.favorito = 0
            favorito.innerHTML = atribuiFavorito(0)
        }
        atualizaItem(chave,parseInt(favorito.dataset.favorito))
    }
}
