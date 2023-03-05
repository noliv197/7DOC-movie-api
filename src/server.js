//import API_KEY from "../env/key.js"

export class Server{
    constructor(){
        this.url = 'https://api.themoviedb.org/3'
        this.key = API_KEY
    }
    async getFilmes(){
        try{
            const requisicao = await fetch(`${this.url}/trending/movie/day?api_key=${this.key}&sort_by=popularity.desc`)
            const requisicaoConvertida = await requisicao.json()
            return requisicaoConvertida
        }
        catch(err){
            throw new Error(err)
        }
    }
    async buscaFilmes(filtro){
        try{
            const requisicao = await fetch(`${this.url}/search/movie?api_key=${this.key}&sort_by=popularity.desc&query=${filtro}`)
            const requisicaoConvertida = await requisicao.json()
            return requisicaoConvertida
        }
        catch(err){
            throw new Error(err)
        }
    }
    async buscaPorID(chave){
        try{
            const requisicao = await fetch(`${this.url}/movie/${chave}?api_key=${this.key}`)
            const requisicaoConvertida = await requisicao.json()
            return requisicaoConvertida
        }
        catch(err){
            throw new Error(err)
        }
    }
}
