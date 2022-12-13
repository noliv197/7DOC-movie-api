const itens = JSON.parse(localStorage.getItem("itens")) || []

export async function criaItem(item) {

    const chave = item.id
    const ehFavorito = 0

    const existe = itens.find( elemento => elemento.chave === chave )

    const itemAtual = {
        "chave": chave,
        "ehFavorito": ehFavorito
    }

    if (!existe) {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;
        itens.push(itemAtual) 
    }
    localStorage.setItem("itens", JSON.stringify(itens))
}

export function atualizaItem(chave,favorito){
    const existe = itens.find( elemento => elemento.chave === chave )
    if (existe) {
        existe.ehFavorito = favorito
        localStorage.setItem("itens", JSON.stringify(itens))
    }
}

export function pegaItem(chave){
    const existe = itens.find( elemento => elemento.chave === chave )
    if (existe) {
        return existe.ehFavorito
    }
}

export function pegaFavoritos(){
    const listaFavoritos = itens.filter( elemento => elemento.ehFavorito === 1 )
    return listaFavoritos
}